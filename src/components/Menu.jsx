import React from 'react'
import { Icon } from '../assets/icon/icons'
import { listMenuProfile } from '../config'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

export function MenuProfile() {
    const handleLogout = () => {
            window.localStorage.clear();
            window.location.href = "/login"
    }
    return (
        <>
            <div className="arrowmenu">

            </div>
            <div className="menu-profile_wrapper">
                <ul className="menu-profile_list">
                    {listMenuProfile.map((item, index) => (
                        <li className="menu-profile_item" key={index}>
                            {item.url != '' ? (
                                <Link to={item.url}>
                                    {item.icon}
                                    <span>{item.item}</span>
                                </Link>
                            ) : (
                                <>
                                    <div className='item-flex'>
                                        {item.icon}
                                        <span> {item.item}</span>
                                    </div>
                                    {item.function == "changeLanguage" ??
                                        (
                                            <div className="toggle-switch">
                                                <input type="checkbox" className="toggle-input" id="toggle" />
                                                <label class="toggle-label" for="toggle"></label>
                                            </div>
                                        )}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="menu-profile_footer">
                    <button type='button' className="profile-action_logout" onClick={handleLogout}>{Icon.Logout}<span>Logout</span></button>
                </div>
            </div>
        </>
    )
}
