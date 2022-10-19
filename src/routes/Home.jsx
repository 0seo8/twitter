import { dbService } from 'fbase'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Nweets from 'components/Nweets'

function Home({ userObj }) {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])

  //db가져오기 => 아래 주석은 오래된 내용
  // const getNweets = async () => {
  //   const dbNnweets = await dbService.collection('nweets').get()
  //   //querysnapShot을 리턴하기 때문에 아래와 같이 처리를 해줘야합니다.
  //   dbNnweets.forEach((document) => {
  //     //객체로 만듦
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     }
  //     setNweets((prev) => [nweetObject, ...prev])
  //   })
  // }

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
