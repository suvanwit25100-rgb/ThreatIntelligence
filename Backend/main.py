from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/threats")
def get_threats():
    url = "https://api.gdeltproject.org/api/v2/doc/doc?query=tone<-5 conflict&mode=TimelineVol&format=json"
    r = requests.get(url)
    return [
        {"lat": 34.05, "lng": -118.24, "label": "SEC_ALPHA"},
        {"lat": 35.67, "lng": 139.65, "label": "SEC_BETA"}
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)