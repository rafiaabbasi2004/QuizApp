from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
from fuzzylogic import get_difficulty
from genetic_algo import get_evolved_question_set

app = Flask(__name__)
CORS(app)

# Load full question bank once
with open("questions.json", "r") as f:
    all_questions = json.load(f)
@app.route("/api/quiz", methods=["POST"])
def get_adaptive_question():
    data = request.json
    score = data.get("score", 0)
    response_time = data.get("responseTime", 10)
    initial = data.get("initialDifficulty", "medium")
    used_ids = data.get("usedQuestionIds", [])  # New: Get list of already used question IDs

    # Use fuzzy logic
    difficulty = get_difficulty(score, response_time) if score > 0 else initial

    # Get available questions and filter out used ones
    all_available = all_questions.get(difficulty, [])
    available = [q for q in all_available if q["id"] not in used_ids]

    if available:
        question = random.choice(available)
    else:
        question = {
            "id": -1,
            "question": "No more new questions available at this difficulty.",
            "options": [],
            "answer": ""
        }

    return jsonify({
        "questions": [question],
        "level": difficulty
    })


@app.route("/api/quiz/bulk", methods=["POST"])
def get_evolved_quiz():
    questions = get_evolved_question_set()
    return jsonify({
        "questions": questions
    })

if __name__ == "__main__":
    app.run(debug=True)
