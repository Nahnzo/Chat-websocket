import { Message } from 'shared/ui'
import { MessageData } from 'entities/WebSocket/model/types'
import classes from './eventChat.module.css'

interface EventsChatProps {
  messages: MessageData[]
}

const EventsChat = ({ messages }: EventsChatProps) => {
  return (
    <>
      <div className={classes.quantityUsers}>
        {messages.length > 0 ? messages[messages.length - 1].quantityUsers : 0} online
      </div>
      <div className={classes.messagesContainer}>
        {messages.map((msg, idx) => {
          if (msg.type === 'userJoined') {
            return (
              <div key={idx} className={classes.userAction} style={{ color: msg.userNameColor }}>
                {msg.user}
                <span> has joined the room</span>
              </div>
            )
          } else if (msg.type === 'userLeft') {
            return (
              <div key={idx} className={classes.userAction}>
                {msg.user} <span> has left the room</span>
              </div>
            )
          } else if (msg.type === 'newMessage') {
            return (
              <Message
                text={msg.message}
                userName={msg.user}
                key={idx}
                userNameColor={msg.userNameColor}
              />
            )
          }
          return null
        })}
      </div>
    </>
  )
}

export default EventsChat
