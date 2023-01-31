import axios from 'axios'
import { useState } from 'react'

export function useRead () {
  const [imageResult, setImageResult] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isReading, setIsReading] = useState(false)

  async function readImage (base64: string) {
    setIsReading(true)
    try {
      const response = await axios.post('http://localhost:3333/read-image', {
        imgBase64: base64
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })

      const result = await interpretateImage(response.data.result)

      setImageResult('he')
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsReading(false)
      setSelectedFile(null)
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
      return 'Syntax error, cannot read the provided image'
    }
  }

  return {
    readImage,
    imageResult,
    selectedFile,
    setSelectedFile,
    isReading
  }
}
