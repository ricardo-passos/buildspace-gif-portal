# Setup Rust and Solana

1 - Install rust: https://doc.rust-lang.org/book/ch01-01-installation.html
  - If everything goes well, these commands should work:
```bash
rustup --version && rustc --version && cargo --version
```
2 - Install Solana's Tool Suite: https://docs.solana.com/cli/install-solana-cli-tools#use-solanas-install-tool
  - Why? Well, this suite will install the Solana CLI and a test Solana Cluster. This means you will have a Solana "node" running on your machine where you can test your programs/smart contracts. If you've tinkered with Ethereum (and blockchains alike), think of it like Ganache.
  - If everything goes well, this commands should work:
```bash
solana --version
```
3 - Lastly, you'll need Anchor: https://project-serum.github.io/anchor/getting-started/installation.html#install-anchor
  - Anchor is a framework we use maily to compile our program/smart contract and deploy it to the blockchain. If you've tinkered with Ethreum, you can think of it being like a Hardhat
  - If everything goes well, this commands should work:
```bash
anchor --version
```

# Backend

1 - First set your Solana cluster to run on your machine:
```bash
solana config set --url localhost
```
2 - Then start the Solana cluster:
```bash
solana-test-validator
```
