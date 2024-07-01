import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../../services/services";
import Markdown from 'react-markdown'
import { Button, message, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../../services/services";
import { favoriteAnArticle, unfavoriteAnArticle} from "../../services/services"
import {HeartOutlined, HeartFilled} from '@ant-design/icons'




const SinglePage = () => {
  const [article, setArticle] = useState(null); // State to hold fetched article
  const { slug } = useParams(); // Get slug from URL
  const token  = localStorage.getItem('token')
  const navigate = useNavigate()
  const [articleLikes, setArticleLikes] = useState({}); // State to track likes


  const handleEdit = ()=>{
    navigate('edit')
  }


  const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
    deleteArticle(slug, token)
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };
  // const handleDelete=()=>{
  // //add delete service
  // }

  console.log(slug)

  const handleFavourite = async (slug) => {
    try {
        // If the article is already liked, unfavorite
        if (articleLikes[slug] === 1) { 
            await unfavoriteAnArticle(slug, token);
        } else {
            // Favorite the article (even if already liked)
            await favoriteAnArticle(slug, token);
        }
        // Always set articleLikes to 1 
        setArticleLikes(prevLikes => ({ ...prevLikes, [slug]: 1 }));
    } catch (error) {
        console.error("Error liking/unliking article:", error);
    }
};

const handleUnFavourite = async (slug) => {
    try {
        await unfavoriteAnArticle(slug, token);
        // Update the like count for this article in the state
        setArticleLikes(prevLikes => ({
            ...prevLikes,
            [slug]: prevLikes[slug] >1 ? prevLikes[slug] - 1 : 0
        }));
    } catch (error) {
        console.error("Error disliking article:", error);
    }
};
  useEffect(() => {
    
    const getData = async () => {
      try {
        const data = await getArticle(slug);
        setArticle(data); 
        setArticleLikes({ [slug]: data.article.favoritesCount });
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
    getData();
  }, [slug]); // Dependency on slug


  return (
    <>
    <Button onClick={handleEdit}>Edit</Button>
    <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <Button danger>Delete</Button>
  </Popconfirm>
    <div>
      <h1>
        <p>
          {article && article.article.title} {/* Display article title if loaded */}
         SinglePage 
        </p>
      </h1>

      {/* Display other article details */}
      { article && (
        <>
        <div>
          <p>Slug: {article.article.slug}</p>
          <p>Author: {article.article.author.username}</p> 
          <Markdown>{article.article.body}</Markdown>
        </div>
         <span >              
         {articleLikes[slug] === 1 ? <HeartFilled onClick={() => handleUnFavourite(slug)}/> : <HeartOutlined onClick={() =>handleFavourite(slug)}/>}
        </span>
     
        <p>number of likes: {articleLikes[slug] || 0}</p> {/* Use the state for likes count */}
        </>
      )}
    </div>
    </>
  );
};

export default SinglePage;


