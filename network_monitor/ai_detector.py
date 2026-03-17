import joblib
import pandas as pd
from scapy.all import sniff
from scapy.layers.inet import IP, TCP, UDP
from threat_intel.threat_checker import check_ip
import csv
from datetime import datetime


print("Loading AI intrusion detection model...")
model = joblib.load("../ml_engine/intrusion_model.pkl")
print("Model loaded successfully!\n")

attack_labels = {
    0: "Normal",
    1: "DoS",
    2: "Probe",
    3: "R2L",
    4: "U2R"
}

# Extract simplified features from packet
def extract_features(packet):

    protocol_type = 0

    if TCP in packet:
        protocol_type = 1
    elif UDP in packet:
        protocol_type = 2

    features = {
        "duration": 0,
        "protocol_type": protocol_type,
        "service": 0,
        "flag": 0,
        "src_bytes": len(packet),
        "dst_bytes": len(packet),

        # Remaining features filled with default values
        "land": 0,
        "wrong_fragment": 0,
        "urgent": 0,
        "hot": 0,
        "num_failed_logins": 0,
        "logged_in": 0,
        "num_compromised": 0,
        "root_shell": 0,
        "su_attempted": 0,
        "num_root": 0,
        "num_file_creations": 0,
        "num_shells": 0,
        "num_access_files": 0,
        "num_outbound_cmds": 0,
        "is_host_login": 0,
        "is_guest_login": 0,
        "count": 0,
        "srv_count": 0,
        "serror_rate": 0,
        "srv_serror_rate": 0,
        "rerror_rate": 0,
        "srv_rerror_rate": 0,
        "same_srv_rate": 0,
        "diff_srv_rate": 0,
        "srv_diff_host_rate": 0,
        "dst_host_count": 0,
        "dst_host_srv_count": 0,
        "dst_host_same_srv_rate": 0,
        "dst_host_diff_srv_rate": 0,
        "dst_host_same_src_port_rate": 0,
        "dst_host_srv_diff_host_rate": 0,
        "dst_host_serror_rate": 0,
        "dst_host_srv_serror_rate": 0,
        "dst_host_rerror_rate": 0,
        "dst_host_srv_rerror_rate": 0
    }

    return features


# Run AI prediction
def predict_attack(features):

    df = pd.DataFrame([features])

    prediction = model.predict(df)

    return prediction[0]


# Process each captured packet
def process_packet(packet):

    if IP in packet:

        src_ip = packet[IP].src
        dst_ip = packet[IP].dst

        features = extract_features(packet)

        prediction = predict_attack(features)

        attack_type = attack_labels.get(prediction, "Unknown")

        threat = check_ip(src_ip)

        risk = threat["risk"]

        print(f"Packet {src_ip} → {dst_ip} | Attack: {attack_type} | Risk: {risk}")

        log_attack(src_ip, dst_ip, attack_type, risk)

        if threat["malicious"]:
            print("\n⚠ SECURITY ALERT")
            print(f"Source IP: {src_ip}")
            print(f"Threat Level: {risk}")
            print(f"Threat Type: {threat['description']}\n")


# Start packet monitoring
def start_monitor():

    print("\n🛡 AI Security Monitor Running")
    print("Analyzing network packets...\n")

    sniff(prn=process_packet, store=False)

def log_attack(src_ip, dst_ip, attack_type, risk):

    with open("../logs/attack_logs.csv", "a", newline="") as file:
        writer = csv.writer(file)

        writer.writerow([
            datetime.now(),
            src_ip,
            dst_ip,
            attack_type,
            risk
        ])


if __name__ == "__main__":
    start_monitor()