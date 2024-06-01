import{u as C,j as r}from"./styled-components.browser.esm-C0OQzGPn.js";import{A as o,a as t}from"./AppRadii-C1muoxgs.js";import{A as x}from"./AppSpacing-BpsjA0jU.js";import{A as n}from"./AppTypo-CbdkmyKb.js";import{C as h}from"./Flex-DHnJfdLb.js";import{f as A}from"./index-DRb5_YVN.js";import"./index-DVXBtNgz.js";import"./tslib.es6-DN43Sy8V.js";import"./index-BdlRumKp.js";const f=C.input.attrs(({$size:e})=>({className:`size-${e}`,type:"radio"}))`
  appearance: none;
  position: relative;
  width: ${({$size:e})=>e}px;
  height: ${({$size:e})=>e}px;
  background-color: ${o.BG_PRIMARY.hex};
  border: 1px solid ${o.BORDER_TERTIARY.hex};
  border-radius: ${t.CIRCLE};
  &:checked {
    border: 1px solid ${o.BORDER_PRIMARY.hex};
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: calc(100% - 5px);
      height: calc(100% - 5px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: ${o.BG_INTERACTIVE_PRIMARY.hex};
      border-radius: ${t.CIRCLE};
    }
  }

  &.size-s {
    width: 20px;
    height: 20px;
  }

  &.size-m {
    width: 24px;
    height: 24px;
  }
`,g=C.label.attrs(({$size:e})=>({className:`size-${e}`}))`
  display: inline-flex;
  gap: ${x.XS};
  color: ${o};

  &.size-s {
    font-weight: 500;
    ${n.BODY_SM}
  }

  &.size-m {
    font-weight: 500;
    ${n.BODY_MD}
  }
`,s=({$size:e,children:B,...R})=>r.jsxs(g,{$size:e,children:[r.jsx(f,{$size:e,...R}),r.jsx("span",{children:B})]});s.__docgenInfo={description:"",methods:[],displayName:"Radio",props:{$size:{required:!0,tsType:{name:"union",raw:"'s' | 'm'",elements:[{name:"literal",value:"'s'"},{name:"literal",value:"'m'"}]},description:""},children:{required:!1,tsType:{name:"string"},description:""}},composes:["InputHTMLAttributes"]};const j={title:"UI Component/Radio",component:s,parameters:{layout:"centered"},tags:["autodocs"],args:{onClick:A(()=>{alert("Click Action!")})}},a=()=>r.jsxs(h,{gap:"S",children:[r.jsx(s,{$size:"s",checked:!1,children:"텍스트가 들어가는 영역입니다"}),r.jsx(s,{$size:"s",checked:!0,children:"텍스트가 들어가는 영역입니다"})]}),i=()=>r.jsxs(h,{gap:"S",children:[r.jsx(s,{$size:"m",checked:!1,children:"텍스트가 들어가는 영역입니다"}),r.jsx(s,{$size:"m",checked:!0,children:"텍스트가 들어가는 영역입니다"})]});a.__docgenInfo={description:"",methods:[],displayName:"Small"};i.__docgenInfo={description:"",methods:[],displayName:"Middle"};var u,d,c;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  return <Column gap="S">\r
      <Radio $size="s" checked={false}>\r
        텍스트가 들어가는 영역입니다\r
      </Radio>\r
      <Radio $size="s" checked={true}>\r
        텍스트가 들어가는 영역입니다\r
      </Radio>\r
    </Column>;
}`,...(c=(d=a.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,l,m;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  return <Column gap="S">\r
      <Radio $size="m" checked={false}>\r
        텍스트가 들어가는 영역입니다\r
      </Radio>\r
      <Radio $size="m" checked={true}>\r
        텍스트가 들어가는 영역입니다\r
      </Radio>\r
    </Column>;
}`,...(m=(l=i.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const y=["Small","Middle"];export{i as Middle,a as Small,y as __namedExportsOrder,j as default};
