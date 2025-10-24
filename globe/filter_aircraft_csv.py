
import csv

# Step 1: Load flights100k.csv and get unique icao24 numbers
unique_icao24 = set()
with open('flights100k.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        unique_icao24.add(row['icao24'])

# Step 2: Open aircraft.csv and filter based on unique_icao24 list
with open('aircraft.csv', 'r') as infile, open('aircraft_filtered.csv', 'w', newline='') as outfile:
    reader = csv.reader(infile)
    writer = csv.writer(outfile)

    # Write header to output file
    header = next(reader)
    writer.writerow(header)

    # Find the index of the 'icao24' column
    try:
        icao24_index = header.index('icao24')
    except ValueError:
        print("Error: 'icao24' column not found in aircraft.csv")
        exit()
    
    # Filter and write rows
    for row in reader:
        if row[icao24_index] in unique_icao24:
            writer.writerow(row)

print("Filtered aircraft data saved to aircraft_filtered.csv")
