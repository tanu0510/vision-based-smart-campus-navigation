import easyocr
import sys

print("Loading AI...")

reader = easyocr.Reader(['en'])

image_path = sys.argv[1]

result = reader.readtext(image_path)

print("\nDetected Text:")

for item in result:
    print(item[1])