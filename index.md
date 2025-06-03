---
layout: default
title: Transparent Lottery
---

<p align="center">
  <img src="transparent-lottery.png" alt="Transparent Lottery Logo" width="300">
</p>

# Transparent Lottery

<a href="http://example.transparentlottery.com" target="_blank">
  <img src="https://img.shields.io/badge/ACCESS%20DRAW%20RESULTS%20NOW-FFA500?style=for-the-badge&logo=bitcoin&logoColor=white&labelColor=FFA500" />
</a>

Generation of pseudo-random numbers from a public, verifiable algorithm using Bitcoin network hashes.

With this innovation, betting games, raffles, and prizes can benefit from the transparency of the draws, ensuring that there will be no manipulation of the results. With this algorithm, anyone can verify the operation, making the process transparent.

## Number Drawing

For the generation of the drawn numbers, a **drawing seed number** is generated, which is unique for each Bitcoin block. As a Bitcoin block is generated, on average, every 10 minutes, a drawing can then be generated, on average, every 10 minutes.

When obtaining the block hash, which is a *256-bit* hash, or 64 hexadecimal characters from `0` to `F`, we call it the **drawing seed number**. This number is converted to a base number, according to the betting possibilities of the desired game. As the mining difficulty increases, the difficulty of obtaining draws increases. According to the desired base, there can be up to 256 results.

## Summarized Process:

1. Definition of the **game base**;
2. Definition of the **block number**;
3. Extraction of the **drawing seed number**;
4. Generation of the drawing results.

## Definition of the Game Base

Define the number of possibilities for each bet. This is the **game base**.

### Example

For a 6-sided die, the **game base** is `6`.

## Definition of the Block Number

Define a **block number** for values greater than the height of the last Bitcoin block, sufficient for all bets to be placed in a timely manner.

## Extraction of the Drawing Seed Number

Obtain the hash of the block of the defined height, after the first validation, because players can make the extraction after the first validation. The extracted value must be a 256-bit hash (64 hexadecimal digits). This is the **drawing seed number**.

### Example

For block 0, when checking the hash, we find the value `000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f` in hexadecimal. This is the **drawing seed number**.

## Generation of the Drawing Results

After obtaining the **drawing seed number**, convert it to the **game base**. The conversion algorithm used must be public so that it can be publicly verified.

### Example

For the **drawing seed number** `000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f`, for the base 6 game, the drawing results are `1`, `3`, `5`, `2`, `5`, `2`, `1`, `2`, `5`, `2`, `0`, `1`, `0`, `1`, `0`, `2`, `5`, `2`, `1`, `2`, `4`, `2`, `2`, `1`, `2`, `2`, `4`, `2`, `1`, `2`, `0`, `0`, `2`, `0`, `2`, `4`, `5`, `5`, `4`, `4`, `5`, `1`, `5`, `0`, `5`, `4`, `2`, `0`, `1`, `0`, `5`, `4`, `1`, `5`, `0`, `3`, `1`, `0`, `5`, `0`, `3`, `5`, `3`, `1`, `0`, `3`, `3`, `3`, `0`, `1`, `3`, `1`, `5`, `2`, `3`, `4`, `1`, `4`, `3`, `2`, `5`, `4`, `3`.

The conversion algorithm is the Python function below.

```python
def generate_draw_numbers(self, seed: str, base: int) -> list[int]:
    seed = int.from_bytes(bytes.fromhex(seed.zfill(64)), byteorder="big")
    numbers = []
    while seed > 0:
        numbers.append(seed % base)
        seed //= base
    return list(reversed(numbers))
```

## Bet Verification

The drawn number should only be considered valid if the block has 6 or more confirmations. It is not recommended to pay the prize before these confirmations. Each bet is managed by a betting system that this specification does not cover. The verification of a bet is done by verifying if each bettor managed to guess the drawn number.

---
*Copyright (C) 2025 D. H. B. Marcos*

***Deo omnis gloria***
