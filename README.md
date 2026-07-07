# The ShootingⅡ

### 3D化について
* 見下ろし視点はそのまま、見た目をThree.jsによる3D（ボクセル押し出し）表現に変更。
* ゲームロジック（座標・当たり判定・スコア・出現パターン等）は元の2D平面のまま。描画レイヤーのみ3D化。
* 最終ボスは今のところ色付きの直方体プレースホルダー（後日MagicaVoxelでモデル差し替え予定）。
* Three.js本体は `vendor/three/` にローカル同梱（CDN不要でオフライン動作）。

### 前作との変更点
* 通常敵は軌跡を描く。夜の高速道路イメージ。触れてもノーダメージ。
* ジグザグに動く敵が登場。
* 壁。HP＝35。倒すか避けるか。
* 中ボス。HP＝20。直進に弾を打つ。4倍高精細ドット絵。
* 大ボス。HP＝130。ドット絵を画像のまま敵キャラ化。
* 一時的効果のある★を2種類に増量。短時間の3方向ショット、長時間の2連ショット。
* 動く背景画像
* 1より難易度はややUP。
* ゲームオーバー画面からのリスタートにコントローラーのボタン使用可。

<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/63a564ba-cee1-4ad9-9254-3e5585785576" />
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/bc10bd11-5092-4f47-816c-3f6a81cdf025" />



<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/5704c5ee-0f6b-40a2-8af0-52853df2f58c" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/c6f4ec74-b052-4e1a-9ad9-9a91a18748ac" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/c7817d7f-8484-48cd-8907-4eae24f42f59" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/09924226-4fd8-471a-a86c-75fbc5bc96a8" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/32f82b1e-ab19-4022-93ca-035f627ebc26" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/75c20540-c915-4171-9b95-4d834c49c212" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/0f6e7894-4c55-4e5a-a1db-c6bb38aae588" />
<img width="300" height="200" alt="image" src="https://github.com/user-attachments/assets/67944f70-7b70-432f-8d02-bd1aa454a254" />








