import React from 'react';
import Post from '../post/Post';

const Posts = ({ posts }) => {
  return <div className="flex flex-wrap m-20 xs:m-0">{posts && posts.length > 0 && posts.map((p, index) => <Post post={p} key={index} />)}</div>;
};

export default Posts;
