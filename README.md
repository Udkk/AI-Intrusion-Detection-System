# 🛡️ CyberSentinel – AI-Powered Intrusion Detection System

CyberSentinel is an AI-powered Intrusion Detection System (IDS) designed to detect and classify network traffic into different types of attacks. It uses machine learning with the NSL-KDD dataset and Scapy-based packet analysis to identify potentially malicious network activity.

The system classifies network traffic into five categories:

* **Normal**
* **DoS (Denial of Service)**
* **Probe**
* **R2L (Remote to Local)**
* **U2R (User to Remote)**

CyberSentinel provides a web-based interface where users can submit network traffic data and receive a predicted attack category along with a confidence score and risk level.

## ✨ Features

* 🤖 Machine-learning-based network intrusion detection
* 📡 Network packet analysis using Scapy
* 🧠 Random Forest classification model
* 📊 NSL-KDD dataset for model training
* 🔍 Detection of multiple attack categories
* 📈 Prediction confidence and risk-level analysis
* 📝 Attack prediction logging
* 🌐 REST API for making predictions
* 🖥️ Web-based dashboard for interacting with the system

## 🛠️ Tech Stack

### Backend

* Python
* FastAPI
* Uvicorn
* Scapy
* Scikit-learn
* Pandas
* Joblib

### Machine Learning

* Random Forest
* NSL-KDD Dataset
* Network traffic classification

### Frontend

* React
* Tailwind CSS
* Axios
* Framer Motion
* Recharts
* Lucide Icons

## 🔄 How It Works

CyberSentinel processes network traffic through the following pipeline:

```text
Network Traffic
      │
      ▼
Packet Capture / Traffic Data
      │
      ▼
Feature Extraction & Preprocessing
      │
      ▼
Machine Learning Pipeline
      │
      ▼
Random Forest Classifier
      │
      ▼
Attack Classification
      │
      ├── Normal
      ├── DoS
      ├── Probe
      ├── R2L
      └── U2R
      │
      ▼
Confidence Score & Risk Level
      │
      ▼
Web Dashboard / API Response
```

### 🧠 Machine Learning Model

The project uses a **Random Forest classifier** trained on the **NSL-KDD dataset**.

The dataset contains network traffic records representing normal activity and different types of attacks. Before training, the dataset is preprocessed and the label and difficulty-related fields are removed so that the model works with the relevant network traffic features.

The trained model is saved and loaded by the backend for making predictions on new traffic data.

### 📊 Attack Categories

| Category   | Description                                 |
| ---------- | ------------------------------------------- |
| **Normal** | Legitimate network activity                 |
| **DoS**    | Denial-of-Service related traffic           |
| **Probe**  | Network scanning or reconnaissance activity |
| **R2L**    | Remote-to-local attack attempts             |
| **U2R**    | User-to-root privilege escalation attempts  |

### ⚠️ Risk Classification

After the model generates a prediction, CyberSentinel uses the prediction result and confidence information to present a corresponding risk level through the application.

The dashboard provides this information in a user-friendly format so that potentially suspicious traffic can be identified more easily.

## 📁 Project Structure

```text
CyberSentinel/
│
├── Backend/
│   ├── app.py
│   ├── intrusion_model.pkl
│   ├── pipeline.pkl
│   ├── attack_logs.csv
│   ├── requirements.txt
│   └── ...
│
└── CyberSentinel-Frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── ...
```

The project is divided into two main components:

* **Backend** – Provides the machine learning prediction service and API.
* **Frontend** – Provides the web interface for interacting with the intrusion detection system.

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Udkk/AI-Intrusion-Detection-System.git
cd AI-Intrusion-Detection-System
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd Backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### 3. Start the Backend

Run the FastAPI application using Uvicorn:

```bash
uvicorn app:app --reload
```

The backend will be available locally at:

```text
http://127.0.0.1:8000
```

### 4. Start the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd CyberSentinel-Frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will then be available at the local URL shown in the terminal.

## 🔌 API

CyberSentinel provides a FastAPI endpoint for making intrusion detection predictions.

### Prediction Endpoint

```text
POST /predict-file
```

The endpoint accepts network traffic data and processes it through the trained machine learning pipeline.

A prediction response can include information such as:

* Predicted attack category
* Confidence score
* Risk level

### API Documentation

When running the backend locally, FastAPI automatically provides interactive API documentation at:

```text
http://127.0.0.1:8000/docs
```

This interface can be used to inspect and test the available API endpoints.
## 📈 Model Performance

The Random Forest model was trained using the NSL-KDD dataset.

During model training, the classifier achieved an accuracy of approximately:

**99.84%**

> Note: This is the training accuracy observed during development. It should not be interpreted as the model's real-world detection accuracy or as a guarantee of performance on unseen network traffic.

### 🧪 Example Prediction

During testing, CyberSentinel successfully processed network traffic and returned a prediction containing:

```text id="7q6z2x"
Attack Type: DoS
Confidence: 87%
Risk Level: MEDIUM
```

The prediction is then displayed through the CyberSentinel interface to make the result easier to understand.
## 🌐 Live Demo

Try the deployed CyberSentinel application:

**[CyberSentinel – Live Application](https://cybersentinel-ids.onrender.com)**

> The application may take a short time to respond if the deployment is inactive.

## 🔗 Project Links

* **GitHub Repository:** [AI-Intrusion-Detection-System](https://github.com/Udkk/AI-Intrusion-Detection-System)
* **Live Application:** [CyberSentinel](https://cybersentinel-ids.onrender.com)
## 🚀 Future Improvements

Some possible improvements for future versions include:

* Improve model evaluation using additional validation and test metrics
* Support more network traffic datasets
* Add real-time monitoring and visualization
* Expand the range of detectable attack types
* Improve model performance on unseen network traffic
* Add authentication and role-based access to the dashboard
* Deploy the machine learning service with scalable infrastructure
## 👤 Author

**Udit Kumar**

Computer Science Engineering graduate interested in **Cybersecurity, Network Security, Threat Analysis, and Information Security**.

* GitHub: [@Udkk](https://github.com/Udkk)
* Portfolio: [Udit Kumar – Portfolio](https://portfolio-sandy-ten-53.vercel.app/)
