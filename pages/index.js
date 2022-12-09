// Components
import Header from '../components/Header';
import MainContainer from '../components/MainContainer';
import IntroMessage from '../components/IntroMessage';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function Home() {

  // Get state from Context
  const { introMessage } = useContext(Context);

  return (
    <div>
      {introMessage && <IntroMessage />}
      <Header />
      <MainContainer />
    </div>
  )
}
