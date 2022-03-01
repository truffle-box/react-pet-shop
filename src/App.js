import { Component } from "react";
import './App.css';
import Pet from "./Pet";
import pets from "./pets";
import Adoption from "./build/contracts/Adoption";
import detectEthereumProvider from "@metamask/detect-provider";

// let app know that about globals loaded in the html
// global TruffleContract

class App extends Component {
  constructor(props) {
    super(props);
    // initialize the adopters array with the zero address - pets that have the
    // zero address as their adopter are not yet adopted
    const adopters = ["","","","","","","","","","","","","","","",""].fill(
      "0x0000000000000000000000000000000000000000"
    );
    this.state = {
      adopters,
      contracts: {},
      provider: null,
    };
  }

  async componentDidMount() {
    await this.initProvider();
    await this.initContract();
  }

  // function that creates a reference to the provider injected by MetaMask
  async initProvider() {

    /*
     * replace me...
     */

  }

  // function that creates a reference to an object which represents
  // our Adoption contract living on the blockchain
  async initContract() {

    /*
     * replace me...
     */

  }

  // function that determines which pets are adopted and updates the state
  // from the Adoption contract
  async markAdopted() {

    /*
     * replace me...
     */

  }

  // handles a user adopting a pet - it sets an adopter for the pet
  // and then causes the UI to update
  async handleAdopt(petId) {

    /*
     * replace me...
     */

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Pete's Pet Shop
          </p>
          <div className="PetList">
            {pets.map((pet, index) => {
              return <Pet
                {...pet}
                handleAdopt={() => this.handleAdopt(pet.id)}
                adopter={this.state.adopters[pet.id]}
                key={index}
              />
            })}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
