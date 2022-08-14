import React from 'react';
import { useNavigate } from 'react-router';

import CONS from '../../utils/Constants';
import en from '../../utils/En';
import { doSetForwardslash as dsf } from '../../utils/Globals';
import Posts from '../posts/Posts';

const MyPost = () => {
  const navigate = useNavigate();
  const posts = JSON.parse(localStorage.getItem('myPosts'));

  return (
    <div className="bg-inherit">
      {posts.length > 0 && (
        <div className="relative">
          <div className="flex justify-center text-center font-bold mt-20 mx-20 p-2 italic bg-white ">{en.myPost.toUpperCase()}</div>
          <div
            className="absolute mx-20 right-0 rounded-md bg-blue-800 text-xs text-white py-2 px-2 text-center w-fit top-20 cursor-pointer"
            onClick={() => navigate(dsf(true, CONS.STR_POST, CONS.STR_ADDPOST))}
          >
            +<span className="text-gray-300">{' ' + en.newPost}</span>
          </div>

          <Posts posts={posts} />
        </div>
      )}
    </div>
  );
};

export default MyPost;
