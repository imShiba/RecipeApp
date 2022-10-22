import React,{useState,useEffect} from 'react';
import { useLocation } from "react-router-dom";
import {Badge, Container, Row, Col, Alert, Spinner, Accordion} from 'react-bootstrap/';
import axios from 'axios';

const Recipe = () => {
    const location = useLocation();
    const [ isLoaded, setIsLoaded] = useState(false);
    const [ post, setPost ] = useState();

    useEffect(() => {axios
        .get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+location.state)
        .then(res => {
            setIsLoaded(true);
            console.log(location.state);
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
        //If there is no existing recipe
        if(post == null){
            return(
                <div className='mx-3 mt-4' style={{height:'100vh'}}>
                    <center><b><br/><p style={{fontSize: '5vh'}}>😔🍆</p><p style={{fontSize: '2vh'}}>Sorry but there's no existing recipe</p></b></center>
                </div>
            )
        }
        else{
            return (
                <div className='mx-1 mt-4' style={{minHeight:'100vh'}}>
                    {post?.map(post => (
                        <Container key={post.idMeal}>
                        <Row >
                            <Col sm={4}>
                            <img src={post.strMealThumb} className="rounded-top" style={{height:'400px', width: '100%', objectFit:'cover'}}></img>
                            </Col>
                            <Col sm={8}>
                            <h1 className='mt-3' style={{textTransform:'capitalize'}}>{post.strMeal} <Badge bg="danger">{post.strArea}</Badge></h1>
                            <p><b>Tags: </b>{post.strTags}</p>
                            <Accordion key={post.id}  defaultActiveKey={['0']} alwaysOpen>
                                <Accordion.Item eventKey="0">
                                <Accordion.Header>Ingredients</Accordion.Header>
                                <Accordion.Body>
                                <h5 style={{fontWeight:'bold'}}>Ingredients: </h5>
                                <ul>
                                {post.strIngredient1 !== '' && post.strIngredient1 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient1+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient1}</b> | {post.strMeasure1}</li> : null}
                                {post.strIngredient2 !== '' && post.strIngredient2 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient2+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient2}</b> | {post.strMeasure2} </li> : null}
                                {post.strIngredient3 !== '' && post.strIngredient3 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient3+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient3}</b> | {post.strMeasure4} </li> : null}
                                {post.strIngredient4 !== '' && post.strIngredient4 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient4+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient4}</b> | {post.strMeasure4} </li> : null}
                                {post.strIngredient5 !== '' && post.strIngredient5 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient5+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient5}</b> | {post.strMeasure5} </li> : null}
                                {post.strIngredient6 !== '' && post.strIngredient6 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient6+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient6}</b> | {post.strMeasure6} </li> : null}
                                {post.strIngredient7 !== '' && post.strIngredient7 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient7+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient7}</b> | {post.strMeasure7} </li> : null}
                                {post.strIngredient8 !== '' && post.strIngredient8 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient8+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient8}</b> | {post.strMeasure8} </li> : null}
                                {post.strIngredient9 !==  '' && post.strIngredient9 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient9+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient9}</b> | {post.strMeasure9} </li> : null}
                                {post.strIngredient10 !== '' && post.strIngredient10 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient10+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient10}</b> | {post.strMeasure10} </li> : null}
                                {post.strIngredient11 !== '' && post.strIngredient11 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient11+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient11}</b> | {post.strMeasure11} </li> : null}
                                {post.strIngredient12 !== '' && post.strIngredient12 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient12+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient12}</b> | {post.strMeasure12} </li> : null}
                                {post.strIngredient13 !== '' && post.strIngredient13 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient13+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient13}</b> | {post.strMeasure13} </li> : null}
                                {post.strIngredient14 !== '' && post.strIngredient14 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient14+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient14}</b> | {post.strMeasure14} </li> : null}
                                {post.strIngredient15 !== '' && post.strIngredient15 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient15+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient15}</b> | {post.strMeasure15} </li> : null}
                                {post.strIngredient16 !== '' && post.strIngredient16 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient16+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient16}</b> | {post.strMeasure16} </li> : null}
                                {post.strIngredient17 !== '' && post.strIngredient17 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient17+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient17}</b> | {post.strMeasure17} </li> : null}
                                {post.strIngredient18 !== '' && post.strIngredient18 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient18+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient18}</b> | {post.strMeasure18} </li> : null}
                                {post.strIngredient19 !== '' && post.strIngredient19 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient19+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient19}</b> | {post.strMeasure19} </li> : null}
                                {post.strIngredient20 !== '' && post.strIngredient20 !== null ? <li><img src={'https://www.themealdb.com/images/ingredients/'+post.strIngredient20+'.png'} style={{width:'10vh',marginRight:'2vh'}}/> <b>{post.strIngredient20}</b> | {post.strMeasure20} </li> : null}
                                </ul>
                                
                            </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                Instructions
                                </Accordion.Header>
                                <Accordion.Body>
                                <h5 className='mt-3' style={{fontWeight:'bold'}}>Instructions: </h5>
                                <p style={{textAlign:'justify'}}>{post.strInstructions}</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            </Accordion>
                            <Alert className='mt-3' variant={'info'} style={{overflowWrap:'break-word'}}>
                                Source: {post.strSource}
                            </Alert>
                            </Col>
                        </Row>
                        </Container>
                    ))}
                </div>
            );
        }
    }
};

export default Recipe;