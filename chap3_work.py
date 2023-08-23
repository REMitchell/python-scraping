from urllib.request import urlopen
from bs4 import BeautifulSoup
import re

html = urlopen('http://en.wikipedia.org/wiki/Kevin_Bacon')
bs = BeautifulSoup(html, 'html.parser')
for link in bs.find('div', {'id':'bodyContent'}).find_all('a', href=re.compile('^(/wiki/)((?!:).)*$')):
    # ?!から始まる文字列を()で囲むことで，その文字列を含まないを表現できる．(?!:).で1つのコロンを含まない，((?!:).)*コロン以外の0文字以上の文字列を表している
    if 'href' in link.attrs:
        print(link.attrs['href'])