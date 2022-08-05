import crypto from 'crypto';
import {logger} from './logger';
import {Transaction} from "./transaction";

export class Block {
    previousHash: string;
    private timestamp: any;
    transactions: Transaction[];
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
     * Returns the SHA256 hash value of this block (by processing all the data stored
     * inside this block)
     *
     * @returns {string}
     */
    calculateHash(): string {
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
     * of the block starts with enough zeros. The number of zeros equals the value of
     * the parameter, difficulty.
     *
     * @param {number} difficulty
     */
    mineBlock(difficulty): void {
        while (
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
            ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        logger.debug(`Block mined: ${this.hash}`);
    }

    /**
     * Validates all the transactions inside this block (signature + hash).
     * Returns true if all the transactions in the block are valid.
     *
     * Returns false if any transaction in the block is invalid.
     *
     * @returns {boolean}
     */
    hasValidTransactions(): boolean {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
    }
}