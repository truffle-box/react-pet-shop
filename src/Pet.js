import "./Pet.css";

function Pet(props) {
  const { age, name, breed, location, picture } = props;
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
    </div>
  );
};

export default Pet;
