from urllib.request import urlopen
from bs4 import BeautifulSoup

html = urlopen('http://pythonscraping.com/pages/page1.html')
#print(html.read())
bs = BeautifulSoup(html.read(), 'html.parser')
print(bs.h1)