import {logger} from '../logger';
import * as elliptic from "elliptic";
import {IMiner} from "../interfaces/interfaces";
import {ec} from "elliptic";
import KeyPair = ec.KeyPair;
const EC = elliptic.ec;

export class Miner{
    static kp: KeyPair;

    constructor() {
        logger.info('Creating Miner.')
    }

    public static getMiner(): IMiner {
        if(!this.kp){
            const ec = new EC('secp256k1');
            this.kp = ec.genKeyPair();
        }
        return {
            privateKey: this.kp.getPrivate('hex'),
            publicKey: this.kp.getPublic('hex'),
            address: this.kp.getPublic('hex'),
            friendlyName: 'Miner'
        }
    }
}
