import { useState } from 'react'
import { createRoom } from 'features/Room/api/services'
import { useAppSelector } from 'shared/hooks/typedHooks'
import { getUserName } from '../model/selectors'
import classes from './roomForm.module.css'

const RoomForm = () => {
  const [closedTypeRoomSelected, setClosedTypeRoomSelected] = useState(false)
  const [passwordRoom, setPasswordRoom] = useState('')
  const [roomName, setRoomName] = useState('')
  const username = useAppSelector(getUserName)

  return (
    <div className={classes.roomFormContainer}>
      <div className={classes.inputsContainer}>
        Название комнаты
        <input
          placeholder="Придумайте название"
          className={classes.input}
          onChange={(e) => setRoomName(e.target.value)}
        />
        Тип комнаты
        <select
          name="Тип комнаты"
          onChange={(e) => setClosedTypeRoomSelected(e.target.value === 'Закрытая')}
        >
          <option>Публичная</option>
          <option>Закрытая</option>
        </select>
        {closedTypeRoomSelected && (
          <input
            placeholder="Придумайте пароль"
            className={classes.input}
            onChange={(e) => setPasswordRoom(e.target.value)}
          />
        )}
      </div>
      <button
        className={classes.btnCreateRoom}
        onClick={() =>
          createRoom({
            username,
            type: closedTypeRoomSelected ? 'closed' : 'public',
            name: roomName,
            password: closedTypeRoomSelected ? passwordRoom : '',
          })
        }
      >
        Создать комнату
      </button>
    </div>
  )
}

export default RoomForm
