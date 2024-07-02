import React, { useState } from 'react';

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

  return (
    <div className="app">
      <Logo />
      <Form onAdditems={handleAdditems} />
      <PackingList
        item={item}
        onDelete={handleDeleteitem}
        oncheckbox={handlecheckbox}
      />
      <Stats item={item} />
    </div>
  );
};

const Logo = () => {
  return <h1>🌴 Far Away 💼</h1>;
};

const Form = ({ onAdditems }) => {
  const [description, setdescription] = useState('');
  const [quantity, setquantity] = useState(1);

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newitem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAdditems(newitem);

    setdescription('');
    setquantity(1);
  };

  return (
    <form className="add-form" onSubmit={handlesubmit}>
      <h3>what do you need for your 😍 trip</h3>
      <select
        value={quantity}
        onChange={(e) => setquantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

const PackingList = ({ item, onDelete, oncheckbox }) => {
  return (
    <div className="list">
      <ul>
        {item.map((item) => (
          <Item
            item={item}
            onDelete={onDelete}
            oncheckbox={oncheckbox}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item, onDelete, oncheckbox }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          oncheckbox(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
};
const Stats = ({ item }) => {
  if (!item.length)
    return (
      <p className="stats">
        <em>start adding items to your packing list 🚀</em>
      </p>
    );

  const numItem = item.length;
  const numPacked = item.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItem) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'you got everything! ready to go ✈️'
          : `💼 You have ${numItem} items on your list, and you already packed
          ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
};

export default App;
