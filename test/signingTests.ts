import {expect} from 'chai';
import {before, describe, it} from 'mocha';
import {logger} from '../src/logger';
import {Seeder} from "../src/helpers/seeder";
import {UnsignedTransaction} from "../src/interfaces/interfaces";
import {TransactionSigner} from "../src/helpers/transactionSigner";
import * as elliptic from "elliptic";
const EC = elliptic.ec;


describe('Signing Tests', () => {
    before(async () => {
        // tslint:disable-next-line:no-console
        logger.info('Signing Tests');
    });

    it('Can get signed transaction', async () => {
        const ec = new EC('secp256k1');
        const userKeyPair = ec.genKeyPair();
        const userPrivateKey = userKeyPair.getPrivate('hex');
        const userWalletAddress = userKeyPair.getPublic('hex');

        const seeder = new Seeder()
        const utx: UnsignedTransaction = seeder.getRandomUnsignedTransaction()
        utx.fromAddress = userWalletAddress;
        const signer = new TransactionSigner(utx, userPrivateKey);
        const signedTx = signer.getSignedTransaction();
        expect(signedTx).to.be.an('object');
        expect(signedTx.transaction.signature).to.be.a('string');
        expect(signedTx.publicKey).to.be.a('string');
    });

});