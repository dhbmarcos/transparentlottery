---
layout: main
title: Transparent Lottery
---

<p align="center">
  <img src="transparent-lottery.png" alt="Transparent Lottery Logo" width="300">
</p>

# Transparent Lottery

Generation of pseudo-random numbers from a public, verifiable algorithm using Bitcoin network hashes.

With this innovation, betting games, raffles, and prizes can benefit from the transparency of the draws, ensuring that there will be no manipulation of the results. With this algorithm, anyone can verify the operation, making the process transparent.

## Drawing

For the generation of the drawn numbers, a **drawing seed number** is generated, which is unique for each Bitcoin block. As a Bitcoin block is generated, on average, every 10 minutes, a drawing can then be generated, on average, every 10 minutes.

When obtaining the block hash, which is a *256-bit* hash, or 64 hexadecimal characters from `0` to `F`, we call it the **drawing seed number**. This number is converted to a base number, according to the betting possibilities of the desired game. As the mining difficulty increases, the difficulty of obtaining draws increases. According to the desired base, there can be up to 256 results.

## Bet Verification

The drawn number should only be considered valid if the block has 6 or more confirmations. It is not recommended to pay the prize before these confirmations. Each bet is managed by a betting system that this specification does not cover. The verification of a bet is done by verifying if each bettor managed to guess the drawn number.

## Technical Details

For more details, please refer to the [process documentation](https://transparentlottery.com/process).