import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Profile  = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
    
      const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
    
      return (
        <Form
          name="form_with_picture_uploader"
          onFinish={onFinish}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input />
            </Form.Item>
            {/* email, new pass */}
      <Form.Item
        name="picture"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Select a picture to upload"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
         <Input/>
        </Upload>
      </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>)
}
export default Profile