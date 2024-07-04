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

export default Stats;
