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
  
  export async function findAll(accessToken:any) {
    const url = process.env.NEXT_PUBLIC_FINDALL_URL || "nothing";
  
    const body = JSON.stringify({
      dataSource: "social-media-clone",
      database: "bug-tracker",
      collection: "bugs",
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