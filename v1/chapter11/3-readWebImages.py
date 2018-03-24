import time
from urllib.request import urlretrieve
import subprocess
from selenium import webdriver

#driver = webdriver.PhantomJS(executable_path='/Users/ryan/Documents/pythonscraping/code/headless/phantomjs-1.9.8-macosx/bin/phantomjs')
driver = webdriver.Firefox()
driver.get("http://www.amazon.com/War-Peace-Leo-Nikolayevich-Tolstoy/dp/1427030200")
time.sleep(2)

driver.find_element_by_id("img-canvas").click()
#The easiest way to get exactly one of every page
imageList = set()

#Wait for the page to load
time.sleep(10)
print(driver.find_element_by_id("sitbReaderRightPageTurner").get_attribute("style"))
while "pointer" in driver.find_element_by_id("sitbReaderRightPageTurner").get_attribute("style"):
    #While we can click on the right arrow, move through the pages
    driver.find_element_by_id("sitbReaderRightPageTurner").click()
    time.sleep(2)
    #Get any new pages that have loaded (multiple pages can load at once)
    pages = driver.find_elements_by_xpath("//div[@class='pageImage']/div/img")
    for page in pages:
        image = page.get_attribute("src")
        imageList.add(image)

driver.quit()

#Start processing the images we've collected URLs for with Tesseract
for image in sorted(imageList):
    urlretrieve(image, "page.jpg")
    p = subprocess.Popen(["tesseract", "page.jpg", "page"], stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    p.wait()
    f = open("page.txt", "r")
    print(f.read())
