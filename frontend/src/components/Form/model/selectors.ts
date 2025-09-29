import { RootState } from 'app/providers/storeProvider/store'

export const getIsAuthUser = (state: RootState) => state.user.isAuth ?? false
export const getUserName = (state: RootState) => state.user.username ?? ''
