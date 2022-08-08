import {expect} from 'chai';
import {before, describe, it} from 'mocha';
import {logger} from '../src/logger';
import {IMiner, ITreasury} from "../src/interfaces/interfaces";
import {Treasury} from "../src/agents/treasury";
import {Miner} from "../src/agents/miner";


describe('Agent Tests', () => {
    before(async () => {
        // tslint:disable-next-line:no-console
        logger.info('Agent Tests');
    });

    it('Can realize Treasury', async () => {
        const treasury: ITreasury = Treasury.getTreasury()
        expect(treasury.address).to.be.a('string');
        expect(treasury.publicKey).to.be.a('string');
        expect(treasury.privateKey).to.be.a('string');
        expect(treasury.friendlyName).to.be.a('string');
    });

    it('Can realize Miner', async () => {
        const miner: IMiner = Miner.getMiner()
        expect(miner.address).to.be.a('string');
        expect(miner.publicKey).to.be.a('string');
        expect(miner.privateKey).to.be.a('string');
        expect(miner.friendlyName).to.be.a('string');
    });

});