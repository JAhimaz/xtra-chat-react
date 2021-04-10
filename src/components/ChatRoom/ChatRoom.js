import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { SignOutBtn } from '../../App';

import ChatMessage from './ChatMessage';

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

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('');
    }

    return (
        <>
            <SignOutBtn />
            <div>{messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={auth}/>)}</div>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <Button type="submit">Send</Button>
            </form>
        </>
    );
}

export default ChatRoom;