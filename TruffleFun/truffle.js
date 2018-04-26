module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    {
   "live": {
     network_id: 1,
     host: "127.0.0.1",
     port: 8546   // Different than the default below
   },
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
