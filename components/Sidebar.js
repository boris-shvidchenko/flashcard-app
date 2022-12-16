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
            const cardQuestions = state.cards.map((card) => card.id)
            cardQuestions.sort();
            let tempSortedCards = [];
            for (let q of cardQuestions) {
                for (let c of state?.cards) {
                    if (c.id === q) tempSortedCards.push(c)
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
        <div className='sm:w-[12.6rem] md:w-64 h-[calc(100vh-4rem)] border-r border-gray-400'>

            <section onClick={toggleAddCardMsg} className='sidebar-section border-b bg-[#e0fbfc]'>
                <p className='ml-2 w-20 text-center'>Add Card</p>
                <PlusCircleIcon className='w-6' />
            </section>

            <section onClick={sortCards} className='flex space-x-1 pl-[4.7rem] md:pl-[6.3rem] py-1 cursor-pointer text-sm border-b border-gray-400 bg-[#daeaeb] hover:font-semibold'>
                <p className='w-8 text-center'>Sort</p>
                <ChevronUpDownIcon className='w-5' />
            </section>

            <section className='h-[calc(100vh-10.8rem)] overflow-y-auto scroll bg-[#f2f2f2]'>
                {questionList}
            </section>

            <section onClick={openDltMsg} className='sidebar-section bg-[#ee6c4d]'>
                <p className='ml-2 w-20 text-center'>Delete All</p>
                <TrashIcon className='w-6' />
            </section>

        </div>
    )
}
