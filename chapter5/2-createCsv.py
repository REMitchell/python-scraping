import csv
import os

filename = "../files/test.csv"
os.makedirs(os.path.dirname(filename), exist_ok=True)
csvFile = open(filename, 'w', newline='')
try:
    writer = csv.writer(csvFile)
    writer.writerow(('number', 'number plus 2', 'number times 2'))
    for i in range(10):
        writer.writerow((i, i+2, i*2))
finally:
    csvFile.close()