import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

# Define input variables
score = ctrl.Antecedent(np.arange(0, 101, 1), 'score')
time = ctrl.Antecedent(np.arange(0, 61, 1), 'time')  # response time in seconds

# Define output variable
difficulty = ctrl.Consequent(np.arange(0, 11, 1), 'difficulty')  # 0 = easy, 10 = hard

# Membership functions for score
score['low'] = fuzz.trimf(score.universe, [0, 0, 50])
score['medium'] = fuzz.trimf(score.universe, [30, 60, 80])
score['high'] = fuzz.trimf(score.universe, [60, 100, 100])

# Membership functions for time
time['slow'] = fuzz.trimf(time.universe, [30, 60, 60])
time['average'] = fuzz.trimf(time.universe, [10, 30, 50])
time['fast'] = fuzz.trimf(time.universe, [0, 0, 30])

# Membership functions for difficulty
difficulty['easy'] = fuzz.trimf(difficulty.universe, [0, 0, 4])
difficulty['medium'] = fuzz.trimf(difficulty.universe, [3, 5, 7])
difficulty['hard'] = fuzz.trimf(difficulty.universe, [6, 10, 10])

# Define fuzzy rules
rule1 = ctrl.Rule(score['low'] & time['slow'], difficulty['easy'])
rule2 = ctrl.Rule(score['low'] & time['fast'], difficulty['medium'])
rule3 = ctrl.Rule(score['medium'] & time['average'], difficulty['medium'])
rule4 = ctrl.Rule(score['high'] & time['fast'], difficulty['hard'])
rule5 = ctrl.Rule(score['high'] & time['slow'], difficulty['medium'])

# Control system
difficulty_ctrl = ctrl.ControlSystem([rule1, rule2, rule3, rule4, rule5])
difficulty_simulator = ctrl.ControlSystemSimulation(difficulty_ctrl)

def get_difficulty(score_val, time_val):
    difficulty_simulator.input['score'] = score_val
    difficulty_simulator.input['time'] = time_val
    difficulty_simulator.compute()
    output = difficulty_simulator.output['difficulty']
    if output < 4:
        return "easy"
    elif output < 7:
        return "medium"
    else:
        return "hard"
