import React from 'react'
import { HeaderAfterLogin } from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../../ultils/validation';
import Main from '../../ultils/container';
export default function ResetPassword() {
  const navigate = useNavigate();
  const [field, setField] = React.useState({
    newpassword: '',
    repassword: ''
  })
  const [error, setError] = React.useState({
    newpassword: '',
    repassword: ''
  });
  const handleSubmit = (e) => {
    const passwordError = validatePassword(field.newpassword);
    let check = true;

    if (passwordError) {
      setError((prevError) => ({ ...prevError, newpassword: passwordError }));
      check = false;
    } else {
      setError((prevError) => ({ ...prevError, newpassword: '' }));
    }

    if (field.newpassword !== field.repassword) {
      setError((prevError) => ({ ...prevError, repassword: 'Re-entered password and new password are not the same' }));
      check = false;
    } else {
      setError((prevError) => ({ ...prevError, repassword: '' }));
    }
    if (check) {
      navigate('/login')
    } else {
      e.preventDefault()
    }
  }
  const isFormValid = field.newpassword && field.repassword;
  console.log(error)
  return (
    <Main>

      <div>
        <div className='ForgotGroup_Container'>
          <div className='ForgotGroup_FormContainer'>
            <div className='ForgotGroup_Form'>
              <div className='ForgotGroup_FormTitle'>Reset password</div>
              <div className='ForgotGroup_FormDesciption'>
                <div className='ForgotGroup_FormDesciption_Text'>
                  Great, now you can create a new password for your account.
                </div>
              </div>
              <div className='ForgotGroup_FormInput'>
                <div className='ForgotGroup_FormInputTitle'>New Password</div>
                <div className='ForgotGroup_FormInputBox'>
                  <input type='password' placeholder='8-16 letter containing an uppercase letter and a number' value={field.newpassword} onChange={e => (setField({ ...field, newpassword: e.target.value }))} />
                </div>
                {error.newpassword && <div style={{ color: 'red' }} className='ForgotGroup_FormInputError'>{error.newpassword}</div>}
              </div>
              <div className='ForgotGroup_FormInput'>
                <div className='ForgotGroup_FormInputTitle'>Re-enter Password</div>
                <div className='ForgotGroup_FormInputBox'>
                  <input type='password' placeholder='enter password again' value={field.repassword} onChange={e => (setField({ ...field, repassword: e.target.value }))} />
                </div>
                {error.repassword && <div style={{ color: 'red' }} className='ForgotGroup_FormInputError'>{error.repassword}</div>}
              </div>
            </div>
            <div className='ForgotGroup_FormBtn'>
              <button onClick={handleSubmit} type='submit' className={isFormValid ? 'ForgotGroup_FormBtn_Active' : 'ForgotGroup_FormBtn_Disable'} >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  )
}
