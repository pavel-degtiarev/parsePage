const URL = "https://www.wildberries.ru/catalog/0/search.aspx?sort=popular&search=";

const { browser } = require("../helpers/browser");
const { By, until } = require("selenium-webdriver");

async function queryShop(guery) {
  try {
    const brandsSet = new Set();
    let nextPageButton;

    await browser.get(`${URL}${guery}`);

    do {
      // собираем все бренды с карточек на странице
      (await getBrandsFromPage()).forEach((brand) => brandsSet.add(brand));

      // листаем страницы, нажимая на кнопку Следующая страница
      nextPageButton = (await browser.findElements(By.css(".pagination-next")))[0];
      if (nextPageButton) {
        await nextPageButton.click();
        await browser.sleep(3000);
      }
      // если нет кнопки Следующая страница, выходим
    } while (nextPageButton);

    return [...brandsSet];

  } catch (error) {
    console.log(error.message);
    return [];
  }
}

async function getBrandsFromPage() {
  // ждем, пока прогрузится блок карточек
  const rawCards = await browser.wait(
    until.elementLocated(By.css(".catalog-page__content .product-card-list")),
    10000
  );

  // перебираем карточки и достаем оттуда Бренд
  const cardsList = await rawCards.findElements(By.css(".product-card.j-card-item"));
  const brandsList = cardsList.map((card) => {
    return card.findElement(By.className("brand-name")).getText();
  });

  // brandsList - это массив промисов.
  // Резолвим их и на выходе получаем массив брендов
  return await Promise.all(brandsList);
}

module.exports = { queryShop };
