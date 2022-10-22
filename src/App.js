import React,{Component,Text} from "react";
import NavBarComp from './components/NavBarComp'
class App extends Component{

  render() {
    return(
      <div className="body">
        <div className="App">
          <NavBarComp/>
          
        </div>
      </div>
    )
  }
  
}
if(window.location.pathname == '/'){
  window.location.replace('/Home');
}
export default App;