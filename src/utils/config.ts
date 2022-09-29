import fs from "node:fs";
const config = {
  https: {
    key: fs.readFileSync(__dirname + "/https/key.pem"),
    cert: fs.readFileSync(__dirname + "/https/certificate.pem"),
  },
};

export { config };
