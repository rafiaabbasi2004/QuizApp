import pygad
import random
import json

# Load question bank
with open("questions.json", "r") as f:
    question_bank = json.load(f)

# Flatten all questions
all_questions = question_bank["easy"] + question_bank["medium"] + question_bank["hard"]

# Convert to indexes (so GA can work on integers)
question_indices = list(range(len(all_questions)))

# Define fitness function using new format
def fitness_func(ga_instance, solution, solution_idx):
    questions = [all_questions[int(i)] for i in solution]
    seen = set()
    score = 0

    for q in questions:
        if q["question"] not in seen:
            seen.add(q["question"])
            diff_score = 1 if "easy" in q["question"].lower() else 2 if "medium" in q["question"].lower() else 3
            score += diff_score
    return score

# GA Configuration
ga_instance = pygad.GA(
    num_generations=5,
    num_parents_mating=3,
    fitness_func=fitness_func,
    sol_per_pop=10,
    num_genes=10,
    gene_space=question_indices,
    mutation_percent_genes=10,
    gene_type=int,
    allow_duplicate_genes=False
)

# Run GA
ga_instance.run()

# Get best solution
best_solution, _, _ = ga_instance.best_solution()
evolved_questions = [all_questions[int(i)] for i in best_solution]

def get_evolved_question_set():
    ga_instance.run()
    best_solution, _, _ = ga_instance.best_solution()
    evolved_questions = [all_questions[int(i)] for i in best_solution]
    return evolved_questions
