import React from 'react';
import axios from "axios";
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tvShow: "",
      items: [],
      isLoaded: false
    }
  }
  getAllShows = async () => {
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${this.state.tvShow}`);
    this.setState({ items: response.data });
  }

  onInputChange = (e) => {
    this.setState({ tvShow: e.target.value });
  }

  createMarkup(summary) {
    return { __html: summary };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>Show Finder</div>
        </header>
        <div className="body-content">
          <div className="search-shows">
          <input type="text" className="searchHere" placeholder="Search here.." onChange={(e) => this.onInputChange(e)}></input>
          <button type="button" className="btn btn-primary" onClick={this.getAllShows}>Search</button>
          </div>
          <div>
              {this.state.items && this.state.items.length > 0 ? this.state.items.map((item, index) => (
               <div className="show-details">
                  <img
                    src={item.show.image && item.show.image.medium}
                    alt="poster"
                  />
                  <div className="show-name">
                    <h1 key={index}>{item.show.name}</h1>
                    <div className="summary"
                      dangerouslySetInnerHTML={this.createMarkup(
                        item.show.summary
                      )}
                    />
                    <button type="button" className="btn btn-primary" onClick={()=> null}>Show Episodes</button>
                  </div>
                </div>
              )) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
