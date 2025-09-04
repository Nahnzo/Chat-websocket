import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from 'shared/routes/routes'
import classes from './registerForm.module.css'
import { onRegister } from '../../User/model/services'
import { useAppDispatch } from 'shared/Pages/hooks/typedhooks'

const RegisterForm = () => {
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
          onClick={() => dispatch(onRegister({ username, password }))}
          className={classes.registerBtn}
        >
          Зарегистрироваться
        </button>
        <p>Есть аккаунт?</p>
        <Link to={ROUTES.login}>
          <p>Войти</p>
        </Link>
      </div>
    </div>
  )
}

export default RegisterForm
