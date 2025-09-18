import classes from './message.module.css'

interface MessageProps {
  text: string
  userName: string
  userNameColor: string
}

const Message = ({ text, userName, userNameColor }: MessageProps) => {
  return (
    <div className={classes.messageContainer}>
      <div className={classes.userName} style={{ color: userNameColor }}>
        {userName}
      </div>
      <div className={classes.text}>{text}</div>
    </div>
  )
}

export default Message
