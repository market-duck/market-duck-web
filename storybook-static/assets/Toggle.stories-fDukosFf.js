import{u,j as t}from"./styled-components.browser.esm-C0OQzGPn.js";import{A as a,a as n}from"./AppRadii-C1muoxgs.js";import{f as g}from"./index-DRb5_YVN.js";import"./index-DVXBtNgz.js";import"./tslib.es6-DN43Sy8V.js";import"./index-BdlRumKp.js";const x=u.input.attrs({type:"checkbox"})`
  appearance: none;
  position: relative;
  width: ${({$size:e})=>e/5*9}px;
  height: ${({$size:e})=>e}px;
  background-color: ${a.BG_DISABLED.hex};
  border-radius: ${n.PILL};
  transition: all 0.3s ease-in-out;

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: ${({$size:e})=>e-4}px;
    height: ${({$size:e})=>e-4}px;
    top: 50%;
    left: 2px;
    transition: all 0.3s ease-in-out;
    transform: translateY(-50%);
    background-color: ${a.BG_PRIMARY.hex};
    border-radius: ${n.CIRCLE};
  }
  &:checked {
    background-color: ${a.BG_INTERACTIVE_PRIMARY.hex};
    &::after {
      left: ${({$size:e})=>e-2}px;
    }
  }
`,s=({$size:e})=>t.jsx(x,{$size:e});s.__docgenInfo={description:"",methods:[],displayName:"Toggle",props:{$size:{required:!0,tsType:{name:"union",raw:"16 | 20",elements:[{name:"literal",value:"16"},{name:"literal",value:"20"}]},description:""}},composes:["InputHTMLAttributes"]};const b={title:"UI Component/Toggle",component:s,parameters:{layout:"centered"},tags:["autodocs"],args:{onClick:g(()=>{alert("Click Action!")})}},r=()=>t.jsx("div",{children:t.jsx(s,{$size:16})}),o=()=>t.jsx("div",{children:t.jsx(s,{$size:20})});r.__docgenInfo={description:"",methods:[],displayName:"Small"};o.__docgenInfo={description:"",methods:[],displayName:"Middle"};var i,d,l;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  return <div>\r
      <Toggle $size={16} />\r
    </div>;
}`,...(l=(d=r.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var p,c,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  return <div>\r
      <Toggle $size={20} />\r
    </div>;
}`,...(m=(c=o.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const v=["Small","Middle"];export{o as Middle,r as Small,v as __namedExportsOrder,b as default};
