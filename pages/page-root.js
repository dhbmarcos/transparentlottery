(function ()
{
    class PageRoot extends HTMLElement
    {
        static get observedAttributes()
        {
            return ["title", "href", "description", "headerless", "footerless" ];
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
                document.title    = newValue;
            }

            if (attribute === "href") {
                window.page.href = newValue;
            }

            if (attribute === "description") {
                window.page.description = newValue;
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
                <link rel="stylesheet" href="w3-webcomponents.css">

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

                    #loading .spinner {
                        width:         100px;
                        aspect-ratio:  1;
                        border-radius: 50%;
                        border:        8px solid grey;
                        animation:
                            l20-1 0.8s infinite linear alternate,
                            l20-2 1.6s infinite linear;
                    }
                    @keyframes l20-1{
                        0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
                        12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
                        25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
                        50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
                        62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
                        75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
                        100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
                    }
                    @keyframes l20-2{
                        0%    {transform:scaleY(1)  rotate(0deg)}
                        49.99%{transform:scaleY(1)  rotate(135deg)}
                        50%   {transform:scaleY(-1) rotate(0deg)}
                        100%  {transform:scaleY(-1) rotate(-135deg)}
                    }
                </style>
                <div id="loading">
                    <div class="spinner"></div>
                </div>
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
