import React from 'react';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Searchbar.module.scss';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    imgQuery: '',
  };

  handleChange = event => {
    const { value } = event.currentTarget;
    this.setState({ imgQuery: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { imgQuery } = this.state;
    if (this.state.imgQuery.trim() === '') {
      toast.error('Empty input value');
      return;
    }
    this.props.onSubmit(imgQuery);
    this.setState({ imgQuery: '' });
  };

  render() {
    const { imgQuery } = this.state;
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.button}>
            <ImSearch />
          </button>

          <input
            value={imgQuery}
            onChange={this.handleChange}
            className={styles.input}
            type="text"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
