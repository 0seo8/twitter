import { dbService, storageService } from 'fbase'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const Nweets = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newNWeet, setNewNweet] = useState(nweetObj.text)
  //delete
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?')
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete()
      //refFromURL을 통해 이미지 파일의 url을 가지고옴
      await storageService.refFromURL(nweetObj.attachmentUrl).delete()
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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              onChange={onChange}
              value={newNWeet}
              required
              placeholder="Edit your nweet"
              className="formInput"
            />
            <input type="submit" value="Update Nwet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} alt="이미지 파일" />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Nweets
