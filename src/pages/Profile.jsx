import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

function Profile() {
  const [user, setUser] = useState(null)

  const auth = getAuth()
  useEffect(() => {
    console.log(auth.currentUser)
    setUser(auth.currentUser)
  }, []);

  return user ? <h1>{user.email}</h1> : <h1>Please Sign UP/IN</h1>
}

export default Profile;
