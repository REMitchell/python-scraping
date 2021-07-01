from urllib.request import urlopen
from bs4 import BeautifulSoup
import re


pages = set()
def getLinks(pageUrl):
    global pages
    html = urlopen('http://en.wikipedia.org{}'.format(pageUrl))
    bs = BeautifulSoup(html, 'html.parser')
    try:
        # Find the page's title
        print(bs.h1.get_text())
        # Find the page's 1st paragraph
        print(bs.find(id ='mw-content-text').find_all('p')[0])
        # Find edit links (doesn't aply anymore)
        print(bs.find(id='ca-edit').find('span').find('a').attrs['href']) 
    except AttributeError:
        print('This page is missing something! Continuing.')
    for link in bs.find_all('a', href=re.compile('^(/wiki/)')):
        if 'href' in link.attrs:
            if link.attrs['href'] not in pages:
                #We have encountered a new page
                newPage = link.attrs['href']
                print('-'*20)
                print(newPage)
                pages.add(newPage)
                getLinks(newPage)


getLinks('')
