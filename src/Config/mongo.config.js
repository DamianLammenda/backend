import mongoose from "mongoose";

const mongoConnect = async () => {
  let MONGO_URI;
  const MONGO_USER = process.env.MONGO_USER;
  const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
  const MONGO_HOST = process.env.MONGO_HOST;
  const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

  if (MONGO_USER && MONGO_PASSWORD) {
    MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}`;
  } else {
    MONGO_URI = `mongodb+srv://${MONGO_HOST}`;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewURLParser: true,
      useUnifiedTopology: true,
      dbName: MONGO_DB_NAME,
    });
    console.info(`Connected to Mongodb with the user ${MONGO_USER}`);
  } catch (err) {
    console.error(err);
  }
};

export default mongoConnect;
