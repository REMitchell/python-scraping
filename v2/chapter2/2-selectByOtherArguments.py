from urllib.request import urlopen
from bs4 import BeautifulSoup


html = urlopen('http://www.pythonscraping.com/pages/warandpeace.html')
bs = BeautifulSoup(html, "html.parser")

# Select by tags
titles = bs.find_all(['h1', 'h2','h3','h4','h5','h6'])
print([title for title in titles])

# Select by tag attributes
allText = bs.find_all('span', {'class':{'green', 'red'}})
print([text for text in allText])

# Select by text content of tags
nameList = bs.find_all(text='the prince')
print(len(nameList))

# Select by tags that contains a particular attribute
titles = bs.find_all(id='title', class_='text')
print([title for title in titles])
