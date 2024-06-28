import React from 'react'
import { Header, HeaderAfterLogin, HeaderforStudio } from '../../components/Header'
import Footer from '../../components/Footer'
import Post from './Post'
import '../../assets/styles/PostDetail.scss'
export default function PostDetail() {
  return (
    <div>
        <HeaderAfterLogin/>
        <div>
            <div className='blog_layout'>
                <Post/>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
