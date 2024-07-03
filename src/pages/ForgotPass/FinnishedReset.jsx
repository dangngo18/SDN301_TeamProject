import React from 'react'
import { HeaderAfterLogin } from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import Main from '../../ultils/container'
export default function FinnishedReset() {
    const navigate = useNavigate()
    return (
        <Main>
            <div>
                <div className='ForgotGroup_Container'>
                    <div className='ForgotGroup_FormContainer'>
                        <div className='ForgotGroup_Form'>
                            <div className='ForgotGroup_FormTitle_Congratulations'>Congratulations</div>
                            <div className='ForgotGroup_Form_Icon'>
                                <img src="./img/Frame.svg" alt="" />
                            </div>
                            <div className='ForgotGroup_FormDesciption'>
                                <div className='ForgotGroup_FormDesciption_Text'>
                                    Your password has been restored,
                                    let’s get back to sign in to discover new styles on our website
                                </div>
                            </div>
                        </div>
                        <div className='ForgotGroup_FormBtn'>
                            <button onClick={() => navigate('/Login')} type='submit' className={'ForgotGroup_FormBtn_Return'} >
                                Go to Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}
