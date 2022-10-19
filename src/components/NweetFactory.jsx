import { dbService, storageService } from 'fbase'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [attachment, setAttachment] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    let attachmentUrl = ''
    if (attachment !== '') {
      //userId로 된 폴더 생성
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`)
      const response = await attachmentRef.putString(attachment, 'data_url')
      attachmentUrl = await response.ref.getDownloadURL()
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    }

    await dbService.collection('nweets').add(nweetObj)
    setNweet('')
    setAttachment('')
  }

  const onChange = (e) => {
    const { value } = e.target
    setNweet(value)
  }

  const onFileChange = (e) => {
    const { files } = e.target
    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget
      setAttachment(result)
      console.log(result)
    }
    reader.readAsDataURL(theFile)
  }

  const onClearAttachmentClick = () => setAttachment(null)

  return (
    <div>
      <form onSubmit={onSubmit} className="factoryForm max-w-xs">
        <div className="factoryInput__container">
          <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            className="factoryInput__input"
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
          id="attach-file"
        />
        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              alt="이미지 파일 미리보기"
              style={{
                backgroundImage: attachment,
              }}
            />
            <div
              className="factoryForm__clear"
              onClick={onClearAttachmentClick}
            >
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default NweetFactory
