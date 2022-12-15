// Heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Firebase
import { auth, db } from '../firebase';
import { collection, doc, setDoc, addDoc, getDocs, serverTimestamp } from "firebase/firestore"; 

// Hooks
import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Context
import { Context } from '../pages/_app.js';

// Nanoid
import { nanoid } from 'nanoid';

export default function AddCardMessage() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Obtain the user and loading state
    const [user] = useAuthState(auth);

    // Closes add card message and returns newCardData to default value
    function toggleAddCardMsg() {
        dispatch({type: 'toggleAddCardMsg'})
        dispatch({type: 'updateNewCard', newCard: {question: '', answer: '', id: ''}})
    }

    // On submit prevents default, returns randomizes state to false, pushes new data to card array and sorted card state, updates what card to show, closes add card message, and returns newCardData to default value. Reference for sorting array of objects based on property > https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    function addCard(e) {
        e.preventDefault();
        dispatch({type: 'toggleRandomize', randomize: false});
        dispatch({type: 'storeRandomCard', randomCard: {}})
        dispatch({type: 'updateCards', cards: [...state.cards, state.newCard]})
        const newUpdatedCards = [...state.sortedCards, state.newCard].sort((a, b) => (a.question > b.question ? 1 : -1))
        dispatch({type: 'updateSortedCards', sortedCards: newUpdatedCards})
        if (state?.cards?.length === 1) {
            dispatch({type: 'showCard', showCard: state?.cards[0]})
        } 
        toggleAddCardMsg();
    }

    // Update newCardData state to add new card info
    function updateNewCard(e) {
        dispatch({ type: 'updateNewCard', newCard: {...state.newCard, [e.target.name]: e.target.value, id: nanoid()}})
    }

    return (
        <div className='absolute flex justify-center bg-black/60 w-screen h-screen z-30'>
            <div className='relative bg-white rounded-sm w-96 h-64 mt-32 p-10 pt-4 text-center'>
                <XMarkIcon onClick={toggleAddCardMsg} className='w-6 absolute top-2 right-2 cursor-pointer' />
                <h1 className='mb-3 font-semibold text-lg'>Add New Card</h1>
                <form onSubmit={(e) => addCard(e)} method='post' className='flex flex-col'>
                    <label htmlFor='question'>Question</label>
                    <input onChange={(e) => updateNewCard(e)} value={state.newCard.question} className='border border-black my-2' required id='question' name='question' type='text' />
                    <label htmlFor='answer'>Answer</label>
                    <input onChange={(e) => updateNewCard(e)} value={state.newCard.answer} className='border border-black my-2' required id='answer' name='answer' type='text' />
                    <button type='submit' className='msg-btn mx-auto mt-3'>Create Card</button>
                </form>
            </div>
        </div>
    )
}