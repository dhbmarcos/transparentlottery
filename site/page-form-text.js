(function ()
{
    class PageFormText extends HTMLElement
    {
        static get observedAttributes()
        {
            return ["name", "title", "description", "default", "disabled"];
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

        get name()
        {
            return this.getAttribute("name") || "#";
        }

        set name(text)
        {
            this.setAttribute("name", text);
        }

        get title()
        {
            return this.getAttribute("title") || "#";
        }

        set title(text)
        {
            this.setAttribute("title", text);
        }

        get description()
        {
            return this.getAttribute("description") || "#";
        }

        set description(text)
        {
            this.setAttribute("description", text);
        }

        get default()
        {
            return this.getAttribute("default") || "";
        }

        set default(number)
        {
            this.setAttribute("default", number);
        }

        get value()
        {
            const input = this._shadowRoot.querySelector("input");
            if (!input) {
                return this.getAttribute("default");
            }
            return input.value;
        }

        set value(number)
        {
            const input = this._shadowRoot.querySelector("input");
            if (input) {
                input.value = number;
            }
        }

        get disabled()
        {
            return this.hasAttribute("disabled");
        }

        set disabled(value)
        {
            if (value) {
                this.setAttribute("disabled", "");
            } else {
                this.removeAttribute("disabled");
            }
        }

        render()
        {
            let name           = this.getAttribute("name");
            const title        = this.getAttribute("title") || "";
            const description  = this.getAttribute("description") || "";
            const defaultValue = this.getAttribute("default");
            const isDisabled   = this.hasAttribute("disabled");

            if (!name) {
                throw `Invalid input name attribute: ${name}`;
            }

            if (name) {
                name = name.replace(/<\/?[^>]+(>|$)/g, "") || "";
            }

            let content =`
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
                <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-deep-orange.css">
                <link rel="stylesheet" href="/site/w3-webcomponents.css">

                <label class="w3-margin-top">
                    <b class="w3-text-theme">${title}</b>
                    <br/>
                    <span class="w3-small">${description}</span>
                </label>
                <input name="${name}" type="text" class="w3-input"
            `;

            if (defaultValue) {
                content += ` value="${defaultValue}"`;
            }
            if (isDisabled) {
                content += ` disabled`;
            }

            content += ">";

            this._shadowRoot.innerHTML = content;
        }
    }
    customElements.define("page-form-text", PageFormText);
})();
