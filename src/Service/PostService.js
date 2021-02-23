import HttpRequest from './HttpRequest';

const http = new HttpRequest();

export const homeFeed = async (cr = 0, next = 0) => {
    await http.setTokenHeader();
    return await http.post('/api/backend/post/home-feed', { "currentPage": cr, "nextPage": next });
};

export const getListPostPoll = async (cr = 0, next = 0) => {
    await http.setTokenHeader();
    return await http.post('/api/backend/post/list-poll', { "currentPage": cr, "nextPage": next });
};


export const getListPostSurvey = async (cr = 0, next = 0) => {
    await http.setTokenHeader();
    return await http.post('/api/backend/post/list-survey', { "currentPage": cr, "nextPage": next });
};


export const communityFeed = async (cr = 0, next = 0) => {
    await http.setTokenHeader();
    return await http.post('/api/backend/post/community-feed', { "currentPage": cr, "nextPage": next });
};
export const myFeed = async (cr = 0, next = 0) => {
    await http.setTokenHeader();
    return await http.post('/api/backend/post/my', { "currentPage": cr, "nextPage": next });
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


export const createPoll = async (
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
    return await http.post(`/api/backend/post/create-poll`, formData);
};

export const createSurvey = async (
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
    return await http.post(`/api/backend/post/create-survey`, formData);
};

export const updatePost = async (params) => {
    await http.setTokenHeader()
    return await http.put(`/api/backend/post/update/${params.post_id}`, params)
}

export const updateEvent = async (
    post_id,
    post_title,
    post_type,
    post_images,
    post_description,
    post_tag,
    post_addition_data,) => {
    await http.setTokenHeader()
    let formData = {
        post_title,
        post_type,
        post_images,
        post_description,
        post_tag,
        post_addition_data,
    };
    return await http.put(`/api/backend/post/update-event/${post_id}`, formData)
}



export const getListCommentPost = async (params) => {
    await http.setTokenHeader()
    return await http.post('/api/backend/post/get-comment', params)
}

export const createCommentPost = async (post_id, reply_to, message) => {
    await http.setTokenHeader()
    return await http.post('/api/backend/post/comment', { post_id, reply_to, message })
}


export const getListApprove = async (cr = 0, next = 0) => {
    await http.setTokenHeader()
    return await http.post('/api/backend/post/approve-list', { "currentPage": cr, "nextPage": next })
}

export const approvePost = async (params) => {
    // params is  post_id in array such {post_id: [1,2,4]}
    await http.setTokenHeader()
    return await http.post('/api/backend/post/approve', params)
}

export const actionLikePost = async (params) => {
    // params is post_id of action like post. Example => {post_id:1}
    await http.setTokenHeader()
    return await http.post('/api/backend/post/like', params)
}

export const actionFollowPost = async (params) => {
    // params is post_id of action like post. Example => {post_id:1}
    await http.setTokenHeader()
    return await http.post('/api/backend/post/follow', params)
}

export const actionJoinPost = async (params) => {
    // params is post_id of action like post. Example => {post_id:1}
    await http.setTokenHeader()
    return await http.post('/api/backend/post/join', params)
}

export const postAction = async (params) => {
    await http.setTokenHeader()
    return await http.post('/api/backend/post/action', params)
}

export const actionDeletePost = async (post_id) => {
    await http.setTokenHeader()
    return await http.delete(`/api/backend/post/delete/${post_id}`)
}

export const actionPostJoin = async (post_id) => {
    await http.setTokenHeader()
    return await http.post('/api/backend/post/join', { post_id })
}

export const actionPostUnJoin = async (post_id) => {
    await http.setTokenHeader()
    return await http.post('/api/backend/post/unjoin', { post_id })
}

export const getPollStat = async (post_id) => {
    await http.setTokenHeader()
    return await http.post('/api/backend/post/poll-stat', { post_id })
}

export const getSurveyStat = async (post_id) => {
    await http.setTokenHeader()
    return await http.post('/api/backend/post/survey-stat', { post_id })
}