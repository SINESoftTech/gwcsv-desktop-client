import React from 'react'
import Login from '../Pages/Login'
import PageNotFound from '../Pages/PageNotFound'
import Main from '../Pages/Main'

const routes =[
  {
    key:'main',
    path:'/main',
    component: Main,
    isPrivate: true
  },
  {
    key:'login',
    path:'/login',
    component: Login,
    isPrivate: false
  },
  {
    key:'root',
    path:'/',
    component: Main,
    isPrivate: true
  },
  {
    key:'other',
    path:'/*',
    component: PageNotFound,
    isPrivate: false
  },

]

export default routes