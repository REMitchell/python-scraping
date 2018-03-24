from selenium import webdriver


driver = webdriver.PhantomJS(executable_path='/Users/ryan/Documents/pythonscraping/code/headless/phantomjs-1.9.8-macosx/bin/phantomjs')
driver.get("http://en.wikipedia.org/wiki/Monty_Python")
assert "Monty Python" in driver.title
print("Monty Python was in the title")
driver.close()