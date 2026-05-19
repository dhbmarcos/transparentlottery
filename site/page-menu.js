(function ()
{
    class PageMenu extends HTMLElement
    {
        constructor()
        {
            super();
            this._shadowRoot = this.attachShadow({mode: "closed"}).innerHTML = `
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
                <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-deep-orange.css">
                <link rel="stylesheet" href="/site/w3-webcomponents.css">

                <div class="w3-container w3-center">
                    <div class="w3-bar">
                        <page-menu-item href="/#how-it-works">How it works</page-menu-item>
                        <page-menu-item emphasis href="/game">Make your own game</page-menu-item emphasis>
                    </div>
                </div>
               `;
        }
    }
    customElements.define("page-menu", PageMenu);
})();
