import { Component } from "react";
import './App.css';
import PetList from "./PetList";
import pets from "./pets";
// import Adoption from "./build/contracts/Adoption";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: {},
      web3Provider: null
    };
  }

  async componentDidMount() {
    await this.initWeb3();
    await this.initContract();
  }

  async initContract() {
    console.log("initContract");
    // const AdoptionArtifact = TruffleContract(Adoption);

    // Set the provider for our contract
    // AdoptionArtifact.setProvider(App.web3Provider);
    //
    // this.setState({
    //   contracts: {
    //     Adoption: AdoptionArtifact
    //   }
    // });

    // Use our contract to retrieve and mark the adopted pets
    // await this.markAdopted();
  }

  async markAdopted() {
    console.log("marking adopted")
  }

  async initWeb3() {
    console.log("initWeb3");
    // Modern dapp browsers...
    // if (window.ethereum) {
    //   App.web3Provider = window.ethereum;
    //   try {
    //     // Request account access
    //     await window.ethereum.enable();
    //   } catch (error) {
    //     // User denied account access...
    //     console.error("User denied account access")
    //   }
    // }
    // // Legacy dapp browsers...
    // else if (window.web3) {
    //   App.web3Provider = window.web3.currentProvider;
    // }
    // // If no injected web3 instance is detected, fall back to Ganache
    // else {
    //   App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    // }
    // web3 = new Web3(App.web3Provider);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Pete's Pet Shop
          </p>
          <PetList pets={pets} />
        </header>
      </div>
    );
  }
}

export default App;
