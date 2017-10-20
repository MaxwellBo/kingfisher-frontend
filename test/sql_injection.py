import unittest
from time import sleep

from selenium import webdriver
import getpass

# TODO REMOVE DOCUMENTATION BUTTON
# TODO NAV BAR VANISHES ON RESIZE
# TODO PURCHASE PAGE SHOULD NOT ALLOW EMPTY FIELDS
# TODO TEST STATISTICS PAGE IS RESPONDING TO ENQUIRIES


class WebTestCase(unittest.TestCase):

    domain = "http://localhost:3000/"
    # username = <put your UQ thing here> REMOVE BEFORE PUSHING
    # password = <put your UQ thing here> REMOVE BEFORE PUSHING

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(10)
        self.driver.get(self.domain)

    def tearDown(self):
        self.driver.close()


class MainWebPageTests(WebTestCase):

    def test_check_initial_page_loads(self):
        assert self.driver.title == "Kingfisher"

    def test_login_works(self):
        login_button = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/div/section[1]/div[2]/div/a/button')
        login_button.click()
        assert self.driver.current_url == self.domain + "login"

    def test_home_button_works(self):
        home_button = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/div/section[1]/div[1]/div/header/div/div[1]/a')
        home_button.click()
        assert self.driver.current_url == self.domain

    def test_facebook_works(self):
        facebook_button = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/div/section[1]/div[1]/div/header/div/div[2]/a[1]')
        facebook_button.click()
        assert self.driver.current_url == "https://www.facebook.com/Kingfisher-127569781308370/"

    def test_twitter_works(self):
        twitter_button = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/div/section[1]/div[1]/div/header/div/div[2]/a[2]')
        twitter_button.click()
        assert self.driver.current_url == "https://twitter.com/KingfisherData"

    def test_instagram_works(self):
        instagram_button = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/div/section[1]/div[1]/div/header/div/div[2]/a[3]')
        instagram_button.click()
        assert self.driver.current_url == "https://www.instagram.com/kingfisherdata/"

    def test_statistics_works(self):
        statistics_button = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/div/section[1]/div[1]/div/header/div/div[2]/a[5]')
        statistics_button.click()

        # Check we are on SSO for UQ
        # TODO MAKE SURE IT'S OK THAT WE'RE NOT PUTTING LOGIN DETAILS HERE
        username_field = self.driver.find_element_by_xpath('//*[@id="username"]')
        username_field.send_keys(self.username)

        password_field = self.driver.find_element_by_xpath('//*[@id="password"]')
        password_field.send_keys(self.password)

        submit_button = self.driver.find_element_by_xpath('/html/body/div[3]/div/div/div[2]/div[1]/form/input[3]')
        submit_button.click()

        assert self.driver.current_url == "https://deco3801-jquery-only.uqcloud.net/stats"

        # Make sure we get the cookie from the login
        login_cookie = self.driver.get_cookie('EAIT_WEB')
        assert login_cookie is not None

    def test_purchase_works(self):
        purchase_button = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/section[1]/div[1]/div/header/div/div[2]/a[4]')
        purchase_button.click()
        assert self.driver.current_url == self.domain + "purchase"

"""
class PurchaseWebPageTests(WebTestCase):

    def setUp(self):
        super().setUp()
        purchase_button = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/div/section[1]/div[1]/div/header/div/div[2]/a[4]')
        purchase_button.click()

        self.submit_button = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/section[2]/div/div[4]/div')
        self.name_field = self.driver.find_element_by_xpath(
            '// *[ @ id = "root"] / div / div / section[2] / div / div[1] / div / input')
        self.email_field = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/div/section[2]/div/div[2]/div/input'
        )

    def on_thank_you_page(self):
        thank_you_div = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/section[2]/h1')
        if thank_you_div.text == "Thank you!":
            return True
        else:
            return False

    def test_name_not_filled(self):
        self.email_field.send_keys("hbnordin2@gmail.com")
        self.submit_button.click()

        if self.on_thank_you_page():
            raise AssertionError("We should not have been able to submit!")

    def test_email_not_filled(self):
        self.name_field.send_keys("Jack")
        self.submit_button.click()

        if self.on_thank_you_page():
            raise AssertionError("We should not have been able to submit!")

    def test_invalid_email_filled(self):
        self.name_field.send_keys("Jack")
        self.email_field.send_keys("thisisnotanemail")

        self.submit_button.click()

        if self.on_thank_you_page():
            raise AssertionError("We should not have been able to submit!")

    def test_name_sql_inject(self):
        self.name_field.send_keys("\" or \"\"=\"")
        self.email_field.send_keys("hbnordin2@gmail.com")

        self.submit_button.click()

        if not self.on_thank_you_page():
            raise AssertionError("We should have allowed this")

    def test_email_sql_inject(self):
        self.email_field.send_keys("\" or \"\"=\"")
        self.name_field.send_keys("hbnordin2@gmail.com")

        self.submit_button.click()

        if not self.on_thank_you_page():
            raise AssertionError("We should have allowed this")

    def test_valid_input(self):
        self.email_field.send_keys("hbnordin2@gmail.com")
        self.name_field.send_keys("Haziq")

        self.submit_button.click()

        if not self.on_thank_you_page():
            raise AssertionError("We should have got through")
"""

class LoginPageTest(WebTestCase):

    def setUp(self):
        super().setUp()
        login_button = self.driver.find_element_by_xpath(
            '//*[@id="root"]/div/div/section[1]/div[2]/div/a/button')
        login_button.click()

        self.login_with_email_buttom = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/div/form/ul/li[1]/button')

    def test_email_button_works(self):
        self.login_with_email_buttom.click()

        sign_in_div = self.driver.find_element_by_xpath('//*[@id="Login-firebaseui-auth-container"]/div/form/div[1]/h1')
        assert sign_in_div.text == "Sign in with email"

    def test_legitimate_login(self):
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

    def test_incorrect_login_email(self):
        self.login_with_email_buttom.click()

        email_field = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/form/div[2]/div/div[1]/input')
        email_field.send_keys('hbnordin2@gmail.com')

        next_button = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/form/div[3]/div/button[2]')
        next_button.click()

        password_field = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/form/div[2]/div[3]/input')
        password_field.send_keys('password1123')

        signin_button = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/form/div[3]/div[2]/button')
        signin_button.click()

        if not self.login_successful():
            raise AssertionError("Could not login with legit credentials")

    def test_incorrect_login_password(self):
        self.login_with_email_buttom.click()

        email_field = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/form/div[2]/div/div[1]/input')
        email_field.send_keys('hbnordiaklsdn2@gmail.com')

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

    def login_successful(self):
        bad_div = self.driver.find_element_by_xpath(
            '//*[@id="Login-firebaseui-auth-container"]/div/form/div[2]/div[4]/p')

        if bad_div.text is 'The email and password you entered don\'t match':
            return False

        return True


unittest.main()