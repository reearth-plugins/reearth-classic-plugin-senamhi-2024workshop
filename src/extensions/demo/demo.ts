import html from "@distui/demo/main/index.html?raw";

import { GlobalThis, Layer } from "@/shared/reearthTypes";

const reearth = (globalThis as unknown as GlobalThis).reearth;
reearth.ui.show(html);

// Post message to UI when initialize
// This is a little bit special since binding event listener on UI
// by react usually is not ready at this moment.
// We need to add a data transformer to hold the initial message
// Please check ./main/index.html for more details

type ProcessedLayer = Pick<
  Layer,
  "id" | "extensionId" | "title" | "isVisible" | "tags" | "children"
>;

// フォルダとデータ名を取得してプラグイン側に送信する関数
function sendLayerData() {
  const processLayer = (layer: Layer) => {
    const l: ProcessedLayer = {
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

  const value = reearth.layers.layers
    .filter((l) => l.isVisible)
    .map((l) => processLayer(l));
  console.log("value", value);

  reearth.ui.postMessage({
    action: "layersLayersTree",
    // widget: reearth.widget?.property
    payload: value,
  });

  // console.log("send data to UI");
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
// sendLayerData();

reearth.on("message", (msg) => {
  console.log("Get message from UI", msg);
  if (msg.action === "getLayersData") {
    sendLayerData();
  }
});
