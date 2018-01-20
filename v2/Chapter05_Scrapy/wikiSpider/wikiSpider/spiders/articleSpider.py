from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from wikiSpider.items import Article

class ArticleSpider(CrawlSpider):
    name = 'articles'
    allowed_domains = ['wikipedia.org']
    start_urls = ['https://en.wikipedia.org/wiki/Benevolent_dictator_for_life']

    rules = [Rule(LinkExtractor(allow=r'^(/wiki/)((?!:).)*$'), callback='parse_items', follow=True, cb_kwargs={'is_article': True})    ]

    def parse_items(self, response, is_article=True):
        item = Article()
        item['title'] = response.css('h1::text').extract_first()
        item['url'] = response.url
        last_edited = response.css('id#footer-info-lastmod::text').extract_first()
        last_edited = last_edited.replace('This page was last edited on ')
        item['last_edited'] = last_edited
        return item
