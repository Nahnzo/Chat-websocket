export const createRoom = async ({ username, typeRoom, roomName }) => {
  try {
    const result = await fetch('http://localhost:3000/createRoom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, typeRoom: typeRoom, roomName: roomName }),
    })
    const response = await result.json()
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export const getAllRooms = async () => {
  try {
    const result = await fetch('http://localhost:3000/getAllRooms', {
      method: 'GET',
    })
    const response = await result.json()
    return response
  } catch (error) {
    console.log(error)
  }
}
