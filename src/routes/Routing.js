import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import AddPost from '../pages/addpost/AddPost';

import AllPost from '../pages/AllPost';
import MyPost from '../pages/myposts/MyPost';
import SinglePost from '../pages/singlepost/SinglePost';

const Routing = () => {
  return (
    <React.Fragment>
      <div className="bg-gray-300 sticky top-0">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<AllPost />} exact />
        <Route path="/post/:postId" element={<SinglePost />} exact />
        <Route path="/post/myposts" element={<MyPost />} exact />
        <Route path="/post/add-post" element={<AddPost />} exact />
      </Routes>
    </React.Fragment>
  );
};

export default Routing;
