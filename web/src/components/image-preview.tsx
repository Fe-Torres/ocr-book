import { useEffect } from 'react'
import { useRead } from '../pages/useRead'
import { Button } from './button'
import { TitleWrapper } from './title'

type ImagePreviewProps = {
    selectedFile: File | null
}

export const ImagePreview = ({ selectedFile }: ImagePreviewProps) => {
  const { readImage } = useRead()

  let base64: string

  useEffect(() => {
    if (selectedFile) {
      const imageRef = document.getElementById('previewImg') as HTMLImageElement
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.addEventListener('load', (e) => {
        imageRef.src = e.target?.result as string
      })
    }
  }, [])

  return (
    <div className="flex flex-col gap-4 items-center">
      <TitleWrapper>Read image:</TitleWrapper>
      <div className="w-1/2">
        <img id="previewImg" />
      </div>
      <section className="w-1/2 p-4 flex flex-row justify-between">
        <div className="w-1/3">
          <Button onClick={() => readImage(base64)}>Yes</Button>
        </div>
        <div className="w-1/3">
          <Button onClick={() => console.log('teste')}>No</Button>
        </div>
      </section>
    </div>
  )
}
