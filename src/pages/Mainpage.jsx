import React, { useEffect, useState, Fragment } from "react"
import { getArticles } from "../services/services"
import {Pagination} from "antd"
import { Link, useNavigate, useSearchParams } from "react-router-dom"



const Blog  = () => {
    const [posts, setPosts]=useState([])
    const [information, setInformation]=useState([])
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(searchParams.get('page'));

 

    useEffect(()=>{
       
      setCurrentPage(searchParams.get('page'))
      },[]
    )
    
    useEffect(()=>{
      setSearchParams(`?page=${currentPage}`)
      const getData = async ()=>{
        const data =  await getArticles(currentPage)
        console.log (data)
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
                <p>number of likes: {item.favoritesCount}</p>
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