// Components
import Head from 'next/head';

// Firebase
import { auth, db } from '../firebase';
import { collection, doc, setDoc, addDoc } from "firebase/firestore"; 

// Hooks
import { createContext, useReducer, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Styles
import '../styles/globals.css';

// Create Context for app
export const Context = createContext();

export default function MyApp({ Component, pageProps }) {

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
    randomCard: {},
    userLoggedIn: false,
    loading: false,
    profilePic: '',
    updateDB: false,
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
      case 'toggleLoggedIn':
        return {...state, userLoggedIn: action.userLoggedIn}
      case 'toggleLoading':
        return {...state, loading: action.loading}
      case 'updateProfilePic':
        return {...state, profilePic: action.profilePic}
      case 'updateDB':
        return {...state, updateDB: action.updateDB}
      default:
        return state
      }
  }
  
  // Obtain the user and loading state
  const [user, loading] = useAuthState(auth);

  // Update the profilePic state and update the cards on the firestore database if a user is logged in.
  useEffect(() => {
    if (user) {
      dispatch({type: 'updateProfilePic', profilePic: user.photoURL})
      addDoc(collection(db, user.uid), {Cards: state.cards})
        .then(() => console.log('Card added to database' ))
        .catch((error) => console.log(error));
      dispatch({type:'updateDB', updateDB: false})
    }
  }, [user, state.updateDB])
  
  // Everytime loading changes, if the user is logged in change userLoggedIn state to true. This will prevent the intro message from opening on refresh. Also update the loading state to display loading component on refresh.
  useEffect(() => {
    if (loading) dispatch({type:'toggleLoading', loading: true});
    if (!loading) dispatch({type:'toggleLoading', loading: false});
    if (user) dispatch({type:'toggleLoggedIn', userLoggedIn: true})
  }, [loading])
  
  // Testing purposes
  console.log(state);
  // console.log(user)

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
