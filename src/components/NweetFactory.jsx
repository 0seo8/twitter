import { dbService, storageService } from 'fbase'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

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
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img
            src={attachment}
            width="50"
            height="50"
            alt="이미지 파일 미리보기"
          />
          <button onClick={onClearAttachmentClick}>clear</button>
        </div>
      )}
    </form>
  )
}

export default NweetFactory
