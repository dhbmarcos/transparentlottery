class TransparentLottery
{
    constructor(base, height, terminal=null, roll=0)
    {
        this._base     = base;
        this._height   = height;
        this._roll     = roll;
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

            response = await fetch(mempoolBlockHash);
            if (!response.ok) {
                if (response.status == 404) {
                    return this._blockEstimate();
                }
                throw `Failed to get the hash of block ${this._height} from ${mempoolBlockHash}: Error ${response.status}: ${await response.text()}`;
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
            this.instant    = new Date(timestamp * 1000).toLocaleString();
            this.logTerminal(`It was mined at ${this.instant}.`)

        } catch (error) {
            return this.logTerminal(`<samp>${error}</samp>`);
        }

        this.logTerminal(`Check it out at <a href="https://mempool.space/block/${this._hash}">https://mempool.space/block/${this._hash}</a>.`);
        this.logTerminal(`The <b>Seed Draw Number</b> is <code>${this._hash}</code>.`)
    }

    logTerminal(message)
    {
        console.log(message.replace(/<[^>]*>?/gm, ""));

        if (this._terminal) {
            let paragraph = document.createElement("p");
            paragraph.innerHTML = message;
            this._terminal.appendChild(paragraph);
        }
    }

    async _blockEstimate()
    {
        // TODO
    }
}
