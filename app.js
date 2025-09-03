
const CART_KEY='primal_cart_v4', USERS_KEY='primal_users_v3', SESSION_KEY='primal_session_v3', ORDERS_KEY='primal_orders_v3';
const TELEGRAM_TOKEN='6025160485:AAGHWN_9dv2hfrS3z9xRFJws0D0sTVS33b4';
const TELEGRAM_CHAT='699170192';
const $=(s)=>document.querySelector(s);
function load(k,d){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}catch(e){return d}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
function loadCart(){return load(CART_KEY,[])}
function saveCart(c){save(CART_KEY,c)}
function addToCart(item){const c=loadCart(); c.push(item); saveCart(c)}
function clearCart(){localStorage.removeItem(CART_KEY)}
function renderCart(elId='cartTable'){const wrap=document.getElementById(elId); if(!wrap) return; const cart=loadCart(); if(!cart.length){wrap.innerHTML='<p>Your cart is empty.</p>'; return} let total=0; let rows=cart.map((it,i)=>{ total+=it.price; return `<tr><td style="padding:8px">${it.title} — ${it.sku}</td><td>${it.qty}</td><td>${it.unit} ETB</td><td><b>${it.price} ETB</b></td><td><button data-i="${i}" class="remove">Remove</button></td></tr>` }).join(''); wrap.innerHTML=`<table style="width:100%;border-collapse:collapse"><thead><tr><th>Item</th><th>Qty</th><th>Unit</th><th>Total</th><th></th></tr></thead><tbody>${rows}</tbody><tfoot><tr><td colspan="3">Total</td><td><b>${total} ETB</b></td><td></td></tr></tfoot></table>`; wrap.querySelectorAll('.remove').forEach(b=>b.onclick=()=>{const c=loadCart(); c.splice(+b.dataset.i,1); saveCart(c); renderCart(elId)})}
async function tgSendText(text){ try{ return await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({chat_id: TELEGRAM_CHAT, text})}) }catch(e){console.error(e)} }
async function tgSendFile(file, caption){ try{ const fd=new FormData(); fd.append('chat_id', TELEGRAM_CHAT); fd.append('document', file); if(caption) fd.append('caption', caption); return await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendDocument`, {method:'POST', body: fd}) }catch(e){console.error(e)} }
window.primal={ addToCart, loadCart, renderCart, tgSendText, tgSendFile, clearCart };
