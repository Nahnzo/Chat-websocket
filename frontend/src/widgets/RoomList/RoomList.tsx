import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'shared/routes/routes'
import { getAllRooms } from 'features/Room/api/services'
import classes from './roomList.module.css'
import Room, { RoomProps } from 'entities/Room/ui/Room'
import { useEffect, useState } from 'react'

const RoomsList = () => {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState<RoomProps[]>([])

  const navigateToRoom = (roomId: string) => {
    navigate(`${ROUTES.room}${roomId}`)
  }

  useEffect(() => {
    try {
      const getRooms = async () => {
        const rooms = await getAllRooms()
        setRooms(rooms)
      }
      getRooms()
    } catch (error) {
      console.log(error)
    }
  }, [rooms])

  return (
    <div className={classes.roomsContainer}>
      {rooms.map((room) => (
        <div onClick={() => navigateToRoom(room.id)}>
          <Room {...room} key={room.id} />
        </div>
      ))}
    </div>
  )
}

export default RoomsList
