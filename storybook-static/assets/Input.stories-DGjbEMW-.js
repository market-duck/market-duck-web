import{u as c,j as t}from"./styled-components.browser.esm-C0OQzGPn.js";import{r as S}from"./index-DVXBtNgz.js";import{A as e,a as B}from"./AppRadii-C1muoxgs.js";import{A as D}from"./AppSpacing-BpsjA0jU.js";import{A as d}from"./AppTypo-CbdkmyKb.js";import"./tslib.es6-DN43Sy8V.js";const q=c.div`
  width: 100%;

  > .input-label {
    margin-bottom: ${D.XXS};
    color: ${e.TEXT_SECONDARY.hex};
    font-weight: 600;
    ${d.CAPTION_MD};
  }
`,X=c.div.attrs(({$focus:r,$error:a,$disabled:s})=>({className:`${r?"is-focus":""} ${a?"is-error":""} ${s?"is-disabled":""}`}))`
  display: flex;
  width: 100%;
  height: 2rem;
  border-radius: ${B.M};
  padding: ${D.XXS};
  border: 1px solid ${e.BORDER_TERTIARY.hex};
  background-color: ${e.BG_PRIMARY.hex};
  color: ${e.TEXT_TERTIARY.hex};
  font-weight: 500;
  ${d.BODY_MD};

  > input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    flex: auto;
    min-width: 0;
    background-color: transparent;
  }

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
`,L=c.p.attrs(({$error:r,$disabled:a})=>({className:`${r?"is-error":""} ${a?"is-disabled":""}`}))`
  color: ${e.TEXT_TERTIARY.hex};
  font-weight: 500;
  ${d.CAPTION_MD};
`,p=({value:r,maxLength:a,changeHandler:s,placeholder:u,isDisabled:i,isError:g,label:h,prefix:C=null,suffix:N=null,caption:T})=>{const[O,f]=S.useState(!1),y=()=>{f(!0)},Y=()=>{f(!1)};return t.jsxs(q,{children:[h&&t.jsx("p",{className:"input-label",children:h}),t.jsxs(X,{$focus:O,$error:g,$disabled:i,children:[C,t.jsx("input",{maxLength:a,placeholder:u,disabled:i,value:r,onChange:s,onFocus:y,onBlur:Y}),N]}),T&&t.jsx(L,{$disabled:i,$error:g,children:T})]})};p.__docgenInfo={description:`@requires value\r
@requires changeHandler`,methods:[],displayName:"Input",props:{value:{required:!0,tsType:{name:"string"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},maxLength:{required:!1,tsType:{name:"number"},description:""},changeHandler:{required:!0,tsType:{name:"ReactChangeEventHandler",raw:"React.ChangeEventHandler<HTMLInputElement>",elements:[{name:"HTMLInputElement"}]},description:""},isDisabled:{required:!1,tsType:{name:"boolean"},description:""},isError:{required:!1,tsType:{name:"boolean"},description:""},label:{required:!1,tsType:{name:"string"},description:""},prefix:{required:!1,tsType:{name:"ReactNode"},description:"",defaultValue:{value:"null",computed:!1}},suffix:{required:!1,tsType:{name:"ReactNode"},description:"",defaultValue:{value:"null",computed:!1}},caption:{required:!1,tsType:{name:"string"},description:""}}};const k={title:"UI Component/Input",component:p,parameters:{layout:"centered"},tags:["autodocs"]},m=r=>{const[a,s]=S.useState(r.value);return t.jsx(p,{...r,value:a,changeHandler:u=>s(u.target.value)})},o=m.bind({});o.args={value:"",placeholder:"Enter text...",maxLength:100,isDisabled:!1,isError:!1,label:"Label",prefix:null,suffix:null,caption:"Caption text"};const n=m.bind({});n.args={value:"",label:"test"};const l=m.bind({});l.args={value:""};var x,E,v;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const [value, setValue] = useState(args.value);
  return <Input {...args} value={value} changeHandler={event => setValue(event.target.value)} />;
}`,...(v=(E=o.parameters)==null?void 0:E.docs)==null?void 0:v.source}}};var b,R,$;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
  const [value, setValue] = useState(args.value);
  return <Input {...args} value={value} changeHandler={event => setValue(event.target.value)} />;
}`,...($=(R=n.parameters)==null?void 0:R.docs)==null?void 0:$.source}}};var _,A,I;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
  const [value, setValue] = useState(args.value);
  return <Input {...args} value={value} changeHandler={event => setValue(event.target.value)} />;
}`,...(I=(A=l.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};const F=["Default","isLabelTrue","isLabelFalse"];export{o as Default,F as __namedExportsOrder,k as default,l as isLabelFalse,n as isLabelTrue};
