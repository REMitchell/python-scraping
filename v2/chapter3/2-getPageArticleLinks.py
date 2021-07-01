from urllib.request import urlopen
from bs4 import BeautifulSoup
import re


html = urlopen('http://en.wikipedia.org/wiki/Kevin_Bacon')
bs = BeautifulSoup(html, 'html.parser')
regex = re.compile('^(/wiki/)((?!:).)*$')
for link in bs.find('div', {'id':'bodyContent'}).find_all('a', href=regex):
    if 'href' in link.attrs:
        print(link.attrs['href'])
