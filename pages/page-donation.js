(function ()
{
    class PageDonation extends HTMLElement
    {
        static get observedAttributes()
        {
            return ["bitcoin-address"];
        }

        constructor()
        {
            super();
            this._shadowRoot = this.attachShadow({mode: "closed"});
        }

        attributeChangedCallback(attribute, oldValue, newValue)
        {
            if (oldValue === newValue) {
                return;
            }

            this.render();
        }

        connectedCallback()
        {
            this.render();
        }

        get bitcoin_address()
        {
            return this.getAttribute("bitcoin-address");
        }

        set bitcoin_address(value)
        {
            this.setAttribute("bitcoin-address", value);
        }

        render()
        {
            const title   = window.page.title || "We";
            const address = this.bitcoin_address;

            let message = `${title} donation`;
            if (!window.page.title) {
                message = `Donation`;
            }

            const button      = "Copy transaction and paste in your wallet.";
            const transaction = `bitcoin:${address}?label=${encodeURIComponent(message)}&message=${encodeURIComponent(message)}`;
            const qrcode      = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(transaction)}`;

            this._shadowRoot.innerHTML = `
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
                <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-deep-orange.css">
                <link rel="stylesheet" href="w3-webcomponents.css">

                <a id="donation-open" class="w3-button w3-block w3-theme w3-hover-theme">${title} need your support!</a>
                <div id="donation-modal" class="w3-modal">
                <div class="w3-modal-content w3-white w3-round">
                    <div class="w3-container">
                        <span id="donation-close" class="w3-button w3-display-topright">&times;</span>
                        <div class="w3-container w3-padding-32 w3-center">
                            <h3 class="w3-text-theme w3-center">Donate to ${title}</h3>
                            <hr>
                            <p>
                                Send us any value to the address:<br>
                                <b>${address}</b>
                            </p>
                            <hr>
                            <p>You can use this QR code in your wallet to send us any value:</p>
                            <p>
                                <img src="${qrcode}">
                                <br>
                            </p>
                            <p>
                                <span id="donation-transaction" class="w3-small">${transaction}</span>
                                <br>
                                <button id="donation-copy" class="w3-small w3-button w3-round w3-theme">${button}</button>
                            </p>
                            <hr>
                            <p>Thanks for your support!</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Event Listeners acoplados diretamente aos elementos do Shadow DOM
            this._shadowRoot.getElementById("donation-open").addEventListener("click", () => {
                this._shadowRoot.getElementById("donation-modal").style.display = "block";
            });

            this._shadowRoot.getElementById("donation-close").addEventListener("click", () => {
                this._shadowRoot.getElementById("donation-modal").style.display = "none";
            });

            this._shadowRoot.getElementById("donation-copy").addEventListener("click", async () => {
                await navigator.clipboard.writeText(transaction);
                const donation_copy = this._shadowRoot.getElementById("donation-copy");
                donation_copy.innerText = "Copied!";
                setTimeout(function () {
                    donation_copy.innerText = button;
                }, 2000);
            });

        }
    }
    customElements.define("page-donation", PageDonation);
})();
