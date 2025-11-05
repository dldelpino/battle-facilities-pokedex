import requests
from bs4 import BeautifulSoup
import json
from collections import defaultdict

# tras generar el archivo, he renombrado Never-Melt Ice a NeverMeltIce

# tarda alrededor de un minuto en ejecutarse

sets = []

trainerClasses = ['Youngster', 'Lass', 'School Kid', 'Rich Boy', 'Lady', 'Preschooler', 'Backpacker', 'Waiter', 'Waitress', 'Pokéfan', 'Hiker', 'Fisherman', 'Parasol Lady', 'Roughneck', 'Biker', 'Baker', 'Policeman', 'Clerk', 'Harlequin', 'Maid', 'Artist', 'Nursery Aide', 'Worker', 'Cyclist', 'Janitor', 'Depot Agent', 'Doctor', 'Nurse', 'Gentleman', 'Socialite', 'Pokémon Breeder', 'Pilot', 'Scientist', 'Psychic', 'Black Belt', 'Battle Girl', 'Pokémon Ranger', 'Ace Trainer', 'Veteran']

# print(len(trainerClasses) != len(set(trainerClasses))) # si devuelve False, no hay elementos duplicados en la lista

def stringToSpan(string): # convierte un string de la forma '<span>...</span>' en un objeto BeautifulSoup
    aux = BeautifulSoup(string, 'html.parser')
    bs = aux.span
    return bs

for trainerClass in trainerClasses:
    print(trainerClass)
    url = requests.get('https://bulbapedia.bulbagarden.net/wiki/List_of_Battle_Subway_Trainers/' + trainerClass)
    soup = BeautifulSoup(url.text, 'html.parser')
    tables = soup.find_all("table", attrs = {"class": "sortable"}) # tablas de la URL (parece que no puedo filtrar por más de una clase)
    trainers = soup.find_all("span", attrs = {"class": "mw-headline"}) # nombres encima de las tablas
    header = ['Pokémon', 'Item', 'Moves', 'Nature', 'HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe', 'Trainers']
    N = len(tables)
    for i in range(N):
        table = tables[i]
        trainer = trainers[i] # nombre de los entrenadores a los que pertenecen los Pokémon de esta tabla
        trainer = trainer.text.replace(" and ", ", ")
        trainer = trainer.split(", ") # convierte "Antonio, Juan and Pedro" en ["Antonio", "Juan", "Pedro"]
        trainer = [trainerClass + ' ' + name for name in trainer]
        rows = table.find_all("tr", attrs = {"style": "text-align:center; background:#fff"})
        for row in rows:
            cells = row.find_all("td") # [número de Pokédex, foto, nombre, objeto, naturaleza, HP, Atk, Def, SpA, SpD, Spe]
            data = {
                '#': cells[0].text.strip(), # strip elimina espacios al principio y al final y saltos de línea
                'Pokémon': cells[2].text.strip(),
                'Item': cells[3].text.strip(),
                'Moves': [
                    cells[4].text.strip(),
                    cells[5].text.strip(),
                    cells[6].text.strip(),
                    cells[7].text.strip(),
                ],
                'Nature': cells[8].text.strip(),
                'EVs': [
                    cells[9].text.strip(),
                    cells[10].text.strip(),
                    cells[11].text.strip(),
                    cells[12].text.strip(),
                    cells[13].text.strip(),
                    cells[14].text.strip(),
                ],
                'Trainers': trainer
            }
            sets.append(data)

grouped = defaultdict(list) # defaultdict es una subclase de dict que facilita añadir elementos a un diccionario

for s in sets:
    key = (s["#"], s["Pokémon"], s["Item"], tuple(s["Moves"]), s["Nature"], tuple(s["EVs"]))
    grouped[key].extend(s["Trainers"])

groupedSets = []

for key, trainers in grouped.items():
    groupedSets.append({
        "#": key[0],
        "Pokémon": key[1],
        "Item": key[2],
        "Moves": list(key[3]),
        "Nature": key[4],
        "EVs": list(key[5]),
        "Trainers": trainers
    })

with open("src/data/BW.json", "w", encoding="utf-8") as f: # "w" - write; "r" - read; "a" - append; "x" - create
    json.dump(groupedSets, f, indent = 2, ensure_ascii = False) # indent = 2 hace que el JSON sea más legible; ensure_ascii = False hace que los caracteres no ASCII no den problemas
