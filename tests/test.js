require('dotenv').config();

const nonCompleteAssignmentImg = "(//img[@ng-title='LN01368: Assignment: Viking Code School exploration'])[1]";
const completeAssignmentImg = "(//img[@ng-title='LN01368: Assignment: Viking Code School exploration' and @src='https://s3.amazonaws.com/viking_education/icons/lesson_icons/icon_project_complete.svg'])[1]";

module.exports = {
  'Complete assignment': browser => {
    browser
    .url(browser.launchUrl)
    .saveScreenshot('screenshots/home_page.jpg')
    .click('a[href="/sign_in"]')
    .waitForElementVisible('form#new_user', 5000)
    .saveScreenshot('screenshots/sign_in_page.jpg')
    .setValue('input[name="user[email]"]', process.env.LOGIN_EMAIL)
    .setValue('input[name="user[password]"]', process.env.LOGIN_PASSWORD)
    .submitForm('#new_user')
    .waitForElementPresent('main#student-dashboard', 5000)
    .saveScreenshot('screenshots/dashboard.jpg')
    .useXpath()
    .click('(//input[@value="javascript"])[2]/parent::label')
    .waitForElementVisible('//strong[text()="2: Testing JavaScript"]', 5000)
    .click('//strong[text()="2: Testing JavaScript"]')
    .waitForElementVisible("//h5[text()[contains(., 'Viking Code School exploration')]]", 5000)
    .click("//h5[text()[contains(., 'Viking Code School exploration')]]")
    .waitForElementVisible(nonCompleteAssignmentImg, 5000)
    .click(nonCompleteAssignmentImg)
    .pause(3000)
    .assert.visible(completeAssignmentImg)
    .saveScreenshot('screenshots/lesson_completed.jpg')
    .useCss()
    .click('img.user-icon')
    .click("li.menu-item.last")
    .waitForElementVisible('a[href="/sign_in"]', 5000)
    .saveScreenshot("screenshots/signed_out.jpg")
    .end();
  }
};
