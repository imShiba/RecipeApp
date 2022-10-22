import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {Spinner, Card, Breadcrumb, Form} from 'react-bootstrap/';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Category = () => {
    const location = useLocation();

    const [ post, setPost ] = useState();
    const [ isLoaded, setIsLoaded] = useState(false);

    const [state, setState] = useState({
        value: location.state,
      });
    
    useEffect(() => {
    console.log("The state value is: "+state.value + " - " + location.state);
    if(location.state != state.value){
        window.location.reload()
    }
    }, [location.state]);

    useEffect(() => {axios
        .get('https://www.themealdb.com/api/json/v1/1/filter.php?c='+location.state)
        .then(res => {
            setIsLoaded(true);
            console.log(res);
            setPost(res.data.meals);
        })
        .catch(err => {
            console.log(err)})}, [])

    console.log(location.state);

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
    return(
        <div className='mx-3 mt-4 pb-3' style={{minHeight:'100vh'}}>
            <Form action='./Search.js' method='GET'>
                <Form.Control type="text" name="search" placeholder='Search Recipe...' className='mb-3'/>
            </Form>
            <Breadcrumb>
                <Breadcrumb.Item active>Category</Breadcrumb.Item>
                <Breadcrumb.Item active>{location.state}</Breadcrumb.Item>
            </Breadcrumb>
            {post?.map(post => (
                <Card key={post.id} className='mt-3'>
                <Card.Img variant="top" src={post.strMealThumb} style={{height:'25vh',objectFit:'cover'}}/>
                <Card.Body>
                    <Card.Title style={{textTransform:'capitalize'}}>{post.strMeal}</Card.Title>
                    <Card.Text style={{textTransform:'capitalize',textDecoration:'none'}} as={Link} to={"/Recipe"} state={post.idMeal}>
                        Check {post.strMeal} Recipe
                    </Card.Text>
                </Card.Body>
                </Card>
            ))}
        </div>
        )
    }
};

export default Category;