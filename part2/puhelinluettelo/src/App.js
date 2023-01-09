import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [visiblePersons, setVisiblePersons] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setVisiblePersons(initialPersons);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 7500);
  }, [message]);

  // Prevent form default
  const addNewPerson = (e) => {
    e.preventDefault();

    // Use filter to check if name is already in Phonebook
    const checkName = persons.filter(
      (person) => person.name === newPerson.name
    );

    if (checkName.length === 0) {
      // Add new persons to database
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setVisiblePersons(persons.concat(returnedPerson));
        setMessage(`Added ${newPerson.name}`);
      });
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(checkName[0].id, newPerson)
          .then((returnedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            );
            setPersons(updatedPersons);
            setVisiblePersons(updatedPersons);
            setMessage(`Updated ${newPerson.name}`);
          })
          .catch((error) => {
            setMessage(
              `Information of ${newPerson.name} has already been removed from the server`
            );
          });
      }
    }
    // Clear name and number field on submit
    setNewPerson({ name: "", number: "" });
  };

  // Delete person from database
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then((response) => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
        setVisiblePersons(updatedPersons);
      });
    }
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
      <Notification message={message} />
      <Filter filter={filter} nameFilter={nameFilter} />
      <Form
        addPerson={addNewPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />
      <h2>Numbers</h2>
      <Persons visiblePersons={visiblePersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
