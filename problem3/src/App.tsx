import { StrictMode } from 'react'
import RefactorWalletPage from './components/RefactorWalletPage'
import ImprovementsNote from './components/ImprovementsNote'

function App() {
  return (
    <StrictMode>
      <ImprovementsNote />
      <RefactorWalletPage />
    </StrictMode>
  )
}

export default App
