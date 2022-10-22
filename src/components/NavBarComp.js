import React,{Component} from "react";
import {Spinner, Nav, Navbar, NavDropdown, Container} from 'react-bootstrap/';
import { BrowserRouter as Router,  Routes, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import Home from "./Home";
import Random from "./Random";
import Category from "./Category";  
import Recipe from "./Recipe";
import Search from "./Search";

class NavBarComp extends Component{

  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount(){
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items: json,
      })
    })
  }

  render() {

    var{isLoaded, items} = this.state;
    
    
    if(!isLoaded){
      return(
        <div className='mx-3 ms-3 mt-4' style={{height:'100vh'}}>
            <center>
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            </center>
        </div>
      )
    }
    else{
      return (
        <div className="NavBarComp">

          {/*NAVBAR*/}
          <Router>
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand as={Link} to={"/Home"}>Cookture</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                    <Nav.Link as={Link} to={"/Home"} state={{name: "Haewon"}}>Home</Nav.Link>
                    <Nav.Link as={Link} to={"/Random"} state={{id: "Kyujin"}}>Random Dish</Nav.Link>
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                      {items.categories?.map(recipe => (
                        <NavDropdown.Item as={Link} to={"/Category"} state={recipe.strCategory} key={recipe.idCategory}>{recipe.strCategory}</NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <Routes>
              <Route path="/Home" element={<Home/>}>
              </Route>
              <Route path="/Random" element={<Random/>}>
              </Route>
              <Route path="/Category" element={<Category/>}>
              </Route>
              <Route path="/Recipe" element={<Recipe/>}>
              </Route>
              <Route path="/Search:param" element={<Search/>}>
              </Route>
            </Routes>
          </Router>
          {/*HOME PAGE*/}
        </div>
      );
    }
  }
}

export default NavBarComp;