import React from 'react'
import { Bell, Search } from '../assets/icon/icons';
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
          <Search />
        </button>
      </div>
      {/* nhớ sửa thành Link */}
      <nav className='nav'>
        <ul className='ListMenu'>
          {Menu.map((item, index) => (
            <li className='Menu' key={'item' + index}>{item}</li>
          ))}
        </ul>
      </nav>
      <button className='LoginButton'>Login</button>
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
          <Search />
        </button>
      </div>
      {/* nhớ sửa thành Link */}
      <nav className='nav'>
        <ul className='ListMenu'>
          {Menu.map((item, index) => (
            <li className='Menu' key={'item' + index}>{item}</li>
          ))}
        </ul>
      </nav>
      <div className='HeaderProfileAndBell'>
        <Bell />
        <div className='HeaderProfile'>
          <img className='ProfileAvatar' src="./img/OIP.png" alt="" />
        </div>
      </div>

    </div>
  )
}
