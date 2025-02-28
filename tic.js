let is_click_list = new Array(9).fill(false); //各マスがクリックされたかどうかを管理するリスト
let my_root = document.getElementById("target"); //表示ページのルートタグ取得
let stage_container = document.createElement("div"); //盤面のコンテナ
let footer = document.createElement("h3"); //フッタータグ
let mode_selection;  // モード選択用のコンテナを宣言
footer.innerHTML = "〇's Turn";//初期ターン表示
footer.classList.add("mt-5","mt-4");//ターン表示するタグの位置調整
footer.style.display = "none";  // モード選択時は表示されないようにnoneに設定

my_root.classList.add("d-flex","justify-content-center","align-items-center","flex-column");
stage_container.classList.add("mt-5");
stage_container.style.display = "none";  // footerと同様に、モード選択時は表示されないようにnoneに設定


let your_turn = 0;    //〇✖の順番
let game_board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];               //内部にゲームボードを作っている。　〇なら１、✖ならー１を格納する。

// 3×3のボタンを作成
for (let i = 0; i < 3; i++) {
    let row_block = document.createElement("div");
    row_block.classList.add("d-flex");

    for (let j = 0; j < 3; j++) {
        const index = i * 3 + j; 

        const my_btn = document.createElement("button");
        my_btn.classList.add("mybtn");

        //盤面の線デザインするためのcss
        if(index%3!=2){
            my_btn.classList.add("right-line");
        }

        if(index <= 5){
            my_btn.classList.add("bottom-line");
        }

        // my_btn.innerHTML = index; // 初期値だけ管理している番号で表示する
        
        
        // ボタンにイベントを追加
        my_btn.addEventListener("mouseover", () => {
            if (!is_click_list[index]) {
                if (your_turn % 2 == 0) {
                    my_btn.innerHTML = "〇";
                } else if (your_turn % 2 == 1) {
                    my_btn.innerHTML = "✖";
                }
            } else {
                my_btn.style.cursor = "not-allowed";
            }
        });

        my_btn.addEventListener("mouseleave", () => {
            if (!is_click_list[index]) {
                my_btn.innerHTML = ""; //マウス離れた時の表示(クリック後はclickイベントで変更したテキストが表示の優先)
            }
        });

        my_btn.addEventListener("click", () => {
            my_btn.disabled = "disabled";
            is_click_list[index] = true; // クリックしたボタンを固定
            my_btn.style.color = "black";
            gameStart(my_btn, index);

            current_turn = your_turn %2 ? "✖'s Turn" : "〇's Turn";
            footer.innerHTML = current_turn;


            if(gameJudge() && your_turn % 2 === 0){
                gameEnd(-1);
            }else if(gameJudge() && your_turn % 2 === 1){
                gameEnd(1);
            }else if(!gameJudge() && your_turn === 9){
                gameEnd(0);
            } else if (game_mode == "cpu") {
                setTimeout(cpuMove, 500);
            }

            footer.innerHTML = your_turn%2 ? "✖'s Turn" : "〇's Turn"; //ターン表示の切り替え
            

        });

        row_block.append(my_btn);
  
}

    stage_container.append(row_block);
}

function gameStart(my_btn, index){//〇と✖を画面上に交互に表示し、内部では〇なら１、✖ならー１を
                                  //二次元配列game_boardに格納する。
    let row = Math.floor(index/3);
    let column = index%3;

    if(your_turn % 2 === 0 && game_board[row][column] === 0){//マスに何も置いていなかったら〇か✖を置く
        my_btn.innerHTML = "〇";
        game_board[row][column] = 1;
        your_turn++;
    }else if(your_turn % 2 === 1 && game_board[row][column] === 0){
        my_btn.innerHTML = "✖";
        game_board[row][column] = -1;
        your_turn++;
    }
}

