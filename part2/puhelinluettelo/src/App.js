import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  // Prevent form default
  const addNewName = (e) => {
    e.preventDefault();

    // Use filter to check if name is already in Phonebook
    const checkName = persons.filter((person) => person.name === newName);

    if (checkName.length === 0) {
      const nameItem = {
        name: newName,
      };
      // Return new array with new name(s)
      setPersons(persons.concat(nameItem));
    } else {
      // Alert user that name is already in Phonebook
      alert(`${newName} is already added to phonebook`);
      // Clear name field on submit
    }
    setNewName("");
  };

  // Update new name based on value of name field
  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
