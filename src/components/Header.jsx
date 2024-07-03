import React, { useRef, useState } from 'react'
import { Icon } from '../assets/icon/icons';
import { Link } from 'react-router-dom';
import { Logo } from '../config'
import { MenuProfile } from './Menu';
const Menu = ["Home", "Style", "Shop"]



export function Header() {
  const [search, setSearch] = React.useState('');
  const navActive = location.pathname.split('/')[1].toLowerCase();
  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className='HeaderBeforeLogin'>
      <div className='logo'>
        <Link to='/'><img src={Logo} alt="logo" /></Link>
      </div>
      <div className='HeaderSearchBox'>
        <input className='SearchBox' type="text" value={search} onChange={handleInputSearch} placeholder='Search your product...' />
        <button className='SearchButton'>
          <span>
            {Icon.Search}
          </span>
        </button>
      </div>
      {/* nhớ sửa thành Link */}
      <div className='HeaderProfileAndLogin'>
        <nav className='nav'>
          <ul className='ListMenu'>
            {Menu.map((item, index) => (
              <li
                key={'item' + index}
                className={`Menu ${(item === 'Home' && navActive === '') ? 'Active' : item.toLowerCase() === navActive ? 'Active' : ''}`}
              >
                <Link to={item === 'Home' ? '/' : '/' + item}>{item}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <button className='LoginButton' onClick={() => window.location.href = '/login'}>Login</button>
      </div>
    </div>
  )
}

export function HeaderAfterLogin() {
  const [search, setSearch] = React.useState('');
  const [notificationCount, setNotificationCount] = React.useState(4);
  const navActive = location.pathname.split('/')[1].toLowerCase();
  const [showMenu,setShowMenu] =useState(false);

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className='HeaderBeforeLogin'>
      <div className={`menu-profile_container ${showMenu ? 'show': ''}`} onMouseLeave={()=>setShowMenu(false)}>
        <MenuProfile />
      </div>
      <div className='logo'>
        <Link to='/'><img src={Logo} alt="logo" /></Link>
      </div>
      <div className='HeaderSearchBox'>
        <input className='SearchBox' type="text" value={search} onChange={handleInputSearch} placeholder='Search your product...' />
        <button className='SearchButton'>
          <span>
            {Icon.Search}
          </span>
        </button>
      </div>
      {/* nhớ sửa thành Link */}
      <div className='HeaderProfileAndLogin'>
        <div className='HeaderProfileAndBell'>
          <nav className='nav'>
            <ul className='ListMenu'>
              {Menu.map((item, index) => (
                <li
                  key={'item' + index}
                  className={`Menu ${(item === 'Home' && navActive === '') ? 'Active' : item.toLowerCase() === navActive ? 'Active' : ''}`}
                >
                  <Link to={item === 'Home' ? '/' : '/' + item}>{item}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="bell_icon">
            {Icon.Bell}
            {notificationCount != 0 && <span className="notification_count">{notificationCount}</span>}
          </div>
          <div className='HeaderProfile' onMouseEnter={() => {setShowMenu(true)}} onClick={() => window.location.href = '/user/profile/1'}>
            <img className='ProfileAvatar' src="../img/OIP.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
export function HeaderforStyle() {
  const [search, setSearch] = React.useState('');
  const [notificationCount, setNotificationCount] = React.useState(4);
  const navActive = location.pathname.split('/')[1].toLowerCase();
  const [showMenu,setShowMenu] =useState(false);


  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  }
  return (
    <div className='HeaderBeforeLogin'>
      <div className={`menu-profile_container ${showMenu ? 'show': ''}`} onMouseLeave={()=>setShowMenu(false)}>
        <MenuProfile />
      </div>
      <div className='logo'>
        <Link to='/'><img src={Logo} alt="logo" /></Link>
      </div>
      <div className='HeaderSearchBox'>
        <input className='SearchBox' type="text" value={search} onChange={handleInputSearch} placeholder='Search your product...' />
        <button className='SearchButton'>
          <span>
            {Icon.Search}
          </span>
        </button>
      </div>
      {/* nhớ sửa thành Link */}
      <div className='HeaderProfileAndLogin'>
        <div className='HeaderProfileAndBell'>
          <nav className='nav'>
            <ul className='ListMenu'>
              {Menu.map((item, index) => (
                <li
                  key={'item' + index}
                  className={`Menu ${(item === 'Home' && navActive === '') ? 'Active' : item.toLowerCase() === navActive ? 'Active' : ''}`}
                >
                  <Link to={item === 'Home' ? '/' : '/' + item}>{item}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="upload_button">
            <button onClick={() => window.location.href = '/studio/posts'}><span>{Icon.Plus}</span>Upload</button>
          </div>
          <div className="bell_icon">
            {Icon.Bell}
            {notificationCount != 0 && <span className="notification_count">{notificationCount}</span>}
          </div>
          <div className='HeaderProfile' onMouseEnter={() => {setShowMenu(true)}} onClick={() => window.location.href = '/user/profile/1'}>
            <img className='ProfileAvatar' src="../../img/OIP.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeaderforStudio() {
  const navActive = location.pathname.split('/')[1].toLowerCase();
  const [notificationCount, setNotificationCount] = React.useState(4);
  const [showMenu,setShowMenu] =useState(false);
  return (
    <div className='HeaderBeforeLogin'>
      <div className={`menu-profile_container ${showMenu ? 'show': ''}`} onMouseLeave={()=>setShowMenu(false)}>
        <MenuProfile />
      </div>
      <div className='logo'>
        <Link to='/'><img src={Logo} alt="logo" /></Link>
      </div>
      {/* nhớ sửa thành Link */}
      <div className='HeaderProfileAndLogin'>
        <div className='HeaderProfileAndBell'>
          <nav className='nav'>
            <ul className='ListMenu'>
              {Menu.map((item, index) => (
                <li
                  key={'item' + index}
                  className={`Menu ${item.toLowerCase() === 'style' ? 'Active' : ''}`}
                >
                  <Link to={item === 'Home' ? '/' : '/' + item}>{item}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="bell_icon">
            {Icon.Bell}
            {notificationCount != 0 && <span className="notification_count">{notificationCount}</span>}
          </div>
          <div className='HeaderProfile' onMouseEnter={() => {setShowMenu(true)}} onClick={() => window.location.href = '/user/profile/1'}>
            <img className='ProfileAvatar' src="../../img/OIP.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}