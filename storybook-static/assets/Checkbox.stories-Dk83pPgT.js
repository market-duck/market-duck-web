import{u as C,j as e}from"./styled-components.browser.esm-C0OQzGPn.js";import{A as t,a as g}from"./AppRadii-C1muoxgs.js";import{A as k}from"./AppSpacing-BpsjA0jU.js";import{A as u}from"./AppTypo-CbdkmyKb.js";import{C as m}from"./Flex-DHnJfdLb.js";import{f as B}from"./index-DRb5_YVN.js";import"./index-DVXBtNgz.js";import"./tslib.es6-DN43Sy8V.js";import"./index-BdlRumKp.js";const A="data:image/svg+xml,%3csvg%20width='12'%20height='9'%20viewBox='0%200%2012%209'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.7488%200.263519C11.9096%200.432301%2012%200.661188%2012%200.899846C12%201.1385%2011.9096%201.36739%2011.7488%201.53617L4.88554%208.73648C4.72466%208.90521%204.50649%209%204.279%209C4.05152%209%203.83334%208.90521%203.67246%208.73648L0.240825%205.13633C0.0845501%204.96658%20-0.00192225%204.73923%203.24312e-05%204.50324C0.00198711%204.26725%200.0922125%204.04151%200.251276%203.87464C0.410339%203.70776%200.625513%203.61311%200.850454%203.61106C1.0754%203.60901%201.2921%203.69972%201.45391%203.86367L4.279%206.8275L10.5357%200.263519C10.6966%200.094788%2010.9148%200%2011.1423%200C11.3698%200%2011.5879%200.094788%2011.7488%200.263519Z'%20fill='white'%20/%3e%3c/svg%3e",b=C.input.attrs(({$size:r})=>({className:`size-${r}`,type:"checkbox"}))`
  appearance: none;
  background-color: ${t.BG_PRIMARY.hex};
  border: 1px solid ${t.BORDER_TERTIARY.hex};
  border-radius: ${g.S};
  &:checked {
    background-color: ${t.BG_INTERACTIVE_PRIMARY.hex};
    background-image: url(${A});
    background-position: center;
    background-repeat: no-repeat;
  }

  &.size-s {
    width: 20px;
    height: 20px;
  }

  &.size-m {
    width: 24px;
    height: 24px;
  }
`,f=C.label.attrs(({$size:r})=>({className:`size-${r}`}))`
  display: inline-flex;
  gap: ${k.XS};
  color: ${t};

  &.size-s {
    font-weight: 500;
    ${u.BODY_SM}
  }

  &.size-m {
    font-weight: 500;
    ${u.BODY_MD}
  }
`,s=({$size:r,children:h,...x})=>e.jsxs(f,{$size:r,children:[e.jsx(b,{$size:r,...x}),e.jsx("span",{children:h})]});s.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{$size:{required:!0,tsType:{name:"union",raw:"'s' | 'm'",elements:[{name:"literal",value:"'s'"},{name:"literal",value:"'m'"}]},description:""},children:{required:!1,tsType:{name:"string"},description:""}},composes:["InputHTMLAttributes"]};const y={title:"UI Component/Checkbox",component:s,parameters:{layout:"centered"},tags:["autodocs"],args:{onClick:B(()=>{alert("Click Action!")})}},o=()=>e.jsxs(m,{gap:"S",children:[e.jsx(s,{$size:"s",checked:!1,children:"텍스트가 들어가는 영역입니다"}),e.jsx(s,{$size:"s",checked:!0,children:"텍스트가 들어가는 영역입니다"})]}),n=()=>e.jsxs(m,{gap:"S",children:[e.jsx(s,{$size:"m",checked:!1,children:"텍스트가 들어가는 영역입니다"}),e.jsx(s,{$size:"m",checked:!0,children:"텍스트가 들어가는 영역입니다"})]});o.__docgenInfo={description:"",methods:[],displayName:"Small"};n.__docgenInfo={description:"",methods:[],displayName:"Middle"};var c,a,i;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  return <Column gap="S">\r
      <Checkbox $size="s" checked={false}>\r
        텍스트가 들어가는 영역입니다\r
      </Checkbox>\r
      <Checkbox $size="s" checked={true}>\r
        텍스트가 들어가는 영역입니다\r
      </Checkbox>\r
    </Column>;
}`,...(i=(a=o.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var d,l,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  return <Column gap="S">\r
      <Checkbox $size="m" checked={false}>\r
        텍스트가 들어가는 영역입니다\r
      </Checkbox>\r
      <Checkbox $size="m" checked={true}>\r
        텍스트가 들어가는 영역입니다\r
      </Checkbox>\r
    </Column>;
}`,...(p=(l=n.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const I=["Small","Middle"];export{n as Middle,o as Small,I as __namedExportsOrder,y as default};
