# -*- coding: utf-8 -*-
"""
Created on Thu May 19 11:32:58 2022

@author: jkcao
"""

from kafka import KafkaProducer
import json
from random import choice
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
from time import sleep, mktime, strptime
from uuid import uuid5, NAMESPACE_DNS

def genHeader():
    headerset = [
        {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit 537.36 (KHTML, like Gecko) Chrome",
         "Accept": "text/html,application/xhtml+xml,application/xml; q=0.9,image/webp,*/*;q=0.8"},
        {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) ' 'Chrome/45.0.2454.101 Safari/537.36'},
        {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)" "Chrome/52.0.2743.116 Safari/537.36"},
        {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)" "Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586"},
        {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko"},
        {"User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0"},
        {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36"}]
    return choice(headerset)

def link2bso(link):
    req = Request(
        link
        , headers=genHeader()
        )
    res = urlopen(req
                  , timeout = 9).read()
    sleep(9)
    return BeautifulSoup(
        res
        , features="lxml"
        )

link = 'http://www.chinasufi.org/archiver/'
bs1 = link2bso(link).find('id'=='content')
for a in bs1.find_all('a'):
    try:
        if 'fid-' in a['href']:
            x = 1
            while True:
                try:
                    bs2 = link2bso(link + a['href'] + '?page=' + str(x))
                    print(link + a['href'] + '?page=' + str(x))
                    if str(x) in bs2.find(class_='page').get_text():
                        for l in bs2.find('ul').find_all('li'):
                            try:
                                y = 1
                                while True:
                                    try:
                                        bs3 = link2bso(link + l.a['href'] + '?page=' + str(y))
                                        if str(y) in bs3.find(class_='page').get_text():
                                            print(link + l.a['href'] + '?page=' + str(y))
                                            ls = [s for s in bs3.find( 'id'=='content').stripped_strings][:-8]
                                            lt = []
                                            for p in bs3.find_all('p'): lt.extend([t for t in p.stripped_strings])
                                            li = []
                                            for t in lt:
                                                if '发表于 ' in t:
                                                    li.append(ls.index(t))
                                            
                                            infoTitle = ls[li[0] - 2].strip('› ').strip()
                                            for i in range(len(li)):
                                                try:
                                                    # bizId = ''
                                                    # infoTitle = ''
                                                    # infoAuthor = ''
                                                    # publishTime = 0
                                                    # content = ''
                                                    if i != len(li) - 1: content = ' '.join(ls[li[i] + 1: li[i+1] - 1])
                                                    else: content = ' '.join(ls[li[i] + 1: ])
                                                    infoAuthor = lt[(i + 1) * 2 - 2]
                                                    publishTime = lt[(i + 1) * 2 - 1].strip('发表于 ')
                                                    bizId = uuid5(NAMESPACE_DNS, content).hex[:8]
                                                    publishTime = int(round(mktime(strptime(publishTime, '%Y-%m-%d %H:%M:%S')) * 1000))
                                                    
                                                    d = {
                                                       	  "bizId": bizId,
                                                       	  "processName": 'yq-1.0.0',
                                                       	  "infoType": 1,
                                                       	  "infoSource": '圣传真道网',
                                                       	  "infoTitle": infoTitle,
                                                       	  "infoAuthor": infoAuthor,
                                                       	  "publishTime": publishTime,
                                                       	  "content":content,
                                                       	  "sex":2
                                                    }
                                                    print(d)
                                                    
                                                    producer = KafkaProducer(
                                                        bootstrap_servers=''
                                                        ,value_serializer=lambda v: json.dumps(v).encode('utf-8')
                                                        )
        
                                                    producer.send('mq-yq-input-handle', d)
                                                    producer.close()
                                                except: continue
                                            y += 1
                                        else: break
                                    except: continue
                            except: continue
                        x += 1
                    else: break
                except: continue
    except: continue
