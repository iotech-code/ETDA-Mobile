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
    // post_addition_data.post_to_etda = true
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

export const updatePost = async (params) => {
    await http.setTokenHeader()
    return await http.put(`/api/backend/post/update/${params.post_id}`, params)

}


export const getListCommentPost = async (params) => {
    await http.setTokenHeader()
    return await http.post('/api/backend/post/get-comment', params)
}

export const createCommentPost = async (post_id, reply_to, message) => {
    await http.setTokenHeader()
    return await http.post('/api/backend/post/comment', { post_id, reply_to, message })
}