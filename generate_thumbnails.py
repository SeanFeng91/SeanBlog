import os
import sys
from PIL import Image

def create_thumbnail(image_path, output_path, size=(200, 200)):
    with Image.open(image_path) as img:
        img.thumbnail(size)
        img.save(output_path, "WEBP", quality=85)

def process_directory(input_dir, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
            input_path = os.path.join(input_dir, filename)
            output_filename = os.path.splitext(filename)[0] + "_thumb.webp"
            output_path = os.path.join(output_dir, output_filename)
            create_thumbnail(input_path, output_path)
            print(f"Created thumbnail for {filename}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python generate_thumbnails.py <input_directory> <output_directory>")
        sys.exit(1)

    input_dir = sys.argv[1]
    output_dir = sys.argv[2]
    process_directory(input_dir, output_dir)