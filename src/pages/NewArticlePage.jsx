import { Button, Flex, Form, Input, Space } from 'antd';
import { useState } from 'react';
import { createArticle, updateArticle } from '../services/services';
import { useParams } from "react-router-dom";


const NewArticle = () => {
  const token = localStorage.getItem('token');
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const { slug } = useParams(); // Get slug from URL

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const onFinish = (values) => {
    values.tagList = tags; 
    console.log('New Article:', values, 'tags', tags);
if(slug){
    console.log ('the slug is here')
    updateArticle({}=values, slug, token)
}else{
    createArticle({}=values, token);
  }}

  return (
       <Form
      form={form}
      scrollToFirstError
      style={{ paddingBlock: 32 }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Short description"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="text"
        label="Text"
        rules={[{ required: false }]}
      >
        <Input.TextArea rows={6} />
      </Form.Item>

      <Form.Item label="Tags">
        <Space>
          {tags.map((tag, index) => (
            <span key={index}>
              {tag}
              <span
                style={{
                  cursor: 'pointer',
                  marginLeft: 8,
                  fontSize: 14,
                  color: '#999',
                }}
                onClick={() => handleDeleteTag(index)}
              >
                Delete
              </span>
            </span>
          ))}
          <Input
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <Button onClick={handleAddTag}>Add</Button>
        </Space>
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 6 }}
      >
        <Flex gap="small">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default NewArticle;

// import { Button, Flex, Form, Input } from 'antd';
// // import TagsForNewArticles from '../components/TagsForNewArticles';
// import { createArticle } from '../services/services';


// const NewArticle  = () => {
//     const token  = localStorage.getItem('token')
//     const [form] = Form.useForm();
    
//     const onFinish = (values) => {   
//         const tags = localStorage.getItem('tags')
//         const tagsArray = tags.split(",").map((tag) => tag.trim());
//         values.tagList = tagsArray
//         console.log('New Article:', values, 'tags', tags);

//         createArticle({}=values, token)
//             };
//     return (
//       <Form
//         form={form}
//         scrollToFirstError
//         style={{
//           paddingBlock: 32,
//         }}
//         labelCol={{
//           span: 6,
//         }}
//         wrapperCol={{
//           span: 14,
//         }}
//         onFinish={onFinish}
//       >
    
  
//         <Form.Item
//           name="title"
//           label="Title"
//           rules={[
//             {
//               required: false,
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
  
//         <Form.Item name="description"
//           label="Short description"
//           rules={[
//             {
//               required: false,
//             },
//           ]}
//         >
//           <Input />
          
//         </Form.Item>
  
       
  
//         <Form.Item
//           name="text"
//           label="Text"
//           rules={[
//             {
//               required: false,
//             },
//           ]}
//         >
//           <Input.TextArea rows={6} />
//         </Form.Item>

//         {/* insert tags here */}


//         <Form.Item
//           wrapperCol={{
//             offset: 6,
//           }}
//         >
//           <Flex gap="small">
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
          
//           </Flex>
//         </Form.Item>
//       </Form>
//     );
// }
// export default NewArticle