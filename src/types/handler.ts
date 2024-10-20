import { ChangeEventHandler, MouseEventHandler } from 'react';

export type ButtonClickHandler = MouseEventHandler<HTMLButtonElement>;
export type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;
export type TextareaChangeHandler = ChangeEventHandler<HTMLTextAreaElement>;
