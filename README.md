# 🛡 AI-Powered Intrusion Detection System (IDS)

## 📌 Overview

This project presents a **real-time AI-based Intrusion Detection System (IDS)** designed to monitor live network traffic, detect malicious activities using machine learning, and visualize threats through an interactive dashboard.

The system integrates **network packet analysis, machine learning classification, and threat intelligence** to simulate a **mini Security Operations Center (SOC)** environment.

---

## 🎯 Objectives

* Develop a real-time network monitoring system
* Detect and classify cyber-attacks using machine learning
* Integrate threat intelligence for malicious IP detection
* Provide visual insights using a live dashboard
* Simulate a SOC-like environment for cybersecurity analysis

---

## 🧠 Key Features

### 🔍 Real-Time Packet Capture

* Captures live network packets using Scapy
* Extracts essential features from IP, TCP, and UDP layers

### 🤖 Machine Learning-Based Detection

* Uses a **Random Forest Classifier**
* Trained on the **NSL-KDD dataset**
* Classifies traffic into:

  * Normal
  * DoS (Denial of Service)
  * Probe (Reconnaissance)
  * R2L (Remote to Local)
  * U2R (User to Root)

### 🛡 Threat Intelligence Module

* Checks IPs against a simulated threat database
* Assigns risk levels:

  * LOW
  * MEDIUM
  * HIGH
  * CRITICAL
* Generates real-time alerts for malicious IPs

### 📊 Live Security Dashboard

* Built using Streamlit
* Displays:

  * Real-time alerts
  * Attack distribution charts
  * High-risk threat table

### 📝 Attack Logging System

* Logs all detected events into CSV
* Stores:

  * Timestamp
  * Source IP
  * Destination IP
  * Attack Type
  * Risk Level

---

## 🏗 System Architecture

```
Network Traffic
      ↓
Packet Capture (Scapy)
      ↓
Feature Extraction
      ↓
Machine Learning Model (Random Forest)
      ↓
Threat Intelligence Check
      ↓
Attack Logging (CSV)
      ↓
Dashboard Visualization (Streamlit)
```

---

## 🛠 Tech Stack

| Category        | Technologies        |
| --------------- | ------------------- |
| Programming     | Python              |
| ML Libraries    | Scikit-learn, NumPy |
| Data Processing | Pandas              |
| Networking      | Scapy               |
| Visualization   | Streamlit           |
| Model Storage   | Joblib              |
| IDE             | PyCharm             |

---

## 📂 Project Structure

```
AI-Intrusion-Detection-System/
│
├── dataset/
│   └── KDDTrain+.txt
│
├── ml_engine/
│   ├── data_loader.py
│   ├── preprocess.py
│   ├── train_model.py
│   └── intrusion_model.pkl
│
├── network_monitor/
│   ├── packet_sniffer.py
│   └── ai_detector.py
│
├── threat_intel/
│   └── threat_checker.py
│
├── logs/
│   └── attack_logs.csv
│
├── dashboard.py
├── requirements.txt
└── README.md
```

---

## ⚙ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/yourusername/AI-Intrusion-Detection-System.git
cd AI-Intrusion-Detection-System
```

### 2️⃣ Install Dependencies

```
pip install -r requirements.txt
```

---

## ▶ Usage

### 🔹 Step 1: Run AI Intrusion Detector

```
python network_monitor/ai_detector.py
```

### 🔹 Step 2: Launch Dashboard

```
streamlit run dashboard.py
```

### 🔹 Step 3: Open Browser

```
http://localhost:8501
```

---

## 🧪 Testing & Simulation

The system can be tested using safe, local simulations:

### 🔹 Ping Flood (DoS Simulation)

```
ping -t 127.0.0.1
```

### 🔹 Port Scan

Using Nmap:

```
nmap -sS 127.0.0.1
```

### 🔹 Custom Packet Simulation

Using Scapy:

```python
from scapy.all import *

for i in range(50):
    send(IP(dst="127.0.0.1")/ICMP())
```

---

## 📊 Sample Output

### Terminal Output

```
Packet 192.168.1.9 → 255.255.255.255 | Attack: DoS | Risk: CRITICAL

⚠ SECURITY ALERT
Source IP: 192.168.1.9
Threat Level: CRITICAL
Threat Type: Simulated Internal Threat
```

### Dashboard Features

* Real-time alerts table
* Attack distribution bar chart
* High-risk threat filtering

---

## ⚠ Limitations

* Simplified feature extraction for real-time packets
* Simulated threat intelligence database
* Limited real-world dataset coverage

---

## 🚀 Future Enhancements

* Integration with real threat intelligence APIs
* Database logging (MongoDB / PostgreSQL)
* Real-time alert notifications (email/SMS)
* Geolocation tracking of attacker IPs
* Deep learning-based intrusion detection

---

## 📚 Learning Outcomes

* Applied machine learning in cybersecurity
* Built real-time data processing pipeline
* Integrated networking and AI concepts
* Developed a full-stack analytical system

---

## 👨‍💻 Author

Udit Kumar
B.E. Computer Science Engineering

---

## ⭐ Acknowledgements

* NSL-KDD Dataset for intrusion detection training data
* Open-source Python libraries for networking and ML

---

## 📌 Conclusion

This project demonstrates how **AI and cybersecurity can be combined** to build intelligent systems capable of detecting and analyzing threats in real time, closely resembling modern SOC tools used in industry.
