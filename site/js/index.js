window.onload = function() {
    console.log("Iniciando animação de pneus diagonais...");

    const body = document.body;

    // Link da imagem do pneu (Michelin)
    const urlImagemPneu = "https://cdn.awsli.com.br/2613/2613712/produto/246143222/pneu-michelin-aro-18-primacy-4-235-55r18-100v-1-5x51g8q1cu.jpg";

    // --- CONFIGURAÇÕES DA ANIMAÇÃO ---
    const numeroDePneus = 15;      // Quantos pneus aparecem na tela
    const velocidadeBase = 3;      // Velocidade de descida (maior = mais rápido)
    const velocidadeRotacao = 2;  // Velocidade de giro (maior = mais rápido)
    const tamanhoPneu = 80;        // Tamanho em pixels (largura e altura)
    // ---------------------------------

    // Lista para guardar os dados de cada pneu
    const listaPneus = [];

    // 1. Cria os elementos de pneu no HTML
    for (let i = 0; i < numeroDePneus; i++) {
        const pneu = document.createElement('img');
        pneu.src = urlImagemPneu;

        // Estiliza o pneu para flutuar no fundo
        pneu.style.position = "fixed";
        pneu.style.width = `${tamanhoPneu}px`;
        pneu.style.height = `${tamanhoPneu}px`;
        pneu.style.borderRadius = "50%"; // Garante que a imagem quadrada fique redonda
        pneu.style.zIndex = "-1000";       // Coloca atrás de todo o texto
        pneu.style.opacity = "0.6";        // Deixa semi-transparente para não atrapalhar a leitura

        // Define a posição inicial aleatória no topo da tela
        const posX = Math.random() * window.innerWidth; // Posição X aleatória
        const posY = Math.random() * -window.innerHeight; // Começa acima da tela
        pneu.style.left = `${posX}px`;
        pneu.style.top = `${posY}px`;

        // Adiciona o pneu ao corpo da página
        body.appendChild(pneu);

        // Guarda os dados deste pneu para animar depois
        listaPneus.push({
            elemento: pneu,
            x: posX,
            y: posY,
            angulo: Math.random() * 360, // Ângulo de rotação inicial aleatório
            velocidadeX: (Math.random() - 0.5) * velocidadeBase * 0.5, // Movimento horizontal leve
            velocidadeY: (Math.random() + 0.5) * velocidadeBase // Movimento vertical principal
        });
    }

    // 2. Função de Animação (roda a cada frame)
    function animarPneus() {
        // Pega a altura e largura atual da janela
        const larguraJanela = window.innerWidth;
        const alturaJanela = window.innerHeight;

        // Atualiza a posição de cada pneu
        for (let i = 0; i < listaPneus.length; i++) {
            const pneuData = listaPneus[i];

            // Move na diagonal (Y desce, X move um pouco)
            pneuData.y += pneuData.velocidadeY;
            pneuData.x += pneuData.velocidadeX;

            // Gira o pneu
            pneuData.angulo += velocidadeRotacao;

            // Aplica as novas posições e rotação
            pneuData.elemento.style.top = `${pneuData.y}px`;
            pneuData.elemento.style.left = `${pneuData.x}px`;
            pneuData.elemento.style.transform = `rotate(${pneuData.angulo}deg)`;

            // 3. Sistema de "Loop" - Se o pneu sair por baixo, volta para o topo
            if (pneuData.y > alturaJanela + tamanhoPneu) {
                pneuData.y = -tamanhoPneu; // Volta para acima do topo
                pneuData.x = Math.random() * larguraJanela; // Nova posição X aleatória
            }

            // Se sair pelas laterais, reaparece do outro lado
            if (pneuData.x > larguraJanela) { pneuData.x = -tamanhoPneu; }
            if (pneuData.x < -tamanhoPneu) { pneuData.x = larguraJanela; }
        }

        // Chama a função novamente no próximo frame para criar movimento contínuo
        requestAnimationFrame(animarPneus);
    }

    // Inicia a animação
    animarPneus();
};