import React from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Searchbar.module.scss';
import { useState } from 'react';

export function Searchbar({ onSubmit }) {
  const [imgQuery, setImgQuery] = useState('');

  const handleChange = event => {
    const { value } = event.currentTarget;
    setImgQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imgQuery.trim() === '') {
      toast.error('Empty input value');
      return;
    }
    onSubmit(imgQuery);
    setImgQuery('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <ImSearch />
        </button>

        <input
          value={imgQuery}
          onChange={handleChange}
          className={styles.input}
          type="text"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
