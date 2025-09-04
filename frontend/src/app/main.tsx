import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './providers/routerProvider/router.js'
import './index.css'

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
