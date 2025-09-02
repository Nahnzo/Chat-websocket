import { createBrowserRouter } from 'react-router-dom'
import { AuthForm, RegisterForm } from '../../../components/Form'
import App from '../../../App'
import { ROUTES } from '../../../shared/routes'
import { ProfilePage } from '../../../components/Pages'

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
    element: <ProfilePage />,
  },
])
