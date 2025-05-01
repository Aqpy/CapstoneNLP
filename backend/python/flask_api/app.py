from flask import Flask, request, jsonify
import joblib
import os
import traceback

app = Flask(__name__)  # Corrected from _name_ to __name__

# Load model and vectorizer
try:
<<<<<<< HEAD
    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../model'))  # Corrected _file_ to __file__
=======
    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../model'))
>>>>>>> 2e3631f6cd9c10677c0cad4624e9ee9918999eea
    model = joblib.load(os.path.join(base_path, 'fraud_model.pkl'))
    vectorizer = joblib.load(os.path.join(base_path, 'vectorizer.pkl'))
except Exception as e:
    print("Error loading model/vectorizer:", e)

# Health check route
@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Email Fraud Detection API is live'}), 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400

        features = vectorizer.transform([text])
        prediction = model.predict(features)[0]
<<<<<<< HEAD

        label = 'fraud' if prediction == 1 else 'not fraud'

        return jsonify({'prediction': int(prediction), 'label': label}), 200

    except Exception as e:
        return jsonify({'error': str(e), 'trace': traceback.format_exc()}), 500

if __name__ == '__main__':  # Corrected from _name_ to __name__
    app.run(host='0.0.0.0', port=5000, debug=True)
=======

        label = 'fraud' if prediction == 1 else 'not fraud'

        return jsonify({'prediction': int(prediction), 'label': label}), 200

    except Exception as e:
        return jsonify({'error': str(e), 'trace': traceback.format_exc()}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
>>>>>>> 2e3631f6cd9c10677c0cad4624e9ee9918999eea
