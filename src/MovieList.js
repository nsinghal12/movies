import React from 'react';
import './App.css';

export default class MovieList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      data: undefined,
      isData: false
    }
  }

  getSearchText = (e) => {
    let input = e.target.value;
    this.setState({
      searchText: input
    })
  }

  getSearchData = async () => {
    let s = this.state.searchText;
    try {
      const url = `https://jsonmock.hackerrank.com/api/moviesdata?Year=${s}`;

      const response = await fetch(url);
      const json = await response.json();

      this.setState({
        data: json,
        isData: true
      })

    } catch (e) {
      console.log(e);
    }


  }

  embedSearchResults = () => {
    let json = this.state.data;
    if(!json){
      return null;
    }
    console.log("json", json);
    if(json.data.length === 0){
      return <div>No results</div>;
    }
    let results = [];
    for(let i=0; i<(json.data).length; i++){
      let item = json.data[i];
      results.push(<li key={item.imdbID}>{item.Title}</li>)
    }
    return <ul>{results}</ul>;
  }

  render() {
    return <div class='container'>
      <input type='number' placeholder='search' onChange={this.getSearchText} />
      <button className=' btn btn-primary' onClick={this.getSearchData}>Search</button>

       {this.state.data ? this.embedSearchResults() : null}

    </div>
  }

}


