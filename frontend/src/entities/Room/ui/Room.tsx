import { TypeRoom } from '../model/types'
import classes from './room.module.css'

export interface RoomProps {
  typeRoom: TypeRoom
  id: string
  roomName: string
  createdBy: string
}

const Room = ({ typeRoom, roomName, createdBy, id }: RoomProps) => {
  return (
    <div className={classes.room}>
      <div>{roomName}</div>
      <div>{typeRoom}</div>
      <div>{createdBy}</div>
      <div>{id}</div>
    </div>
  )
}

export default Room
