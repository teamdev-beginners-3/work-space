let is_click_list = new Array(9).fill(false); //各マスがクリックされたかどうかを管理するリスト
let my_root = document.getElementById("target"); //表示ページのルートタグ取得
let stage_container = document.createElement("div"); //盤面のコンテナ
my_root.classList.add("d-flex","justify-content-center","align-items-center","flex-column");
stage_container.classList.add("mt-5");

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

        my_btn.innerHTML = index; // 初期値だけ管理している番号で表示する
        
        
        // ボタンにイベントを追加
        my_btn.addEventListener("mouseover", () => {
            if (!is_click_list[index]) {
                my_btn.innerHTML = "✖"; // ホバー時のテキスト、いったんXにしてターンの切り替え機能ができたら再度書き直す
                my_btn.classList.add("custom-hover")
            }
        });

        my_btn.addEventListener("mouseleave", () => {
            if (!is_click_list[index]) {
                my_btn.innerHTML = index; //マウス離れた時の表示(クリック後はclickイベントで変更したテキストが表示の優先)
            }
        });

        my_btn.addEventListener("click", () => {
            is_click_list[index] = true; // クリックしたボタンを固定
            gameStart(my_btn, index);
            if(gameJudge()){
                console.log("終了");
            }else if(!gameJudge() && your_turn === 8){
                console.log("引き分け");
            }
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



let header = document.createElement("h2");
header.innerHTML = "Tic Tac Toe ";

let footer = document.createElement("p");
footer.innerHTML = "user's Turn";
footer.classList.add("mt-3");

my_root.append(header);
my_root.append(stage_container);
my_root.append(footer);