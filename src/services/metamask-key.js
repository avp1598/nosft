import { createWalletClient, custom, getAccount, keccak256 } from "viem";
import ECPairFactory from "ecpair";
import * as ecc from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";
import { TESTNET } from "@lib/constants";

const ECPair = ECPairFactory(ecc);

export const connectMetamask = async () => {
    const client = createWalletClient({
        transport: custom(window.ethereum),
    });
    const [address] = await client.getAddresses();
    const account = getAccount(address);

    const signature = await client.signMessage({
        account,
        data: "Sign this message to generate your Bitcoin Taproot key. This key will be used for your nosft.xyz transactions.",
    });
    const hash = keccak256(signature);

    const buffer = Buffer.from(hash.slice(2), "hex");

    const keyPair = ECPair.fromPrivateKey(buffer);

    const { address: btcAddress } = bitcoin.payments.p2tr({
        pubkey: keyPair.publicKey.slice(1, 33),
        network: TESTNET ? bitcoin.networks.testnet : bitcoin.networks.bitcoin,
    });
    return {
        address: btcAddress,
        ethAddress: address,
    };
};
