'use client';

import { useEffect, useState } from 'react';
import { BugInput } from './bugInput';



export function BugCard({ bug, currentUser, allUsers }: any) {
    const [edit, setEdit] = useState(false);
    let editOptions = {
        createNew: false,
        show: edit,
    }
    const clickEditButton = (event:any) => {
        setEdit(edit=>!edit);
    }
    let imgName;
    switch (bug.status) {
        case 'Resolved': 
         imgName="images/greencheck.svg";
         break;
        case 'In Progress':
         imgName="images/yellowalert.png";
         break;
        case 'Unassigned':
         imgName="images/redx.svg";
        default: 
        imgName="images/redx.svg";  
    }
    let assignedUsername = allUsers.find(user => user._id == bug.assignedTo).username;
    let createdByUsername = allUsers.find(user => user._id == bug.createdBy).username;
    useEffect(()=>{

    },[edit])
    return (
        <div >
                <ul className="bug-card">
                    <div className="status-image">
                <img src={imgName}  alt="" />
                    </div>
                <br />
                    <li>Id: {bug._id}</li>
                    <li>Created: {bug.created}</li>
                    <li>Status: {bug.status}</li>
                    <li>Description: {bug.description}</li>
                    <li>Assigned To: {assignedUsername}</li>
                    <li>Comments: {bug.comments}</li>
                    <li>Pull Req Number: #{bug.pullReqNum}</li>
                    <li>Created By: {createdByUsername}</li>
                <button onClick={clickEditButton}>Click To Edit</button>
                </ul>
                <BugInput bugToEdit={bug} editOptions={editOptions} currentUser={currentUser} allUsers={allUsers} clickEditButton={clickEditButton}/>
        </div>
    );
}
