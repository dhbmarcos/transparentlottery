<p align="center">
  <img src="transparent-lottery.png" alt="Transparent Lottery Logo" width="300">
</p>

# Transparent Lottery

Generation of pseudo-random numbers using a public algorithm based on Bitcoin network hashes.  
With this innovation, betting games, raffles, and prizes can benefit from the transparency of the draws, ensuring that results cannot be manipulated. With this algorithm, anyone can manually perform the operation, making the process transparent.

Summary process:

1. Getting Draw of Number
2. Generating Draw Results
3. Bet Verification

## Getting Draw of Number

To generate random data for number formation, the hash of a specific Bitcoin block will be used. The block number is the draw number. Since a Bitcoin block is generated on average every 10 minutes, a draw can also be generated at the same interval. Upon obtaining the block hash— a 256-bit hash or 64 hexadecimal characters from 0 to F — it is converted to a decimal number. The conversion must consider all hexadecimal characters at once. This process yields up to 78 digits from 0 to 9. For the draw, only the 36 rightmost digits are used, since there can be a variable number of leading zeros depending on mining difficulty.

Summary process:

1. Define the block number  
2. Extract the block hash  
3. Convert to decimal  
4. Extract 36 decimal digits


### Defining the Block Number

Choose a block number greater than the current Bitcoin block height, ensuring all bets can be placed in time.

### Extracting the Block Hash

Obtain the hash of the chosen block after its first confirmation, since players will be able to extract it after that point. The value must be a 256-bit hash (64 hexadecimal digits).

#### Example
For block 0, the hash is:

```
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```

### Conversion to Decimal

After obtaining the hash, convert it to a decimal (base 10) value. The conversion must consider all hash digits simultaneously.

The hexadecimal representation uses digits from 0 to F, corresponding to values from 0 to 15. In decimal representation, each hexadecimal digit is converted using:

