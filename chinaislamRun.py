# -*- coding: utf-8 -*-
"""
Created on Wed May 18 11:43:14 2022

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
    req = Request(link, headers=genHeader())
    res = urlopen(req).read()
    return BeautifulSoup(res, features="lxml")


bu = 'http://www.chinaislam.net.cn'


for i in range(1, 66):
    try:
        bso = link2bso(bu + '/cms/news/xhxw/116-' + str(i) + '.html').find(class_='box')
        sleep(9)
        for x in bso.find_all('li'):
            try:
                bs = link2bso(bu + x.a['href'])
                infoTitle = bs.find(class_ = 'articlemianL').h2.get_text()
                publishTime, infoAuthor  = [t.strip() for t in [s for s in bs.find(class_ = 'info').stripped_strings][-1].split('文章来源:')]
                content = '\n    '.join([c for c in bs.find(class_='content').stripped_strings])
                bizId = uuid5(NAMESPACE_DNS, content).hex[:8]
                publishTime = int(round(mktime(strptime(publishTime, '%Y-%m-%d %H:%M')) * 1000))
                producer = KafkaProducer(
                    bootstrap_servers='192.168.5.150:9092'
                    ,value_serializer=lambda v: json.dumps(v).encode('utf-8')
                    )
                d = {
                   	  "bizId": bizId,
                   	  "processName": 'yq-1.0.0',
                   	  "infoType": 1,
                   	  "infoSource": '中国伊斯兰教协会',
                   	  "infoTitle": infoTitle,
                   	  "infoAuthor": infoAuthor,
                   	  "publishTime": publishTime,
                   	  "content":content,
                   	  "sex":2
                }
                print(infoTitle)
                producer.send('mq-yq-input-handle', d)
                producer.close()
                sleep(9)
            except: continue
    except: continue

head = ''
while True:
    try:
        bso = link2bso('http://www.chinaislam.net.cn/cms/news/xhxw/').find(class_='box')
        if head != bso.find('li').get_text():
            bs = link2bso(bu + bso.find('li').a['href'])
            infoTitle = bs.find(class_ = 'articlemianL').h2.get_text()
            publishTime, infoAuthor  = [t.strip() for t in [s for s in bs.find(class_ = 'info').stripped_strings][-1].split('文章来源:')]
            content = '    '.join([c for c in bs.find(class_='content').stripped_strings])
            bizId = uuid5(NAMESPACE_DNS, content).hex[:8]
            publishTime = int(round(mktime(strptime(publishTime, '%Y-%m-%d %H:%M')) * 1000))
            producer = KafkaProducer(
                bootstrap_servers='192.168.5.150:9092'
                ,value_serializer=lambda v: json.dumps(v).encode('utf-8')
                )
            d = {
               	  "bizId": bizId,
               	  "processName": 'yq-1.0.0',
               	  "infoType": 1,
               	  "infoSource": '中国伊斯兰教协会',
               	  "infoTitle": infoTitle,
               	  "infoAuthor": infoAuthor,
               	  "publishTime": publishTime,
               	  "content":content,
               	  "sex":2
            }
            producer.send('mq-yq-input-handle', d)
            producer.close()
        head = bso.find('li').get_text()
        sleep(99999)       
    except: continue
