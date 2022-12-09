window.onload = function () {
    const board_height = 500, board_width = 800;
    const player_height = 130, player_width = 10, player_speed = 6;
    const ball_height = ball_width = 15, ball_speed = 6;
    const player1_x = 10, player2_x = board_width - player_width * 2;

    let player1_key;
    let player2_speed;
    let player1_point, player2_point;
    let player1_y, player2_y;
    let ball_x, ball_y, ball_y_orientation, ball_x_orientation;
    let error_chance = 0;

    function setup() {
        canvas = document.querySelector('#canvas');
        context_canvas = canvas.getContext('2d');

        player1_y = player2_y = (board_height / 2) - (player_height / 2);

        player1_point = player2_point = 0;

        setInterval(loop, 1000 / 60); //60 FPS

        errorChance();

        startBall();
    }

    function loop() {
        touchPlayer();
        touchWall();
        movementPlayer();
        movementPlayer2();
        movementBall();
        writePoints();
        draw();
    }

    function startBall() {
        ball_y_orientation = Math.pow(2, Math.floor(Math.random() * 2) + 1) - 3
        ball_x_orientation = Math.pow(2, Math.floor(Math.random() * 2) + 1) - 3
        ball_x = board_width / 2 - 10;
        ball_y = board_height / 2 - 10;
    }

    function draw() {
        // board
        drawRect(0, 0, board_width, board_height, "#000");
        // player 1
        drawRect(player1_x, player1_y, player_width, player_height);
        // player 2
        drawRect(player2_x, player2_y, player_width, player_height);
        // ball
        drawRect(ball_x, ball_y, ball_width, ball_height);
        // mid
        drawRect(board_width / 2 - 2.5, 0, 5, board_height);
        // score
        drawScore();
    }

    function drawScore() {
        context_canvas.font = "50px monospace";
        context_canvas.fillStyle = "#fff";

        context_canvas.fillText(player1_point, board_width / 4, 50);
        context_canvas.fillText(player2_point, 3 * (board_width / 4), 50);
    }

    function drawRect(player_x, player_y, board_width, board_height, color = "white") {
        context_canvas.fillStyle = color;
        context_canvas.fillRect(player_x, player_y, board_width, board_height);
    }

    function touchPlayer() {
        if (ball_x >= player1_x && ball_x <= player1_x + player_width && ball_y >= player1_y && ball_y <= player1_y + player_height) {
            ball_x_orientation = 1;
        } else if (ball_x >= player2_x && ball_x <= player2_x + player_width && ball_y >= player2_y && ball_y <= player2_y + player_height) {
            ball_x_orientation = -1;
            errorChance();
        }
    }

    function touchWall() {
        if (ball_y + ball_height >= board_height || ball_y <= 0) ball_y_orientation *= -1;
        if (ball_x + ball_width >= board_width || ball_x <= 0) ball_x_orientation *= -1;
    }

    function movementPlayer() {
        if (player1_key === 'w' && player1_y > 0) {
            player1_y -= player_speed;
        } else if (player1_key === 's' && player1_y + player_height < board_height) {
            player1_y += player_speed;
        }
    }

    function movementPlayer2() {
        player2_speed = (ball_y + error_chance) - player2_y - player_height / 2;
        player2_y += player2_speed;
        
        if (player2_y < 0) {
            player2_y = 0
        } else if (player2_y > board_height - player_height) {
            player2_y = board_height - player_height
        }
    }

    function movementBall() {
        ball_x += ball_speed * ball_x_orientation;
        ball_y += ball_speed * ball_y_orientation;
    }

    function writePoints() {
        if (ball_x + ball_width > board_width) {
            player1_point++;
            errorChance();
            startBall();
        } else if (ball_x - 1 < 0) {
            player2_point++;
            errorChance();
            startBall();
        }
    }

    function errorChance() {
        error_chance = Math.floor(Math.random() * 100);
        error_chance *= Math.pow(2, Math.floor(Math.random() * 2) + 1) - 3;
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === 'w' || event.key === 's') {
            player1_key = event.key;
        }
    })

    setup();
}
