import{r as m,E as G,D as A,s as C,F as s,J as E,G as d,K as R,j as $,L as H,H as sr}from"./index-DLu291oi.js";import{c as er}from"./Avatar-DIds3tWp.js";import{k as F}from"./Modal-CuAh2ZEk.js";const S=o=>{const a=m.useRef({});return m.useEffect(()=>{a.current=o}),a.current};function lr(o){const{badgeContent:a,invisible:r=!1,max:t=99,showZero:n=!1}=o,l=S({badgeContent:a,max:t});let e=r;r===!1&&a===0&&!n&&(e=!0);const{badgeContent:i,max:p=t}=e?l:o,c=i&&Number(i)>p?`${p}+`:i;return{badgeContent:i,invisible:e,max:p,displayValue:c}}function cr(o){return A("MuiBadge",o)}const g=G("MuiBadge",["root","badge","dot","standard","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft","invisible","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","overlapRectangular","overlapCircular","anchorOriginTopLeftCircular","anchorOriginTopLeftRectangular","anchorOriginTopRightCircular","anchorOriginTopRightRectangular","anchorOriginBottomLeftCircular","anchorOriginBottomLeftRectangular","anchorOriginBottomRightCircular","anchorOriginBottomRightRectangular"]),pr=["anchorOrigin","className","classes","component","components","componentsProps","children","overlap","color","invisible","max","badgeContent","slots","slotProps","showZero","variant"],P=10,y=4,gr=er(),dr=o=>{const{color:a,anchorOrigin:r,invisible:t,overlap:n,variant:l,classes:e={}}=o,i={root:["root"],badge:["badge",l,t&&"invisible",`anchorOrigin${s(r.vertical)}${s(r.horizontal)}`,`anchorOrigin${s(r.vertical)}${s(r.horizontal)}${s(n)}`,`overlap${s(n)}`,a!=="default"&&`color${s(a)}`]};return H(i,cr,e)},ur=C("span",{name:"MuiBadge",slot:"Root",overridesResolver:(o,a)=>a.root})({position:"relative",display:"inline-flex",verticalAlign:"middle",flexShrink:0}),vr=C("span",{name:"MuiBadge",slot:"Badge",overridesResolver:(o,a)=>{const{ownerState:r}=o;return[a.badge,a[r.variant],a[`anchorOrigin${s(r.anchorOrigin.vertical)}${s(r.anchorOrigin.horizontal)}${s(r.overlap)}`],r.color!=="default"&&a[`color${s(r.color)}`],r.invisible&&a.invisible]}})(({theme:o})=>{var a;return{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",boxSizing:"border-box",fontFamily:o.typography.fontFamily,fontWeight:o.typography.fontWeightMedium,fontSize:o.typography.pxToRem(12),minWidth:P*2,lineHeight:1,padding:"0 6px",height:P*2,borderRadius:P,zIndex:1,transition:o.transitions.create("transform",{easing:o.transitions.easing.easeInOut,duration:o.transitions.duration.enteringScreen}),variants:[...Object.keys(((a=o.vars)!=null?a:o).palette).filter(r=>{var t,n;return((t=o.vars)!=null?t:o).palette[r].main&&((n=o.vars)!=null?n:o).palette[r].contrastText}).map(r=>({props:{color:r},style:{backgroundColor:(o.vars||o).palette[r].main,color:(o.vars||o).palette[r].contrastText}})),{props:{variant:"dot"},style:{borderRadius:y,height:y*2,minWidth:y*2,padding:0}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="top"&&r.anchorOrigin.horizontal==="right"&&r.overlap==="rectangular",style:{top:0,right:0,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${g.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="bottom"&&r.anchorOrigin.horizontal==="right"&&r.overlap==="rectangular",style:{bottom:0,right:0,transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${g.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="top"&&r.anchorOrigin.horizontal==="left"&&r.overlap==="rectangular",style:{top:0,left:0,transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${g.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="bottom"&&r.anchorOrigin.horizontal==="left"&&r.overlap==="rectangular",style:{bottom:0,left:0,transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${g.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="top"&&r.anchorOrigin.horizontal==="right"&&r.overlap==="circular",style:{top:"14%",right:"14%",transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${g.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="bottom"&&r.anchorOrigin.horizontal==="right"&&r.overlap==="circular",style:{bottom:"14%",right:"14%",transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${g.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="top"&&r.anchorOrigin.horizontal==="left"&&r.overlap==="circular",style:{top:"14%",left:"14%",transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${g.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="bottom"&&r.anchorOrigin.horizontal==="left"&&r.overlap==="circular",style:{bottom:"14%",left:"14%",transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${g.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}}},{props:{invisible:!0},style:{transition:o.transitions.create("transform",{easing:o.transitions.easing.easeInOut,duration:o.transitions.duration.leavingScreen})}}]}}),yr=m.forwardRef(function(a,r){var t,n,l,e,i,p;const c=gr({props:a,name:"MuiBadge"}),{anchorOrigin:u={vertical:"top",horizontal:"right"},className:V,component:Z,components:T={},componentsProps:B={},children:J,overlap:z="rectangular",color:_="default",invisible:K=!1,max:q=99,badgeContent:N,slots:v,slotProps:f,showZero:L=!1,variant:b="standard"}=c,Q=E(c,pr),{badgeContent:M,invisible:X,max:Y,displayValue:w}=lr({max:q,invisible:K,badgeContent:N,showZero:L}),rr=S({anchorOrigin:u,color:_,overlap:z,variant:b,badgeContent:N}),U=X||M==null&&b!=="dot",{color:or=_,overlap:ar=z,anchorOrigin:tr=u,variant:j=b}=U?rr:c,I=j!=="dot"?w:void 0,h=d({},c,{badgeContent:M,invisible:U,max:Y,displayValue:I,showZero:L,anchorOrigin:tr,color:or,overlap:ar,variant:j}),D=dr(h),W=(t=(n=v==null?void 0:v.root)!=null?n:T.Root)!=null?t:ur,k=(l=(e=v==null?void 0:v.badge)!=null?e:T.Badge)!=null?l:vr,O=(i=f==null?void 0:f.root)!=null?i:B.root,x=(p=f==null?void 0:f.badge)!=null?p:B.badge,nr=F({elementType:W,externalSlotProps:O,externalForwardedProps:Q,additionalProps:{ref:r,as:Z},ownerState:h,className:R(O==null?void 0:O.className,D.root,V)}),ir=F({elementType:k,externalSlotProps:x,ownerState:h,className:R(D.badge,x==null?void 0:x.className)});return $.jsxs(W,d({},nr,{children:[J,$.jsx(k,d({},ir,{children:I}))]}))});function fr(o){return A("MuiToolbar",o)}G("MuiToolbar",["root","gutters","regular","dense"]);const mr=["className","component","disableGutters","variant"],br=o=>{const{classes:a,disableGutters:r,variant:t}=o;return H({root:["root",!r&&"gutters",t]},fr,a)},hr=C("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:r}=o;return[a.root,!r.disableGutters&&a.gutters,a[r.variant]]}})(({theme:o,ownerState:a})=>d({position:"relative",display:"flex",alignItems:"center"},!a.disableGutters&&{paddingLeft:o.spacing(2),paddingRight:o.spacing(2),[o.breakpoints.up("sm")]:{paddingLeft:o.spacing(3),paddingRight:o.spacing(3)}},a.variant==="dense"&&{minHeight:48}),({theme:o,ownerState:a})=>a.variant==="regular"&&o.mixins.toolbar),Rr=m.forwardRef(function(a,r){const t=sr({props:a,name:"MuiToolbar"}),{className:n,component:l="div",disableGutters:e=!1,variant:i="regular"}=t,p=E(t,mr),c=d({},t,{component:l,disableGutters:e,variant:i}),u=br(c);return $.jsx(hr,d({as:l,className:R(u.root,n),ref:r,ownerState:c},p))});export{yr as B,Rr as T,S as u};