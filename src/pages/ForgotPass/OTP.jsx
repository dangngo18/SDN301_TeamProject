import React from 'react'
import { HeaderAfterLogin } from '../../components/Header'
import Footer from '../../components/Footer'
import { checkOTP } from '../../ultils/validation'
import { useNavigate } from 'react-router-dom'
import Main from '../../ultils/container'
export default function OTP() {
  const [otp, setOtp] = React.useState('123456') //set OTP here
  const [inputotp, setInputOtp] = React.useState('')
  const [error, setError] = React.useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    const result = checkOTP(inputotp)
    let check = true
    if (result) {
      check = false
      setError(result)
    } else if (inputotp !== otp) {
      check = false
      setError('OTP is not correct')
    }
    if (check) {
      navigate('/Style')
    } else {
      e.preventDefault()
    }
  }
  return (
    <Main>
      <div className='ForgotGroup_Container'>
        <div className='ForgotGroup_FormContainer'>
          <div className='ForgotGroup_Form'>
            <div className='ForgotGroup_FormTitle'>Forgot Password</div>
            <div className='ForgotGroup_FormDesciption'>
              <div className='ForgotGroup_FormDesciption_Text'>
                You will receive an OTP send to your email,
                don’t share to anyone
              </div>
            </div>
            <div className='ForgotGroup_FormInput'>
              <div className='ForgotGroup_FormInputTitle'>OTP number</div>
              <div className='ForgotGroup_FormInputBox'>
                <input type='text' placeholder='enter 6-digit of OTP' value={inputotp} onChange={e => (setInputOtp(e.target.value))} />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className='ForgotGroup_ResendOTP'>
              You don’t receive OTP? <span>Resend it</span>
            </div>
          </div>
          <div className='ForgotGroup_FormBtn'>
            <button onClick={handleSubmit} type='submit' className={inputotp ? 'ForgotGroup_FormBtn_Active' : 'ForgotGroup_FormBtn_Disable'} >Submit OTP</button>
          </div>
        </div>
      </div>
    </Main>
  )
}
