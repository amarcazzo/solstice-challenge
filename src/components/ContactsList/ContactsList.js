import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./contacts-list.min.css";
import ContactItem from "../ContactItem/ContactItem";
import ContactDetails from "../ContactDetails/ContactDetails";

function ContactsList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () =>
      await fetch(
        "https://s3.amazonaws.com/technical-challenge/v3/contacts.json"
      )
        .then(res => res.json())
        .then(res => setContacts(res)))();
  }, []);

  const favorites = contacts
    .filter(x => x.isFavorite)
    .sort((a, b) => {
      if (b.name < a.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    })
    .map(item => <ContactItem details={item} key={item.id} />);

  const other = contacts
    .filter(x => !x.isFavorite)
    .sort((a, b) => {
      if (b.name < a.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    })
    .map(item => <ContactItem details={item} key={item.id} />);

  const routes = contacts.map(item => (
    <Route
      path={`/${item.id}`}
      key={item.id}
      render={() => (
        <ContactDetails details={item} toggleFavorite={toggleFavorite} />
      )}
    />
  ));

  const toggleFavorite = id => {
    setContacts(
      contacts.map(x => {
        if (x.id === id) x.isFavorite = !x.isFavorite;
        return x;
      })
    );
  };

  return (
    <Router>
      <Route
        exact
        path="/"
        render={() => (
          <div>
            <h3 className="contacts-header">Contacts</h3>
            <div className="contacts-tag">favorite contacts</div>
            <ul className="contacts-list">{favorites}</ul>
            <div className="contacts-tag">other contacts</div>
            <ul className="contacts-list">{other}</ul>
          </div>
        )}
      />
      {routes}
    </Router>
  );
}

export default ContactsList;
