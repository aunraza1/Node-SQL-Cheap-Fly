const config = {
  user: "sa",
  password: "admin",
  database: "Cheap Fly",
  server: "127.0.0.1",
  driver: "msnodesqlv8",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
  },
};
module.exports = config;
