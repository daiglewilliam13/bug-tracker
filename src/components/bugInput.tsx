'use client'

import { useState, useEffect } from 'react';

const options = ['In Progress', 'Unassigned', 'Resolved'];
const creators = ["USER_1", "USER_2", "USER_3"];

const blankBug = {
    
    created: "05/25/2024",
    description: `New bug, details are TBD`,
    assignedTo: creators[Math.floor(Math.random() * creators.length)],
    status: "In Progress",
    comments: "This bug needs investigation.",
    pullReqNum: Math.floor(Math.random() * 100000) + 10000,
    resolvedDate: "in progress",
    createdBy: "ADMIN_1",
    _id: ""
} 
export function BugInput({bugToEdit, editOptions}) {
    const [bug, setBug] = useState(blankBug);
    const [selectedValue, setSelectedValue] = useState(options[0])
    const handleChange = (event: any) => {
        console.log(event.target)
        const { name, value } = event.target;
        setBug({ ...bug, [name]: value });
        console.log(bug)
    };
    console.log(editOptions)
    const handleDropChange = (event:any) => {
        setSelectedValue(event.target.value);
    };
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
                <label htmlFor="created">Created:</label>
                <input type="text" name="created" id="created" value={bug.created} onChange={handleChange} disabled />

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
                <input type="text" name="assignedTo" id="assignedTo" value={bug.assignedTo} onChange={handleChange} />

                <label htmlFor="comments">Comments:</label>
                <input type="text" name="comments" id="comments" value={bug.comments} onChange={handleChange} />

                <label htmlFor="pullReqNum">Pull Req#:</label>
                <input type="text" name="pullReqNum" id="pullReqNum" value={bug.pullReqNum} onChange={handleChange} />

                <label htmlFor="createdBy">Created By:</label>
                <input type="text" name="createdBy" id="createdBy" value={bug.createdBy} onChange={handleChange} disabled />

                <button type="submit">Submit</button>
            </form>
        </div>
    ); 
} else {
    return(
        <div></div>
    );
}
}