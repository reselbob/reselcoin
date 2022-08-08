import {Transaction} from "../transaction";

export interface ISignedTransaction {
    publicKey: string;
    transaction: Transaction;
}

export  interface IUnsignedTransaction {
    toAddress: string;
    fromAddress: string;
    amount: number;
    timestamp: number;
}

export interface IAgent {
    friendlyName: string;
    address: string;
    publicKey: string;
    privateKey: string;
}

export interface IMiner extends IAgent{};
export interface ITreasury extends IAgent{};
export interface IBuyer extends IAgent{};