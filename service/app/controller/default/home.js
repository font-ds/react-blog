'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'success'
    }

    async getArticleList() {

        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.addTime as addTime,' +
            'type.typeName as typeName, ' +
            'article.imagePath as imagePath ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id'

        const results = await this.app.mysql.query(sql)
        this.ctx.body = { data: results }
    }

    async getArticleById() {

        let id = this.ctx.params.id

        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "article.addTime as addTime," +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id



        const result = await this.app.mysql.query(sql)


        this.ctx.body = { data: result }
    }

    async getListById() {
        let id = this.ctx.params.id

        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.addTime as addTime,' +
            'type.typeName as typeName, ' +
            'article.imagePath as imagePath ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.type_id=' + id

        const results = await this.app.mysql.query(sql)
        this.ctx.body = { data: results, id }
    }

    async getTypeInfo() {
        const result = await this.app.mysql.select('type')
        this.ctx.body = { data: result }
    }
}

module.exports = HomeController;
