var assert = require('assert');
const Web3 = require('web3')
const tokenContract = require('./contract-json/TestToken.json');
const CryptoJS = require('crypto-js');
const HarmonyKeyring = require('../src/index')
const {
    HD_WALLET_12_MNEMONIC,
    HD_WALLET_12_MNEMONIC_TEST_OTHER,
    TESTING_MESSAGE_1,
    TESTING_MESSAGE_2,
    TESTING_MESSAGE_3,
    HARMONY_NETWORK: {
        TESTNET,
        MAINNET
    },
    TRANSFER_HARMONY: {
        HARMONY_AMOUNT,
        HARMONY_RECEIVER
    },
    CONTRACT_TXN: {
        HARMONY_CONTRACT,
        HARMONY_AMOUNT_TO_CONTRACT
    },
} = require('./constants');

const CONTRACT_MINT_PARAM = {
    from: HARMONY_CONTRACT,
    to: '', // this will be the current account 
    amount: 1,
    nonce: 0,
    signature: [72, 0, 101, 0, 108, 0, 108, 0, 111, 0, 220, 122]
}

const opts = {
    encryptor: {
        encrypt(pass, object) {
            const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(object), pass).toString();

            return ciphertext;
        },
        decrypt(pass, encryptedString) {
            const bytes = CryptoJS.AES.decrypt(encryptedString, pass);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            return decryptedData;
        },
    },
}

const opts_empty = {}

const PASSWORD = "random_password"

/**
 * Transaction object type
 * {    from: from address,
        to: to address,
        value: amount (in wei),
        data: hex string}
 */

describe('Initialize wallet ', () => {
    const harmonyKeyring = new HarmonyKeyring(opts)

    it("Create new vault and keychain", async () => {
        const res = await harmonyKeyring.createNewVaultAndKeychain(PASSWORD)
        console.log("res ", res)
    })

    it("Create new vault and restore", async () => {
        const res = await harmonyKeyring.createNewVaultAndRestore(PASSWORD, HD_WALLET_12_MNEMONIC)
        assert(harmonyKeyring.keyrings[0].mnemonic === HD_WALLET_12_MNEMONIC, "Wrong mnemonic")
    })

    it("Export account (privateKey)", async () => {
        const res = await harmonyKeyring.getAccounts()
        let account = res[0]
        const accRes = await harmonyKeyring.exportAccount(account)
        console.log("accRes ", accRes, Buffer.from(accRes, 'hex'))
    })

    it("Get accounts", async () => {
        const acc = await harmonyKeyring.getAccounts()
        console.log("acc ", acc)
    })

    it("Get fees with manual gasLimit", async () => {
        const web3 = new Web3(TESTNET.URL);
        const tx = {
            gasLimit: 2100
        }
        const fees = await harmonyKeyring.getFees(tx, web3)
        console.log(" with manual gasLimit ", fees)

    })

})