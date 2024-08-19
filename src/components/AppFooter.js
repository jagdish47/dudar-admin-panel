import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
      <p target="_blank" rel="noopener noreferrer">
        ©2024 Dudar Tech Pvt. Ltd. All Rights Reserved.
          
        </p>
     
      </div>
      <div className="ms-auto">
        {/* <span className="me-1">Powered by</span> */}
        <img
        src="https://dev-v1.solvedudar.com/assets/web/images/logo/logo.png"
        alt="Logo"
        height={23} // Adjust the height as needed
        style={{ width: 'auto' }} // Ensures the image maintains its aspect ratio
      />
        
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
