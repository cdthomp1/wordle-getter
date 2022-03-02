const puppeteer = require('puppeteer')
let state;

export default async (req, res) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://nytimes.com/games/wordle/index.html');

    const localStorage = await page.evaluate(() => Object.assign({}, window.localStorage));
    state = JSON.parse(localStorage['nyt-wordle-state']);

    await browser.close();
  
  res.status(200).json({ wordleSolution: state.solution })
}
