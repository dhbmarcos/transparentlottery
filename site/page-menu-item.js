(function ()
{
    class PageMenuItem extends HTMLElement
    {
        static get observedAttributes()
        {
            return ["href", "emphasis"];
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

        get href()
        {
            return this.getAttribute("href") || "#";
        }

        set href(value)
        {
            this.setAttribute("href", value);
        }

        get emphasis()
        {
            return this.hasAttribute("emphasis");
        }

        set emphasis(value)
        {
            if (value) {
                this.setAttribute("emphasis", "");
            } else {
                this.removeAttribute("emphasis");
            }
        }

        render()
        {
            const href = this.getAttribute("href");

            let content = `
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
                <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-deep-orange.css">
                <link rel="stylesheet" href="/site/w3-webcomponents.css">
                `;
            if (this.emphasis) {
                content += `<a class="w3-bar-item w3-button w3-theme w3-round" href="${href}">`;
            } else {
                content += `<a class="w3-bar-item w3-button" href="${href}">`;
            }
            content += `<slot></slot></a>`;

            this._shadowRoot.innerHTML = content;
        }
    }
    customElements.define("page-menu-item", PageMenuItem);
})();
