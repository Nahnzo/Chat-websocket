import { useState } from 'react'
import { Link } from 'react-router-dom'
import { onLogin } from '../../User/model/services'
import { useAppDispatch, useAppSelector } from 'shared/hooks/typedHooks'
import { ROUTES } from 'shared/routes/routes'
import { useRedirectHook } from 'shared/hooks/useRedirectHook'
import classes from './authForm.module.css'
import { getIsAuthUser } from '../model/selectors'

const AuthForm = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const isAuth = useAppSelector(getIsAuthUser)
  const path = ROUTES.profile
  useRedirectHook({ isAuth, path })

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const dispatch = useAppDispatch()

  return (
    <div className={classes.formContainer}>
      <form className={classes.form}>
        <input
          className={classes.input}
          type="text"
          name="register-username"
          value={username}
          onChange={handleUsername}
          autoComplete="new-username"
          placeholder="username"
        />
        <input
          className={classes.input}
          type="password"
          name="register-password"
          value={password}
          onChange={handlePassword}
          autoComplete="new-password"
          placeholder="password"
        />
      </form>
      <div className={classes.handlersContainer}>
        <button
          onClick={() => dispatch(onLogin({ username, password }))}
          className={classes.loginBtn}
        >
          Войти
        </button>
        <p>Нет аккаунта?</p>
        <Link to={ROUTES.register}>
          <p>Зарегистрироваться</p>
        </Link>
      </div>
    </div>
  )
}

export default AuthForm
