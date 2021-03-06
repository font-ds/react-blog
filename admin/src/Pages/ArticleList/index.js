
import React, { useState, useEffect } from 'react';
import './index.css'
import { List, Row, Modal, message, Button, Switch, Col } from 'antd';
import axios from 'axios'
import httpUtil from '../../config/httpUtil'
const { confirm } = Modal;

function ArticleList(props) {
    const [list, setList] = useState([])

    const getList = () => {
        axios({
            method: 'get',
            url: httpUtil.getArticleList,
            withCredentials: true
        }).then(res => {
            console.log(res)
            setList(res.data.data)
        })
    }

    useEffect(() => {
        getList()
    }, [])

    const deleteArticle = (id) => {
        confirm({
            title: '确定删除博客文章吗？',
            content: '如果点击确定，文章将被删除，无法恢复！',
            onOk() {
                axios.get(httpUtil.delArticle + id, { withCredentials: true }).then(
                    res => {
                        message.success('文章删除成功')
                        getList()
                    }
                )
            },
            onCancel() {
                message.success('文章未变化')
            }
        })
    }

    const updateArticle = (id) => {
        props.history.push('/index/add/' + id)
    }

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={7}>
                            <b>标题</b>
                        </Col>
                        <Col span={5}>
                            <b>封面图</b>
                        </Col>
                        <Col span={3}>
                            <b>编号</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => {
                    return (
                        <List.Item>
                            <Row className="list-div">
                                <Col span={7}>
                                    {item.title}
                                </Col>
                                <Col span={5}>
                                    <a href={item.imagePath}>
                                    <img src={item.imagePath}></img>

                                    </a>
                                </Col>
                                <Col span={3}>
                                    {item.id}
                                </Col>
                                <Col span={3}>
                                    {item.typeName}
                                </Col>
                                <Col span={3}>
                                    {item.addTime}
                                </Col>

                                <Col span={3}>
                                    <Button type="primary" onClick={() => updateArticle(item.id)} >修改</Button>&nbsp;

                                    <Button onClick={() => deleteArticle(item.id)}>删除 </Button>
                                </Col>
                            </Row>

                        </List.Item>
                    )
                }}
            />

        </div>
    )

}

export default ArticleList