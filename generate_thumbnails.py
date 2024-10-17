import os
import sys
from PIL import Image, ExifTags

def create_thumbnail(image_path, output_path, size=(500, 500)):
    with Image.open(image_path) as img:
        # 处理图片方向
        try:
            for orientation in ExifTags.TAGS.keys():
                if ExifTags.TAGS[orientation] == 'Orientation':
                    break
            exif = dict(img._getexif().items())
            if exif[orientation] == 3:
                img = img.rotate(180, expand=True)
            elif exif[orientation] == 6:
                img = img.rotate(270, expand=True)
            elif exif[orientation] == 8:
                img = img.rotate(90, expand=True)
        except (AttributeError, KeyError, IndexError):
            # 图片没有 EXIF 信息，不需要旋转
            pass

        # 计算缩放比例
        img.thumbnail((size[0], size[1]), Image.LANCZOS)
        
        # 保存时不添加白边，保持原有比例
        img.save(output_path, "WEBP", quality=95)

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
