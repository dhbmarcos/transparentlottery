class TransparentLottery
{
    constructor(base, height, roll=0, terminal=undefined)
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
        if (!Number.isInteger(height)) {
            throw `Height paramenter must be an integer, not ${typeof height}.`;
        }
        if (height < 0) {
            throw `Height paramenter must be greater than or equal to 0, not ${height}.`;
        }
        this._height = height;

        /* Roll */
        if (!Number.isInteger(roll)) {
            throw `Roll paramenter must be an integer, not ${typeof roll}.`;
        }
        if (roll < 0) {
            throw `Roll paramenter must be greater than or equal to 0, not ${roll}.`;
        }
        this._roll = roll;

        /* Terminal */
        if (terminal !== undefined) {
            if (!(terminal instanceof HTMLElement)) {
                throw `Termimal paramenter must be an HTML element or a null value, not ${typeof terminal}.`;
            }
        }
        this._terminal = terminal;
    }

    async draw()
    {
        const block = await this._getBlock();
    }

    async _getBlock()
    {
        let response;

        try {
            const mempoolBlockHash = `https://mempool.space/api/block-height/${this._height}`;
            this.logTerminal(`Getting <b>block</b> <code>${this._height}</code> from <b>Bitcoin Mempool</b>...`);

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

            this._hash = await response.text();
            this.logTerminal(`The <b>hash</b> of <b>block</b> <code>${this._height}</code> is <code>${this._hash}</code>.`)

            const mempoolBlockData = `https://mempool.space/api/block/${this._hash}`;
            response = await fetch(mempoolBlockData);
            if (!response.ok) {
                throw `Failed to get the data of block ${this._hash} from ${mempoolBlockData}: Error ${response.status}${response.statusText}`;
            }

            const data      = await response.json();
            const timestamp = data.timestamp;
            this._instant   = new Date(timestamp * 1000).toISOString();
            this.logTerminal(`It was mined at ${this._instant}.`)

        } catch (error) {
            return this.logTerminal(`<samp>${error}</samp>`);
        }

        this.logTerminal(`Check it out at <a href="https://mempool.space/block/${this._hash}">https://mempool.space/block/${this._hash}</a>.`);
        this.logTerminal(`The <b>Seed Draw Number</b> is <code>${this._hash}</code>.`)
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

        this._hash    = null;
        this._instant = date.toISOString();
    }
}
