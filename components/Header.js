// Heroicons
import { UserCircleIcon } from '@heroicons/react/24/outline';
// import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function Header() {
    return (
        <header className='h-16 border-b border-gray-400 flex items-center justify-between px-10'>
            <h1>Flashcards</h1>
            <section className='flex items-center space-x-3 cursor-pointer'>
                <p>Log in</p>
                <UserCircleIcon className='w-8' />
            </section>
        </header>
    )
}
