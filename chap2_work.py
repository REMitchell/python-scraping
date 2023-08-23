from urllib.request import urlopen
from bs4 import BeautifulSoup
import re

html = urlopen('http://www.pythonscraping.com/pages/warandpeace.html')
bs = BeautifulSoup(html.read(), 'html.parser')

nameList = bs.find_all('span', {'class':'green'})
for name in nameList:
    print(name.get_text())

# the princeの出現回数をカウントする場合
nameList = bs.find_all(string='the prince')
print(len(nameList))

## 2-2-3-1
html = urlopen('http://www.pythonscraping.com/pages/page3.html')
bs = BeautifulSoup(html.read(), 'html.parser')

for child in bs.find('table', {'id': 'giftList'}).children:
    print(child)

## 2-2-3-2
for sibling in bs.find('table', {'id':'giftList'}).tr.next_siblings:
    print(sibling)

## 2-2-3-3
print(bs.find('img', {'src':'../img/gifts/img1.jpg'}).parent.previous_sibling.get_text())

## chap2-4: regular expression
images = bs.find_all('img', {'src':re.compile('..\/img\/gifts\/img.*.jpg')})
for image in images:
    print(image['src'])

