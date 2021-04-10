import React from 'react';

function ChatMessage (props) {

    const { text, uid, photoURL, createdAt } = props.message;
    const auth = props.auth;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';

    return (
        <div className={`${messageClass}Message`}>
            <p>{text}</p>
        </div>
    );
}

export default ChatMessage;