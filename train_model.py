import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os
import sys

def load_dataset(file_path):
    """Load dataset with multiple encoding attempts"""
    encodings = ['utf-8', 'latin1', 'cp1252']
    for encoding in encodings:
        try:
            print(f"Attempting to read with {encoding} encoding...")
            df = pd.read_csv(file_path, encoding=encoding, on_bad_lines='skip')
            print(f"Successfully read with {encoding} encoding")
            return df
        except UnicodeDecodeError:
            continue
        except Exception as e:
            print(f"Error with {encoding} encoding: {str(e)}")
            continue
    raise ValueError("Could not read the file with any of the attempted encodings")

def main():
    try:
        # Load the dataset
        dataset_path = 'data/fraud_email_.csv'
        if not os.path.exists(dataset_path):
            raise FileNotFoundError(f"Dataset file '{dataset_path}' not found. Please check the file path.")

        print("Loading dataset...")
        df = load_dataset(dataset_path)
        print(f"Dataset loaded successfully. Shape: {df.shape}")

        # Basic cleanup
        df.dropna(inplace=True)
        print(f"Shape after dropping NA: {df.shape}")

        # Assuming the first column is the text and the last column is the label
        text_column = df.columns[0]
        label_column = df.columns[-1]

        # Rename columns for consistency
        df = df.rename(columns={text_column: 'Text', label_column: 'Class'})
        print("Columns renamed successfully")

        # Features and labels
        X = df['Text'].astype(str)  # Ensure text is string type
        y = df['Class']

        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        print("Data split completed")

        # Vectorization
        vectorizer = TfidfVectorizer(stop_words='english', max_df=0.7, min_df=2)
        try:
            X_train_vec = vectorizer.fit_transform(X_train)
            X_test_vec = vectorizer.transform(X_test)
            print("Text vectorization completed")
        except ValueError as e:
            raise ValueError(f"Error during vectorization: {e}")

        # Model training
        model = MultinomialNB()
        try:
            model.fit(X_train_vec, y_train)
            print("Model training completed")
        except ValueError as e:
            raise ValueError(f"Error during model training: {e}")

        # Evaluation
        y_pred = model.predict(X_test_vec)
        print("\nModel Performance:")
        print("Accuracy:", accuracy_score(y_test, y_pred))
        print("\nDetailed Classification Report:")
        print(classification_report(y_test, y_pred))

        # Create model directory if it doesn't exist
        os.makedirs('model', exist_ok=True)

        # Save model and vectorizer
        try:
            joblib.dump(model, 'model/fraud_model.pkl')
            joblib.dump(vectorizer, 'model/vectorizer.pkl')
            print("\nModel and vectorizer saved successfully!")
        except Exception as e:
            raise IOError(f"Error saving model or vectorizer: {e}")

    except Exception as e:
        print(f"An error occurred: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
