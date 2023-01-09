import Person from "./Person";

const Persons = ({ visiblePersons, deletePerson }) => {
  return (
    <div>
      {visiblePersons.map((person) => (
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default Persons;
