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
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="update profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}

export default Profile
