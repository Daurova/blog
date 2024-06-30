
import React, { useEffect, useState, Fragment } from "react"
import { getArticles } from "../services/services"
import {Pagination} from "antd"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import {HeartOutlined, HeartFilled} from '@ant-design/icons'
import { favoriteAnArticle, unfavoriteAnArticle} from "../services/services"


const Blog  = () => {    const [posts, setPosts]=useState([])
    const [information, setInformation]=useState([])
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(searchParams.get('page'));
    const token = localStorage.getItem('token')
    const [articleLikes, setArticleLikes] = useState({}); // State to track likes

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
                [slug]: prevLikes[slug] > 1 ? prevLikes[slug] - 1 : 0
            }));
        } catch (error) {
            console.error("Error disliking article:", error);
        }
    };

    useEffect(()=>{
       
      setCurrentPage(searchParams.get('page'))
      },[]
    )
    
    useEffect(()=>{
      setSearchParams(`?page=${currentPage}`)
      const getData = async ()=>{
        const data =  await getArticles(currentPage)
        console.log (data)
        // Initialize the likes state with initial counts from the API
        const initialLikes = data.articles.reduce((acc, article) => ({ ...acc, [article.slug]: article.favoritesCount }), {});
        setArticleLikes(initialLikes);
        setPosts(data.articles)
        setInformation(data)

      }
      getData()

    },[currentPage])
  


    return (
        
        <div>
        <h1>
            <p>this is a blog with react-router</p>
        </h1>
        {posts?.map((item, index) => (  
            <div key={index}> {/* key prop should be on the outermost element */}
                <p>slug:{item.slug}</p>
                <p><img src={item.author.image} alt="Author"></img></p>
                <Link to = {`/articles/${item.slug}`}>item title: {item.title}</Link>
                <p>item description: {item.description}</p>
                <p>created at: {item.createdAt}</p>
                <span >              
              {articleLikes[item.slug] === 1 ? <HeartFilled onClick={() => handleUnFavourite(item.slug)}/> : <HeartOutlined onClick={() =>handleFavourite(item.slug)}/>}
             </span>
          
                <p>number of likes: {articleLikes[item.slug] || 0}</p> {/* Use the state for likes count */}
                <p>Tags: {item.tagList.map((tag, tagIndex) => <span key={tagIndex}>{tag}</span>)}</p>
            </div>
        ))}
        <Pagination total={information.articlesCount}
                    current={currentPage}
                    onChange={(page)=>{
                        setCurrentPage(page)
                       }
                    }
                    showSizeChanger = {false}   />
    </div>

    )
}
export default Blog

