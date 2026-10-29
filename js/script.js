
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

        botaoMenu.setAttribute("aria-expanded", String(aberto));
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
   ANIMAÇÃO DO BANNER
   Foto primeiro; texto em seguida
======================================== */

const imagemBanner = document.querySelector(".banner__imagem");
const conteudoBanner = document.querySelector(".banner__conteudo");

if (imagemBanner && conteudoBanner) {
    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (movimentoReduzido) {
        imagemBanner.classList.add(
            "banner__elemento--visivel"
        );
        conteudoBanner.classList.add(
            "banner__elemento--visivel"
        );
    } else {
        document.documentElement.classList.add("js");

        // Prepara a posição inicial antes de revelar os elementos.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                imagemBanner.classList.add(
                    "banner__elemento--visivel"
                );

                window.setTimeout(() => {
                    conteudoBanner.classList.add(
                        "banner__elemento--visivel"
                    );
                }, 350);
            });
        });
    }
}
