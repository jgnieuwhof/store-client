
export default async (endpoint, body) => {
  let json
  try {
    let response = await fetch(
      `${process.env.API_URL}/api/${endpoint}`,
      {
        headers: {
          'Accept': `application/json`,
          'Content-Type': `application/json`,
        },
        method: `POST`,
        body: JSON.stringify(body),
      },
    )
    json = await response.json()
  }
  catch (e) {
    console.log(`api error: `, e)
    json = { success: false, message: `An error was encountered, please try again later` }
  }
  return json
}
