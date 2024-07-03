import { Button, Flex, Form, Input, Loading3QuartersOutlined } from 'antd';
import { useState } from 'react';
import { createArticle, updateArticle } from '../../services/services';
import { useParams, useNavigate } from "react-router-dom";
import classes from '../NewArticlePage/NewArticlePage.module.scss'



const NewArticle = () => {
  const token = localStorage.getItem('token');
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const { slug } = useParams(); // Get slug from URL
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate()

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

  const onFinish = async(values) => {
    try {
      setIsLoading(true); // Set loading to true before making the API call
      values.tagList = tags; 
      console.log('New Article:', values, 'tags', tags);
      if(slug){
        console.log ('the slug is here')
        await updateArticle({}=values, slug, token)
        navigate('/')
      } else {
        await createArticle({}=values, token);
        navigate('/')
      }
    } catch (error) {
      console.error('Error creating/updating article:', error);
    } finally {
      setIsLoading(false); // Set loading to false after the API call is complete
    }
  }
//     values.tagList = tags; 
//     console.log('New Article:', values, 'tags', tags);
// if(slug){
//     console.log ('the slug is here')
//     setIsLoading(true)
//     updateArticle({}=values, slug, token)
// }else{
//     setIsLoading(true)
//     createArticle({}=values, token);
  
//   }}

  return (
    <><div className={classes['container']}>
      <h2>Create new article</h2>
       <Form
      form={form}
      scrollToFirstError
      layout='vertical'
      style={{ paddingBlock: 32 }}
      labelCol={{ span: 23 }}
      wrapperCol={{ span: 23 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: false }]}
      >
        <Input style={{height:'40px', borderRadius: '6px'}} />
      </Form.Item>

      <Form.Item
        name="description"
        label="Short description"
        rules={[{ required: false }]}
      >
        <Input style={{height:'40px', borderRadius: '6px'}}/>
      </Form.Item>

      <Form.Item
        name="body"
        label="Text"
        rules={[{ required: false }]}
      >
        <Input.TextArea rows={6} style={{borderRadius: '6px'}} />
      </Form.Item>

      <Form.Item label="Tags" className={classes['tags-wrapper']}>

        
          {tags.map((tag, index) => (
            
            <div className ={classes['tag-wrapper']}>
            <span key={index} className={classes['tags']} >
              {tag}
            </span>
            <Button 
             style={{
               cursor: 'pointer',
               marginLeft: 8,
               fontSize: 14,
               color: '#999',
             }}
             onClick={() => handleDeleteTag(index)}
           >
             Delete
            </Button>
            </div>
          ))}
            <div className ={classes['tag-wrapper']}>
            <Input
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            style={{height:'40px', maxWidth:'200px'}}
          />
          <Button onClick={handleAddTag}>Add</Button>
          </div>
          </Form.Item>
      <Form.Item
        wrapperCol={{ offset: 0,
                       span: 8
         }}
      >
        <Flex gap="small">
          <Button type="primary" block htmlType="submit" style={{height: '40px'}} >
            Send
          </Button>
        </Flex>
      </Form.Item>
    </Form>
    </div></>
  );
};

export default NewArticle;

