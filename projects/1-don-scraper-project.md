---
title: 'Don Scraper'
dateCreated: '2023-05-01'
image: 'scraper-articles-selected.PNG'
subHeading: 'Scrape article content from several sites'
summary: 'Don Scraper allows you to scrape multiple sites sumiltaneously with greater conversion rate than Don Draper himself. Will save you time from checking each article'
author: 'Aldo Garcia'
isFeatured: true
stack:
  [
    'TypeScript',
    'Node.js',
    'Express',
    'MongoDB',
    'React-Router',
    'StyledComponents',
    'render.com',
    'cheerio',
  ]
---

Don Scraper allows you to be able to scrape multiple articles at the same time and it returns the body and the headers of the entire article. It organizes the scraped content for you so you can see what each article contains. Your content is then split into selectable sections so that you can create a general summary or overview of the article itself.

Originally it was designed for a good friend and client of mine who spends numerous hours a week having to navigate to each article and then selecting a couple of standout phrases/sentences that captures the essence of the article.

#### Settled Promises

When the user submits a list of url's in the frontend, a function `scrapeRawArticles(urls: string[])` takes these urls as an arugment and awaits the completion of [axios](https://axios-http.com/docs/intro) get requests. These can be completed succesfully or rejected and there are several reasons why a get request to a particular url may be rejected.

One that is common are **user-agent** checks established from the website. This is used so that the site can determine whether the request to the desired page is made from a legitimate user or from a server.

Whenever you make an HTTP request to any page, HTTP headers are sent to the server to offer additional information about the source of the request.

