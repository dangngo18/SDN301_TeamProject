import React from 'react'

export default function MediaCard({media}) {
  return (
    <div className='medialist-img-container'>
        <div className='medialist-profile'>
            <img className='medialist-profile-img' src={media.profileimg} alt="" />
        </div>
        <img className='medialist-img' src={media.image} alt="" />
        <div className='medialist-img-overlay'></div>
        <span className='medialist-profile-name'>
            {media.username}
        </span>

    </div>
  )
}
