import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [visiblePersons, setVisiblePersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setVisiblePersons(response.data);
    });
  }, []);

  // Prevent form default
  const addNewPerson = (e) => {
    e.preventDefault();

    // Use filter to check if name is already in Phonebook
    const checkName = persons.filter(
      (person) => person.name === newPerson.name
    );

    if (checkName.length === 0) {
      // Return new array with new name(s)
      setPersons(persons.concat(newPerson));
      setVisiblePersons(visiblePersons.concat(newPerson));
    } else {
      // Alert user that name is already in Phonebook
      alert(`${newPerson.name} is already added to phonebook`);
    }
    // Clear name and number field on submit
    setNewPerson({ name: "", number: "" });
  };

  // Update new name and number based on value of name field
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
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
      <Filter filter={filter} nameFilter={nameFilter} />
      <Form
        addPerson={addNewPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />
      <h2>Numbers</h2>
      <Persons visiblePersons={visiblePersons} />
    </div>
  );
};

export default App;
