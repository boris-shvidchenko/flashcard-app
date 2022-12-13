// Components
import Header from '../components/Header';
import MainContainer from '../components/MainContainer';
import IntroMessage from '../components/IntroMessage';
import DeleteMessage from '../components/DeleteMessage';
import AddCardMessage from '../components/AddCardMessage';
import EditCardMessage from '../components/EditCardMessage';
import MobileCardsArray from '../components/MobileCardsArray';
import Loading from '../components/Loading';

// Hooks
import { useContext } from 'react';

// Context
import { Context } from '../pages/_app.js';

export default function Home() {

  // Get state from Context
  const { state, dispatch } = useContext(Context);

  return (
    <>
      {/* {state.loading && <Loading />} */}
      {(state.introMessage && !state.userLoggedIn) && <IntroMessage />}
      {state.deleteMessage && <DeleteMessage />}
      {state.addCardMessage && <AddCardMessage />}
      {state.editCardMessage && <EditCardMessage />}
      {state.showMobileCardsArray && <MobileCardsArray />}
      <Header />
      <MainContainer /> 
    </>
  )
}
