import logo from './logo.svg';
import './css/App.css';
import './css/LeftPane.css';
import './css/RightPane.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col } from 'react-bootstrap';

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
      <Row className="Header" noGutters>
        <Col lg={8} className="left-pane">
          <div id="background-shape"></div>
          <div className="left-pane-data">
            <a className="branding">Xtra Chat | FireBase & ReactJS</a>
            {!user ? <SignInPage /> 
            : 
            <a>Logged In</a>}
          </div>
        </Col>
        <Col lg={4} className="chat-pane">
          <div className="chat-pane-data">
            {user ? <ChatRoom auth={auth} firebase={firebase} firestore={firestore}/> 
            :
            <div className="not-signed">
            Not Signed In
            </div>}
          </div>

        </Col>
      </Row>
        


    </div>
  );
}

export function SignInBtn() {

  const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
  }

  return (
    <Button className="sign-in-btn" onClick={signInWithGoogle}>Google Login</Button>
  );
}

export function SignOutBtn() {

  return  auth.currentUser && (
    <Button onClick={() => auth.signOut()}>Logout</Button>
  );
}



export default App;
