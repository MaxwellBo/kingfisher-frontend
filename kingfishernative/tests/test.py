import unittest
from appium import webdriver
from appium.webdriver.common.touch_action import TouchAction

class MainTest(unittest.TestCase):

    def setUp(self):
        desired_caps = {}
        desired_caps['platformName'] = 'Android'
        desired_caps['deviceName'] = 'emulator-5554'
        desired_caps['app'] = '/home/haziq/Documents/DECO3801/kingfisher-frontend/kingfishernative/android/app/build/outputs/apk/app-release.apk'
        self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)
        self.driver.implicitly_wait(10)

class Login(MainTest):
    def went_past_login_screen(self):
        try:
            page_sites_heading = self.driver.find_element_by_accessibility_id('Page Sites Heading')
            return True
        except:
            return False


    def test_valid_login(self):

        login_field = self.driver.find_element_by_accessibility_id("login")
        login_field.send_keys("admin@kingfisher.com")
        self.driver.hide_keyboard()

        password_field = self.driver.find_element_by_accessibility_id("password")
        password_field.send_keys("password")

        self.driver.hide_keyboard()

        login_button = self.driver.find_element_by_accessibility_id('login button')
        login_button.click()
        login_button.click()

        assert self.went_past_login_screen() == True

    def test_invalid_password(self):
        login_field = self.driver.find_element_by_accessibility_id("login")
        login_field.send_keys("admin@kingfisher.com")
        self.driver.hide_keyboard()

        password_field = self.driver.find_element_by_accessibility_id("password")
        password_field.send_keys("pas123123sword")

        self.driver.hide_keyboard()

        login_button = self.driver.find_element_by_accessibility_id('login button')
        login_button.click()
        login_button.click()

        assert self.went_past_login_screen() == False

    def test_invalid_username(self):
        login_field = self.driver.find_element_by_accessibility_id("login")
        login_field.send_keys("adm123123in@kingfisher.com")
        self.driver.hide_keyboard()

        password_field = self.driver.find_element_by_accessibility_id("password")
        password_field.send_keys("password")

        self.driver.hide_keyboard()

        login_button = self.driver.find_element_by_accessibility_id('login button')
        login_button.click()
        login_button.click()

        assert self.went_past_login_screen() == False

    def test_missing_username(self):
        password_field = self.driver.find_element_by_accessibility_id("password")
        password_field.send_keys("password")

        self.driver.hide_keyboard()

        login_button = self.driver.find_element_by_accessibility_id('login button')
        login_button.click()
        login_button.click()

        assert self.went_past_login_screen() == False

    def test_missing_password(self):
        login_field = self.driver.find_element_by_accessibility_id("login")
        login_field.send_keys("adm123123in@kingfisher.com")
        self.driver.hide_keyboard()

        login_button = self.driver.find_element_by_accessibility_id('login button')
        login_button.click()
        login_button.click()

        assert self.went_past_login_screen() == False

class SiteViewTest(MainTest):
    def setUp(self):
        super().setUp()
        login_field = self.driver.find_element_by_accessibility_id("login")
        login_field.send_keys("admin@kingfisher.com")
        self.driver.hide_keyboard()

        password_field = self.driver.find_element_by_accessibility_id("password")
        password_field.send_keys("password")

        self.driver.hide_keyboard()

        login_button = self.driver.find_element_by_accessibility_id('login button')
        login_button.click()
        login_button.click()

        assert self.went_past_login_screen() == True

    def went_past_login_screen(self):
        try:
            page_sites_heading = self.driver.find_element_by_accessibility_id('Page Sites Heading')
            return True
        except:
            return False


    def test_present_buttons(self):
        new_site_button = self.driver.find_element_by_accessibility_id("add new site button")
        password_field = self.driver.find_element_by_accessibility_id("awesome")
        password_field = self.driver.find_element_by_accessibility_id("St Lucia")

class AddSite(MainTest):
    def setUp(self):
        super().setUp()
        login_field = self.driver.find_element_by_accessibility_id("login")
        login_field.send_keys("admin@kingfisher.com")
        self.driver.hide_keyboard()

        password_field = self.driver.find_element_by_accessibility_id("password")
        password_field.send_keys("password")

        self.driver.hide_keyboard()

        login_button = self.driver.find_element_by_accessibility_id('login button')
        login_button.click()
        login_button.click()

        assert self.went_past_login_screen() == True

        new_site_button = self.driver.find_element_by_accessibility_id("add new site button")
        new_site_button.click()

    def went_past_login_screen(self):
        try:
            page_sites_heading = self.driver.find_element_by_accessibility_id('Page Sites Heading')
            return True
        except:
            return False


    def test_add_site(self):
        site_field = self.driver.find_element_by_accessibility_id("Site Name")
        add_button = self.driver.find_element_by_accessibility_id("Add New Site")

        site_field.send_keys("Hello")
        add_button.click()
        add_button.click()

        password_field = self.driver.find_element_by_accessibility_id("Hello")

        print("Added hello")




unittest.main()
