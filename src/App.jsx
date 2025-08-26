import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BannerEditor from './component/BannerEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <BannerEditor />
    </div>
    </>
  )
}

export default App
