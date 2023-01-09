const Filter = ({ filter, nameFilter }) => {
  return (
    <p>
      filter shown with <input value={filter} onChange={nameFilter} />
    </p>
  );
};

export default Filter;
