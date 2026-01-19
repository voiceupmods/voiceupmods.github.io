document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para os links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Funcionalidade das abas de plataforma (Fabric/Forge)
    const tabButtons = document.querySelectorAll('.tab-button');
    const platformContents = document.querySelectorAll('.platform-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            platformContents.forEach(content => content.classList.remove('active'));

            // Adiciona a classe 'active' ao botão clicado
            button.classList.add('active');

            // Adiciona a classe 'active' ao conteúdo correspondente
            const platform = button.dataset.platform; // Pega 'fabric' ou 'forge'
            document.getElementById(`${platform}-content`).classList.add('active');
        });
    });

    // Ativar a primeira aba por padrão
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
});