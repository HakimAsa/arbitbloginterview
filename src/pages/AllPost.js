import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getPosts } from '../apis/postApi';
import Loader from '../components/Loader';
import { setMyPosts, setPosts } from '../store/PostStore';
import en from '../utils/En';
import Posts from './posts/Posts';

const AllPost = () => {
  const [loading, setLoading] = useState(false);
  const posts = useSelector(({ post }) => post.value.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    const fetchPosts = async () => {
      setLoading(true);
      const response = await getPosts();

      if (response.status === 200) {
        if (!isCancelled) {
          response.data && dispatch(setPosts(response.data));
          response.data && dispatch(setMyPosts(response.data));
          setLoading(false);
          toast.success(en.loadedData);
        }
      } else {
        setLoading(false);
        toast.error(response || response.message);
      }
    };
    fetchPosts();

    return () => {
      isCancelled = true;
    };
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader text={en.loading} />
      ) : (
        <div className="flex bg-gray-100">
          <Posts posts={posts} />
        </div>
      )}
    </>
  );
};

export default AllPost;
