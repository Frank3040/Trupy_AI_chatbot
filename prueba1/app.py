from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# En local puedes restringir orígenes si quieres:
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"]
    }
})

@app.post("/api/chat")
def chat():
    data = request.get_json() or {}
    user_message = data.get("message", "")
    bot_response = user_message  # eco

    return jsonify({
        "user": user_message,
        "bot": bot_response
    })

@app.get("/api/health")
def health():
    return {"ok": True}

if __name__ == "__main__":
    # Solo local; si luego quieres LAN cambia a host="0.0.0.0"
    app.run(host="127.0.0.1", port=5000, debug=True)
