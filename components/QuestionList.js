// Heroicons
import { PlusCircleIcon } from '@heroicons/react/24/outline';
// import { PlusIcon } from '@heroicons/react/24/outline';

export default function QuestionList() {
    return (
        <div className='w-64 h-[calc(100vh-4rem)] border-r border-gray-400'>

           <section className='flex items-center space-x-2 pl-20 border-b border-gray-400 h-10'>
                <p>Add Card</p>
                <PlusCircleIcon className='w-6' />
            </section>

            <section className='bg-red-200 h-[calc(100vh-6.5rem)]'>

            </section>
        </div>
    )
}
