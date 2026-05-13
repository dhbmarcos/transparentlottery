class TransparentLottery
{
    constructor(base, height=undefined, terminal=undefined)
    {
        /* Base */
        if (!Number.isInteger(base)) {
            throw `Base paramenter must be an integer, not ${typeof base}.`;
        }
        if (base < 2 || base > 256) {
            throw `Base paramenter must be between 2 and 256, not ${base}.`;
        }
        this._base = base;

        /* Height */
        if (height !== undefined) {
            if (!Number.isInteger(height)) {
                throw `Height paramenter must be an integer, not ${typeof height}.`;
            }
            if (height < 0) {
                throw `Height paramenter must be greater than or equal to 0, not ${height}.`;
            }
        }
        this._height = height;

        /* Terminal */
        if (terminal !== undefined) {
            if (!(terminal instanceof HTMLElement)) {
                throw `Termimal paramenter must be an HTML element or a null value, not ${typeof terminal}.`;
            }
        }
        this._terminal = terminal;

    }

    async _getCurrentHeight()
    {
        const response = await fetch("https://mempool.space/api/blocks/tip/height");
        this._height   = await response.json();
        this.logTerminal(`Current height is <code>${this._height}</code>.`);
    }

    async _getSeed()
    {
        let response;

        try {
            const mempoolBlockHash = `https://mempool.space/api/block-height/${this._height}`;
            this.logTerminal(`Get the hash of block <code>${this._height}</code> from <b>Bitcoin Mempool</b> (<a href="${mempoolBlockHash}">${mempoolBlockHash}</a>)...`);

            try {
                response = await fetch(mempoolBlockHash);
                if (!response.ok) {
                    if (response.status == 404) {
                        return this._getBlockEstimate();
                    }
                    throw `Failed to get the hash of block ${this._height} from ${mempoolBlockHash}: Error ${response.status}: ${await response.text()}`;
                }
            } catch (error) {
                console.log(error);
                return this.logTerminal(`<samp>${error}</samp>`);
            }

            this._seed = await response.text();
            this.logTerminal(`The <b>hash</b> of <b>block</b> <code>${this._height}</code> is <code>${this._seed}</code>.`)

            const mempoolBlockData = `https://mempool.space/api/block/${this._seed}`;
            response = await fetch(mempoolBlockData);
            if (!response.ok) {
                throw `Failed to get the data of block ${this._seed} from ${mempoolBlockData}: Error ${response.status}${response.statusText}`;
            }

            const data      = await response.json();
            const timestamp = data.timestamp;
            this._instant   = new Date(timestamp * 1000).toISOString();
            this.logTerminal(`It was mined at ${this._instant}.`)

        } catch (error) {
            return this.logTerminal(`<samp>${error}</samp>`);
        }

        this.logTerminal(`Check it out at <a href="https://mempool.space/block/${this._seed}">https://mempool.space/block/${this._seed}</a>.`);
        this.logTerminal(`<b>Seed Draw Number</b>: <code>${this._seed}</code>.`)
    }

    async _getBlockEstimate()
    {
        let response        = await fetch("https://mempool.space/api/blocks/tip/height");
        const currentHeight = await response.json();

        response               = await fetch("https://mempool.space/api/blocks");
        const blocks           = await response.json();
        const currentTimestamp = blocks[0].timestamp;
        const deltaBlocks      = this._height - currentHeight;

        if (deltaBlocks < 0) {
            throw `Block ${this._height} already mined.`;
        }

        let interval = 10 * 60;
        if (blocks.length > 1) {
            const lastTime  = blocks[0].timestamp;
            const firstTime = blocks[blocks.length - 1].timestamp;
            interval        = (lastTime - firstTime) / blocks.length;
        }

        const seconds = deltaBlocks * interval;
        const date    = new Date((currentTimestamp + seconds) * 1000);

        this.logTerminal(`The block <code>${this._height}</code> is not mined yet.`);
        this.logTerminal(`Current block is <code>${currentHeight}</code>.`);
        this.logTerminal(`Please, wait mining and return back later.`);
        this.logTerminal(`Draw estimation:<b>${date.toISOString()}</b>, considering an average of <code>${(interval / 60).toFixed(2)} minute/block</code>.`);

        this._seed    = null;
        this._instant = date.toISOString();
    }

    async _rollHash(hash, roll=0)
    {
        if (roll > 0) {
            this.logTerminal(`Applying the SHA256 hash function ${roll}x to get <b>Draw Rool Number</b>...`)
        }

        for (let currentRoll = 0; currentRoll < roll; currentRoll++) {
            let bytes = new Uint8Array(hash.length / 2);
            for (let position = 0; position < hash.length; position += 2) {
                bytes[position / 2] = parseInt(hash.substr(position, 2), 16);
            }
            hash = await crypto.subtle.digest("SHA-256", bytes);
            hash = Array.from(new Uint8Array(hash)).map(function (value) {
                return value.toString(16).padStart(2, "0");
            }).join("");
            this.logTerminal(`<b>Draw Rool Number ${currentRoll + 1}</b>: <code>${hash}</code>.`);
        }
        return hash;
    }

    async _getDrawNumbers(hash, base)
    {
        try {
            hash = hash.padStart(64, "0");
            this.logTerminal(`Add zeros to the left of the Draw Rool Number to ensure it has 64 characters: <code">${hash}</code>`);

            this.logTerminal("Convert the Draw Number to base <code>10</code> for further calculations using JavaScript:");
            this.logTerminal(`<code>const draw_number_10 = BigInt("0x" + "${hash}")</code>`);
            hash = BigInt("0x" + hash);
            this.logTerminal(`<code>// draw_number_10 = "${hash}"</code>`);
            this.logTerminal(`<code>const base_10 = BigInt("0x" + ${base})</code>`);
            base = BigInt(base);
            this.logTerminal(`<code>// base = "${hash}"</code>`);
            this.logTerminal(`Convert the Draw Number to Game Base dividing it by <code>${base}</code> to get Draw Numbers. Each Draw Number is the rest the each division.`);

            let numbers = [];
            while (hash > 0) {
                this.logTerminal(`<code>${hash} / ${base} = ${hash / base}<code> and rest <code>${hash % base}</code>. <code">${hash % base}</code> is a Draw Number.`);
                if (!(hash / base > 0)) {
                    this.logTerminal("The last result of division is zero, then stop division.");
                }

                numbers.push(Number(hash % base));
                hash = hash / base;
            }

            let results = numbers.reverse();
            this.logTerminal(`Revert sequence of results to get Draw Numbers.`);
            this.logTerminal(`Draw Numbers: <code">${results}</code>`);
            return results;
        } catch (error) {
            console.error(hash, error);
            return `${hash} ${error}`;
        }
    }

    logTerminal(message)
    {
        if (this._terminal) {
            let paragraph = document.createElement("p");
            paragraph.innerHTML = message;
            this._terminal.appendChild(paragraph);
        }

        message = message.replace(/<[^>]*>?/gm, "");
        console.log(message);
        return message;
    }

    async draw(roll=0)
    {
        /* Roll */
        if (!Number.isInteger(roll)) {
            throw `Roll paramenter must be an integer, not ${typeof roll}.`;
        }
        if (roll < 0) {
            throw `Roll paramenter must be greater than or equal to 0, not ${roll}.`;
        }

        if (!this._height) {
            await this._getCurrentHeight();
        }

        if (!this._seed) {
            await this._getSeed()
            this.logTerminal(`<b>Draw Rool Number 0</b> is the <b>Seed Draw Number</b>: <code>${this._seed}</code>.`);
        }
        let hash = this._seed;
        hash = await this._rollHash(hash, roll);
        let numbers = await this._getDrawNumbers(hash, this._base);
        return numbers;
    }
}
