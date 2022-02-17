import { Component } from "react";
import "./Pet.css";

class Pet extends Component {
  async handleAdoptClick() {
    console.log("the props -- %o", this.props);
    await this.props.handleAdopt();
    console.log("adopt clicked");
  }

  render() {
    const { age, name, breed, location, picture, adopter, id } = this.props;
    const adopted = adopter !== "0x0000000000000000000000000000000000000000";
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
        <div onClick={this.handleAdoptClick.bind(this, id)} className="adopt-button">
          { adopted ? "already adopted" : "adopt" }
        </div>
      </div>
    );
  }
};

export default Pet;
