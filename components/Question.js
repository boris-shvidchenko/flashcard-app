// Heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Question({ question }) {
    return(
        <div className='flex border-b border-gray-300 justify-evenly p-2'>
            <p className='truncate w-40'>{question}</p>
            <XMarkIcon className='w-6 text-red-600 cursor-pointer' />
        </div>
    )
}