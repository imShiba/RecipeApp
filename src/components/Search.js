import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {Spinner, Card, Breadcrumb, Form} from 'react-bootstrap/';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Search = () => {
    const [searchParams, setSearchParams ] = useSearchParams();

    const [ isLoaded, setIsLoaded] = useState(false);
    const [ post, setPost ] = useState();

    useEffect(() => {axios
        .get('https://www.themealdb.com/api/json/v1/1/search.php?s='+searchParams.get("search"))
        .then(res => {
            setIsLoaded(true);
            console.log(res);
            setPost(res.data.meals);
        })
        .catch(err => {
            console.log(err)})}, [])

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
        if(post == null){
            return(
                <div className='mx-3 mt-4' style={{minHeight:'100vh'}}>
                    <Form action='./Search.js' method='GET'>
                        <Form.Control type="text" name="search" placeholder='Search Recipe...' className='mb-3'/>
                    </Form>
                    <center><b><br/><p style={{fontSize: '5vh'}}>😔🍗</p><p style={{fontSize: '2vh'}}>Sorry but there's no existing recipe</p></b></center>
                </div>
            )
        }
        else{
        return (
            <div className='mx-3 ms-3 mt-4 pb-3' style={{minHeight:'100vh'}}>
                <Form action='./Search.js' method='GET'>
                    <Form.Control type="text" name="search" placeholder='Search Recipe...' className='mb-3'/>
                </Form>
                <Breadcrumb>
                    <Breadcrumb.Item active>Search</Breadcrumb.Item>
                    <Breadcrumb.Item active>{searchParams.get("search")}</Breadcrumb.Item>
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
        );}
    }
};

export default Search;