import { sleep, httpRequest } from './base';
import CONS from '../utils/Constants';
import fld from '../utils/FieldNames';
import { doSetFullUrl as dfu } from '../utils/Globals';
import HM from '../utils/HttpVerbs';
import ErrorOnRequests from '../utils/ErrorOnRequests';

export const createPost = async (data) => {
  await sleep(2000);
  const { userId, title, body } = data;

  try {
    const json = {
      [fld.USERID]: userId,
      [fld.TITLE]: title,
      [fld.BODY]: body,
    };

    //sending post request to url/posts
    const res = await httpRequest(dfu(true, CONS.STR_POSTS), HM.POST, json);

    return res;
  } catch (error) {
    return ErrorOnRequests(error);
  }
};

//get all posts
export const getPosts = async () => {
  await sleep(2000);
  try {
    //sending get request to url/posts
    const res = await httpRequest(dfu(true, CONS.STR_POSTS), HM.GET, false);
    return res;
  } catch (error) {
    return ErrorOnRequests(error);
  }
};

//get a signgle post by id
export const getPostById = async (postId) => {
  await sleep(2000);
  try {
    //sending get request to url/posts/:postId
    const res = await httpRequest(dfu(true, CONS.STR_POSTS, postId), HM.GET, false);
    return res;
  } catch (error) {
    return ErrorOnRequests(error);
  }
};

//get a comments per post by id
export const getCommentsByPostId = async (postId) => {
  await sleep(2000);
  try {
    //sending get request to url/posts/:postId
    const res = await httpRequest(dfu(true, CONS.STR_POSTS, postId, CONS.STR_COMMENTS), HM.GET, false);
    return res;
  } catch (error) {
    return ErrorOnRequests(error);
  }
};

export const patchPost = async (data, postId) => {
  await sleep(2000);
  try {
    //sending put request to url/posts/:id
    const res = await httpRequest(dfu(true, CONS.STR_POSTS, postId), HM.PUT, data);

    return res;
  } catch (error) {
    return ErrorOnRequests(error);
  }
};

export const deletePost = async (postId) => {
  await sleep(2000);
  try {
    //sending delete request to /api/oils/:id
    const res = await httpRequest(dfu(true, CONS.STR_POSTS, postId), HM.DELETE, false);

    return res;
  } catch (error) {
    return ErrorOnRequests(error);
  }
};
