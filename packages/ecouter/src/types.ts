export type Key = string;

export type Modifier = 'Shift' | 'Control' | 'Alt' | 'Meta';

export type Combo = [Modifier | Modifier[], Key];

export type EcouterKeybind = Key | Combo;
