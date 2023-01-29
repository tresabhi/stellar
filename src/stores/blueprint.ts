import { Blueprint, blueprintData } from 'game/Blueprint';
import { cloneDeep } from 'lodash';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useBlueprint = create<
  Blueprint,
  [['zustand/subscribeWithSelector', never]]
>(subscribeWithSelector(() => cloneDeep(blueprintData)));
export default useBlueprint;
