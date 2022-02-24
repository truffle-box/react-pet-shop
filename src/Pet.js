import "./Pet.css";

function Pet (props) {
  const adoptButton = () => {
    const adopted = props.adopter !== "0x0000000000000000000000000000000000000000";
    return adopted ?
      <div className="inactive-adopt-button">
        adopted
      </div> :
      <div onClick={props.handleAdopt} className="adopt-button">
        adopt
      </div>
  }

  const { age, name, breed, location, picture, id } = props;
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
      {adoptButton()}
    </div>
  );
};

export default Pet;
