'use client'

import { useState, useEffect } from 'react';
import { blankBug, insertOne, deleteOne } from '@/app/dashboard/utils';
const options = ['In Progress', 'Unassigned', 'Resolved'];

export function BugInput({bugToEdit, editOptions, currentUser, allUsers}:any) {
    const [bug, setBug] = useState(blankBug);
    const [selectedValue, setSelectedValue] = useState(options[0])
    const [assignedToUser, setAssignedToUser] = useState(allUsers[0]._id)
    const [isLoading, setIsLoading] = useState(false);

    let token = sessionStorage.getItem('token');

    const handleDelete = async (event: any) =>{
        event.preventDefault();
        let response = await deleteOne(bug._id, token, "bugs");
        console.log(await response)
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
            });

        } else if (editOptions?.createNew==false) {

            let updatesToSubmit = {
                assignedTo : assignedToUser._id,
                description : bug.description,
                comments: bug.comments,
                pullReqNum: bug.pullReqNum,
                status: selectedValue,
            }

            insertOne(bugToEdit._id, token, "bugs", updatesToSubmit).then((response)=>{
                console.log("promise result: ", response);
                setIsLoading(false);
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
            console.log(blankBug)
        } else {
            setBug(bugToEdit)
            setSelectedValue(bugToEdit.status)
            setAssignedToUser(allUsers.find(user => user._id == bugToEdit.assignedTo));
            console.log(bugToEdit)
        }
    },[isLoading])

    if(editOptions.show == true){

    return (
        <div className='bug-card'>
            <form>
                <label htmlFor="created">Created On:</label>
                <input type="text" name="created" id="created" value={dateString} onChange={handleChange} disabled />

                <label htmlFor="id">Id:</label>
                <input type="text" name="id" id="id" value={bug._id} onChange={handleChange} disabled />

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
                <select value={assignedToUser._id} onChange={handleUserChange}>
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

                {isLoading == true? <button disabled>Saving...</button> : <button onClick={handleSubmit}>Save</button>}
            </form>
            {editOptions.createNew == true? <div></div> : <button onClick={handleDelete}>Delete</button> }
        </div>
    ); 

} else {
    return(
        <div></div>
    );
}
}