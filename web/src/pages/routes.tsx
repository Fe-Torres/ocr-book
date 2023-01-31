import Home from './home'
import { createBrowserRouter } from 'react-router-dom'
import Read from './read'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/read',
    element: <Read />
  }
])
