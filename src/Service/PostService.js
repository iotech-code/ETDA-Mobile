import HttpRequest from './HttpRequest'

const http = new HttpRequest();
http.autoSetTokenHeader();

export const homeFeed = async () => {
    return await http.get('/api/backend/post/home-feed')
}

export const getTagsList = async () => {
    return await http.get('/api/backend/post/tag-list')
}


export const createPost = async ({ title, type, images, description, tags, addition }) => {
    const data = {
        "post_title": title,
        "post_type": type,
        "post_images": images,
        "post_description": description,
        "post_tag": tags,
        "post_addition_data": addition
    }
    return await http.post(`/api/backend/post/create`, data)

}