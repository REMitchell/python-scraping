import re
import random
import unittest
from urllib.request import urlopen
from urllib.parse import unquote

from bs4 import BeautifulSoup


class TestWikipedia(unittest.TestCase):
    bsObj = None
    url = None

    def test_PageProperties(self):
        url = "http://en.wikipedia.org/wiki/Monty_Python"
        # Test the first 100 pages we encounter
        for i in range(1, 100):
            bsObj = BeautifulSoup(urlopen(url))
            titles = self.titleMatchesURL(bsObj, url)
            self.assertEquals(titles[0], titles[1])
            self.assertTrue(self.contentExists(bsObj))
            url = self.getNextLink(bsObj)
        print("Done!")

    def titleMatchesURL(self, bsObj, url):
        pageTitle = bsObj.find("h1").get_text()
        urlTitle = url[(url.index("/wiki/")+6):]
        urlTitle = urlTitle.replace("_", " ")
        urlTitle = unquote(urlTitle)
        return [pageTitle.lower(), urlTitle.lower()]

    def contentExists(self, bsObj):
        content = bsObj.find("div", {"id": "mw-content-text"})
        return content is not None

    def getNextLink(self, bsObj):
        links = bsObj.find("div", {"id": "bodyContent"}) \
                     .findAll("a", href=re.compile("^(/wiki/)((?!:).)*$"))
        link = links[random.randint(0, len(links) - 1)].attrs['href']
        print("Next link is: " + link)
        return "http://en.wikipedia.org" + link

if __name__ == '__main__':
    unittest.main()
