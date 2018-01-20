
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
import random
from multiprocessing import Process, Queue
import os
import time


def task_delegator(taskQueue, foundUrlsQueue):
    #Initialize with a task for each process
    visited = ['/wiki/Kevin_Bacon', '/wiki/Monty_Python']
    taskQueue.put('/wiki/Kevin_Bacon')
    taskQueue.put('/wiki/Monty_Python')

    while 1:
        #Check to see if there are new links in the foundUrlsQueue for processing
        if not foundUrlsQueue.empty():
            links = [link for link in foundUrlsQueue.get() if link not in visited]
            for link in links:
                #Add new link to the taskQueue
                taskQueue.put(link)

def get_links(bsObj):
    links = bsObj.find('div', {'id':'bodyContent'}).find_all('a', href=re.compile('^(/wiki/)((?!:).)*$'))
    return [link.attrs['href'] for link in links]

def scrape_article(taskQueue, foundUrlsQueue):
    while 1:
        while taskQueue.empty():
            #Sleep 100 ms while waiting for the task queue 
            #This should be rare
            time.sleep(.1)
        path = taskQueue.get()
        html = urlopen('http://en.wikipedia.org{}'.format(path))
        time.sleep(5)
        bsObj = BeautifulSoup(html, 'html.parser')
        title = bsObj.find('h1').get_text()
        print('Scraping {} in process {}'.format(title, os.getpid()))
        links = get_links(bsObj)
        #Send these to the delegator for processing
        foundUrlsQueue.put(links)


processes = []
taskQueue = Queue()
foundUrlsQueue = Queue()
processes.append(Process(target=task_delegator, args=(taskQueue, foundUrlsQueue,)))
processes.append(Process(target=scrape_article, args=(taskQueue, foundUrlsQueue,)))
processes.append(Process(target=scrape_article, args=(taskQueue, foundUrlsQueue,)))

for p in processes:
    p.start()