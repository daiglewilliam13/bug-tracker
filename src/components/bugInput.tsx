'use client'

import {useState} from 'react';

let initialBug = {
    created: "05/25/2024",
    description: "new bug reported, doesn't work",
    assignedTo: "USER_2",
    status: "Resolved",
    comments: "this is a hard bug",
    pullReqNum: 22345,
    id: 2334423,
    resolvedBy: "in progress",
    resolvedDate: "in progress",
    createdBy: "ADMIN_1"
  }
export function BugInput() {
    const [bug, setBug] = useState({initialBug});
  
    const handleChange = (event:any) => {
        console.log(event.target)
      const { name, value } = event.target.id;
      setBug({ ...bug, [name]: value });
      console.log(bug)
    };
  
  
    return (
    <div className='bug-card'>
      <form>
        <label htmlFor="created">Created:</label>
        <input type="text" name="created" id="created" value={initialBug.created} onChange={handleChange} disabled /> 

        <label htmlFor="id">Id:</label>
        <input type="text" name="id" id="id" value={initialBug.id} onChange={handleChange} disabled /> 

        <label htmlFor="status">Status:</label>
        <input type="text" name="status" id="status" value={initialBug.status} onChange={handleChange} />

        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" value={initialBug.description} onChange={handleChange} />

        <label htmlFor="assignedTo">Assigned To:</label>
        <input type="text" name="assignedTo" id="assignedTo" value={initialBug.assignedTo} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
    );
  }