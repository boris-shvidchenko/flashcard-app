// Heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function DeleteMessage() {

    // Get state from Context
    const { setDeleteMessage } = useContext(Context);

    // Closes delete message
    function closeDltMsg() {
        setDeleteMessage(false);
    }

    return (
        <div className='absolute flex justify-center bg-black/60 w-screen h-screen'>
            <div className='relative bg-white rounded-sm w-96 h-40 mt-32 p-10 text-center'>
                <XMarkIcon onClick={closeDltMsg} className='w-6 absolute top-2 right-2 cursor-pointer' />

                <p>Are you sure you want to delete all of your cards?</p>

                <section className='flex items-center mx-auto justify-between px-2 mt-3 text-lg'>
                    <button className='msg-btn'>Delete</button>
                    <button className='msg-btn' onClick={closeDltMsg}>Cancel</button>
                </section>

            </div>

        </div>
    )
}