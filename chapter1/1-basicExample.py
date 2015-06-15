from urllib.request import urlopen
html = urlopen("http://www.pythonscraping.com/exercises/exercise1.html")
print(html.read())