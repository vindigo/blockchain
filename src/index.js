
import style from "./main.css";

const SHA256 = require("crypto-js/sha256");

class Transaction {
  constructor(fromAddress, toAddress, amount){
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = ""){
    this.timestamp = timestamp,
    this.transactions = transactions,
    this.previousHash = previousHash,
    this.hash = this.calculateHash(),
    this.nonce = 0;
  }

  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty){
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock(){
    return new Block("2018/01/01", "", "0");
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress){
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    this.chain.push(block);
    this.pendingTransactions = [
        new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }

  createTransaction(transaction){
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address){
    let balance = 0;
// console.log("chain: " + JSON.stringify(this.chain) );
    for (const block of this.chain){
      // console.log("block: " + JSON.stringify(block, null, 4) );
      for (const trans of block.transactions){

        console.log("trans.fromAddress: " + trans.fromAddress);
        console.log("trans.toAddress: " + trans.toAddress);

        if (trans.fromAddress === address){
          balance -= trans.amount;
        }

        if (trans.toAddress === address){
          balance += trans.amount;
        }

      }
    }

    console.log("end getBalanceOfAddress")
    return balance;
  }

  isChainValid(){
    for (let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash){
        return false;
      }

    }

    return true;
  }
}

let bitcoin = new Blockchain();

bitcoin.createTransaction(new Transaction("address1", "address2", 100));

bitcoin.createTransaction(new Transaction("address2", "address1", 50));
