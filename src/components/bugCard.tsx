'use client';

import { useEffect, useState } from 'react';
import { BugInput } from './bugInput';



export function BugCard({ bug }: any) {
    const [edit, setEdit] = useState(false);
    let editOptions = {
        createNew: false,
        show: edit,
    }
    const clickEditButton = (event:any) => {
        setEdit(edit=>!edit);
    }
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
                    <li>Assigned To: {bug.assignedTo}</li>
                    <li>Comments: {bug.comments}</li>
                    <li>Pull Req Number: #{bug.pullReqNum}</li>
                    <li>Resolved: {bug.resolvedDate}</li>
                    <li>Created By: {bug.createdBy}</li>
                <button onClick={clickEditButton}>Click To Edit</button>
                </ul>
            </div>
            <div>
                <BugInput bugToEdit={bug} editOptions={editOptions} />
            </div>
        </div>
    );
}
