// Heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Firebase
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase.js';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function IntroMessage() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Closes intro message
    function closeIntroMsg() {
        dispatch({type: 'hideIntroMsg'});
    }

    // Open login window for Google and update userLoggedIn state to true. Log error if user closes the window without logging in
    function logIn() {
        signInWithPopup(auth, provider)
            .then(() => console.log('User logged in'))
            .then(() => dispatch({type:'toggleLoggedIn', userLoggedIn: true}))
            .catch(() => console.log('User closed the login window without logging in.'));
        closeIntroMsg();
    }

    return (
        <div className='popup-container'>
            <div className={`${state.screenWidth.width < 400 ? 'w-80' : ''} popup h-44 pt-12`}>
                <XMarkIcon onClick={closeIntroMsg} className='popup-x' />
                <p className='pb-3'>Login to save your flashcards.</p>
                <section className='popup-btn-container'>
                    <button className={`msg-btn ${state.screenWidth.width < 400 ? 'w-[6.5rem]' : ''}`} onClick={logIn}>Login</button>
                    <button className={`msg-btn ${state.screenWidth.width < 400 ? 'w-[6.5rem]' : ''}`} onClick={closeIntroMsg}>Next Time</button>
                </section>
            </div>
        </div>
    )
}