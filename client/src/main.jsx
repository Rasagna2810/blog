import { StrictMode, createContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import ThemeProvider from './context/ThemeProvider.jsx'
import App from './App.jsx'
import Home from './components/common/Home.jsx'
import Signin from './components/common/Signin.jsx'
import Signup from './components/common/Signup.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import Profile from './components/common/Profile.jsx'
import Rootlayout from './components/Rootlayout.jsx'
import AuthorProfile from './components/author/AuthorProfile.jsx'
import Articles from './components/common/Articles.jsx'
import PostArticle from './components/author/PostArticle.jsx'
import ArticleByID from './components/common/ArticleByID.jsx'
import UserAuthorCon from './context/UserAuthorCon.jsx'
import AdminProfile from './components/admin/AdminProfile.jsx'

// Create Theme Context


// Define Router Configuration
const browse = createBrowserRouter([
  {
    path: '/',
    element: <Rootlayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'signin', element: <Signin /> },
      { path: 'profile', element: <Profile /> },
      { path: 'signup', element: <Signup /> },
      {
        path: 'User-profile/:email',
        element: <UserProfile />,
        children: [
          { path: 'articles', element: <Articles /> },
          { path: ':articleId', element: <ArticleByID /> },
          { path: '', element: <Navigate to="articles" /> }
        ]
      },
      {
        path: 'author-profile/:email',
        element: <AuthorProfile />,
        children: [
          { path: 'articles', element: <Articles /> },
          { path: ':articleId', element: <ArticleByID /> },
          { path: 'article', element: <PostArticle /> },
          { path: '', element: <Navigate to="articles" /> }
        ]
      },
      { path: 'admin-profile/:email', element: <AdminProfile /> }
    ]
  }
])

// Create ThemeProvider Component


// Render the Application
createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <UserAuthorCon>
      <RouterProvider router={browse} />
    </UserAuthorCon>
  </ThemeProvider>
)
