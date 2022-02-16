# vault-harmony-controller

## Install

`npm install --save @getsafle/vault-harmony-controller`

## Initialize the Harmony Controller class

```
const { KeyringController, getBalance } = require('@getsafle/vault-harmony-controller');

const harmonyController = new KeyringController({
  encryptor: {
    // An optional object for defining encryption schemes:
    // Defaults to Browser-native SubtleCrypto.
    encrypt(password, object) {
      return new Promise('encrypted!');
    },
    decrypt(password, encryptedString) {
      return new Promise({ foo: 'bar' });
    },
  },
});
```

## Methods

### Generate Keyring with 1 account and encrypt

```
const keyringState = await harmonyController.createNewVaultAndKeychain(password);
```

### Restore a keyring with the first account using a mnemonic

```
const keyringState = await harmonyController.createNewVaultAndRestore(password, mnemonic);
```

### Add a new account to the keyring object

```
const keyringState = await harmonyController.addNewAccount(keyringObject);
```

### Export the private key of an address present in the keyring

```
const privateKey = await harmonyController.exportAccount(address);
```

### Sign a transaction

```
const signedTx = await harmonyController.signTransaction(harmonyTx, _fromAddress);
```

### Sign a message

```
const signedMsg = await harmonyController.signMessage(msgParams);
```

### Sign Typed Data (EIP-712)

```
const signedData = await harmonyController.signTypedMessage(msgParams);
```

#### Raw transaction object

```
rawTx: {
  to, // receiver address
  from, // sender address
  value, // amount to send
  gas, // gas Limit of transaction
  gasPrice, // gasPrice
  data, // data in hex to send
  nonce, // transaction nonce
  chainId, // chainID | 1666700000 - TESTNET, 1666600000 - MAINNET
}
```

### Get balance

```
const balance = await getBalance(address, web3);
```
