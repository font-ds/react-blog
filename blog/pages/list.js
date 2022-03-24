import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import { Row, Col, List, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import httpUtil from '../config/httpUtil'

const MyList = (list) => {
    const [mylist, setMylist] = React.useState(list.data)
    React.useEffect(() => {
        setMylist(list.data)
    })

    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        sanitize: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }

    });

    return (
        <>
            <Head>
                <title>关一方的博客</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={4} >
                    <Author />
                </Col>

                <Col className="comm-right" xs={24} sm={24} md={16} lg={18} xl={14} >
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><Link href="/">首页</Link></Breadcrumb.Item>
                                <Breadcrumb.Item>{list.id === '1' ? '文章' : list.id === '2' ? '题库' : '生活'}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <List
                            header={<div>最新日志</div>}
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item key={item.title}>
                                    <div className="list-title"><Link href={{ pathname: '/detailed', query: { id: item.id } }}>{item.title}</Link></div>
                                    <div className="list-icon">
                                        <span> {item.addTime}</span>
                                        <span> {item.typeName}</span>
                                    </div>
                                    <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>
            </Row>
            <Footer />

            <style jsx>
                {`
                .list-title{
                  font-size:1.3rem;
                  color: #1e90ff;
                  padding: 0 0.5rem;
              }
              .list-context{
                  color:#777;
                  padding:.5rem;
              }
              .list-icon{
                  padding:.5rem 0;
                  color:#AAA;
              }
              .list-icon span{
                  display: inline-block;
                  padding: 0 10px;
              }
                `}

            </style>
        </>
    )
}

MyList.getInitialProps = async (context) => {

    const promise = new Promise((resolve) => {
        axios(httpUtil.getListById + context.query.id).then(res => {
            resolve(res.data)
        })
    })
    return await promise
}

export default MyList