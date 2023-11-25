import { createEffect, createStore } from 'effector';
import { Viewer } from '../../viewer/Viewer';
import { MoveSytem } from '../../viewer/MoveSystem';
import { SystemName } from '../../viewer/BaseSystem';

const viewer = new Viewer();
viewer.update(0);
export const $viewer = createStore(viewer);

export const moveToFx = createEffect(
  viewer
    .getSystem<MoveSytem>(SystemName.Move)
    .moveTo.bind(viewer.getSystem<MoveSytem>(SystemName.Move)),
);
