// Heroicons
import { UserCircleIcon } from '@heroicons/react/24/outline';
// import { UserCircleIcon } from '@heroicons/react/24/solid';

// Firebase
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase.js';

export default function Header() {

    // Open login window for Google. Log error if user closes the window without logging in
    function logIn() {
        signInWithPopup(auth, provider).catch(() => console.log('User closed the login window without logging in.'))
    }

    return (
        <header className='bg-white h-16 border-b border-gray-400 flex items-center justify-between px-10 z-30'>
            <h1>Flashcards</h1>
            <section onClick={logIn} className='flex items-center space-x-3 cursor-pointer'>
                <p>Log in</p>
                <UserCircleIcon className='w-8' />
            </section>
        </header>
    )
}
