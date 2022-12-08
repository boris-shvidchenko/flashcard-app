// Components
import Question from './Question';

// Heroicons
import { PlusCircleIcon } from '@heroicons/react/24/outline';
// import { PlusIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

// Temporary array for test questions (DELETE)
import { tempCardList } from '../tempCardList';

export default function Sidebar() {

    // Mapping through temporary card list to create Question component
    const questionList = tempCardList.map((q) => {
        return (
            <Question question={q.question} key={q.id}/>
        )
    })

    return (
        <div className='w-64 h-[calc(100vh-4rem)] border-r border-gray-400'>

           <section className='sidebar-section border-b'>
                <p>Add Card</p>
                <PlusCircleIcon className='w-6' />
            </section>

            <section className='h-[calc(100vh-9rem)] overflow-y-auto scroll'>
                {questionList}
            </section>

            <section className='sidebar-section border-t'>
                <p>Delete All</p>
                <TrashIcon className='w-6' />
            </section>

        </div>
    )
}
