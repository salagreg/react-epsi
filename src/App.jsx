import { Route, Routes } from 'react-router'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import ScrollToTop from './components/ScrollToTop'
import ActressListPage from './pages/ActressList/ActressListPage'
import DuelPage from './pages/Duel/DuelPage'
import FavoritesPage from './pages/Favorites/FavoritesPage'
import HomePage from './pages/Home/HomePage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.layout}>
      <ScrollToTop />
      <Navbar />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/duel" element={<DuelPage />} />
          <Route path="/actrices" element={<ActressListPage />} />
          <Route path="/favoris" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
