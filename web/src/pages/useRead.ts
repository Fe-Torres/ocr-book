import axios from 'axios'
import { useState } from 'react'

export function useRead () {
  const [imageResult, setImageResult] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  async function readImage (base64: string) {
    try {
      const response = await axios.post('http://localhost:3333/read-image', {
        imgBase64: base64
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })

      const result = await interpretateImage(response.data)

      setImageResult(result)
    } catch (error) {
      console.log(error)
    }
  }

  async function interpretateImage (code: string): Promise<string | null> {
    try {
      const response = await axios.post('http://localhost:3333/interpreter', {
        text: code
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })

      setSelectedFile(null)
      return response.data
    } catch (error) {
      return null
    }
  }

  return {
    readImage,
    imageResult,
    selectedFile,
    setSelectedFile
  }
}
