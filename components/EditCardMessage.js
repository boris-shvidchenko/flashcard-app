// Heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function EditCardMessage() {

    // Get state from Context
    const { state, dispatch } = useContext(Context);

    // Close edit window
    function closeEditWindow() {
        dispatch({ type:'toggleEditCardMsg', editCardMessage: !state.editCardMessage})
    }

    const tempCard = state?.cards.filter((card) => card.id === state.showCard.id)
    console.log(tempCard)
    
    function test(e) {
        e.preventDefault();
        // dispatch({ type: 'updateNewCard', newCard: {...state.newCard, [e.target.name]: e.target.value, id: nanoid()}})
        // const tempCard = state?.cards.filter((card) => card.id === state.showCard.id)
    }

    return (
        <div className='absolute flex justify-center bg-black/60 w-screen h-screen z-20'>
            <div className='relative bg-white rounded-sm w-96 h-64 mt-32 p-10 pt-4 text-center'>
                <XMarkIcon onClick={closeEditWindow} className='w-6 absolute top-2 right-2 cursor-pointer' />
                <h1 className='mb-3 font-semibold text-lg'>Edit Card</h1>
                <form method='post' className='flex flex-col'>

                    <label htmlFor='question'>Question</label>
                    <input onChange={(e) => test(e)} value={tempCard.question} className='border border-black my-2' id='question' name='question' type='text' />

                    <label htmlFor='answer'>Answer</label>
                    <input onChange={(e) => test(e)} value={tempCard.answer} className='border border-black my-2' id='answer' name='answer' type='text' />

                    <button type='submit' className='msg-btn mx-auto mt-3'>Save Edit</button>
                </form>
            </div>

        </div>
    )
}