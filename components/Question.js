// Heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function Question({ question, id }) {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Delete one card from the card list, updates showCard and sortedCards state (otherwise the old, deleted, card will still be shown), if cards array is empty then also close the mobile cards array component
    function dltOneCard() {
        let tempCardArray = state.cards.filter((card) => card.id !== id);
        let tempSortedCardArray = state.sortedCards.filter((card) => card.id !== id);
        dispatch({type: 'updateCards', cards: tempCardArray});
        dispatch({type: 'updateSortedCards', sortedCards: tempSortedCardArray})
        dispatch({type: 'showCard', showCard: tempCardArray[0]})
        if (tempCardArray.length === 0) dispatch({type: 'showMobileCardsArray', showMobileCardsArray: false})
    }

    // Changes showAnswer to false so that the answer is hidden for the other cards, toggles randomize state to false, returns randomCard state to false, then search cards for the card with the same id as selected card (in sidebar) to render to page. 
    function showCard() {
        if (state.showAnswer) dispatch({ type:'showAnswer', showAnswer: false});
        dispatch({type: 'toggleRandomize', randomize: false});
        dispatch({type: 'storeRandomCard', randomCard: {}})
        const tempCard = state.cards.filter((card) => card.id === id);
        dispatch({type: 'showCard', showCard: tempCard[0]})
        if (state.showMobileCardsArray) dispatch({type: 'showMobileCardsArray'});
    }

    return(
        <div className='flex border-b border-gray-300 justify-evenly pl-4 md:pl-0 p-2'>
            <p onClick={showCard} className='px-4 sm:pl-2 truncate w-32 md:w-44 cursor-pointer'>{question}</p>
            <XMarkIcon onClick={dltOneCard} className='mr-4 md:mr-0 w-6 text-red-600 hover:text-red-800 cursor-pointer' />
        </div>
    )
}