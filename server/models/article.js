const moment = require('moment');
const Article = require('../lib/mongo').Article;
const ArticleTagModel = require("./articleTag");
const CommentModel = require("./comment");
module.exports = {
    // 获取所有文章
    getArticles: function getArticles(type, pageNum, pageSize, author) {
        var query = {}, skip = 0, limit = pageSize;
        if (author) {
            query.author = author;
        }
        if(type !== 'undefined') {
            query.type = Number(type)
        }
        skip = (pageNum - 1) * limit
        return Article
        .find(query, { content: 0 })
        // .populate({ path: 'author', model: 'User' })
        .sort({ created_at: -1 })
        .limit(limit)
        .skip(skip)
        .exec();
    },

    // 按id获取单个文章
    getArticleById: function getArticleById(id) {
        var query = {};
        if (id) {
            query._id = id;
        }
        return Article
        .find(query)
        .exec();
    },

    // 通过类型获取所有文章数量
    getArticleCount: function getArticleCount(type) {
        let query = type ? { type: type } : {}
        return Article.count(query).exec();
    },

    /**
     *  上一篇或下一篇
     *  curId: 当前文章id
     *  typeNum: -1表示上一篇, 1表示下一篇
     **/
    getLastOrNextArticle: function getLastOrNextArticle(curId, typeNum) {
        var query = {}; 
        if (curId) {
            // console.log(typeNum === '1' ? '下一篇' : '上一篇')
            query = typeNum === '1' ? { '_id': { '$lt': curId }} : { '_id': { '$gt': curId }} ;
        }
        return Article
        .find(query)
        .sort({_id: -1})
        .limit(1)
        .exec();
    },

    // 更新文章浏览量
    addArticlePv: function addArticlePv(articleId) {
        return Article.update({ _id: articleId }, { $inc:{ pv: 1 }}).exec();
    },
    /** 
     * 更新文章喜欢数量
     * @type 0 删除, 1 增加
     **/
    addArticleFavor: function addArticleFavor(articleId, type) {
        if(type === 0) {
        return Article.update({ _id: articleId }, { $inc: { likes: -1 } }).exec();
        }
        return Article.update({ _id: articleId }, { $inc: { likes: 1 } }).exec();
    },

    // 创建文章
    create: function create(article) {
        article.created_at = moment().format('YYYY-MM-DD HH:mm');
        let tags = article.tags;
        return Article.create(article)
            .exec()
            .then(function(res) {
                // 关联文章标签
                if (res.result.ok && res.result.n > 0) {
                    let articleId = res.ops[0]._id;
                    return Promise.all(tags.map(tag => {
                        return ArticleTagModel.connectAritcle(articleId, tag);
                    }))
                  }
            })
    },

    // 删除文章
    delArticleById: function delArticleById(id) {
        return Article.remove({ _id: id })
          .exec()
          .then(function (res) {
            // 文章删除后，再删除该文章下的所有留言和标签
            if (res.result.ok && res.result.n > 0) {
              return Promise.all([
                CommentModel.delCommentsById(id),
                ArticleTagModel.delTagsByArticleId(id)
              ])
            }
        });
    },

    // 编辑文章
    updateArticleById: function updateArticleById(id, data) {
        let tags = data.tags;
        data.created_at = moment().format('YYYY-MM-DD HH:mm');
        return Article.update({ _id: id }, { $set: data })
        .exec()
        .then(function (res) {
            // 文章更新后，再更新该文章下的所有标签
            if (res.result.ok && res.result.n > 0) {
              return Promise.all([
                ArticleTagModel.delTagsByArticleId(id),
                ...tags.map(tag => {
                    return ArticleTagModel.connectAritcle(id, tag);
                })
              ])
            }
        });
    }
}