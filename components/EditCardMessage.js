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
        dispatch({ type: 'updateNewCard', newCard: {question: '', answer: '', id: ''}})
        dispatch({ type:'toggleEditCardMsg', editCardMessage: !state.editCardMessage})
    }
    
    
    // Edits the selected card by updating the new card state
    function editCard(e) {
        dispatch({ type: 'updateNewCard', newCard: {...state.newCard, [e.target.name]: e.target.value, id: currentCard.id}})
    }

    // Saves the edit by updating the cards, sorted cards and show cards state. Then runs the closeEditWindow function.
    function saveEdit(e) {
        e.preventDefault();
        let tempCardArray = [];
        let tempSortedCardArray = [];
        for (let card of state?.cards) card.id === state?.newCard.id ? tempCardArray.push(state?.newCard) : tempCardArray.push(card);
        for (let card of state?.sortedCards) card.id === state?.newCard.id ? tempSortedCardArray.push(state?.newCard) : tempSortedCardArray.push(card);
        dispatch({type: 'updateCards', cards: tempCardArray})
        dispatch({type: 'updateSortedCards', sortedCards: tempSortedCardArray})
        const tempCard = tempCardArray.filter((card) => card.id === state.newCard.id);
        console.log(tempCard)
        dispatch({type: 'showCard', showCard: tempCard[0]})
        closeEditWindow();
    }
    
    // Once per render, update the new card state to the current card
    useEffect(() => {
        dispatch({ type: 'updateNewCard', newCard: {question: currentCard.question, answer: currentCard.answer, id: currentCard.id}})
    }, [])
    
    return (
        <div className='absolute flex justify-center bg-black/60 w-screen h-screen z-30'>
            <div className='relative bg-white rounded-sm w-96 h-64 mt-32 p-10 pt-4 text-center'>
                <XMarkIcon onClick={closeEditWindow} className='w-6 absolute top-2 right-2 cursor-pointer' />
                <h1 className='mb-3 font-semibold text-lg'>Edit Card</h1>
                <form onSubmit={saveEdit} method='post' className='flex flex-col'>

                    <label htmlFor='question'>Question</label>
                    <input onChange={(e) => editCard(e)} value={state.newCard.question} className='border border-black my-2' id='question' name='question' type='text' />

                    <label htmlFor='answer'>Answer</label>
                    <input onChange={(e) => editCard(e)} value={state.newCard.answer} className='border border-black my-2' id='answer' name='answer' type='text' />

                    <button type='submit' className='msg-btn mx-auto mt-3'>Save Edit</button>
                </form>
            </div>

        </div>
    )
}