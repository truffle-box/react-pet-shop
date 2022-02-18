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
    // initialize the adopters array with the zero address
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

  async initContract() {
    const AdoptionArtifact = TruffleContract(Adoption);

    // Set the provider for our contract
    AdoptionArtifact.setProvider(this.state.provider);

    this.setState({
      contracts: {
        Adoption: AdoptionArtifact
      }
    });

    // Use our contract to retrieve and mark the adopted pets
    await this.markAdopted();
  }

  async markAdopted() {
    const adoptionInstance = await this.state.contracts.Adoption.deployed();
    const adopters = await adoptionInstance.getAdopters();
    this.setState({ adopters });
  }

  async handleAdopt(petId) {
    const adoptionInstance = await this.state.contracts.Adoption.deployed();
    const accounts = await this.state.provider.request({
      method: "eth_accounts"
    });
    // use the first address as the adopter
    await adoptionInstance.adopt(petId, { from: accounts[0] });
    await this.markAdopted();
  }

  async initProvider() {
    const provider = await detectEthereumProvider();
    if (provider) {
      this.setState({
        provider
      });
      const accounts = await this.state.provider.request({ method: "eth_accounts" });
    } else {
      console.log("please install mm");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Pete's Pet Shop
          </p>
          <div className="PetList">
            {pets.map((pet, index) => <Pet {...pet} handleAdopt={this.handleAdopt.bind(this, pet.id)} adopter={this.state.adopters[pet.id]} key={index} />)}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
