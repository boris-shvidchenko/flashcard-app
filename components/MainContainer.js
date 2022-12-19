// Components
import Sidebar from './Sidebar';
import CardContainer from './CardContainer';

// Heroicons
import { PlusCircleIcon, Bars3Icon } from '@heroicons/react/24/outline';

// Hooks
import { useContext, useEffect } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function MainContainer() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Opens add card message, if no cards are present in card list state, return the showCard state to default only if showMobileCardsArray is false.
    function toggleAddCardMsg() {
        if (state?.cards?.length === 0) dispatch({type: 'showCard', showCard: {}});
        if (!state?.showMobileCardsArray && !state?.introMessage) dispatch({type: 'toggleAddCardMsg'});
    }

    // If showMobileCardsArrauy is true, return it to false. Opens mobile card array modal if length of cards array is greater than 0 and showMobileCardsArray is false.
    function openMobileCardsModal() {
        if (state.showMobileCardsArray) dispatch({type: 'showMobileCardsArray', showMobileCardsArray: false});
        if (state?.cards.length > 0 && !state?.showMobileCardsArray && !state?.addCardMessage) dispatch({type: 'showMobileCardsArray', showMobileCardsArray: true});
    }

    // On random card state change, if the random card obj is not empty update the show card state
    useEffect(() => {
        if (Object.keys(state.randomCard).length !== 0 ) dispatch({type: 'showCard', showCard: state.randomCard});
    }, [state.randomCard])

    return (
        <main className={`${state.screenWidth.width < 360 ? 'h-screen' : ''} h-[calc(100vh-4rem)] flex`}>
            {/* Desktop View */}
            <section className='desktop-components'>
                <Sidebar />
            </section>
            <section className='desktop-components'>
                <CardContainer />
            </section>
            {/* Mobile View */}
            <div className='flex flex-col sm:hidden bg-[#f0f2ed]'>
                <CardContainer />

                <section className='flex h-16 z-20 bg-[#c3dadb]'>

                    <div onClick={openMobileCardsModal} className={`main-container-btn border-r border-gray-400 ${state.screenWidth.width < 500 ? 'p-0' : ''}`}>
                        <p className='text-center w-max'>View Cards</p>
                        <Bars3Icon className='icons' />
                    </div>

                    <div onClick={toggleAddCardMsg} className={`main-container-btn ${state.screenWidth.width < 500 ? 'p-0' : ''}`}>
                        <p className='text-center w-max'>Add Card</p>
                        <PlusCircleIcon className='icons' />
                    </div>

                </section>
            </div>
        </main>
    )
}