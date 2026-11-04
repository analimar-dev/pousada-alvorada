
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
   ANIMAÇÃO DO BANNER — POUSADA ALVORADA
   Foto primeiro; textos em sequência
======================================== */

const secaoBanner = document.querySelector(".banner");

if (secaoBanner) {

    const imagemBanner = secaoBanner.querySelector(
        ".banner__imagem"
    );

    const conteudoBanner = secaoBanner.querySelector(
        ".banner__conteudo"
    );

    const elementosTexto = conteudoBanner
        ? conteudoBanner.querySelectorAll(
            ".banner__titulo, " +
            ".banner__subtitulo, " +
            ".banner__detalhe, " +
            ".banner__descricao, " +
            ".banner__botao"
        )
        : [];

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ------------------------------------
       ACESSIBILIDADE
       Movimento reduzido
    ------------------------------------ */

    function mostrarBannerImediatamente() {

        if (imagemBanner) {
            imagemBanner.style.opacity = "1";
            imagemBanner.style.transform = "none";
            imagemBanner.style.transition = "none";
        }

        if (conteudoBanner) {
            conteudoBanner.style.opacity = "1";
            conteudoBanner.style.transform = "none";
            conteudoBanner.style.transition = "none";
        }

        elementosTexto.forEach((elemento) => {
            elemento.style.opacity = "1";
            elemento.style.transform = "none";
            elemento.style.transition = "none";
        });
    }

    if (movimentoReduzido) {

        mostrarBannerImediatamente();

    } else {

        /* --------------------------------
           PREPARAÇÃO DA ANIMAÇÃO
        -------------------------------- */

        /* Mantém o conteúdo disponível. */
        if (conteudoBanner) {
            conteudoBanner.style.opacity = "1";
            conteudoBanner.style.transform = "none";
            conteudoBanner.style.transition = "none";
        }

        /* Prepara a fotografia para entrar. */
        if (imagemBanner) {
            imagemBanner.style.opacity = "0";
            imagemBanner.style.transform = "translateY(24px)";
            imagemBanner.style.transition =
                "opacity 0.9s ease, transform 0.9s ease";
        }

        /* Prepara os textos para entrarem em sequência. */
        elementosTexto.forEach((elemento) => {
            elemento.style.opacity = "0";
            elemento.style.transform = "translateY(20px)";
            elemento.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";
        });

        /* --------------------------------
           EXECUÇÃO DA ANIMAÇÃO
        -------------------------------- */

        function iniciarAnimacaoBanner() {

            if (imagemBanner) {

                /* Primeiro: fotografia. */
                imagemBanner.style.opacity = "1";
                imagemBanner.style.transform = "translateY(0)";
            }

            /* Depois: textos, um de cada vez. */
            elementosTexto.forEach((elemento, indice) => {

                window.setTimeout(() => {

                    elemento.style.opacity = "1";
                    elemento.style.transform = "translateY(0)";

                }, 650 + (indice * 180));

            });
        }

        /* --------------------------------
           OBSERVADOR DA SEÇÃO
        -------------------------------- */

        if ("IntersectionObserver" in window) {

            const observadorBanner = new IntersectionObserver(

                (entradas, observador) => {

                    entradas.forEach((entrada) => {

                        if (entrada.isIntersecting) {

                            iniciarAnimacaoBanner();

                            observador.unobserve(entrada.target);
                        }

                    });

                },

                {
                    threshold: 0.15,
                    rootMargin: "0px 0px -30px 0px"
                }

            );

            observadorBanner.observe(secaoBanner);

        } else {

            /* Compatibilidade com navegadores antigos. */
            iniciarAnimacaoBanner();

        }
    }
}

/* ========================================
   ANIMAÇÃO — CONHEÇA A POUSADA
   Fotografias primeiro; textos em seguida
======================================== */

const secaoSobre = document.querySelector(".sobre");

