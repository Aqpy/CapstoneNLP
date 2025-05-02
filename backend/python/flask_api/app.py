from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import traceback
import numpy as np

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

# Health check route
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

        features = vectorizer.transform([text])
        prediction = model.predict(features)[0]
        prediction_proba = model.predict_proba(features)[0]
        accuracy = max(prediction_proba)  # Get the confidence score

        label = 'fraud' if prediction == 1 else 'not fraud'

        return jsonify({
            'prediction': int(prediction),
            'label': label,
            'accuracy': float(accuracy),
            'processed_text': text  # For now, returning the original text
        }), 200

    except Exception as e:
        print("Prediction error:", str(e))
        return jsonify({'error': str(e), 'trace': traceback.format_exc()}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
