'use client';

import { useEffect, useState } from 'react';
import { BugInput } from './bugInput';



export function BugCard({ bug, currentUser, allUsers }: any) {
    const [edit, setEdit] = useState(false);
    let editOptions = {
        createNew: false,
        show: edit,
    }
    console.log(bug)
    const clickEditButton = (event:any) => {
        setEdit(edit=>!edit);
    }
    let assignedUsername = allUsers.find(user => user._id == bug.assignedTo).username;
    let createdByUsername = allUsers.find(user => user._id == bug.createdBy).username;
    useEffect(()=>{

    },[edit])
    return (
        <div >
            <div>
                <ul className="bug-card">
                    <li>Created: {bug.created}</li>
                    <li>Id: {bug._id}</li>
                    <li>Status: {bug.status}</li>
                    <li>Description: {bug.description}</li>
                    <li>Assigned To: {assignedUsername}</li>
                    <li>Comments: {bug.comments}</li>
                    <li>Pull Req Number: #{bug.pullReqNum}</li>
                    <li>Created By: {createdByUsername}</li>
                <button onClick={clickEditButton}>Click To Edit</button>
                </ul>
            </div>
            <div>
                <BugInput bugToEdit={bug} editOptions={editOptions} currentUser={currentUser} allUsers={allUsers}/>
            </div>
        </div>
    );
}
