import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Local } from './features/local/page/Local'
import { DataProvider } from './context/DataProvider'
export const App = () => {
  return (
    <div>
      <DataProvider>
        <Routes>
          <Route path='/:name' element={<Local />} />
        </Routes>
      </DataProvider>
    </div>
  )
}

