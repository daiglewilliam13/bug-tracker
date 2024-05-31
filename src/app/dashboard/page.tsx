'use client';

let currentUser = {
  id: 12345,
  userName: 'USER_1'
}

import '@/app/styles/main.css';
import { BugCard } from "@/components/bugCard";
import { BugInput } from "@/components/bugInput";
import { getToken, findAll, blankBug } from "@/app/dashboard/utils";
import { useState, useEffect } from 'react';

export default function Page() {
  const [filter, setFilter] = useState('all');
  const [bugs, setBugs] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [addBug, setAddBug] = useState(false);
  
  let editOptions = {
    createNew: true,
    show: addBug
  }
  const createBugList = (objArr:any) => {
    let componentList = objArr.map((bug:any) => {
      if (filter=='all') {
        return <BugCard bug={bug} key={bug._id} />
      } else if (filter=='assigned' && bug.assignedTo==currentUser.userName){
        return <BugCard bug={bug} key={bug._id} />
      } else if (filter=='resolved' && bug.status=='Resolved'){
        return <BugCard bug={bug} key={bug._id} />;
      } else {
        return
      }
    })
    return componentList
  }
  

useEffect(()=>{

  getToken(process.env.NEXT_PUBLIC_BASE_URL, process.env.NEXT_PUBLIC_DB_KEY)
  .then((response)=>{
    let token = response.access_token;
  findAll(token)
  .then((response)=>{
    console.log(response.documents)
    let mappedBugs = createBugList(response.documents)
    setBugs(mappedBugs)
    setIsLoading(false)
  })
  });
},[isLoading])
  if (isLoading == true) {
    return (
      <div>
        Loading...
      </div>
    );
  } else {
  console.log(bugs)
  return (
      <div>
        <div>
          <h1>Welcome, {currentUser.userName}</h1>
        </div>
        <div>
          <button onClick={()=> setFilter('all')}>All Bugs</button>
          <button onClick={()=> setFilter('assigned')}>Assigned Bugs</button>
          <button onClick={()=> setFilter('resolved')}>Resolved Bugs</button>
        </div>
        <div>
          {bugs}
        </div>
        <div>
          <BugInput bugToEdit={blankBug} editOptions={editOptions} />
        </div>
      </div>
  ); }
}