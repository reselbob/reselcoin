import {logger} from '../logger';
import { faker } from '@faker-js/faker';
import {Blockchain} from "../blockchain";
import {Transaction} from "../transaction";
import {UnsignedTransaction} from "../interfaces/interfaces";
import {TransactionSigner} from "./transactionSigner";
import * as elliptic from "elliptic";
const EC = elliptic.ec;

export class Seeder {
    private readonly miner: string;
    private seederKeyPrivateKey: string;
    private seederKeyPublicKey: string;

    constructor() {
        const ec = new EC('secp256k1');
        const kp = ec.genKeyPair();
        this.seederKeyPrivateKey = kp.getPrivate('hex')
        this.seederKeyPublicKey = kp.getPublic('hex')
        this.miner = 'miner@reselcoin.io';

    }
    public seedBlockchain(blockchain: Blockchain, numberOfBlocks: number): Array<Transaction>{
        logger.info(`Seeding blockchain with ${numberOfBlocks} blocks`);
        const transactions = new Array<Transaction>();
        for(let i = 0; i<numberOfBlocks; i++){
            const utx = this.getRandomUnsignedTransaction();
            utx.fromAddress = this.seederKeyPublicKey;
            const signer = new TransactionSigner(utx, this.seederKeyPrivateKey);
            const signedTx = signer.getSignedTransaction();
            transactions.push(signedTx.transaction)
            blockchain.addTransaction(signedTx.transaction);
        }
        blockchain.minePendingTransactions(this.miner);
        return transactions;

    }
    public getRandomUnsignedTransaction(): UnsignedTransaction {
        return {toAddress: faker.internet.email(),
            fromAddress:faker.internet.email(),
            amount: parseInt(faker.random.numeric()),
            timestamp: Date.now()
        }
    }


}