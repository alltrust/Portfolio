import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document{

  render():JSX.Element{

    return(

      <Html lang='en'>
        <Head/>
        <body>
          <div id='overlays'></div>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );

  }

}

export default MyDocument;