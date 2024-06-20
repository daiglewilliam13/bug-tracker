'use client';

import '@/app/styles/main.css';
import { BugCard } from "@/components/bugCard";
import { BugInput } from "@/components/bugInput";
import { getToken, findAll, blankBug } from "@/app/dashboard/utils";
import { useState, useEffect } from 'react';

export function BugList({currentUser, list}:any) {
  const [filter, setFilter] = useState('all');
  const [addBug, setAddBug] = useState(false);

  let editOptions = {
    createNew: true,
    show: addBug
  }

  const createBugList = (objArr:any) => {
    let componentList = objArr.map((bug:any) => {
      if (filter=='all') {
        return <BugCard bug={bug} key={bug._id} />
      } else if (filter=='assigned' && bug.assignedTo==currentUser._id){
        return <BugCard bug={bug} key={bug._id} />
      } else if (filter=='resolved' && bug.status=='Resolved'){
        return <BugCard bug={bug} key={bug._id} />;
      } else {
        return
      }
    })
    return componentList
  }
  const changeEditStatus = () => {
    setAddBug(addBug => !addBug);
  }
  let formattedBugList = createBugList(list);
useEffect(()=>{
  

},[filter, list])
if (list){
  return (
    <div>
        <div>
          { currentUser.isAdmin ? <button onClick={()=> setFilter('all')}>All Bugs</button> : <div></div> }
          <button onClick={()=> setFilter('assigned')}>Assigned Bugs</button>
          <button onClick={()=> setFilter('resolved')}>Resolved Bugs</button>
          {currentUser.isAdmin==false? <button onClick={changeEditStatus}>Add Bug</button> : <div></div> }
        </div>
        <div>
          <BugInput bugToEdit={blankBug} editOptions={editOptions} />
        </div>
        <div>
          {formattedBugList}
        </div>
      </div>
  ); 
} else {
  return null;
}
}