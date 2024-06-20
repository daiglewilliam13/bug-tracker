'use client';

import '@/app/styles/main.css';
import { BugCard } from "@/components/bugCard";
import { BugInput } from "@/components/bugInput";
import { getToken, findAll, blankBug } from "@/app/dashboard/utils";
import { useState, useEffect } from 'react';

export function BugList({currentUser, list}:any) {
  const [filter, setFilter] = useState('assigned');
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

  let adminStatus = currentUser.isAdmin;
  let formattedBugList = createBugList(list);
useEffect(()=>{
  let buttonList = Array.from(document.getElementsByClassName('filter-button'));
  buttonList.forEach((button)=>{
    if(filter==button.id) {
      button.classList.add('highlight')
    } else {
      button.classList.remove('highlight');
    }
  })
},[filter, list, currentUser])
if (list){
  return (
    <div>
        <div>
          { adminStatus ? <button id='all' className={'filter-button'} onClick={()=> setFilter('all')}>All Bugs</button> : <div></div> }
          <button id='assigned' className={'filter-button'} onClick={()=> setFilter('assigned')}>Assigned Bugs</button>
          <button id='resolved'className={'filter-button'} onClick={()=> setFilter('resolved')}>Resolved Bugs</button>
          { adminStatus ? <button id='add' className={'filter-button'} onClick={changeEditStatus}>Add Bug</button> : <div></div> }
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