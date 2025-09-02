// import WebSocketComponent from './Websocket'

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#1D2F36', alignContent: 'center' }}>
      {children}
      {/* <WebSocketComponent /> */}
    </div>
  )
}

export default App
