export async function getToken(url:any, apiKey:any) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: apiKey,
      }),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log(await response.json())
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error logging in:', error);
      throw error; // Re-throw for handling in the calling code
    }
  }

  export async function insertOne(addOrUpdate: string, accessToken:any, collName: string, bugToSubmit:any) {
    let url, body;
    if(addOrUpdate == "add") {
      url = process.env.NEXT_PUBLIC_INSERT_URL || "nothing";
      body = JSON.stringify({
        dataSource: "social-media-clone",
        database: "bug-tracker",
        collection: collName,
        document: bugToSubmit,
      });
    } else {
      url = process.env.NEXT_PUBLIC_UPDATE_URL || "nothing";
      body = JSON.stringify({
        dataSource: "social-media-clone",
        database: "bug-tracker",
        collection: collName,
        filter: {
          _id: { $oid: addOrUpdate}
        },
        update: {
          $set: bugToSubmit
        }
      });
    } 

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log(response.json())
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching document:', error);
      throw error; // Re-throw for handling in the calling code
    }
  }


  export async function findAll(accessToken:any, collName:string) {
    const url = process.env.NEXT_PUBLIC_FINDALL_URL || "nothing";
  
    const body = JSON.stringify({
      dataSource: "social-media-clone",
      database: "bug-tracker",
      collection: collName,
      filter: {},
    });
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body,
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log(response.json())
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching document:', error);
      throw error; // Re-throw for handling in the calling code
    }
  }

export function generateBugData(numBugs: number) {
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
        resolvedDate: "in progress",
        createdBy: creators[Math.floor(Math.random() * creators.length)],
      });
    }
  
    return bugs;
  }

  
  export const blankBug = {
    created: "",
    description: `New bug, details are TBD`,
    createdBy: {},
    status: "In Progress",
    comments: "This bug needs investigation.",
    pullReqNum: 0,
    resolvedDate: "in progress",
    assignedTo: {},
} 