from flask import Flask, request, jsonify
from flask_cors import CORS
from trupy_logic import trupy_ai
import json
import re

app = Flask(__name__)

# CORS configuration for local development
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"]
    }
})

# Store conversation sessions (in production, use Redis or database)
sessions = {}

@app.post("/api/chat")
def chat():
    try:
        data = request.get_json() or {}
        user_message = data.get("message", "")
        session_id = data.get("session_id", "default")
        
        if not user_message:
            return jsonify({
                "error": "Message is required"
            }), 400
        
        # Initialize session if it doesn't exist
        if session_id not in sessions:
            sessions[session_id] = {
                "ai_instance": trupy_ai(),
                "conversation_started": False,
                "conversation_ended": False
            }
        
        session = sessions[session_id]
        
        # Check if conversation has already ended
        if session["conversation_ended"]:
            return jsonify({
                "user": user_message,
                "bot": "This conversation has ended. Please start a new session.",
                "conversation_ended": True
            })
        
        # Handle first interaction
        if not session["conversation_started"]:
            bot_response = session["ai_instance"].first_response()
            session["conversation_started"] = True
            
            return jsonify({
                "user": user_message,
                "bot": bot_response["message"] if isinstance(bot_response, dict) else str(bot_response),
                "conversation_ended": False
            })
        
        # Get AI response
        ai_response = session["ai_instance"].get_response(user_message)
        bot_message = ai_response if isinstance(ai_response, str) else ai_response.get("message", "")
        
        # Check if conversation should end (contains smiley face)
        if ":)" in bot_message:
            try:
                # Get final JSON response
                final_response = session["ai_instance"].final_response()
                final_content = final_response["message"] if isinstance(final_response, dict) else str(final_response)
                
                # Try to extract JSON from the response
                json_data = extract_json_from_response(final_content)
                
                session["conversation_ended"] = True
                
                return jsonify({
                    "user": user_message,
                    "bot": bot_message,
                    "conversation_ended": True,
                    "collected_data": json_data
                })
                
            except Exception as e:
                print(f"Error processing final response: {e}")
                session["conversation_ended"] = True
                
                return jsonify({
                    "user": user_message,
                    "bot": bot_message,
                    "conversation_ended": True,
                    "collected_data": None,
                    "error": "Failed to collect final data"
                })
        
        return jsonify({
            "user": user_message,
            "bot": bot_message,
            "conversation_ended": False
        })
        
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500

@app.post("/api/reset-session")
def reset_session():
    """Reset a conversation session"""
    try:
        data = request.get_json() or {}
        session_id = data.get("session_id", "default")
        
        if session_id in sessions:
            del sessions[session_id]
        
        return jsonify({
            "message": "Session reset successfully",
            "session_id": session_id
        })
        
    except Exception as e:
        return jsonify({
            "error": "Failed to reset session",
            "details": str(e)
        }), 500

@app.get("/api/health")
def health():
    """Health check endpoint"""
    return jsonify({
        "ok": True,
        "service": "Trupy AI Flask Server",
        "active_sessions": len(sessions)
    })

@app.get("/api/sessions")
def get_sessions():
    """Get information about active sessions"""
    session_info = {}
    for session_id, session in sessions.items():
        session_info[session_id] = {
            "conversation_started": session["conversation_started"],
            "conversation_ended": session["conversation_ended"]
        }
    
    return jsonify({
        "active_sessions": len(sessions),
        "sessions": session_info
    })

def extract_json_from_response(response_text):
    """Extract JSON from AI response text"""
    try:
        # Try to parse the entire response as JSON first
        return json.loads(response_text)
    except json.JSONDecodeError:
        # If that fails, try to find JSON within the text
        json_pattern = r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
        matches = re.findall(json_pattern, response_text)
        
        for match in matches:
            try:
                return json.loads(match)
            except json.JSONDecodeError:
                continue
        
        # If no valid JSON found, return None
        return None

if __name__ == "__main__":
    # Local development server
    print("Starting Trupy AI Flask Server...")
    print("Server will be available at: http://127.0.0.1:5000")
    print("API endpoints:")
    print("  POST /api/chat - Main chat endpoint")
    print("  POST /api/reset-session - Reset conversation session")
    print("  GET /api/health - Health check")
    print("  GET /api/sessions - Session information")
    
    app.run(host="127.0.0.1", port=5000, debug=True)