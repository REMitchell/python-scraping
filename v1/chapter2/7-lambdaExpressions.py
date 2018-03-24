from urllib.request import urlopen
from bs4 import BeautifulSoup
html = urlopen("http://www.pythonscraping.com/pages/page2.html")
bsObj = BeautifulSoup(html, "html.parser")
tags = bsObj.findAll(lambda tag: len(tag.attrs) == 2)
for tag in tags:
	print(tag)