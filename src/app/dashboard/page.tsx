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

function generateBugData(numBugs: number) {
  const bugs = [];
  const creators = ["USER_1", "USER_2", "USER_3"];

  for (let i = 0; i < numBugs; i++) {
    bugs.push({
      created: "05/25/2024",
      description: `New bug #${i+1}, details are TBD`,
      assignedTo: creators[Math.floor(Math.random() * creators.length)],
      status: "In Progress",
      comments: "This bug needs investigation.",
      pullReqNum: Math.floor(Math.random() * 100000) + 10000,
      id: Math.floor(Math.random() * 10000000),
      resolvedBy: "in progress",
      resolvedDate: "in progress",
      createdBy: creators[Math.floor(Math.random() * creators.length)],
    });
  }

  return bugs;
}

let fakeBugData = generateBugData(3);





import '@/app/styles/main.css';
import { BugCard } from "@/components/bugCard";
import { BugInput } from "@/components/bugInput";
import { getToken, findAll } from "@/app/dashboard/utils";
import { useState, useEffect } from 'react';
import { AnyPtrRecord } from 'dns';



export default function Page() {
  const [filter, setFilter] = useState('all');
  const [bugs, setBugs] = useState([{}])
  
  let mappedBugs = [];
  mappedBugs = bugs.map((bug:any) => {
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
  
  let userSorted = mappedBugs.sort((a:any,b:any)=>(a.created > b.created ? 1 :-1))


useEffect(()=>{
  getToken(process.env.NEXT_PUBLIC_BASE_URL, process.env.NEXT_PUBLIC_DB_KEY)
  .then((response)=>{
    let token = response.access_token;
  findAll(token)
  .then((response)=>{
    console.log(response.documents)
    setBugs(response.documents)
  })
  });
},[])
  return (
    <>
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
          {mappedBugs}
        </div>
        <div>
          <BugInput bugToEdit={bugs[0]}/>
        </div>
      </div>
    </>
  );
}