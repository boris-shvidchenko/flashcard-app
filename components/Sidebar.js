// Components
import Question from './Question';

// Heroicons
import { PlusCircleIcon, PlusIcon, TrashIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function Sidebar() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Opens delete message 
    function openDltMsg() {
        if (state?.cards?.length !== 0) dispatch({type: 'toggleDltMsg'});
    }

    // Opens add card message, if no cards are present in card list state, return the showCard state to default
    function toggleAddCardMsg() {
        if (state?.cards?.length === 0) dispatch({type: 'showCard', showCard: {}})
        dispatch({type: 'toggleAddCardMsg'})
    }

    // Sorts cards
    function sortCards() {
        if (state?.cards.length !== 0) {
            const cardQuestions = state.cards.map((card) => card.question)
            cardQuestions.sort();
            let tempSortedCards = [];
            for (let q of cardQuestions) {
                for (let c of state?.cards) {
                    if (c.question === q) tempSortedCards.push(c)
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

    return (
        <div className='w-64 h-[calc(100vh-4rem)] border-r border-gray-400'>

            <section onClick={toggleAddCardMsg} className='sidebar-section border-b'>
                <p>Add Card</p>
                <PlusCircleIcon className='w-6' />
            </section>

            <section onClick={sortCards} className='flex space-x-1 pl-[6.6rem] py-1 cursor-pointer text-sm border-b border-gray-400'>
                <p>Sort</p>
                <ChevronUpDownIcon className='w-5' />
            </section>

            <section className='h-[calc(100vh-11rem)] overflow-y-auto scroll'>
                {questionList}
            </section>

            <section onClick={openDltMsg} className='sidebar-section border-t'>
                <p>Delete All</p>
                <TrashIcon className='w-6' />
            </section>

        </div>
    )
}
