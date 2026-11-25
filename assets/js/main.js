var ENDPOINT="https://formsubmit.co/ajax/teamapex173@gmail.com",TO="teamapex173@gmail.com",V=["home","about-us","associates","builders","software","privacy","terms"];
function route(){
 var h=(location.hash||"").slice(1),v=V.indexOf(h)>-1?h:"home";
 document.querySelectorAll("[data-view]").forEach(function(s){s.hidden=s.getAttribute("data-view")!==v});
 document.querySelectorAll("a.l[data-v]").forEach(function(a){a.classList.toggle("on",a.getAttribute("data-v")===v)});
 var el=(v==="home"&&(h==="branches"||h==="contact"))?document.getElementById(h):null;
 if(el){el.scrollIntoView()}else{window.scrollTo(0,0)}
}
window.addEventListener("hashchange",route);route();
var bs=document.getElementById("d"),mw=document.getElementById("mw");
function tg(){mw.hidden=bs.value!=="Apex Lex Associates"}
bs.addEventListener("change",tg);tg();
var g=document.getElementById("gate"),ok=false;
try{ok=sessionStorage.getItem("ack")==="1"}catch(e){}
if(!ok){g.hidden=false}
document.getElementById("agree").addEventListener("click",function(){g.hidden=true;try{sessionStorage.setItem("ack","1")}catch(e){}});
var fm=document.getElementById("f"),fmsg=document.getElementById("msg");
function val(id){return document.getElementById(id).value.trim()}
function show(t,ok){fmsg.hidden=false;fmsg.className="fmsg"+(ok?" ok":"");fmsg.textContent=t}
fm.addEventListener("submit",function(e){
 e.preventDefault();
 var d=bs.value,n=val("n"),em=val("e"),p=val("p"),s=val("s"),u=val("u"),m=val("m"),t=val("t"),c=document.getElementById("c").checked,miss=[];
 if(!n)miss.push("Your name");
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))miss.push("Valid email ID");
 if(!/^[6-9][0-9]{9}$/.test(p))miss.push("10-digit mobile number");
 if(!s)miss.push("State");
 if(!u)miss.push("District");
 if(!m)miss.push("Message");
 if(!c)miss.push("Consent box");
 if(miss.length){show("Please enter the remaining details: "+miss.join(", ")+".",false);return}
 var ty=(d==="Apex Lex Associates")?"Type of matter: "+t+"\n":"";
 var body="Branch: "+d+"\n"+ty+"Name: "+n+"\nEmail: "+em+"\nMobile: +91 "+p+"\nDistrict: "+u+", "+s+"\n\n"+m;
 var mail=function(){location.href="mailto:"+TO+"?subject="+encodeURIComponent("Enquiry: "+d)+"&body="+encodeURIComponent(body)};
 if(!ENDPOINT){mail();return}
 show("Sending...",true);
 fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({branch:d,matter:ty.replace("\n",""),name:n,email:em,mobile:p,state:s,district:u,message:m,_subject:"Enquiry: "+d+" | "+n+" | "+em+" | +91 "+p,_replyto:em,_template:"table",_captcha:"false"})}).then(function(r){if(!r.ok){throw 0}fm.reset();tg();show("Thank you. Your message has been sent. We will contact you shortly.",true)}).catch(function(){fmsg.hidden=true;mail()});
});
