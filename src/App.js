import React, { useState, useEffect } from "react";
import './App.css';
import Pet from "./Pet";
import pets from "./pets";
import AdoptionArtifact from "./build/contracts/Adoption";
import detectEthereumProvider from "@metamask/detect-provider";

const App = function () {
  // initialize the adopters array with the zero address - pets that have the
  // zero address as their adopter are not yet adopted
  const initialAdoptersState = ["","","","","","","","","","","","","","","",""].fill(
    "0x0000000000000000000000000000000000000000"
  );
  const [adopters, setAdopters] = useState(initialAdoptersState);
  const [AdoptionInstance, setAdoptionInstance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    async function loadProvider () {
      // retrieve a reference to the provider
      const fetchedProvider = await detectEthereumProvider();

      if (fetchedProvider) {
        setProvider(fetchedProvider);
      } else {
        // tell the user we cannot find a provider and they must install MetaMask
        alert("There was a problem initializing the provider. You may need to install MetaMask.");
      }
    }
    if (!provider) {
      loadProvider();
    }
  }, []);

  useEffect(() => {
    async function initContract () {
      // use the built artifact to instantiate a TruffleContract object
      const Adoption = window.TruffleContract(AdoptionArtifact);

      // set the provider for our contract
      Adoption.setProvider(provider);
      const instance = await Adoption.deployed();
      setAdoptionInstance(instance);
    }

    if (provider && !AdoptionInstance) {
      initContract();
    }
  }, [provider, AdoptionInstance]);

  // handles a user adopting a pet - it sets an adopter for the pet
  // and then causes the UI to update
  const handleAdopt = async function (petId) {
    if (accounts === null) {
      alert("You must connect your wallet before adopting.");
      return;
    }
    if (!accounts.length) {
      alert("You do not have any accounts initialized.");
      return;
    }
    if (!provider || !AdoptionInstance) return;

    // use the first address as the adopter for the pet - this address
    // corresponds to the currently selected address in MetaMask
    await AdoptionInstance.adopt(petId, { from: accounts[0] });
    const adopters = await AdoptionInstance.getAdopters();

    // update the the state
    setAdopters(adopters);
  }

  const getAccounts = async function () {
    if (!provider) return;
    if (accounts && accounts.length) {
      alert(`You already have address ${accounts[0]} connected.`);
      return;
    }
    // get the user's accounts
    const userAccounts = await provider.request({
      method: "eth_requestAccounts"
    });
    setAccounts(userAccounts);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Pete's Pet Shop
        </p>
        <div className="connect-wallet" onClick={() => getAccounts()}>
          Connect wallet
        </div>
        <div className="PetList">
          {pets.map((pet, index) => {
            return <Pet
              {...pet}
              handleAdopt={() => handleAdopt(pet.id)}
              adopter={adopters[pet.id]}
              key={index}
            />
          })}
        </div>
      </header>
    </div>
  )
};

export default App;
