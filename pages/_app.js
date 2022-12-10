// Components
import Head from 'next/head';

// Hooks
import { createContext, useReducer } from 'react';

// Styles
import '../styles/globals.css';

// Data (temp for now)
import { tempCardList } from '../tempCardList';

// Create Context for app
export const Context = createContext();

export default function MyApp({ Component, pageProps }) {

  // Set up initial state
  const initialState = {
    introMessage: true,
    deleteMessage: false,
    addCard: false,
    newCardData: {question: '', answer: '', id: ''},
    cards: tempCardList
  }

  // Set up useReducer and reducer function
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch(action.type) {
      case 'hideIntroMsg':
        return {...state, introMessage: false}
      case 'toggleDltMsg':
        return {...state, deleteMessage: !state.deleteMessage}
      case 'toggleAddCardMsg':
        return {...state, addCard: !state.addCard}
      case 'updateNewCardData':
        return {...state, newCardData: action.newCardData}
      default:
        return state
    }
  }

  // Testing purposes
  console.log(state);

  return (
    <Context.Provider value={{ state, dispatch }}>
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
