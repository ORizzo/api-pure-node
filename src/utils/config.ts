import fs from "node:fs";
import path from "path";

const config = {
  https: {
    key: fs.readFileSync(path.resolve() + "/https/key.pem"),
    cert: fs.readFileSync(path.resolve() + "/https/certificate.pem"),
  },
};

export { config };
