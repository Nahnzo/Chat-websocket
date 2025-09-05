import { RootState } from 'app/providers/storeProvider/store'

export const getIsAuthUser = (state: RootState) => state.user.isAuth ?? false
