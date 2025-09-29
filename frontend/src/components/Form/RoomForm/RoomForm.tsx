import { useState } from 'react'
import { createRoom } from 'features/Room/api/services'
import { useAppSelector } from 'shared/hooks/typedHooks'
import { getUserName } from '../model/selectors'
import classes from './roomForm.module.css'

const RoomForm = () => {
  const [closedTypeRoomSelected, setClosedTypeRoomSelected] = useState(false)
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
          <input placeholder="Придумайте пароль" className={classes.input} />
        )}
      </div>
      <button
        className={classes.btnCreateRoom}
        onClick={() =>
          createRoom({
            username,
            typeRoom: closedTypeRoomSelected ? 'closed' : 'public',
            roomName,
          })
        }
      >
        Создать комнату
      </button>
    </div>
  )
}

export default RoomForm
