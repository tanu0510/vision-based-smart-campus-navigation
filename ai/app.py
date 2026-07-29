from fastapi import FastAPI, UploadFile, File
import easyocr
import shutil
import os

app = FastAPI()

print("Loading EasyOCR model...")
reader = easyocr.Reader(["en"])
print("EasyOCR model loaded!")

@app.get("/")
def home():
    return {"message": "AI Service Running"}

@app.post("/detect")
async def detect_text(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = reader.readtext(temp_path)

    detected_text = [item[1] for item in result]

    os.remove(temp_path)

    return {
        "detected_text": detected_text
    }