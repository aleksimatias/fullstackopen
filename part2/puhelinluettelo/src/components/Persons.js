import Person from "./Person";

const Persons = ({ visiblePersons }) => {
  return (
    <div>
      {visiblePersons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default Persons;
