import { Component } from "react";
import "./Pet.css";

class Pet extends Component {
  handleAdoptClick() {
    console.log("adopt clicked");
  }

  render() {
    const { age, name, breed, location, picture } = this.props;
    return (
      <div className="Pet">
        <div className="name">{name}</div>
        <img src={picture} className="pet-image" alt="pet" />
        <div className="breed">
          <strong>Breed:</strong> {breed}
        </div>
        <div className="age">
          <strong>Age:</strong> {age}
        </div>
        <div className="location">
          <strong>Location:</strong> {location}
        </div>
        <div onClick={this.handleAdoptClick} className="adopt-button">adopt</div>
      </div>
    );
  }
};

export default Pet;
