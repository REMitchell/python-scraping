from selenium import webdriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains


#REPLACE WITH YOUR DRIVER PATH. EXAMPLES FOR CHROME AND PHANTOMJS
driver = webdriver.PhantomJS(executable_path='../phantomjs-2.1.1-macosx/bin/phantomjs')
#driver = webdriver.Chrome(executable_path='../chromedriver/chromedriver')
driver.get("http://pythonscraping.com/pages/files/form.html")

firstnameField = driver.find_element_by_name("firstname")
lastnameField = driver.find_element_by_name("lastname")
submitButton = driver.find_element_by_id("submit")

### METHOD 1 ###
firstnameField.send_keys("Ryan")
lastnameField.send_keys("Mitchell")
submitButton.click()
################

### METHOD 2 ###
actions = ActionChains(driver).click(firstnameField).send_keys("Ryan").click(lastnameField).send_keys("Mitchell").send_keys(Keys.RETURN)
actions.perform()
################

print(driver.find_element_by_tag_name("body").text)

driver.close()