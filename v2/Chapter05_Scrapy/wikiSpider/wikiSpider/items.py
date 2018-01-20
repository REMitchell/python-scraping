from scrapy import Item, Field


class Article(Item):
    title = Field()
    last_edited = Field()
    url = Field()

