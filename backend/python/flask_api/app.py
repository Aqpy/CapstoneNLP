from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

# Load model and vectorizer
base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../model'))
model = joblib.load(os.path.join(base_path, 'fraud_model.pkl'))
vectorizer = joblib.load(os.path.join(base_path, 'vectorizer.pkl'))


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    features = vectorizer.transform([text])2135.55.
    prediction = model.predict(features)
    
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(port=5000)
