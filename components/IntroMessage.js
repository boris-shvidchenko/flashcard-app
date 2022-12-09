// Heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Functions
import closeIntroMsg from '../functions/closeIntroMsg.js';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function IntroMessage() {

    // Get state from Context
    const { setIntroMessage } = useContext(Context);

    return (
        <div className='absolute flex justify-center bg-black/60 w-screen h-screen'>
            <div className='relative bg-white rounded-sm w-96 h-40 mt-32 p-10 text-center'>
                <XMarkIcon onClick={() => closeIntroMsg(setIntroMessage)} className='w-6 absolute top-2 right-2 cursor-pointer' />

                <p>Login to save your flashcards.</p>

                <section className='flex items-center mx-auto justify-between px-2 mt-3 text-lg'>
                    <button className='border border-black px-2 w-32'>Login</button>
                    <button className='border border-black px-2 w-32' onClick={() => closeIntroMsg(setIntroMessage)}>Next Time</button>
                </section>

            </div>

        </div>
    )
}