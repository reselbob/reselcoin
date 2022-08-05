import crypto from 'crypto';
import {logger} from './logger';

export class Block {
    previousHash: string;
    private timestamp: any;
    transactions: any;
    private nonce: number;
    public hash: string;
    /**
     * @param {number} timestamp
     * @param {Transaction[]} transactions
     * @param {string} previousHash
     */
    constructor(timestamp, transactions, previousHash = '') {
        logger.info('Constructing Block')
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    /**
     * Returns the SHA256 of this block (by processing all the data stored
     * inside this block)
     *
     * @returns {string}
     */
    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(
                this.previousHash +
                this.timestamp +
                JSON.stringify(this.transactions) +
                this.nonce
            )
            .digest('hex');
    }

    /**
     * Starts the mining process on the block. It changes the 'nonce' until the hash
     * of the block starts with enough zeros (= difficulty)
     *
     * @param {number} difficulty
     */
    mineBlock(difficulty) {
        while (
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
            ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        logger.debug(`Block mined: ${this.hash}`);
    }

    /**
     * Validates all the transactions inside this block (signature + hash) and
     * returns true if everything checks out. False if the block is invalid.
     *
     * @returns {boolean}
     */
    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
    }
}