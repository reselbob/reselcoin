import {expect} from 'chai';
import {before, describe, it} from 'mocha';
import {logger} from '../src/logger';
import {Blockchain} from "../src/blockchain";
import {Seeder} from "../src/helpers/seeder";


describe('Seeder Tests', () => {
    before(async () => {
        // tslint:disable-next-line:no-console
        logger.info('Seeder Tests');
    });

    it('Can seed block with single transaction', async () => {
        const seeder = new Seeder();
        const blockchain = new Blockchain();
        const transactions = seeder.seedBlockchain(blockchain, 1);

        expect(transactions).to.be.an('array');

    });

});