import{f as o,s as r,o as s,b as c,e as i,v as l,h as d,u as p,i as u}from"./entry.c0fa4864.js";const y=o({__name:"Button",props:{color:{type:String,default:"primary"},variant:{type:String,default:"contained"},size:{type:String,default:"md"}},setup(t){const e=t,a=r(()=>({btn:!0,primary:e.color==="primary",secondary:e.color==="secondary",[`${e.size||"md"}`]:!0,contained:e.variant==="contained",outlined:e.variant==="outlined"}));return(n,m)=>(s(),c("a",{class:d(p(a))},[i("span",null,[l(n.$slots,"default",{},()=>[u("Button")])])],2))}});export{y as _};
