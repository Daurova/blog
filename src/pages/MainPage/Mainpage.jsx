import React, { useEffect, useState, Fragment } from 'react'
import { getArticles } from '../../services/services'
import {Pagination} from 'antd'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {HeartOutlined, HeartFilled, Loading3QuartersOutlined} from '@ant-design/icons'
import { format } from 'date-fns';
import { favoriteAnArticle, unfavoriteAnArticle} from '../../services/services'
import classes from './MainPage.module.scss'



const Blog  = () => {    const [posts, setPosts]=useState([])
    const [information, setInformation]=useState([])
    // const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(searchParams.get('page'));
    const token = localStorage.getItem('token')
    const [articleLikes, setArticleLikes] = useState({}); // State to track likes
    const [isLoading, setIsLoading] = useState(false);

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
            console.error('Error liking/unliking article:', error);
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
            console.error('Error disliking article:', error);
        }
    };

    useEffect(()=>{
       
      setCurrentPage(searchParams.get('page'))
      },[]
    )
    
    useEffect(()=>{
      const fetchData = async () => {
        try {
          setSearchParams(`?page=${currentPage}`);
          setIsLoading(true);
          const data = await getArticles(currentPage);
          console.log(data);
    
          // Initialize the likes state with initial counts from the API
          const initialLikes = data.articles.reduce((acc, article) => ({ ...acc, [article.slug]: article.favoritesCount }), {});
          setArticleLikes(initialLikes);
          setPosts(data.articles);
          setInformation(data);
        } catch (error) {
          console.error('Error fetching articles:', error);
        } finally {
          setIsLoading(false);
        }
      };
    
      fetchData();
    }, [currentPage, setSearchParams]);
  


    return (
        
        <div>
          {isLoading? <Loading3QuartersOutlined/>:
      
          posts?.map((item, index) => (  
            <>
            <div className={classes['articles-item']} key={index}> {/* key prop should be on the outermost element */}
             <div><div style={{ overflow:'hidden', textOverflow: 'ellipsis', display: 'flex', flexDirection:'row'}}>     
                    <span style = {{maxWidth: '600px', overflow:'hidden', textOverflow: 'ellipsis'}}>
                      <Link to = {`/articles/${item.slug}`} 
                        className = {classes['article-title']} >{item.title}</Link>
                    </span>
                    <span style={{paddingTop:'4px'}}>              
                       {articleLikes[item.slug] === 1 ? <HeartFilled style = {{color:'red'}} onClick={() => handleUnFavourite(item.slug)}/> : <HeartOutlined onClick={() =>handleFavourite(item.slug)}/>}
                       <span>{articleLikes[item.slug] || 0}</span> 
                    </span>  
                  {/* <p>slug:{item.slug}</p> */}
                </div>  
                <div>
                  <span style={{display:'flex', justifyContent:'flex-start'}}>
                       {item.tagList.map((tag, tagIndex) => (
                         tag !== null ? (
                           <span className={classes['tag']} key={tagIndex}>{tag}</span>
                            ) : null
                          ))
                        }
                  </span >
                   <span style={{display:'flex', justifyContent:'flex-start' }}><p className={classes['description']}style = {{maxWidth: '600px', overflow:'hidden', textOverflow: 'ellipsis'}}>{item.description}</p></span>
               </div> </div>
                <div className={classes['article-item__right']}>
                  <div className={classes['article-item_right-info']}>
                  <p style={{fontSize:'18px', margin:'10px', padding:'0px'}}>{item.author.username}</p>
                   <p style={{fontSize: '12px', margin:'0px', padding:'0px', paddingRight:'6px'}}>{format(new Date(item.createdAt), 'MMMM dd, yyyy')}</p>
                  </div>
                  <div className={classes['article-item_right-image']}>    
                   <p><img src={item.author.image} alt='Author' className={classes['article-image']}></img></p>
                  </div>
                </div>
                </div>
                </>
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

