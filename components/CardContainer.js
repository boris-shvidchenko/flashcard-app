// Component
import IntroMessage from './IntroMessage.js';

// Hooks
import { useContext } from 'react';

// Context
import Context from '../pages/_app.js';

export default function CardContainer() {

    // Get state from Context
    const { introMessage } = useContext(Context);
    console.log(introMessage)

    return (
        <div className='bg-blue-200 w-[calc(100vw-16rem)] h-full'>
            {/* {introMessage && <IntroMessage />} */}
            <IntroMessage />
        </div>
    )
}