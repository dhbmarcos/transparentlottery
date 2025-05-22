---
layout: default
title: Transparent Lottery
---

<p align="center">
  <img src="transparent-lottery.png" alt="Transparent Lottery Logo" width="300">
</p>

# Transparent Lottery

Generation of pseudo-random numbers based on a public algorithm, using hashes from the Bitcoin network.

With this innovation, betting games, raffles, and prizes can benefit from the transparency of the draws, ensuring that the results cannot be manipulated. With this algorithm, anyone can manually perform the operation, making the process transparent.

## Number Drawing

To generate random data for forming numbers, the hash of a specific Bitcoin block is obtained. The block number is the draw number. Since a Bitcoin block is generated, on average, every 10 minutes, a draw can also be generated, on average, every 10 minutes.

When obtaining the block hash — which is a 256-bit hash, or 64 hexadecimal characters from 0 to F — this hash is converted into a decimal number. The conversion must be performed using all hexadecimal characters at once. This conversion generates up to 78 digits from 0 to 9. For number generation, only the leftmost 36 digits are considered. If 35 digits are generated, a zero is added as the 36th digit. If fewer than 35 digits are generated, the draw is canceled.

### Steps:

1. Define the block number;
2. Extract the block hash;
3. Convert to decimal;
4. Discard the draw if fewer than 35 digits are obtained;
5. Add a leading zero if exactly 35 digits are obtained.

## Generating Draw Results

After generating the draw, the numbers are extracted using the process described above. The drawn numbers can be interpreted in the following ways:

- **Nonets**: 4 numbers consisting of 9 digits, from 0 to 999,999,999;
- **Sextets**: 6 numbers consisting of 6 digits, from 0 to 999,999;
- **Quartets**: 9 numbers consisting of 4 digits, from 0 to 9,999;
- **Trios**: 12 numbers consisting of 3 digits, from 0 to 999;
- **Pairs**: 18 numbers consisting of 2 digits, from 0 to 99.

## Bet Verification

Each bet is managed by a betting system that is not covered by this specification. A bet is verified by determining whether each player correctly guessed the drawn number. The chances of winning are inversely proportional to the interpretation format of the draw:

- **Nonets**: 1 in 1 billion chance (0.0000001%) per number;
- **Sextets**: 1 in 1 million chance (0.0001%) per number;
- **Quartets**: 1 in 10 thousand chance (0.01%) per number;
- **Trios**: 1 in 1 thousand chance (0.1%) per number;
- **Pairs**: 1 in 100 chance (1%) per number.

# License 

Copyright (C) 2025 D. H. B. Marcos

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

D. O. G.
