# From GeoJobs Fall 2022
import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import sleep

URL = "https://dev.geojobs.me/"

class splashTests(unittest.TestCase):
  @classmethod
  def setUpClass(self) -> None:
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    chrome_prefs = {}
    options.experimental_options["prefs"] = chrome_prefs
    # Disable images
    chrome_prefs["profile.default_content_settings"] = {"images": 2}
    self.driver = webdriver.Chrome(options=options, service=Service(ChromeDriverManager().install()))
    self.driver.maximize_window()
    self.driver.get(URL)

  @classmethod
  def tearDownClass(self):
    self.driver.quit()

  def test_SplashJobsLink(self):
    # Wait for the navbar-brand to load, then click to go back to the home screen
    WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'navbar-brand')))
    element = self.driver.find_element(By.CLASS_NAME, 'navbar-brand')
    element.click()
    # Wait for splash card to load, then click
    WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div/div[2]/div/div[1]/div/div/a')))
    element = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/div[1]/div/div/a')
    self.driver.execute_script("arguments[0].click();", element)
    self.assertEqual(self.driver.current_url, URL + "jobs")

  def test_SplashCitiesLink(self):
    WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'navbar-brand')))
    element = self.driver.find_element(By.CLASS_NAME, 'navbar-brand')
    element.click()

    WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div/div[2]/div/div[2]/div/div/a')))
    element = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/div[2]/div/div/a')
    self.driver.execute_script("arguments[0].click();", element)

    self.assertEqual(self.driver.current_url, URL + "cities")

  def test_SplashApartmentsLink(self):
    WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'navbar-brand')))
    element = self.driver.find_element(By.CLASS_NAME, 'navbar-brand')
    element.click()

    WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div/div[2]/div/div[3]/div/div/a')))
    element = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/div[3]/div/div/a')
    self.driver.execute_script("arguments[0].click();", element)
    self.assertEqual(self.driver.current_url, URL + "apartments")
  

if __name__ == '__main__':
    unittest.main()
