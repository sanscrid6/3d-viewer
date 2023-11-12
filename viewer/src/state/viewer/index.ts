import { createStore } from "effector";
import { Viewer } from "../../viewer/Viewer";

const viewer = new Viewer()
viewer.update(0)
export const $viewer = createStore(viewer)