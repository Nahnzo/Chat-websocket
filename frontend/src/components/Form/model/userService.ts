export const register = async ({ username, password }: { username: string; password: string }) => {
  try {
    const result = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    })
    const response = await result.json()
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export const login = async ({ username, password }: { username: string; password: string }) => {
  try {
    const result = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    })
    const response = await result.json()
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
