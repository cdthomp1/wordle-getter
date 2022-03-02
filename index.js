const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
})();

const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    var state;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://nytimes.com/games/wordle/index.html');

    const localStorage = await page.evaluate(() => Object.assign({}, window.localStorage));
    state = JSON.parse(localStorage['nyt-wordle-state']);


    await browser.close();

    res.send(state.solution)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})