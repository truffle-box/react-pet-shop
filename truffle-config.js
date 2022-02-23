module.exports = {
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  contracts_build_directory: "./src/build/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // match any network id
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
