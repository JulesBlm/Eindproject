# Name: Jules Blom
# Student number: 11363150
import csv
import json
from pprint import pprint

writeName =  "world-50m-cc.json"
new_json = open(writeName, 'w') 

with open("countrycodes.csv", 'rb') as countrycodesfile:
	codestemp = csv.reader(countrycodesfile, delimiter = ',', quotechar = '|')

	with open('world-50m.json') as data_file:
		worldmap = json.load(data_file)

		for row in codestemp:
			for num_id in worldmap["objects"]["countries"]["geometries"]:

				map_id = num_id["id"]

				if map_id == int(row[2]):
					print map_id, row[0]
					num_id["id"] = row[1]
			 		
		pprint(worldmap["objects"]["countries"]["geometries"])

json_dump = json.dumps(worldmap)
new_json.write(json_dump)