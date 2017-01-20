# Name: Jules Blom
# Student number: 11363150
import csv
import json
from collections import defaultdict

temps = []

openName = "crude oil.csv"
writeName =  "data.json"

new_json = open(writeName, 'w') 

with open(openName, 'rb') as csvfile:
    
    temp = csv.reader(csvfile, delimiter = ',', quotechar = '|')

    country_names = []
    years = []

    for row in temp:
        country = row[1].upper()
        year = row[0]
        tradecountry = row[2].upper()
        try:
            exp = int(row[3])
        except ValueError:
            exp = row[3]
        try:    
            imp = int(row[4]) 
        except ValueError:
            imp = row[4]
            
        # JSON format
        dicts = {country: {
                            year: { "name": year,
                                    "children": {
                                    "country": tradecountry,
                                    "export": exp,
                                    "import": imp
                                    }
                                }
                        }   
                }

        temps.append(dicts)

# Merge all duplicate countries
country_merged = defaultdict(list)

for d in temps:
    for key, value in d.iteritems():
        country_merged[key].append(value)

# print country_merged

years_merged = defaultdict(list)

for d in country_merged:
    # print d

    years_merged[d] = {}

    for e in country_merged[d]:
        # print e
        for key, value in e.iteritems():
            # print "key:",key, "value:", value
            
            if key not in years_merged[d]:
                years_merged[d][key] = []
            years_merged[d][key].append(value)

children_merged = defaultdict(list)

for country in years_merged:
    print "##############################"
    print country
    print "##############################"
    children_merged[country] = {}

    for year in years_merged[country]:
        children_merged[country][year] = {}

        print "###############"
        print "    ", year
        print "###############"
        # print years_merged[f][g][0:]
        test_merge = []

        for h in years_merged[country][year][0:]:
            # print h

            name = h["name"] # this key is "name"
            children = h["children"] # key is "children" !!!
            print name, "children:", children


            test_merge.append(children)

        print "///////////////////// testmerge /////////////////////////"
        print test_merge

        children_merged[country][year]["name"] = year
        children_merged[country][year]["children"] = test_merge
            #Alle children in een jaar mergen


# for i in country_merged:
#     print i

# print len(country_merged)

# Convert to JSON
json_dump = json.dumps(children_merged, indent = 4, separators = (',', ': '))
print(json_dump)
new_json.write(json_dump)