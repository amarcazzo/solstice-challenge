import React from "react";
import userImg from "../../assets/user-small/user-small@2x.png";
import FavTrue from "../../assets/favorite-true/favorite-true.png";
import FavFalse from "../../assets/favorite-false/favorite-false.png";
import "./contact-details.min.css";
import { BrowserRouter as Route, Link } from "react-router-dom";
import config from "../../config";

function ContactDetails(props) {
  const handleError = e => {
    e.target.src = userImg;
  };
  const toggleFavorite = e => props.toggleFavorite(e.target.id);
  const contact = props.details;
  const profilePicture =
    window.innerWidth > 768 ? contact.largeImageURL : contact.smallImageURL;
  const favorite = contact.isFavorite ? (
    <img src={FavTrue} id={contact.id} onClick={toggleFavorite} alt="" />
  ) : (
    <img src={FavFalse} id={contact.id} onClick={toggleFavorite} alt="" />
  );

  return (
    <div>
      <section className="contact-detail-header">
        <Link to={config.homepage}>{"< Contacts"}</Link>
        {favorite}
      </section>
      <div className="contact-details">
        <section className="detail-header">
          <img src={profilePicture} onError={handleError} alt="Contact" />
          <span className="detail-name">{contact.name}</span>
          <small className="detail-company">{contact.companyName}</small>
        </section>
        {contact.phone.work ? (
          <section className="detail-section">
            <h3 className="section-header">Phone</h3>
            <span>{contact.phone.work}</span>
            <small className="section-description">Work</small>
          </section>
        ) : null}
        {contact.phone.home ? (
          <section className="detail-section">
            <h3 className="section-header">Phone</h3>
            <span>{contact.phone.home}</span>
            <small className="section-description">Home</small>
          </section>
        ) : null}
        {contact.phone.mobile ? (
          <section className="detail-section">
            <h3 className="section-header">Phone</h3>
            <span>{contact.phone.mobile}</span>
            <small className="section-description">Mobile</small>
          </section>
        ) : null}
        {contact.address ? (
          <section className="detail-section">
            <h3 className="section-header">Address</h3>
            <span>
              {`${contact.address.street}`}
              <br />
              {`${contact.address.city}, ${contact.address.state} ${
                contact.address.zipCode
              }, ${contact.address.country}`}
            </span>
          </section>
        ) : null}
        {contact.birthdate ? (
          <section className="detail-section">
            <h3 className="section-header">Birthdate</h3>
            <span>
              {new Date(contact.birthdate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </span>
          </section>
        ) : null}
        {contact.emailAddress ? (
          <section className="detail-section">
            <h3 className="section-header">Email</h3>
            <span>{contact.emailAddress}</span>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default ContactDetails;