if (secaoSobre) {

    /* Fotografias da galeria */
    const fotosSobre = secaoSobre.querySelectorAll(
        ".sobre__foto"
    );

    /* Textos e botão */
    const textosSobre = secaoSobre.querySelectorAll(
        ".sobre__titulo, " +
        ".sobre__detalhe, " +
        ".sobre__descricao, " +
        ".sobre__botao"
    );

    /* Ordem de entrada: fotos e depois textos */
    const elementosSobre = [
        ...fotosSobre,
        ...textosSobre
    ];

    const movimentoReduzidoSobre = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ------------------------------------
       ACESSIBILIDADE
    ------------------------------------ */

    function mostrarSobreImediatamente() {

        elementosSobre.forEach((elemento) => {
            elemento.style.opacity = "1";
            elemento.style.transform = "none";
            elemento.style.transition = "none";
        });

    }

    if (movimentoReduzidoSobre) {

        mostrarSobreImediatamente();

    } else {

        /* --------------------------------
           PREPARAÇÃO DOS ELEMENTOS
        -------------------------------- */

        elementosSobre.forEach((elemento) => {

            elemento.style.opacity = "0";
            elemento.style.transform = "translateY(24px)";

            elemento.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

        });

        /* --------------------------------
           ENTRADA DAS FOTOGRAFIAS E TEXTOS
        -------------------------------- */

        function iniciarAnimacaoSobre() {

            elementosSobre.forEach((elemento, indice) => {

                const intervalo = 180;
                const inicioTextos = 550;

                const atraso = indice < fotosSobre.length
                    ? indice * intervalo
                    : inicioTextos +
                      (indice - fotosSobre.length) * intervalo;

                window.setTimeout(() => {

                    elemento.style.opacity = "1";
                    elemento.style.transform = "translateY(0)";

                }, atraso);

            });

        }

        /* --------------------------------
           OBSERVADOR DA SEÇÃO
        -------------------------------- */

        if ("IntersectionObserver" in window) {

            const observadorSobre = new IntersectionObserver(

                (entradas, observador) => {

                    entradas.forEach((entrada) => {

                        if (entrada.isIntersecting) {

                            iniciarAnimacaoSobre();

                            observador.unobserve(entrada.target);

                        }

                    });

                },

                {
                    threshold: 0.15,
                    rootMargin: "0px 0px -30px 0px"
                }

            );

            observadorSobre.observe(secaoSobre);

        } else {

            /* Compatibilidade com navegadores antigos */
            iniciarAnimacaoSobre();

        }

    }

}

/* ========================================
   ANIMAÇÃO — NOSSOS QUARTOS
   Fotografias primeiro; textos em seguida
======================================== */

const secaoQuartos = document.querySelector(".quartos");

