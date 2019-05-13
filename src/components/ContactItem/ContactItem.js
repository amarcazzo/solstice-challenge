import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import userImg from "../../assets/user-small/user-small@2x.png";
import favoriteTrue from "../../assets/favorite-true/favorite-true.png";
import "./contact-item.min.css";

function ContactItem(props) {
  const contact = props.details;

  const handleError = e => {
    e.target.src = userImg;
  };

  return (
    <li key={contact.id}>
      <Link to={`/${contact.id}`} className="contact-item">
        <img
          className="contact-item-img"
          src={contact.smallImageURL}
          onError={handleError}
          alt="Contact"
        />
        <div className="contact-item-details">
          {contact.isFavorite ? (
            <img
              className="contact-fav-star"
              src={favoriteTrue}
              alt="Favorite"
            />
          ) : null}
          <span className="contact-name">{contact.name}</span>
          <small className="contact-company">{contact.companyName}</small>
        </div>
      </Link>
      <hr />
    </li>
  );
}

export default ContactItem;
