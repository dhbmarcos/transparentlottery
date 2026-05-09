(function ()
{
    class PageSession extends HTMLElement
    {
        static get observedAttributes()
        {
            return ["color", "full"];
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

        get color()
        {
            return this.getAttribute("color");
        }

        set color(value)
        {
            this.setAttribute("color", value);
        }

        render()
        {
            const color = this.getAttribute("color") || "white";

            this._shadowRoot.innerHTML = `
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
                <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-deep-orange.css">
                <link rel="stylesheet" href="/components/w3-webcomponents.css">

                <style>
                    :host {
                        display: block;
                    }

                    :host([full]) .w3-container {
                        min-height: 100vh;
                        display: flex !important;
                        flex-direction: column;
                        justify-content: center; /* Centraliza verticalmente */
                        align-items: center;     /* Centraliza horizontalmente */
                        padding-top: 0 !important;
                        padding-bottom: 0 !important;
                    }

                    :host([full]) .w3-content {
                        width: 100%;
                    }
                </style>

                <div class="v-full w3-container w3-padding-64 w3-${color} w3-center">
                    <div class="w3-content">
                        <slot></slot>
                    </div>
                </div>
                `;
        }
    }
    customElements.define("page-session", PageSession);
})();
