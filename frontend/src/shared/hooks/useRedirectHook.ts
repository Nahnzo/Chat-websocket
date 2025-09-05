import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface UseRedirectHookProps {
  isAuth: boolean
  path: string
}

export const useRedirectHook = ({ isAuth, path }: UseRedirectHookProps) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuth) {
      navigate(path, { replace: true })
    }
  }, [isAuth, navigate, path])
}
