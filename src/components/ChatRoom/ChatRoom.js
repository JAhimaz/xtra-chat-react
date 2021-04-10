import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { SignOutBtn } from '../../App';

import ChatMessage from './ChatMessage';
import '../../css/Chat.css';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';

function ChatRoom(props) {

    const firestore = props.firestore;
    const auth = props.auth;

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();

        console.log(auth.currentUser);

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
            <SignOutBtn />
            <div className="chat-box">{messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={auth}/>)}</div>

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