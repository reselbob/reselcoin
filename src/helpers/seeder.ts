import {logger} from '../logger';
import { faker } from '@faker-js/faker';
import {Blockchain} from "../blockchain";
import {Transaction} from "../transaction";
import {IUnsignedTransaction} from "../interfaces/interfaces";
import {TransactionSigner} from "./transactionSigner";
import * as elliptic from "elliptic";
import {Treasury} from "../agents/treasury";
const EC = elliptic.ec;

export class Seeder {
    private readonly miner: string;
    private seederPublicKey: string;

    constructor() {
        const ec = new EC('secp256k1');
        const kp = ec.genKeyPair();
        this.seederPublicKey = kp.getPublic('hex')
        this.miner = 'miner@reselcoin.io';

    }
    public seedBlockchain(blockchain: Blockchain, numberOfBlocks: number): Array<Transaction>{
        //run an ICO to fill the treasury
        const icoAmount = 2000;
        blockchain.executeIco(icoAmount)
        logger.info(`The treasury has ${blockchain.getBalanceOfAddress(Treasury.getTreasury().address)} coins`)
        logger.info(`Seeding blockchain with ${numberOfBlocks} blocks`);
        const transactions = new Array<Transaction>();
        for(let i = 0; i<numberOfBlocks; i++){
            const utx:IUnsignedTransaction = {
                toAddress: this.seederPublicKey,
                fromAddress: Treasury.getTreasury().address,
                amount: 1,
                timestamp: Date.now()
            }
            const signer = new TransactionSigner(utx, Treasury.getTreasury().privateKey);
            const signedTx = signer.getSignedTransaction();
            transactions.push(signedTx.transaction)
            blockchain.addTransaction(signedTx.transaction);
        }
        blockchain.minePendingTransactions(this.miner);
        logger.info(`${numberOfBlocks} coins have been transferred from Treasury to Seeder`)
        logger.info(`The treasury now has ${blockchain.getBalanceOfAddress(Treasury.getTreasury().address)} coins`)
        return transactions;

    }
    public getRandomIUnsignedTransaction(): IUnsignedTransaction {
        return {toAddress: faker.internet.email(),
            fromAddress:faker.internet.email(),
            amount: parseInt(faker.random.numeric()),
            timestamp: Date.now()
        }
    }


}