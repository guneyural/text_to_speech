import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-central-1",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

export default AWS;
