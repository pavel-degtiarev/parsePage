const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const service = new chrome.ServiceBuilder("./server/browser_drivers/chromedriver");
const options = new chrome.Options();
options.addArguments("--window-size=1920,1080");
options.addArguments("--disable-gpu");
options.addArguments("--disable-extensions");
options.addArguments("--disable-images");
options.addArguments("--allow-running-insecure-content");
options.addArguments("--headless");

const browser = new webdriver.Builder()
  .forBrowser(webdriver.Browser.CHROME)
  .setChromeService(service)
  .setChromeOptions(options)
  .build();

module.exports = { browser };
