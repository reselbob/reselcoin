import {logger} from '../logger';
import { faker } from '@faker-js/faker';
import {Blockchain} from "../blockchain";
import {Transaction} from "../transaction";
import {UnsignedTransaction} from "../interfaces/interfaces";


export class Seeder {
    private fromAddress:string;
    private toAddress: string;
    private miner: string;

    constructor() {
        this.toAddress = faker.internet.email();
        this.fromAddress = faker.internet.email();
        this.miner = 'miner@reselcoin.io';
    }
    public seedBlockchain(blockchain: Blockchain, numberOfBlocks: number): Array<Transaction>{
        logger.info(`Seeding blockchain with ${numberOfBlocks} blocks`);
        const transactions = new Array<Transaction>();
        for(let i = 0; i<numberOfBlocks; i++){
            const transaction = new Transaction(this.fromAddress, this.toAddress, parseInt(faker.random.numeric()));
            transactions.push(transaction)
            blockchain.addTransaction(transaction);
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