This means that it is possible to manipulate the headers sent (ie. the user agent) to corresponding website. However, the [cloudscraper](https://www.npmjs.com/package/cloudscraper) package offers the ability to send **headless requests** to be able to access some, not all, of the initially rejected promises.

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
      .filter(
        <T>(
          response: PromiseSettledResult<T>
        ): response is PromiseRejectedResult => response.status === "rejected"
      )
      .map((responses) => {
        const rejectedConfig = responses.reason.config;
        const rejectedUrl = rejectedConfig.url;
        return rejectedUrl;
      });

    const responseArrayOfRejected = await Promise.allSettled(
      rejectedResults.map(async (url) => {
        const response = await cloudscraper(url);
        return { response, url };
      })
    );

    const fullResponseArray = responseArray.concat(responseArrayOfRejected);

    const fulfilledResults = fullResponseArray
      .filter(
        <T>(
          response: PromiseSettledResult<T>
        ): response is PromiseFulfilledResult<T> => {
          return response.status === "fulfilled";
        }
      )
      .map((successfulResponse) => {
        const data = successfulResponse.value.response.data || successfulResponse.value.response ;

        const { articleParagraphsSelector, articleHeadingSelector } = siteCheck(
          successfulResponse.value.url
        );
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

#### Breaking down scrapeRawArticles()

`Promise.allSettled()` is an asynchronous function that executes multiple promises concurrently and returns only once all the promises have been settled- hence the name! The response from each promise is an object (containing the response data, status, and headers information).

```js
const scrapeRawArticles = async (urls:string[])=>{
  try{
    const responseArray = await Promise.allSettled(
      urls.map(async (url) => {
        const response = await axios.get(url);
        return { response, url };
      })
    );
    ...
  }catch(){
    ...
  }
}
```

The response status is then checked to determine whether it was `rejected`. If rejected, the rejected urls are then filtered and stored in the `rejectedArray`- which is then used to send a **headless request** using the cloudscraper library.

```js
const scrapeRawArticles = async (urls:string[])=>{
  try{
    ...
    const rejectedResults = responseArray
      .filter(
            <T>(
              response: PromiseSettledResult<T>
            ): response is PromiseRejectedResult => response.status === "rejected"
          )
          .map((responses) => {
            const rejectedConfig = responses.reason.config;
            const rejectedUrl = rejectedConfig.url;
            return rejectedUrl;
          });

      const responseArrayOfRejected = await Promise.allSettled(
      rejectedResults.map(async (url) => {
        const response = await cloudscraper(url);
        return { response, url };
      })
    );
    ...
  }catch(){
    ...
  }
}
```

The successful and rejected arrays are then concatenated to form one new fulfilled array. This was done so that the user would then be able to determine which articles still weren't able to be scraped along with those that were- which later can be manually added.

The data of this responses would then be conditionally accessed via `successfulResponse.value.response.data || successfulResponse.value.response`. This is dependent on whether or not there was a `value.response.data` property- because remember, some of the responses didn't return `data`, ie. had `response.status === 'rejected'` even after using the cloudscraper api.

The `siteCheck()` function takes in the url and returns a heading and paragraph selector (explained later), while the `scrapedDataFromUrls()` function uses the Cheerio library- which we will dive into next!

```js
const scrapeRawArticles = async (urls:string[])=>{
  try{
  ...
   const fullResponseArray = responseArray.concat(responseArrayOfRejected);

    const fulfilledResults = fullResponseArray
      .filter(
        <T>(
          response: PromiseSettledResult<T>
        ): response is PromiseFulfilledResult<T> => {
          return response.status === "fulfilled";
        }
      )
      .map((successfulResponse) => {
        const data = successfulResponse.value.response.data || successfulResponse.value.response ;

        const { articleParagraphsSelector, articleHeadingSelector } = siteCheck(
          successfulResponse.value.url
        );

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
      return fulfilledResults
  }catch(){
    ...
  }
}
```

### Something about Cheerio

So how does it work under the hood? After copying and pasting your links into the form input, it uses [Cheerio](https://cheerio.js.org/) to scrape the html from the elements of the desired articles with the `scrapeDataFromUrls()` function.

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

#### Closer Look at Cheerio and scrapeDataFromUrls()

The `dataSet` parameter is the entirety of the data that Cheerio scraped from the corresponding article. It is a Buffer object which is a Node.js object that represents the binary data that was scraped (these are broken down into **chunks**).

While the `pSelector` and `hSelector` are strings are derived from a different function that caters the paragraph id selector and the heading id selector to the corresponding article url name. (This is one of the limitations that will mentioned later).

```js
const scrapeDataFromUrls = (
  dataSet: Buffer,
  pSelector: string,
  hSelector: string
) => {
  ...
}
```

Within the function there are two variables- `scrapedHeader` and `scrapedParagraphs`. These two variables are placeholders for header that cheerio was able to scrape as well as all the paragraphs that it was able to scrape.

The `scrapedParagraphs` array contains an object with two parameters- `section` which will hold each of the paragraph sections, and a boolean `isSelected`, to determine if the user has "selected" this short paragraph to later be included in the article summary.

```js
const scrapeDataFromUrls = (...params)=>{

  let scrapedHeader: string = "";
  let scrapedParagraphs: Article["contentBody"] = [
    {
      section: "",
      isSelected: false,
    },
  ];
  ...
}
```

The `cheerio.load()` function then takes this dataSet param along with second param setting the **xmlMode** which is an optional param and saved to `$` variable to mimic [jQuery](https://jquery.com/) syntax.

The `hSelector` and `pSelector`, as previously mentioned, are some variable names given to corresponding articles to then tell cheerio to use those selectors when searching through each article paragraph and header. The `each()` function is then passed to the selected content from the html/xml data loaded by Cheerio.

```js
const scrapeDataFromUrls = (...params)=>{
...

let $ = cheerio.load(dataSet, { xmlMode: true });

$(`${pSelector}`).each((idx: number, el: cheerio.Element) => {
  const paragraphs = $(el).find('p').text().replace(/\s\s+/g, '').trim();

  if (paragraphs !== '') {
    const configuredContent = configureScrapedContent(paragraphs);
    scrapedParagraphs.pop();

    for (const content of configuredContent) {
      scrapedParagraphs.push({ section: content, isSelected: false });
    }
  }
});
}
```

It can read something like- from the loaded Html/Xml data, query for this selector (class or id), and for each of those perform this action. In the case of the paragraphs, it would find all the 'p' elements within parent element that was initially selected and removing any extra whitespace using a regular expression.

For those familiar with the Document Object Manipulation (DOM) manipulation, the cheerio `each()` method is similar to the `querySelectorAll()` method which returns a **nodeList**.

### Limitations

Because this app was curated to the specific requirements of the aforementioned friend/client, it has two great limitations that come to mind immediately. The first is the manner in which it selects the article headers and the article paragraphs. The second is the manner in which it displays the summarized content.

#### siteCheck() Fn

The siteCheck function, although handle for specific use case, actually impedes the usability of the application. Without going into too much depth, the function looks something like:

```js
const siteCheck = (siteUrl: string) => {
  const idxofSlash = siteUrl.indexOf('//') + 2;
  const idxAfterDotCom = siteUrl.indexOf('/', idxofSlash);
  const siteName = (siteUrl = siteUrl.slice(idxofSlash, idxAfterDotCom));

  const isBloomberg: string =
    'link.mail.bloombergbusiness.com' || 'www.bloomberg.com';

  let articleHeadingSelector: string = 'h1';
  let articleParagraphsSelector: string = 'article';

  switch (siteName) {
    case 'www.natlawreview.com':
      articleParagraphsSelector = '#normal-wrapper';
      break;
    case 'www.benzinga.com':
      articleParagraphsSelector = '#article-body';
      break;
    case 'www.accesswire.com':
      articleParagraphsSelector = '#articleBody';
      break;
    default:
      articleHeadingSelector = 'h1';
      articleParagraphsSelector = 'article';
  }
  return { articleParagraphsSelector, articleHeadingSelector };
};
```

What this function is doing taking in a siteUrl parameters (ie. www.benzinga.com/something/something) and switching the `articleParagraphSelector` and `articleHeadingSelector` depending on the the url. Remember when cheerio was used to scrape the paragraphs and headers from the article? Well this is how the selectors were decided. The reason it was done this way was because of the limited number of different articles that the client was having to scrape.

This method also omitted a lot of unecessary text from the initial cheerio scrape- because much of the text that is scraped is advertisement text, captions text and other unwanted text.

A more useable and scalable way to have done this, can now be to use AI with the help of the openAi API to create a more elaborate summary of the entire scraped article. This would of course change the entire infrastucture of how this application works- which is well beyond the scope of this article.
