import React from 'react'
import { HeaderAfterLogin } from '../../components/Header'
import Footer from '../../components/Footer'
import { validatePhoneNumber, validateEmail } from '../../ultils/validation';
import { useNavigate } from 'react-router-dom';
import Main from '../../ultils/container';
export default function ForgotPassword() {
    const navigate = useNavigate();
    const [field, setField] = React.useState({
        email: '',
        phone: ''
    })
    const [error, setError] = React.useState({
        email: '',
        phone: ''
    });
    const handlSubmit = (e) => {
        const examineEmail = validateEmail(field.email)
        const examinePhone = validatePhoneNumber(field.phone)
        let check = true;
        if (examineEmail) {
            setError(prev => ({ ...prev, email: examineEmail }));
            check = false;
        } else {
            setError(prev => ({ ...prev, email: '' }));
        }

        if (examinePhone) {
            setError(prev => ({ ...prev, phone: examinePhone }));
            check = false;
        } else {
            setError(prev => ({ ...prev, phone: '' }));
        }
        if (check == false) {
            e.preventDefault();
        } else {
            setError('');
            navigate('/OTP')
        }
    }

    const isFormValid = field.email && field.phone;
    return (
        <Main>

            <div>
                <div className='ForgotGroup_Container'>
                    <div className='ForgotGroup_FormContainer'>
                        <div className='ForgotGroup_Form'>
                            <div className='ForgotGroup_FormTitle'>Forgot Password</div>
                            <div className='ForgotGroup_FormDesciption'>
                                <div className='ForgotGroup_FormDesciption_Text'>
                                    Enter phone number and email you registered when signing up,an OTP will be sent to your email.
                                </div>
                            </div>
                            <div className='ForgotGroup_FormInput'>
                                <div className='ForgotGroup_FormInputTitle'>Phone number</div>
                                <div className='ForgotGroup_FormInputBox'>
                                    <input type='text' placeholder='Your phone number you signed up with' value={field.phone} onChange={e => (setField({ ...field, phone: e.target.value }))} />
                                </div>
                                {error.phone && <div style={{ color: 'red' }} className='ForgotGroup_FormInputError'>{error.phone}</div>}
                            </div>
                            <div className='ForgotGroup_FormInput'>
                                <div className='ForgotGroup_FormInputTitle'>Email Address</div>
                                <div className='ForgotGroup_FormInputBox'>
                                    <input type='text' placeholder='Example sufy@sufy.styles.com' value={field.email} onChange={e => (setField({ ...field, email: e.target.value }))} />
                                </div>
                                {error.email && <div style={{ color: 'red' }} className='ForgotGroup_FormInputError'>{error.email}</div>}
                            </div>
                        </div>
                        <div className='ForgotGroup_FormBtn'>
                            <button onClick={handlSubmit} type='submit' className={isFormValid ? 'ForgotGroup_FormBtn_Active' : 'ForgotGroup_FormBtn_Disable'} >
                                Sent a text message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}
