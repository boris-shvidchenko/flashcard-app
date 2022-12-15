import { Html, Head, Main, NextScript } from 'next/document';

// This file is used to add Google Font stylesheets to the document and to avoid possible errors/warnings. Referenced from 'https://nextjs.org/docs/messages/no-stylesheets-in-head-component'. Favicons and metadata will be stored here as well.

export default function Document() {
  return (
    <Html>
      <Head>

        {/* The link tags below are for/from Google Fonts for the body text */}

        {/* Favicon */}
        <link rel='icon' href='favicon.png' />

        {/* Metadata */}
        <meta charSet='utf-8' />
        <meta name="description" content="Flashcard app" />
        <meta name="keywords" content="Boris Shvidchenko, Portfolio, Flashcards, App" />
        <meta name="author" content="Boris Shvidchenko" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Flashcards</title>

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}