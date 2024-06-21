import React, { useEffect, useState } from "react"
import { getArticles } from "../services/services"
import {List, Avatar} from "antd"

const Blog  = () => {
    const [posts, setPosts]=useState([])

    useEffect(()=>{
        const getData = async ()=>{
      const data =  await getArticles()
      console.log (data)
      setPosts(data.articles)
    }
    getData()
    },[]
    
    )
    return (
        <div>
            <h1>
                <p> 
                    this is a blog with react-router

                </p>
            </h1>
            {/* <List
  itemLayout="horizontal"
  dataSource={posts}
  renderItem={(item) => (
    <List.Item>
        <p>{item.author.username}</p>
      <List.Item.Meta
        avatar={<Avatar src={item.author.image}></Avatar>}
        title={<a href={item.href}>{item.title}</a>}
        description={item.description}
      />
    </List.Item>
  )}
/> */}
           {posts?.map((item)=><><p>slug:{item.slug}</p>
           <p><img src = {item.author.image}></img></p>
           <a href={item.title}>item title: {item.title}</a>
           <p>item description: {item.description}</p>
           <p>created at: {item.createdAt}</p>
           <p>number of likes: {item.favoritesCount}</p>
           <p>Tags: {item.tagList.map((tag)=><p>{tag}</p>)}</p></>)}
        </div>
    )
}
export default Blog