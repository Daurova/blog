import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Checkbox, Form, Input } from 'antd';
import { useAuth } from "../../hooks/useAuth";
import classes from '../SignInPage/SignInPage.module.scss'


const SignIn  = () => {
  const {auth, isAuth, isLoading, user }=useAuth()
  useEffect(()=>{
    console.log(user, isAuth)
  },[isAuth])
    const onFinish = (values) => {
      auth(values)
        console.log('Success:', user, isAuth);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
<>
<div className={classes['container']} >
  <h2 style={{fontWeight:'500px', fontSize:'20px'}}>Sign In</h2>
  <Form
    name="basic"
    layout="vertical"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 23,
    }}
    style={{
      maxWidth: 900,
   
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
       name="email"
       label="E-mail"
       rules={[
         {
           type: 'email',
           message: 'The input is not valid E-mail!',
         },
         {
           required: true,
           message: 'Please input your E-mail!',
         },
       ]}
    >
      <Input style={{ height: '40px' }}/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password style={{ height: '40px' }}/>
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 0,
        span: 23,
      }}
    >
      <Button type="primary" block htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
  </>
);
    
}
export default SignIn