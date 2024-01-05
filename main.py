import hashlib
import json
h = hashlib.new('sha1')

def hash(s):
  h.update(bytes(s))
  return h.hexdigest()

if __name__ == '__main__':
  with open('public/algolia.json', 'r') as f:
    rows = json.load(f)
    for i in range(len(rows)):
      rows[i]['objectID'] = hash(rows[i]['uri'])
    
