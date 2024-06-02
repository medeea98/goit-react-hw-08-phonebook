import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import {
  addContacts,
  deleteContacts,
  fetchContacts,
} from '../../redux/contacts/operations';
import { setFilter } from '../../redux/contacts/slice';
import {
  selectFilter,
  selectAllContacts,
  selectLoading,
} from '../../redux/contacts/selectors';

const Contacts = () => {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectAllContacts);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    dispatch(addContacts({ name, number }));
  };

  const handleDelete = id => {
    dispatch(deleteContacts(id));
  };

  const handleFilterChange = filterValue => {
    console.log(filterValue);
    dispatch(setFilter(filterValue));
  };

  const filterContacts = contacts.filter(contact => {
    return (
      typeof contact.name === 'string' &&
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ContactList contacts={filterContacts} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Contacts;
