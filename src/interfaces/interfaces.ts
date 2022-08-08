import {Transaction} from "../transaction";
//import {ec} from "elliptic";
//import KeyPair = ec.KeyPair;

export interface SignedTransaction {
    publicKey: string;
    transaction: Transaction;
}

export  interface UnsignedTransaction {
    toAddress: string;
    fromAddress: string;
    amount: number;
    timestamp: number;
}