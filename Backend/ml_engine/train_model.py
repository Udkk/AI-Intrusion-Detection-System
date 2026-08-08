from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

from preprocess import load_dataset, preprocess_data, split_data
def prepare_data():

    df = load_dataset()

    df = preprocess_data(df)

    X_train, X_test, y_train, y_test = split_data(df)

    return X_train, X_test, y_train, y_test
def train_model(X_train, y_train):

    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )

    model.fit(X_train, y_train)

    return model
def evaluate_model(model, X_test, y_test):

    predictions = model.predict(X_test)

    print("Accuracy:", accuracy_score(y_test, predictions))

    print("\nClassification Report:\n")

    print(classification_report(y_test, predictions))

def save_model(model):

    joblib.dump(model, "../ml_engine/intrusion_model.pkl")

    print("\nModel saved successfully!")

if __name__ == "__main__":

    print("Preparing dataset...")

    X_train, X_test, y_train, y_test = prepare_data()

    print("Training AI intrusion detection model...")

    model = train_model(X_train, y_train)

    print("Evaluating model...")

    evaluate_model(model, X_test, y_test)

    save_model(model)
