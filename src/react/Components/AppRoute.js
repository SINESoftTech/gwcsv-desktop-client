import React from 'react'
import {createHashRouter, RouterProvider} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import HomePage from '../../views/HomePage'
import IdentifiedEvidenceDetailPage from '../../views/IdentifiedEvidenceDetailPage'
import Login from '../../views/LoginPage'
import NotFoundPage from '../../views/NotFoundPage'

const routes = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage/>
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'main',
        element: (
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/*',
    element: <NotFoundPage/>
  },
  {
    path: '/evidence-detail',
    element: (
      <ProtectedRoute>
        <IdentifiedEvidenceDetailPage/>
      </ProtectedRoute>
    )
  },
  {
    path: '/login',
    element: <Login/>
  }
]
const AppRoutes = () => {
  let router = createHashRouter(routes)
  return <RouterProvider router={router}/>
}

export default AppRoutes
