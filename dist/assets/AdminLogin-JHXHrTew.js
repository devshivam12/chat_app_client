import{f as s,u as o,r as m,ak as l,j as e,al as d,b as p,am as u}from"./index-DLu291oi.js";import{a as c}from"./index-KjJ5Dpjy.js";import{C as h}from"./Container-Bb2g7vx9.js";import{P as x}from"./Modal-CuAh2ZEk.js";import{T as f}from"./Typography-BYTqXvty.js";import{T as g}from"./TextField-DU2Yq45b.js";import{B as y}from"./Button-CO1hZCK-.js";import"./isMuiElement-BLZikN05.js";import"./Menu-wfcDCIto.js";const E=()=>{const{isAdmin:i}=s(r=>r.auth),t=o(),a=c(""),n=r=>{r.preventDefault(),t(u(a.value))};return m.useEffect(()=>{t(l())},[t]),i?e.jsx(d,{to:"/admin/dashboard"}):e.jsx("div",{style:{backgroundImage:p},children:e.jsx(h,{component:"main",maxWidth:"xs",sx:{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsxs(x,{elevation:3,sx:{padding:4,display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx(f,{variant:"h5",children:"Admin Login"}),e.jsxs("form",{style:{width:"100%",marginTop:"1rem"},onSubmit:n,children:[e.jsx(g,{required:!0,fullWidth:!0,label:"Secret Key",type:"password",margin:"normal",variant:"outlined",value:a.value,onChange:a.changeHandler}),e.jsx(y,{sx:{marginTop:"1rem"},variant:"contained",color:"primary",type:"submit",fullWidth:!0,children:"Login"})]})]})})})};export{E as default};
