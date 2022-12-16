// Heroicons
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';

// Hooks
import { useContext, useEffect } from 'react';

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

    // // Switch randomize state to true to allow random card to be selected, if cards array is not equal to 1 then select a random card from array and store it in random card state for use. While loop will continue until a card that isnt already selected is chosen randomly. Change show answer state to false if it is true
    function randomizeCard() {
        if (state?.cards?.length > 1) {
            dispatch({type: 'toggleRandomize', randomize: true});
            if (state.showAnswer) dispatch({type: 'showAnswer', showAnswer: false});
            while (true) {
                let random = state?.cards[Math.floor(Math.random() * state.cards.length)]
                if (random !== state.showCard) {
                    dispatch({type: 'storeRandomCard', randomCard: random});
                    return false;
                } else {
                    continue
                }   
            }
        }
    }

    // On random card state change, if the random card obj is not empty update the show card state
    useEffect(() => {
        if (Object.keys(state.randomCard).length !== 0 ) dispatch({type: 'showCard', showCard: state.randomCard})
    }, [state.randomCard])

    return (
        <div className='bg-white border border-gray-400 w-[26rem] h-[65%] p-10 mx-auto relative top-20 flex flex-col space-y-8 items-center justify-center rounded-sm z-20 overflow-x-hidden scroll'>
            <section className='flex flex-col items-center'>
                <p className={`${state.showAnswer ? 'hidden' : ''} mb-3`}>Question:</p>
                <p className={`${state.showAnswer ? 'hidden' : ''} break-words w-[20rem] max-h-32 overflow-y-scroll scroll p-2 pl-3 text-center`}>{state?.cards?.length === 1 || state?.showCard === undefined ? state?.cards[0].question : state?.randomize ? state?.showCard?.question : Object.keys(state.showCard).length === 0 ? state?.cards[0].question : state?.showCard?.question}</p>
                <p className={`${state.showAnswer ? '' : 'hidden'} mb-3`}>Answer:</p>
                <p className={`${state.showAnswer ? '' : 'hidden'} break-words w-[20rem] max-h-32 overflow-y-scroll scroll p-2 pl-3 text-center`}>{state?.cards?.length === 1 || state?.showCard === undefined ? state?.cards[0].answer : state?.randomize ? state?.showCard?.answer : Object.keys(state.showCard).length === 0 ? state?.cards[0].answer : state?.showCard?.answer}</p>
            </section>

            <section className='text-lg w-80 justify-between flex'>
                <button onClick={toggleAnswer} className={`msg-btn w-36 ${state.showAnswer ? 'hidden' : ''}`}>Show Answer</button>
                <button onClick={toggleAnswer} className={`msg-btn w-36 ${state.showAnswer ? '' : 'hidden'}`}>Show Question</button>
                <button onClick={openEditWindow} className='msg-btn w-36'>Edit Card</button>
            </section> 

            <section onClick={randomizeCard} className='hidden sm:flex cursor-pointer border border-black justify-center p-1 w-40 space-x-3 select-none'>
                <p>Shuffle</p>
                <ArrowPathRoundedSquareIcon className='w-6' />
            </section>   

        </div>
    )
}