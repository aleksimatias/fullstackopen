const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person.id, person.name)}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Person;
