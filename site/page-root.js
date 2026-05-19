(function ()
{
    class PageRoot extends HTMLElement
    {
        static get observedAttributes()
        {
            return ["title", "href", "description", "bitcoin-address", "headerless", "footerless" ];
        }

        constructor()
        {
            super();
            this._shadowRoot = this.attachShadow({mode: "closed"});

            if (!window.page) {
                window.page = {};
            }
        }

        attributeChangedCallback(attribute, oldValue, newValue)
        {
            if (oldValue === newValue) {
                return;
            }

            if (attribute === "title") {
                window.page.title = newValue;
            }

            if (attribute === "href") {
                window.page.href = newValue;
            }

            if (attribute === "description") {
                window.page.description = newValue;
            }

            if (attribute === "bitcoin-address") {
                window.page.bitcoin_address = newValue;
            }

            this.render();
        }

        get headerless()
        {
            return this.hasAttribute("headerless");
        }

        set headerless(value)
        {
            if (value) {
                this.setAttribute("headerless", "");
            } else {
                this.removeAttribute("headerless");
            }
        }

        get footerless()
        {
            return this.hasAttribute("footerless");
        }

        set footerless(value)
        {
            if (value) {
                this.setAttribute("footerless", "");
            } else {
                this.removeAttribute("footerless");
            }
        }

        connectedCallback()
        {
            this._setHtml();
            this._setBody();

            window.addEventListener("load", () => {
                const loading = this._shadowRoot.getElementById("loading");
                loading.classList.add("fade-out");
                loading.addEventListener("transitionend", function () {
                    this.remove();
                });
            });
        }

        render()
        {
            const bitcoin_address = window.page.bitcoin_address || "";

            let header = "<page-header></page-header>";
            if (this.headerless) {
                header = "";
            }

            let footer = "<page-footer></page-footer>";
            if (this.footerless) {
                footer = "";
            }

            this._shadowRoot.innerHTML = `
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
                <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-deep-orange.css">
                <link rel="stylesheet" href="/site/w3-webcomponents.css">

                <style>
                    #loading {
                        position:        fixed;
                        inset:           0;
                        background:      white;
                        z-index:         9999;
                        display:         flex;
                        align-items:     center;
                        justify-content: center;
                        opacity:         1;
                        transition:      opacity 0.8s ease;
                    }

                    #loading.fade-out {
                        opacity: 0;
                    }

                    #loading page-spinner {
                        height: 30%;
                    }

                </style>
                <div id="loading">
                    <page-spinner size="10vh"></page-spinner>
                </div>

                <page-donation bitcoin-address="${bitcoin_address}"></page-donation>

                ${header}
                <slot></slot>
                ${footer}
                `;
        }

        _setHtml()
        {
            document.documentElement.style.scrollBehavior = "smooth";
        }

        _setBody()
        {
            document.body.classList = ["w3-black"];
        }

    }
    customElements.define("page-root", PageRoot);
})();
