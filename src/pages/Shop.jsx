import React from 'react'
import Main from '../ultils/container'
import { useNavigate } from 'react-router-dom'
export default function Shop() {
  const navigate = useNavigate();
  return (
    <Main>
      <div>
        <div className='ForgotGroup_Container'>
          <div className='ForgotGroup_FormContainer'>
            <div className='ForgotGroup_Form'>
              <div className='ForgotGroup_FormTitle_Congratulations'>Page is in Build</div>
              <div className='ForgotGroup_Form_404'>
                🕓
              </div>
              <div className='ForgotGroup_FormDesciption'>
                <div className='ForgotGroup_FormDesciption_Text'>
                  The page you just entered is building on our website,<br/>
                  you can go back later when page are already to enter.
                </div>
              </div>
            </div>
            <div className='ForgotGroup_FormBtn'>
              <button onClick={() => navigate('/')} className={'ForgotGroup_FormBtn_Return'} >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  )
}
