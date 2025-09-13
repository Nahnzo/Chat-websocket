import { useParams } from 'react-router-dom'
import { useAppSelector } from 'shared/hooks/typedHooks'
import WebSocketComponent from 'app/entities/WebSocket/Websocket'
import classes from './roomPage.module.css'

const RoomPage = () => {
  const { id } = useParams<{ id: string }>()
  const userInfo = useAppSelector((state) => state.user)

  return (
    <div className={classes.roomContainer}>
      <WebSocketComponent roomId={id} userName={userInfo.username} />
    </div>
  )
}

export default RoomPage
