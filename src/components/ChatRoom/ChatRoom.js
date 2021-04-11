import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Spinner } from 'react-bootstrap';
import { SignOutBtn } from '../../App';

import ChatMessage from './ChatMessage';
import '../../css/Chat.css';

import { useCollectionData, useCollectionDataOnce } from 'react-firebase-hooks/firestore';

function ChatRoom(props) {

    const firebase = props.firebase;
    const firestore = props.firestore;
    const auth = props.auth;

    const currentGroup = props.currentGroup;

    const [ name, setName ] = useState("");
    const [ limit, setLimit ] = useState(0);
     
    useEffect(() => {
        firestore.collection('groups').doc(currentGroup).get()
        .then((group) => {
            setName(group.data().name);
            setLimit(group.data().limit);
        });
    })

    const messagesRef = firestore.collection('groups').doc(currentGroup).collection('messages');
    // const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages, loading] = useCollectionData(firestore.collection('groups').doc(currentGroup).collection('messages').orderBy('createdAt').limit(25), {idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();

        const { uid, photoURL, displayName } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            displayName,
            photoURL
        });

        setFormValue('');
    }

    return (
        <>
            <Row noGutters>
                <Col lg={10}>
                    <>
                    <p>{name} (0/{limit})</p>
                    </>
                </Col>
                <Col lg={2}>
                    <SignOutBtn />
                </Col>
            </Row>
            
            <div className="chat-box">
                {loading ?    
                <div className="chat-loader">             
                <Spinner animation="border" role="status" className="chat-loader-spinner">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </div> : 
                <>
                    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={auth}/>)}
                </>
                }
            
            </div>
            <Form onSubmit={sendMessage}>
                <Row noGutters>
                    <Col lg={10}>
                        <Form.Control 
                        className="message-field" 
                        placeholder="Enter Your Message..."
                        type="text" 
                        value={formValue} 
                        onChange={(e) => setFormValue(e.target.value)}/>
                    </Col>
                    <Col lg={2}>
                        <Button className="send-btn" type="submit" block>Send</Button>
                    </Col>
                </Row>
                
                
            </Form>

        </>
    );
}

export default ChatRoom;