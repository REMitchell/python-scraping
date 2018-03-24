from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
import random
import _thread
from queue import Queue
import time
import pymysql


def storage(queue):
    conn = pymysql.connect(host='127.0.0.1', unix_socket='/tmp/mysql.sock', user='root', passwd='', db='mysql', charset='utf8')
    cur = conn.cursor()
    cur.execute('USE wiki_threads')
    while 1:
        if not queue.empty():
            article = queue.get()
            cur.execute('SELECT * FROM pages WHERE path = %s', (article["path"]))
            if cur.rowcount == 0:
                print("Storing article {}".format(article["title"]))
                cur.execute('INSERT INTO pages (title, path) VALUES (%s, %s)', (article["title"], article["path"]))
                conn.commit()
            else:
                print("Article already exists: {}".format(article['title']))

visited = []
def getLinks(thread_name, bsObj):
    print('Getting links in {}'.format(thread_name))
    links = bsObj.find('div', {'id':'bodyContent'}).find_all('a', href=re.compile('^(/wiki/)((?!:).)*$'))
    return [link for link in links if link not in visited]

def scrape_article(thread_name, path, queue):
    visited.append(path)
    html = urlopen('http://en.wikipedia.org{}'.format(path))
    time.sleep(5)
    bsObj = BeautifulSoup(html, 'html.parser')
    title = bsObj.find('h1').get_text()
    print('Added {} for storage in thread {}'.format(title, thread_name))
    queue.put({"title":title, "path":path})
    links = getLinks(thread_name, bsObj)
    if len(links) > 0:
        newArticle = links[random.randint(0, len(links)-1)].attrs['href']
        scrape_article(thread_name, newArticle, queue)

queue = Queue()
try:
   _thread.start_new_thread(scrape_article, ('Thread 1', '/wiki/Kevin_Bacon', queue,))
   _thread.start_new_thread(scrape_article, ('Thread 2', '/wiki/Monty_Python', queue,))
   _thread.start_new_thread(storage, (queue,))
except:
   print ('Error: unable to start threads')

while 1:
    pass