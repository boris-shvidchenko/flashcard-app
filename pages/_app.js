// Components
import Head from 'next/head';

// Hooks
import { createContext, useState } from 'react';

// Styles
import '../styles/globals.css';

// Create Context for app
export const Context = createContext();

export default function MyApp({ Component, pageProps }) {

  // Set up initial state
  const [introMessage, setIntroMessage] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState(false);

  return (
    <Context.Provider value={{ introMessage, setIntroMessage, deleteMessage, setDeleteMessage }}>
      <Head>
        <meta charSet='utf-8' />
        <meta name="description" content="Flashcard app" />
        <meta name="keywords" content="Boris Shvidchenko, Portfolio, Flashcards, App" />
        <meta name="author" content="Boris Shvidchenko" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Flashcards</title>
      </Head>
      <Component {...pageProps} />
    </Context.Provider>
  )
}
