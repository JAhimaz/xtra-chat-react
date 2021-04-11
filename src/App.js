import logo from './logo.svg';
import './css/App.css';
import './css/LeftPane.css';
import './css/RightPane.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col, Spinner } from 'react-bootstrap';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import SignInPage from './components/SignInPage';
import ChatRoom from './components/ChatRoom/ChatRoom';
import Groups from './components/Groups';

import { firebaseConfig } from './firebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user, loading] = useAuthState(auth);
  const [currentGroup, setCurrentGroup] = useState("");

  useEffect(() => {
    user && checkLogin(user);
  }, [user])

  const checkLogin = async(user) => {

    let { uid, photoURL, displayName, email } = user;

    firestore.collection("users").doc(uid).get()
    .then((doc) => {
      if(!doc.exists) {
        firestore.collection("users").doc(uid).set({
          uid,
          email,
          displayName,
          photoURL,
          joined: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    });
  }

  const setGroup = (val) => {
    setCurrentGroup(val);
  }

  return (
    <div className="App">
      <Row className="Header" noGutters>
        {loading ? (
          <div className="center-spinner">
            <Spinner animation="border" role="status" className="spinner">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>

        ) : (
          <>
            <Col lg={8} className="left-pane">
            <div id="background-shape"></div>
            <div className="left-pane-data">
              <a className="branding">Xtra Chat | FireBase & ReactJS</a>
              {!user ? <SignInPage /> 
              : 
              <Groups auth={auth} firebase={firebase} firestore={firestore} setGroupFunction={setGroup}/>}
            </div>
            </Col>
            <Col lg={4} className="chat-pane">
            <div className="chat-pane-data">
              {user ? 
                <>
                  {currentGroup ? <ChatRoom auth={auth} firebase={firebase} firestore={firestore} currentGroup={currentGroup} /> : 
                    <a>No Group</a>
                  }
                </>
              :
              <div className="not-signed">
              
              </div>}
            </div>

            </Col>
          </>
        )}
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
    <Button onClick={() => auth.signOut()} block>Logout</Button>
  );
}



export default App;
