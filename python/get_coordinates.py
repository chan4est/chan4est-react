import os
import json
from pprint import pprint
from PIL import Image, ExifTags

def decimal_to_dms(latitude, longitude):
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
        return f"{degrees}°{minutes}'{seconds:.2f}\"{direction}"
    
    lat_dms = convert_to_dms(latitude)
    lon_dms = convert_to_dms(longitude)
    
    lat_str = format_dms(lat_dms[0], lat_dms[1], lat_dms[2], True)
    lon_str = format_dms(lon_dms[0], lon_dms[1], lon_dms[2], False)
    
    return lat_str, lon_str

def get_google_maps_link(lat_dec, lon_dec):
    # lat_dec = dms_to_decimal(lat_dms)
    # lon_dec = dms_to_decimal(lon_dms)
    return f"https://maps.google.com/?q={lat_dec},{lon_dec}"

def decimal_coords(coords, ref):
    decimal_degrees = float(coords[0]) + float(coords[1]) / 60 + float(coords[2]) / 3600
    if ref == "S" or ref =='W' :
        decimal_degrees = -1 * decimal_degrees
    return decimal_degrees


GPSINFO_TAG = next(
    tag for tag, name in ExifTags.TAGS.items() if name == "GPSInfo"
)

def process_images(folder_path):
    data = []
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(('jpg', 'jpeg', 'png', 'webp')):
            image_path = os.path.join(folder_path, filename)
            print(image_path)
            with Image.open(image_path) as img:
                try:
                    info = img.getexif()
                    gpsinfo = info.get_ifd(GPSINFO_TAG)
                    lat = decimal_coords(gpsinfo[2], gpsinfo[1])
                    long = decimal_coords(gpsinfo[4], gpsinfo[3])
                    gMaps = get_google_maps_link(lat, long)
                    dms = decimal_to_dms(lat, long)
                    data.append({
                        "imgID": "",
                        "description": image_path,
                        "coordinates": {
                            "lat": dms[0],
                            "long": dms[1],
                            "link": gMaps
                        }
                    })                    
                except:
                    print("No proper GPS data")
                    data.append({
                        "imgID": "",
                        "description": image_path,
                        "coordinates": {
                            "lat": "",
                            "long": "",
                            "link": ""
                        }
                    })
    # with open("output.json", "w") as f:
        # json.dump(data, f, indent=4)
    pprint(data)

if __name__ == "__main__":
    folder_path = "./test/"
    process_images(folder_path)
