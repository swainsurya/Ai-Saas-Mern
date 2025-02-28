import React from 'react'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/DashboardPage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Signup from './pages/SignupPage'
import PricingPage from './pages/PricingPage'
import ProtectedRoute from './lib/ProtectedRoute'
import SuccessPage from './pages/PaymentSuccess'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <main className='no-scrollbar'>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<LandingPage />} />

        <Route element={<ProtectedRoute/>}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/success/:amt' element={<SuccessPage/>} />
        </Route>

        <Route path='/pricing' element={<PricingPage />} />
      </Routes>
      <Toaster position='top-center' />
    </main>
  )
}

export default App
