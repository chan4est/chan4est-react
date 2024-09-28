import os
import requests
import argparse
import json

from pprint import pprint
from PIL import Image, ExifTags

class ImageLocationDataProcessor:
    def __init__(self):
        None

    def convert_decimal_to_dms(self, latitude, longitude):
        """
        Convert decimal coordinates to degrees, minutes, and seconds.
        
        Args:
            latitude (float): Latitude in decimal degrees.
            longitude (float): Longitude in decimal degrees.
        
        Returns:
            tuple: A tuple containing formatted DMS coordinates for latitude and longitude as strings.
        """
        
        def convert_to_dms(decimal_degree):
            is_positive = decimal_degree >= 0
            decimal_degree = abs(decimal_degree)
            degrees = int(decimal_degree)
            minutes = int((decimal_degree - degrees) * 60)
            seconds = (decimal_degree - degrees - minutes / 60) * 3600
            return (degrees, minutes, seconds, is_positive)
        
        def format_dms(degrees, minutes, seconds, is_latitude):
            direction = ''
            if is_latitude:
                direction = 'N' if degrees >= 0 else 'S'
            else:
                direction = 'E' if degrees >= 0 else 'W'
            degrees = abs(degrees)
            return f"{degrees:02d}°{minutes:02d}'{seconds:05.2f}\"{direction}"
        
        lat_dms = convert_to_dms(latitude)
        lon_dms = convert_to_dms(longitude)
        
        lat_str = format_dms(lat_dms[0], lat_dms[1], lat_dms[2], True)
        lon_str = format_dms(lon_dms[0], lon_dms[1], lon_dms[2], False)
        
        return lat_str, lon_str

    def get_decimal_coords(self, coords, ref):
        decimal_degrees = float(coords[0]) + float(coords[1]) / 60 + float(coords[2]) / 3600
        if ref == "S" or ref =='W' :
            decimal_degrees = -1 * decimal_degrees
        return decimal_degrees

    def get_map_data(self, img_name, image_path):
        map_data =  {
                        "imgID": "",
                        "description": img_name,
                        "coordinates": {
                            "lat": "",
                            "long": "",
                            "link": ""
                        }
                    }
        try:
            with Image.open(image_path) as img:
                info = img.getexif()
                gpsinfo = info.get_ifd(next(tag for tag, name in ExifTags.TAGS.items() if name == "GPSInfo"))
                
                lat_dec = self.get_decimal_coords(gpsinfo[2], gpsinfo[1])
                long_dec = self.get_decimal_coords(gpsinfo[4], gpsinfo[3])

                gMapsLink = f"https://maps.google.com/?q={lat_dec},{long_dec}"

                lat_dms, long_dms = self.convert_decimal_to_dms(lat_dec, long_dec)

                map_data["coordinates"]["lat"] = lat_dms
                map_data["coordinates"]["long"] = long_dms
                map_data["coordinates"]["link"] = gMapsLink           
        except Exception as e:
                print("Error: Exception while getting image location data {}".format(e))
        return map_data

