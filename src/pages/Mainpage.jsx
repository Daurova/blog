import React, { useEffect, useState, Fragment } from "react"
import { getArticles } from "../services/services"
import {Pagination} from "antd"

const Blog  = () => {
    const [posts, setPosts]=useState([])
    const [information, setInformation]=useState([])
    useEffect(()=>{
      const getData = async ()=>{
      const data =  await getArticles()
      console.log (data)

      setPosts(data.articles)
    }
    getData()
    },[])

    useEffect(()=>{
        const getData = async ()=>{
        const data =  await getArticles()
        console.log (data)
  
        setInformation(data)
      }
      getData()
      },[]
    )


    return (
        
        <div>
        <h1>
            <p>this is a blog with react-router</p>
        </h1>
        {posts?.map((item, index) => (  
            <div key={index}> {/* key prop should be on the outermost element */}
                <p>slug:{item.slug}</p>
                <p><img src={item.author.image} alt="Author"></img></p>
                <a href={item.title}>item title: {item.title}</a>
                <p>item description: {item.description}</p>
                <p>created at: {item.createdAt}</p>
                <p>number of likes: {item.favoritesCount}</p>
                <p>Tags: {item.tagList.map((tag, tagIndex) => <span key={tagIndex}>{tag}</span>)}</p>
            </div>
        ))}
        <Pagination total={information.articlesCount}/>
    </div>

    )
}
export default Blog