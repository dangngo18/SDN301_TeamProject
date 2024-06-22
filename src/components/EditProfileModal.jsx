import React from 'react' 
import "../assets/styles/profile.scss";

const Modal = () => {
    return (
        <div className='form flex'>
            <div className='container modal'>
               
                <div className='content'>
                    <div className='tittle '>Edit Profile</div>
                    {/* <button className='button-x'><img src="./img/X.svg" alt="" /></button> */}
                    <button className='button-x'>X</button> 
                </div>

            </div>
        </div>
    )
}

export default Modal