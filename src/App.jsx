import React, { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

import { LayoutLoader } from './components/layout/Loader'

import { useDispatch, useSelector } from 'react-redux'

import axios from "axios"
import { server } from './constants/config'
import { userExists, userNotExist } from './redux/reducres/auth'
import { SocketProvider } from './Socket'


const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Chat = lazy(() => import("./pages/Chat"))
const Groups = lazy(() => import("./pages/Groups"))
const NotFound = lazy(() => import("./pages/NotFound"))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement'))
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement'))
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'))


function App() {

  const { user, loader } = useSelector((state => state.auth))
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then((res) => dispatch(userExists(res.data.user)))
      .catch((err) => dispatch(userNotExist()))
  }, [dispatch])


  return loader ? <LayoutLoader /> : (
    <BrowserRouter>
      <Suspense fallback={<div><LayoutLoader /></div>}>
        <Routes>
          <Route element={
            <SocketProvider>
              <ProtectedRoute user={user} />
            </SocketProvider>}
          >
            <Route path='/' element={<Home />} />
            <Route path='/chat/:chatId' element={<Chat />} />
            <Route path='/groups' element={<Groups />} />
          </Route>

          <Route path='/login' element={<ProtectedRoute user={!user} redirect='/'>
            <Login />
          </ProtectedRoute>} />

          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/users-management' element={<UserManagement />} />
          <Route path='/admin/chats-management' element={<ChatManagement />} />
          <Route path='/admin/messages-management' element={<MessageManagement />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position='bottom-center' />
    </BrowserRouter>
  )
}

export default App
