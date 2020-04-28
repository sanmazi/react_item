import React, { Component } from 'react'
import axios from 'axios'
import ps from 'querystring'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './images/logo.png'
import './css/Login.less'

const {Item} = Form
/* axios的请求拦截器:
    1.统处理post 请求json编码问题 (转为urlencoded)
    2.统一返回真 正的数据data,而不是axios包装的那个response对象
*/

    axios.interceptors.request.use((config)=>{
   //     1.统处理post 请求json编码问题 (转为urlencoded)
       const {method,data}=config
        //method请求方式   data  输入框输入的用户信息
        //toLowerCase()转换为小写
        //data类型为对象
       if (method.toLowerCase()==="post" && data instanceof Object) {
           //使用querystring将data内容转换为urlencoded  username=admin&password=adminc
        config.data= ps.stringify(data)
       }
   
        return config 

    })
    // ,(error)=>{

    //     console.log(error);
    //     return error 

    // }

export default class Login extends Component {
        //表单验证请求回调
             onFinish = values=>{
                axios.post('/login',ps.stringify(values)).then(
                    response=>{console.log( "成功",response.data)},
                    error=>{console.log('失败',error)}
                )        
             }

            // onFinish = values => {
            //         console.log('Received values of form: ', values);
            //     };
                //密码的验证器（自定义校验）
                pwdValidator = (_,value="")=>{
                    let errMsgArr = []
                    if(!value.trim()) return Promise.reject('密码必须输入！')
                    if(value.length < 4) errMsgArr.push('密码必须大于等于4位')
                    if(value.length > 12)errMsgArr.push('密码必须小于等于12位')
                    if(!(/^\w+$/).test(value)) errMsgArr.push('密码必须是英文、数字、下划线组成！')
                    if(errMsgArr.length !== 0) return Promise.reject(errMsgArr)
                    else return Promise.resolve()
                }

     render() {
        return (
            <div className="login">
            <header>
                <img src={logo} alt='logo'/>
                <h1>商品管理系统</h1>
            </header>
            <section >
                <span className="title">用户登录</span>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    >
                   {/* // 用户名/密码的的合法性要求
                    // 1).必须输入
                    // 2).必须大于等于4位
                    // 3).必须小于等于12位
                    // 4).必须是英文、数字、下划线组成      */}
                    <Item 
                    name="username"
                    rules={[
                        {required:true,message:'用户名必须输入！'}, //必填项
                        {min:4,message:'用户名必须大于等于4位！'},
                        {max:12,message:'用户名必须小于等于12位！'},
                        {pattern:/^\w+$/,message:'用户名必须是英文、数字、下划线组成！'},
                    ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="用户名" />
                        </Item>
                        <Item
							name="password"
							rules={[{validator:this.pwdValidator}]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="密码"
							/>
						</Item>
                    

                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                            </Button>
                        </Item>
                </Form>
            </section>
        </div>
        )
    }
}
