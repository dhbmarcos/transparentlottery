(function ()
{
    class PageSpinner extends HTMLElement
    {
        constructor()
        {
            super();
            this._shadowRoot = this.attachShadow({mode: "closed"})

        }

        connectedCallback()
        {

            const size = this.getAttribute('size') || '1em';

            this._shadowRoot.innerHTML = `
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
                <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-deep-orange.css">
                <link rel="stylesheet" href="/site/w3-webcomponents.css">

                <style>

                    :host {
                        --spinner-size: ${size};
                    }

                    .spinner {
                        width:         var(--spinner-size);
                        height:        var(--spinner-size);
                        aspect-ratio:  1;
                        border-radius: 50%;
                        border:        calc(var(--spinner-size) * 0.08) solid grey;
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
                <div class="spinner"></div>
                `;
        }
    }
    customElements.define("page-spinner", PageSpinner);
})();
