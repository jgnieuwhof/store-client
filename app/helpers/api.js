
export default async (endpoint, body) => {
  let response = await fetch(
    `${API_URL}/api/${endpoint}`,
    {
      headers: {
        'Accept': `application/json`,
        'Content-Type': `application/json`,
      },
      method: `POST`,
      body: JSON.stringify(body),
    },
  )
  let json = await response.json()
  return json
}
