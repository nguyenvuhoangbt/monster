import { Suspense } from 'react'
import { Experience } from './components/Experience'

function App() {
  return (
    <Suspense fallback={null}>
      <Experience />
    </Suspense>
  )
}

export default App
