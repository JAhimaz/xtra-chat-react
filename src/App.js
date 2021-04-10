import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import SignInPage from './components/SignInPage';
import ChatRoom from './components/ChatRoom/ChatRoom';
import { firebaseConfig } from './firebaseConfig';

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        {user ? <ChatRoom auth={auth} firebase={firebase} firestore={firestore}/> : <SignInPage />}
      </header>
    </div>
  );
}

export function SignInBtn() {

  const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
  }

  return (
    <Button onClick={signInWithGoogle}>Sign In</Button>
  );
}

export function SignOutBtn() {

  return  auth.currentUser && (
    <Button onClick={() => auth.signOut()}>Sign Out</Button>
  );
}



export default App;
