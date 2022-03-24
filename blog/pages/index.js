import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { Row, Col, List } from 'antd'
import httpUtil from '../config/httpUtil'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'


const Home = (list) => {

  const [mylist, setMylist] = React.useState(list.data)

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
        {/* <script src="https://eqcn.ajz.miesnfu.com/wp-content/plugins/wp-3d-pony/live2dw/lib/L2Dwidget.min.js"></script> */}
        {/* <script >
          {
            `
            L2Dwidget.init({
              "model": {
                  jsonPath:
                      "https://unpkg.com/live2d-widget-model-haruto@1.0.5/assets/haruto.model.json",
                  "scale": 1
              }, "display": {
                  "position": "left", "width": 110, "height": 200,
                  "hOffset": 10, "vOffset": -10
              }, "mobile": { "show": true, "scale": 0.5 },
              "react": { "opacityDefault": 1, "opacityOnHover": 0.1 }
          });
            `
          }
        </script> */}

      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={4} >
          <Author />
        </Col>

        <Col className="comm-right" xs={24} sm={24} md={16} lg={18} xl={14} >
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item key={item.title}>
                  <div className="list-title"><Link href={{ pathname: '/detailed', query: { id: item.id } }}><a>{item.title}</a></Link></div>
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
            pre{
              display: block;
              background-color: #283646 !important;
               padding: .5rem !important;
               overflow-y: auto;
               font-weight: 300;
               font-family: Menlo, monospace;
               border-radius: .3rem;
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
          
          .list-context img{
             width:100% ;
             border-radius:5px;
             border:1px solid #f0f0f0;
             max-width:1000px !important;
             display: block;
             margin:8px  auto ;
          
          }
          

                `}

      </style>
    </>
  )

}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(httpUtil.getArticleList).then(res => {
      resolve(res.data)
    })
  })
  return await promise
}

export default Home