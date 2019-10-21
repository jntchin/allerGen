import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();

    this.state ={

    }
  }

  //axios call
  filterByMainIngredient = () =>{
    axios({
      method: 'GET',
      url: 'https://www.themealdb.com/api/json/v1/1/filter.php',
      dataResponse: 'JSON',
      data: {
        key: 1
      },
    })
  }

  getRecipesById = () =>{
    axios({
      method: 'GET',
      url: 'https://www.themealdb.com/api/json/v1/1/lookup.php',
      dataResponse: 'JSON',
      data: {
        key: 1
      },
      
    })
  }

  render(){
    return (
      <div className="App">
        <h1>Aller-gen</h1>
      </div>
    );
  }
}

export default App;
