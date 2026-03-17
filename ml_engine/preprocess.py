import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split


def load_dataset():

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

    df = pd.read_csv("../dataset/KDDTrain+.txt", names=column_names)

    return df


def categorize_attack(label):

    dos = ["neptune","smurf","back","teardrop","pod","land"]
    probe = ["satan","ipsweep","portsweep","nmap"]
    r2l = ["guess_passwd","ftp_write","imap","phf","multihop","warezclient","warezmaster","spy"]
    u2r = ["buffer_overflow","loadmodule","rootkit","perl"]

    if label == "normal":
        return "normal"
    elif label in dos:
        return "dos"
    elif label in probe:
        return "probe"
    elif label in r2l:
        return "r2l"
    elif label in u2r:
        return "u2r"
    else:
        return "other"


def preprocess_data(df):

    df["attack_type"] = df["label"].apply(categorize_attack)

    encoder = LabelEncoder()

    df["protocol_type"] = encoder.fit_transform(df["protocol_type"])
    df["service"] = encoder.fit_transform(df["service"])
    df["flag"] = encoder.fit_transform(df["flag"])
    df["attack_type"] = encoder.fit_transform(df["attack_type"])

    df = df.drop(columns=["label", "difficulty"])

    return df


def split_data(df):

    X = df.drop("attack_type", axis=1)
    y = df["attack_type"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=0.2,
        random_state=42
    )

    return X_train, X_test, y_train, y_test


if __name__ == "__main__":

    df = load_dataset()

    df = preprocess_data(df)

    X_train, X_test, y_train, y_test = split_data(df)

    print("Training Data Shape:", X_train.shape)
    print("Testing Data Shape:", X_test.shape)