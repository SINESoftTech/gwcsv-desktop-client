import React from 'react';
import {RouterProvider} from 'react-router-dom';
import {createBrowserRouter} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../../views/HomePage";
import IdentifiedEvidenceDetailPage from "../../views/IdentifiedEvidenceDetailPage";
import PageNotFound from "../../views/NotFoundPage";
import Login from "../../views/LoginPage";

const routes = [
  {
    path: "/",
    element: (<ProtectedRoute><HomePage/></ProtectedRoute>),
    children: [
      {
        path: "main",
        element: (<ProtectedRoute><HomePage/></ProtectedRoute>),
      },
      {
        path: 'identified-evidence-detail',
        element: (<ProtectedRoute><IdentifiedEvidenceDetailPage/></ProtectedRoute>),
      },
    ]
  },
  {
    path: '/*',
    element: <PageNotFound/>,
  },
  {
    path: '/login',
    element: <Login/>,
  }]
const AppRoutes = () => {
  let router = createBrowserRouter(routes)
  return (<RouterProvider router={router}/>)
}

export default AppRoutes;
