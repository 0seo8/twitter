import { dbService } from 'fbase'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Nweets from 'components/Nweets'
import NweetFactory from 'components/NweetFactory'

function Home({ userObj }) {
  const [nweets, setNweets] = useState([])

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
  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div
        style={{ marginTop: 30 }}
        className="flex w-full justify-center items-center"
      >
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
