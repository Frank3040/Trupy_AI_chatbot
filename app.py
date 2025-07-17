from flask import Flask, render_template, request, session, redirect, url_for

app = Flask(__name__)
app.secret_key = 'secreto-super-seguro'

@app.route("/", methods=["GET", "POST"])
def index():
    if "messages" not in session:
        session["messages"] = []

    if request.method == "POST":
        user_message = request.form["message"]
        bot_response = user_message  # el bot repite el mensaje

        session["messages"].append({"sender": "Tú", "text": user_message})
        session["messages"].append({"sender": "Bot", "text": bot_response})
        session.modified = True
        return redirect(url_for("index"))

    return render_template("index.html", messages=session["messages"])

if __name__ == "__main__":
    app.run(debug=True)
