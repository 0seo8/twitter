import { dbService } from 'fbase'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Nweets from 'components/Nweets'

function Home({ userObj }) {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])
  const [attachment, setAttachment] = useState()

  useEffect(() => {
    //실시간으로 변화를 알려줌 => 리렌더링을 줄여줍니다.
    dbService.collection('nweets').onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setNweets(nweetArray)
    })
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    //콜렉션에 data추가
    await dbService.collection('nweets').add({
      //collection의 key:value형태로
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    })
    setNweet('')
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
    }
    reader.readAsDataURL(theFile)
  }

  const onClearAttachmentClick = () => setAttachment(null)

  return (
    <div>
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
      <div>
        {nweets.map((nweet) => (
          <Nweets
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
