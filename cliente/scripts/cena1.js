/*
File: cena1.js
Author: Arthur Cadore(IFSC)
Date: 26 / 12 / 2020
Brief: second import archive.
*/

// [Arthur] importando a cena seguinte do arquivo "cena2.js"
import { cena2 } from "./cena2.js";

// [Arthur] Adicionando variáveis ao código para execução dos comandos.
var player1;
var player2;
var platforms;
var pointer;
var touchX;
var touchY;
var water;
var water2;
var water3;
var gate;
var trilha;
var pular;
var life = 0;
var lifeText;
var timedEvent;
var timer;
var timerText;
var jogador;
var cena1 = new Phaser.Scene("Cena 1");
var ice_servers = {
    iceServers: [{ url: "stun:stun.l.google.com:19302" }],
};
var localConnection;
var remoteConnection;
var midias;
const audio = document.querySelector("audio");

// ===============================================================================
// [Arthur] Iniciando a função Preload, para carregar os arquivos iniciais da cena.
cena1.preload = function () {
    // [Arthur] Carregando imagens para a cena.
    this.load.image("sky", "./assets/plano de fundo.png");
    this.load.image("ground", "./assets/plataformagelo.png");
    this.load.image("wall", "./assets/plataformagelovertical.png");
    this.load.image("slab", "./assets/plataformagelohorizontalmeiobloco.png");

    // [Arthur] Carregando audios para a cena.
    this.load.audio("musica", "./assets/musica0.mp3");
    this.load.audio("pular", "./assets/pular.mp3");

    // [Arthur] Carregando sprites para a cena.
    this.load.spritesheet("dude", "./assets/dino1.png", {
        frameWidth: 24,
        frameHeight: 24,
    });
    this.load.spritesheet("dude2", "./assets/dino1.png", {
        frameWidth: 24,
        frameHeight: 24,
    });
    this.load.spritesheet("water", "./assets/liquido.agua.png", {
        frameWidth: 128,
        frameHeight: 16,
    });
    this.load.spritesheet("gate", "./assets/Portal.agua1.png", {
        frameWidth: 64,
        frameHeight: 64,
    });
    this.load.spritesheet("fullscreen", "./assets/fullscreen.png", {
        frameWidth: 64,
        frameHeight: 64,
    });

    // Iniciando Toque na tela
    this.load.spritesheet("esquerda", "./assets/esquerda.png", {
        frameWidth: 64,
        frameHeight: 64,
    });
    this.load.spritesheet("direita", "./assets/direita.png", {
        frameWidth: 64,
        frameHeight: 64,
    });
    this.load.spritesheet("cima", "./assets/cima.png", {
        frameWidth: 64,
        frameHeight: 64,
    });

};

