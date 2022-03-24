import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';

import { Row, Col, Menu } from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import httpUtil from '../config/httpUtil'


const Header = () => {
    const [navArray, setNavArray] = React.useState([])
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_2760859_opqmd2ogjri.js',
    });

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(httpUtil.getTypeInfo).then(
                (res) => {
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    }, [])


    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={13} xl={10}>
                    <span className="header-logo">
                        <Link href='/'><a>啦啦啦</a></Link>
                    </span>
                    <span className="header-txt">前端小白进化记</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={14} lg={10} xl={8}>
                    <Menu mode="horizontal">

                        <Menu.Item key="home" style={{ fontSize: '17px', color: '#999' }}>
                            <Link href={{ pathname: '/' }}><a>
                                <IconFont style={{ fontSize: '18px', marginRight: '5px' }} type="icon-shouye1" />
                                首页
                            </a>
                            </Link>
                        </Menu.Item>

                        {navArray.map(item => {
                            return (
                                <Menu.Item key={item.typeName} style={{ fontSize: '17px', color: '#999' }}>
                                    <Link href={{ pathname: '/list', query: { id: item.Id } }}><a>
                                        <IconFont style={{ fontSize: '18px', marginRight: '5px' }} type={item.icon} />
                                        {item.typeName}
                                    </a>
                                    </Link>
                                </Menu.Item>
                            )
                        })

                        }


                    </Menu>
                </Col>
            </Row>

            <style jsx>
                {`
                .header{
                    background-color: #fff;
                    padding: .4rem;
                    overflow: hidden;
                    height: 3.2rem;
                    border-bottom:1px solid #eee;
                }
                .header-logo{
                    color:#1e90ff;
                    font-size: 1.4rem;
                    text-align: left;
                }
                .header-txt{
                    font-size: 0.6rem;
                    color: #999;
                    display: inline-block;
                    padding-left: 0.3rem;
                }
                .ant-meu{
                    line-height: 2.8rem;
                }
                .ant-menu-item{
                    font-size:1rem !important;
                    padding-left:1rem;
                    padding-right:1rem;
                }


                
                `}
            </style>
        </div>
    )
}
export default Header