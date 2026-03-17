
malicious_ips = {
    "185.234.217.12": {
        "threat": "Botnet Command Server",
        "risk": "CRITICAL"
    },
    "45.89.67.43": {
        "threat": "Malware Distribution Host",
        "risk": "HIGH"
    },
    "103.21.244.0": {
        "threat": "Suspicious Network Activity",
        "risk": "MEDIUM"
    },

    # Example internal test IP
    "192.168.1.9": {
        "threat": "Simulated Internal Threat",
        "risk": "CRITICAL"
    }
}


def check_ip(ip_address):
    """
    Check if the IP address exists in the threat intelligence database.
    Returns risk level and threat description.
    """

    if ip_address in malicious_ips:
        threat_info = malicious_ips[ip_address]

        return {
            "malicious": True,
            "risk": threat_info["risk"],
            "description": threat_info["threat"]
        }

    return {
        "malicious": False,
        "risk": "LOW",
        "description": "No known threat"
    }


def print_threat_alert(ip):
    """
    Display a formatted security alert if the IP is malicious.
    """

    result = check_ip(ip)

    if result["malicious"]:
        print("\n⚠ SECURITY ALERT")
        print(f"Source IP: {ip}")
        print(f"Threat Level: {result['risk']}")
        print(f"Threat Type: {result['description']}\n")