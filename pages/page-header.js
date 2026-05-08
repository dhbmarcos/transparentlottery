(function ()
{
    class PageHeader extends HTMLElement
    {
        constructor()
        {
            super();
            this._shadowRoot = this.attachShadow({mode: "closed"});
        }

        connectedCallback()
        {
            const title       = window.page["title"]       || "";
            const href        = window.page["href"]        || "#";
            const description = window.page["description"] || "";

            this._shadowRoot.innerHTML = `
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
                <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-deep-orange.css">
                <link rel="stylesheet" href="w3-webcomponents.css">

                <header class="w3-padding-32 w3-center w3-white">
                    <div class="w3-container">
                        <div class="w3-bar">
                            <a class="w3-bar-item w3-button w3-text-theme w3-large" href="${href}">
                                <b>${title}</b>
                            </a>
                            <span class="w3-bar-item">
                                ${description}
                            </span>
                        </div>
                    </div>
                    <page-menu></page-menu>
                </hader>
                `;
        }
    }
    customElements.define("page-header", PageHeader);
})();
