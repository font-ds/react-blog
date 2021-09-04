let ipUrl = 'http://127.0.0.1:7001/admin/'

let httpUtil = {
    getTypeInfo: ipUrl + 'getTypeInfo',
    checkLogin: ipUrl + 'checkLogin',  //  检查用户名密码是否正确
    addArticle: ipUrl + 'addArticle',
    updateArticle: ipUrl + 'updateArticle',
    getArticleList: ipUrl + 'getArticleList',
    delArticle: ipUrl + 'delArticle/',
    getArticleById: ipUrl + 'getArticleById/'
}

export default httpUtil