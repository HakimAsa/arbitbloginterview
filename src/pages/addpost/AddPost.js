import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { BsArrowLeft } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createPost } from '../../apis/postApi';
import { addPost } from '../../store/PostStore';
import Loader from '../../components/Loader';
import en from '../../utils/En';
import { doSetForwardslash as dsf } from '../../utils/Globals';
import CONS from '../../utils/Constants';

const AddPost = () => {
  //useful hooks
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: 1,
      title,
      body,
    };
    setLoading(true);
    const response = await createPost(newPost);
    if (response.status === 201) {
      dispatch(addPost(response.data));
      toast.success(`The post ${title} has been created!`);
      setTitle('');
      setBody('');
      setLoading(false);
      navigate(dsf(true, CONS.STR_POST, CONS.STR_MYPOSTS)); // order to see changes
    } else {
      toast.error(response);
      setLoading(false);
    }
  };
  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="w-1/2 mb-10 m-20 relative">
              <div className="flex ">
                <div className="absolute -left-20 ml-5 mb-10 bg-gray-100 rounded-full p-2 m-2 -top-1">
                  <BsArrowLeft onClick={() => navigate(-1)} />
                </div>
                <div className="absolute -left-5 ml-4 -top-1 mt-1 font-bold ">{en.addPost}</div>
              </div>
            </div>
            <div className="mt-2 m-20 w-1/2">
              <div className="bg-gray-100 mb-5 pb-5">
                <h6 className="mt-5 ml-1 font-semibold">{en.title}</h6>
                <div className="mt-1 m-10 text-justify">
                  <input
                    type="text"
                    className="w-full h-10 rounded-md border-transparent focus:border-none focus:ring-0 first-letter:uppercase"
                    autoFocus={true}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-gray-100 mb-5 pb-10">
                <h6 className="ml-1 font-semibold">{en.detail}</h6>
                <div className="mt-1 m-10 text-justify">
                  <textarea type="text" className="w-full rounded-md first-letter:uppercase" rows={5} required onChange={(e) => setBody(e.target.value)} />
                </div>
              </div>

              <div className="flex float-right">
                <PublishBtn text="Publish" bgColor="bg-blue-800" isDisabled={loading} />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

function PublishBtn({ text, bgColor, isDisabled }) {
  const btnStyling = `flex mr-15 ml-10 font-medium-md text-white cursor-pointer rounded-md ${bgColor} px-4 py-2 hover:bg-sky-700`;
  return (
    <div className="grid grid-cols-1 place-items-center text-xs">
      <button type="submit" className={btnStyling} disabled={isDisabled}>
        <div className="flex flex-row space-x-3 space-y-0">
          <span className="text-gray-300">{text}</span>
        </div>
      </button>
    </div>
  );
}

export default AddPost;
