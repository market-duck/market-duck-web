import{u as s,j as i}from"./styled-components.browser.esm-C0OQzGPn.js";import{a as u,A as r}from"./AppRadii-C1muoxgs.js";import{A as a}from"./AppSpacing-BpsjA0jU.js";import{A as c}from"./AppTypo-CbdkmyKb.js";import{r as t}from"./index-DVXBtNgz.js";function p({title:e,titleId:o,...l},n){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":o},l),e?t.createElement("title",{id:o},e):null,t.createElement("path",{fillRule:"evenodd",d:"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z",clipRule:"evenodd"}))}const m=t.forwardRef(p),E=m,T=s.div.attrs(({$color:e="primary",$rightIcon:o=!0})=>({className:`color-${e} ${o?"right-icon":""}`}))`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  border-radius: ${u.M};
  font-weight: 500;
  padding: ${a.XXXS} ${a.XXS};
  ${c.CAPTION_MD}

  &.color-primary {
    background-color: ${r.BG_INTERACTIVE_PRIMARY.hex};
    color: ${r.TEXT_INVERSE.hex};
    &:hover {
      background-color: ${r.BG_INTERACTIVE_PRIMARY_HOVER.hex};
    }
  }

  &.color-secondary {
    background-color: ${r.BG_INTERACTIVE_SECONDARY.hex};
    color: ${r.TEXT_PRIMARY.hex};
    &:hover {
      background-color: ${r.BG_INTERACTIVE_SECONDARY_HOVER.hex};
    }
  }

  &.color-info {
    background-color: ${r.BG_INTERACTIVE_INFO.hex};
    color: ${r.TEXT_INFO.hex};
    &:hover {
      background-color: ${r.BG_INTERACTIVE_INFO_HOVER.hex};
    }
  }

  &.color-error {
    background-color: ${r.BG_INTERACTIVE_DANGER.hex};
    color: ${r.TEXT_DANGER.hex};
    &:hover {
      background-color: ${r.BG_INTERACTIVE_DANGER_HOVER.hex};
    }
  }

  &.color-caution {
    background-color: ${r.BG_INTERACTIVE_WARNING.hex};
    color: ${r.TEXT_WARNING.hex};
    &:hover {
      background-color: ${r.BG_INTERACTIVE_WARNING_HOVER.hex};
    }
  }

  &.right-icon {
    ${c.CAPTION_MD}
    padding: ${a.XXS} ${a.XS};
  }

  > span + span {
    margin-left: ${a.XXS};
  }
`,R=s(E)`
  width: 1rem;
  height: 1rem;
`,I=({showDeleteIcon:e=!0,text:o,color:l="primary",onDelete:n})=>i.jsxs(T,{$color:l,$rightIcon:e,children:[i.jsx("span",{children:o}),e&&i.jsx(R,{onClick:d=>{d.stopPropagation(),n&&n()}})]});I.__docgenInfo={description:"",methods:[],displayName:"Tag",props:{showDeleteIcon:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},text:{required:!0,tsType:{name:"string"},description:""},color:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'info' | 'error' | 'caution'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'info'"},{name:"literal",value:"'error'"},{name:"literal",value:"'caution'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{I as T};
