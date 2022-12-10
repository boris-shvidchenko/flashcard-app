// Components
import Header from '../components/Header';
import MainContainer from '../components/MainContainer';
import IntroMessage from '../components/IntroMessage';
import DeleteMessage from '../components/DeleteMessage';
import AddCard from '../components/AddCard';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function Home() {

  // Get state from Context
  const { state } = useContext(Context);

  return (
    <div>
      {state.introMessage && <IntroMessage />}
      {state.deleteMessage && <DeleteMessage />}
      {state.addCard && <AddCard />}
      <Header />
      <MainContainer />
    </div>
  )
}
