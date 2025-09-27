import { createBrowserRouter } from 'react-router-dom'
import { AuthForm, RegisterForm } from 'components/Form'
import { ROUTES } from 'shared/routes/routes'
import App from '../../App'
import { ProfilePage, RoomPage } from 'pages/index'

export const router = createBrowserRouter([
  {
    path: ROUTES.login,
    element: (
      <App>
        <AuthForm />
      </App>
    ),
  },
  {
    path: ROUTES.register,
    element: (
      <App>
        <RegisterForm />
      </App>
    ),
  },
  {
    path: ROUTES.profile,
    element: (
      <App>
        <ProfilePage />
      </App>
    ),
  },
  {
    path: `${ROUTES.room}:id`,
    element: (
      <App>
        <RoomPage />
      </App>
    ),
  },
])
