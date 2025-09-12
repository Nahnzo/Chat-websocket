import { useNavigate } from 'react-router-dom'
import Room, { RoomProps } from '../Room/Room'
import classes from './roomList.module.css'
import { ROUTES } from 'shared/routes/routes'

const rooms: RoomProps[] = [
  { title: 'room1', type: 'public', quantityUsers: 10, roomId: '1' },
  { title: 'room2', type: 'closed', quantityUsers: 7, roomId: '2' },
  { title: 'room3', type: 'by-password', quantityUsers: 0, roomId: '3' },
  { title: 'room4', type: 'by-invite', quantityUsers: 2, roomId: '4' },
]

const RoomsList = () => {
  const navigate = useNavigate()

  const navigateToRoom = (roomId: string) => {
    navigate(`${ROUTES.room}${roomId}`)
  }

  return (
    <div className={classes.roomsContainer}>
      {rooms.map((room) => (
        <div onClick={() => navigateToRoom(room.roomId)}>
          <Room {...room} key={room.roomId} />
        </div>
      ))}
    </div>
  )
}

export default RoomsList
