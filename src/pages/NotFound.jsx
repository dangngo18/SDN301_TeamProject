import React from 'react'
import Footer from '../components/Footer'
import { HeaderAfterLogin } from '../components/Header'
import { useNavigate } from 'react-router-dom'
export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div>
      <HeaderAfterLogin />
      <div>
        <div className='ForgotGroup_Container'>
          <div className='ForgotGroup_FormContainer'>
            <div className='ForgotGroup_Form'>
              <div className='ForgotGroup_FormTitle_Congratulations'>Page not found</div>
              <div className='ForgotGroup_Form_404'>
                404
              </div>
              <div className='ForgotGroup_FormDesciption'>
                <div className='ForgotGroup_FormDesciption_Text'>
                  The page you just entered was not found on our website,
                  please return to the home page
                </div>
              </div>
            </div>
            <div className='ForgotGroup_FormBtn'>
              <button onClick={() => navigate('/')}  className={'ForgotGroup_FormBtn_Return'} >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
