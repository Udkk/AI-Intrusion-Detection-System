from fastapi import FastAPI
import joblib
from pathlib import Path
from pydantic import BaseModel
import pandas as pd
from fastapi import UploadFile, File
import io
from fastapi.middleware.cors import CORSMiddleware




attack_labels = {
    0: "Normal",
    1: "DoS",
    2: "Probe",
    3: "R2L",
    4: "U2R"
}
class NetworkFeatures(BaseModel):
    duration: float
    protocol_type: int
    service: int
    flag: int
    src_bytes: float
    dst_bytes: float
    land: int
    wrong_fragment: int
    urgent: int
    hot: int
    num_failed_logins: int
    logged_in: int
    num_compromised: int
    root_shell: int
    su_attempted: int
    num_root: int
    num_file_creations: int
    num_shells: int
    num_access_files: int
    num_outbound_cmds: int
    is_host_login: int
    is_guest_login: int
    count: int
    srv_count: int
    serror_rate: float
    srv_serror_rate: float
    rerror_rate: float
    srv_rerror_rate: float
    same_srv_rate: float
    diff_srv_rate: float
    srv_diff_host_rate: float
    dst_host_count: int
    dst_host_srv_count: int
    dst_host_same_srv_rate: float
    dst_host_diff_srv_rate: float
    dst_host_same_src_port_rate: float
    dst_host_srv_diff_host_rate: float
    dst_host_serror_rate: float
    dst_host_srv_serror_rate: float
    dst_host_rerror_rate: float
    dst_host_srv_rerror_rate: float

app = FastAPI(
    title="CyberSentinel IDS API",
    version="1.0.0"
)

BASE_DIR = Path(__file__).resolve().parent



print("Loading AI model...")

pipeline = joblib.load("ml_engine/pipeline.pkl")

print("✅ AI model loaded successfully!")

@app.get("/")
def root():
    return {
        "message": "CyberSentinel IDS API Running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.get("/model-info")
def model_info():
    return {
        "model": type(model).__name__,
        "features": len(model.feature_names_in_),
        "classes": model.classes_.tolist()
    }

@app.post("/predict")
def predict(data: NetworkFeatures):

    df = pd.DataFrame([data.model_dump()])

    prediction = model.predict(df)[0]

    confidence = model.predict_proba(df).max() * 100

    attack = attack_labels[prediction]

    if confidence >= 90:
        risk = "HIGH"
    elif confidence >= 70:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return {
        "prediction": attack,
        "confidence": round(confidence, 2),
        "risk": risk
    }

@app.post("/predict-file")
async def predict_file(file: UploadFile = File(...)):

    # Read uploaded file
    contents = await file.read()

    # NSL-KDD column names
    column_names = [
        "duration","protocol_type","service","flag","src_bytes","dst_bytes",
        "land","wrong_fragment","urgent","hot","num_failed_logins",
        "logged_in","num_compromised","root_shell","su_attempted",
        "num_root","num_file_creations","num_shells","num_access_files",
        "num_outbound_cmds","is_host_login","is_guest_login","count",
        "srv_count","serror_rate","srv_serror_rate","rerror_rate",
        "srv_rerror_rate","same_srv_rate","diff_srv_rate",
        "srv_diff_host_rate","dst_host_count","dst_host_srv_count",
        "dst_host_same_srv_rate","dst_host_diff_srv_rate",
        "dst_host_same_src_port_rate","dst_host_srv_diff_host_rate",
        "dst_host_serror_rate","dst_host_srv_serror_rate",
        "dst_host_rerror_rate","dst_host_srv_rerror_rate",
        "label","difficulty"
    ]

    # Read uploaded dataset
    df = pd.read_csv(
        io.StringIO(contents.decode("utf-8")),
        names=column_names
    )

    # Save actual labels
    actual_labels = df["label"].tolist()

    

    X = df.drop(columns=["label", "difficulty"])

    predictions = pipeline.predict(X)

    probabilities = pipeline.predict_proba(X)

    attack_counts = {
        "Normal": 0,
        "DoS": 0,
        "Probe": 0,
        "R2L": 0,
        "U2R": 0
    }

    prediction_results = []
    total_confidence = 0

    for i, pred in enumerate(predictions):

        attack = pred
        confidence = round(float(max(probabilities[i])) * 100, 2)

        total_confidence += confidence
        attack_counts[attack] += 1

        # Keep only first 100 predictions
        if i < 100:
            prediction_results.append({
                "row": i + 1,
                "actual": actual_labels[i],
                "prediction": attack,
                "confidence": confidence
            })

    average_confidence = round(total_confidence / len(predictions), 2)

    return {
    "summary": {
        "total_records": len(predictions),
        "average_confidence": average_confidence,
        "total_attacks": len(predictions) - attack_counts["Normal"],
        "normal_traffic": attack_counts["Normal"]
    },
    "attack_distribution": attack_counts,
    "preview": prediction_results
    }

@app.get("/")
def home():
    return {
        "project": "CyberSentinel IDS",
        "status": "Running",
        "model": "Random Forest Pipeline"
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)