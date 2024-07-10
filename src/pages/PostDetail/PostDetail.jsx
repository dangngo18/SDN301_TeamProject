import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../assets/styles/PostDetail.scss';
import Main from '../../ultils/container';
import { API } from '../../config';
// import { SessionContext } from '../../Context';

export default function PostDetail() {
  const [post, setPost] = useState({});
  const [postsRelated, setPostRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();
  // const User = useContext(SessionContext);

  useEffect(() => {
      const abortController = new AbortController();
      const fetchPost = async () => {
        try {
          const res = await fetch(`${API}/style/posts/${postId}`, {
            method: 'GET',
            signal: abortController.signal
          });
          const data = await res.json();
          if (data) {
            setPost(data);
            setIsLoading(false);
            const res2 = await fetch(`${API}/style/posts/user?userId=${data.user.userId}&limit=4`, {
              method: 'GET',
            });
            const data2 = await res2.json();
            if (data2) {
              setPostRelated(data2);
            }
          }
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchPost();
      return () => {
        abortController.abort()
      }
  }, []); // Đảm bảo effect chạy lại khi postId thay đổi

  return (
    <Main>
      <div>
        <div className='blog_layout'>
          {isLoading ? (
            <div>Loading</div>
          ) : (
            <Post PostProp={post} postsRelated={postsRelated} />
          )}
        </div>
      </div>
    </Main>
  );
}