import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../../services/services";
import Markdown from 'react-markdown'
import { Button, message, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../../services/services";
import { favoriteAnArticle, unfavoriteAnArticle} from "../../services/services"
import {HeartOutlined, HeartFilled} from '@ant-design/icons'
import classes from '../SinglePage/SinglePage.module.scss'
import { format } from "date-fns";



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
    <div style={{backgroundColor:'white', width:'938px'}}
          className={classes['article-single']}>

      {/* Display other article details */}
      { article && (
        <>
      <div className={classes['article-single-overview']}>
        <div className={classes['article-single-left']}> 
          <div style={{display:'flex', justifyContent:'flex-start'}}>
          <span className={classes['article-title']}>
            {article && article.article.title} {/* Display article title if loaded */}
          </span>
          <span style={{paddingTop:'4px'}}>              
            <span >              
              {articleLikes[slug] === 1 ? <HeartFilled onClick={() => handleUnFavourite(slug)}/> : <HeartOutlined onClick={() =>handleFavourite(slug)}/>}
            </span>
            <span>{articleLikes[slug] || 0}</span> {/* Use the state for likes count */}
          </span>
          </div>
          <div style={{display:'flex', justifyContent:'flex-start'}}>
            {article.article.description}
          </div>
        </div>
 
        <div className={classes['article-single-right']}>
          <div style={{display:'flex', flexDirection:'row'}}>
          <div className={classes['article-single-right__info']}>
            <p>{article.article.author.username}</p> 
            <p style={{fontSize: '12px', margin:'0px', padding:'0px', paddingRight:'6px'}}>{format(new Date(article.article.createdAt), 'MMMM dd, yyyy')}</p>
          </div >
          <div className={classes['article-single-right__image']}>
            <img src= {article.article.author.image} alt='avatar'
                 className={classes['article-image']}>
            </img>
          </div>    
          </div>
          <div>
          <div style={{display:'flex', wrap:'no-wrap', padding:'10px'}}>
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
           </div>
           </div>
        </div>
        
      </div>
      <div>
        <Markdown>{article.article.body}</Markdown>
      </div>
        </>
      )}
    </div>
    </>
  );
};

export default SinglePage;

