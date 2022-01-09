import './App.scss';
import React from 'react';
import { Component } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    modalContent: '',
    searchQuery: '',
    page: 1,
  };

  handleSubmit = imgQuery => {
    this.setState({ searchQuery: imgQuery });
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ToastContainer />
        <ImageGallery
          imgQuery={this.state.searchQuery}
          page={this.state.page}
        />
      </div>
    );
  }
}

export default App;
