from urllib.request 
import urlopenfrom bs4 
import BeautifulSoupimport re

html = urlopen("http://www.pythonscraping.com/pages/page3.html")
bsObj = BeautifulSoup(html)
images = bsObj.findAll("img", {"src":re.compile("\.\.\/img\/gifts/img.*\.jpg")})
for image in images: 
    print(image["src"])