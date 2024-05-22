import execjs
#PyExecJS
import os
from tabulate import tabulate

def load_js():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    js_file_path = os.path.join(current_dir, 'index.js')
    with open(js_file_path, 'r') as file:
        js_code = file.read()

    context = execjs.compile(js_code)
    return context
 
def generate_random_questions(min_lvl=0, max_lvl=10, number_of_questions=25, topic=0):
    context = load_js()
    dict_ = context.call('createSheet', min_lvl, max_lvl, number_of_questions, topic)

    return dict_

def print_all_topic_ids():
    context = load_js()
    array = context.call('get_topics')
    flat_data = [item for sublist in array for item in sublist]
    sorted_data = sorted(flat_data, key=lambda x: int(x["id"]), reverse=False)
    headers = sorted_data[0].keys()
    rows = [[d[h] for h in headers] for d in sorted_data]
    print(tabulate(rows, headers=headers,  tablefmt="simple_grid"))


def get_all_topic_ids():
    context = load_js()
    array = context.call('get_topics')
    flat_data = [item for sublist in array for item in sublist]
    sorted_data = sorted(flat_data, key=lambda x: int(x["id"]), reverse=False)
    return sorted_data