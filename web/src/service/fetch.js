import { get, post, formPost } from "../util/post";

const DEV_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://www.huangchufeng.site';

// 发布照片
export const publishImgs = group => {
  return post(`${DEV_URL}/api/imgs/publish`, group);
};

// 上传图片
export const uploadImg = group => {
  return formPost(`${DEV_URL}/api/uploadImg`, group);
};

/*
    请求所有的照片
    /api/imgs
 */
export const fetchImgs = (params) => {
  return get(`${DEV_URL}/api/imgs`, params);
};

// 获取组图
export const fetchGroupImgs = (groupId) => {
  return get(`${DEV_URL}/api/groupImgs`, { groupId });
};

// 获取照片详情
export const getImgDetail = (id, typeNum) => {
  return get(`${DEV_URL}/api/imgs/${id}`, { typeNum });
};

// 删除照片
export const deleteImgById = params => {
  params = {
    _id: params._id,
    imgName: params.imgName,
    groupId: params.group_id
  }
  return get(`${DEV_URL}/api/imgs/${params._id}/remove`, params);
};

// 更新图片浏览量
export const addImgPv = (id, num) => {
  return get(`${DEV_URL}/api/imgs/${id}/addImgPv`, {
    num,
  });
};

// 更新图片喜欢数量
export const addImgFavor = (id) => {
  return get(`${DEV_URL}/api/imgs/${id}/addImgFavor`);
};


export const login = (user) => {
  return post(`${DEV_URL}/api/user/login`, user);
};

export const register = (user) => {
  return post(`${DEV_URL}/api/user/register`, user);
};

// 获取用户likes
export const getLikes = () => {
  return get(`${DEV_URL}/api/user/likes`)
}

// 退出
export const quit = () => {
  return get(`${DEV_URL}/api/user/quit`);
};

// 获取文章列表
export const fetchArticles = (params) => {
  return get(`${DEV_URL}/api/articles`, params);
};

// 获取文章详情
export const getArticleDetail = (id, typeNum) => {
  return get(`${DEV_URL}/api/articles/${id}`, { typeNum });
};

// 创建文章
export const createArticle = article => {
  return post(`${DEV_URL}/api/articles/create`, {
    article
  });
};

// 删除文章
export const deleteArticleById = params => {
  return get(`${DEV_URL}/api/articles/${params.articleId}/remove`, { coverName: params.coverName });
};

// 更新文章
export const updateArticleById = (id, article) => {
  return post(`${DEV_URL}/api/articles/${id}/update`, {
    article,
  });
};

// 更新文章浏览量
export const addArticlePv = (id) => {
  return get(`${DEV_URL}/api/articles/${id}/addArticlePv`);
};

// 更新图片喜欢数量
export const addArticleFavor = (id) => {
  return get(`${DEV_URL}/api/articles/${id}/addArticleFavor`);
};

// 发表评论
export const comment = (id, comment) => {
  return post(`${DEV_URL}/api/${id}/comment`, comment);
};

// 增加新标签
export const createTag = (tag) => {
  return post(`${DEV_URL}/api/articleTags/create`, tag);
};

// 删除标签
export const removeTag = params => {
  return get(`${DEV_URL}/api/articleTags/${params.tagId}/remove`);
};

// 获取所有标签
export const getTags = params => {
  return get(`${DEV_URL}/api/articleTags`);
};

// 获取某篇文章的所有标签
export const getTagsByArticleId = params => {
  return get(`${DEV_URL}/api/articleTags/${params.articleId}`);
};

// 根据标签name获取对应文章
export const getArticlesByTagName = tag => {
  return get(`${DEV_URL}/api/tag/articles`, { tag });
};



// 获取当前城市
export const getLocation = params => {
  return get(`http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js`);
};