import {expect} from 'chai';
import {before, describe, it} from 'mocha';
import {logger} from '../src/logger';
import {Block} from "../src/block";
import {Transaction} from "../src/transaction";

describe('Class Init Tests', () => {
    before(async () => {
        // tslint:disable-next-line:no-console
        logger.info('Starting Class Init Tests');
    });

    it('Can construct block', async () => {
        const block = new Block(Date.now(), null, null);
        expect(block).to.be.an('object');
    });

    it('Can create transaction', async () => {
        const transaction = new Transaction('fromAddress', 'toAddress', 1000)
        expect(transaction.toAddress).to.eq('toAddress');
        expect(transaction.fromAddress).to.eq('fromAddress');
        expect(transaction.amount).to.eq(1000);
    });
});