import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import CONS from '../../utils/Constants';
import { doSetForwardslash as dsf } from '../../utils/Globals';

const Post = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded xs:w-fit bg-white md:lg:w-1/3 sm:w-1 pl-5 pr-2 pt-10 pb-10 mt-0">
      <div className="font-bold text-sm cursor-pointer hover:text-yellow-800" onClick={() => navigate(dsf(true, CONS.STR_POST, post.id))}>
        {post.title}
      </div>
      <div className="flex flex-wrap first-letter:font-bold overflow-hidden overflow-ellipsis my-5 line-clamp-3 text-gray-500">{post.body}</div>
      <ReadMoreBtn path={`/post/${post.id}`} />
    </div>
  );
};

function ReadMoreBtn({ path }) {
  return (
    <Link to={path} className="bg-blue-500 text-white mt-5 mb-0 rounded p-2 font-medium-md hover:bg-blue-700">
      Read more
    </Link>
  );
}

export default Post;
