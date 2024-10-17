import os
import sys
from PIL import Image

def sanitize_filename(filename):
    # 移除或替换不安全的字符
    unsafe_chars = '<>:"/\\|?*'
    for char in unsafe_chars:
        filename = filename.replace(char, '_')
    # 限制文件名长度
    return filename[:200]  # Windows 的最大路径长度是 260 字符，我们留一些余地

def convert_jpg_to_webp(input_dir, output_dir, quality=80):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.jpg', '.jpeg')):
            input_path = os.path.join(input_dir, filename)
            safe_filename = sanitize_filename(os.path.splitext(filename)[0])
            output_filename = safe_filename + ".webp"
            output_path = os.path.join(output_dir, output_filename)

            try:
                with Image.open(input_path) as img:
                    # 保留EXIF信息
                    exif = img.info.get('exif')

                    # 有损转换为WEBP，可以调整质量
                    img.save(output_path, "WEBP", quality=quality, exif=exif)

                print(f"已将 {filename} 转换为 WEBP 格式")

                # 比较文件大小
                original_size = os.path.getsize(input_path)
                new_size = os.path.getsize(output_path)
                reduction = (original_size - new_size) / original_size * 100
                print(f"文件大小减小了 {reduction:.2f}%")
            except Exception as e:
                print(f"处理 {filename} 时出错: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 3 and len(sys.argv) != 4:
        print("用法: python jpg2webp.py <输入目录> <输出目录> [质量(1-100)]")
        sys.exit(1)

    input_dir = sys.argv[1]
    output_dir = sys.argv[2]
    quality = int(sys.argv[3]) if len(sys.argv) == 4 else 80
    convert_jpg_to_webp(input_dir, output_dir, quality)
