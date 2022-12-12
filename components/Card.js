// Heroicons
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function Card() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Flip between question and answer
    function toggleAnswer(){
        dispatch({ type:'showAnswer', showAnswer: !state.showAnswer})
    }

    // Open edit window
    function openEditWindow() {
        dispatch({ type:'toggleEditCardMsg', editCardMessage: !state.editCardMessage})
    }

    return (
        <div className='bg-white border border-gray-400 w-[26rem] h-[25rem] p-10 mx-auto relative top-20 flex flex-col space-y-8 items-center justify-center rounded-sm'>

            <section className='flex flex-col items-center'>
                <p className={`${state.showAnswer ? 'hidden' : ''} mb-3`}>Question:</p>
                <p className={`${state.showAnswer ? 'hidden' : ''} break-words w-[20rem] max-h-32 overflow-y-scroll scroll p-2 pl-3 text-center`}>{state?.cards?.length === 1 ? state?.cards[0].question : state?.showCard === undefined ? state?.cards[0].question : state?.showCard?.question }</p>

                <p className={`${state.showAnswer ? '' : 'hidden'} mb-3`}>Answer:</p>
                <p className={`${state.showAnswer ? '' : 'hidden'} break-words w-[20rem] max-h-32 overflow-y-scroll scroll p-2 pl-3 text-center`}>{state?.cards?.length === 1 ? state?.cards[0].answer : state?.showCard === undefined ? state?.cards[0].answer : state?.showCard?.answer }</p>
                
            </section>

            <section className='text-lg w-80 justify-between flex'>
                <button onClick={toggleAnswer} className={`msg-btn w-36 ${state.showAnswer ? 'hidden' : ''}`}>Show Answer</button>
                <button onClick={toggleAnswer} className={`msg-btn w-36 ${state.showAnswer ? '' : 'hidden'}`}>Show Question</button>
                <button onClick={openEditWindow} className='msg-btn w-36'>Edit Card</button>
            </section> 

            <section className='cursor-pointer border border-black flex justify-center p-1 w-40 space-x-3'>
                <p>Random Card</p>
                <ArrowPathRoundedSquareIcon className='w-6' />
            </section>   

        </div>
    )
}