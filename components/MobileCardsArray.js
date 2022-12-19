// Components
import Question from './Question';

// Heroicons
import { XMarkIcon, TrashIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function MobileCardsArray() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Close the mobile cards array modal
    function closeMobileCardsModal() {
        dispatch({type: 'showMobileCardsArray'})
    }

    // Opens delete message 
    function openDltMsg() {
        if (state?.cards?.length !== 0) dispatch({type: 'toggleDltMsg'});
    }

    // Sorts cards
    function sortCards() {
        if (state?.cards.length !== 0) {
            const cardQuestions = state.cards.map((card) => {
                return {question: card.question, id: card.id}
            })
            cardQuestions.sort((a,b) => a.question.toUpperCase() > b.question.toUpperCase() ?  1 : -1);
            console.log(cardQuestions)
            let tempSortedCards = [];
            for (let q of cardQuestions) {
                for (let c of state?.cards) {
                    if (c.id === q.id) tempSortedCards.push(c)
                    }
                }
            dispatch({type: 'updateSortedCards', sortedCards: tempSortedCards})
            dispatch({type: 'showSortedCards'})
        }
    }

    // Mapping through temporary card list to create Question component
    const questionList = 
        state.showSortedCards ? state.sortedCards.map((q) => <Question question={q.question} key={q.id} id={q.id}/>): 
        state.cards.map((q) => <Question question={q.question} key={q.id} id={q.id}/>)

    return(
        <div className='popup-container'>
            <div className='popup h-[31.25rem] pt-4'>
                <XMarkIcon onClick={closeMobileCardsModal} className='popup-x' />
                <section className='my-7 mx-2 h-[23rem] overflow-y-scroll scroll scrollbar-thumb-rounded-md'>
                    {questionList}
                </section>

                <section className='flex border-t border-gray-400'>

                    <div onClick={openDltMsg} className='mobile-array-btn border-r border-gray-400 text-red-500'>
                        <p>Delete All</p>
                        <TrashIcon className='icons' />
                    </div>

                    <div onClick={sortCards} className='mobile-array-btn'>
                        <p>Sort</p>
                        <ChevronUpDownIcon className='icons' />
                    </div>
                </section>

            </div>
        </div>
    )
}