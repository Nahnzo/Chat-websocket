import { ModalWindow } from 'shared/ui'
import { RoomForm } from 'components/Form'
import { useState } from 'react'
import classes from './profilePage.module.css'
import RoomsList from 'widgets/RoomList/RoomList'

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={classes.listContainer}>
      <button className={classes.btnCreateRoom} onClick={() => setIsOpen(true)}>
        Create room
      </button>
      <RoomsList />
      <ModalWindow isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <RoomForm />
      </ModalWindow>
    </div>
  )
}

export default ProfilePage
