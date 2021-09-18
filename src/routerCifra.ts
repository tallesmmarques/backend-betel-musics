import { Router } from "express";
import * as puppeteer from "puppeteer"

const router = Router()
puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'] })
  .then(browser => {

    router.get("/", async (req, res) => {
      const searchString = req.query.search
      const urlMusic = "https://www.cifraclub.com.br/?q=" + searchString

      const page = await browser.newPage();
      await page.goto(urlMusic);

      const data = await page.evaluate(() => {
        const data = document.querySelectorAll("div.gsc-thumbnail-inside a.gs-title")
        let results = []
        data.forEach((e, index) => {
          const title = e.textContent.split(" - ")
          const linkCifra = e.getAttribute("href")
          results.push({
            id: index + 1,
            name: title[0],
            author: title[1],
            linkCifra,
          })
        })
        return results.slice(0, 5)
      });
      await page.close()

      return res.status(200).send(data)
    })

    router.get("/music/", async (req, res) => {
      const path = req.query.path
      const urlMusic = "https://www.cifraclub.com.br" + path

      const page = await browser.newPage();
      await page.goto(urlMusic);

      const data = await page.evaluate(() => {
        const imageYoutube = document
          .querySelector("section.player--music div.player-placeholder img")
          .getAttribute("src")
        const youtubeId = new URL(imageYoutube).pathname.split("/")[2]
        console.log(youtubeId)
        return ({
          name: document.querySelector("h1.t1").textContent,
          author: document.querySelector("h2.t3 a").textContent,
          linkCifra: location.href,
          linkYoutube: "https://www.youtube.com/watch?v=" + youtubeId
        })
      });
      await page.close()

      return res.status(200).send(data)
    })

  })

export default router
