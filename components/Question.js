// Heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function Question({ question, id }) {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Delete one card from the card list, updates showCard state (otherwise the old, deleted, card will still be shown)
    function dltOneCard() {
        let tempCardArray = state.cards.filter((card) => card.id !== id);
        dispatch({type:'updateCards', cards: tempCardArray});
        dispatch({type: 'showCard', showCard: tempCardArray[0]})
    }

    // Changes showAnswer to false so that the answer is hidden for the other cards, then search cards for the card with the same id as selected card (in sidebar) to render to page. 
    function showCard() {
        if (state.showAnswer) dispatch({ type:'showAnswer', showAnswer: false});
        const tempCard = state.cards.filter((card) => card.id === id);
        dispatch({type: 'showCard', showCard: tempCard[0]})
    }

    return(
        <div className='flex border-b border-gray-300 justify-evenly p-2'>
            <p onClick={showCard} className='truncate w-40 cursor-pointer'>{question}</p>
            <XMarkIcon onClick={dltOneCard} className='w-6 text-red-600 cursor-pointer' />
        </div>
    )
}