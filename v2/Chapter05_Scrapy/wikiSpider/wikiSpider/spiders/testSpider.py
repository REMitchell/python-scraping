from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider, Rule


class Stinkybklyn(CrawlSpider):
    name = "wiki2"
    allowed_domains = ["wikipedia.org"]

    start_urls = [
        "https://en.wikipedia.org/wiki/Benevolent_dictator_for_life"
    ]

    rules = [
        Rule(LinkExtractor(allow=r'.*'), callback='parse_items', follow=True)
    ]

    def parse_items(self, response):
        title = response.css("h1::text").extract_first()
        title = "".join(title)
        title = title.strip().replace("\n", "").lstrip()
        print("title is:"+title)