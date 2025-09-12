import { Provider } from 'react-redux'
import { store } from './providers/storeProvider/store'

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <div style={{ minHeight: '100vh', background: '#1D2F36', alignContent: 'center' }}>
          {children}
        </div>
      </Provider>
    </>
  )
}

export default App
