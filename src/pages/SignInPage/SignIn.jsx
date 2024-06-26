import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Checkbox, Form, Input } from 'antd';
import { useAuth } from "../../hooks/useAuth";


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


  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
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
      <Input />
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
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
    
}
export default SignIn