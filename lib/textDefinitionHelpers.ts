interface ITextDefinitionHelpers {
  [key: string]: string;
}
export const textDefinitionHelpers: ITextDefinitionHelpers = {
  chunks:
    'Chunks are often used when dealing with streaming data or reading large files in chunks rather than loading the entire data into memory at once. By processing data in smaller chunks, it can help improve performance and reduce memory usage.',
  xmlMode:
    'Enabling xmlMode, Cheerio relaxes some of the strict HTML parsing rules and allows you to handle XML-like content. It ensures that elements with XML-specific syntax or attributes are parsed correctly.',
  nodeList:
    'Is an ordered collection of nodes, where each node represents an element, text node, comment, or other types of nodes in the DOM. The nodes are typically selected based on a specified CSS selector.',
  'headless requests':
    'When a headless request is made, it does not render or display the content of the requested page. Instead, it focuses on retrieving the underlying data and interacting with the server. This is common when webscraping.',
  'user-agent':
    "HTTP header field that provides information about the client's operating system, version, and software. This way the server can curate the response to be optimized according to the client's platform and device.",
  SSR: 'Server-Side Rendering- renders web pages on the server with the necessary data, so that it can then pre-generate the page for the client side.',
  SSG: 'Static-Site Generation- Content is pre-rendered into static HTML files at build time.',
  ISR: 'Incremental-Site Regeneration- Like SSG, where you can pre-render site at build time, but you can also regenerate those pages at specified time intervals or increments without having to rebuilt the entire site.',
  'CSS-in-JS':
    'Directly writing CSS styles into the javacsript without having seperate CSS files- which can lead to more dynamic styling options',
  resolvedTheme:
    'Comes from the next-theme library, and allows us to access the currently active theme of the site.',
  validation:
    "The process of checking whether certain data meets the criteria to be 'valid'.",
  'XSS attacks':
    "Cross-site scripting attacks. Can look like a user inserting malicious HTML scrips into forms that aren't properly validated and'sanitized'.",
  cookie:
    'small piece of data that is sent from web server to users browser and stored on their device. Used to hold info about the users interaction with the site.',
  asynchronous:
    'This refers to a task or function that takes time to execute, and will not block the execution of other code while waiting for the execution of this operation.',
  LocalStrategy:
    'In this case, it is a constructor used to create a new instance of local authentication strategy. It can be used with Passport to handle local authentication requests.',
  'next middleware':
    'Brought to you by Express- a callback that allows the "next" middleware in the chain to be called. In error handling, it will skip the remaining middleware and more to the error handindling middleware. ',
  'status code':
    'A number that the represents the HTTP request status made from the client to the server. It is a form of inidicating and communicating successful, failed, or other conditions of a users request.',
  pagination:
    'Involves breaking larger data sets into smaller sets to allow for these smaller sets to be divided into separate pages.',
  'query string':
    'Is part of the URL, that allows for parameters in key-value pairs to be sent to the server. In the URL it comes after the "?" and the each key-value pair is seperated by "&"',
  post: 'An HTTP request method that is used when sending data to the server.',
  'try-catch':
    'A clean method used to handle errors that may happen when trying to excecute your code',
  state:
    'The current status and values of data that will that assist in defining the appearance and behaviour of your application',
  'Context Api':
    'Used as a "store" to manage and modiy the state for your entire application. Helps prevent prop drilling.',
  'component mount':
    'On initial rendering or when the component is inserted into the DOM and becomes visible on the screen',
  slice:
    'portion of the Redux store that contains that subjects state and reducer logic',
  'action creators':
    'A utitlity function that applies to the corresponding slice. Usually has the "type" property describing the action its taking.',
  'reducer functions':
    'These specify the logic behind the action creator. Used to access and update the state accordingly.',
};
