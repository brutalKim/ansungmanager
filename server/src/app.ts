import express from "express";
import expressLoader from "./loaders/express";

const app = express();

expressLoader(app);