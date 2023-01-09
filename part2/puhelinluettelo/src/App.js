import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [visiblePersons, setVisiblePersons] = useState(persons);

  // Prevent form default
  const addNewPerson = (e) => {
    e.preventDefault();

    // Use filter to check if name is already in Phonebook
    const checkName = persons.filter((person) => person.name === newName);

    if (checkName.length === 0) {
      const personItem = {
        name: newName,
        number: newNumber,
      };
      // Return new array with new name(s)
      setPersons(persons.concat(personItem));
      setVisiblePersons(persons.concat(personItem));
    } else {
      // Alert user that name is already in Phonebook
      alert(`${newName} is already added to phonebook`);
    }
    // Clear name and number field on submit
    setNewName("");
    setNewNumber("");
  };

  // Update new name and number based on value of name field
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  // Use case-insensitive filtering for names of people
  const nameFilter = (e) => {
    const searchName = e.target.value;
    setFilter(searchName);
    setVisiblePersons(
      persons.filter((person) => person.name.toLowerCase().includes(searchName))
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with <input value={filter} onChange={nameFilter} />
      </p>
      <form onSubmit={addNewPerson}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {visiblePersons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
