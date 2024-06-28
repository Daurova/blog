import { Button, Flex, Form, Input } from 'antd';
import TagsForNewArticles from '../components/TagsForNewArticles';

const NewArticle  = () => {

    const [form] = Form.useForm();
    const onFinish = (values) => {   
        const tags = localStorage.getItem('tags')
        const tagsArray = tags.split(",").map((tag) => tag.trim());
        values.tags = tagsArray
          console.log('New Article:', values, 'tags', tags);
            };
    return (
      <Form
        form={form}
        scrollToFirstError
        style={{
          paddingBlock: 32,
        }}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={onFinish}
      >
    
  
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item name="description"
          label="Short description"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
          
        </Form.Item>
  
       
  
        <Form.Item
          name="text"
          label="Text"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>
        <TagsForNewArticles/>
        <Form.Item
          wrapperCol={{
            offset: 6,
          }}
        >
          <Flex gap="small">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          
          </Flex>
        </Form.Item>
      </Form>
    );
}
export default NewArticle