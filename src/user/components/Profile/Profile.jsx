import React, { useContext } from 'react'
import UserContext from '../../../context/UserInfoProvider';

const Profile = () => {
    const [userInfo] = useContext(UserContext);
    console.log(userInfo)
  return (
    <>
    {userInfo ? (
        <h1 className = "py-5">Hello {userInfo.fullName}</h1>
      ) : (
        <h1 className = "py-5">Hello</h1>
      )}
    </>
    
  )
}

export default Profile