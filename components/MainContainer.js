// Components
import Sidebar from './Sidebar';
import CardContainer from './CardContainer';

// Heroicons
import { PlusCircleIcon, Bars3Icon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';

// Hooks
import { useContext, useEffect } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function MainContainer() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Opens add card message, if no cards are present in card list state, return the showCard state to default only if showMobileCardsArray is false.
    function toggleAddCardMsg() {
        if (state?.cards?.length === 0) dispatch({type: 'showCard', showCard: {}})
        if (!state?.showMobileCardsArray && !state?.introMessage) dispatch({type: 'toggleAddCardMsg'})
    }

    // If showMobileCardsArrauy is true, return it to false. Opens mobile card array modal if length of cards array is greater than 0 and showMobileCardsArray is false.
    function openMobileCardsModal() {
        if (state.showMobileCardsArray) dispatch({type: 'showMobileCardsArray', showMobileCardsArray: false})
        if (state?.cards.length > 0 && !state?.showMobileCardsArray && !state?.addCardMessage) dispatch({type: 'showMobileCardsArray', showMobileCardsArray: true})
    }

    // Switch randomize state to true to allow random card to be selected, if cards array is greater than 1 then select a random card from array and store it in random card state for use.
    function randomizeCard() {
        if (state?.cards?.length > 1) {
            dispatch({type: 'toggleRandomize', randomize: true});
            dispatch({type: 'storeRandomCard', randomCard: state?.cards[Math.floor(Math.random() * state.cards.length)]});
        }
    }

    // On random card state change, if the random card obj is not empty update the show card state
    useEffect(() => {
        if (Object.keys(state.randomCard).length !== 0 ) dispatch({type: 'showCard', showCard: state.randomCard})
    }, [state.randomCard])

    return (
        <main className='h-[calc(100vh-4rem)] flex'>
            
            {/* Desktop View */}
            <section className='hidden sm:block'>
                <Sidebar />
            </section>
            <section className='hidden sm:block'>
                <CardContainer />
            </section>

            {/* Mobile View */}
            <div className='flex flex-col sm:hidden'>
                <CardContainer />

                <section onClick={randomizeCard} className='cursor-pointer border border-black flex justify-center p-1 w-40 space-x-3 select-none ml-[63vw] mb-6 mt-1'>
                    <p>Random Card</p>
                    <ArrowPathRoundedSquareIcon className='w-6' />
                </section> 

                <section className='flex h-16 z-20 bg-white border-t border-gray-400'>
                    <div onClick={openMobileCardsModal} className='flex items-center justify-center space-x-3 px-10 cursor-pointer border-r border-gray-400 w-full select-none'>
                        <p>View Cards</p>
                        <Bars3Icon className='w-6' />
                    </div>
                    <div onClick={toggleAddCardMsg} className='flex items-center justify-center space-x-3 px-10 cursor-pointer w-full select-none'>
                        <p>Add Card</p>
                        <PlusCircleIcon className='w-6' />
                    </div>
                </section>

            </div>

        </main>
    )
}