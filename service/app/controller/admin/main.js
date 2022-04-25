'use strict'

const Controller = require('egg').Controller
let fs = require('fs')
let mv = require('mv')

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
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { 'data': '登录成功', 'openId': openId }

        } else {
            this.ctx.body = { data: '登录失败' }
        }
    }

    async addArticle() {

        const formData = this.ctx.multipart()
        
        let article={}
        let part
        while ((part = await formData()) != null) {
            if (part.length) {
                // console.log(JSON.parse(formData))
                if (part[0] == 'imagepath') {
                    if(JSON.parse(part[1])===null) {
    
                    }else{
                
                        let filename = JSON.parse(part[1]).name
                        let imgData = JSON.parse(part[1]).thumbUrl.replace(/^data:image\/\w+;base64,/, "");
                        let buffer = Buffer.from(imgData, 'base64')
                        fs.writeFile(filename, buffer, function (err) {
                            if (err) {
                                console.log(err)
                                console.log('保存失败')
    
                            } else {
                                console.log('保存成功')
                                mv(`C:\\Users\\HUAWEI\\Desktop\\myblog\\service\\${filename}`,
                                    `C:\\Users\\HUAWEI\\Desktop\\myblog\\service\\app\\public\\${filename}`,
                                    function (err) {
                                        console.log(err)
                                    })
                            }
                        });
                        article.imagepath = `http://127.0.0.1:7001/public/${filename}`
                    }
                    
                } else {
                    article[part[0]] = part[1]
                }
            } else {

            }
        }

        const result = await this.app.mysql.insert('article', article)
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