class CloudflareImageHandler:
    def __init__(self, cloudflare_token, cloudflare_url):
        self.cloudflare_token = cloudflare_token
        self.cloudflare_url = cloudflare_url

    def upload_image(self, image_path):
        uploaded_img_id = None
        try:
            with open(image_path, 'rb') as img_file:
                headers = {"Authorization": f"Bearer {self.cloudflare_token}"}
                files = {'file': img_file}
                response = requests.post(self.cloudflare_url, headers=headers, files=files)
                if response.status_code == 200:
                    response_json = response.json()
                    uploaded_img_id = response_json["result"]["id"]
                else:
                    print(f"Error: Failed to upload the file. Status code: {response.status_code}")
        except Exception as e:
                print("Error: Exception while uploading image {}".format(e))
        return uploaded_img_id

    def write_json_to_file(self, json_object, file_path):
        """
        Writes a JSON object to a file.

        :param json_object: The JSON object to write (should be a Python dictionary or list).
        :param file_path: The path to the file where the JSON object will be written.
        """
        try:
            with open(file_path, 'w') as file:
                json.dump(json_object, file, indent=4, ensure_ascii=False)
            print(f"JSON data successfully written to {file_path}.")
        except Exception as e:
            print(f"An error occurred while writing to the file: {e}")

    def read_json_from_file(self, file_path):
        """
        Reads a JSON object from a file.

        :param file_path: The path to the file containing the JSON object.
        :return: The JSON object as a Python dictionary or list.
        """
        try:
            with open(file_path, 'r') as file:
                data = json.load(file)
            return data
        except Exception as e:
            print(f"An error occurred while reading the file: {e}")
            return None

    def get_before_period(self, input_string):
        """
        Extracts everything before the first period in a string.

        :param input_string: The input string to extract from.
        :return: The substring before the first period, or the original string if no period is found.
        """
        # Find the position of the first period
        period_index = input_string.find('.')

        # If a period is found, return the substring before that period
        if period_index != -1:
            return input_string[:period_index]
        else:
            # If no period is found, return the original string
            return input_string
        
    def filter_json_by_imgID(self, source_array, filter_array):
        """
        Filters entries in the source array based on the presence of 'imgID' in the filter array.

        :param source_array: The source JSON object array to filter.
        :param filter_array: The JSON object array containing 'imgID' values to match.
        :return: A filtered list containing only the matching entries from the source array.
        """
        # Extract imgID values from the filter array
        imgID_set = {entry['imgID'] for entry in filter_array}

        # Filter the source array for entries with matching imgID values
        filtered_result = [entry for entry in source_array if entry['id'] in imgID_set]

        return filtered_result

    def strip_file_extension(self, source_json, field):
        for entry in source_json:
            entry[field] = self.get_before_period(entry[field])
        return source_json
    
    def find_json_object_by_field(self, json_array, field, match_content):
        """
        Finds a specific JSON object in an array that matches the given 'id' field.

        :param json_array: The JSON object array to search.
        :param target_id: The target 'id' value to match.
        :return: The JSON object with the matching 'id' or None if not found.
        """
        # Iterate through the array to find the matching object
        for obj in json_array:
            if obj.get(field) == match_content:
                return obj
        # Return None if no match is found
        return None
        
    def replace_images(self, new_images_file_path, old_images_file_path):
        """"" 
        Reads all imgIDs from given input file along with their uploaded name
        Searches Cloudflare for all images matching the uploaded name and puts them into a dictionary
        Read all imgIDs from from old image file and replaces the imgID with the new one based on match
        """
        try:
            new_images_json = self.read_json_from_file(new_images_file_path)
            new_images_json = self.strip_file_extension(new_images_json, "description")

            old_images_json = self.read_json_from_file(old_images_file_path)

            headers = {"Authorization": f"Bearer {self.cloudflare_token}"}
            response = requests.get(self.cloudflare_url, headers=headers)
            if not response.status_code == 200:
                print("Error: Bad response from Cloudflare while replacing images")
            cloudflare_images_json = response.json()['result']['images']
            cloudflare_images_json = self.filter_json_by_imgID(cloudflare_images_json, old_images_json)
            cloudflare_images_json = self.strip_file_extension(cloudflare_images_json, 'filename')

            for old_image in old_images_json:
                old_img_id = old_image['imgID']
                old_img_cf_obj = self.find_json_object_by_field(cloudflare_images_json, 'id', old_img_id)
                old_img_name = old_img_cf_obj['filename']
                new_img_obj = self.find_json_object_by_field(new_images_json, 'description', old_img_name)
                if not new_img_obj:
                    continue
                new_img_id = new_img_obj['imgID']
                old_image['imgID'] = new_img_id
            
            self.write_json_to_file(old_images_json, old_images_file_path)
        except Exception as e:
                print("Error: Exception while replacing images {}".format(e))

    def read_image_ids_from_file(self, file_path):
        data_json = self.read_json_from_file(file_path)
        ids_list = []
        for entry in data_json:
            images = entry['postImages']
            for img_entry in images:
                ids_list.append(img_entry['imgID'])
        return ids_list
    
    def read_img_descriptions_from_file(self, file_path):
        data_json = self.read_json_from_file(file_path)
        desc_list = []
        for entry in data_json:
            images = entry['postImages']
            for img_entry in images:
                desc_list.append(img_entry['description'])
        return desc_list
    
    def read_image_ids_from_cloudflare(self):
        headers = {"Authorization": f"Bearer {self.cloudflare_token}"}
        response = requests.get(self.cloudflare_url, headers=headers)
        if not response.status_code == 200:
            print("Error: Bad response from Cloudflare while replacing images")
        cloudflare_images_json = response.json()['result']['images']
        img_ids = []
        for image in cloudflare_images_json:
            img_ids.append(image['id'])
        return img_ids
    
    def delete_image_from_cloudflare(self, id):
        headers = {"Authorization": f"Bearer {self.cloudflare_token}"}
        response = requests.delete(self.cloudflare_url + "/{}".format(id), headers=headers)
        if not response.status_code == 200:
            print("Error: Bad response from Cloudflare while deleting images")
        
    def delete_unused_images(self, file_path):
        print("Cleaning up unused files")
        used_img_ids = set(self.read_image_ids_from_file(file_path))
        cloudflare_img_ids = self.read_image_ids_from_cloudflare();
        counter = 0
        for img_id in cloudflare_img_ids:
            if img_id not in used_img_ids:
                self.delete_image_from_cloudflare(img_id)
                counter += 1
        print(f"Sucessfully deleted {counter} images")

    def write_image_desciptions_to_file(self, intput_file_path, output_file_path):
        img_desc_list = self.read_img_descriptions_from_file(intput_file_path)
        self.write_json_to_file(img_desc_list, output_file_path)


