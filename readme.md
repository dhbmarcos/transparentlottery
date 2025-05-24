<p align="center">
  <img src="transparent-lottery.png" alt="Transparent Lottery Logo" width="300">
</p>


# Transparent Lottery

Generation of pseudo-random numbers using a public algorithm based on Bitcoin network hashes.  
With this innovation, betting games, raffles, and prizes can benefit from the transparency of the draws, ensuring that results cannot be manipulated. With this algorithm, anyone can manually perform the operation, making the process transparent.

## Number Drawing

To generate random data for number formation, the hash of a specific Bitcoin block will be used. The block number is the draw number. Since a Bitcoin block is generated on average every 10 minutes, a draw can also be generated at the same interval. Upon obtaining the block hash— a 256-bit hash or 64 hexadecimal characters from 0 to F — it is converted to a decimal number. The conversion must consider all hexadecimal characters at once. This process yields up to 78 digits from 0 to 9. For the draw, only the 36 rightmost digits are used, since there can be a variable number of leading zeros depending on mining difficulty.

### Summary process:

1. Define the block number  
2. Extract the block hash  
3. Convert to decimal  
4. Extract 36 decimal digits

---

### Defining the Block Number

Choose a block number greater than the current Bitcoin block height, ensuring all bets can be placed in time.

### Extracting the Block Hash

Obtain the hash of the chosen block after its first confirmation, since players will be able to extract it after that point. The value must be a 256-bit hash (64 hexadecimal digits).

**Example**:  
For block 0, the hash is:

```
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```

### Conversion to Decimal

After obtaining the hash, convert it to a decimal (base 10) value. The conversion must consider all hash digits simultaneously.

The hexadecimal representation uses digits from 0 to F, corresponding to values from 0 to 15. In decimal representation, each hexadecimal digit is converted using:

```latex
$$
d = \sum_{p=0}^{63} h_p 	imes 16^p
$$
```

Where:
- `p` is the digit position, from right to left, starting at 0 to 63  
- `h_p` is the decimal value of the hexadecimal digit, as shown below:

| Hexadecimal | Decimal |
|-------------|---------|
| 0           | 0       |
| 1           | 1       |
| 2           | 2       |
| 3           | 3       |
| 4           | 4       |
| 5           | 5       |
| 6           | 6       |
| 7           | 7       |
| 8           | 8       |
| 9           | 9       |
| A           | 10      |
| B           | 11      |
| C           | 12      |
| D           | 13      |
| E           | 14      |
| F           | 15      |

**Expanded formula**:

```latex
$$
d = h_0 	imes 16^0 + h_1 	imes 16^1 + \dots + h_{63} 	imes 16^{63}
$$
```

**Example**:  
For the hash `000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f`, the resulting decimal is:

```
170063117907496993344802296311112793286231433463274784309528897279
```

---

### Extracting 36 Decimal Digits

After conversion, extract the 36 rightmost digits (from right to left):

**Example**:  
```
112793286231433463274784309528897279
```

---

## Generating Draw Results

From the resulting number, draw results can be generated using the following patterns:

- **Nonets**: 4 numbers with 9 digits each (0 to 999,999,999)  
- **Sextets**: 6 numbers with 6 digits each (0 to 999,999)  
- **Quartets**: 9 numbers with 4 digits each (0 to 9,999)  
- **Trios**: 12 numbers with 3 digits each (0 to 999)  
- **Pairs**: 18 numbers with 2 digits each (0 to 99)

**Example with number**: `112793286231433463274784309528897279`

- **Nonets**:  
  `112793286`, `231433463`, `274784309`, `528897279`

- **Sextets**:  
  `112793`, `286231`, `433463`, `274784`, `309528`, `897279`

- **Quartets**:  
  `1127`, `9328`, `6231`, `4334`, `6327`, `4784`, `3095`, `2889`, `7279`

- **Trios**:  
  `112`, `793`, `286`, `231`, `433`, `463`, `274`, `784`, `309`, `528`, `897`, `279`

- **Pairs**:  
  `11`, `27`, `93`, `28`, `62`, `31`, `43`, `34`, `63`, `27`, `47`, `84`, `30`, `95`, `28`, `89`, `72`, `79`

---

## Bet Verification

The drawn number is only considered valid if the block has **6 or more confirmations**.  
It is not recommended to pay prizes before these confirmations.  
A bet is verified by checking whether each player correctly guessed the drawn number.

**Odds per draw type**:

- **Nonets**: 1 in 1 billion (0.0000001%)  
- **Sextets**: 1 in 1 million (0.0001%)  
- **Quartets**: 1 in 10 thousand (0.01%)  
- **Trios**: 1 in 1 thousand (0.1%)  
- **Pairs**: 1 in 100 (1%)

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
