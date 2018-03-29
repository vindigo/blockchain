!function(t){var n={};function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=n,i.d=function(t,n,e){i.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(n,"a",n),n},i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},i.p="",i(i.s=4)}([function(t,n,i){var e;t.exports=(e=e||function(t,n){var i=Object.create||function(){function t(){}return function(n){var i;return t.prototype=n,i=new t,t.prototype=null,i}}(),e={},r=e.lib={},s=r.Base={extend:function(t){var n=i(this);return t&&n.mixIn(t),n.hasOwnProperty("init")&&this.init!==n.init||(n.init=function(){n.$super.init.apply(this,arguments)}),n.init.prototype=n,n.$super=this,n},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var n in t)t.hasOwnProperty(n)&&(this[n]=t[n]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},o=r.WordArray=s.extend({init:function(t,n){t=this.words=t||[],this.sigBytes=void 0!=n?n:4*t.length},toString:function(t){return(t||c).stringify(this)},concat:function(t){var n=this.words,i=t.words,e=this.sigBytes,r=t.sigBytes;if(this.clamp(),e%4)for(var s=0;s<r;s++){var o=i[s>>>2]>>>24-s%4*8&255;n[e+s>>>2]|=o<<24-(e+s)%4*8}else for(var s=0;s<r;s+=4)n[e+s>>>2]=i[s>>>2];return this.sigBytes+=r,this},clamp:function(){var n=this.words,i=this.sigBytes;n[i>>>2]&=4294967295<<32-i%4*8,n.length=t.ceil(i/4)},clone:function(){var t=s.clone.call(this);return t.words=this.words.slice(0),t},random:function(n){for(var i,e=[],r=function(n){var n=n,i=987654321,e=4294967295;return function(){var r=((i=36969*(65535&i)+(i>>16)&e)<<16)+(n=18e3*(65535&n)+(n>>16)&e)&e;return r/=4294967296,(r+=.5)*(t.random()>.5?1:-1)}},s=0;s<n;s+=4){var a=r(4294967296*(i||t.random()));i=987654071*a(),e.push(4294967296*a()|0)}return new o.init(e,n)}}),a=e.enc={},c=a.Hex={stringify:function(t){for(var n=t.words,i=t.sigBytes,e=[],r=0;r<i;r++){var s=n[r>>>2]>>>24-r%4*8&255;e.push((s>>>4).toString(16)),e.push((15&s).toString(16))}return e.join("")},parse:function(t){for(var n=t.length,i=[],e=0;e<n;e+=2)i[e>>>3]|=parseInt(t.substr(e,2),16)<<24-e%8*4;return new o.init(i,n/2)}},h=a.Latin1={stringify:function(t){for(var n=t.words,i=t.sigBytes,e=[],r=0;r<i;r++){var s=n[r>>>2]>>>24-r%4*8&255;e.push(String.fromCharCode(s))}return e.join("")},parse:function(t){for(var n=t.length,i=[],e=0;e<n;e++)i[e>>>2]|=(255&t.charCodeAt(e))<<24-e%4*8;return new o.init(i,n)}},u=a.Utf8={stringify:function(t){try{return decodeURIComponent(escape(h.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return h.parse(unescape(encodeURIComponent(t)))}},f=r.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new o.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=u.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(n){var i=this._data,e=i.words,r=i.sigBytes,s=this.blockSize,a=4*s,c=r/a,h=(c=n?t.ceil(c):t.max((0|c)-this._minBufferSize,0))*s,u=t.min(4*h,r);if(h){for(var f=0;f<h;f+=s)this._doProcessBlock(e,f);var l=e.splice(0,h);i.sigBytes-=u}return new o.init(l,u)},clone:function(){var t=s.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),l=(r.Hasher=f.extend({cfg:s.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){f.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){t&&this._append(t);var n=this._doFinalize();return n},blockSize:16,_createHelper:function(t){return function(n,i){return new t.init(i).finalize(n)}},_createHmacHelper:function(t){return function(n,i){return new l.HMAC.init(t,i).finalize(n)}}}),e.algo={});return e}(Math),e)},function(t,n,i){var e;t.exports=(e=i(0),function(t){var n=e,i=n.lib,r=i.WordArray,s=i.Hasher,o=n.algo,a=[],c=[];!function(){function n(n){for(var i=t.sqrt(n),e=2;e<=i;e++)if(!(n%e))return!1;return!0}function i(t){return 4294967296*(t-(0|t))|0}for(var e=2,r=0;r<64;)n(e)&&(r<8&&(a[r]=i(t.pow(e,.5))),c[r]=i(t.pow(e,1/3)),r++),e++}();var h=[],u=o.SHA256=s.extend({_doReset:function(){this._hash=new r.init(a.slice(0))},_doProcessBlock:function(t,n){for(var i=this._hash.words,e=i[0],r=i[1],s=i[2],o=i[3],a=i[4],u=i[5],f=i[6],l=i[7],d=0;d<64;d++){if(d<16)h[d]=0|t[n+d];else{var p=h[d-15],g=(p<<25|p>>>7)^(p<<14|p>>>18)^p>>>3,y=h[d-2],m=(y<<15|y>>>17)^(y<<13|y>>>19)^y>>>10;h[d]=g+h[d-7]+m+h[d-16]}var v=e&r^e&s^r&s,w=(e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22),_=l+((a<<26|a>>>6)^(a<<21|a>>>11)^(a<<7|a>>>25))+(a&u^~a&f)+c[d]+h[d];l=f,f=u,u=a,a=o+_|0,o=s,s=r,r=e,e=_+(w+v)|0}i[0]=i[0]+e|0,i[1]=i[1]+r|0,i[2]=i[2]+s|0,i[3]=i[3]+o|0,i[4]=i[4]+a|0,i[5]=i[5]+u|0,i[6]=i[6]+f|0,i[7]=i[7]+l|0},_doFinalize:function(){var n=this._data,i=n.words,e=8*this._nDataBytes,r=8*n.sigBytes;return i[r>>>5]|=128<<24-r%32,i[14+(r+64>>>9<<4)]=t.floor(e/4294967296),i[15+(r+64>>>9<<4)]=e,n.sigBytes=4*i.length,this._process(),this._hash},clone:function(){var t=s.clone.call(this);return t._hash=this._hash.clone(),t}});n.SHA256=s._createHelper(u),n.HmacSHA256=s._createHmacHelper(u)}(Math),e.SHA256)},,function(t,n,i){},function(t,n,i){"use strict";i.r(n);i(3);const e=i(1);class r{constructor(t,n,i){this.fromAddress=t,this.toAddress=n,this.Amount=i}}class s{constructor(t,n,i=""){this.timestamp=t,this.transactions=n,this.previousHash=i,this.hash=this.calculateHash(),this.nonce=0}calculateHash(){return e(this.index+this.previousHash+this.timestamp+JSON.stringify(this.transactions)+this.nonce).toString()}mineBlock(t){for(;this.hash.substring(0,t)!==Array(t+1).join("0");)this.nonce++,this.hash=this.calculateHash();console.log("block mined: "+this.hash)}}let o=new class{constructor(){this.chain=[this.createGenesisBlock()],this.difficulty=2,this.pendingTransactions=[],this.miningReward=100}createGenesisBlock(){return new s("2018/01/01","Genesis block","0")}getLatestBlock(){return this.chain[this.chain.length-1]}minePendingTransactions(t){let n=new s(Date.now(),this.pendingTransactions);n.mineBlock(this.difficulty),console.log("block successfully mined"),this.chain.push(n),this.pendingTransactions=[new r(null,t,this.miningReward)]}createTransaction(t){this.pendingTransactions.push(t)}getBalanceOfAddress(t){let n=0;for(const i of this.chain){console.log("block: "+JSON.stringify(i,null,4));for(const e of i.transactions)e.fromAddress===t&&(n-=e.amount),e.toAddress===t&&(n+=e.amount)}return n}isChainValid(){for(let t=1;t<this.chain.length;t++){const n=this.chain[t],i=this.chain[t-1];if(n.hash!==n.calculateHash())return!1;if(n.previousHash!==i.hash)return!1}return!0}};o.createTransaction(new r("address1","address2",100)),o.createTransaction(new r("address2","address1",50)),console.log("\n starting miner..."),o.minePendingTransactions("myAddress"),console.log("\n Balance of myAddress: "+o.getBalanceOfAddress("myAddress")),console.log("\n starting miner again..."),o.minePendingTransactions("myAddress")}]);