import React from 'react'
import { Header, HeaderAfterLogin, HeaderforStudio } from '../../components/Header'
import Footer from '../../components/Footer'
import Post from './Post'
import '../../assets/styles/PostDetail.scss'
import Main from '../../ultils/container'
export default function PostDetail() {
  return (
    <Main>
      <div>
        <div className='blog_layout'>
          <Post />
        </div>
      </div>
    </Main>
  )
}
