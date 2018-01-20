from website import Website
from content import Content

import requests
from bs4 import BeautifulSoup

class Crawler:

    def getInternalLinks(bsObj, includeUrl):
        internalLinks = []
        #Finds all links that begin with a "/"
        for link in bsObj.findAll("a", href=re.compile("^(/|.*"+includeUrl+")")):
            if link.attrs['href'] is not None:
                if link.attrs['href'] not in internalLinks:
                    internalLinks.append(link.attrs['href'])
        return internalLinksdef getInternalLinks(bsObj, includeUrl):
        internalLinks = []
        #Finds all links that begin with a "/"
        for link in bsObj.findAll("a", href=re.compile("^(/|.*"+includeUrl+")")):
            if link.attrs['href'] is not None:
                if link.attrs['href'] not in internalLinks:
                    internalLinks.append(link.attrs['href'])
        return internalLinks

    def getPage(self, url):
        """
        Utilty function used to get a Beautiful Soup object from a given URL
        """
        print("Retrieving URL:\n{}".format(url))
        session = requests.Session()
        headers = {"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36", "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"}
        try:
            req = session.get(url, headers=headers)
        except requests.exceptions.RequestException:
            return None
        bsObj = BeautifulSoup(req.text, "lxml")
        return bsObj

    def safeGet(self, pageObj, selector):
        """
        Utilty function used to get a content string from a Beautiful Soup
        object and a selector. Returns an empty string if no object
        is found for the given selector
        """
        childObj = pageObj.select(selector)
        if childObj is not None and len(childObj) > 0:
            return childObj[0].get_text()
        return ""

    def crawl(self, topic, site):
        """
        Searches a given website for a given topic and records all pages found
        """
        bsObj = self.getPage(site.searchUrl+topic)
        links = getInternalLinks()

crawler = Crawler()

siteData = [
    ["O'Reilly Media","http://oreilly.com","https://ssearch.oreilly.com/?q=", "article.product-result","p.title a",True,"h1","section#product-description"],
    ["Reuters","http://reuters.com","http://www.reuters.com/search/news?blob=","div.search-result-content","h3.search-result-title a",False,"h1","div.ArticleBody_body_2ECha"],
    ["Brookings","http://www.brookings.edu","https://www.brookings.edu/search/?s=","div.list-content article","h4.title a",True,"h1","div.post-body"]
    ]
sites = []
for row in siteData:
    sites.append(Website(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7]))