// ===============================================================================
// [Arthur] Iniciando a função create, para montar os componentes da cena.
cena1.create = function () {
    // [Arthur] Incluido o som da musica a cena, e em seguida dando play.
    trilha = this.sound.add("musica");
    trilha.play();

    // [Arthur] Incluindo os sons de efeito a cena.
    pular = this.sound.add("pular");

    // [Arthur] Incluindo a imagem de fundo a cena.
    this.add.image(400, 300, "sky");

    // [Arthur] Incluido a sprite do portal a cena e em seguida, criando a animação.
    gate = this.physics.add.sprite(736, 120, "gate");
    this.anims.create({
        key: "gateon",
        frames: this.anims.generateFrameNumbers("gate", { start: 1, end: 4 }),
        frameRate: 10,
        repeat: -1,
    });
    gate.anims.play("gateon");

    // [Arthur] Incluindo a sprite de água a cena e em seguinda, criando a animação.
    water = this.physics.add.sprite(222, 382, "water");
    this.anims.create({
        key: "wateron",
        frames: this.anims.generateFrameNumbers("water", { start: 1, end: 4 }),
        frameRate: 10,
        repeat: -1,
    });
    water.anims.play("wateron");

    // [Arthur] Incluindo a sprite de água a cena e em seguinda, criando a animação.
    water2 = this.physics.add.sprite(382, 574, "water");
    this.anims.create({
        key: "wateron",
        frames: this.anims.generateFrameNumbers("water2", { start: 1, end: 4 }),
        frameRate: 10,
        repeat: -1,
    });
    water2.anims.play("wateron");

    // [Arthur] Incluindo a sprite de água a cena e em seguinda, criando a animação.
    water3 = this.physics.add.sprite(572, 254, "water");
    this.anims.create({
        key: "wateron",
        frames: this.anims.generateFrameNumbers("water3", { start: 1, end: 4 }),
        frameRate: 10,
        repeat: -1,
    });
    water3.anims.play("wateron");

    // ================================================
    // [Arthur] Incluindo o grupo de plataformas a cena, grupo definido como estático.

    platforms = this.physics.add.staticGroup();

    // [Arthur] Incluindo grupo de plataformas do piso.
    platforms.create(64, 582, "ground");
    platforms.create(256, 582, "ground");
    platforms.create(192, 582, "ground");
    platforms.create(384, 590, "slab");
    platforms.create(512, 582, "ground");
    platforms.create(640, 582, "ground");
    platforms.create(768, 582, "ground");

    // [Arthur] Incluindo grupo de plataformas do teto.
    platforms.create(64, 8, "ground");
    platforms.create(256, 8, "ground");
    platforms.create(192, 8, "ground");
    platforms.create(384, 8, "ground");
    platforms.create(512, 8, "ground");
    platforms.create(640, 8, "ground");
    platforms.create(768, 8, "ground");

    // [Arthur] Incluindo grupo de plataformas do 1º andar.
    platforms.create(96, 486, "ground");
    platforms.create(224, 486, "ground");
    platforms.create(704, 486, "ground");

    // [Arthur] Incluindo grupo de plataformas do 2º andar.
    platforms.create(96, 390, "ground");
    platforms.create(224, 398, "slab");
    platforms.create(352, 390, "ground");
    platforms.create(480, 390, "ground");
    platforms.create(544, 390, "ground");

    // [Arthur] Incluindo grupo de plataformas do 3º andar.
    platforms.create(32, 294, "ground");

    // [Arthur] Incluindo grupo de plataformas do 4º andar.
    platforms.create(704, 262, "ground");
    platforms.create(576, 270, "slab");
    platforms.create(448, 262, "ground");
    platforms.create(352, 230, "ground");
    platforms.create(224, 230, "ground");

    // [Arthur] Incluindo grupo de plataformas do 5º andar.
    platforms.create(704, 166, "ground");

    // [Arthur] Incluindo grupo de plataformas da parede esquerda.
    platforms.create(16, 534, "wall");
    platforms.create(16, 406, "wall");
    platforms.create(16, 278, "wall");
    platforms.create(16, 150, "wall");
    platforms.create(16, 22, "wall");

    // [Arthur] Incluindo grupo de plataformas da parede direita.
    platforms.create(784, 534, "wall");
    platforms.create(784, 406, "wall");
    platforms.create(784, 278, "wall");
    platforms.create(784, 150, "wall");
    platforms.create(784, 22, "wall");

    // ================================================
    // [Arthur] Incluindo grupo de sprites a cena.

    // Interação por toque de tela (até 2 toques simultâneos: 0 a 1)
    pointer = this.input.addPointer(1);

    // [Arthur] Incluindo sprites do player Nº 1.
    player1 = this.physics.add.sprite(128, 500, "dude");
    //   player1.setBounce(0.2);
    player1.setCollideWorldBounds(true);

    // [Arthur] Incluindo as funções de movimentação do personagem Nº1.
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 1 }],
        frameRate: 20,
    });

    // [Arthur] Incluindo sprites do player Nº 1.
    player2 = this.physics.add.sprite(128, 400, "dude2");
    //   player2.setBounce(0.2);
    player2.setCollideWorldBounds(true);

    // [Arthur] Incluindo as funções de movimentação do personagem Nº2.
    this.anims.create({
        key: "left2",
        frames: this.anims.generateFrameNumbers("dude2", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: "right2",
        frames: this.anims.generateFrameNumbers("dude2", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: "turn2",
        frames: [{ key: "dude2", frame: 1 }],
        frameRate: 20,
    });

    // [Arthur] Igualando as funções de sprite aos cursores da funçao seguinte.
    //cursors = this.input.keyboard.createCursorKeys();

    // [Arthur] Adicionando sistema de colisão a fase.
    this.physics.add.collider(player1, platforms, null, null, this);
    this.physics.add.collider(player2, platforms, null, null, this);
    this.physics.add.collider(water, platforms, null, null, this);
    this.physics.add.collider(water2, platforms, null, null, this);
    this.physics.add.collider(water3, platforms, null, null, this);
    this.physics.add.collider(gate, platforms, null, null, this);


    // D-pad
    var esquerda = this.add
        .image(50, 550, "esquerda", 0)
        .setInteractive()
        .setScrollFactor(0);
    var direita = this.add
        .image(125, 550, "direita", 0)
        .setInteractive()
        .setScrollFactor(0);
    var cima = this.add
        .image(750, 475, "cima", 0)
        .setInteractive()
        .setScrollFactor(0);


    // [Arthur] Função para avançar a cena, posteriormente será trocada por um evento de colisão.
    this.input.keyboard.on(
        "keydown_X",
        function () {
            trilha.stop();
            this.scene.start(cena2);
        },
        this
    );

    // [Arthur] Adicionando a função de ligar / desligar a tela cheia.
    var button = this.add
        .image(800 - 16, 16, "fullscreen", 0)
        .setOrigin(1, 0)
        .setInteractive()
        .setScrollFactor(0);
    button.on(
        "pointerup",
        function () {
            if (this.scale.isFullscreen) {
                button.setFrame(0);
                this.scale.stopFullscreen();
            } else {
                button.setFrame(1);
                this.scale.startFullscreen();
            }
        },
        this
    );

    // [Arthur] Adiconando a função de tela cheia a partir da tecla F.
    var FKey = this.input.keyboard.addKey("F");
    FKey.on(
        "down",
        function () {
            if (this.scale.isFullscreen) {
                button.setFrame(0);
                this.scale.stopFullscreen();
            } else {
                button.setFrame(1);
                this.scale.startFullscreen();
            }
        },
        this
    );

    // [Arthur] Adicionando contador a fase do jogo.
    lifeText = this.add.text(20, 24, life, {
        fontSize: "32px",
        fill: "#cccccc",
    });
    lifeText.setScrollFactor(0);
    timerText = this.add.text(16, 16, timer, {
        fontSize: "32px",
        fill: "#000",
        fill: "#000000",
    });
    timerText.setScrollFactor(0);

    // Conectar no servidor via WebSocket
    this.socket = io();

    // Disparar evento quando jogador entrar na partida
    var self = this;
    var physics = this.physics;
    var cameras = this.cameras;
    var time = this.time;
    var socket = this.socket;

    this.socket.on("jogadores", function (jogadores) {
        if (jogadores.primeiro === self.socket.id) {
            // Define jogador como o primeiro
            jogador = 1;
            player2.body.setAllowGravity(false);

            esquerda.on("pointerover", () => {

                esquerda.setFrame(1);
                player1.setVelocityX(-160);
                player1.anims.play("left1", true);

            });
            esquerda.on("pointerout", () => {

                esquerda.setFrame(0);
                player1.setVelocityX(0);
                player1.anims.play("stopped1", true);

            });
            direita.on("pointerover", () => {

                direita.setFrame(1);
                player1.setVelocityX(160);
                player1.anims.play("right1", true);

            });
            direita.on("pointerout", () => {

                direita.setFrame(0);
                player1.setVelocityX(0);
                player1.anims.play("stopped1", true);

            });
            cima.on("pointerover", () => {

                cima.setFrame(1);
                player1.setVelocityY(-160);
                player1.anims.play("right1", true);

            });
            cima.on("pointerout", () => {

                cima.setFrame(0);
                player1.setVelocityY(0);
                player1.anims.play("stopped1", true);

            });
            navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .then((stream) => {
                    midias = stream;
                })
                .catch((error) => console.log(error));




        } else if (jogadores.segundo === self.socket.id) {
            // Define jogador como o segundo
            jogador = 2;
            player1.body.setAllowGravity(false);

            esquerda.on("pointerover", () => {

                esquerda.setFrame(1);
                player2.setVelocityX(-160);
                player2.anims.play("left2", true);

            });
            esquerda.on("pointerout", () => {

                esquerda.setFrame(0);
                player2.setVelocityX(0);
                player2.anims.play("stopped2", true);

            });
            direita.on("pointerover", () => {

                direita.setFrame(1);
                player2.setVelocityX(160);
                player2.anims.play("right2", true);

            });
            direita.on("pointerout", () => {

                direita.setFrame(0);
                player2.setVelocityX(0);
                player2.anims.play("stopped2", true);

            });
            cima.on("pointerover", () => {

                cima.setFrame(1);
                player2.setVelocityY(-160);
                player2.anims.play("right2", true);

            });
            cima.on("pointerout", () => {

                cima.setFrame(0);
                player2.setVelocityY(0);
                player2.anims.play("stopped2", true);

            });

            navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .then((stream) => {
                    midias = stream;
                    localConnection = new RTCPeerConnection(ice_servers);
                    midias
                        .getTracks()
                        .forEach((track) => localConnection.addTrack(track, midias));
                    localConnection.onicecandidate = ({ candidate }) => {
                        candidate &&
                            socket.emit("candidate", jogadores.primeiro, candidate);
                    };
                    console.log(midias);
                    localConnection.ontrack = ({ streams: [midias] }) => {
                        audio.srcObject = midias;
                    };
                    localConnection
                        .createOffer()
                        .then((offer) => localConnection.setLocalDescription(offer))
                        .then(() => {
                            socket.emit(
                                "offer",
                                jogadores.primeiro,
                                localConnection.localDescription
                            );
                        });
                })
                .catch((error) => console.log(error));
        }
        console.log(jogadores);
    });

    this.socket.on("offer", (socketId, description) => {
        remoteConnection = new RTCPeerConnection(ice_servers);
        midias
            .getTracks()
            .forEach((track) => remoteConnection.addTrack(track, midias));
        remoteConnection.onicecandidate = ({ candidate }) => {
            candidate && socket.emit("candidate", socketId, candidate);
        };
        remoteConnection.ontrack = ({ streams: [midias] }) => {
            audio.srcObject = midias;
        };
        remoteConnection
            .setRemoteDescription(description)
            .then(() => remoteConnection.createAnswer())
            .then((answer) => remoteConnection.setLocalDescription(answer))
            .then(() => {
                socket.emit("answer", socketId, remoteConnection.localDescription);
            });
    });

    socket.on("answer", (description) => {
        localConnection.setRemoteDescription(description);
    });

    socket.on("candidate", (candidate) => {
        const conn = localConnection || remoteConnection;
        conn.addIceCandidate(new RTCIceCandidate(candidate));
    });

    // Desenhar o outro jogador
    this.socket.on("desenharOutroJogador", ({ frame, x, y }) => {
        if (jogador === 1) {
            player2.setFrame(frame);
            player2.x = x;
            player2.y = y;
        } else if (jogador === 2) {
            player1.setFrame(frame);
            player1.x = x;
            player1.y = y;
        }
    });
};

// ================================================
// [Arthur] Iniciando a função update a cena, a função é executada em loop para algumas mecânicas da fase.
cena1.update = function () {
    if (jogador === 1 && player1.anims.currentFrame) {

        this.socket.emit("estadoDoJogador", {
            frame: player1.anims.currentFrame.index,
            x: player1.body.x,
            y: player1.body.y + 10,
        });
    } else if (jogador === 2 && player1.anims.currentFrame) {

        this.socket.emit("estadoDoJogador", {
            frame: player2.anims.currentFrame.index,
            x: player2.body.x,
            y: player2.body.y + 10,
        });
    }
    function deathA(player1, water) {
        this.scene.start(cena3);

    }
    function deathB(player2, water) {
        this.scene.start(cena3);

    }

    function deathC(player1, water2) {
        this.scene.start(cena3);

    }

    function deathD(player2, water2) {
        this.scene.start(cena3);

    }

    function deathE(player1, water3) {
        this.scene.start(cena3);

    }

    function deathF(player2, water3) {
        this.scene.start(cena3);

    }



    // [Bruna] Definindo colisão com a água.
    this.physics.add.collider(player1, water, deathA);
    this.physics.add.collider(player2, water, deathB);
    this.physics.add.collider(player1, water2, deathC);
    this.physics.add.collider(player2, water2, deathD);
    this.physics.add.collider(player1, water3, deathE);
    this.physics.add.collider(player2, water3, deathF);

    // ================================================
    // [Arthur] Iniciando a função contdown, para fazer a contagem do tempo da cena.
    function countdown() {
        life += 1;
        lifeText.setText(life);
        timer -= 1;
        timerText.setText(timer);
        if (timer === 0) {
            trilha.stop();
            this.scene.start(cena2);
        }
    }
};
// [Arthur] Exportando cena 1 para o index.js.
export { cena1 };
