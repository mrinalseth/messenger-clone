import { Button, Input, FormControl } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import Message from './components/Message'
import db from './firebase' 
import firebase from 'firebase/compat'
import './App.css'

function App() {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(prompt('enter ur username'))
  }, [])
  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snap) => {
      setMessages(snap.docs.map((doc) => {
          return (doc.data())
      }))
    })
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection('messages').add({
      text: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  return (
    <div className='main'>
    <div className="input-form">
        <form>
          <FormControl className='app-formControl'>
            <Input
            placeholder='Enter a message'
            className='input-field'
            value = {input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button disabled={!input} type='submit' onClick={sendMessage} variant='outlined' color='primary'>Send!</Button>
          </FormControl>
        </form>
      </div>
      <div className='display-msg'>
      {messages.map((msg) => {
        return (
          <Message
            username={username}
            message={msg}
          />
        )
      })}
      </div>
    </div>
  );
}

export default App;
