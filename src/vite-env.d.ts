/// <reference types="vite/client" />

//https://ko.vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript
declare type ValueOfType<T> = T[keyof T];
declare type VoidFn<P extends any[] = []> = (...a: P) => void;
