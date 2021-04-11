import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import '../css/Groups.css';

function Groups(props) {

    const {id, name, limit} = props.group;
    const auth = props.auth;

    const joinGroupChat = async(e) => {
        e.preventDefault();
        props.setGroup(id);
    }

    return(
        <div className="group-listing">
            <a>{name}</a>
            <Button onClick={(e) => joinGroupChat(e)}>Join Group Chat</Button>
        </div>
    );
}

export default Groups;