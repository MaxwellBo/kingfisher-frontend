import unittest
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class TestExport(unittest.TestCase):

    domain = "https://deco3801-jquery-only.uqcloud.net/login"
    username = "hbnordin2@gmail.com"
    password = "password123"

    def login_successful(self):
        bad_div = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/form/div[2]/div[4]/p')

        if bad_div.text is 'The email and password you entered don\'t match':
            return False

        return True

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(10)
        self.driver.get(self.domain)

        self.login_with_email_buttom = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/div/form/ul/li[1]/button')

        self.login_with_email_buttom.click()

        email_field = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/form/div[2]/div/div[1]/input')
        email_field.send_keys('hbnordin2@gmail.com')

        next_button = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/form/div[3]/div/button[2]')
        next_button.click()

        password_field = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/form/div[2]/div[3]/input')
        password_field.send_keys('password123')

        signin_button = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/form/div[3]/div[2]/button')
        signin_button.click()

        if not self.login_successful():
            raise AssertionError("Could not login with legit credentials")

    def tearDown(self):
        self.driver.close()

    def test_export(self):
        select_site_field = self.driver.find_element_by_xpath('//*[@id="react-select-2--value"]/div[2]/input')
        select_site_field.send_keys('New site')
        sleep(1)
        select_site_field.send_keys(Keys.RETURN)

        select_time_field = self.driver.find_element_by_xpath('//*[@id="react-select-3--value"]/div[2]/input')
        select_time_field.send_keys('2017-9-6::13:38:39')
        sleep(1)
        select_time_field.send_keys(Keys.RETURN)

        export_button = self.driver.find_element_by_xpath('//*[@id="root"]/div/section/div/div[3]/div/button')
        export_button.click()

    





unittest.main()