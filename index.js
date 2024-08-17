const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

// Hardcoded URL
const urlToCapture = 'https://karlhungus38.github.io/esp32-website/?station=Wilhelmshagen'; // Change to the website you want to screenshot

app.get('/screenshot', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto(urlToCapture);
        const screenshot = await page.screenshot();
        await browser.close();

        res.setHeader('Content-Type', 'image/png');
        res.send(screenshot);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error taking screenshot');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
