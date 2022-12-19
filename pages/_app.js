// Components
import Head from 'next/head';

// Firebase
import { auth, db } from '../firebase';
import { collection, doc, addDoc, getDocs, updateDoc, serverTimestamp } from "firebase/firestore"; 

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
    screenWidth: {width: ''}
  };
  
  // Set up useReducer and reducer function
  const [state, dispatch] = useReducer(reducer, initialState);
  
  function reducer(state, action) {
    switch(action.type) {
      case 'hideIntroMsg':
        return {...state, introMessage: false};
      case 'toggleDltMsg':
        return {...state, deleteMessage: !state.deleteMessage};
      case 'toggleAddCardMsg':
        return {...state, addCardMessage: !state.addCardMessage};
      case 'updateNewCard':
        return {...state, newCard: action.newCard};
      case 'updateCards':
        return {...state, cards: action.cards};
      case 'updateSortedCards':
        return {...state, sortedCards: action.sortedCards};
      case 'showAnswer':
        return {...state, showAnswer: !state.showAnswer};
      case 'showCard':
        return {...state, showCard: action.showCard};
      case 'showSortedCards':
        return {...state, showSortedCards: !state.showSortedCards};
      case 'toggleEditCardMsg':
        return {...state, editCardMessage: action.editCardMessage};
      case 'showMobileCardsArray':
        return {...state, showMobileCardsArray: action.showMobileCardsArray};
      case 'toggleRandomize':
        return {...state, randomize: action.randomize};
      case 'storeRandomCard':
        return {...state, randomCard: action.randomCard};
      case 'toggleLoggedIn':
        return {...state, userLoggedIn: action.userLoggedIn};
      case 'toggleLoading':
        return {...state, loading: action.loading};
      case 'updateProfilePic':
        return {...state, profilePic: action.profilePic};
      case 'updateScrnWidth':
        return {...state, screenWidth: action.screenWidth};
      default:
        return state;
      }
  }

  // Sets the screenWidth state width property to the current browser width. This is used in order to render components based on whether mobile view is used or not.
  // The code in the useEffect hook was referenced from the following source: https://stackoverflow.com/questions/63406435/how-to-detect-window-size-in-next-js-ssr-using-react-hook
  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        dispatch({type: 'updateScrnWidth', screenWidth: {width: window.innerWidth}});
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); 
  
  // Obtain the user and loading state
  const [user, loading] = useAuthState(auth);

  // On user change, get the users doc collection from firebase and update the state with those documents to update the UI with the users cards.
  useEffect(() => {
    if (user) {
      getDocs(collection(db, user.uid))
      .then((snapshot) => {
        let cards = [];
        snapshot.docs.forEach((doc) => {
          cards.push({ ...doc.data(), id: doc.id });
        })
        dispatch({type: 'updateCards', cards: cards[0].cards});
      })
      .catch((err) => console.log(err.message));
    }
  }, [user])

  // Access firebase and auth data on user and state.cards change
  useEffect(() => {
    // If user is logged in
    if (user) {
      // Update profile pic
      dispatch({type: 'updateProfilePic', profilePic: user.photoURL});
      // (1) Obtain the documents from firebase, (2) move the existing documents to cards array, (3) if card array is empty (aka no documents exist for user in firebase) then add a new collection and document, (4) if the card array is not empty (aka no documents exist for user in firebase) then update the first document to prevent adding additional data to database, (5) log out any errors to console.
      let cards = [];
      getDocs(collection(db, user.uid))
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            cards.push({ ...doc.data(), id: doc.id });
          })
        })
        .then(() => {
          if (cards.length === 0) {
            addDoc(collection(db, user.uid), {cards: state.cards, addedAt: serverTimestamp()})
              .then(() => console.log('Cards added to database' ))
              .catch((error) => console.log(error));
          } else {
            updateDoc(doc(db, user.uid, cards[0].id), {cards: state.cards, addedAt: serverTimestamp()})
              .then(() => console.log('Database updated'))
              .catch((error) => console.log(error));
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, [user, state.cards])
  
  // Everytime loading changes, if the user is logged in change userLoggedIn state to true. This will prevent the intro message from opening on refresh. Also update the loading state to display loading component on refresh.
  useEffect(() => {
    if (loading) dispatch({type:'toggleLoading', loading: true});
    if (!loading) dispatch({type:'toggleLoading', loading: false});
    if (user) dispatch({type:'toggleLoggedIn', userLoggedIn: true});
  }, [loading])

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
