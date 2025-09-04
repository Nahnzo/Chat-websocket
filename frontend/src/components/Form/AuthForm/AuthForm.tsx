import { useState } from 'react'
import { Link } from 'react-router-dom'
import { onLogin } from '../../User/model/services'
import { useAppDispatch } from 'shared/Pages/hooks/typedhooks'
import { ROUTES } from 'shared/routes/routes'
import classes from './authForm.module.css'

const AuthForm = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

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
        {/* <button onClick={() => onLogin({ username, password })} className={classes.loginBtn}>
          Войти
        </button> */}
        <p>Нет аккаунта?</p>
        <Link to={ROUTES.register}>
          <p>Зарегистрироваться</p>
        </Link>
      </div>
    </div>
  )
}

export default AuthForm
