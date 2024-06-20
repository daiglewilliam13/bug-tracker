'use client';

import '@/app/styles/main.css';
import { BugInput } from "@/components/bugInput";
import { BugList } from "@/components/BugList";
import { getToken, findAll, blankBug } from "@/app/dashboard/utils";
import { useState, useEffect } from 'react';

export default function Page() {
  const [bugs, setBugs] = useState();
  const [addBug, setAddBug] = useState(false);
  const [user, setUser] = useState();
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState();

  let editOptions = {
    createNew: true,
    show: addBug
  }

  let key = process.env.NEXT_PUBLIC_DB_KEY;
  let tokenUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleUserChange = (event: any) => {
    setSelectedUser(event.target.value)
    let newUser = allUsers.find((obj: any) => obj._id == event.target.value)
    setUser(newUser)
  }

  const getUsers = async (accessToken: string) => {
    let foundUsers = findAll(accessToken, 'users')
      .then((response) => {
        return response.documents
      })
    return foundUsers;
  }
  useEffect(() => {

    getToken(tokenUrl, key).then((response) => {
      let token = response.access_token;
      getUsers(token).then((response) => {
        let foundUsers = response;
        setAllUsers(foundUsers)
        setUser(foundUsers[0])

        findAll(token, 'bugs').then((response) => {
          let foundBugs = response.documents
          setBugs(foundBugs);
          setIsLoading(false)
          })
        })
      })
  }, [isLoading])
  if (isLoading == true) {
    return (
      <div>
        Loading...
      </div>
    );
  } else {
    return (
      <div>
        <div>
          Welcome. Select User: <select value={selectedUser} onChange={handleUserChange}>
            {allUsers.map((user: any) => (
              <option key={user._id} value={user._id}>
                {user.username}: {user._id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <BugInput bugToEdit={blankBug} editOptions={editOptions} currentUser={user} allUsers={allUsers}/>
        </div>
        <div>
          <BugList currentUser={user} list={bugs} allUsers={allUsers}/>
        </div>
      </div>
    );
  }
}