import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _bazarAuthClient: MongoClient | undefined;
}

function getDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return undefined;
  if (!global._bazarAuthClient) {
    global._bazarAuthClient = new MongoClient(uri);
  }
  const client = global._bazarAuthClient;
  const db = client.db();
  return mongodbAdapter(db, { client });
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "bazardor_super_secret_key_12345",
  database: getDatabase(),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "google-client-secret",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "github-client-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "github-client-secret",
    },
  },
});