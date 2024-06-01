import{u as i,j as t}from"./styled-components.browser.esm-C0OQzGPn.js";import{C as O,R as B}from"./Flex-DHnJfdLb.js";import{A as e,a as x}from"./AppRadii-C1muoxgs.js";import{A as f}from"./AppSpacing-BpsjA0jU.js";import{A}from"./AppTypo-CbdkmyKb.js";import{T as q}from"./Tag-DIZ1fjpD.js";import{r as C}from"./index-DVXBtNgz.js";import{F as X,a as Y}from"./XCircleIcon-BkZQIsAc.js";import{f as k}from"./index-DRb5_YVN.js";import"./tslib.es6-DN43Sy8V.js";import"./index-BdlRumKp.js";const N=i(O)`
  position: relative;
  width: 100%;
  gap: ${f.XS};
  font-weight: 500;
  ${A.BODY_MD};
`,M=i.div`
  width: 100%;
`,G=i.div.attrs(({$focus:r,$error:l,$disabled:a})=>({className:`${r?"is-focus":""} ${l?"is-error":""} ${a?"is-disabled":""}`}))`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2rem;
  border: 1px solid ${e.BORDER_TERTIARY.hex};
  padding: ${f.XXS};
  padding-right: 32px;
  background-color: ${e.BG_PRIMARY.hex};
  border-radius: ${x.M};
  ${A.BODY_MD};
  cursor: pointer;

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

  > .multi-input {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`,L=i.ul`
  position: absolute;
  left: 0;
  top: calc(100% + 8px);
  width: 100%;
  max-height: 9rem;
  overflow-y: scroll;
  border: 1px solid ${e.BORDER_TERTIARY.hex};
  padding: ${f.XS} 0;
  background-color: ${e.BG_PRIMARY.hex};
  border-radius: ${x.M};
`,F=i.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: ${f.XXS};
  background-color: ${e.BG_PRIMARY.hex};
  border-radius: ${x.M};
  cursor: pointer;
`,P=i(X)`
  position: absolute;
  right: 0.4rem;
  width: 1.5rem;
  height: 1.5rem;
`,U=i(Y)`
  position: absolute;
  right: 0.4rem;
  width: 1.5rem;
  height: 1.5rem;
`,W=({optionList:r,placeholder:l,value:a,selectType:o,isDisabled:c,isFocused:p,isError:d,deleteOneHandler:h,deleteAllHandler:m})=>t.jsxs(G,{className:"input-wrap",$focus:p,$error:d,$disabled:c,children:[a.length===0&&l,o==="single"?r[a[0]].label:t.jsx("div",{className:"multi-input",children:t.jsx(B,{gap:"XXS",children:a.map(s=>t.jsx(q,{color:"secondary",showDeleteIcon:!0,onDelete:()=>{h(s)},text:r[s].label},s))})}),o==="multi"&&a.length?t.jsx(P,{onClick:s=>{s.stopPropagation(),m()}}):t.jsx(U,{})]}),w=({selectType:r,label:l,placeholder:a,value:o,onChangeValue:c,optionList:p,isDisabled:d=!1,isError:h=!1})=>{const[m,s]=C.useState(!1),E=()=>{s(!1)},_=n=>{r==="multi"?o.includes(n)||c([...o,n]):c([n]),s(!1)},D=()=>{s(!1),c([])},j=n=>{const u=o.filter(I=>I!==n);c(u)};return t.jsxs(N,{onBlur:E,tabIndex:0,children:[t.jsxs(M,{onClick:n=>{n.stopPropagation(),!d&&s(u=>!u)},children:[l&&t.jsx("p",{children:"label"}),t.jsx(W,{optionList:p,isFocused:m,isError:h,isDisabled:d,placeholder:a||"",selectType:r,value:o,deleteOneHandler:j,deleteAllHandler:D})]}),m&&t.jsx(L,{children:p.map((n,u)=>t.jsx(H,{onClick:()=>{_(u)},children:n.label},n.value))})]})},H=({onClick:r,children:l})=>t.jsx(F,{onClick:r,children:l});w.__docgenInfo={description:`@description\r
Label, SelectType을 필요에 따라 지정해 사용할 수 있습니다.\r
@requires selectType\r
@requires value\r
@requires onChangeValue\r
@requires optionList`,methods:[],displayName:"Select",props:{selectType:{required:!0,tsType:{name:"union",raw:"'single' | 'multi'",elements:[{name:"literal",value:"'single'"},{name:"literal",value:"'multi'"}]},description:""},value:{required:!0,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:""},onChangeValue:{required:!0,tsType:{name:"signature",type:"function",raw:"(selected: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"selected"}],return:{name:"void"}}},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},optionList:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ label: string; value: string }",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}}]}}],raw:"Array<{ label: string; value: string }>"},description:""},isDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isError:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const ae={title:"UI Component/Select",component:w,parameters:{layout:"centered"},tags:["autodocs"],args:{onChangeValue:k(r=>console.log(r))}},g={args:{selectType:"single",value:[0,1,2],label:"test",optionList:[{label:"test1",value:"test1"},{label:"test2",value:"test2"},{label:"test3",value:"test3"}]}},b={args:{selectType:"multi",value:[0,1,2],label:"test",optionList:[{label:"test1",value:"test1"},{label:"test2",value:"test2"},{label:"test3",value:"test3"}]}};var y,R,T;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    selectType: 'single',
    value: [0, 1, 2],
    label: 'test',
    optionList: [{
      label: 'test1',
      value: 'test1'
    }, {
      label: 'test2',
      value: 'test2'
    }, {
      label: 'test3',
      value: 'test3'
    }]
  }
}`,...(T=(R=g.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var v,S,$;b.parameters={...b.parameters,docs:{...(v=b.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    selectType: 'multi',
    value: [0, 1, 2],
    label: 'test',
    optionList: [{
      label: 'test1',
      value: 'test1'
    }, {
      label: 'test2',
      value: 'test2'
    }, {
      label: 'test3',
      value: 'test3'
    }]
  }
}`,...($=(S=b.parameters)==null?void 0:S.docs)==null?void 0:$.source}}};const le=["SingleSelect","MultiSelect"];export{b as MultiSelect,g as SingleSelect,le as __namedExportsOrder,ae as default};
