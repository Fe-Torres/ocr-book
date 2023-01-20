import { useState } from 'react'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { TitleWrapper } from '../components/title'

export default function Home () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="h-full p-8">
      <div className="flex items-center flex-col">
        <div className="flex items-center mt-12 flex-col gap-6">
          <div className="flex justify-center">
            <img
              className="w-2/6 max-w-xs"
              src="https://toppng.com/public/uploads/thumbnail/experience-the-discussion-online-library-book-logo-11562996058ip1or4eqvs.png"
            />
          </div>
          <TitleWrapper>
            <h1>CodeBookJS</h1>
          </TitleWrapper>
        </div>
        <form className='flex flex-col gap-4 items-center mt-12'>
          <Input name='Email' onChange={(value) => setEmail(value)}/>
          <Input name='Password' onChange={(value) => setPassword(value)}/>
        </form>
        <section className='w-full max-w-xs mt-8 flex flex-row justify-between items-center'>
          <div className='w-1/4'>
            <Button onClick={() => console.log('teste')}>Login</Button>
          </div>
          <a href="/teste" className='underline'>
          How to use
          </a>
        </section>
      </div>
    </div>
  )
}
