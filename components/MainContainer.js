// Components
import QuestionList from './QuestionList';
import CardContainer from './CardContainer';

export default function MainContainer() {
    return (
        <main className='h-[calc(100vh-4rem)] flex'>
            <section>
                <QuestionList />
            </section>
            <section>
                <CardContainer />
            </section>
        </main>
    )
}