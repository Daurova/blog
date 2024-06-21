import React from "react"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { getArticles } from "../services/services"
const SinglePage = () => {
    const {id} = useParams()
   
    return (
        <div>
            <h1>
                <p>
                    this is the 1st SinglePage with react-router
                </p>
            </h1>
        </div>
    )
}
export default SinglePage