import React from 'react'
import { Icon } from '../assets/icon/icons';
import { Link } from 'react-router-dom';

const Menu = ["Home", "Style", "Shop"]

export function Header() {
  const [search, setSearch] = React.useState('');
  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  }
  return (
    <div className='HeaderBeforeLogin'>
      <div className='logo'>
        <Link to='/'><img src="./img/Logo.jpg" alt="logo" /></Link>
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
              <li className='Menu' key={'item' + index}>
                {item === 'Home'
                  ?
                  <Link to={'/'}>{item}</Link>
                  :
                  <Link to={'/' + item} >{item}</Link>}
              </li>
            ))}
          </ul>
        </nav>
        <button className='LoginButton'>Login</button>
      </div>
    </div>
  )
}

export function HeaderAfterLogin() {
  const [search, setSearch] = React.useState('');
  const [notificationCount, setNotificationCount] = React.useState(4);

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  }
  return (
    <div className='HeaderBeforeLogin'>
      <div className='logo'>
        <Link to='/'><img src="/img/Logo.jpg" alt="logo" /></Link>
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
              <li className='Menu' key={'item' + index}>
                {item === 'Home'
                  ?
                  <Link to={'/'}>{item}</Link>
                  :
                  <Link to={'/' + item} >{item}</Link>}
              </li>
            ))}
          </ul>
        </nav>
        <div className='HeaderProfileAndBell'>
          <div className="bell_icon">
            {Icon.Bell}
            {notificationCount != 0 && <span className="notification_count">{notificationCount}</span>}
          </div>
          <div className='HeaderProfile'>
            <img className='ProfileAvatar' src="/img/OIP.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeaderforStudio() {

  const [notificationCount, setNotificationCount] = React.useState(4);
  return (
    <div className='HeaderBeforeLogin'>
      <div className='logo'>
        <Link to='/'><img src="/img/Logo.jpg" alt="logo" /></Link>
      </div>
      {/* nhớ sửa thành Link */}
      <div className='HeaderProfileAndLogin'>
        <div className='HeaderProfileAndBell'>
          <nav className='nav'>
            <ul className='ListMenu'>
              {Menu.map((item, index) => (
                <li className='Menu' key={'item' + index}>
                  {item === 'Home'
                    ?
                    <Link to={'/'}>{item}</Link>
                    :
                    <Link to={'/' + item} >{item}</Link>}
                </li>
              ))}
            </ul>
          </nav>
          {/* <div className="upload_button">
            <button><span>{Icon.Plus}</span>Upload</button>
          </div> */}
          <div className="bell_icon">
            {Icon.Bell}
            {notificationCount != 0 && <span className="notification_count">{notificationCount}</span>}
          </div>
          <div className='HeaderProfile'>
            <img className='ProfileAvatar' src="/img/OIP.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}