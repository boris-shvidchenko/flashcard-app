// Components
import Sidebar from './Sidebar';
import CardContainer from './CardContainer';

export default function MainContainer() {
    return (
        <main className='h-[calc(100vh-4rem)] flex'>
            <section>
                <Sidebar />
            </section>
            <section>
                <CardContainer />
            </section>
        </main>
    )
}