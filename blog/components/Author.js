import { Avatar, Divider, Menu, Dropdown } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'

const Author = () => {
    const GIT = (
        <Menu>
            <Menu.Item>
                <span>Git:https://github.com/Amo-xm</span>
            </Menu.Item>
        </Menu>
    )
    const QQmenu = (
        <Menu>
            <Menu.Item>
                <span>QQ:   335452774</span>
            </Menu.Item>
        </Menu>
    );
    const Wechat = (
        <Menu>
            <Menu.Item>
                <span>微信:   LMF-0424</span>
            </Menu.Item>
        </Menu>
    )

    return (
        <>
            <div className="author-div comm-box">
                <div> <Avatar size={100} src='https://avatars.githubusercontent.com/u/73658138?s=400&v=4' /></div>
                <div className="author-introduction">
                    程序员小白，正在学习前端的道路上摸爬滚打，让我们一起努力！
                    <Divider>社交账号</Divider>
                    <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}>
                        <Dropdown overlay={GIT} placement="topCenter" arrow>
                            <div><a style={{ color: '#999999' }} href="https://github.com/Amo-xm"><GithubOutlined style={{ fontSize: '23px', marginRight: '10px' }} /></a></div>
                        </Dropdown>
                        <div>
                            <Dropdown overlay={QQmenu} placement="topCenter" arrow>
                                <QqOutlined style={{ fontSize: '23px' }} />
                            </Dropdown>
                        </div>
                        <div>
                            <Dropdown overlay={Wechat} placement="topCenter" arrow>
                                <WechatOutlined style={{ fontSize: '23px', marginLeft: '10px' }} />
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                .author-div{
                    text-align: center;
                    padding: 1rem;
                
                }
                .author-div div{
                    margin-bottom: 1rem;
                
                }
                .author-introduction{
                    font-size:.8rem;
                    color: #999;
                }
                .account{
                    background-color: #999;
                    margin-left: .5rem;
                    margin-right: .5rem;
                }


                

            `}
            </style>
        </>
    )

}

export default Author