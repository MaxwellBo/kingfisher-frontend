import unittest
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class TestExport(unittest.TestCase):
    domain = "http://localhost:3000/login"
    username = "hbnordin2@gmail.com"
    password = "password123"

    def login_successful(self):
        bad_div = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/form/div[2]/div[4]/p')

        if bad_div.text is 'The email and password you entered don\'t match':
            return False

        return True

    def alert_happened(self):
        try:
            alert = self.driver.switch_to.alert
            assert "All the fields must be filled and site names must be unique" in alert.text
            alert.accept()
            return True
        except:
            return False

    def alert_for_taken_site_name(self):
        try:
            alert = self.driver.switch_to.alert
            assert "All the fields must be filled and site names must be unique" in alert.text
            alert.accept()
            return True
        except:
            return False

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

        new_site_button = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/div/div[2]/ul/a[2]')
        new_site_button.click()

    def tearDown(self):
        self.driver.close()

    def test_valid_input(self):
        site_name_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[1]/div/input'
        )
        site_name_field.send_keys("Haziq1 site")

        latitude_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[2]/div/input'
        )
        latitude_field.send_keys("24")

        longtitude_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[3]/div/input'
        )
        longtitude_field.send_keys('34')

        submit_button = self.driver.find_element_by_xpath('//*[@id="root"]/div/section/div[2]/div/div[4]/div/button')
        submit_button.click()

        assert self.alert_happened() == False

    def test_missing_site_name(self):
        latitude_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[2]/div/input'
        )
        latitude_field.send_keys("24")

        longtitude_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[3]/div/input'
        )
        longtitude_field.send_keys('34')

        submit_button = self.driver.find_element_by_xpath('//*[@id="root"]/div/section/div[2]/div/div[4]/div/button')
        submit_button.click()

        assert self.alert_happened() == True

    def test_missing_longtitude(self):
        site_name_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[1]/div/input'
        )
        site_name_field.send_keys("Haziq site")

        latitude_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[2]/div/input'
        )
        latitude_field.send_keys("24")

        submit_button = self.driver.find_element_by_xpath('//*[@id="root"]/div/section/div[2]/div/div[4]/div/button')
        submit_button.click()

        assert self.alert_happened() == True

    def test_missing_latitude(self):
        site_name_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[1]/div/input'
        )
        site_name_field.send_keys("Haziq site")

        longtitude_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[3]/div/input'
        )
        longtitude_field.send_keys('34')

        submit_button = self.driver.find_element_by_xpath('//*[@id="root"]/div/section/div[2]/div/div[4]/div/button')
        submit_button.click()

        assert self.alert_happened() == True

    def test_all_empty(self):
        submit_button = self.driver.find_element_by_xpath('//*[@id="root"]/div/section/div[2]/div/div[4]/div/button')
        submit_button.click()

        assert self.alert_happened() == True

    def test_taken_name(self):
        site_name_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[1]/div/input'
        )
        site_name_field.send_keys("Haziq2 site")

        latitude_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[2]/div/input'
        )
        latitude_field.send_keys("24")

        longtitude_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[3]/div/input'
        )
        longtitude_field.send_keys('34')

        submit_button = self.driver.find_element_by_xpath('//*[@id="root"]/div/section/div[2]/div/div[4]/div/button')
        submit_button.click()

        site_name_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[1]/div/input'
        )
        site_name_field.send_keys("Haziq2 site")

        latitude_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[2]/div/input'
        )
        latitude_field.send_keys("24")

        longtitude_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/section/div[2]/div/div[3]/div/input'
        )
        longtitude_field.send_keys('34')

        submit_button = self.driver.find_element_by_xpath('//*[@id="root"]/div/section/div[2]/div/div[4]/div/button')
        submit_button.click()

        assert self.alert_for_taken_site_name() == True


unittest.main()