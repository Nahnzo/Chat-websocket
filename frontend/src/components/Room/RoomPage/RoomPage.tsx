import { useParams } from 'react-router-dom'
import classes from './roomPage.module.css'
import WebSocketComponent from 'app/entities/WebSocket/Websocket'
import { useAppSelector } from 'shared/hooks/typedHooks'

const RoomPage = () => {
  const { id } = useParams<{ id: string }>()
  const userInfo = useAppSelector((state) => state.user)
  console.log(id)

  return (
    <div className={classes.roomContainer}>
      <div className={classes.WebSocketContainer}>
        <WebSocketComponent roomId={id} userName={userInfo.username} />
      </div>
    </div>
  )
}

export default RoomPage
