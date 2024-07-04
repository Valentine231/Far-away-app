import React, { useState } from 'react';

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

export default Form;
