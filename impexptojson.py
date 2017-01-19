# Name: Jules Blom
# Student number: 11363150
import csv
import json
from collections import defaultdict

temps = []

writeName =  "imports.json"

new_json = open(writeName, 'w') 

with open('imports.csv', 'rb') as csvfile:    
    readerObj = csv.reader(csvfile, delimiter = ',', quotechar = '|')

    counter = 0

    for row in readerObj:
        year = row[0]

        # Get country headers from first line
        if readerObj.line_num == 1:
            countries = row[1:36]
            continue
        else:
            values = row[1:]
        print len(values)


        for country in countries:
            # try to convert to float
            try:
                value = float(values[counter])
            except ValueError:
                value = values[counter]
                pass

            dicts = {year: {"country" : country, "value" : value}}

            counter += 1
            temps.append(dicts)

        # Reset counter
        counter = 0

        # "2013": [
        #   {"country":"CAN", "value": 653},


# Group together by year
years_merged = defaultdict(list)

for d in temps:
    for key, value in d.iteritems():
        years_merged[key].append(value)

# # Convert to JSON
json_dump = json.dumps(years_merged, indent = 4, separators = (',', ': '))
print(json_dump)
new_json.write(json_dump)