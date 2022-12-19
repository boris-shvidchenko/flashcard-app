// Components
import Image from 'next/image.js';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

// Heroicons
import { UserCircleIcon } from '@heroicons/react/24/outline';

// Firebase
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase.js';

export default function Header() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Open login window for Google. If user is logged in, logout and update profilePic state to remove profile pic. Log error if user closes the window without logging in
    function logIn() {
        if (!state.userLoggedIn) {
            dispatch({ type: 'updateCards', cards: []});
            signInWithPopup(auth, provider)
                .then(() => dispatch({type:'toggleLoggedIn', userLoggedIn: true}))
                .then(() => console.log('User logged in'))
                .catch(() => console.log('User closed the login window without logging in.'));
        }
        if (state.userLoggedIn) {
            signOut(auth)
                .then(() => dispatch({type:'toggleLoggedIn', userLoggedIn: false}))
                .then(() => console.log('User logged out'))
                .catch((err) => console.log(err));
            dispatch({type: 'updateProfilePic', profilePic: ''});
        }
    }

    return (
        <header className='bg-[#98c1d9] h-16 flex items-center justify-between px-10 z-30 drop-shadow-md'>
            <section className='flex items-center space-x-3'>
                <Image src='/favicon.png' width={33} height={33} alt='App logo' />
                <h1 className='text-xl header-title'>Flashcards</h1>
            </section>   
            <section onClick={logIn} className={`${!state.userLoggedIn ? 'flex' : 'hidden'} header-login`}>
                <p className='header-btn'>Login</p>
                <UserCircleIcon className='w-8' />
            </section>
            <section onClick={logIn} className={`${state.userLoggedIn ? 'flex' : 'hidden'} header-login`}>
                <p className='header-btn'>Logout</p>
                {state.profilePic === '' ? <UserCircleIcon className='w-8' /> : <img src={state.profilePic} className='w-7 h-7 rounded-full' />}
            </section>
        </header>
    )
}
