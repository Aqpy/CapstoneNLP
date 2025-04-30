import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os

# Load the dataset
dataset_path = 'data/fraud_email_.csv'  # Corrected file path
if not os.path.exists(dataset_path):
    raise FileNotFoundError(f"Dataset file '{dataset_path}' not found. Please check the file path.")

df = pd.read_csv(dataset_path)

# Basic cleanup
df.dropna(inplace=True)
if not all(col in df.columns for col in ['Text', 'Class']):
    raise ValueError("Dataset must contain 'Text' and 'Class' columns.")
df = df[['Text', 'Class']]

# Features and labels
X = df['Text']
y = df['Class']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Vectorization
vectorizer = TfidfVectorizer(stop_words='english', max_df=0.7)
try:
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)
except ValueError as e:
    raise ValueError(f"Error during vectorization: {e}")

# Model training
model = MultinomialNB()
try:
    model.fit(X_train_vec, y_train)
except ValueError as e:
    raise ValueError(f"Error during model training: {e}")

# Evaluation
y_pred = model.predict(X_test_vec)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Save model and vectorizer
os.makedirs('model', exist_ok=True)
try:
    joblib.dump(model, 'model/fraud_model.pkl')
    joblib.dump(vectorizer, 'model/vectorizer.pkl')
except Exception as e:
    raise IOError(f"Error saving model or vectorizer: {e}")
