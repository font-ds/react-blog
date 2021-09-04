'use strict'

const Controller = require('egg').Controller

class MainController extends Controller {

    async index() {
        this.ctx.body = 'success'
    }

    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin WHERE userName = '" + userName +
            "' AND password = '" + password + "'"

        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            this.ctx.body = { 'data': '登录成功' }

        } else {
            this.ctx.body = { data: '登录失败' }
        }
    }

    async addArticle() {
        let data = this.ctx.request.body
        const result = await this.app.mysql.insert('article', data)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId
        }
    }

    async updateArticle() {
        let data = this.ctx.request.body
        const result = await this.app.mysql.update('article', data)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }

    async delArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', { 'id': id })
        this.ctx.body = { data: res }
    }

}

module.exports = MainController