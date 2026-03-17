from scapy.all import sniff, IP, TCP, UDP


def process_packet(packet):

    if IP in packet:

        src_ip = packet[IP].src
        dst_ip = packet[IP].dst

        protocol = "Other"

        if TCP in packet:
            protocol = "TCP"

        elif UDP in packet:
            protocol = "UDP"

        print(f"Packet Detected → {src_ip} → {dst_ip} | Protocol: {protocol}")


def start_sniffing():

    print("🛡 AI Security Monitor Started")
    print("Listening for network packets...\n")

    sniff(prn=process_packet, count=20)


if __name__ == "__main__":
    start_sniffing()