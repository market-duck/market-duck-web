import{u as i,j as s}from"./styled-components.browser.esm-C0OQzGPn.js";import{r as _}from"./index-DVXBtNgz.js";import{A as e,a as B}from"./AppRadii-C1muoxgs.js";import{A as S}from"./AppSpacing-BpsjA0jU.js";import{A as D}from"./AppTypo-CbdkmyKb.js";import"./tslib.es6-DN43Sy8V.js";const L=i.div`
  width: 100%;

  > .textarea-label {
    margin-bottom: ${S.XXS};
    color: ${e.TEXT_SECONDARY.hex};
    font-weight: 600;
    ${D.CAPTION_MD};
  }
`,Y=i.textarea.attrs(({$focus:r,$error:a,$disabled:t})=>({className:`${r?"is-focus":""} ${a?"is-error":""} ${t?"is-disabled":""}`}))`
  width: 100%;
  height: 12.25rem;
  border-radius: ${B.M};
  padding: ${S.XS};
  border: 1px solid ${e.BORDER_TERTIARY.hex};

  &:hover {
    background-color: ${e.BG_SECONDARY.hex};
    color: ${e.TEXT_SECONDARY.hex};
    border-color: ${e.BORDER_SECONDARY.hex};
  }

  &.is-focus {
    background-color: ${e.BG_SECONDARY.hex};
    color: ${e.TEXT_SECONDARY.hex};
    border-color: ${e.BORDER_FOCUS_RING.hex};
  }

  &.is-error {
    background-color: ${e.BG_DANGER_SUBTLE.hex};
    color: ${e.TEXT_SECONDARY.hex};
    border-color: ${e.TEXT_DANGER.hex};
  }

  &.is-disabled {
    background-color: ${e.BG_DISABLED.hex};
    color: ${e.TEXT_SECONDARY.hex};
    border-color: ${e.BORDER_TERTIARY.hex};
  }
`,I=i.p.attrs(({$error:r,$disabled:a})=>({className:`${r?"is-error":""} ${a?"is-disabled":""}`}))`
  color: ${e.TEXT_TERTIARY.hex};
  font-weight: 500;
  ${D.CAPTION_MD};
`,u=({value:r,changeHandler:a,placeholder:t,maxLength:c,isDisabled:p,isError:C,label:m,caption:T})=>{const[N,g]=_.useState(!1),O=()=>{g(!0)},y=()=>{g(!1)};return s.jsxs(L,{children:[m&&s.jsx("p",{className:"textarea-label",children:m}),s.jsx(Y,{$focus:N,$error:C,$disabled:p,disabled:p,value:r,onChange:a,onFocus:O,onBlur:y,placeholder:t,maxLength:c}),T&&s.jsx(I,{children:T})]})};u.__docgenInfo={description:"",methods:[],displayName:"TextArea",props:{value:{required:!0,tsType:{name:"string"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},maxLength:{required:!1,tsType:{name:"number"},description:""},changeHandler:{required:!0,tsType:{name:"ReactChangeEventHandler",raw:"React.ChangeEventHandler<HTMLTextAreaElement>",elements:[{name:"HTMLTextAreaElement"}]},description:""},isDisabled:{required:!1,tsType:{name:"boolean"},description:""},isError:{required:!1,tsType:{name:"boolean"},description:""},label:{required:!1,tsType:{name:"string"},description:""},caption:{required:!1,tsType:{name:"string"},description:""}}};const F={title:"UI Component/TextArea",component:u,parameters:{layout:"centered"},tags:["autodocs"]},d=r=>{const[a,t]=_.useState(r.value);return s.jsx(u,{...r,value:a,changeHandler:c=>t(c.target.value)})},o=d.bind({});o.args={value:"",placeholder:"Enter text...",maxLength:500,isDisabled:!1,isError:!1,label:"Label",caption:"Caption text"};const n=d.bind({});n.args={value:"",label:"test"};const l=d.bind({});l.args={value:""};var x,h,E;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const [value, setValue] = useState(args.value);
  return <TextArea {...args} value={value} changeHandler={event => setValue(event.target.value)} />;
}`,...(E=(h=o.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};var A,b,v;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
  const [value, setValue] = useState(args.value);
  return <TextArea {...args} value={value} changeHandler={event => setValue(event.target.value)} />;
}`,...(v=(b=n.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var R,$,f;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
  const [value, setValue] = useState(args.value);
  return <TextArea {...args} value={value} changeHandler={event => setValue(event.target.value)} />;
}`,...(f=($=l.parameters)==null?void 0:$.docs)==null?void 0:f.source}}};const w=["Default","isLabelTrue","isLabelFalse"];export{o as Default,w as __namedExportsOrder,F as default,l as isLabelFalse,n as isLabelTrue};
