import React, { FormEvent, useState } from 'react';
import { connect } from 'react-redux';
import { setAppRegime } from '../../redux/app-reducer';
import { processRequest } from '../../redux/link-reducer';
import Button from '../Common/Button';
import Form from '../Common/Form';
import Input from '../Common/Input';

type PropsType = {
  processRequest: (query: string) => void;
  setAppRegime: (isSearchEnabled: boolean) => void;
};

const LinksForm: React.FC<PropsType> = ({ processRequest, setAppRegime }: PropsType) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppRegime(false);
    processRequest(query);
    setQuery('');
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Input
        type="search"
        placeholder="Enter a link"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit">Get</Button>
    </Form>
  );
};

export default connect(null, { processRequest, setAppRegime })(LinksForm);
