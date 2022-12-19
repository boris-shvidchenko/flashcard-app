// Components
import Question from './Question';

// Heroicons
import { PlusCircleIcon, TrashIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

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
        if (state?.cards?.length === 0) dispatch({type: 'showCard', showCard: {}});
        dispatch({type: 'toggleAddCardMsg'});
    }

    // Sorts cards
    function sortCards() {
        if (state?.cards.length !== 0) {
            const cardQuestions = state.cards.map((card) => {
                return {question: card.question, id: card.id};
            })
            cardQuestions.sort((a,b) => a.question.toUpperCase() > b.question.toUpperCase() ?  1 : -1);
            let tempSortedCards = [];
            for (let q of cardQuestions) {
                for (let c of state?.cards) {
                    if (c.id === q.id) tempSortedCards.push(c);
                }
            }
            dispatch({type: 'updateSortedCards', sortedCards: tempSortedCards});
            dispatch({type: 'showSortedCards'});
        }
    }
    
    // Mapping through temporary card list to create Question component
    const questionList = 
        state.showSortedCards ? state.sortedCards.map((q) => <Question question={q.question} key={q.id} id={q.id}/>): 
        state.cards.map((q) => <Question question={q.question} key={q.id} id={q.id}/>);

    return (
        <div className='sm:w-[12.6rem] md:w-64 h-[calc(100vh-4rem)] border-r border-gray-300'>
            <section onClick={toggleAddCardMsg} className='sidebar-section bg-[#e0fbfc]'>
                <p className='sidebar-btn-text'>Add Card</p>
                <PlusCircleIcon className='icons' />
            </section>
            <section onClick={sortCards} className='flex space-x-1 pl-[4.7rem] md:pl-[6.3rem] py-1 cursor-pointer text-sm border-b border-[#c3dadb] bg-[#c3dadb] hover:font-semibold'>
                <p className='w-8 text-center'>Sort</p>
                <ChevronUpDownIcon className='w-5' />
            </section>
            <section className='h-[calc(100vh-10.8rem)] overflow-y-auto scroll bg-[#f7f5f5]'>
                {questionList}
            </section>
            <section onClick={openDltMsg} className='sidebar-section bg-[#ee6c4d]'>
                <p className='sidebar-btn-text'>Delete All</p>
                <TrashIcon className='icons' />
            </section>
        </div>
    )
}
