import * as elliptic from "elliptic";
import crypto from 'crypto';
//import {ec} from "elliptic";
const EC = elliptic.ec;
import {Transaction} from "../transaction";
import {ISignedTransaction, IUnsignedTransaction} from "../interfaces/interfaces";
//import KeyPair = ec.KeyPair;
import {logger} from "../logger";

export class TransactionSigner {
    private IUnsignedTransaction: IUnsignedTransaction;
    private userPrivateKey: string;

    constructor(utx: IUnsignedTransaction, userPrivateKey: string) {
        this.IUnsignedTransaction = utx;
        this.userPrivateKey = userPrivateKey;
    }

    /**
     *
     * @param IUnsignedTransaction , {
        toAddress: string,
        fromAddress: string,
        amount: number,
    }
     * @param privateKey
     */
    public getSignedTransaction(): ISignedTransaction {
        const ec = new EC('secp256k1');
        const tx = new Transaction(this.IUnsignedTransaction.fromAddress,
            this.IUnsignedTransaction.toAddress,
            this.IUnsignedTransaction.amount);
        const key = ec.keyFromPrivate(this.userPrivateKey)
        tx.signTransaction(key)
        const publicKeyPair = ec.keyFromPublic(this.IUnsignedTransaction.fromAddress, 'hex')
        logger.debug(publicKeyPair);
        return {publicKey: publicKeyPair.getPublic('hex'), transaction: tx};
    }

    private calculateHash() {
        return crypto
            .createHash('sha256')
            .update(this.IUnsignedTransaction.fromAddress +
                this.IUnsignedTransaction.toAddress +
                this.IUnsignedTransaction.amount +
                this.IUnsignedTransaction.timestamp)
            .digest('hex');
    }

    /**
     * Signs a transaction with the given signingKey (which is an Elliptic keypair
     * object that contains a private key). The signature is then stored inside the
     * transaction object and later stored on the blockchain.
     *
     * @param {string} signingKey
     */
    signTransaction(signingKey) {
        // You can only send a transaction from the wallet that is linked to your
        // key. So here we check if the fromAddress matches your publicKey
        if (signingKey.getPublic('hex') !== this.IUnsignedTransaction.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets!');
        }

        // Calculate the hash of this transaction, sign it with the key
        // and store it inside the transaction object
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');

        return sig.toDER('hex');
    }

}