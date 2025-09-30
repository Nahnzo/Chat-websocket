import { TypeRoom } from '../model/types'
import classes from './room.module.css'

export interface RoomProps {
  type: TypeRoom
  id: string
  name: string
  createdBy: string
  password?: string
}

const Room = ({ type, name, createdBy, id }: RoomProps) => {
  return (
    <div className={classes.room}>
      <div>{name}</div>
      <div>{type}</div>
      <div>{createdBy}</div>
      <div>{id}</div>
    </div>
  )
}

export default Room
