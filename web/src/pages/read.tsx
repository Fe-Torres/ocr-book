import { DragDrop } from '../components/drag-drop'
import { Logo } from '../components/logo'
import { useState } from 'react'
import { ButtonFile } from '../components/button-file'
import { ImagePreview } from '../components/image-preview'

export default function Read () {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const renderDragAndDrop = () => {
    if (screen.width > 500) {
      return (
        <DragDrop selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      )
    }
  }

  return (
    <div className="h-full">
      <header className="flex items-center justify-center p-8">
        <div className="w-full max-w-xl">
          <Logo />
        </div>
      </header>
      <section className="w-full flex items-center flex-col gap-4 mt-12">
        {selectedFile
          ? (
            <>
              <ImagePreview selectedFile={selectedFile} />
            </>
          )
          : (
            <>
              {renderDragAndDrop()}
              <div className="max-w-md flex items-center">
                <ButtonFile selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
              </div>

            </>
          )}
      </section>
    </div>
  )
}
