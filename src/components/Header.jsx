import React from 'react'
import {Icon} from '../assets/icon/icons';
export function Header() {
  const [search, setSearch] = React.useState('');
  const Menu = ["Home", "Style", "Shop"]
  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  }
  return (
    <div className='HeaderBeforeLogin'>
      <div className='logo'>
        <img src="./img/Logo.jpg" alt="logo" />
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
              <li className='Menu' key={'item' + index}>{item}</li>
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
  const Menu = ["Home", "Style", "Shop"]
  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  }
  return (
    <div className='HeaderBeforeLogin'>
      <div className='logo'>
        <img src="./img/Logo.jpg" alt="logo" />
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
              <li className='Menu' key={'item' + index}>{item}</li>
            ))}
          </ul>
        </nav>
        <div className='HeaderProfileAndBell'>
          {Icon.Bell}
          <div className='HeaderProfile'>
            <img className='ProfileAvatar' src="./img/OIP.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeaderforStudio() {
  const Menu = ["Home", "Style", "Shop"]
  return (
    <div className='HeaderBeforeLogin'>
      <div className='logo'>
        <img src="./img/Logo.jpg" alt="logo" />
      </div>
      {/* nhớ sửa thành Link */}
      <div className='HeaderProfileAndLogin'>
        <div className='HeaderProfileAndBell'>
          <nav className='nav'>
            <ul className='ListMenu'>
              {Menu.map((item, index) => (
                <li className='Menu' key={'item' + index}>{item}</li>
              ))}
            </ul>
          </nav>
          <div className="upload_button">
            <button><span>{Icon.Plus}</span>Upload</button>
          </div>
          <div className="bell_icon">
            {Icon.Bell}
          </div>
          <div className='HeaderProfile'>
            <img className='ProfileAvatar' src="./img/OIP.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}