![](https://latex.codecogs.com/svg.image?d=\sum_{i=0}^{i=(64-1)}h_i\cdot&space;16^i)

Where:
- ![](https://latex.codecogs.com/svg.image?d) is the decimal value.
- ![](https://latex.codecogs.com/svg.image?i) is the digit position, from right to left, starting at 0 to 63.
- ![](https://latex.codecogs.com/svg.image?h_i) is the decimal value of the hexadecimal digit, as shown below:

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

The expanded formula is:

![](https://latex.codecogs.com/svg.image?d=h_{0}\cdot16^0&plus;h_{1}\cdot16^1&plus;h_{2}\cdot16^2&plus;h_{3}\cdot16^3&plus;h_{4}\cdot16^4&plus;h_{5}\cdot16^5&plus;h_{6}\cdot16^6&plus;h_{7}\cdot16^7)
![](https://latex.codecogs.com/svg.image?&plus;h_{8}\cdot16^8&plus;h_{9}\cdot16^9&plus;h_{10}\cdot16^{10}&plus;h_{11}\cdot16^{11}&plus;h_{12}\cdot16^{12}&plus;h_{13}\cdot16^{13}&plus;h_{14}\cdot16^{14}&plus;h_{15}\cdot16^{15})
![](https://latex.codecogs.com/svg.image?&plus;h_{16}\cdot16^{16}&plus;h_{17}\cdot16^{17}&plus;h_{18}\cdot16^{18}&plus;h_{19}\cdot16^{19}&plus;h_{20}\cdot16^{20}&plus;h_{21}\cdot16^{21}&plus;h_{22}\cdot16^{22}&plus;h_{23}\cdot16^{23})
![](https://latex.codecogs.com/svg.image?&plus;h_{24}\cdot16^{24}&plus;h_{25}\cdot16^{25}&plus;h_{26}\cdot16^{26}&plus;h_{27}\cdot16^{27}&plus;h_{28}\cdot16^{28}&plus;h_{29}\cdot16^{29}&plus;h_{30}\cdot16^{30}&plus;h_{31}\cdot16^{31})
![](https://latex.codecogs.com/svg.image?&plus;h_{32}\cdot16^{32}&plus;h_{33}\cdot16^{33}&plus;h_{34}\cdot16^{34}&plus;h_{35}\cdot16^{35}&plus;h_{36}\cdot16^{36}&plus;h_{37}\cdot16^{37}&plus;h_{38}\cdot16^{38}&plus;h_{39}\cdot16^{39})
![](https://latex.codecogs.com/svg.image?&plus;h_{40}\cdot16^{40}&plus;h_{41}\cdot16^{41}&plus;h_{42}\cdot16^{42}&plus;h_{43}\cdot16^{43}&plus;h_{44}\cdot16^{44}&plus;h_{45}\cdot16^{45}&plus;h_{46}\cdot16^{46}&plus;h_{47}\cdot16^{47})
![](https://latex.codecogs.com/svg.image?&plus;h_{48}\cdot16^{48}&plus;h_{49}\cdot16^{49}&plus;h_{50}\cdot16^{50}&plus;h_{51}\cdot16^{51}&plus;h_{52}\cdot16^{52}&plus;h_{53}\cdot16^{53}&plus;h_{54}\cdot16^{54}&plus;h_{55}\cdot16^{55})
![](https://latex.codecogs.com/svg.image?&plus;h_{56}\cdot16^{56}&plus;h_{57}\cdot16^{57}&plus;h_{58}\cdot16^{58}&plus;h_{59}\cdot16^{59}&plus;h_{60}\cdot16^{60}&plus;h_{61}\cdot16^{61}&plus;h_{62}\cdot16^{62}&plus;h_{63}\cdot16^{63})

#### Example:  

For the hash `000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f`, each digt separated is:

```
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, d, 6, 6, 8, 9, c, 0, 8, 5, a, e, 1, 6, 5, 8, 3, 1, e, 9, 3, 4, f, f, 7, 6, 3, a, e, 4, 6, a, 2, a, 6, c, 1, 7, 2, b, 3, f, 1, b, 6, 0, a, 8, c, e, 2, 6, f
```

Using table conversion:

```
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 13, 6, 6, 8, 9, 12, 0, 8, 5, 10, 14, 1, 6, 5, 8, 3, 1, 14, 9, 3, 4, 15, 15, 7, 6, 3, 10, 14, 4, 6, 10, 2, 10, 6, 12, 1, 7, 2, 11, 3, 15, 1, 11, 6, 0, 10, 8, 12, 14, 2, 6, 15
```

The expanded formula is:

![](https://latex.codecogs.com/svg.image?d=0\cdot16^0&plus;0\cdot16^1&plus;0\cdot16^2&plus;0\cdot16^3&plus;0\cdot16^4&plus;0\cdot16^5&plus;0\cdot16^6&plus;0\cdot16^7)
![](https://latex.codecogs.com/svg.image?&plus;0\cdot16^8&plus;0\cdot16^9&plus;1\cdot16^{10}&plus;9\cdot16^{11}&plus;13\cdot16^{12}&plus;6\cdot16^{13}&plus;6\cdot16^{14}&plus;8\cdot16^{15})
![](https://latex.codecogs.com/svg.image?&plus;9\cdot16^{16}&plus;12\cdot16^{17}&plus;0\cdot16^{18}&plus;8\cdot16^{19}&plus;5\cdot16^{20}&plus;10\cdot16^{21}&plus;14\cdot16^{22}&plus;1\cdot16^{23})
![](https://latex.codecogs.com/svg.image?&plus;6\cdot16^{24}&plus;5\cdot16^{25}&plus;8\cdot16^{26}&plus;3\cdot16^{27}&plus;1\cdot16^{28}&plus;14\cdot16^{29}&plus;9\cdot16^{30}&plus;3\cdot16^{31})
![](https://latex.codecogs.com/svg.image?&plus;4\cdot16^{32}&plus;15\cdot16^{33}&plus;15\cdot16^{34}&plus;7\cdot16^{35}&plus;6\cdot16^{36}&plus;3\cdot16^{37}&plus;10\cdot16^{38}&plus;14\cdot16^{39})
![](https://latex.codecogs.com/svg.image?&plus;4\cdot16^{40}&plus;6\cdot16^{41}&plus;10\cdot16^{42}&plus;2\cdot16^{43}&plus;10\cdot16^{44}&plus;6\cdot16^{45}&plus;12\cdot16^{46}&plus;1\cdot16^{47})
![](https://latex.codecogs.com/svg.image?&plus;7\cdot16^{48}&plus;2\cdot16^{49}&plus;11\cdot16^{50}&plus;3\cdot16^{51}&plus;15\cdot16^{52}&plus;1\cdot16^{53}&plus;11\cdot16^{54}&plus;6\cdot16^{55})
![](https://latex.codecogs.com/svg.image?&plus;0\cdot16^{56}&plus;10\cdot16^{57}&plus;8\cdot16^{58}&plus;12\cdot16^{59}&plus;14\cdot16^{60}&plus;2\cdot16^{61}&plus;6\cdot16^{62}&plus;15\cdot16^{63})

The results is

```
170063117907496993344802296311112793286231433463274784309528897279
```

### Extracting 36 Decimal Digits

After conversion, extract the 36 rightmost digits (from right to left):

#### Example

For `170063117907496993344802296311112793286231433463274784309528897279`, the 36 rightmost digits is

```
112793286231433463274784309528897279
```

## Generating Draw Results

From the resulting number, draw results can be generated using the following patterns:

- **Nonets**: 4 numbers with 9 digits each (0 to 999,999,999)  
- **Sextets**: 6 numbers with 6 digits each (0 to 999,999)  
- **Quartets**: 9 numbers with 4 digits each (0 to 9,999)  
- **Trios**: 12 numbers with 3 digits each (0 to 999)  
- **Pairs**: 18 numbers with 2 digits each (0 to 99)

#### Example

For number `112793286231433463274784309528897279` we have results:

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

---
Copyright (C) 2025 D. H. B. Marcos

DEO OMNIS GLORIA!
