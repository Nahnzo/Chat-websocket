import { TypeRoom } from '../model/types'
import classes from './room.module.css'

export interface RoomProps {
  type: TypeRoom
  roomId: string
  title: string
  quantityUsers: number
}

const Room = ({ type, title, quantityUsers, roomId }: RoomProps) => {
  return (
    <div className={classes.room}>
      <div>{title}</div>
      <div>{type}</div>
      <div>{quantityUsers}</div>
      <div>{roomId}</div>
    </div>
  )
}

export default Room
