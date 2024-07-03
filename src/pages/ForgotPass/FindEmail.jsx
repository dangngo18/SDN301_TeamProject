import React from 'react';
import '../../assets/styles/ForgotPassStyle.scss'
import { Header } from '../../components/Header';
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom';
import { validatePhoneNumber } from '../../ultils/validation';
import Main from '../../ultils/container';
export default function FindEmail() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');

    const handlSubmit = (e) => {
        const examine = validatePhoneNumber(email)
        let check = true;
        if (examine) {
            setError(examine)
            check = false
        }
        if (check == false) {
            e.preventDefault();
        } else {
            setError('');
            navigate('/Style')
        }
    }
    return (
        <Main>
            <div className='ForgotGroup_Container'>
                <div className='ForgotGroup_FormContainer'>
                    <div className='ForgotGroup_Form'>
                        <div className='ForgotGroup_FormTitle'>Find Your Email</div>
                        <div className='ForgotGroup_FormDesciption'>
                            <div className='ForgotGroup_FormDesciption_Text'>
                                Enter the mobile phone number you registered when signing up,we will send you a portion of your email address.
                            </div>
                        </div>
                        <div className='ForgotGroup_FormInput'>
                            <div className='ForgotGroup_FormInputTitle'>Phone number</div>
                            <div className='ForgotGroup_FormInputBox'>
                                <input type='text' placeholder='Your phone number you signed up with' value={email} onChange={e => (setEmail(e.target.value))} />
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                    </div>
                    <div className='ForgotGroup_FormBtn'>
                        <button onClick={handlSubmit} type='submit' className={email ? 'ForgotGroup_FormBtn_Active' : 'ForgotGroup_FormBtn_Disable'} >Find your Email</button>
                    </div>
                </div>
            </div>
        </Main>
    );
}
