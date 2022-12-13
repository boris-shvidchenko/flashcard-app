// Components
import Head from 'next/head';

import { auth, db } from '../firebase';

// Hooks
import { createContext, useReducer, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Styles
import '../styles/globals.css';

// Create Context for app
export const Context = createContext();

export default function MyApp({ Component, pageProps }) {

  const [user] = useAuthState(auth);

  // Set up initial state
  const initialState = {
    introMessage: true,
    deleteMessage: false,
    addCardMessage: false,
    newCard: {question: '', answer: '', id: ''},
    cards: [],
    sortedCards: [],
    showAnswer: false,
    showCard: {},
    showSortedCards: false,
    editCardMessage: false,
    showMobileCardsArray: false,
    randomize: false,
    randomCard: {}
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
        return {...state, addCardMessage: !state.addCardMessage}
      case 'updateNewCard':
        return {...state, newCard: action.newCard}
      case 'updateCards':
        return {...state, cards: action.cards}
      case 'updateSortedCards':
        return {...state, sortedCards: action.sortedCards}
      case 'showAnswer':
        return {...state, showAnswer: !state.showAnswer}
      case 'showCard':
        return {...state, showCard: action.showCard}
      case 'showSortedCards':
        return {...state, showSortedCards: !state.showSortedCards}
      case 'toggleEditCardMsg':
        return {...state, editCardMessage: action.editCardMessage}
      case 'showMobileCardsArray':
        return {...state, showMobileCardsArray: action.showMobileCardsArray}
      case 'toggleRandomize':
        return {...state, randomize: action.randomize}
      case 'storeRandomCard':
        return {...state, randomCard: action.randomCard}
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
