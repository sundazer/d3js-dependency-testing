import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as express from 'express';
import { Server } from 'http';
import { App } from '../src/server';

const expect = chai.expect;
chai.use(chaiHttp);

let server: Server;

describe('Server', () => {
    before(() => {
        server = new App(9998).server;
    });

    after(() => {
        server.close();
    });

    it('should respond to index page', (done) => {
        chai.request(server)
        .get('/')
        .then((res) => {
            expect(res).to.have.status(200);
        })
        .then(done, done);
    });
});