function gameJudge(){
    for(let i = 0; i < 3; i++){//ある行の値がすべて１もしくはー１ならばtrue
        let result = 0;
        for(let j = 0; j < 3; j++){
            result += game_board[i][j];
        }
        if(Math.abs(result) === 3)  return true;
    }

    for(let i = 0; i < 3; i++){//ある列の値がすべて１もしくはー１ならばtrue
        let result = 0;
        for(let j = 0; j < 3; j++){
            result += game_board[j][i];
        }
        if(Math.abs(result) === 3)  return true;
    }

    for(let i = 0; i < 2; i++){//ある斜めの値がすべて１もしくはー１ならばtrue
        let result = 0;
        if(i === 0){
            for(let j = 0; j < 3; j++){
                result += game_board[j][j];
            }
        }

        if(i === 1){
            for(let j = 0; j < 3; j++){
                result += game_board[j][2-j];
            }
        }
        if(Math.abs(result) === 3)  return true;
    }
    return false;
}

function gameEnd(win){
    let end_screen = document.createElement("div");
    end_screen.classList.add("d-flex", "justify-content-center", "align-items-center", "flex-column", "game-end-screen");
    let end_button = document.createElement("button");
    end_button.classList.add("end-button");
    end_button.innerHTML = "Restart";
    let winner = document.createElement("p");
    winner.classList.add("end-screen-font");

    if(win === 1){
        winner.innerHTML = "〇's Wins!!!";
    }else if(win === -1){
        winner.innerHTML = "✖'s Wins!!!";
    }else{
        winner.innerHTML = "Draw!";
    }
    end_screen.append(winner);
    end_screen.append(end_button);

    
    my_root.append(end_screen);

    end_button.addEventListener("click" ,() =>{
        window.location.reload();//windowの再読み込みを使っているので、別の方法を考える
    });
}

let header = document.createElement("h2");
header.innerHTML = "Tic Tac Toe ";
my_root.append(header);

// モード選択用のコンテナ
mode_selection = document.createElement("div");
mode_selection.classList.add("d-flex", "justify-content-center", "align-items-center", "mt-3");
mode_selection.style.display = "block";

// 1対1対戦ボタン
let pvp_button = document.createElement("button");
pvp_button.innerHTML = "1 on 1";
pvp_button.classList.add("mode-button", "btn", "btn-primary", "m-2");

// CPU対戦のボタン
let cpu_button = document.createElement("button");
cpu_button.innerHTML = "VS CPU";
cpu_button.classList.add("mode-button", "btn", "btn-secondary", "m-2");

// モード選択ボタンをコンテナに追加
mode_selection.append(pvp_button);
mode_selection.append(cpu_button);

// ルートにモード選択を追加
my_root.append(mode_selection);


let game_mode = "";  // モードを保存する変数

pvp_button.addEventListener("click", () => startGame("pvp"));
cpu_button.addEventListener("click", () => startGame("cpu"));

function startGame(mode) {
    game_mode = mode;  // 選択したモードを保存
    mode_selection.remove(); // モード選択画面を非表示(プレイ中は削除)
    // stage_containerとfooterを表示する
    stage_container.style.display = "block";
    footer.style.display = "block";
}

function cpuMove() {
    if (your_turn % 2 == 1 && game_mode == "cpu") {
        let available_moves = [];
        for (let i = 0; i < 9; i++) {
            if (!is_click_list[i]) {
                available_moves.push(i);
            }
        }

        if (available_moves.length > 0) {
            let random_index = Math.floor(Math.random() * available_moves.length);
            let index = available_moves[random_index];
            let row = Math.floor(index / 3);
            let column = index % 3;

            let my_btn = document.getElementsByClassName("mybtn")[index];
            my_btn.innerHTML = "✖";
            my_btn.style.color = "black";
            is_click_list[index] = true;
            game_board[row][column] = -1;
            your_turn++;

            footer.innerHTML = "〇's Turn";

            if (gameJudge()) {
                setTimeout(() => {
                    gameEnd(-1);
                }, 700);
            } else if (your_turn == 9) {
                gameEnd(0);
            }
        }
    }
}

my_root.append(stage_container);
my_root.append(footer);