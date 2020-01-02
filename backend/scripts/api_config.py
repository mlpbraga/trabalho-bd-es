with open('config/database.json', 'r') as f:
  text = f.read()
  text = text.replace('"host": "localhost"','"host": "postgres"')
with open('config/database.json', 'w') as f:
  f.write(text)