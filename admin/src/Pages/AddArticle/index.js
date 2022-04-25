import React, { useState } from 'react';
import marked from 'marked'
import './index.css'
import { Row, Col, Input, Select, Button, DatePicker, message,Upload } from 'antd'
import {useHistory} from 'react-router-dom'
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'
import httpUtil from '../../config/httpUtil'
const { Option } = Select;
const { TextArea } = Input

function AddArticle(props) {
    let history=useHistory()
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState(1) //选择的文章类别
    const [success, setSuccess] = useState(false)
    const [picConteng,setPicContent] = useState(null)

    React.useEffect(() => {
        axios.get(httpUtil.getTypeInfo).then(res => {
            setTypeInfo(res.data.data)
            setSuccess(true)
        })
        let tmpId = props.match.params.id
        if (tmpId) {
            setArticleId(tmpId)
            getArticleById(tmpId)

        }
    }, [])


    const renderMD = new marked.Renderer()
    renderMD.image=function(href){
        return `<div className='imgDiv'><a href=${href} target='_blank'><img style="width:100%" src=${href}></img></a></div>`
    }
    // console.log(renderMD)
    
    marked.setOptions({
        renderer: renderMD,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const changeTypeName = (value) => {
        setSelectType(value)

    }

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const saveArticle = () => {
        if (!selectedType) {
            message.error('必须选择文章类型')
            return false
        } else if (!articleTitle) {
            message.error('文章标题不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('文章简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }


        let formData = new FormData()
        formData.append('type_id',selectedType )
        formData.append('title', articleTitle)
        formData.append('article_content', articleContent)
        formData.append('introduce', introducemd)
        formData.append('addTime', showDate)
        if(picConteng === null){
        formData.append('imagepath', null)
        }
        else{
            formData.append('imagepath', JSON.stringify(picConteng))
        }


        if (articleId === 0) {
            axios({
                method: 'post',
                url: httpUtil.addArticle,
                data: formData,
                withCredentials: true
            }).then(res => {
                setArticleId(res.data.insertId)
                if (res.data.isSuccess) {
                    console.log(res)
                    message.success('文章添加成功')
                    history.push('/index/list')
                } else {
                    message.error('文章添加失败')
                }
            })
        } else {
            // dataProps.id = articleId
            // axios({
            //     method: 'post',
            //     url: httpUtil.updateArticle,
            //     data: dataProps,
            //     withCredentials: true
            // }).then(res => {
            //     if (res.data.isSuccess) {
            //         message.success('文章保存成功')
            //     } else {
            //         message.error('文章保存失败')
            //     }
            // })
        }
    }

    const getArticleById = (id) => {
        axios(httpUtil.getArticleById + id, { withCredentials: true }).then(
            res => {
                setSuccess(false)
                let articleInfo = res.data.data[0]
                setArticleTitle(articleInfo.title)
                setArticleContent(articleInfo.article_content)
                let chtml = marked(articleInfo.article_content)
                setMarkdownContent(chtml)
                setIntroducemd(articleInfo.introduce)
                let html = marked(articleInfo.introduce)
                setIntroducehtml(html)
                setSelectType(articleInfo.typeId)
                setShowDate(articleInfo.addTime)
                setSuccess(true)
            }
        )
    }

    const upload=(value)=>{
        setPicContent(value.file)
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                onChange={e => { setArticleTitle(e.target.value) }}
                                size="large" />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            {success === true ?
                                <Select defaultValue={selectedType} size="large" onChange={changeTypeName}>
                                    {typeInfo.map((item, index) => {
                                        return <Option key={index} value={item.Id}>{item.typeName}</Option>
                                    })}
                                </Select>
                                : ""
                            }
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                value={articleContent}
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                placeholder="文章内容"
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }}>

                            </div>

                        </Col>
                    </Row>

                </Col>

                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                rows={8}
                                placeholder="文章简介"
                                value={introducemd}
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                            />
                            <br /><br />
                            <div className="introduce-html" dangerouslySetInnerHTML={{ __html: introducehtml }}></div>
                        </Col>
                        <Col span={24}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={(date, dateString) => { setShowDate(dateString); console.log(dateString, date); }}
                                />
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className='upload-pic'>
                                添加封面图片：<Upload
                                    onChange={upload}
                                    listType="picture"
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </div>
                      
                        </Col>
                    </Row>

                </Col>
            </Row>
        </div>
    )
}
export default AddArticle