if __name__ == "__main__":
    new_file = "new_image_data.json"
    old_file = "image_data.json"
    blog_file = "blog_entries.json"
    blog_desc = "blog_desc.json"

    cloudflare_token = os.getenv("CLOUDFLARE_API_TOKEN")
    if not cloudflare_token:
        print("Error: Cloudflare API token not found. Please set the CLOUDFLARE_API_TOKEN environment variable.")
        exit(1)

    cloudflare_account_id = os.getenv("CLOUDFLARE_ACC_ID")
    if not cloudflare_account_id:
        print("Error: Cloudflare account ID not found. Please set the CLOUDFLARE_ACC_ID environment variable.")
        exit(1)

    cloudflare_url = "https://api.cloudflare.com/client/v4/accounts/{}/images/v1".format(cloudflare_account_id)

    parser = argparse.ArgumentParser(description="Upload a folder of files to Cloudflare")
    parser.add_argument("file_path", type=str, help="The path to the file you want to upload.")
    parser.add_argument("-d", "--dry_run", action="store_true")
    args = parser.parse_args()

    img_loc_data_processor = ImageLocationDataProcessor()
    cloudflarer_img_handler = CloudflareImageHandler(cloudflare_token, cloudflare_url)
    
    # cloudflarer_img_handler.delete_unused_images(blog_file)
    # cloudflarer_img_handler.write_image_desciptions_to_file(blog_file, blog_desc)

    data = []
    for filename in os.listdir(args.file_path):
        file_path = os.path.join(args.file_path, filename)
        if os.path.isdir(file_path):
            # print(f"Skipping directory: {filename}")
            continue
        if filename.lower().endswith(('jpg', 'jpeg', 'png', 'webp')):
            print(f"Processing: {filename}")
            map_data = img_loc_data_processor.get_map_data(filename, file_path)
            uploaded_img_id = ''
            if not args.dry_run:
                uploaded_img_id = cloudflarer_img_handler.upload_image(file_path)
            if uploaded_img_id:
                map_data["imgID"] = uploaded_img_id
            data.append(map_data)
        else:
            print(f"Error: {filename} isn't a supported image type. Please convert it to .jpg, .png, or .webp")

    cloudflarer_img_handler.write_json_to_file(data, new_file)
    # cloudflarer_img_handler.replace_images(new_file, old_file)
