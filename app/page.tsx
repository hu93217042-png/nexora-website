'use client';

import { useEffect, useRef } from 'react';
import { bodyHTML } from './bodyContent';

const THREE_SCRIPT_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const SITE_SCRIPT_URL = '/site-script.js';

type ScriptLoadCallback = () => void;

/**
 * Loads a browser script once and runs the callback after it is available.
 * The visual page is rendered from bodyHTML; the external script adds the
 * interactive graphics, menus, carousels, and other client-side behaviour.
 */
function loadScript(src: string, onLoad?: ScriptLoadCallback) {
  const existingScript = document.querySelector(`script[src="${src}"]`);

  if (existingScript) {
    onLoad?.();
    return;
  }

  const script = document.createElement('script');
  script.src = src;
  script.onload = () => onLoad?.();
  document.body.appendChild(script);
}

export default function Home() {
  const hasLoadedScripts = useRef(false);

  useEffect(() => {
    if (hasLoadedScripts.current) return;
    hasLoadedScripts.current = true;

    // Three.js must load before site-script.js because the latter uses it
    // for the robot and other animated visual elements.
    loadScript(THREE_SCRIPT_URL, () => {
      loadScript(SITE_SCRIPT_URL);
    });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />;
}
