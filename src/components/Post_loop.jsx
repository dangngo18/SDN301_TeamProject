import React from 'react'
import {Icon} from '../assets/icon/icons'

export function PostLoop() {
  return (
    <div>Post_loop</div>
  )
}

export function PostLoopTab({ Posts }) {
  return (
    Posts.map((post,index) => {
      return (
        <div key={index} className='Post_card1'>
          <a href={`/post/id:${post.id}`}>
          <div className='Post_card1_img'>
            <picture>
              <img src={post.image[0].url} alt="" />
            </picture>
            <div className="Post_card1_img_likeNumber">
              {Icon.Heart}
              <span>{formatNumber(post.like_number)}</span>
            </div>
            <span className="imageType">
                {post.image.length > 1 ? Icon.MultiImage : ""}
                {post.type === 1 ? Icon.PlayIcon : ""}
            </span>
          </div>
          </a>
        </div>
      )
    }
    )
  );
}
function formatNumber(number) {
  if (number >= 1000000000){
    return (number / 1000000000).toFixed(1) + 'T';
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}