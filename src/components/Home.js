import React, { useEffect, useState } from 'react';
import {Spinner,  Form, Carousel} from 'react-bootstrap/';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Home(){
  const [ post, setPost ] = useState();
  const [ isLoaded, setIsLoaded] = useState(false);
  const [ search, setSearch ] = useState("");

  useEffect(() => {
    axios
    .get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese')
    .then(res => {
      setIsLoaded(true);
      console.log(res);
      setPost(res.data.meals)
    })
    .catch(err => {
      console.log(err)})
  }, [])

  if(!isLoaded){
    return(
        <div className='mx-3 mt-4' style={{height:'100vh'}}>
            <center>
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            </center>
        </div>
    )
    }
  else{
    console.log("Searched " + search);
    return(
        <div className='body' style={{minHeight:'100vh'}}>
            <Carousel>
            {post?.map(post => (
                    <Carousel.Item>
                        <img src={post.strMealThumb} style={{width:'100%',height:'35vh',filter:'brightness(65%)',objectFit:'cover'}}></img>
                        <Carousel.Caption>
                        <h3>{post.strMeal}</h3>
                        <p as={Link} to={"/Recipe"} state={post.idMeal}>{post.strMeal} Recipe is now available.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className='mx-2 mt-3' style={{height:'100vh'}}>
                <Form action='./Search.js' method='GET'>
                    <Form.Control type="text" name="search" placeholder='Search Recipe...' className='mb-3'/>
                </Form>
                <center>
                    <h1 className='mt-5 mb-4'>👨‍🍳<br/><br/>Purpose of this App </h1>
                    <p className='mx-2 mb-5'>We allows our users to capture online recipes and automatically sync them between devices. 
                    Most of the recipes that users come upon online, can easily save in the app with just a tap on the mobile screen.</p>
                    <hr/>
                    <h1 className='mt-5 mb-4'>🗺️<br/><br/>Our API</h1>
                    <p className='mx-2 mb-5'>We used Meal DB API for this App. It is an open, crowd-sourced database of Recipes from around the world. they also offer a free JSON API for anyone wanting to use it</p>
                    <hr/>
                    <p className='mx-2 mb-5'>Copyrights © Cookture App</p>
                </center>
            </div>
        </div>
    )
  }
}
export default Home;