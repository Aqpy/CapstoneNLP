from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

model_path = os.path.join('..', 'model', 'fraud_model.pkl')
vectorizer_path = os.path.join('..', 'model', 'vectorizer.pkl')

model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data.get('text')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    features = vectorizer.transform([text])
    prediction = model.predict(features)
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
