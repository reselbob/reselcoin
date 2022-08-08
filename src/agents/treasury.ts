import {logger} from '../logger';
import * as elliptic from "elliptic";
import {ITreasury} from "../interfaces/interfaces";
import {ec} from "elliptic";
import KeyPair = ec.KeyPair;
const EC = elliptic.ec
export class Treasury{
    static kp: KeyPair;

    constructor() {
        logger.info('Creating Treasury.')
    }

    public static getTreasury(): ITreasury {
        if(!this.kp){
            const ec = new EC('secp256k1');
            this.kp = ec.genKeyPair();
        }
        return {
            privateKey: this.kp.getPrivate('hex'),
            publicKey: this.kp.getPublic('hex'),
            address: this.kp.getPublic('hex'),
            friendlyName: 'Treasury'
        }
    }
}
