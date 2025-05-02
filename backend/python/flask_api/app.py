from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import traceback
import numpy as np
from sklearn.feature_extraction.text import strip_accents_ascii
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model and vectorizer
try:
    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../model'))
    model = joblib.load(os.path.join(base_path, 'fraud_model.pkl'))
    vectorizer = joblib.load(os.path.join(base_path, 'vectorizer.pkl'))
    print("Model and vectorizer loaded successfully")
except Exception as e:
    print("Error loading model/vectorizer:", e)
    model = None
    vectorizer = None

def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
    
    # Remove special characters and numbers but keep important punctuation
    text = re.sub(r'[^a-z\s.,!?]', '', text)
    
    # Remove extra whitespace
    text = ' '.join(text.split())
    
    # Strip accents
    text = strip_accents_ascii(text)
    
    return text

def get_confidence_score(proba):
    # Get probability scores for both classes
    fraud_prob = proba[1]
    legitimate_prob = proba[0]
    
    # Calculate confidence based on the difference between probabilities
    # This gives higher confidence when the model is more certain
    confidence = abs(fraud_prob - legitimate_prob)
    
    # Scale confidence to be between 0.5 and 1.0
    # If probabilities are close, confidence will be closer to 0.5
    # If probabilities are far apart, confidence will be closer to 1.0
    scaled_confidence = 0.5 + (confidence * 0.5)
    
    return scaled_confidence

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Email Fraud Detection API is live'}), 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None or vectorizer is None:
            return jsonify({'error': 'Model or vectorizer not loaded'}), 500

        data = request.json
        text = data.get('text')
        if not text:
            return jsonify({'error': 'No text provided'}), 400

        # Preprocess the text
        processed_text = preprocess_text(text)
        
        # Transform text using vectorizer
        features = vectorizer.transform([processed_text])
        
        # Get prediction and probability scores
        prediction = model.predict(features)[0]
        prediction_proba = model.predict_proba(features)[0]
        
        # Calculate confidence score
        confidence = get_confidence_score(prediction_proba)

        return jsonify({
            'prediction': int(prediction),
            'label': 'fraud' if prediction == 1 else 'not fraud',
            'accuracy': float(confidence),
            'processed_text': processed_text
        }), 200

    except Exception as e:
        print("Prediction error:", str(e))
        return jsonify({'error': str(e), 'trace': traceback.format_exc()}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
