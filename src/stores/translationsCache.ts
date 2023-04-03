import { create } from 'zustand';

export type Translations = {
  $: string;
  [key: string]: Translations | string;
};

export type UseTranslationsCache = Map<string, Translations>;

const useTranslationsCache = create<UseTranslationsCache>(() => new Map());
export default useTranslationsCache;
