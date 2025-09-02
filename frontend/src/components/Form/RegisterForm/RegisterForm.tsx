import { useState } from 'react'
import { register } from '../model/userService'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../shared/routes'
import classes from './registerForm.module.css'

const RegisterForm = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

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
        <button onClick={() => register({ username, password })} className={classes.registerBtn}>
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
