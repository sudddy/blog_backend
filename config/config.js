module.exports = function()  {
  config_data = {}
  if (
    process.env.NODE_ENV === undefined ||
    process.env.NODE_ENV == null ||
    process.env.NODE_ENV == "development"
  ) {
    config_data = require("./config.dev.json");
  } else {
    if (process.env.NODE_ENV == "production") {
      config_data = require("./config.prod.json");

    }
  }
  console.log(config_data);
  return config_data;
};

