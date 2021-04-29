import { StateProvider } from './store'

import { Home } from './screens/Home'

function App() {
  return (
    <StateProvider>
      <Home />
    </StateProvider>
  )
}

export default App
