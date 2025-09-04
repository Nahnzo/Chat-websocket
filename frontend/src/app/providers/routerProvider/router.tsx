import { createBrowserRouter } from 'react-router-dom'
import { AuthForm, RegisterForm } from 'components/Form'
import { ROUTES } from 'shared/routes/routes'
import { ProfilePage } from 'shared/Pages'
import App from '../../App'

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
