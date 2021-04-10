import React from 'react';

import '../../css/Message.css';

function ChatMessage (props) {

    const { text, uid, displayName, photoURL, createdAt } = props.message;
    const auth = props.auth;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';

    return (
        <div className={`${messageClass}Message`}>
            {createdAt === null ? (
                <>
                {messageClass == 'sent' && (<p className="message-display-name">You</p>) }
                {messageClass == 'recieved' && (<p className="message-display-name">{displayName}</p>) }
                <p>{text}</p>
                <div className="message-date">Sending...</div>
                </>
            ) : (
                <>
                    {messageClass == 'sent' && (<p className="message-display-name">You</p>) }
                    {messageClass == 'recieved' && (<p className="message-display-name">{displayName}</p>) }
                    <p>{text}</p>
                    <p className="message-date">{createdAt.toDate().toLocaleString()}</p>
                </>
            )}
        </div>
    );
}

export default ChatMessage;