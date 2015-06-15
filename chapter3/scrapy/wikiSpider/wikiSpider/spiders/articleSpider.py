from scrapy.contrib.spiders import CrawlSpider, Rule
from wikiSpider.items import Article
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy import log

class ArticleSpider(CrawlSpider):
	#log.start(logfile='log.txt', loglevel=log.CRITICAL)
	name="article"
	allowed_domains = ["en.wikipedia.org"]
	start_urls = ["http://en.wikipedia.org/wiki/Python_%28programming_language%29"]
	rules = [
		Rule(SgmlLinkExtractor(allow=('(/wiki/)((?!:).)*$'),), callback="parse_item", follow=True)
	]

	def parse_item(self, response):
		item = Article()
		title = response.xpath('//h1/text()')[0].extract()
		print("Title is: "+title)
		item['title'] = title
		return item