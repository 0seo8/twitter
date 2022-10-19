import { dbService } from 'fbase'
import React, { useState } from 'react'

function Home() {
  const [nweet, setNweet] = useState('')
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
    </div>
  )
}

export default Home
