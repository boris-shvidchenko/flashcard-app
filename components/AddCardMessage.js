// Heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

// Nanoid
import { nanoid } from 'nanoid';

export default function AddCardMessage() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Closes add card message and returns newCardData to default value
    function toggleAddCardMsg() {
        dispatch({type: 'toggleAddCardMsg'});
        dispatch({type: 'updateNewCard', newCard: {question: '', answer: '', id: ''}});
    }

    // On submit prevents default, returns randomize state to false, pushes new data to card array and sorted card state, updates what card to show, closes add card message, and returns newCardData to default value. Reference for sorting array of objects based on property > https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    function addCard(e) {
        e.preventDefault();
        dispatch({type: 'toggleRandomize', randomize: false});
        dispatch({type: 'storeRandomCard', randomCard: {}});
        dispatch({type: 'updateCards', cards: [...state.cards, state.newCard]});
        const newUpdatedCards = [...state.sortedCards, state.newCard].sort((a, b) => (a.question.toUpperCase() > b.question.toUpperCase() ? 1 : -1));
        dispatch({type: 'updateSortedCards', sortedCards: newUpdatedCards});
        if (state?.cards?.length === 1) {
            dispatch({type: 'showCard', showCard: state?.cards[0]});
        } 
        toggleAddCardMsg();
    }

    // Update newCardData state to add new card info
    function updateNewCard(e) {
        dispatch({ type: 'updateNewCard', newCard: {...state.newCard, [e.target.name]: e.target.value, id: nanoid()}});
    }

    return (
        <div className='popup-container '>
            <div className='popup'>
                <XMarkIcon onClick={toggleAddCardMsg} className='popup-x' />
                <h1 className='popup-title'>Add New Card</h1>
                <form onSubmit={(e) => addCard(e)} method='post' className='flex flex-col'>
                    <label htmlFor='question'>Question</label>
                    <input onChange={(e) => updateNewCard(e)} value={state.newCard.question} className='popup-input' required id='question' name='question' type='text' />
                    <label htmlFor='answer'>Answer</label>
                    <input onChange={(e) => updateNewCard(e)} value={state.newCard.answer} className='popup-input' required id='answer' name='answer' type='text' />
                    <button type='submit' className='popup-btn'>Create Card</button>
                </form>
            </div>
        </div>
    )
}