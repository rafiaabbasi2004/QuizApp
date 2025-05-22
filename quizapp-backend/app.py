from flask import Flask, request, jsonify
from flask_cors import CORS
from fuzzylogic import get_difficulty
import json
app = Flask(__name__)
CORS(app)

@app.route("/api/quiz", methods=["POST"])
def generate_quiz():
    data = request.json
    score = data.get("score", 0)
    response_time = data.get("responseTime", 0)

    level = get_difficulty(score, response_time)

    questions = get_questions_by_difficulty(level)  # dummy data for now

    return jsonify({"questions": questions, "level": level})

def get_questions_by_difficulty(level):
    with open("questions.json", "r") as f:
        data = json.load(f)

    questions = data.get(level, [])
    return questions[:2]  # return first 2 questions of that difficulty


if __name__ == "__main__":
    app.run(debug=True)
