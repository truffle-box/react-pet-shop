import "./PetList.css";
import Pet from "./Pet";

function PetList(props) {
  return (
    <div className="PetList">
      {props.pets.map((pet, index) => <Pet {...pet} key={index} />)}
    </div>
  );
}

export default PetList;
