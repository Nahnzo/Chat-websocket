import { createPortal } from 'react-dom'
import classes from './modalWindow.module.css'

interface ModalWindowProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const ModalWindow = ({ isOpen, onClose, children }: ModalWindowProps) => {
  const container = document.getElementById('root')
  if (!container || !isOpen) return null
  console.log(isOpen)

  return createPortal(
    <div className={classes.overlay} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    container
  )
}

export default ModalWindow
//  onClick={(e) => e.stopPropagation()}
