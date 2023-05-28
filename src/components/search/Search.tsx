import React, { useState } from 'react';
import Input from '../common/input/Input';
import Button from '../common/button/Button';
import styles from './search.module.css';

interface SearchProps {
  handleSearch: (searchValue: string) => void
}

function Search ({ handleSearch }: SearchProps): React.JSX.Element {
  const [search, setSearch] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        type="text"
        placeholder='Search...'
        className={styles.searchInput}
        value={search}
        handleChange={handleChange}
      />
      <Button
        className={styles.searchButton}
        onClick={() => { handleSearch(search); }}
        variant="success"
      >
        Search
      </Button>
    </div>
  );
}

export default Search;
