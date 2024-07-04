import React, { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackList';
import Stats from './Stats';

const App = () => {
  const [item, setitem] = useState([]);

  const handleAdditems = (item) => {
    setitem((items) => [...items, item]);
  };

  const handleDeleteitem = (id) => {
    setitem((items) => items.filter((item) => item.id !== id));
  };

  const handlecheckbox = (id) => {
    setitem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearlist = () => {
    const confirmed = window.confirm(
      'are you sure you want to delete packinglist'
    );
    if (confirmed) setitem([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAdditems={handleAdditems} />
      <PackingList
        item={item}
        onDelete={handleDeleteitem}
        oncheckbox={handlecheckbox}
        handleClearlist={handleClearlist}
      />
      <Stats item={item} />
    </div>
  );
};

export default App;
