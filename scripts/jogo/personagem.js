class Personagem {
    constructor(imagem) {
        this.imagem = imagem;
        this.matriz = [
            [0, 0], [220, 0], [440, 0], [660, 0],
            [0, 270], [220, 270], [440, 270], [660, 270],
            [0, 540], [220, 540], [440, 540], [660, 540],
            [0, 810], [220, 810], [440, 810], [660, 810]
        ]
        this.frameAtual = 0;
    }

    exibe() {
        image(this.imagem, 0, windowHeight - 135, 110, 135,
            this.matriz[this.frameAtual][0], this.matriz[this.frameAtual][1],
            220, 270);
    }

    anima() {
        this.frameAtual = (this.frameAtual + 1) % this.matriz.length;
    }
}