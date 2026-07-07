# The ShootingⅢ

### 3D化について
* ゲームロジック（座標・スコア・出現パターン等）は前作の2Dシューティングゲームのまま。
* 描画レイヤーのみ3D化。
* 3D化によって俯瞰目線でなくなった。手前にくるほど敵キャラ・弾の速度が増しているように見えるので難易度アップ。
* Three.js本体は `vendor/three/` にローカル同梱（CDN不要でオフライン動作）。
* キャラクターはMagicaVoxelで作成、obj形式で出力。

### 音楽
* youtubeのAPIを使用。事前に設定した動画の音声を再生、ランダム選択からループする。
* The Bee Gees/Night Fever、Daft Punk/Tron: Legacy

### 仕様
* 通常敵は軌跡を描く。夜の高速道路イメージ。
* ジグザグに動く敵が登場。
* 壁。HP＝35。倒すか避けるか。
* 中ボス。HP＝20。直進に弾を打つ。
* 大ボス。HP＝130。
* 一時的効果のある★を2種類に増量。短時間の3方向ショット、長時間の2連ショット。
* ゲームオーバー画面からのリスタートにコントローラーのボタン使用可。

--------------------------------------------
<img width="927" height="808" alt="image" src="https://github.com/user-attachments/assets/7eb33c7b-7946-4218-9573-7fc931c98159" />
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/63a564ba-cee1-4ad9-9254-3e5585785576" />
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/1e56a007-4a35-4b9c-83de-55c7121bbcda" />

----------------------------------------------------

<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/5704c5ee-0f6b-40a2-8af0-52853df2f58c" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/c7817d7f-8484-48cd-8907-4eae24f42f59" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/09924226-4fd8-471a-a86c-75fbc5bc96a8" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/32f82b1e-ab19-4022-93ca-035f627ebc26" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/75c20540-c915-4171-9b95-4d834c49c212" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/0f6e7894-4c55-4e5a-a1db-c6bb38aae588" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/67944f70-7b70-432f-8d02-bd1aa454a254" />








