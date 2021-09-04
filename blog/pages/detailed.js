import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import httpUtil from '../config/httpUtil'

import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'

const Detailed = (props) => {

    const renderer = new marked.Renderer()

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value
        }
    })

    let markdown = props.article_content

    let html = marked(props.article_content)

    return (
        <>
            <Head>
                <title>Detailed</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={4} >
                    <Author />
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <MarkNav
                                className="article-menu"
                                source={markdown}
                                ordered={false}
                            />
                        </div>
                    </Affix>
                </Col>

                <Col className="comm-right" xs={24} sm={24} md={16} lg={18} xl={14} >
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <div>
                            <div className="detailed-title">
                                React实战视频教程-技术胖Blog开发(更新08集)
                            </div>

                            <div className="list-icon center">
                                <span> 2019-06-28</span>
                                <span>视频教程</span>
                                <span>5498人</span>
                            </div>

                            <div className='detailed-content'
                                dangerouslySetInnerHTML={{ __html: html }}
                            >

                            </div>
                        </div>

                    </div>

                </Col>
            </Row>
            <Footer />
            <style jsx>
                {`
                .bread-div{
                    padding: .5rem;
                    border-bottom:1px solid #eee;
                    background-color: #e1f0ff;
                }
                .detailed-title{
                    font-size: 1.8rem;
                    text-align: center;
                    padding: 1rem;
                }
                .center{
                    text-align: center;
                }
                .detailed-content{
                    padding: 1.3rem;
                    font-size: 1rem;
                }
                pre{
                    display: block;
                    background-color:#f3f3f3;
                     padding: .5rem !important;
                     overflow-y: auto;
                     font-weight: 300;
                     font-family: Menlo, monospace;
                     border-radius: .3rem;
                }
                pre{
                    background-color: #283646 !important;
                }
                pre >code{
                    border:0px !important;
                    background-color: #283646 !important;
                    color:#FFF;
                
                }
                code {
                    display: inline-block ;
                    background-color:#f3f3f3;
                    border:1px solid #fdb9cc;
                    border-radius:3px;
                    font-size: 12px;
                    padding-left: 5px;
                    padding-right: 5px;
                    color:#4f4f4f;
                    margin: 0px 3px;
                
                }
                
                .title-anchor{
                    color:#888 !important;
                    padding:4px !important;
                    margin: 0rem !important;
                    height: auto !important;
                    line-height: 1.2rem !important;
                    font-size: .7rem !important;
                    border-bottom: 1px dashed #eee;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .active{
                    color:rgb(30, 144, 255) !important;
                }
                .nav-title{
                    text-align: center;
                    color: #888;
                    border-bottom: 1px solid rgb(30, 144, 255);
                
                }
                .article-menu{
                    font-size:12px;
                }
                iframe{
                    height: 34rem;
                }
                .detailed-content  img{
                    width: 100%;
                    border:1px solid #f3f3f3;
                }
                .title-level3{
                    display: none !important;
                }
                .ant-anchor-link-title{
                    font-size: 12px !important;
                }
                .ant-anchor-wrapper{
                    padding: 5px !important;
                }
                

                

            `}
            </style>
        </>
    )
}

Detailed.getInitialProps = async (context) => {
    const promise = new Promise(resolve => {
        axios(httpUtil.getArticleById + context.query.id).then(res => {
            resolve(res.data.data[0])
        })
    })
    return await promise
}

export default Detailed