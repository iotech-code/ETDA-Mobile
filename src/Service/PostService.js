import HttpRequest from './HttpRequest';

const http = new HttpRequest();
http.autoSetTokenHeader();

export const homeFeed = async () => {
  return await http.get('/api/backend/post/home-feed');
};

export const getTagsList = async () => {
  return await http.get('/api/backend/post/tag-list');
};

export const createPost = async (
  post_title,
  post_type,
  post_images,
  post_description,
  post_tag,
  post_addition_data,
) => {
  let formData = {
    post_title,
    post_type,
    post_images,
    post_description,
    post_tag,
    post_addition_data,
  };
  let result = await http.post(`/api/backend/post/create`, formData);
  return result;
};
