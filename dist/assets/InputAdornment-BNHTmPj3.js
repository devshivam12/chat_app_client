import{E as y,D as C,s as I,G as c,r as b,H as A,J as L,j as a,K as j,F as m,L as z}from"./index-DLu291oi.js";import{u as R,d as T}from"./TextField-DU2Yq45b.js";import{T as F}from"./Typography-BYTqXvty.js";function $(e){return C("MuiInputAdornment",e)}const f=y("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var x;const M=["children","className","component","disablePointerEvents","disableTypography","position","variant"],N=(e,t)=>{const{ownerState:n}=e;return[t.root,t[`position${m(n.position)}`],n.disablePointerEvents===!0&&t.disablePointerEvents,t[n.variant]]},U=e=>{const{classes:t,disablePointerEvents:n,hiddenLabel:o,position:s,size:r,variant:l}=e,d={root:["root",n&&"disablePointerEvents",s&&`position${m(s)}`,l,o&&"hiddenLabel",r&&`size${m(r)}`]};return z(d,$,t)},_=I("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:N})(({theme:e,ownerState:t})=>c({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(e.vars||e).palette.action.active},t.variant==="filled"&&{[`&.${f.positionStart}&:not(.${f.hiddenLabel})`]:{marginTop:16}},t.position==="start"&&{marginRight:8},t.position==="end"&&{marginLeft:8},t.disablePointerEvents===!0&&{pointerEvents:"none"})),D=b.forwardRef(function(t,n){const o=A({props:t,name:"MuiInputAdornment"}),{children:s,className:r,component:l="div",disablePointerEvents:d=!1,disableTypography:g=!1,position:u,variant:v}=o,E=L(o,M),i=R()||{};let p=v;v&&i.variant,i&&!p&&(p=i.variant);const h=c({},o,{hiddenLabel:i.hiddenLabel,size:i.size,disablePointerEvents:d,position:u,variant:p}),P=U(h);return a.jsx(T.Provider,{value:null,children:a.jsx(_,c({as:l,ownerState:h,className:j(P.root,r),ref:n},E,{children:typeof s=="string"&&!g?a.jsx(F,{color:"text.secondary",children:s}):a.jsxs(b.Fragment,{children:[u==="start"?x||(x=a.jsx("span",{className:"notranslate",children:"​"})):null,s]})}))})});export{D as I};
