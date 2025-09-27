import { useState } from 'react'
import classes from './roomForm.module.css'

const RoomForm = () => {
  const [closedTypeRoomSelected, setClosedTypeRoomSelected] = useState(false)

  return (
    <div className={classes.roomFormContainer}>
      <div className={classes.inputsContainer}>
        Название комнаты
        <input placeholder="Придумайте название" className={classes.input} />
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
      <button className={classes.btnCreateRoom}>Создать комнату</button>
    </div>
  )
}

export default RoomForm
