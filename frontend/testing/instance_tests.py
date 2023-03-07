# From GeoJobs Fall 2022
import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

URL = "localhost:3000"

class Test(unittest.TestCase):

  @classmethod
  def setUpClass(self) -> None:
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    self.driver.get(URL)

  @classmethod
  def tearDownClass(self):
    self.driver.quit()

  def test_job(self):
    self.driver.get(URL + "jobs")
    self.assertEqual(self.driver.current_url, URL + "jobs")
  
  def test_city(self):
    self.driver.get(URL + "cities")
    self.assertEqual(self.driver.current_url, URL + "cities")

  def test_apartment(self):
    self.driver.get(URL + "apartments")
    self.assertEqual(self.driver.current_url, URL + "apartments")

if __name__ == '__main__':
    unittest.main()
