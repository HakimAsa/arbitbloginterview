import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IoMdNotifications } from 'react-icons/io';
import { CgMenuGridR } from 'react-icons/cg';
import { MdNotStarted } from 'react-icons/md';

import man from '../assets/man.jpg';
import { doSetForwardslash as dsf } from '../utils/Globals';
import CONS from '../utils/Constants';
import en from '../utils/En';

const Header = () => {
  const myPosts = useSelector(({ post }) => post.value.myPosts);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between xs:w-full xs:mx-0 rounded bg-gray-100 sticky top-0 mx-20 mb-4 mt-5 py-3 px-6">
      <div className="flex space-x-10 relative cursor-pointer" onClick={() => navigate('/')}>
        <span>
          <MdNotStarted size="1.2rem" className="flex absolute top-1 bg-blue-800 text-white rounded-full" />
        </span>

        <span className="font-semibold">{en.appTitle}</span>
      </div>
      <div className="flex space-x-5 xs:mt-2">
        <div className="relative mr-10">
          <span className="absolute -top-1">{en.posts}</span>
          <span className="absolute -top-4 ml-8 text-green-400 text-xs pt-1 font-semibold shadow-lg rounded-full">
            {(JSON.parse(localStorage.getItem('myPosts')) && JSON.parse(localStorage.getItem('myPosts')).length) || myPosts.length}
          </span>
        </div>
        <div>
          <IoMdNotifications />
        </div>
        <div>
          <CgMenuGridR onClick={() => navigate(dsf(true, CONS.STR_POST, CONS.STR_MYPOSTS))} />
        </div>
        <div>
          <img src={man} alt="man" className="object-cover rounded-full border border-gray-100 shadow-sm w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Header;
