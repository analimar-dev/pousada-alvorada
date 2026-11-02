
/* ========================================
   MENU DE NAVEGAÇÃO — POUSADA ALVORADA
======================================== */

const botaoMenu = document.querySelector(".menu__botao");
const navegacao = document.querySelector("#navegacao-principal");

if (botaoMenu && navegacao) {
    const linksNavegacao =
        navegacao.querySelectorAll(".navegacao__link");

    function fecharMenu() {
        navegacao.classList.remove("navegacao--aberta");

        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute(
            "aria-label",
            "Abrir menu de navegação"
        );
    }

    function abrirOuFecharMenu() {
        const aberto =
            navegacao.classList.toggle("navegacao--aberta");

        botaoMenu.setAttribute(
            "aria-expanded",
            String(aberto)
        );

        botaoMenu.setAttribute(
            "aria-label",
            aberto
                ? "Fechar menu de navegação"
                : "Abrir menu de navegação"
        );
    }

    botaoMenu.addEventListener("click", abrirOuFecharMenu);

    linksNavegacao.forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", (evento) => {
        if (
            evento.key === "Escape" &&
            navegacao.classList.contains("navegacao--aberta")
        ) {
            fecharMenu();
            botaoMenu.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            fecharMenu();
        }
    });
}


/* ========================================
   ANIMAÇÃO DO BANNER — POUSADA ALVORADA
   Foto primeiro; texto em seguida
======================================== */

const imagemBanner = document.querySelector(".banner__imagem");
const conteudoBanner = document.querySelector(".banner__conteudo");

if (imagemBanner && conteudoBanner) {

    function revelarBanner() {
        imagemBanner.classList.add(
            "banner__elemento--visivel"
        );

        conteudoBanner.classList.add(
            "banner__elemento--visivel"
        );
    }

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (movimentoReduzido) {

        /* Respeita a preferência por movimento reduzido. */
        revelarBanner();

    } else {

        /* Ativa as animações definidas no CSS. */
        document.documentElement.classList.add("js");

        /* Garante que o banner não fique invisível. */
        const segurancaBanner = window.setTimeout(() => {
            revelarBanner();
        }, 1500);

        /* Revela a foto primeiro e o texto em seguida. */
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {

                imagemBanner.classList.add(
                    "banner__elemento--visivel"
                );

                window.setTimeout(() => {
                    conteudoBanner.classList.add(
                        "banner__elemento--visivel"
                    );
                }, 350);

                window.clearTimeout(segurancaBanner);
            });
        });
    }
}


/* ========================================
   ANIMAÇÃO — CONHEÇA A POUSADA
   Segue o padrão visual do banner
======================================== */

const secaoSobre = document.querySelector(".sobre");

if (secaoSobre) {
    const elementosSobre = secaoSobre.querySelectorAll(
        ".sobre__titulo, " +
        ".sobre__detalhe, " +
        ".sobre__descricao, " +
        ".sobre__foto, " +
        ".sobre__botao"
    );

    const movimentoReduzidoSobre = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (movimentoReduzidoSobre) {
        elementosSobre.forEach((elemento) => {
            elemento.classList.add(
                "sobre__elemento--visivel"
            );
        });
    } else {
        document.documentElement.classList.add("js");

        elementosSobre.forEach((elemento, indice) => {
            elemento.classList.add("sobre__elemento");

            elemento.style.transitionDelay =
                `${Math.min(indice * 100, 400)}ms`;
        });

        if ("IntersectionObserver" in window) {
            const observadorSobre = new IntersectionObserver(
                (entradas, observador) => {
                    entradas.forEach((entrada) => {
                        if (entrada.isIntersecting) {
                            entrada.target.classList.add(
                                "sobre__elemento--visivel"
                            );

                            observador.unobserve(entrada.target);
                        }
                    });
                },
                {
                    threshold: 0.15,
                    rootMargin: "0px 0px -30px 0px"
                }
            );

            elementosSobre.forEach((elemento) => {
                observadorSobre.observe(elemento);
            });
        } else {
            elementosSobre.forEach((elemento) => {
                elemento.classList.add(
                    "sobre__elemento--visivel"
                );
            });
        }
    }
}

/* ========================================
   ANIMAÇÃO — NOSSOS QUARTOS
   Entrada suave e sequencial
======================================== */

const secaoQuartos = document.querySelector(".quartos");

if (secaoQuartos) {

    const elementosQuartos = secaoQuartos.querySelectorAll(
        ".quartos__titulo, " +
        ".quartos__detalhe, " +
        ".quartos__descricao, " +
        ".quartos__item, " +
        ".quartos__agendamento"
    );

    const movimentoReduzidoQuartos = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (movimentoReduzidoQuartos) {

        elementosQuartos.forEach((elemento) => {
            elemento.classList.add(
                "quartos__elemento--visivel"
            );
        });

    } else {

        document.documentElement.classList.add("js");

        elementosQuartos.forEach((elemento, indice) => {

            elemento.classList.add("quartos__elemento");

            elemento.style.transitionDelay =
                `${Math.min(indice * 120, 600)}ms`;

        });

        if ("IntersectionObserver" in window) {

            const observadorQuartos = new IntersectionObserver(

                (entradas, observador) => {

                    entradas.forEach((entrada) => {

                        if (entrada.isIntersecting) {

                            entrada.target.classList.add(
                                "quartos__elemento--visivel"
                            );

                            observador.unobserve(entrada.target);

                        }

                    });

                },

                {
                    threshold: 0.15,
                    rootMargin: "0px 0px -30px 0px"
                }

            );

            elementosQuartos.forEach((elemento) => {
                observadorQuartos.observe(elemento);
            });

        } else {

            elementosQuartos.forEach((elemento) => {
                elemento.classList.add(
                    "quartos__elemento--visivel"
                );
            });

        }

    }

}
