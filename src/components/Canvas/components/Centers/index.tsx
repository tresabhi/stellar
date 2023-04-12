import { invalidate } from '@react-three/fiber';
import { DeferUpdatesEventDetail } from 'core/bounds/getDeferUpdates';
import { useEffect, useRef } from 'react';
import useApp, { Tool } from 'stores/app';
import useSettings from 'stores/settings';
import { Group } from 'three';
import CenterOfBuild from './components/CenterOfBuild';

export default function Centers() {
  const wrapper = useRef<Group>(null);
  const showCenterOfBounds = useSettings(
    (state) => state.editor.showCenterOfBuild,
  );

  useEffect(() => {
    const handleDeferUpdates = (
      event: CustomEvent<DeferUpdatesEventDetail>,
    ) => {
      if (wrapper.current) wrapper.current.visible = !event.detail;
    };
    const unsubscribeTool = useApp.subscribe(
      (state) => state.editor.tool,
      (tool) => {
        if (wrapper.current) wrapper.current.visible = tool === Tool.Transform;
        invalidate();
      },
    );

    window.addEventListener(
      'deferupdates',
      handleDeferUpdates as EventListener,
    );

    return () => {
      unsubscribeTool();
      window.removeEventListener(
        'deferupdates',
        handleDeferUpdates as EventListener,
      );
    };
  }, []);

  return <group ref={wrapper}>{showCenterOfBounds && <CenterOfBuild />}</group>;
}
