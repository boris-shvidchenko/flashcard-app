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
        dispatch({type: 'hideIntroMsg'})
    }

    // Open login window for Google. Log error if user closes the window without logging in
    function logIn() {
        signInWithPopup(auth, provider).catch(() => console.log('User closed the login window without logging in.'))
        closeIntroMsg();
    }

    return (
        <div className='absolute flex justify-center bg-black/60 w-screen h-screen z-20'>
            <div className='relative bg-white rounded-sm w-96 h-40 mt-32 p-10 text-center'>
                <XMarkIcon onClick={closeIntroMsg} className='w-6 absolute top-2 right-2 cursor-pointer' />

                <p>Login to save your flashcards.</p>

                <section className='flex items-center mx-auto justify-between px-2 mt-3 text-lg'>
                    <button className='msg-btn' onClick={logIn}>Login</button>
                    <button className='msg-btn' onClick={closeIntroMsg}>Next Time</button>
                </section>

            </div>

        </div>
    )
}