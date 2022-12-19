// Components
import { Html, Head, Main, NextScript } from 'next/document';

// This file is used to add Google Font stylesheets to the document and to avoid possible errors/warnings. Referenced from 'https://nextjs.org/docs/messages/no-stylesheets-in-head-component'. Favicons and metadata will be stored here as well.

export default function Document() {
  return (
    <Html>
      <Head>

        {/* The link tags below are for/from Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />

        {/* Favicon */}
        <link rel='icon' href='favicon.png' />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}