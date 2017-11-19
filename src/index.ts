import * as express from 'express';
import App from './server';

const port: number = parseInt(process.env.PORT, 10) || 4200;

const server = new App(port);
