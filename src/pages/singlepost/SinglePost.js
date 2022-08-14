import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { deletePost, getCommentsByPostId, getPostById, patchPost } from '../../apis/postApi';
import { delPost, editPost, setComments, setCurrentPost } from '../../store/PostStore';
import { doSetForwardslash as dsf } from '../../utils/Globals';
import CONS from '../../utils/Constants';
import en from '../../utils/En';
import Loader from '../../components/Loader';
import Dialog from '../../components/Dialog';

const SinglePost = () => {
  //useful hooks
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [dialog, setDialog] = useState({
    message: '',
    isLoading: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector(({ post }) => post.value.currentPost);
  const comments = useSelector(({ post }) => post.value.comments);
  const currentPost = useSelector(({ post }) => post.value.currentPost);
  const location = useLocation();
  let path = useRef(location.pathname.split('/')[2]);
  path = path.current;

  useEffect(() => {
    let isCancelled = false;
    const getPost = async () => {
      setLoading(true);
      const res = await getPostById(path);
      if (res.status === 200) {
        if (!isCancelled) {
          dispatch(setCurrentPost(res.data));
          const comm = await getCommentsByPostId(path);
          if (comm.status === 200) {
            dispatch(setComments(comm.data));
            setLoading(false);
            if (JSON.parse(localStorage.getItem('myCurrentPost')) && JSON.parse(localStorage.getItem('myCurrentPost')) !== 'undefined') {
              localStorage.removeItem('myCurrentPost'); //todo here
            } else {
              localStorage.setItem('myCurrentPost', JSON.stringify(res.data));
            }

            return toast.success(en.loadedData);
          } else {
            return toast.error(comm || comm.message);
          }
        }
      } else {
        setLoading(false);
        toast.error(res || res.message);
      }
    };
    getPost();
    return () => {
      isCancelled = true;
    };
  }, [path, dispatch]);

  const myCurrentPost = JSON.parse(localStorage.getItem('myCurrentPost'));

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    handleDialog(en.AreYOuSure, true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const response = await patchPost(
      {
        title: title || currentPost.title,
        body: body || currentPost.body,
      },
      currentPost.id
    );
    if (response.status === 200) {
      dispatch(
        editPost({
          id: currentPost.id,

          newPost: {
            title: title || currentPost.title,
            body: body || currentPost.body,
            userId: currentPost.userId,
            id: currentPost.id,
          },
        })
      );
      dispatch(setCurrentPost(response.data));
      setUpdateMode(false);
      setIsUpdating(false);
      toast.success(en.savedChange);
      navigate(dsf(true, CONS.STR_POST, CONS.STR_MYPOSTS)); //redirect to myposts page in to check if changes are effective
    } else {
      toast.error(response);
    }
  };

  const isLoggedIn = () => Number(post.userId) === 1;

  const areUSureDelete = async (choose) => {
    if (choose) {
      setIsDeleting(true);
      const response = await deletePost(currentPost.id);
      if (response.status === 200) {
        dispatch(delPost(currentPost.id));
        handleDialog('', false);
        setIsDeleting(false);
        toast.success(en.deleted);
        navigate(dsf(true, CONS.STR_POST, CONS.STR_MYPOSTS)); //redirect to myposts page in to check if changes are effective
      } else {
        toast.error(response);
        handleDialog('', false);
      }
    } else {
      handleDialog('', false);
    }
  };
  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-1/2 mb-10 m-20 relative">
            <div className="flex ">
              <div className="absolute -left-20 ml-5 mb-10 bg-gray-100 rounded-full p-2 m-2 -top-1">
                <BsArrowLeft onClick={() => navigate(-1)} />
              </div>
              <div className="absolute -left-5 ml-4 top-1 mt-1 font-bold">{updateMode ? en.update : en.posts}</div>
            </div>

            {isLoggedIn() && !updateMode ? (
              <div
                className="absolute right-0 rounded-md bg-blue-800 text-xs text-white py-2 px-2 text-center w-fit -top-1 cursor-pointer"
                onClick={() => navigate(dsf(true, CONS.STR_POST, CONS.STR_ADDPOST))}
              >
                +<span className="text-gray-300">{' ' + en.newPost}</span>
              </div>
            ) : null}
          </div>
          <div className="mt-2 m-20 w-1/2">
            <div className="mt-5">{en.title}</div>
            {updateMode ? (
              <div className="bg-gray-100 mb-5 pb-5">
                <div className="mt-1 m-10 text-justify">
                  <input
                    type="text"
                    defaultValue={myCurrentPost?.title || currentPost.title}
                    className="mt-10 p-2 w-full"
                    autoFocus={true}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 mb-5 pb-5">
                <h1 className="font-bold mt-2 mx-10">{myCurrentPost?.title || post.title}</h1>
              </div>
            )}

            <div>{en.detail}</div>
            {updateMode ? (
              <div className="bg-gray-100 mb-5 pb-10">
                <div className="mt-1 m-10 text-justify">
                  <textarea
                    type="text"
                    className="w-full mt-10"
                    defaultValue={myCurrentPost?.title || currentPost.body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={5}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 mb-5 pb-10">
                <div
                  className="mt-1 m-10 text-justify"
                  dangerouslySetInnerHTML={{
                    __html: myCurrentPost?.body || post.body,
                  }}
                ></div>
              </div>
            )}
            {updateMode && (
              <div className="flex float-right">
                <div className="flex float-right">
                  <button
                    className={`flex mr-15 ml-10 font-medium-md ${
                      isUpdating ? 'cursor-not-allowed' : 'cursor-pointer'
                    } text-white rounded-md px-4 py-1 bg-blue-800 hover:bg-sky-700`}
                    onClick={handleUpdate}
                    disabled={isUpdating}
                  >
                    {en.update}
                  </button>
                </div>
              </div>
            )}
            {isLoggedIn() && !updateMode ? (
              <div className="flex float-right">
                <ActionBtn text={en.delete} bgColor="bg-red-600" bgHover="bg-sky-700" isDisabaled={isDeleting} IconName={FaTrashAlt} onClick={handleDelete} />
                <ActionBtn text={en.update} bgColor="bg-blue-700" bgHover="bg-sky-700" IconName={FaPen} onClick={() => setUpdateMode(true)} />
              </div>
            ) : (
              !updateMode && (
                <div className="flex float-right">
                  <ActionBtn text={en.delete} bgColor="bg-red-600" bgHover="bg-sky-700" IconName={FaTrashAlt} onClick={handleDelete} />
                  <ActionBtn text={en.update} bgColor="bg-blue-700" bgHover="bg-sky-700" IconName={FaPen} onClick={() => setUpdateMode(true)} />
                </div>
              )
            )}
          </div>
          {dialog.isLoading && <Dialog message={dialog.message} onDialog={areUSureDelete} />}
          {!updateMode && (
            <div className="mt-2 m-20 w-1/2">
              <h1 className="font-semibold pt-4 pb-2">{en.comments}</h1>
              {comments.map((c, idx) => (
                <div className="flex mb-1 rounded-md bg-white" key={idx}>
                  <div className="inline-block font-bold text-center align-middle bg-purple-500 text-white w-10 h-10 rounded-full mr-2 ml-2 mt-2 p-2">
                    {c.name.substring(0, 1).toUpperCase()}
                  </div>
                  <div className="w-full">
                    <div className="flex">
                      <div className="mr-8 text-xl text-blue-500">{c.name}</div>
                      {/* for testing purpose */}
                      <div>{new Date().toLocaleDateString()}</div>
                    </div>
                    <div className="m-4 text-sm text-justify capitalize greefirst-letter:font-bold text-black">{c.body}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

function ActionBtn({ text, IconName, bgColor, bgHover, onClick, isDisabaled }) {
  const btnStyling = `flex mr-15 ml-10 font-medium-md text-white hover:${bgHover} rounded-md ${bgColor} px-4 py-2`;
  return (
    <div className="grid grid-cols-1 place-items-center text-xs">
      <button type="submit" className={btnStyling} onClick={onClick} disabled={isDisabaled}>
        <div className="flex flex-row space-x-3 space-y-0">
          <IconName size="0.75rem" className="ml-2 mt-1" />
          <span className="text-gray-300">{text}</span>
        </div>
      </button>
    </div>
  );
}

export default SinglePost;
