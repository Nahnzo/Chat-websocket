import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'shared/routes/routes'
import { getAllRooms } from 'features/Room/api/services'
import classes from './roomList.module.css'
import Room, { RoomProps } from 'entities/Room/ui/Room'
import { useEffect, useState } from 'react'
import { ModalWindow } from 'shared/ui'

const RoomsList = () => {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState<RoomProps[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [passwordRoom, setPasswordRoom] = useState('')
  console.log(rooms)

  const navigateToRoom = (room: RoomProps) => {
    if (room.type === 'closed') {
      const roomId = rooms.map((room) => room.password === passwordRoom)
      console.log(roomId)
      setIsOpen(true)
    } else {
      navigate(`${ROUTES.room}${room.id}`)
    }
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
  }, [rooms.length])

  return (
    <>
      <ModalWindow isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <input
          type="password"
          placeholder="Введите пароль"
          onChange={(e) => setPasswordRoom(e.target.value)}
        />
        <button>Войти</button>
      </ModalWindow>
      <div className={classes.roomsContainer}>
        {rooms.map((room) => (
          <div onClick={() => navigateToRoom(room)}>
            <Room {...room} key={room.id} />
          </div>
        ))}
      </div>
    </>
  )
}

export default RoomsList
