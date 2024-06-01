import{A as r}from"./AppSpacing-BpsjA0jU.js";import{a as t,u as n}from"./styled-components.browser.esm-C0OQzGPn.js";const l=t`
  justify-content: flex-start;
`;t`
  justify-content: flex-end;
`;t`
  justify-content: center;
`;t`
  justify-content: space-between;
`;t`
  justify-content: space-around;
`;t`
  justify-content: space-evenly;
`;t`
  align-items: flex-start;
`;t`
  align-items: flex-end;
`;t`
  align-items: center;
`;const f=t`
  align-items: stretch;
`,s=({justify:e=l,alignItems:i=f,gap:o="NONE",flex:a="auto",flexWrap:c="no-wrap"})=>`
      ${e??""}
      ${i??""}
      gap: ${r[o]};
      flex: ${a??"auto"}
      flex-wrap: ${c}
    `,m=n.div`
  display: flex;
  flex-direction: row;
  ${e=>s(e)}
`,x=n.div`
  display: flex;
  flex-direction: column;
  ${e=>s(e)}
`;export{x as C,m as R};
