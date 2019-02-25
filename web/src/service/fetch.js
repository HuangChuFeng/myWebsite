import { get, post, formPost } from "../util/post";
/*
    处理所有网络请求_目前没有和action集成异步数据流，
    使用同步数据流达成类似效果的后遗症应该就是组件耦合性巨高。。
 */

/*
    请求所有的照片
    /api/imgs
 */
export const fetchImgs = id => {
  return get(`http://localhost:3000/api/imgs`);
};

export const login = id => {
  return get(`http://localhost:3000/api/login`);
};

export const fetchArticle = id => {
  return get(`http://localhost:3000/api/articles`);
};

export const createArticle = article => {
  
  return post(`http://localhost:3000/api/articles/create`, {
    article: article
  });
};