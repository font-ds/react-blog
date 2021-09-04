import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './index.css'
import { Route, Router } from "react-router-dom";
import AddArticle from '../AddArticle'
import ArticleList from '../ArticleList'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props) {

    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    const handleClickArticle = e => {
        if (e.key === 'addArticle') props.history.push('/index/add')
        else props.history.push('/index/list')
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" >Blog后台管理系统</div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <span>工作台</span>
                    </Menu.Item>
                    <Menu.Item key="addArticle" onClick={handleClickArticle}>
                        <span>添加文章</span>
                    </Menu.Item>

                    <Menu.Item key="articleList" onClick={handleClickArticle}>
                        <span>文章列表</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>

                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <div>

                            <Route path="/index/" exact component={AddArticle} />
                            <Route path="/index/add" exact component={AddArticle} />
                            <Route path="/index/list" exact component={ArticleList} />
                            <Route path="/index/add/:id" exact component={AddArticle} />

                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Fong.com</Footer>
            </Layout>
        </Layout>
    )

}

export default AdminIndex