import os
import requests
import argparse

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

class CloudflareImageUploader:
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

if __name__ == "__main__":
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
    args = parser.parse_args()

    img_loc_data_processor = ImageLocationDataProcessor()
    cloudflarer_img_uploader = CloudflareImageUploader(cloudflare_token, cloudflare_url)

    data = []
    for filename in os.listdir(args.file_path):
        if filename.lower().endswith(('jpg', 'jpeg', 'png', 'webp')):
            image_path = os.path.join(args.file_path, filename)
            print("Processing: {}".format(filename))
            map_data = img_loc_data_processor.get_map_data(filename, image_path)
            uploaded_img_id = cloudflarer_img_uploader.upload_image(image_path)
            if uploaded_img_id:
                map_data["imgID"] = uploaded_img_id
            data.append(map_data)
            print("")
        else:
            print("Error: {} isn't a support image type. Please convert it to .jpg, .png, or .webp")
    pprint(data)

