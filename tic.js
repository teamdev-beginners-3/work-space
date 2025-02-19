let is_click_list = new Array(9).fill(false); //各マスがクリックされたかどうかを管理するリスト
let my_root = document.getElementById("target"); //表示ページのルートタグ取得
let stage_container = document.createElement("div"); //盤面のコンテナ
my_root.classList.add("d-flex","justify-content-center","align-items-center","flex-column");
stage_container.classList.add("mt-5")

// 3×3のボタンを作成
for (let i = 0; i < 3; i++) {
    let row_block = document.createElement("div");
    row_block.classList.add("d-flex");

    for (let j = 0; j < 3; j++) {
        const index = i * 3 + j; 
        const my_btn = document.createElement("button");
        my_btn.classList.add("mybtn");
        my_btn.innerHTML = index; // 初期値だけ管理している番号で表示する

        // ボタンにイベントを追加
        my_btn.addEventListener("mouseover", () => {
            if (!is_click_list[index]) {
                my_btn.innerHTML = "gray_user_mark"; // ホバー時のテキスト
            }
        });

        my_btn.addEventListener("mouseleave", () => {
            if (!is_click_list[index]) {
                my_btn.innerHTML = index; //マウス離れた時の表示(クリック後はclickイベントで変更したテキストが表示の優先)
            }
        });

        my_btn.addEventListener("click", () => {
            is_click_list[index] = true; // クリックしたボタンを固定
            my_btn.innerHTML = "user_mark";
        });

        row_block.append(my_btn);
    }

    stage_container.append(row_block);
}

let header = document.createElement("h2");
header.innerHTML = "Tic Tac Toe ";

let footer = document.createElement("p");
footer.innerHTML = "user's Turn";
footer.classList.add("mt-3");

my_root.append(header);
my_root.append(stage_container);
my_root.append(footer);