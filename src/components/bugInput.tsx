'use client'

import {useState} from 'react';

let initialBug = {
    created: "05/25/2024",
    description: "new bug reported, doesn't work",
    assignedTo: "USER_2",
    status: "Resolved",
    comments: "this is a hard bug",
    pullReqNum: undefined,
    id: undefined,
    resolvedBy: "in progress",
    resolvedDate: "in progress",
    createdBy: "ADMIN_1"
  }
export function BugInput() {
    const [bug, setBug] = useState({...initialBug});
  
    const handleChange = (event:any) => {
        console.log(event.target)
      const { name, value } = event.target;
      setBug({ ...bug, [name]: value });
      console.log(bug)
    };
  
    const
    return (
    <div className='bug-card'>
      <form>
        <label htmlFor="created">Created:</label>
        <input type="text" name="created" id="created" value={bug.created} onChange={handleChange} disabled /> 

        <label htmlFor="id">Id:</label>
        <input type="text" name="id" id="id" value={bug.id} onChange={handleChange} disabled /> 

        <label htmlFor="status">Status:</label>
        <input type="text" name="status" id="status" value={bug.status} onChange={handleChange} />
        
        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" value={bug.description} onChange={handleChange} />
        
        <label htmlFor="assignedTo">Assigned To:</label>
        <input type="text" name="assignedTo" id="assignedTo" value={bug.assignedTo} onChange={handleChange} />
        
        <label htmlFor="comments">Comments:</label>
        <input type="text" name="comments" id="comments" value={bug.comments} onChange={handleChange} />
        
        <label htmlFor="pullReqNum">Pull Req#:</label>
        <input type="text" name="pullReqNum" id="pullReqNum" value={bug.pullReqNum} onChange={handleChange} />
        
        <label htmlFor="resolvedBy">Resolved By:</label>
        <input type="text" name="resolvedBy" id="resolvedBy" value={bug.resolvedBy} onChange={handleChange} />
        
        <label htmlFor="createdBy">Created By:</label>
        <input type="text" name="createdBy" id="createdBy" value={bug.createdBy} onChange={handleChange} disabled />
        
        <button type="submit">Submit</button>
      </form>
    </div>
    );
  }