// import WebSocketComponent from './Websocket'

import { Provider } from 'react-redux'
import { store } from './providers/storeProvider/store'

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <div style={{ minHeight: '100vh', background: '#1D2F36', alignContent: 'center' }}>
          {children}
          {/* <WebSocketComponent /> */}
        </div>
      </Provider>
    </>
  )
}

export default App
