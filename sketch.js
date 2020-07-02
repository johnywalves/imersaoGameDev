let imagemCenario;
let imagemPersonagem;
let imagemGameover;
let imagemInimigo;
let imagemInimigoGrande;
let imagemInimigoVoador;
let personagem;
let cenario;
let somDoJogo;
let somDoPulo;
let isPlaying;
let pontuacao;

const matrizInimigo = [
    [0, 0], [104, 0], [208, 0], [312, 0],
    [0, 104], [104, 104], [208, 104], [312, 104],
    [0, 208], [104, 208], [208, 208], [312, 208],
    [0, 312], [104, 312], [208, 312], [312, 312],
    [0, 416], [104, 416], [208, 416], [312, 416],
    [0, 520], [104, 520], [208, 520], [312, 520],
    [0, 624], [104, 624], [208, 624], [312, 624],
]
const matrizPersonagem = [
    [0, 0], [220, 0], [440, 0], [660, 0],
    [0, 270], [220, 270], [440, 270], [660, 270],
    [0, 540], [220, 540], [440, 540], [660, 540],
    [0, 810], [220, 810], [440, 810], [660, 810]
]
const matrizInimigoGrande = [
    [0, 0],
    [400, 0],
    [800, 0],
    [1200, 0],
    [1600, 0],
    [0, 400],
    [400, 400],
    [800, 400],
    [1200, 400],
    [1600, 400],
    [0, 800],
    [400, 800],
    [800, 800],
    [1200, 800],
    [1600, 800],
    [0, 1200],
    [400, 1200],
    [800, 1200],
    [1200, 1200],
    [1600, 1200],
    [0, 1600],
    [400, 1600],
    [800, 1600],
    [1200, 1600],
    [1600, 1600],
    [0, 2000],
    [400, 2000],
    [800, 2000],
]
const matrizInimigoVoador = [
    [0, 0],
    [200, 0],
    [400, 0],
    [0, 150],
    [200, 150],
    [400, 150],
    [0, 300],
    [200, 300],
    [400, 300],
    [0, 450],
    [200, 450],
    [400, 450],
    [0, 600],
    [200, 600],
    [400, 600],
    [0, 750],
]

const inimigos = []

function preload() {
    imagemCenario = loadImage('assets/imagens/cenario/floresta.png');
    imagemPersonagem = loadImage('assets/imagens/personagem/correndo.png');
    imagemGameover = loadImage('assets/imagens/assets/game-over.png');
    imagemInimigo = loadImage('assets/imagens/inimigos/gotinha.png');
    imagemInimigoGrande = loadImage('assets/imagens/inimigos/troll.png');
    imagemInimigoVoador = loadImage('assets/imagens/inimigos/gotinha-voadora.png');

    somDoJogo = loadSound('assets/sons/trilha_jogo.mp3');
    somDoPulo = loadSound('assets/sons/somPulo.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    pontuacao = new Pontuacao();
    personagem = new Personagem(matrizPersonagem, imagemPersonagem, 0, 30, 110, 135, 220, 270);
    const inimigo = new Inimigo(matrizInimigo, imagemInimigo, width - 52, 30, 52, 52, 104, 104, 10, 200);
    const inimigoVoador = new Inimigo(matrizInimigoVoador, imagemInimigoVoador, width - 52, 200, 100, 75, 200, 150, 10, 1500);
    const inimigoGrande = new Inimigo(matrizInimigoGrande, imagemInimigoGrande, width * 1.5, 0, 200, 200, 400, 400, 10, 2500);

    inimigos.push(inimigo);
    inimigos.push(inimigoVoador);
    inimigos.push(inimigoGrande);

    cenario = new Cenario(imagemCenario, 3);
}

function draw() {
    cenario.exibe();
    cenario.move();

    personagem.exibe();
    personagem.aplicaGravidade();

    pontuacao.exibe();
    pontuacao.adicionarPonto();

    inimigos.forEach(inimigo => {
        inimigo.exibe();
        inimigo.move();

        if (personagem.estaColidindo(inimigo)) {
            image(imagemGameover, width / 2 - 200, height / 3);
            noLoop();
        }
    })
}

function keyPressed() {
    if (key === "ArrowUp") {
        personagem.pula(somDoPulo);
    }
}

function mousePressed() {
    if (!isPlaying) {
        //somDoJogo.loop();
        isPlaying = true;
    }
}
