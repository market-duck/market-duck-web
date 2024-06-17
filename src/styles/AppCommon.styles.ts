import { createGlobalStyle } from 'styled-components';
import { LayoutVariables } from './variables/LayoutVariables';

export const AppCommonStyle = createGlobalStyle`
:root {
    ${LayoutVariables.gutterSize} : 1rem;
    ${LayoutVariables.viewMinWidth}: 320px;
    ${LayoutVariables.viewMaxWidth}: 1280px;
}
`;
