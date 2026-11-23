import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import App from './App'
import FavoritesProvider from './context/FavoritesProvider'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* HashRouter : les routes fonctionnent sur GitHub Pages, même après un rafraîchissement */}
    <HashRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </HashRouter>
  </StrictMode>,
)