if (secaoQuartos) {

    /* Fotografias dos quartos */
    const fotosQuartos = secaoQuartos.querySelectorAll(
        ".quartos__item"
    );

    /* Título, detalhe, descrição e botão */
    const textosQuartos = secaoQuartos.querySelectorAll(
        ".quartos__titulo, " +
        ".quartos__detalhe, " +
        ".quartos__descricao, " +
        ".quartos__botao"
    );

    /* Ordem de entrada: fotos e depois textos */
    const elementosQuartos = [
        ...fotosQuartos,
        ...textosQuartos
    ];

    const movimentoReduzidoQuartos = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ------------------------------------
       ACESSIBILIDADE
    ------------------------------------ */

    function mostrarQuartosImediatamente() {

        elementosQuartos.forEach((elemento) => {
            elemento.style.opacity = "1";
            elemento.style.transform = "none";
            elemento.style.transition = "none";
        });

    }

    if (movimentoReduzidoQuartos) {

        mostrarQuartosImediatamente();

    } else {

        /* --------------------------------
           PREPARAÇÃO DOS ELEMENTOS
        -------------------------------- */

        elementosQuartos.forEach((elemento) => {

            elemento.style.opacity = "0";
            elemento.style.transform = "translateY(24px)";

            elemento.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

        });

        /* --------------------------------
           ENTRADA DAS FOTOGRAFIAS E TEXTOS
        -------------------------------- */

        function iniciarAnimacaoQuartos() {

            elementosQuartos.forEach((elemento, indice) => {

                const intervalo = 180;
                const inicioTextos = 650;

                const atraso = indice < fotosQuartos.length
                    ? indice * intervalo
                    : inicioTextos +
                      (indice - fotosQuartos.length) * intervalo;

                window.setTimeout(() => {

                    elemento.style.opacity = "1";
                    elemento.style.transform = "translateY(0)";

                }, atraso);

            });

        }

        /* --------------------------------
           OBSERVADOR DA SEÇÃO
        -------------------------------- */

        if ("IntersectionObserver" in window) {

            const observadorQuartos = new IntersectionObserver(

                (entradas, observador) => {

                    entradas.forEach((entrada) => {

                        if (entrada.isIntersecting) {

                            iniciarAnimacaoQuartos();

                            observador.unobserve(entrada.target);

                        }

                    });

                },

                {
                    threshold: 0.15,
                    rootMargin: "0px 0px -30px 0px"
                }

            );

            observadorQuartos.observe(secaoQuartos);

        } else {

            /* Compatibilidade com navegadores antigos */
            iniciarAnimacaoQuartos();

        }

    }

}
/* ========================================
   ANIMAÇÃO — CAFÉ DA MANHÃ
   Fotografias primeiro; textos em seguida
======================================== */

const secaoCafe = document.querySelector(".cafe-da-manha");

if (secaoCafe) {

    /* Fotografias */
    const fotosCafe = secaoCafe.querySelectorAll(
        ".cafe-da-manha__item"
    );

    /* Textos e botão */
    const textosCafe = secaoCafe.querySelectorAll(
        ".cafe-da-manha__titulo, " +
        ".cafe-da-manha__detalhe, " +
        ".cafe-da-manha__descricao, " +
        ".cafe-da-manha__agendamento"
    );

    /* Ordem: fotografias e depois textos */
    const elementosCafe = [
        ...fotosCafe,
        ...textosCafe
    ];

    const movimentoReduzidoCafe = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* Acessibilidade */
    function mostrarCafeImediatamente() {

        elementosCafe.forEach((elemento) => {
            elemento.style.opacity = "1";
            elemento.style.transform = "none";
            elemento.style.transition = "none";
        });

    }

    if (movimentoReduzidoCafe) {

        mostrarCafeImediatamente();

    } else {

        /* Preparação dos elementos */
        elementosCafe.forEach((elemento) => {

            elemento.style.opacity = "0";
            elemento.style.transform = "translateY(24px)";

            elemento.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

        });

        /* Entrada sequencial */
        function iniciarAnimacaoCafe() {

            elementosCafe.forEach((elemento, indice) => {

                const intervalo = 180;
                const inicioTextos = 650;

                const atraso = indice < fotosCafe.length
                    ? indice * intervalo
                    : inicioTextos +
                      (indice - fotosCafe.length) * intervalo;

                window.setTimeout(() => {

                    elemento.style.opacity = "1";
                    elemento.style.transform = "translateY(0)";

                }, atraso);

            });

        }

        /* Observa a seção */
        if ("IntersectionObserver" in window) {

            const observadorCafe = new IntersectionObserver(

                (entradas, observador) => {

                    entradas.forEach((entrada) => {

                        if (entrada.isIntersecting) {

                            iniciarAnimacaoCafe();

                            observador.unobserve(entrada.target);

                        }

                    });

                },

                {
                    threshold: 0.15,
                    rootMargin: "0px 0px -30px 0px"
                }

            );

            observadorCafe.observe(secaoCafe);

        } else {

            iniciarAnimacaoCafe();

        }

    }

}