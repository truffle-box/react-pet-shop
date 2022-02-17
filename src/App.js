import { Component } from "react";
import './App.css';
import PetList from "./PetList";
import pets from "./pets";
import Adoption from "./build/contracts/Adoption";

// let app know that about globals loaded in the html
/*global TruffleContract*/
/*global Web3*/

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
      web3Provider: null,
      web3: null
    };
  }

  async componentDidMount() {
    await this.initWeb3();
    await this.initContract();
  }

  async initContract() {
    const AdoptionArtifact = TruffleContract(Adoption);

    // Set the provider for our contract
    AdoptionArtifact.setProvider(this.state.web3Provider);

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
    console.log("marking adopted -- %o", this.state.adopters);
  }

  async handleAdopt(petId) {
    console.log("the state -- %o", this.state);
    const adoptionInstance = await this.state.contracts.Adoption.deployed();
    const accounts = await this.state.web3.eth.getAccounts();
    console.log("the accounts -- %o", petId);
    // use the first address as the adopter
    const result = await adoptionInstance.adopt(petId, { from: accounts[0] });
    await this.markAdopted();
  }

  async initWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
      this.setState({
        web3Provider: window.ethereum
      });
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      this.setState({
        web3Provider: window.web3.currentProvider
      });
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      this.setState({
        web3Provider: new Web3.providers.HttpProvider("http://localhost:8545")
      });
    }
    console.log("this.web3Provider - %o", this.state.web3Provider);
    this.setState({
      web3: new Web3(this.state.web3Provider)
    });
    const accounts = this.state.web3.eth.getAccounts();
    console.log("the acc -- %o", accounts);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Pete's Pet Shop
          </p>
          <PetList pets={pets} adopters={this.state.adopters} handleAdopt={this.handleAdopt.bind(this)} />
        </header>
      </div>
    );
  }
}

export default App;
