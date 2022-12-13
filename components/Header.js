// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

// Heroicons
import { UserCircleIcon } from '@heroicons/react/24/outline';
// import { UserCircleIcon } from '@heroicons/react/24/solid';

// Firebase
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase.js';

export default function Header() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Open login window for Google. Log error if user closes the window without logging in
    function logIn() {
        if (!state.userLoggedIn) {
            signInWithPopup(auth, provider)
                .then(() => console.log('User logged in'))
                .catch(() => console.log('User closed the login window without logging in.'));
        }
        if (state.userLoggedIn) {
            signOut(auth)
                .then(() => dispatch({type:'toggleLoggedIn', userLoggedIn: false}))
                .then(() => console.log('User logged out'))
                .catch((err) => console.log(err));
        }
    }

    return (
        <header className='bg-white h-16 border-b border-gray-400 flex items-center justify-between px-10 z-30'>
            <h1>Flashcards</h1>
            <section onClick={logIn} className={`${!state.userLoggedIn ? 'flex' : 'hidden'} items-center space-x-3 cursor-pointer`}>
                <p>Login</p>
                <UserCircleIcon className='w-8' />
            </section>
            <section onClick={logIn} className={`${state.userLoggedIn ? 'flex' : 'hidden'} items-center space-x-3 cursor-pointer`}>
                <p>Logout</p>
                <UserCircleIcon className='w-8' />
            </section>
        </header>
    )
}
