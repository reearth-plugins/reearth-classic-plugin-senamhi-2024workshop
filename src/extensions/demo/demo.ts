import html from "@distui/demo/main/index.html?raw";

import { GlobalThis, Layer } from "@/shared/reearthTypes";

const reearth = (globalThis as unknown as GlobalThis).reearth;
reearth.ui.show(html);

// Post message to UI when initialize
// This is a little bit special since binding event listener on UI
// by react usually is not ready at this moment.
// We need to add a data transformer to hold the initial message
// Please check ./main/index.html for more details

// フォルダとデータ名を取得してプラグイン側に送信する関数
function sendLayerData() {
  const processLayer = (layer: Layer) => {
    const l = {
      id: layer.id,
      extensionId: layer.extensionId,
      title: layer.title,
      isVisible: layer.isVisible,
      tags: layer.tags,
    };
    if (layer.children) {
      l.children = layer.children
        .filter((l) => l.isVisible)
        .map((cl) => processLayer(cl));
    }
    return l;
  };
  reearth.ui.postMessage({
    action: "layersLayersTree",
    widget: reearth.widget,
    value: reearth.layers.layers
      .filter((l) => l.isVisible)
      .map((l) => processLayer(l)),
  });
  console.log("出力確認");
  // console.log(
  //   JSON.stringify(
  //     reearth.layers.layers
  //       .filter((l) => l.isVisible)
  //       .map((l) => processLayer(l)),
  //     null,
  //     2
  //   )
  // );
}
sendLayerData();