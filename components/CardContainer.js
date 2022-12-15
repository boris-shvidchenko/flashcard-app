// Component
import Card from './Card';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function CardContainer() {

    // Get state from Context
    const { state } = useContext(Context);

    return (
        <div className='w-screen sm:w-[calc(100vw-12.6rem)] md:w-[calc(100vw-16rem)] h-full'>
            {state?.cards?.length !== 0 && <Card />}
        </div>
    )
}