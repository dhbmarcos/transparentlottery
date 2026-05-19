(function ()
{
    class PageForm extends HTMLElement
    {
        static get observedAttributes()
        {
            return ["button-text", "disabled"];
        }

        constructor()
        {
            super();
            this._shadowRoot = this.attachShadow({mode: "closed"});
            this._shadowRoot.innerHTML = `
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
                <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-deep-orange.css">
                <link rel="stylesheet" href="/site/w3-webcomponents.css">

                <slot></slot>
                <button id="action-button" class="w3-button w3-theme w3-text-white w3-margin-top w3-block w3-round"></button>
                `;
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
            this._shadowRoot.getElementById("action-button").addEventListener("click", () => {
                this._getValues();
            });
            this.render();
        }

        _getValues()
        {
            const slot     = this._shadowRoot.querySelector('slot');
            const elements = slot.assignedElements({ flatten: true });

            const payload = {};

            elements.forEach(function (element) {
                if (element.tagName.toLowerCase() === 'page-form-number' || element.tagName.toLowerCase() === 'page-form-text') {
                    const key   = element.name;
                    const value = element.value;

                    if (key) {
                        payload[key] = value;
                    }
                }
            });

            this.dispatchEvent(new CustomEvent('form-execute', {
                detail:   payload,
                bubbles:  true,
                composed: true
            }));
        }

        get button_text()
        {
            return this.getAttribute("button-text") || "#";
        }

        set button_text(text)
        {
            this.setAttribute("button-text", text);
        }

        render()
        {
            const button_text = this.getAttribute("button-text") || "Submit";
            this._shadowRoot.getElementById("action-button").innerHTML = button_text;
        }
    }
    customElements.define("page-form", PageForm);
})();
