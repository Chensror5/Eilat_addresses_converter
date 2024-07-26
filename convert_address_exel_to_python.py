import pandas as pd
import json

# Load the Excel file
file_path = 'המרת כתובות אילת.xlsx'
data = pd.read_excel(file_path)

# Convert the DataFrame to a list of dictionaries
addresses = data.to_dict(orient='records')

# Format the list in JavaScript object format
formatted_addresses = [
    {"original": str(row["מס' בית"]), "street": row["שם הרחוב"], "translated": row["מס' בית.1"]}
    for row in addresses
]

# Convert the list to a JSON formatted string
addresses_js_code = f"const addresses = {json.dumps(formatted_addresses, ensure_ascii=False)};"

# Save to a .js file
with open('addresses.js', 'w', encoding='utf-8') as f:
    f.write(addresses_js_code)

print("JavaScript file generated successfully.")
