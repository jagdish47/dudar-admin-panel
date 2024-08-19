import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useLocation } from 'react-router-dom';

const DefaultLayout = () => {
  const location = useLocation();
  // const isValidUser = location.state && location.state.isValidUser;
  // console.log("dsdasdasdas",isValidUser)
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
