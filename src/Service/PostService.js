import HttpRequest from './HttpRequest';

const http = new HttpRequest();

export const homeFeed = async () => {
    await http.setTokenHeader();
    return await http.get('/api/backend/post/home-feed');
};

export const getTagsList = async () => {
    await http.setTokenHeader();
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
    await http.setTokenHeader();
    let formData = {
        post_title,
        post_type,
        post_images,
        post_description,
        post_tag,
        post_addition_data,
    };
    return await http.post(`/api/backend/post/create`, formData);
};

export const updatePost = async (
    post_title,
    post_type,
    post_images,
    post_description,
    post_tag,
    post_addition_data,
    post_id
) => {

    await http.setTokenHeader()
    let formData = {
        post_title,
        post_type,
        post_images,
        post_description,
        post_tag,
        post_addition_data,
    };
    return await http.post(`/api/backend/post/update/${post_id}` , formData)

}
