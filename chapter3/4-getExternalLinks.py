from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re
import random

pages = set()


#Retrieves a list of all Internal links found on a page
def getInternalLinks(bsObj, includeUrl):
    internalLinks = []
    #Finds all links that begin with a "/"
    for link in bsObj.findAll("a", href=re.compile("^(/|.*"+includeUrl+")")):
        if link.attrs['href'] is not None:
            if link.attrs['href'] not in internalLinks:
                internalLinks.append(link.attrs['href'])
    return internalLinks
            
#Retrieves a list of all external links found on a page
def getExternalLinks(bsObj, excludeUrl):
    excludeUrl = splitAddress(excludeUrl)[0]
    externalLinks = []
    #Finds all links that start with "http" or "www" that do
    #not contain the current URL
    for link in bsObj.findAll("a", href=re.compile("^(http|www)((?!"+excludeUrl+").)*$")):
        if link.attrs['href'] is not None and len(link.attrs['href']) != 0:
            if link.attrs['href'] not in externalLinks:
                externalLinks.append(link.attrs['href'])
    return externalLinks

def splitAddress(address):
    address = address.replace("www", "")
    addressParts = address.replace("http://", "").split("/")
    return addressParts


def followExternalOnly(bsObj, url):
    externalLinks = getExternalLinks(bsObj, splitAddress(url)[0])
    if len(externalLinks) == 0:
        #Only internal links here. Get another internal page and try again
        internalLinks = getInternalLinks(bsObj, url)
        bsObj = urlopen(internalLinks[random.randint(0, len(internalLinks)-1)])
        return followExternalOnly(bsObj, url)
    else:
        randomExternal = externalLinks[random.randint(0, len(externalLinks)-1)]
        try:
            nextBsObj = BeautifulSoup(urlopen(randomExternal))
            print(randomExternal)
            return [nextBsObj, url]
        except HTTPError:
            #Try again
            print("Encountered error at "+randomExternal+"! Trying again")
            return followExternalOnly(bsObj, url)
    


#Collects a list of all external URLs found on the site
allExtLinks = set()
allIntLinks = set()
def getAllExternalLinks(siteUrl):
    html = urlopen(siteUrl)
    bsObj = BeautifulSoup(html)
    internalLinks = getInternalLinks(bsObj,splitAddress(siteUrl)[0])
    externalLinks = getExternalLinks(bsObj,splitAddress(siteUrl)[0])
    for link in externalLinks:
        if link not in allExtLinks:
            allExtLinks.add(link)
            print(link)
    for link in internalLinks:
        if link not in allIntLinks:
            print("About to get link: "+link)
            allIntLinks.add(link)
            getAllExternalLinks(link)

url = "http://oreilly.com"
bsObj = BeautifulSoup(urlopen(url))
#Following random external links for 10 steps
for i in range(10):
    bsObj, url = followExternalOnly(bsObj, url)

#Get a collection of all external links on orielly.com
getAllExternalLinks("http://oreilly.com")


