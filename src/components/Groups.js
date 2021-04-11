import React, { useEffect, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import '../css/Groups.css';

import GroupItem from './GroupItem';

function Groups(props) {

    const firebase = props.firebase;
    const firestore = props.firestore;
    const auth = props.auth;

    const [groups] = useCollectionData(firestore.collection('groups').orderBy('name').limit(25), {idField: 'id'});

    return(
        <>
            <div className="group-grid">{groups && groups.map(group => <GroupItem key={group.id} group={group} auth={auth} setGroup={props.setGroupFunction}/>)}</div>
        </>
    );
}

export default Groups;