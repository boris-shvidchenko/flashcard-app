// Heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function DeleteMessage() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Closes delete message
    function closeDltMsg() {
        dispatch({type: 'toggleDltMsg'});
    }

    // Deletes all cards, returns randomCard, randomize, cards, sortedCards, showCard, showMobileCardsArray, and updateDB state to default value, closes delete message. Deletes collection in firebase as well. 
    function dltAllCards() {
        dispatch({type: 'storeRandomCard', randomCard: {}});
        dispatch({type: 'toggleRandomize', randomize: false});
        dispatch({type: 'updateCards', cards: []});
        dispatch({type: 'updateSortedCards', sortedCards: []});
        dispatch({type: 'showCard', showCard: {}});
        dispatch({type: 'showMobileCardsArray', showMobileCardsArray: false});
        closeDltMsg();
    }

    return (
        <div className='popup-container z-50'>
            <div className={`popup ${state.screenWidth.width < 400 ? 'w-80' : ''} h-48 pt-10`}>
                <XMarkIcon onClick={closeDltMsg} className='popup-x' />
                <p className='pb-5'>Are you sure you want to delete all of your cards?</p>
                <section className='popup-btn-container'>
                    <button className={`msg-btn bg-[#ee6c4d] ${state.screenWidth.width < 400 ? 'w-[6.5rem]' : ''}`} onClick={dltAllCards}>Delete</button>
                    <button className={`msg-btn ${state.screenWidth.width < 400 ? 'w-[6.5rem]' : ''}`} onClick={closeDltMsg}>Cancel</button>
                </section>
            </div>
        </div>
    )
}