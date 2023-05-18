---
title: 'don-scraper-project'
dateCreated: '2023-05-01'
image: 'image_dp.jpg'
summary: 'Don Scraper allows you to scrape multiple sites sumiltaneously with greater conversion rate than Don Draper himself. Will save you time from manually navigating to each article and finding what you need.'
author: 'Aldo Garcia'
isFeatured: true
stack: ['TypeScript', 'Node.js', 'Express', 'MongoDB', 'React-Router', 'StyledComponents', 'render.com']
---

# this is a title

This is some regular text with a [link](http://google.ca)

```js
const scrapeRawArticles = async (urls: string[]) => {
  try {
    const responseArray = await Promise.allSettled(
      urls.map(async (url) => {
        const response = await axios.get(url);
        return { response, url };
      })
    );

    const rejectedResults = responseArray
      .filter((response) => response.status === "rejected")
      .map((response) => response.reason.config.url);

    const responseArrayOfRejected = await Promise.allSettled(
      rejectedResults.map(async (url) => {
        const response = await cloudscraper(url);
        return { response, url };
      })
    );

    const fullResponseArray = responseArray.concat(responseArrayOfRejected);

    const fulfilledResults = fullResponseArray
      .filter((response) => response.status === "fulfilled")
      .map((response) => {
        const data = response.value.response.data || response.value.response;
        const { articleParagraphsSelector, articleHeadingSelector } = siteCheck(response.value.url);
        const {
          scrapedHeader,
          scrapedParagraphs,
          scrapedCoName,
          scrapedTicker,
        } = scrapeDataFromUrls(data, articleParagraphsSelector, articleHeadingSelector);
        return {
          url: response.value.url,
          heading: scrapedHeader,
          companyName: scrapedCoName,
          ticker: scrapedTicker,
          contentBody: scrapedParagraphs,
        };
      });

    return fulfilledResults;
  } catch (err) {
    throw new Error((err as Error | AxiosError).message);
  }
};
```

```js
const scrapeDataFromUrls = (
  dataSet: Buffer,
  pSelector: string,
  hSelector: string
) => {

  let scrapedHeader: string = "";
  let scrapedParagraphs: Article["contentBody"] = [
    {
      section: "",
      isSelected: false,
    },
  ];

  let $ = cheerio.load(dataSet, { xmlMode: true });

  $(`${hSelector}`).each((idx: number, el: cheerio.Element) => {

    const headers = $(el).text().trim();

    if (!headers.includes("&nbsp")) {
      scrapedHeader += headers;
    }
  });

  $(`${pSelector}`).each((idx: number, el: cheerio.Element) => {
    const paragraphs = $(el).find("p").text().replace(/\s\s+/g, "").trim();

    if (paragraphs !== "") {
      const configuredContent = configureScrapedContent(paragraphs);
      scrapedParagraphs.pop();

      for (const content of configuredContent) {
        scrapedParagraphs.push({ section: content, isSelected: false });
      }
    }
  });
```
