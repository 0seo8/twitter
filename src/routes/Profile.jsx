import React, { useEffect, useState } from 'react'
import { authService, dbService } from 'fbase'
import { useNavigate } from 'react-router-dom'

function Profile({ userObj, refreshUser }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const navigate = useNavigate()
  const onLogOutClick = () => {
    authService.signOut()
    navigate('/')
  }
  const onChange = (e) => {
    const { value } = e.target
    setNewDisplayName(value)
  }
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection('nweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get()

    console.log(nweets.docs.map((doc) => doc.data()))
  }
  useEffect(() => {
    getMyNweets()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      })
      refreshUser()
    }
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="update profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span onClick={onLogOutClick} className="formBtn cancelBtn logOut">
        Log Out
      </span>
    </div>
  )
}

export default Profile
