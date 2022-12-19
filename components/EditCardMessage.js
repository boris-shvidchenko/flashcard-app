// Heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Hooks
import { useContext, useEffect } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function EditCardMessage() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Obtain the current card
    const currentCard = Object.keys(state?.showCard).length === 0 ? state?.cards[0] : state.showCard;
    
    // Updates the new card state and closes the edit window
    function closeEditWindow() {
        dispatch({ type: 'updateNewCard', newCard: {question: '', answer: '', id: ''}});
        dispatch({ type:'toggleEditCardMsg', editCardMessage: !state.editCardMessage});
    }
    
    // Edits the selected card by updating the new card state
    function editCard(e) {
        dispatch({ type: 'updateNewCard', newCard: {...state.newCard, [e.target.name]: e.target.value, id: currentCard.id}});
    }

    // Saves the edit by updating the cards, sorted cards and show cards state. Then runs the closeEditWindow function.
    function saveEdit(e) {
        e.preventDefault();
        let tempCardArray = [];
        let tempSortedCardArray = [];
        for (let card of state?.cards) card.id === state?.newCard.id ? tempCardArray.push(state?.newCard) : tempCardArray.push(card);
        for (let card of state?.sortedCards) card.id === state?.newCard.id ? tempSortedCardArray.push(state?.newCard) : tempSortedCardArray.push(card);
        const newUpdatedCards = tempSortedCardArray.sort((a, b) => (a.question.toUpperCase() > b.question.toUpperCase() ? 1 : -1));
        dispatch({type: 'updateCards', cards: tempCardArray});
        dispatch({type: 'updateSortedCards', sortedCards: newUpdatedCards});
        const tempCard = tempCardArray.filter((card) => card.id === state.newCard.id);
        console.log(tempCard);
        dispatch({type: 'showCard', showCard: tempCard[0]});
        closeEditWindow();
    }
    
    // Once per render, update the new card state to the current card
    useEffect(() => {
        dispatch({ type: 'updateNewCard', newCard: {question: currentCard.question, answer: currentCard.answer, id: currentCard.id}});
    }, [])
    
    return (
        <div className='popup-container'>
            <div className={`popup ${state.screenWidth.width < 400 ? 'w-80' : ''}`}>
                <XMarkIcon onClick={closeEditWindow} className='popup-x' />
                <h1 className='popup-title'>Edit Card</h1>
                <form onSubmit={saveEdit} method='post' className='flex flex-col'>
                    <label htmlFor='question'>Question</label>
                    <input onChange={(e) => editCard(e)} value={state.newCard.question} className='popup-input' id='question' name='question' type='text' />
                    <label htmlFor='answer'>Answer</label>
                    <input onChange={(e) => editCard(e)} value={state.newCard.answer} className='popup-input' id='answer' name='answer' type='text' />
                    <button type='submit' className='popup-btn'>Save Edit</button>
                </form>
            </div>
        </div>
    )
}