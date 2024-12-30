import 'dotenv/config';
import express from 'express';
import { Server } from './src/Server';
import { prismaClient } from "./src/database/prisma-client";

const app = express();
const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || '127.0.0.1';
const server = new Server(app, port, prismaClient, hostname);

server.start();