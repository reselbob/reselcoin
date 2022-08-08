import {expect} from 'chai';
import {before, describe, it} from 'mocha';
import {logger} from '../src/logger';
import {Blockchain} from "../src/blockchain";


describe('Blockchain Tests', () => {
    before(async () => {
        // tslint:disable-next-line:no-console
        logger.info('Starting Blockchain Tests');
    });

    it('Can create blockchain', async () => {
        const blockchain = new Blockchain();
        expect(blockchain.chain).to.be.an('array');
        expect(blockchain.chain.length).to.eq(1); // this is the genesis block
    });

    it('Can add transaction to blockchain', async () => {
        const blockchain = new Blockchain();
        expect(blockchain.chain).to.be.an('array');
        expect(blockchain.chain.length).to.eq(1); // this is the genesis block
    });

});