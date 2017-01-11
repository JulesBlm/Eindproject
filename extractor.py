import csv


with open('year_origin_destination_sitc_rev2.tsv','rb') as tsv_in, open('new.csv', 'wb') as csv_out:
	tsv_in = csv.reader(tsv_in, delimiter = '\t')
	csv_out = csv.writer(csv_out)

	next(tsv_in)

	for row in tsv_in:
		try:
			if int(row[3]) == 3330:
				print row
				csv_out.writerows([row])
		except:
			pass
		# count = int(row[4])
		# if count > 0:
		#     csvout.writerows([row[2:4] for _ in xrange(count)])
