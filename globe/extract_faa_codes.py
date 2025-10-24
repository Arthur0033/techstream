from bs4 import BeautifulSoup
import csv

# Open and read the HTML file
with open("file.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

# Find the first table in the HTML
#table = soup.find("table")
tables = soup.find_all("table")

# Extract headers
headers = [th.get_text(strip=True) for th in tables[0].find_all("th")]

rows = []
for table in tables:
    # Extract rows
    for tr in table.find_all("tbody")[0].find_all("tr"):
        cells = [td.get_text(strip=True) for td in tr.find_all("td")]
        rows.append(cells)

# Write to CSV
with open("file.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(rows)

print("Data extracted and saved to file.csv")

