import { dbService } from 'fbase'
import React, { useState } from 'react'
import { useEffect } from 'react'

function Home() {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])

  //db가져오기
  const getNweets = async () => {
    const dbNnweets = await dbService.collection('nweets').get()
    //querysnapShot을 리턴하기 때문에 아래와 같이 처리를 해줘야합니다.
    dbNnweets.forEach((document) => {
      //객체로 만듦
      const nweetObject = {
        ...document.data(),
        id: document.id,
      }
      setNweets((prev) => [nweetObject, ...prev])
    })
  }

  useEffect(() => {
    getNweets()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    //콜렉션에 data추가
    await dbService.collection('nweets').add({
      //collection의 key:value형태로
      nweet,
      createdAt: Date.now(),
    })
    setNweet('')
  }

  const onChange = (e) => {
    const { value } = e.target
    setNweet(value)
  }

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
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
