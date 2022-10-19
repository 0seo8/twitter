import { dbService } from 'fbase'
import React, { useState } from 'react'

const Nweets = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newNWeet, setNewNweet] = useState(nweetObj.text)
  //delete
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?')
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete()
    }
  }
  const toggleEditing = () => {
    setEditing((prev) => !prev)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNWeet,
    })
    setEditing(false)
  }
  const onChange = (e) => {
    const { value } = e.target
    setNewNweet(value)
  }
  return (
    <div key={nweetObj.id}>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              value={newNWeet}
              required
              placeholder="Edit your nweet"
            />
            <input type="submit" value="Update Nwet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Nweets
