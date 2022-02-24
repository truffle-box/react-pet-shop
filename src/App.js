import { Component } from "react";
import './App.css';
import Pet from "./Pet";
import pets from "./pets";
import Adoption from "./build/contracts/Adoption";
import detectEthereumProvider from "@metamask/detect-provider";

// let app know that about globals loaded in the html
/*global TruffleContract*/

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

  async initProvider() {

    /*
     * Replace me...
     */

  }

  async initContract() {
    // use the built artifact to instantiate a TruffleContract object
    const AdoptionArtifact = TruffleContract(Adoption);

    // set the provider for our contract
    AdoptionArtifact.setProvider(this.state.provider);

    this.setState({
      contracts: {
        Adoption: AdoptionArtifact
      }
    });

    // use the Adoption contract to retrieve and mark the adopted pets
    await this.markAdopted();
  }

  // this function determines which pets are adopted and updates the state
  // from the Adoption contract
  async markAdopted() {
    // create a reference to the deployed Adoption contract
    const adoptionInstance = await this.state.contracts.Adoption.deployed();

    // make a call to the Adoption contract's `getAdopters` function in order
    // to determine which pets are already adopted - this retrieves the
    // addresses that have adopted pets from the blockchain
    const adopters = await adoptionInstance.getAdopters();

    // set the adopters list in the state for this component
    this.setState({ adopters });
  }

  async handleAdopt(petId) {
    // create a reference to the deployed Adoption contract
    const adoptionInstance = await this.state.contracts.Adoption.deployed();

    // get the user's accounts
    const accounts = await this.state.provider.request({
      method: "eth_accounts"
    });

    // use the first address as the adopter for the pet - this address
    // corresponds to the currently selected address in MetaMask
    await adoptionInstance.adopt(petId, { from: accounts[0] });

    // update the UI to show all adopted pets as "adopted"
    await this.markAdopted();
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
