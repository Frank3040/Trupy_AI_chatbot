from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite que el frontend (puerto 5173) pueda llamar a la API

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    bot_response = f"Es importante que sepas que tus sentimientos son válidos. ¿Cómo puedo ayudarte mejor?"  # Lógica actual

    return jsonify({
        "user": user_message,
        "bot": bot_response
    })

if __name__ == "__main__":
    app.run(debug=True)
