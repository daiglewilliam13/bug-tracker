'use client'

import { useState, useEffect } from 'react';
import { blankBug } from '@/app/dashboard/utils';
const options = ['In Progress', 'Unassigned', 'Resolved'];

export function BugInput({bugToEdit, editOptions, currentUser, allUsers}:any) {
    const [bug, setBug] = useState(blankBug);
    const [selectedValue, setSelectedValue] = useState(options[0])
    const handleChange = (event: any) => {
        console.log(event.target)
        const { name, value } = event.target;
        setBug({ ...bug, [name]: value });
        console.log(bug)
    };
    const handleDropChange = (event:any) => {
        setSelectedValue(event.target.value);
    };
    let today = new Date();
    let dateString = today.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    let usersArr = allUsers
    console.log(allUsers)
    useEffect(()=>{
        if (editOptions?.createNew==true) {
            setBug(blankBug)
        } else {
            setBug(bugToEdit)
        }
    },[])
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
                <select value={selectedValue} onChange={handleDropChange}>
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
                <input type="text" name="createdBy" id="createdBy" value={bug.createdBy} onChange={handleChange} disabled />

                <button type="submit">Save</button>
            </form>
        </div>
    ); 
} else {
    return(
        <div></div>
    );
}
}