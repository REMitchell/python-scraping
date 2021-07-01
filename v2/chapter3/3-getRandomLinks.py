from urllib.request import urlopen
from bs4 import BeautifulSoup
import datetime
import random
import re


def getLinks(articleUrl):
    html = urlopen('http://en.wikipedia.org{}'.format(articleUrl))
    bs = BeautifulSoup(html, 'html.parser')
    regex = re.compile('^(/wiki/)((?!:).)*$')
    return bs.find('div', {'id':'bodyContent'}).find_all('a', href=regex)


random.seed(datetime.datetime.now())
links = getLinks('/wiki/Kevin_Bacon')
while len(links) > 0:
    newArticle = links[random.randint(0, len(links)-1)].attrs['href']
    print(newArticle)
    links = getLinks(newArticle)
