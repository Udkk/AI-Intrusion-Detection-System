import pandas as pd
import joblib
from sklearn.metrics import classification_report
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OrdinalEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

COLUMN_NAMES = [
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

DOS = ["neptune","smurf","back","teardrop","pod","land"]
PROBE = ["satan","ipsweep","portsweep","nmap"]
R2L = ["guess_passwd","ftp_write","imap","phf","multihop","warezclient","warezmaster","spy"]
U2R = ["buffer_overflow","loadmodule","rootkit","perl"]

def categorize_attack(label):

    if label == "normal":
        return "Normal"

    elif label in DOS:
        return "DoS"

    elif label in PROBE:
        return "Probe"

    elif label in R2L:
        return "R2L"

    elif label in U2R:
        return "U2R"

    return "Other"

def load_data():

    df = pd.read_csv(
        "../dataset/KDDTrain+.txt",
        names=COLUMN_NAMES
    )

    df["attack_type"] = df["label"].apply(categorize_attack)

    df.drop(columns=["label", "difficulty"], inplace=True)

    return df

def prepare_data(df):

    X = df.drop(columns=["attack_type"])

    y = df["attack_type"]

    return train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

categorical_features = [
    "protocol_type",
    "service",
    "flag"
]

preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OrdinalEncoder(
                handle_unknown="use_encoded_value",
                unknown_value=-1
            ),
            categorical_features
        )
    ],
    remainder="passthrough"
)

pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        (
            "classifier",
            RandomForestClassifier(
                n_estimators=100,
                random_state=42,
                n_jobs=-1
            )
        )
    ]
)

if __name__ == "__main__":

    print("Loading dataset...")
    df = load_data()

    print(f"Dataset loaded: {len(df)} records")

    X_train, X_test, y_train, y_test = prepare_data(df)

    print("Training pipeline...")

    pipeline.fit(X_train, y_train)

    print("Training completed!")

    predictions = pipeline.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    print(f"\nAccuracy: {accuracy:.4f}")

    print("\nClassification Report:\n")
    print(classification_report(y_test, predictions))

    joblib.dump(pipeline, "pipeline.pkl")

    print("\nPipeline saved successfully!")