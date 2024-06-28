import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../services/services";
import Markdown from 'react-markdown'
import { Button } from "antd";
import { useNavigate } from "react-router-dom";



const SinglePage = () => {
  const [article, setArticle] = useState(null); // State to hold fetched article
  const { slug } = useParams(); // Get slug from URL
  const navigate = useNavigate()

  const handleEdit = ()=>{
    navigate('edit')
    //add edit service
  }
const handleDelete=()=>{
  //add delete service
}

  console.log(slug)
  useEffect(() => {
    
    const getData = async () => {
      try {
        const data = await getArticle(slug);
        setArticle(data); 
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
    getData();
  }, [slug]); // Dependency on slug

  return (
    <>
    <Button onClick={handleEdit}>Edit</Button>
    <Button onClick={handleDelete}>Delete</Button>

    <div>
      <h1>
        <p>
          {article && article.article.title} {/* Display article title if loaded */}
         SinglePage 
        </p>
      </h1>

      {/* Display other article details */}
      { article && (
        
        <div>
          <p>Slug: {article.article.slug}</p>
          <p>Author: {article.article.author.username}</p> 
          <Markdown>{article.article.body}</Markdown>
        </div>
        
      )}
    </div>
    </>
  );
};

export default SinglePage;


