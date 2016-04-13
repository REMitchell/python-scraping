import unittest

from selenium import webdriver
from selenium.webdriver import ActionChains


class TestAddition(unittest.TestCase):
    driver = None

    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.PhantomJS(executable_path='<Path to Phantom JS>')

    def setUp(self):
        url = 'http://pythonscraping.com/pages/javascript/draggableDemo.html'
        self.driver.get(url)

    def tearDown(self):
        print("Tearing down the test")

    def test_drag(self):
        element = self.driver.find_element_by_id("draggable")
        target = self.driver.find_element_by_id("div2")
        actions = ActionChains(self.driver)
        actions.drag_and_drop(element, target).perform()

        self.assertEqual("You are definitely not a bot!",
                         self.driver.find_element_by_id("message").text)

if __name__ == '__main__':
    unittest.main()
