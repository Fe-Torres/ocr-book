import axios from 'axios'

export function useRead () {
  async function readImage (base64: string) {
    const response = await axios.post('http://localhost:3333/read-image', {
      path: base64
    })

    console.log(response)
  }

  return {
    readImage
  }
}
