// Components
import Question from './Question';

// Heroicons
import { PlusCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

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

    // Opens add card message
    function toggleAddCardMsg() {
        dispatch({type: 'toggleAddCardMsg'})
    }

    // Mapping through temporary card list to create Question component
    const questionList = state.cards.map((q) => {
        return (
            <Question question={q.question} key={q.id} id={q.id}/>
        )
    })

    return (
        <div className='w-64 h-[calc(100vh-4rem)] border-r border-gray-400'>

            <section onClick={toggleAddCardMsg} className='sidebar-section border-b'>
                <p>Add Card</p>
                <PlusCircleIcon className='w-6' />
            </section>

            <section className='h-[calc(100vh-9rem)] overflow-y-auto scroll'>
                {questionList}
            </section>

            <section onClick={openDltMsg} className='sidebar-section border-t'>
                <p>Delete All</p>
                <TrashIcon className='w-6' />
            </section>

        </div>
    )
}
