'use client';

let dummyData = [{
  created: "05/25/2024",
  description: "new bug reported, doesn't work",
  assignedTo: "USER_1",
  status: "In Progress",
  comments: "this is a hard bug",
  pullReqNum: 22345,
  id: 233423,
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
  id: 233423,
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
  id: 233423,
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
  id: 233423,
  resolvedBy: "in progress",
  resolvedDate: "in progress",
  createdBy: "ADMIN_1"
}]


let currentUser = {
  id: 12345,
  userName: 'USER_2'
}


import '@/app/styles/main.css';
import { BugCard } from "@/components/bugCard";
import { useState } from 'react';

let mappedBugs = dummyData.map((bug)=>{return <BugCard bug={bug} key={bug.id}/>})
export default function Page() {
  const [filter, setFilter] = useState('assigned');
  return (
    <>
    <div>
      <div>
        <h1>Welcome, Admin</h1>
      </div>
      <div>
        <button>All Bugs</button>
        <button>Assigned Bugs</button>
        <button>Resolved Bugs</button>
      </div>
      <div>
        {mappedBugs}
      </div>
    </div>
    </>
  );
}