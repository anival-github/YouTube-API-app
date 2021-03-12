import React, { FormEvent, useState } from 'react';
import { connect } from 'react-redux';
import Button from '../Common/Button';
import { processRequest } from '../../redux/search-reducer';
import { setAppRegime } from '../../redux/app-reducer';
import Form from '../Common/Form';
import Input from '../Common/Input';

type PropsType = {
  processRequest: (query: string) => void,
  setAppRegime: (isSearchEnabled: boolean) => void;
};

const SearchForm: React.FC<PropsType> = ({ processRequest, setAppRegime }: PropsType) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppRegime(true);
    processRequest(query);
    setQuery('');
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Input
        type="search"
        placeholder="Search video"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </Form>
  );
};

export default connect(null, { processRequest, setAppRegime })(SearchForm);
