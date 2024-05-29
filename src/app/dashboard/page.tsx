'use client';

let dummyData = [{
  created: "05/25/2024",
  description: "new bug reported, doesn't work",
  assignedTo: "USER_1",
  status: "In Progress",
  comments: "this is a hard bug",
  pullReqNum: 22345,
  id: 23354423,
  resolvedBy: "in progress",
  resolvedDate: "in progress",
  createdBy: "ADMIN_1"
},
{
  created: "05/25/2024",
  description: "new bug reported, doesn't work",
  assignedTo: "USER_1",
  status: "In Progress",
  comments: "this is a hard bug",
  pullReqNum: 22345,
  id: 23342323,
  resolvedBy: "in progress",
  resolvedDate: "in progress",
  createdBy: "ADMIN_1"
},
{
  created: "05/25/2024",
  description: "new bug reported, doesn't work",
  assignedTo: "USER_1",
  status: "In Progress",
  comments: "this is a hard bug",
  pullReqNum: 22345,
  id: 23342123,
  resolvedBy: "in progress",
  resolvedDate: "in progress",
  createdBy: "ADMIN_1"
},
{
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
}]


let currentUser = {
  id: 12345,
  userName: 'USER_1'
}


import '@/app/styles/main.css';
import { BugCard } from "@/components/bugCard";
import { useState, useEffect } from 'react';


export default function Page() {
  const [filter, setFilter] = useState('all');
  const changeFilter = (filter:string) => {
      setFilter(filter);
  }
  let map = [];
  let mappedBugs = dummyData.map((bug) => {
    if (filter=='all') {
      return <BugCard bug={bug} key={bug.id} />
    } else if (filter=='assigned' && bug.assignedTo==currentUser.userName){
      return <BugCard bug={bug} key={bug.id} />
    } else if (filter=='resolved' && bug.status=='Resolved'){
      return <BugCard bug={bug} key={bug.id} />;
    } else {
      return
    }
  })
  return (
    <>
      <div>
        <div>
          <h1>Welcome, Admin</h1>
        </div>
        <div>
          <button onClick={()=> setFilter('all')}>All Bugs</button>
          <button onClick={()=> setFilter('assigned')}>Assigned Bugs</button>
          <button onClick={()=> setFilter('resolved')}>Resolved Bugs</button>
        </div>
        <div>
          {mappedBugs}
        </div>
      </div>
    </>
  );
}