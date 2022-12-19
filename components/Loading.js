// Components
import { Oval } from 'react-loader-spinner';

export default function Loading() {
    return (
        <div className='bg-black/90 absolute w-full h-full z-50'>
            <div className=' w-40 mx-auto mt-40'>
                <Oval
                    height={80}
                    width={80}
                    color="#f7f5f5"
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#f7f5f5"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </div>
        </div>
    )
}