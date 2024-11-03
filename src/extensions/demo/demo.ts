import html from "@distui/demo/main/index.html?raw";

import { GlobalThis, MouseEvent, Layer } from "@/shared/reearthTypes";


const reearth = (globalThis as unknown as GlobalThis).reearth;
reearth.ui.show(html);

// Post message to UI when initialize
// This is a little bit special since binding event listener on UI
// by react usually is not ready at this moment.
// We need to add a data transformer to hold the initial message
// Please check ./main/index.html for more details


// フォルダとデータ名を取得してプラグイン側に送信する関数
function sendLayerData(): void {
  const layers: Layer[] = reearth.layers.layers;

  // フォルダとその子データ（レイヤー）を抽出して構造化する
  const layerData = layers.map(layer => {
    if (layer.children) {
      // フォルダの場合、その子レイヤーを含めてオブジェクトを作成
      return {
        folderName: layer.title || "Unnamed Folder",  // フォルダ名
        children: layer.children.map(child => ({
          dataName: child.title || "Unnamed Data", // データ名
          id: child.id,  // データのID
          visible: child.isVisible // 可視状態
        }))
      };
    } else {
      // フォルダでない場合は、そのレイヤーを通常のデータとして返す
      return {
        folderName: null,  // フォルダではない
        children: [{
          dataName: layer.title || "Unnamed Data", // レイヤーの名前
          id: layer.id,  // レイヤーのID
          visible: layer.isVisible // 可視状態
        }]
      };
    }
  });

  // プラグインにフォルダとデータの構造を送信
  reearth.ui.postMessage({
    type: "layerData",
    data: layerData
  });
  console.log("hoge001")
  // レイヤーデータを確認するためにJSON化して出力する
  console.log("Layer Data:", JSON.stringify(layerData, null, 2));


}
sendLayerData();

