'use client'

import { useState, useEffect } from 'react';
import { blankBug, insertOne, deleteOne } from '@/app/dashboard/utils';
const options = ['In Progress', 'Unassigned', 'Resolved'];

export function BugInput({bugToEdit, editOptions, currentUser, allUsers, clickEditButton}:any) {
    const [bug, setBug] = useState(blankBug);
    const [selectedValue, setSelectedValue] = useState(options[0])
    const [assignedToUser, setAssignedToUser] = useState(allUsers[0]._id)
    const [isLoading, setIsLoading] = useState(false);

    let token = sessionStorage.getItem('token');
    let headerStr;
    if (editOptions?.createNew == true) {
        headerStr = "Add new bug to database";
    } else {
        headerStr = "Edit Bug - id:" + bugToEdit._id;
    }
    const handleDelete = async (event: any) =>{
        event.preventDefault();
        let response = await deleteOne(bug._id, token, "bugs");
        console.log(await response)
        window.location.reload();
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        let bugToSubmit=bug;
        if (editOptions?.createNew==true) {

            bugToSubmit.assignedTo={ "$oid": assignedToUser};
            bugToSubmit.createdBy={ "$oid": currentUser._id};
            bugToSubmit.created=dateString;

            insertOne("add", token, "bugs", bugToSubmit).then((response)=>{
                console.log("promise result: ", response);
                setIsLoading(false);
                window.location.reload();
            });

        } else if (editOptions?.createNew==false) {
            console.log("assignedTo: ", assignedToUser)
            let updatesToSubmit = {
                assignedTo : {"$oid":assignedToUser},
                description : bug.description,
                comments: bug.comments,
                pullReqNum: bug.pullReqNum,
                status: selectedValue,
            }
            insertOne(bugToEdit._id, token, "bugs", updatesToSubmit).then((response)=>{
                console.log("promise result: ", response);
                setIsLoading(false);
                window.location.reload();
            });
        }
    }

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setBug({ ...bug, [name]: value });
    };
    const handleDropChange = (event:any) => {
        setSelectedValue(event.target.value);
    };

    const handleUserChange = (event:any) =>{
        setAssignedToUser(event.target.value)
    }

    let today = new Date(Date.now());

    let dateString = today.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'numeric',
        year: 'numeric',
      })

    useEffect(()=>{
        if (editOptions?.createNew==true) {
            setBug(blankBug)
        } else {
            setBug(bugToEdit)
            setSelectedValue(bugToEdit.status)
            setAssignedToUser(bugToEdit.assignedTo);
        }
    },[isLoading])

    if(editOptions.show == true){

    return (
        <div>

        <div className='modal-overlay'></div>
        <div className='input-modal'>
            <div className="content-wrapper">

            <div className="header">{headerStr}</div>
            <form>
                <label htmlFor="created">Created On:</label>
                <input type="text" name="created" id="created" value={dateString} onChange={handleChange} disabled />

                <label htmlFor="id">Id:</label>
                <input placeholder="will be assigned when saved" type="text" name="id" id="id" value={bug._id} onChange={handleChange} disabled />

                <label htmlFor="status">Status:</label>

                <select value={selectedValue} onChange={handleDropChange}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <label htmlFor="description">Description:</label>
                <textarea name="description" id="description" value={bug.description} onChange={handleChange} />

                <label htmlFor="assignedTo">Assigned To:</label>

                {
                    currentUser.isAdmin ==true ? 
                    <select value={assignedToUser} onChange={handleUserChange}>
                {allUsers.map((user:any) => (
                    <option key={user._id} value={user._id}>
                        {user.username}
                    </option>
                ))}
            </select>
                : <input type="text" name="assignedTo" id="assignedTo" value={bug.assignedTo} onChange={handleChange} disabled/>  
            }

                <label htmlFor="comments">Comments:</label>
                <input type="text" name="comments" id="comments" value={bug.comments} onChange={handleChange} />

                <label htmlFor="pullReqNum">Pull Req#:</label>
                <input type="text" name="pullReqNum" id="pullReqNum" value={bug.pullReqNum} onChange={handleChange} />

                <label htmlFor="createdBy">Created By:</label>
                <input type="text" name="createdBy" id="createdBy" value={currentUser._id} onChange={handleChange} disabled />

            </form>
            {isLoading == true? <button disabled>Saving...</button> : <button onClick={handleSubmit}>Save</button>} 
            {editOptions.createNew == true? <div></div> : <button onClick={handleDelete}>Delete</button> }
            <button onClick={clickEditButton}>DISCARD CHANGES</button>
            </div>
        </div>
        </div>
    ); 

} else {
    return(
        <div></div>
    );
}
}