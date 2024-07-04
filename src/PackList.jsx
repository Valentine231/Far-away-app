import React, { useState } from 'react';

const PackingList = ({ item, onDelete, oncheckbox, handleClearlist }) => {
  const [sortBy, setsortBy] = useState('input');

  let sorteditems;

  if (sortBy === 'input') sorteditems = item;

  if (sortBy === 'description')
    sorteditems = item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sorteditems = item
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sorteditems.map((item) => (
          <Item
            item={item}
            onDelete={onDelete}
            oncheckbox={oncheckbox}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setsortBy(e.target.value)}>
          <option value="iput">sort by input order </option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed</option>
        </select>

        <button onClick={handleClearlist}>Clear List</button>
      </div>
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

export default PackingList;
