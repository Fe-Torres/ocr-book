import { Button } from '../components/button'
import { DragDrop } from '../components/drag-drop'
import CameraIcon from '../assets/camera-icon.png'
import { Logo } from '../components/logo'

export default function Read () {
  return (
    <div className="h-full">
      <header className="flex items-center justify-center p-8">
        <div className="w-full max-w-xl">
          <Logo />
        </div>
      </header>
      <section className="w-full flex items-center flex-col gap-4 mt-12">
        <DragDrop />
        <div className="w-3/4 max-w-md flex items-center justify-between">
          <div className="w-14">
            <img src={CameraIcon} />
          </div>
          <div>
            <Button onClick={() => console.log('teste')}>Select File</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
