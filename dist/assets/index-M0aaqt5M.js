(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function e(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(s){if(s.ep)return;s.ep=!0;const l=e(s);fetch(s.href,l)}})();function Uc(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Gh={exports:{}},il={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gv;function v1(){if(gv)return il;gv=1;var i=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function e(r,s,l){var c=null;if(l!==void 0&&(c=""+l),s.key!==void 0&&(c=""+s.key),"key"in s){l={};for(var f in s)f!=="key"&&(l[f]=s[f])}else l=s;return s=l.ref,{$$typeof:i,type:r,key:c,ref:s!==void 0?s:null,props:l}}return il.Fragment=t,il.jsx=e,il.jsxs=e,il}var _v;function y1(){return _v||(_v=1,Gh.exports=v1()),Gh.exports}var Kt=y1(),qh={exports:{}},ce={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vv;function x1(){if(vv)return ce;vv=1;var i=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),e=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),l=Symbol.for("react.consumer"),c=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),m=Symbol.for("react.lazy"),g=Symbol.iterator;function v(w){return w===null||typeof w!="object"?null:(w=g&&w[g]||w["@@iterator"],typeof w=="function"?w:null)}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,R={};function M(w,Y,ft){this.props=w,this.context=Y,this.refs=R,this.updater=ft||y}M.prototype.isReactComponent={},M.prototype.setState=function(w,Y){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,Y,"setState")},M.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function x(){}x.prototype=M.prototype;function D(w,Y,ft){this.props=w,this.context=Y,this.refs=R,this.updater=ft||y}var S=D.prototype=new x;S.constructor=D,b(S,M.prototype),S.isPureReactComponent=!0;var E=Array.isArray,A={H:null,A:null,T:null,S:null,V:null},L=Object.prototype.hasOwnProperty;function P(w,Y,ft,B,tt,pt){return ft=pt.ref,{$$typeof:i,type:w,key:Y,ref:ft!==void 0?ft:null,props:pt}}function O(w,Y){return P(w.type,Y,void 0,void 0,void 0,w.props)}function C(w){return typeof w=="object"&&w!==null&&w.$$typeof===i}function T(w){var Y={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(ft){return Y[ft]})}var N=/\/+/g;function k(w,Y){return typeof w=="object"&&w!==null&&w.key!=null?T(""+w.key):Y.toString(36)}function q(){}function K(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(q,q):(w.status="pending",w.then(function(Y){w.status==="pending"&&(w.status="fulfilled",w.value=Y)},function(Y){w.status==="pending"&&(w.status="rejected",w.reason=Y)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function X(w,Y,ft,B,tt){var pt=typeof w;(pt==="undefined"||pt==="boolean")&&(w=null);var gt=!1;if(w===null)gt=!0;else switch(pt){case"bigint":case"string":case"number":gt=!0;break;case"object":switch(w.$$typeof){case i:case t:gt=!0;break;case m:return gt=w._init,X(gt(w._payload),Y,ft,B,tt)}}if(gt)return tt=tt(w),gt=B===""?"."+k(w,0):B,E(tt)?(ft="",gt!=null&&(ft=gt.replace(N,"$&/")+"/"),X(tt,Y,ft,"",function(ie){return ie})):tt!=null&&(C(tt)&&(tt=O(tt,ft+(tt.key==null||w&&w.key===tt.key?"":(""+tt.key).replace(N,"$&/")+"/")+gt)),Y.push(tt)),1;gt=0;var wt=B===""?".":B+":";if(E(w))for(var Lt=0;Lt<w.length;Lt++)B=w[Lt],pt=wt+k(B,Lt),gt+=X(B,Y,ft,pt,tt);else if(Lt=v(w),typeof Lt=="function")for(w=Lt.call(w),Lt=0;!(B=w.next()).done;)B=B.value,pt=wt+k(B,Lt++),gt+=X(B,Y,ft,pt,tt);else if(pt==="object"){if(typeof w.then=="function")return X(K(w),Y,ft,B,tt);throw Y=String(w),Error("Objects are not valid as a React child (found: "+(Y==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":Y)+"). If you meant to render a collection of children, use an array instead.")}return gt}function H(w,Y,ft){if(w==null)return w;var B=[],tt=0;return X(w,B,"","",function(pt){return Y.call(ft,pt,tt++)}),B}function Z(w){if(w._status===-1){var Y=w._result;Y=Y(),Y.then(function(ft){(w._status===0||w._status===-1)&&(w._status=1,w._result=ft)},function(ft){(w._status===0||w._status===-1)&&(w._status=2,w._result=ft)}),w._status===-1&&(w._status=0,w._result=Y)}if(w._status===1)return w._result.default;throw w._result}var J=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Y=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(Y))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)};function vt(){}return ce.Children={map:H,forEach:function(w,Y,ft){H(w,function(){Y.apply(this,arguments)},ft)},count:function(w){var Y=0;return H(w,function(){Y++}),Y},toArray:function(w){return H(w,function(Y){return Y})||[]},only:function(w){if(!C(w))throw Error("React.Children.only expected to receive a single React element child.");return w}},ce.Component=M,ce.Fragment=e,ce.Profiler=s,ce.PureComponent=D,ce.StrictMode=r,ce.Suspense=d,ce.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=A,ce.__COMPILER_RUNTIME={__proto__:null,c:function(w){return A.H.useMemoCache(w)}},ce.cache=function(w){return function(){return w.apply(null,arguments)}},ce.cloneElement=function(w,Y,ft){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var B=b({},w.props),tt=w.key,pt=void 0;if(Y!=null)for(gt in Y.ref!==void 0&&(pt=void 0),Y.key!==void 0&&(tt=""+Y.key),Y)!L.call(Y,gt)||gt==="key"||gt==="__self"||gt==="__source"||gt==="ref"&&Y.ref===void 0||(B[gt]=Y[gt]);var gt=arguments.length-2;if(gt===1)B.children=ft;else if(1<gt){for(var wt=Array(gt),Lt=0;Lt<gt;Lt++)wt[Lt]=arguments[Lt+2];B.children=wt}return P(w.type,tt,void 0,void 0,pt,B)},ce.createContext=function(w){return w={$$typeof:c,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:l,_context:w},w},ce.createElement=function(w,Y,ft){var B,tt={},pt=null;if(Y!=null)for(B in Y.key!==void 0&&(pt=""+Y.key),Y)L.call(Y,B)&&B!=="key"&&B!=="__self"&&B!=="__source"&&(tt[B]=Y[B]);var gt=arguments.length-2;if(gt===1)tt.children=ft;else if(1<gt){for(var wt=Array(gt),Lt=0;Lt<gt;Lt++)wt[Lt]=arguments[Lt+2];tt.children=wt}if(w&&w.defaultProps)for(B in gt=w.defaultProps,gt)tt[B]===void 0&&(tt[B]=gt[B]);return P(w,pt,void 0,void 0,null,tt)},ce.createRef=function(){return{current:null}},ce.forwardRef=function(w){return{$$typeof:f,render:w}},ce.isValidElement=C,ce.lazy=function(w){return{$$typeof:m,_payload:{_status:-1,_result:w},_init:Z}},ce.memo=function(w,Y){return{$$typeof:h,type:w,compare:Y===void 0?null:Y}},ce.startTransition=function(w){var Y=A.T,ft={};A.T=ft;try{var B=w(),tt=A.S;tt!==null&&tt(ft,B),typeof B=="object"&&B!==null&&typeof B.then=="function"&&B.then(vt,J)}catch(pt){J(pt)}finally{A.T=Y}},ce.unstable_useCacheRefresh=function(){return A.H.useCacheRefresh()},ce.use=function(w){return A.H.use(w)},ce.useActionState=function(w,Y,ft){return A.H.useActionState(w,Y,ft)},ce.useCallback=function(w,Y){return A.H.useCallback(w,Y)},ce.useContext=function(w){return A.H.useContext(w)},ce.useDebugValue=function(){},ce.useDeferredValue=function(w,Y){return A.H.useDeferredValue(w,Y)},ce.useEffect=function(w,Y,ft){var B=A.H;if(typeof ft=="function")throw Error("useEffect CRUD overload is not enabled in this build of React.");return B.useEffect(w,Y)},ce.useId=function(){return A.H.useId()},ce.useImperativeHandle=function(w,Y,ft){return A.H.useImperativeHandle(w,Y,ft)},ce.useInsertionEffect=function(w,Y){return A.H.useInsertionEffect(w,Y)},ce.useLayoutEffect=function(w,Y){return A.H.useLayoutEffect(w,Y)},ce.useMemo=function(w,Y){return A.H.useMemo(w,Y)},ce.useOptimistic=function(w,Y){return A.H.useOptimistic(w,Y)},ce.useReducer=function(w,Y,ft){return A.H.useReducer(w,Y,ft)},ce.useRef=function(w){return A.H.useRef(w)},ce.useState=function(w){return A.H.useState(w)},ce.useSyncExternalStore=function(w,Y,ft){return A.H.useSyncExternalStore(w,Y,ft)},ce.useTransition=function(){return A.H.useTransition()},ce.version="19.1.0",ce}var yv;function mm(){return yv||(yv=1,qh.exports=x1()),qh.exports}var Ft=mm();const Zs=Uc(Ft);var Xh={exports:{}},rl={},Wh={exports:{}},jh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xv;function S1(){return xv||(xv=1,function(i){function t(H,Z){var J=H.length;H.push(Z);t:for(;0<J;){var vt=J-1>>>1,w=H[vt];if(0<s(w,Z))H[vt]=Z,H[J]=w,J=vt;else break t}}function e(H){return H.length===0?null:H[0]}function r(H){if(H.length===0)return null;var Z=H[0],J=H.pop();if(J!==Z){H[0]=J;t:for(var vt=0,w=H.length,Y=w>>>1;vt<Y;){var ft=2*(vt+1)-1,B=H[ft],tt=ft+1,pt=H[tt];if(0>s(B,J))tt<w&&0>s(pt,B)?(H[vt]=pt,H[tt]=J,vt=tt):(H[vt]=B,H[ft]=J,vt=ft);else if(tt<w&&0>s(pt,J))H[vt]=pt,H[tt]=J,vt=tt;else break t}}return Z}function s(H,Z){var J=H.sortIndex-Z.sortIndex;return J!==0?J:H.id-Z.id}if(i.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var l=performance;i.unstable_now=function(){return l.now()}}else{var c=Date,f=c.now();i.unstable_now=function(){return c.now()-f}}var d=[],h=[],m=1,g=null,v=3,y=!1,b=!1,R=!1,M=!1,x=typeof setTimeout=="function"?setTimeout:null,D=typeof clearTimeout=="function"?clearTimeout:null,S=typeof setImmediate<"u"?setImmediate:null;function E(H){for(var Z=e(h);Z!==null;){if(Z.callback===null)r(h);else if(Z.startTime<=H)r(h),Z.sortIndex=Z.expirationTime,t(d,Z);else break;Z=e(h)}}function A(H){if(R=!1,E(H),!b)if(e(d)!==null)b=!0,L||(L=!0,k());else{var Z=e(h);Z!==null&&X(A,Z.startTime-H)}}var L=!1,P=-1,O=5,C=-1;function T(){return M?!0:!(i.unstable_now()-C<O)}function N(){if(M=!1,L){var H=i.unstable_now();C=H;var Z=!0;try{t:{b=!1,R&&(R=!1,D(P),P=-1),y=!0;var J=v;try{e:{for(E(H),g=e(d);g!==null&&!(g.expirationTime>H&&T());){var vt=g.callback;if(typeof vt=="function"){g.callback=null,v=g.priorityLevel;var w=vt(g.expirationTime<=H);if(H=i.unstable_now(),typeof w=="function"){g.callback=w,E(H),Z=!0;break e}g===e(d)&&r(d),E(H)}else r(d);g=e(d)}if(g!==null)Z=!0;else{var Y=e(h);Y!==null&&X(A,Y.startTime-H),Z=!1}}break t}finally{g=null,v=J,y=!1}Z=void 0}}finally{Z?k():L=!1}}}var k;if(typeof S=="function")k=function(){S(N)};else if(typeof MessageChannel<"u"){var q=new MessageChannel,K=q.port2;q.port1.onmessage=N,k=function(){K.postMessage(null)}}else k=function(){x(N,0)};function X(H,Z){P=x(function(){H(i.unstable_now())},Z)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(H){H.callback=null},i.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):O=0<H?Math.floor(1e3/H):5},i.unstable_getCurrentPriorityLevel=function(){return v},i.unstable_next=function(H){switch(v){case 1:case 2:case 3:var Z=3;break;default:Z=v}var J=v;v=Z;try{return H()}finally{v=J}},i.unstable_requestPaint=function(){M=!0},i.unstable_runWithPriority=function(H,Z){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var J=v;v=H;try{return Z()}finally{v=J}},i.unstable_scheduleCallback=function(H,Z,J){var vt=i.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?vt+J:vt):J=vt,H){case 1:var w=-1;break;case 2:w=250;break;case 5:w=1073741823;break;case 4:w=1e4;break;default:w=5e3}return w=J+w,H={id:m++,callback:Z,priorityLevel:H,startTime:J,expirationTime:w,sortIndex:-1},J>vt?(H.sortIndex=J,t(h,H),e(d)===null&&H===e(h)&&(R?(D(P),P=-1):R=!0,X(A,J-vt))):(H.sortIndex=w,t(d,H),b||y||(b=!0,L||(L=!0,k()))),H},i.unstable_shouldYield=T,i.unstable_wrapCallback=function(H){var Z=v;return function(){var J=v;v=Z;try{return H.apply(this,arguments)}finally{v=J}}}}(jh)),jh}var Sv;function M1(){return Sv||(Sv=1,Wh.exports=S1()),Wh.exports}var Yh={exports:{}},Bn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mv;function E1(){if(Mv)return Bn;Mv=1;var i=mm();function t(d){var h="https://react.dev/errors/"+d;if(1<arguments.length){h+="?args[]="+encodeURIComponent(arguments[1]);for(var m=2;m<arguments.length;m++)h+="&args[]="+encodeURIComponent(arguments[m])}return"Minified React error #"+d+"; visit "+h+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function e(){}var r={d:{f:e,r:function(){throw Error(t(522))},D:e,C:e,L:e,m:e,X:e,S:e,M:e},p:0,findDOMNode:null},s=Symbol.for("react.portal");function l(d,h,m){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:s,key:g==null?null:""+g,children:d,containerInfo:h,implementation:m}}var c=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function f(d,h){if(d==="font")return"";if(typeof h=="string")return h==="use-credentials"?h:""}return Bn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Bn.createPortal=function(d,h){var m=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!h||h.nodeType!==1&&h.nodeType!==9&&h.nodeType!==11)throw Error(t(299));return l(d,h,null,m)},Bn.flushSync=function(d){var h=c.T,m=r.p;try{if(c.T=null,r.p=2,d)return d()}finally{c.T=h,r.p=m,r.d.f()}},Bn.preconnect=function(d,h){typeof d=="string"&&(h?(h=h.crossOrigin,h=typeof h=="string"?h==="use-credentials"?h:"":void 0):h=null,r.d.C(d,h))},Bn.prefetchDNS=function(d){typeof d=="string"&&r.d.D(d)},Bn.preinit=function(d,h){if(typeof d=="string"&&h&&typeof h.as=="string"){var m=h.as,g=f(m,h.crossOrigin),v=typeof h.integrity=="string"?h.integrity:void 0,y=typeof h.fetchPriority=="string"?h.fetchPriority:void 0;m==="style"?r.d.S(d,typeof h.precedence=="string"?h.precedence:void 0,{crossOrigin:g,integrity:v,fetchPriority:y}):m==="script"&&r.d.X(d,{crossOrigin:g,integrity:v,fetchPriority:y,nonce:typeof h.nonce=="string"?h.nonce:void 0})}},Bn.preinitModule=function(d,h){if(typeof d=="string")if(typeof h=="object"&&h!==null){if(h.as==null||h.as==="script"){var m=f(h.as,h.crossOrigin);r.d.M(d,{crossOrigin:m,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0})}}else h==null&&r.d.M(d)},Bn.preload=function(d,h){if(typeof d=="string"&&typeof h=="object"&&h!==null&&typeof h.as=="string"){var m=h.as,g=f(m,h.crossOrigin);r.d.L(d,m,{crossOrigin:g,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0,type:typeof h.type=="string"?h.type:void 0,fetchPriority:typeof h.fetchPriority=="string"?h.fetchPriority:void 0,referrerPolicy:typeof h.referrerPolicy=="string"?h.referrerPolicy:void 0,imageSrcSet:typeof h.imageSrcSet=="string"?h.imageSrcSet:void 0,imageSizes:typeof h.imageSizes=="string"?h.imageSizes:void 0,media:typeof h.media=="string"?h.media:void 0})}},Bn.preloadModule=function(d,h){if(typeof d=="string")if(h){var m=f(h.as,h.crossOrigin);r.d.m(d,{as:typeof h.as=="string"&&h.as!=="script"?h.as:void 0,crossOrigin:m,integrity:typeof h.integrity=="string"?h.integrity:void 0})}else r.d.m(d)},Bn.requestFormReset=function(d){r.d.r(d)},Bn.unstable_batchedUpdates=function(d,h){return d(h)},Bn.useFormState=function(d,h,m){return c.H.useFormState(d,h,m)},Bn.useFormStatus=function(){return c.H.useHostTransitionStatus()},Bn.version="19.1.0",Bn}var Ev;function b1(){if(Ev)return Yh.exports;Ev=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(t){console.error(t)}}return i(),Yh.exports=E1(),Yh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bv;function T1(){if(bv)return rl;bv=1;var i=M1(),t=mm(),e=b1();function r(n){var a="https://react.dev/errors/"+n;if(1<arguments.length){a+="?args[]="+encodeURIComponent(arguments[1]);for(var o=2;o<arguments.length;o++)a+="&args[]="+encodeURIComponent(arguments[o])}return"Minified React error #"+n+"; visit "+a+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function l(n){var a=n,o=n;if(n.alternate)for(;a.return;)a=a.return;else{n=a;do a=n,(a.flags&4098)!==0&&(o=a.return),n=a.return;while(n)}return a.tag===3?o:null}function c(n){if(n.tag===13){var a=n.memoizedState;if(a===null&&(n=n.alternate,n!==null&&(a=n.memoizedState)),a!==null)return a.dehydrated}return null}function f(n){if(l(n)!==n)throw Error(r(188))}function d(n){var a=n.alternate;if(!a){if(a=l(n),a===null)throw Error(r(188));return a!==n?null:n}for(var o=n,u=a;;){var p=o.return;if(p===null)break;var _=p.alternate;if(_===null){if(u=p.return,u!==null){o=u;continue}break}if(p.child===_.child){for(_=p.child;_;){if(_===o)return f(p),n;if(_===u)return f(p),a;_=_.sibling}throw Error(r(188))}if(o.return!==u.return)o=p,u=_;else{for(var U=!1,z=p.child;z;){if(z===o){U=!0,o=p,u=_;break}if(z===u){U=!0,u=p,o=_;break}z=z.sibling}if(!U){for(z=_.child;z;){if(z===o){U=!0,o=_,u=p;break}if(z===u){U=!0,u=_,o=p;break}z=z.sibling}if(!U)throw Error(r(189))}}if(o.alternate!==u)throw Error(r(190))}if(o.tag!==3)throw Error(r(188));return o.stateNode.current===o?n:a}function h(n){var a=n.tag;if(a===5||a===26||a===27||a===6)return n;for(n=n.child;n!==null;){if(a=h(n),a!==null)return a;n=n.sibling}return null}var m=Object.assign,g=Symbol.for("react.element"),v=Symbol.for("react.transitional.element"),y=Symbol.for("react.portal"),b=Symbol.for("react.fragment"),R=Symbol.for("react.strict_mode"),M=Symbol.for("react.profiler"),x=Symbol.for("react.provider"),D=Symbol.for("react.consumer"),S=Symbol.for("react.context"),E=Symbol.for("react.forward_ref"),A=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),O=Symbol.for("react.lazy"),C=Symbol.for("react.activity"),T=Symbol.for("react.memo_cache_sentinel"),N=Symbol.iterator;function k(n){return n===null||typeof n!="object"?null:(n=N&&n[N]||n["@@iterator"],typeof n=="function"?n:null)}var q=Symbol.for("react.client.reference");function K(n){if(n==null)return null;if(typeof n=="function")return n.$$typeof===q?null:n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case b:return"Fragment";case M:return"Profiler";case R:return"StrictMode";case A:return"Suspense";case L:return"SuspenseList";case C:return"Activity"}if(typeof n=="object")switch(n.$$typeof){case y:return"Portal";case S:return(n.displayName||"Context")+".Provider";case D:return(n._context.displayName||"Context")+".Consumer";case E:var a=n.render;return n=n.displayName,n||(n=a.displayName||a.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case P:return a=n.displayName||null,a!==null?a:K(n.type)||"Memo";case O:a=n._payload,n=n._init;try{return K(n(a))}catch{}}return null}var X=Array.isArray,H=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z=e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,J={pending:!1,data:null,method:null,action:null},vt=[],w=-1;function Y(n){return{current:n}}function ft(n){0>w||(n.current=vt[w],vt[w]=null,w--)}function B(n,a){w++,vt[w]=n.current,n.current=a}var tt=Y(null),pt=Y(null),gt=Y(null),wt=Y(null);function Lt(n,a){switch(B(gt,a),B(pt,n),B(tt,null),a.nodeType){case 9:case 11:n=(n=a.documentElement)&&(n=n.namespaceURI)?q_(n):0;break;default:if(n=a.tagName,a=a.namespaceURI)a=q_(a),n=X_(a,n);else switch(n){case"svg":n=1;break;case"math":n=2;break;default:n=0}}ft(tt),B(tt,n)}function ie(){ft(tt),ft(pt),ft(gt)}function Gt(n){n.memoizedState!==null&&B(wt,n);var a=tt.current,o=X_(a,n.type);a!==o&&(B(pt,n),B(tt,o))}function Pe(n){pt.current===n&&(ft(tt),ft(pt)),wt.current===n&&(ft(wt),Jo._currentValue=J)}var Oe=Object.prototype.hasOwnProperty,he=i.unstable_scheduleCallback,j=i.unstable_cancelCallback,Dn=i.unstable_shouldYield,ge=i.unstable_requestPaint,re=i.unstable_now,qt=i.unstable_getCurrentPriorityLevel,Le=i.unstable_ImmediatePriority,Vt=i.unstable_UserBlockingPriority,V=i.unstable_NormalPriority,I=i.unstable_LowPriority,lt=i.unstable_IdlePriority,bt=i.log,W=i.unstable_setDisableYieldValue,$=null,St=null;function xt(n){if(typeof bt=="function"&&W(n),St&&typeof St.setStrictMode=="function")try{St.setStrictMode($,n)}catch{}}var Tt=Math.clz32?Math.clz32:Nt,ae=Math.log,At=Math.LN2;function Nt(n){return n>>>=0,n===0?32:31-(ae(n)/At|0)|0}var Xt=256,jt=4194304;function Dt(n){var a=n&42;if(a!==0)return a;switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return n&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return n}}function oe(n,a,o){var u=n.pendingLanes;if(u===0)return 0;var p=0,_=n.suspendedLanes,U=n.pingedLanes;n=n.warmLanes;var z=u&134217727;return z!==0?(u=z&~_,u!==0?p=Dt(u):(U&=z,U!==0?p=Dt(U):o||(o=z&~n,o!==0&&(p=Dt(o))))):(z=u&~_,z!==0?p=Dt(z):U!==0?p=Dt(U):o||(o=u&~n,o!==0&&(p=Dt(o)))),p===0?0:a!==0&&a!==p&&(a&_)===0&&(_=p&-p,o=a&-a,_>=o||_===32&&(o&4194048)!==0)?a:p}function Yt(n,a){return(n.pendingLanes&~(n.suspendedLanes&~n.pingedLanes)&a)===0}function Fe(n,a){switch(n){case 1:case 2:case 4:case 8:case 64:return a+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function et(){var n=Xt;return Xt<<=1,(Xt&4194048)===0&&(Xt=256),n}function zt(){var n=jt;return jt<<=1,(jt&62914560)===0&&(jt=4194304),n}function mt(n){for(var a=[],o=0;31>o;o++)a.push(n);return a}function Mt(n,a){n.pendingLanes|=a,a!==268435456&&(n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0)}function Bt(n,a,o,u,p,_){var U=n.pendingLanes;n.pendingLanes=o,n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0,n.expiredLanes&=o,n.entangledLanes&=o,n.errorRecoveryDisabledLanes&=o,n.shellSuspendCounter=0;var z=n.entanglements,G=n.expirationTimes,st=n.hiddenUpdates;for(o=U&~o;0<o;){var _t=31-Tt(o),Et=1<<_t;z[_t]=0,G[_t]=-1;var ut=st[_t];if(ut!==null)for(st[_t]=null,_t=0;_t<ut.length;_t++){var ct=ut[_t];ct!==null&&(ct.lane&=-536870913)}o&=~Et}u!==0&&It(n,u,0),_!==0&&p===0&&n.tag!==0&&(n.suspendedLanes|=_&~(U&~a))}function It(n,a,o){n.pendingLanes|=a,n.suspendedLanes&=~a;var u=31-Tt(a);n.entangledLanes|=a,n.entanglements[u]=n.entanglements[u]|1073741824|o&4194090}function le(n,a){var o=n.entangledLanes|=a;for(n=n.entanglements;o;){var u=31-Tt(o),p=1<<u;p&a|n[u]&a&&(n[u]|=a),o&=~p}}function je(n){switch(n){case 2:n=1;break;case 8:n=4;break;case 32:n=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:n=128;break;case 268435456:n=134217728;break;default:n=0}return n}function cn(n){return n&=-n,2<n?8<n?(n&134217727)!==0?32:268435456:8:2}function Ae(){var n=Z.p;return n!==0?n:(n=window.event,n===void 0?32:cv(n.type))}function ii(n,a){var o=Z.p;try{return Z.p=n,a()}finally{Z.p=o}}var En=Math.random().toString(36).slice(2),gn="__reactFiber$"+En,Ln="__reactProps$"+En,Yn="__reactContainer$"+En,va="__reactEvents$"+En,Cl="__reactListeners$"+En,Dl="__reactHandles$"+En,ya="__reactResources$"+En,Lr="__reactMarker$"+En;function Ur(n){delete n[gn],delete n[Ln],delete n[va],delete n[Cl],delete n[Dl]}function tr(n){var a=n[gn];if(a)return a;for(var o=n.parentNode;o;){if(a=o[Yn]||o[gn]){if(o=a.alternate,a.child!==null||o!==null&&o.child!==null)for(n=Z_(n);n!==null;){if(o=n[gn])return o;n=Z_(n)}return a}n=o,o=n.parentNode}return null}function er(n){if(n=n[gn]||n[Yn]){var a=n.tag;if(a===5||a===6||a===13||a===26||a===27||a===3)return n}return null}function xa(n){var a=n.tag;if(a===5||a===26||a===27||a===6)return n.stateNode;throw Error(r(33))}function Nr(n){var a=n[ya];return a||(a=n[ya]={hoistableStyles:new Map,hoistableScripts:new Map}),a}function fn(n){n[Lr]=!0}var Ll=new Set,Ul={};function nr(n,a){F(n,a),F(n+"Capture",a)}function F(n,a){for(Ul[n]=a,n=0;n<a.length;n++)Ll.add(a[n])}var it=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ht={},dt={};function rt(n){return Oe.call(dt,n)?!0:Oe.call(ht,n)?!1:it.test(n)?dt[n]=!0:(ht[n]=!0,!1)}function Rt(n,a,o){if(rt(a))if(o===null)n.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":n.removeAttribute(a);return;case"boolean":var u=a.toLowerCase().slice(0,5);if(u!=="data-"&&u!=="aria-"){n.removeAttribute(a);return}}n.setAttribute(a,""+o)}}function Ut(n,a,o){if(o===null)n.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":n.removeAttribute(a);return}n.setAttribute(a,""+o)}}function Pt(n,a,o,u){if(u===null)n.removeAttribute(o);else{switch(typeof u){case"undefined":case"function":case"symbol":case"boolean":n.removeAttribute(o);return}n.setAttributeNS(a,o,""+u)}}var kt,ee;function Qt(n){if(kt===void 0)try{throw Error()}catch(o){var a=o.stack.trim().match(/\n( *(at )?)/);kt=a&&a[1]||"",ee=-1<o.stack.indexOf(`
    at`)?" (<anonymous>)":-1<o.stack.indexOf("@")?"@unknown:0:0":""}return`
`+kt+n+ee}var Zt=!1;function ve(n,a){if(!n||Zt)return"";Zt=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var u={DetermineComponentFrameRoot:function(){try{if(a){var Et=function(){throw Error()};if(Object.defineProperty(Et.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Et,[])}catch(ct){var ut=ct}Reflect.construct(n,[],Et)}else{try{Et.call()}catch(ct){ut=ct}n.call(Et.prototype)}}else{try{throw Error()}catch(ct){ut=ct}(Et=n())&&typeof Et.catch=="function"&&Et.catch(function(){})}}catch(ct){if(ct&&ut&&typeof ct.stack=="string")return[ct.stack,ut.stack]}return[null,null]}};u.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var p=Object.getOwnPropertyDescriptor(u.DetermineComponentFrameRoot,"name");p&&p.configurable&&Object.defineProperty(u.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var _=u.DetermineComponentFrameRoot(),U=_[0],z=_[1];if(U&&z){var G=U.split(`
`),st=z.split(`
`);for(p=u=0;u<G.length&&!G[u].includes("DetermineComponentFrameRoot");)u++;for(;p<st.length&&!st[p].includes("DetermineComponentFrameRoot");)p++;if(u===G.length||p===st.length)for(u=G.length-1,p=st.length-1;1<=u&&0<=p&&G[u]!==st[p];)p--;for(;1<=u&&0<=p;u--,p--)if(G[u]!==st[p]){if(u!==1||p!==1)do if(u--,p--,0>p||G[u]!==st[p]){var _t=`
`+G[u].replace(" at new "," at ");return n.displayName&&_t.includes("<anonymous>")&&(_t=_t.replace("<anonymous>",n.displayName)),_t}while(1<=u&&0<=p);break}}}finally{Zt=!1,Error.prepareStackTrace=o}return(o=n?n.displayName||n.name:"")?Qt(o):""}function Re(n){switch(n.tag){case 26:case 27:case 5:return Qt(n.type);case 16:return Qt("Lazy");case 13:return Qt("Suspense");case 19:return Qt("SuspenseList");case 0:case 15:return ve(n.type,!1);case 11:return ve(n.type.render,!1);case 1:return ve(n.type,!0);case 31:return Qt("Activity");default:return""}}function $e(n){try{var a="";do a+=Re(n),n=n.return;while(n);return a}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}function Me(n){switch(typeof n){case"bigint":case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Ee(n){var a=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(a==="checkbox"||a==="radio")}function Jt(n){var a=Ee(n)?"checked":"value",o=Object.getOwnPropertyDescriptor(n.constructor.prototype,a),u=""+n[a];if(!n.hasOwnProperty(a)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var p=o.get,_=o.set;return Object.defineProperty(n,a,{configurable:!0,get:function(){return p.call(this)},set:function(U){u=""+U,_.call(this,U)}}),Object.defineProperty(n,a,{enumerable:o.enumerable}),{getValue:function(){return u},setValue:function(U){u=""+U},stopTracking:function(){n._valueTracker=null,delete n[a]}}}}function nn(n){n._valueTracker||(n._valueTracker=Jt(n))}function Te(n){if(!n)return!1;var a=n._valueTracker;if(!a)return!0;var o=a.getValue(),u="";return n&&(u=Ee(n)?n.checked?"true":"false":n.value),n=u,n!==o?(a.setValue(n),!0):!1}function zn(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}var Pr=/[\n"\\]/g;function Ye(n){return n.replace(Pr,function(a){return"\\"+a.charCodeAt(0).toString(16)+" "})}function ir(n,a,o,u,p,_,U,z){n.name="",U!=null&&typeof U!="function"&&typeof U!="symbol"&&typeof U!="boolean"?n.type=U:n.removeAttribute("type"),a!=null?U==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+Me(a)):n.value!==""+Me(a)&&(n.value=""+Me(a)):U!=="submit"&&U!=="reset"||n.removeAttribute("value"),a!=null?In(n,U,Me(a)):o!=null?In(n,U,Me(o)):u!=null&&n.removeAttribute("value"),p==null&&_!=null&&(n.defaultChecked=!!_),p!=null&&(n.checked=p&&typeof p!="function"&&typeof p!="symbol"),z!=null&&typeof z!="function"&&typeof z!="symbol"&&typeof z!="boolean"?n.name=""+Me(z):n.removeAttribute("name")}function Xe(n,a,o,u,p,_,U,z){if(_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"&&(n.type=_),a!=null||o!=null){if(!(_!=="submit"&&_!=="reset"||a!=null))return;o=o!=null?""+Me(o):"",a=a!=null?""+Me(a):o,z||a===n.value||(n.value=a),n.defaultValue=a}u=u??p,u=typeof u!="function"&&typeof u!="symbol"&&!!u,n.checked=z?n.checked:!!u,n.defaultChecked=!!u,U!=null&&typeof U!="function"&&typeof U!="symbol"&&typeof U!="boolean"&&(n.name=U)}function In(n,a,o){a==="number"&&zn(n.ownerDocument)===n||n.defaultValue===""+o||(n.defaultValue=""+o)}function _n(n,a,o,u){if(n=n.options,a){a={};for(var p=0;p<o.length;p++)a["$"+o[p]]=!0;for(o=0;o<n.length;o++)p=a.hasOwnProperty("$"+n[o].value),n[o].selected!==p&&(n[o].selected=p),p&&u&&(n[o].defaultSelected=!0)}else{for(o=""+Me(o),a=null,p=0;p<n.length;p++){if(n[p].value===o){n[p].selected=!0,u&&(n[p].defaultSelected=!0);return}a!==null||n[p].disabled||(a=n[p])}a!==null&&(a.selected=!0)}}function bn(n,a,o){if(a!=null&&(a=""+Me(a),a!==n.value&&(n.value=a),o==null)){n.defaultValue!==a&&(n.defaultValue=a);return}n.defaultValue=o!=null?""+Me(o):""}function Un(n,a,o,u){if(a==null){if(u!=null){if(o!=null)throw Error(r(92));if(X(u)){if(1<u.length)throw Error(r(93));u=u[0]}o=u}o==null&&(o=""),a=o}o=Me(a),n.defaultValue=o,u=n.textContent,u===o&&u!==""&&u!==null&&(n.value=u)}function Fi(n,a){if(a){var o=n.firstChild;if(o&&o===n.lastChild&&o.nodeType===3){o.nodeValue=a;return}}n.textContent=a}var rr=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function qm(n,a,o){var u=a.indexOf("--")===0;o==null||typeof o=="boolean"||o===""?u?n.setProperty(a,""):a==="float"?n.cssFloat="":n[a]="":u?n.setProperty(a,o):typeof o!="number"||o===0||rr.has(a)?a==="float"?n.cssFloat=o:n[a]=(""+o).trim():n[a]=o+"px"}function Xm(n,a,o){if(a!=null&&typeof a!="object")throw Error(r(62));if(n=n.style,o!=null){for(var u in o)!o.hasOwnProperty(u)||a!=null&&a.hasOwnProperty(u)||(u.indexOf("--")===0?n.setProperty(u,""):u==="float"?n.cssFloat="":n[u]="");for(var p in a)u=a[p],a.hasOwnProperty(p)&&o[p]!==u&&qm(n,p,u)}else for(var _ in a)a.hasOwnProperty(_)&&qm(n,_,a[_])}function Hc(n){if(n.indexOf("-")===-1)return!1;switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var gM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),_M=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Nl(n){return _M.test(""+n)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":n}var Vc=null;function Gc(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var $a=null,ts=null;function Wm(n){var a=er(n);if(a&&(n=a.stateNode)){var o=n[Ln]||null;t:switch(n=a.stateNode,a.type){case"input":if(ir(n,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name),a=o.name,o.type==="radio"&&a!=null){for(o=n;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll('input[name="'+Ye(""+a)+'"][type="radio"]'),a=0;a<o.length;a++){var u=o[a];if(u!==n&&u.form===n.form){var p=u[Ln]||null;if(!p)throw Error(r(90));ir(u,p.value,p.defaultValue,p.defaultValue,p.checked,p.defaultChecked,p.type,p.name)}}for(a=0;a<o.length;a++)u=o[a],u.form===n.form&&Te(u)}break t;case"textarea":bn(n,o.value,o.defaultValue);break t;case"select":a=o.value,a!=null&&_n(n,!!o.multiple,a,!1)}}}var qc=!1;function jm(n,a,o){if(qc)return n(a,o);qc=!0;try{var u=n(a);return u}finally{if(qc=!1,($a!==null||ts!==null)&&(vu(),$a&&(a=$a,n=ts,ts=$a=null,Wm(a),n)))for(a=0;a<n.length;a++)Wm(n[a])}}function co(n,a){var o=n.stateNode;if(o===null)return null;var u=o[Ln]||null;if(u===null)return null;o=u[a];t:switch(a){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(n=n.type,u=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!u;break t;default:n=!1}if(n)return null;if(o&&typeof o!="function")throw Error(r(231,a,typeof o));return o}var ar=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Xc=!1;if(ar)try{var fo={};Object.defineProperty(fo,"passive",{get:function(){Xc=!0}}),window.addEventListener("test",fo,fo),window.removeEventListener("test",fo,fo)}catch{Xc=!1}var Or=null,Wc=null,Pl=null;function Ym(){if(Pl)return Pl;var n,a=Wc,o=a.length,u,p="value"in Or?Or.value:Or.textContent,_=p.length;for(n=0;n<o&&a[n]===p[n];n++);var U=o-n;for(u=1;u<=U&&a[o-u]===p[_-u];u++);return Pl=p.slice(n,1<u?1-u:void 0)}function Ol(n){var a=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&a===13&&(n=13)):n=a,n===10&&(n=13),32<=n||n===13?n:0}function zl(){return!0}function Zm(){return!1}function Zn(n){function a(o,u,p,_,U){this._reactName=o,this._targetInst=p,this.type=u,this.nativeEvent=_,this.target=U,this.currentTarget=null;for(var z in n)n.hasOwnProperty(z)&&(o=n[z],this[z]=o?o(_):_[z]);return this.isDefaultPrevented=(_.defaultPrevented!=null?_.defaultPrevented:_.returnValue===!1)?zl:Zm,this.isPropagationStopped=Zm,this}return m(a.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=zl)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=zl)},persist:function(){},isPersistent:zl}),a}var Sa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Il=Zn(Sa),ho=m({},Sa,{view:0,detail:0}),vM=Zn(ho),jc,Yc,po,Fl=m({},ho,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==po&&(po&&n.type==="mousemove"?(jc=n.screenX-po.screenX,Yc=n.screenY-po.screenY):Yc=jc=0,po=n),jc)},movementY:function(n){return"movementY"in n?n.movementY:Yc}}),Km=Zn(Fl),yM=m({},Fl,{dataTransfer:0}),xM=Zn(yM),SM=m({},ho,{relatedTarget:0}),Zc=Zn(SM),MM=m({},Sa,{animationName:0,elapsedTime:0,pseudoElement:0}),EM=Zn(MM),bM=m({},Sa,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),TM=Zn(bM),AM=m({},Sa,{data:0}),Qm=Zn(AM),RM={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},wM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},CM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function DM(n){var a=this.nativeEvent;return a.getModifierState?a.getModifierState(n):(n=CM[n])?!!a[n]:!1}function Kc(){return DM}var LM=m({},ho,{key:function(n){if(n.key){var a=RM[n.key]||n.key;if(a!=="Unidentified")return a}return n.type==="keypress"?(n=Ol(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?wM[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kc,charCode:function(n){return n.type==="keypress"?Ol(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Ol(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),UM=Zn(LM),NM=m({},Fl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Jm=Zn(NM),PM=m({},ho,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kc}),OM=Zn(PM),zM=m({},Sa,{propertyName:0,elapsedTime:0,pseudoElement:0}),IM=Zn(zM),FM=m({},Fl,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),BM=Zn(FM),kM=m({},Sa,{newState:0,oldState:0}),HM=Zn(kM),VM=[9,13,27,32],Qc=ar&&"CompositionEvent"in window,mo=null;ar&&"documentMode"in document&&(mo=document.documentMode);var GM=ar&&"TextEvent"in window&&!mo,$m=ar&&(!Qc||mo&&8<mo&&11>=mo),tg=" ",eg=!1;function ng(n,a){switch(n){case"keyup":return VM.indexOf(a.keyCode)!==-1;case"keydown":return a.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ig(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var es=!1;function qM(n,a){switch(n){case"compositionend":return ig(a);case"keypress":return a.which!==32?null:(eg=!0,tg);case"textInput":return n=a.data,n===tg&&eg?null:n;default:return null}}function XM(n,a){if(es)return n==="compositionend"||!Qc&&ng(n,a)?(n=Ym(),Pl=Wc=Or=null,es=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(a.ctrlKey||a.altKey||a.metaKey)||a.ctrlKey&&a.altKey){if(a.char&&1<a.char.length)return a.char;if(a.which)return String.fromCharCode(a.which)}return null;case"compositionend":return $m&&a.locale!=="ko"?null:a.data;default:return null}}var WM={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rg(n){var a=n&&n.nodeName&&n.nodeName.toLowerCase();return a==="input"?!!WM[n.type]:a==="textarea"}function ag(n,a,o,u){$a?ts?ts.push(u):ts=[u]:$a=u,a=bu(a,"onChange"),0<a.length&&(o=new Il("onChange","change",null,o,u),n.push({event:o,listeners:a}))}var go=null,_o=null;function jM(n){B_(n,0)}function Bl(n){var a=xa(n);if(Te(a))return n}function sg(n,a){if(n==="change")return a}var og=!1;if(ar){var Jc;if(ar){var $c="oninput"in document;if(!$c){var lg=document.createElement("div");lg.setAttribute("oninput","return;"),$c=typeof lg.oninput=="function"}Jc=$c}else Jc=!1;og=Jc&&(!document.documentMode||9<document.documentMode)}function ug(){go&&(go.detachEvent("onpropertychange",cg),_o=go=null)}function cg(n){if(n.propertyName==="value"&&Bl(_o)){var a=[];ag(a,_o,n,Gc(n)),jm(jM,a)}}function YM(n,a,o){n==="focusin"?(ug(),go=a,_o=o,go.attachEvent("onpropertychange",cg)):n==="focusout"&&ug()}function ZM(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Bl(_o)}function KM(n,a){if(n==="click")return Bl(a)}function QM(n,a){if(n==="input"||n==="change")return Bl(a)}function JM(n,a){return n===a&&(n!==0||1/n===1/a)||n!==n&&a!==a}var ri=typeof Object.is=="function"?Object.is:JM;function vo(n,a){if(ri(n,a))return!0;if(typeof n!="object"||n===null||typeof a!="object"||a===null)return!1;var o=Object.keys(n),u=Object.keys(a);if(o.length!==u.length)return!1;for(u=0;u<o.length;u++){var p=o[u];if(!Oe.call(a,p)||!ri(n[p],a[p]))return!1}return!0}function fg(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function hg(n,a){var o=fg(n);n=0;for(var u;o;){if(o.nodeType===3){if(u=n+o.textContent.length,n<=a&&u>=a)return{node:o,offset:a-n};n=u}t:{for(;o;){if(o.nextSibling){o=o.nextSibling;break t}o=o.parentNode}o=void 0}o=fg(o)}}function dg(n,a){return n&&a?n===a?!0:n&&n.nodeType===3?!1:a&&a.nodeType===3?dg(n,a.parentNode):"contains"in n?n.contains(a):n.compareDocumentPosition?!!(n.compareDocumentPosition(a)&16):!1:!1}function pg(n){n=n!=null&&n.ownerDocument!=null&&n.ownerDocument.defaultView!=null?n.ownerDocument.defaultView:window;for(var a=zn(n.document);a instanceof n.HTMLIFrameElement;){try{var o=typeof a.contentWindow.location.href=="string"}catch{o=!1}if(o)n=a.contentWindow;else break;a=zn(n.document)}return a}function tf(n){var a=n&&n.nodeName&&n.nodeName.toLowerCase();return a&&(a==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||a==="textarea"||n.contentEditable==="true")}var $M=ar&&"documentMode"in document&&11>=document.documentMode,ns=null,ef=null,yo=null,nf=!1;function mg(n,a,o){var u=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;nf||ns==null||ns!==zn(u)||(u=ns,"selectionStart"in u&&tf(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),yo&&vo(yo,u)||(yo=u,u=bu(ef,"onSelect"),0<u.length&&(a=new Il("onSelect","select",null,a,o),n.push({event:a,listeners:u}),a.target=ns)))}function Ma(n,a){var o={};return o[n.toLowerCase()]=a.toLowerCase(),o["Webkit"+n]="webkit"+a,o["Moz"+n]="moz"+a,o}var is={animationend:Ma("Animation","AnimationEnd"),animationiteration:Ma("Animation","AnimationIteration"),animationstart:Ma("Animation","AnimationStart"),transitionrun:Ma("Transition","TransitionRun"),transitionstart:Ma("Transition","TransitionStart"),transitioncancel:Ma("Transition","TransitionCancel"),transitionend:Ma("Transition","TransitionEnd")},rf={},gg={};ar&&(gg=document.createElement("div").style,"AnimationEvent"in window||(delete is.animationend.animation,delete is.animationiteration.animation,delete is.animationstart.animation),"TransitionEvent"in window||delete is.transitionend.transition);function Ea(n){if(rf[n])return rf[n];if(!is[n])return n;var a=is[n],o;for(o in a)if(a.hasOwnProperty(o)&&o in gg)return rf[n]=a[o];return n}var _g=Ea("animationend"),vg=Ea("animationiteration"),yg=Ea("animationstart"),tE=Ea("transitionrun"),eE=Ea("transitionstart"),nE=Ea("transitioncancel"),xg=Ea("transitionend"),Sg=new Map,af="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");af.push("scrollEnd");function Ci(n,a){Sg.set(n,a),nr(a,[n])}var Mg=new WeakMap;function _i(n,a){if(typeof n=="object"&&n!==null){var o=Mg.get(n);return o!==void 0?o:(a={value:n,source:a,stack:$e(a)},Mg.set(n,a),a)}return{value:n,source:a,stack:$e(a)}}var vi=[],rs=0,sf=0;function kl(){for(var n=rs,a=sf=rs=0;a<n;){var o=vi[a];vi[a++]=null;var u=vi[a];vi[a++]=null;var p=vi[a];vi[a++]=null;var _=vi[a];if(vi[a++]=null,u!==null&&p!==null){var U=u.pending;U===null?p.next=p:(p.next=U.next,U.next=p),u.pending=p}_!==0&&Eg(o,p,_)}}function Hl(n,a,o,u){vi[rs++]=n,vi[rs++]=a,vi[rs++]=o,vi[rs++]=u,sf|=u,n.lanes|=u,n=n.alternate,n!==null&&(n.lanes|=u)}function of(n,a,o,u){return Hl(n,a,o,u),Vl(n)}function as(n,a){return Hl(n,null,null,a),Vl(n)}function Eg(n,a,o){n.lanes|=o;var u=n.alternate;u!==null&&(u.lanes|=o);for(var p=!1,_=n.return;_!==null;)_.childLanes|=o,u=_.alternate,u!==null&&(u.childLanes|=o),_.tag===22&&(n=_.stateNode,n===null||n._visibility&1||(p=!0)),n=_,_=_.return;return n.tag===3?(_=n.stateNode,p&&a!==null&&(p=31-Tt(o),n=_.hiddenUpdates,u=n[p],u===null?n[p]=[a]:u.push(a),a.lane=o|536870912),_):null}function Vl(n){if(50<qo)throw qo=0,dh=null,Error(r(185));for(var a=n.return;a!==null;)n=a,a=n.return;return n.tag===3?n.stateNode:null}var ss={};function iE(n,a,o,u){this.tag=n,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=a,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ai(n,a,o,u){return new iE(n,a,o,u)}function lf(n){return n=n.prototype,!(!n||!n.isReactComponent)}function sr(n,a){var o=n.alternate;return o===null?(o=ai(n.tag,a,n.key,n.mode),o.elementType=n.elementType,o.type=n.type,o.stateNode=n.stateNode,o.alternate=n,n.alternate=o):(o.pendingProps=a,o.type=n.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=n.flags&65011712,o.childLanes=n.childLanes,o.lanes=n.lanes,o.child=n.child,o.memoizedProps=n.memoizedProps,o.memoizedState=n.memoizedState,o.updateQueue=n.updateQueue,a=n.dependencies,o.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},o.sibling=n.sibling,o.index=n.index,o.ref=n.ref,o.refCleanup=n.refCleanup,o}function bg(n,a){n.flags&=65011714;var o=n.alternate;return o===null?(n.childLanes=0,n.lanes=a,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=o.childLanes,n.lanes=o.lanes,n.child=o.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=o.memoizedProps,n.memoizedState=o.memoizedState,n.updateQueue=o.updateQueue,n.type=o.type,a=o.dependencies,n.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext}),n}function Gl(n,a,o,u,p,_){var U=0;if(u=n,typeof n=="function")lf(n)&&(U=1);else if(typeof n=="string")U=a1(n,o,tt.current)?26:n==="html"||n==="head"||n==="body"?27:5;else t:switch(n){case C:return n=ai(31,o,a,p),n.elementType=C,n.lanes=_,n;case b:return ba(o.children,p,_,a);case R:U=8,p|=24;break;case M:return n=ai(12,o,a,p|2),n.elementType=M,n.lanes=_,n;case A:return n=ai(13,o,a,p),n.elementType=A,n.lanes=_,n;case L:return n=ai(19,o,a,p),n.elementType=L,n.lanes=_,n;default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case x:case S:U=10;break t;case D:U=9;break t;case E:U=11;break t;case P:U=14;break t;case O:U=16,u=null;break t}U=29,o=Error(r(130,n===null?"null":typeof n,"")),u=null}return a=ai(U,o,a,p),a.elementType=n,a.type=u,a.lanes=_,a}function ba(n,a,o,u){return n=ai(7,n,u,a),n.lanes=o,n}function uf(n,a,o){return n=ai(6,n,null,a),n.lanes=o,n}function cf(n,a,o){return a=ai(4,n.children!==null?n.children:[],n.key,a),a.lanes=o,a.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},a}var os=[],ls=0,ql=null,Xl=0,yi=[],xi=0,Ta=null,or=1,lr="";function Aa(n,a){os[ls++]=Xl,os[ls++]=ql,ql=n,Xl=a}function Tg(n,a,o){yi[xi++]=or,yi[xi++]=lr,yi[xi++]=Ta,Ta=n;var u=or;n=lr;var p=32-Tt(u)-1;u&=~(1<<p),o+=1;var _=32-Tt(a)+p;if(30<_){var U=p-p%5;_=(u&(1<<U)-1).toString(32),u>>=U,p-=U,or=1<<32-Tt(a)+p|o<<p|u,lr=_+n}else or=1<<_|o<<p|u,lr=n}function ff(n){n.return!==null&&(Aa(n,1),Tg(n,1,0))}function hf(n){for(;n===ql;)ql=os[--ls],os[ls]=null,Xl=os[--ls],os[ls]=null;for(;n===Ta;)Ta=yi[--xi],yi[xi]=null,lr=yi[--xi],yi[xi]=null,or=yi[--xi],yi[xi]=null}var Gn=null,rn=null,Ue=!1,Ra=null,Bi=!1,df=Error(r(519));function wa(n){var a=Error(r(418,""));throw Mo(_i(a,n)),df}function Ag(n){var a=n.stateNode,o=n.type,u=n.memoizedProps;switch(a[gn]=n,a[Ln]=u,o){case"dialog":xe("cancel",a),xe("close",a);break;case"iframe":case"object":case"embed":xe("load",a);break;case"video":case"audio":for(o=0;o<Wo.length;o++)xe(Wo[o],a);break;case"source":xe("error",a);break;case"img":case"image":case"link":xe("error",a),xe("load",a);break;case"details":xe("toggle",a);break;case"input":xe("invalid",a),Xe(a,u.value,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name,!0),nn(a);break;case"select":xe("invalid",a);break;case"textarea":xe("invalid",a),Un(a,u.value,u.defaultValue,u.children),nn(a)}o=u.children,typeof o!="string"&&typeof o!="number"&&typeof o!="bigint"||a.textContent===""+o||u.suppressHydrationWarning===!0||G_(a.textContent,o)?(u.popover!=null&&(xe("beforetoggle",a),xe("toggle",a)),u.onScroll!=null&&xe("scroll",a),u.onScrollEnd!=null&&xe("scrollend",a),u.onClick!=null&&(a.onclick=Tu),a=!0):a=!1,a||wa(n)}function Rg(n){for(Gn=n.return;Gn;)switch(Gn.tag){case 5:case 13:Bi=!1;return;case 27:case 3:Bi=!0;return;default:Gn=Gn.return}}function xo(n){if(n!==Gn)return!1;if(!Ue)return Rg(n),Ue=!0,!1;var a=n.tag,o;if((o=a!==3&&a!==27)&&((o=a===5)&&(o=n.type,o=!(o!=="form"&&o!=="button")||Ch(n.type,n.memoizedProps)),o=!o),o&&rn&&wa(n),Rg(n),a===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(r(317));t:{for(n=n.nextSibling,a=0;n;){if(n.nodeType===8)if(o=n.data,o==="/$"){if(a===0){rn=Li(n.nextSibling);break t}a--}else o!=="$"&&o!=="$!"&&o!=="$?"||a++;n=n.nextSibling}rn=null}}else a===27?(a=rn,Qr(n.type)?(n=Nh,Nh=null,rn=n):rn=a):rn=Gn?Li(n.stateNode.nextSibling):null;return!0}function So(){rn=Gn=null,Ue=!1}function wg(){var n=Ra;return n!==null&&(Jn===null?Jn=n:Jn.push.apply(Jn,n),Ra=null),n}function Mo(n){Ra===null?Ra=[n]:Ra.push(n)}var pf=Y(null),Ca=null,ur=null;function zr(n,a,o){B(pf,a._currentValue),a._currentValue=o}function cr(n){n._currentValue=pf.current,ft(pf)}function mf(n,a,o){for(;n!==null;){var u=n.alternate;if((n.childLanes&a)!==a?(n.childLanes|=a,u!==null&&(u.childLanes|=a)):u!==null&&(u.childLanes&a)!==a&&(u.childLanes|=a),n===o)break;n=n.return}}function gf(n,a,o,u){var p=n.child;for(p!==null&&(p.return=n);p!==null;){var _=p.dependencies;if(_!==null){var U=p.child;_=_.firstContext;t:for(;_!==null;){var z=_;_=p;for(var G=0;G<a.length;G++)if(z.context===a[G]){_.lanes|=o,z=_.alternate,z!==null&&(z.lanes|=o),mf(_.return,o,n),u||(U=null);break t}_=z.next}}else if(p.tag===18){if(U=p.return,U===null)throw Error(r(341));U.lanes|=o,_=U.alternate,_!==null&&(_.lanes|=o),mf(U,o,n),U=null}else U=p.child;if(U!==null)U.return=p;else for(U=p;U!==null;){if(U===n){U=null;break}if(p=U.sibling,p!==null){p.return=U.return,U=p;break}U=U.return}p=U}}function Eo(n,a,o,u){n=null;for(var p=a,_=!1;p!==null;){if(!_){if((p.flags&524288)!==0)_=!0;else if((p.flags&262144)!==0)break}if(p.tag===10){var U=p.alternate;if(U===null)throw Error(r(387));if(U=U.memoizedProps,U!==null){var z=p.type;ri(p.pendingProps.value,U.value)||(n!==null?n.push(z):n=[z])}}else if(p===wt.current){if(U=p.alternate,U===null)throw Error(r(387));U.memoizedState.memoizedState!==p.memoizedState.memoizedState&&(n!==null?n.push(Jo):n=[Jo])}p=p.return}n!==null&&gf(a,n,o,u),a.flags|=262144}function Wl(n){for(n=n.firstContext;n!==null;){if(!ri(n.context._currentValue,n.memoizedValue))return!0;n=n.next}return!1}function Da(n){Ca=n,ur=null,n=n.dependencies,n!==null&&(n.firstContext=null)}function Fn(n){return Cg(Ca,n)}function jl(n,a){return Ca===null&&Da(n),Cg(n,a)}function Cg(n,a){var o=a._currentValue;if(a={context:a,memoizedValue:o,next:null},ur===null){if(n===null)throw Error(r(308));ur=a,n.dependencies={lanes:0,firstContext:a},n.flags|=524288}else ur=ur.next=a;return o}var rE=typeof AbortController<"u"?AbortController:function(){var n=[],a=this.signal={aborted:!1,addEventListener:function(o,u){n.push(u)}};this.abort=function(){a.aborted=!0,n.forEach(function(o){return o()})}},aE=i.unstable_scheduleCallback,sE=i.unstable_NormalPriority,vn={$$typeof:S,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function _f(){return{controller:new rE,data:new Map,refCount:0}}function bo(n){n.refCount--,n.refCount===0&&aE(sE,function(){n.controller.abort()})}var To=null,vf=0,us=0,cs=null;function oE(n,a){if(To===null){var o=To=[];vf=0,us=xh(),cs={status:"pending",value:void 0,then:function(u){o.push(u)}}}return vf++,a.then(Dg,Dg),a}function Dg(){if(--vf===0&&To!==null){cs!==null&&(cs.status="fulfilled");var n=To;To=null,us=0,cs=null;for(var a=0;a<n.length;a++)(0,n[a])()}}function lE(n,a){var o=[],u={status:"pending",value:null,reason:null,then:function(p){o.push(p)}};return n.then(function(){u.status="fulfilled",u.value=a;for(var p=0;p<o.length;p++)(0,o[p])(a)},function(p){for(u.status="rejected",u.reason=p,p=0;p<o.length;p++)(0,o[p])(void 0)}),u}var Lg=H.S;H.S=function(n,a){typeof a=="object"&&a!==null&&typeof a.then=="function"&&oE(n,a),Lg!==null&&Lg(n,a)};var La=Y(null);function yf(){var n=La.current;return n!==null?n:Ze.pooledCache}function Yl(n,a){a===null?B(La,La.current):B(La,a.pool)}function Ug(){var n=yf();return n===null?null:{parent:vn._currentValue,pool:n}}var Ao=Error(r(460)),Ng=Error(r(474)),Zl=Error(r(542)),xf={then:function(){}};function Pg(n){return n=n.status,n==="fulfilled"||n==="rejected"}function Kl(){}function Og(n,a,o){switch(o=n[o],o===void 0?n.push(a):o!==a&&(a.then(Kl,Kl),a=o),a.status){case"fulfilled":return a.value;case"rejected":throw n=a.reason,Ig(n),n;default:if(typeof a.status=="string")a.then(Kl,Kl);else{if(n=Ze,n!==null&&100<n.shellSuspendCounter)throw Error(r(482));n=a,n.status="pending",n.then(function(u){if(a.status==="pending"){var p=a;p.status="fulfilled",p.value=u}},function(u){if(a.status==="pending"){var p=a;p.status="rejected",p.reason=u}})}switch(a.status){case"fulfilled":return a.value;case"rejected":throw n=a.reason,Ig(n),n}throw Ro=a,Ao}}var Ro=null;function zg(){if(Ro===null)throw Error(r(459));var n=Ro;return Ro=null,n}function Ig(n){if(n===Ao||n===Zl)throw Error(r(483))}var Ir=!1;function Sf(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Mf(n,a){n=n.updateQueue,a.updateQueue===n&&(a.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,callbacks:null})}function Fr(n){return{lane:n,tag:0,payload:null,callback:null,next:null}}function Br(n,a,o){var u=n.updateQueue;if(u===null)return null;if(u=u.shared,(ze&2)!==0){var p=u.pending;return p===null?a.next=a:(a.next=p.next,p.next=a),u.pending=a,a=Vl(n),Eg(n,null,o),a}return Hl(n,u,a,o),Vl(n)}function wo(n,a,o){if(a=a.updateQueue,a!==null&&(a=a.shared,(o&4194048)!==0)){var u=a.lanes;u&=n.pendingLanes,o|=u,a.lanes=o,le(n,o)}}function Ef(n,a){var o=n.updateQueue,u=n.alternate;if(u!==null&&(u=u.updateQueue,o===u)){var p=null,_=null;if(o=o.firstBaseUpdate,o!==null){do{var U={lane:o.lane,tag:o.tag,payload:o.payload,callback:null,next:null};_===null?p=_=U:_=_.next=U,o=o.next}while(o!==null);_===null?p=_=a:_=_.next=a}else p=_=a;o={baseState:u.baseState,firstBaseUpdate:p,lastBaseUpdate:_,shared:u.shared,callbacks:u.callbacks},n.updateQueue=o;return}n=o.lastBaseUpdate,n===null?o.firstBaseUpdate=a:n.next=a,o.lastBaseUpdate=a}var bf=!1;function Co(){if(bf){var n=cs;if(n!==null)throw n}}function Do(n,a,o,u){bf=!1;var p=n.updateQueue;Ir=!1;var _=p.firstBaseUpdate,U=p.lastBaseUpdate,z=p.shared.pending;if(z!==null){p.shared.pending=null;var G=z,st=G.next;G.next=null,U===null?_=st:U.next=st,U=G;var _t=n.alternate;_t!==null&&(_t=_t.updateQueue,z=_t.lastBaseUpdate,z!==U&&(z===null?_t.firstBaseUpdate=st:z.next=st,_t.lastBaseUpdate=G))}if(_!==null){var Et=p.baseState;U=0,_t=st=G=null,z=_;do{var ut=z.lane&-536870913,ct=ut!==z.lane;if(ct?(be&ut)===ut:(u&ut)===ut){ut!==0&&ut===us&&(bf=!0),_t!==null&&(_t=_t.next={lane:0,tag:z.tag,payload:z.payload,callback:null,next:null});t:{var ne=n,$t=z;ut=a;var He=o;switch($t.tag){case 1:if(ne=$t.payload,typeof ne=="function"){Et=ne.call(He,Et,ut);break t}Et=ne;break t;case 3:ne.flags=ne.flags&-65537|128;case 0:if(ne=$t.payload,ut=typeof ne=="function"?ne.call(He,Et,ut):ne,ut==null)break t;Et=m({},Et,ut);break t;case 2:Ir=!0}}ut=z.callback,ut!==null&&(n.flags|=64,ct&&(n.flags|=8192),ct=p.callbacks,ct===null?p.callbacks=[ut]:ct.push(ut))}else ct={lane:ut,tag:z.tag,payload:z.payload,callback:z.callback,next:null},_t===null?(st=_t=ct,G=Et):_t=_t.next=ct,U|=ut;if(z=z.next,z===null){if(z=p.shared.pending,z===null)break;ct=z,z=ct.next,ct.next=null,p.lastBaseUpdate=ct,p.shared.pending=null}}while(!0);_t===null&&(G=Et),p.baseState=G,p.firstBaseUpdate=st,p.lastBaseUpdate=_t,_===null&&(p.shared.lanes=0),jr|=U,n.lanes=U,n.memoizedState=Et}}function Fg(n,a){if(typeof n!="function")throw Error(r(191,n));n.call(a)}function Bg(n,a){var o=n.callbacks;if(o!==null)for(n.callbacks=null,n=0;n<o.length;n++)Fg(o[n],a)}var fs=Y(null),Ql=Y(0);function kg(n,a){n=_r,B(Ql,n),B(fs,a),_r=n|a.baseLanes}function Tf(){B(Ql,_r),B(fs,fs.current)}function Af(){_r=Ql.current,ft(fs),ft(Ql)}var kr=0,pe=null,Be=null,hn=null,Jl=!1,hs=!1,Ua=!1,$l=0,Lo=0,ds=null,uE=0;function sn(){throw Error(r(321))}function Rf(n,a){if(a===null)return!1;for(var o=0;o<a.length&&o<n.length;o++)if(!ri(n[o],a[o]))return!1;return!0}function wf(n,a,o,u,p,_){return kr=_,pe=a,a.memoizedState=null,a.updateQueue=null,a.lanes=0,H.H=n===null||n.memoizedState===null?E0:b0,Ua=!1,_=o(u,p),Ua=!1,hs&&(_=Vg(a,o,u,p)),Hg(n),_}function Hg(n){H.H=au;var a=Be!==null&&Be.next!==null;if(kr=0,hn=Be=pe=null,Jl=!1,Lo=0,ds=null,a)throw Error(r(300));n===null||Tn||(n=n.dependencies,n!==null&&Wl(n)&&(Tn=!0))}function Vg(n,a,o,u){pe=n;var p=0;do{if(hs&&(ds=null),Lo=0,hs=!1,25<=p)throw Error(r(301));if(p+=1,hn=Be=null,n.updateQueue!=null){var _=n.updateQueue;_.lastEffect=null,_.events=null,_.stores=null,_.memoCache!=null&&(_.memoCache.index=0)}H.H=gE,_=a(o,u)}while(hs);return _}function cE(){var n=H.H,a=n.useState()[0];return a=typeof a.then=="function"?Uo(a):a,n=n.useState()[0],(Be!==null?Be.memoizedState:null)!==n&&(pe.flags|=1024),a}function Cf(){var n=$l!==0;return $l=0,n}function Df(n,a,o){a.updateQueue=n.updateQueue,a.flags&=-2053,n.lanes&=~o}function Lf(n){if(Jl){for(n=n.memoizedState;n!==null;){var a=n.queue;a!==null&&(a.pending=null),n=n.next}Jl=!1}kr=0,hn=Be=pe=null,hs=!1,Lo=$l=0,ds=null}function Kn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return hn===null?pe.memoizedState=hn=n:hn=hn.next=n,hn}function dn(){if(Be===null){var n=pe.alternate;n=n!==null?n.memoizedState:null}else n=Be.next;var a=hn===null?pe.memoizedState:hn.next;if(a!==null)hn=a,Be=n;else{if(n===null)throw pe.alternate===null?Error(r(467)):Error(r(310));Be=n,n={memoizedState:Be.memoizedState,baseState:Be.baseState,baseQueue:Be.baseQueue,queue:Be.queue,next:null},hn===null?pe.memoizedState=hn=n:hn=hn.next=n}return hn}function Uf(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Uo(n){var a=Lo;return Lo+=1,ds===null&&(ds=[]),n=Og(ds,n,a),a=pe,(hn===null?a.memoizedState:hn.next)===null&&(a=a.alternate,H.H=a===null||a.memoizedState===null?E0:b0),n}function tu(n){if(n!==null&&typeof n=="object"){if(typeof n.then=="function")return Uo(n);if(n.$$typeof===S)return Fn(n)}throw Error(r(438,String(n)))}function Nf(n){var a=null,o=pe.updateQueue;if(o!==null&&(a=o.memoCache),a==null){var u=pe.alternate;u!==null&&(u=u.updateQueue,u!==null&&(u=u.memoCache,u!=null&&(a={data:u.data.map(function(p){return p.slice()}),index:0})))}if(a==null&&(a={data:[],index:0}),o===null&&(o=Uf(),pe.updateQueue=o),o.memoCache=a,o=a.data[a.index],o===void 0)for(o=a.data[a.index]=Array(n),u=0;u<n;u++)o[u]=T;return a.index++,o}function fr(n,a){return typeof a=="function"?a(n):a}function eu(n){var a=dn();return Pf(a,Be,n)}function Pf(n,a,o){var u=n.queue;if(u===null)throw Error(r(311));u.lastRenderedReducer=o;var p=n.baseQueue,_=u.pending;if(_!==null){if(p!==null){var U=p.next;p.next=_.next,_.next=U}a.baseQueue=p=_,u.pending=null}if(_=n.baseState,p===null)n.memoizedState=_;else{a=p.next;var z=U=null,G=null,st=a,_t=!1;do{var Et=st.lane&-536870913;if(Et!==st.lane?(be&Et)===Et:(kr&Et)===Et){var ut=st.revertLane;if(ut===0)G!==null&&(G=G.next={lane:0,revertLane:0,action:st.action,hasEagerState:st.hasEagerState,eagerState:st.eagerState,next:null}),Et===us&&(_t=!0);else if((kr&ut)===ut){st=st.next,ut===us&&(_t=!0);continue}else Et={lane:0,revertLane:st.revertLane,action:st.action,hasEagerState:st.hasEagerState,eagerState:st.eagerState,next:null},G===null?(z=G=Et,U=_):G=G.next=Et,pe.lanes|=ut,jr|=ut;Et=st.action,Ua&&o(_,Et),_=st.hasEagerState?st.eagerState:o(_,Et)}else ut={lane:Et,revertLane:st.revertLane,action:st.action,hasEagerState:st.hasEagerState,eagerState:st.eagerState,next:null},G===null?(z=G=ut,U=_):G=G.next=ut,pe.lanes|=Et,jr|=Et;st=st.next}while(st!==null&&st!==a);if(G===null?U=_:G.next=z,!ri(_,n.memoizedState)&&(Tn=!0,_t&&(o=cs,o!==null)))throw o;n.memoizedState=_,n.baseState=U,n.baseQueue=G,u.lastRenderedState=_}return p===null&&(u.lanes=0),[n.memoizedState,u.dispatch]}function Of(n){var a=dn(),o=a.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=n;var u=o.dispatch,p=o.pending,_=a.memoizedState;if(p!==null){o.pending=null;var U=p=p.next;do _=n(_,U.action),U=U.next;while(U!==p);ri(_,a.memoizedState)||(Tn=!0),a.memoizedState=_,a.baseQueue===null&&(a.baseState=_),o.lastRenderedState=_}return[_,u]}function Gg(n,a,o){var u=pe,p=dn(),_=Ue;if(_){if(o===void 0)throw Error(r(407));o=o()}else o=a();var U=!ri((Be||p).memoizedState,o);U&&(p.memoizedState=o,Tn=!0),p=p.queue;var z=Wg.bind(null,u,p,n);if(No(2048,8,z,[n]),p.getSnapshot!==a||U||hn!==null&&hn.memoizedState.tag&1){if(u.flags|=2048,ps(9,nu(),Xg.bind(null,u,p,o,a),null),Ze===null)throw Error(r(349));_||(kr&124)!==0||qg(u,a,o)}return o}function qg(n,a,o){n.flags|=16384,n={getSnapshot:a,value:o},a=pe.updateQueue,a===null?(a=Uf(),pe.updateQueue=a,a.stores=[n]):(o=a.stores,o===null?a.stores=[n]:o.push(n))}function Xg(n,a,o,u){a.value=o,a.getSnapshot=u,jg(a)&&Yg(n)}function Wg(n,a,o){return o(function(){jg(a)&&Yg(n)})}function jg(n){var a=n.getSnapshot;n=n.value;try{var o=a();return!ri(n,o)}catch{return!0}}function Yg(n){var a=as(n,2);a!==null&&ci(a,n,2)}function zf(n){var a=Kn();if(typeof n=="function"){var o=n;if(n=o(),Ua){xt(!0);try{o()}finally{xt(!1)}}}return a.memoizedState=a.baseState=n,a.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fr,lastRenderedState:n},a}function Zg(n,a,o,u){return n.baseState=o,Pf(n,Be,typeof u=="function"?u:fr)}function fE(n,a,o,u,p){if(ru(n))throw Error(r(485));if(n=a.action,n!==null){var _={payload:p,action:n,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(U){_.listeners.push(U)}};H.T!==null?o(!0):_.isTransition=!1,u(_),o=a.pending,o===null?(_.next=a.pending=_,Kg(a,_)):(_.next=o.next,a.pending=o.next=_)}}function Kg(n,a){var o=a.action,u=a.payload,p=n.state;if(a.isTransition){var _=H.T,U={};H.T=U;try{var z=o(p,u),G=H.S;G!==null&&G(U,z),Qg(n,a,z)}catch(st){If(n,a,st)}finally{H.T=_}}else try{_=o(p,u),Qg(n,a,_)}catch(st){If(n,a,st)}}function Qg(n,a,o){o!==null&&typeof o=="object"&&typeof o.then=="function"?o.then(function(u){Jg(n,a,u)},function(u){return If(n,a,u)}):Jg(n,a,o)}function Jg(n,a,o){a.status="fulfilled",a.value=o,$g(a),n.state=o,a=n.pending,a!==null&&(o=a.next,o===a?n.pending=null:(o=o.next,a.next=o,Kg(n,o)))}function If(n,a,o){var u=n.pending;if(n.pending=null,u!==null){u=u.next;do a.status="rejected",a.reason=o,$g(a),a=a.next;while(a!==u)}n.action=null}function $g(n){n=n.listeners;for(var a=0;a<n.length;a++)(0,n[a])()}function t0(n,a){return a}function e0(n,a){if(Ue){var o=Ze.formState;if(o!==null){t:{var u=pe;if(Ue){if(rn){e:{for(var p=rn,_=Bi;p.nodeType!==8;){if(!_){p=null;break e}if(p=Li(p.nextSibling),p===null){p=null;break e}}_=p.data,p=_==="F!"||_==="F"?p:null}if(p){rn=Li(p.nextSibling),u=p.data==="F!";break t}}wa(u)}u=!1}u&&(a=o[0])}}return o=Kn(),o.memoizedState=o.baseState=a,u={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t0,lastRenderedState:a},o.queue=u,o=x0.bind(null,pe,u),u.dispatch=o,u=zf(!1),_=Vf.bind(null,pe,!1,u.queue),u=Kn(),p={state:a,dispatch:null,action:n,pending:null},u.queue=p,o=fE.bind(null,pe,p,_,o),p.dispatch=o,u.memoizedState=n,[a,o,!1]}function n0(n){var a=dn();return i0(a,Be,n)}function i0(n,a,o){if(a=Pf(n,a,t0)[0],n=eu(fr)[0],typeof a=="object"&&a!==null&&typeof a.then=="function")try{var u=Uo(a)}catch(U){throw U===Ao?Zl:U}else u=a;a=dn();var p=a.queue,_=p.dispatch;return o!==a.memoizedState&&(pe.flags|=2048,ps(9,nu(),hE.bind(null,p,o),null)),[u,_,n]}function hE(n,a){n.action=a}function r0(n){var a=dn(),o=Be;if(o!==null)return i0(a,o,n);dn(),a=a.memoizedState,o=dn();var u=o.queue.dispatch;return o.memoizedState=n,[a,u,!1]}function ps(n,a,o,u){return n={tag:n,create:o,deps:u,inst:a,next:null},a=pe.updateQueue,a===null&&(a=Uf(),pe.updateQueue=a),o=a.lastEffect,o===null?a.lastEffect=n.next=n:(u=o.next,o.next=n,n.next=u,a.lastEffect=n),n}function nu(){return{destroy:void 0,resource:void 0}}function a0(){return dn().memoizedState}function iu(n,a,o,u){var p=Kn();u=u===void 0?null:u,pe.flags|=n,p.memoizedState=ps(1|a,nu(),o,u)}function No(n,a,o,u){var p=dn();u=u===void 0?null:u;var _=p.memoizedState.inst;Be!==null&&u!==null&&Rf(u,Be.memoizedState.deps)?p.memoizedState=ps(a,_,o,u):(pe.flags|=n,p.memoizedState=ps(1|a,_,o,u))}function s0(n,a){iu(8390656,8,n,a)}function o0(n,a){No(2048,8,n,a)}function l0(n,a){return No(4,2,n,a)}function u0(n,a){return No(4,4,n,a)}function c0(n,a){if(typeof a=="function"){n=n();var o=a(n);return function(){typeof o=="function"?o():a(null)}}if(a!=null)return n=n(),a.current=n,function(){a.current=null}}function f0(n,a,o){o=o!=null?o.concat([n]):null,No(4,4,c0.bind(null,a,n),o)}function Ff(){}function h0(n,a){var o=dn();a=a===void 0?null:a;var u=o.memoizedState;return a!==null&&Rf(a,u[1])?u[0]:(o.memoizedState=[n,a],n)}function d0(n,a){var o=dn();a=a===void 0?null:a;var u=o.memoizedState;if(a!==null&&Rf(a,u[1]))return u[0];if(u=n(),Ua){xt(!0);try{n()}finally{xt(!1)}}return o.memoizedState=[u,a],u}function Bf(n,a,o){return o===void 0||(kr&1073741824)!==0?n.memoizedState=a:(n.memoizedState=o,n=g_(),pe.lanes|=n,jr|=n,o)}function p0(n,a,o,u){return ri(o,a)?o:fs.current!==null?(n=Bf(n,o,u),ri(n,a)||(Tn=!0),n):(kr&42)===0?(Tn=!0,n.memoizedState=o):(n=g_(),pe.lanes|=n,jr|=n,a)}function m0(n,a,o,u,p){var _=Z.p;Z.p=_!==0&&8>_?_:8;var U=H.T,z={};H.T=z,Vf(n,!1,a,o);try{var G=p(),st=H.S;if(st!==null&&st(z,G),G!==null&&typeof G=="object"&&typeof G.then=="function"){var _t=lE(G,u);Po(n,a,_t,ui(n))}else Po(n,a,u,ui(n))}catch(Et){Po(n,a,{then:function(){},status:"rejected",reason:Et},ui())}finally{Z.p=_,H.T=U}}function dE(){}function kf(n,a,o,u){if(n.tag!==5)throw Error(r(476));var p=g0(n).queue;m0(n,p,a,J,o===null?dE:function(){return _0(n),o(u)})}function g0(n){var a=n.memoizedState;if(a!==null)return a;a={memoizedState:J,baseState:J,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fr,lastRenderedState:J},next:null};var o={};return a.next={memoizedState:o,baseState:o,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fr,lastRenderedState:o},next:null},n.memoizedState=a,n=n.alternate,n!==null&&(n.memoizedState=a),a}function _0(n){var a=g0(n).next.queue;Po(n,a,{},ui())}function Hf(){return Fn(Jo)}function v0(){return dn().memoizedState}function y0(){return dn().memoizedState}function pE(n){for(var a=n.return;a!==null;){switch(a.tag){case 24:case 3:var o=ui();n=Fr(o);var u=Br(a,n,o);u!==null&&(ci(u,a,o),wo(u,a,o)),a={cache:_f()},n.payload=a;return}a=a.return}}function mE(n,a,o){var u=ui();o={lane:u,revertLane:0,action:o,hasEagerState:!1,eagerState:null,next:null},ru(n)?S0(a,o):(o=of(n,a,o,u),o!==null&&(ci(o,n,u),M0(o,a,u)))}function x0(n,a,o){var u=ui();Po(n,a,o,u)}function Po(n,a,o,u){var p={lane:u,revertLane:0,action:o,hasEagerState:!1,eagerState:null,next:null};if(ru(n))S0(a,p);else{var _=n.alternate;if(n.lanes===0&&(_===null||_.lanes===0)&&(_=a.lastRenderedReducer,_!==null))try{var U=a.lastRenderedState,z=_(U,o);if(p.hasEagerState=!0,p.eagerState=z,ri(z,U))return Hl(n,a,p,0),Ze===null&&kl(),!1}catch{}finally{}if(o=of(n,a,p,u),o!==null)return ci(o,n,u),M0(o,a,u),!0}return!1}function Vf(n,a,o,u){if(u={lane:2,revertLane:xh(),action:u,hasEagerState:!1,eagerState:null,next:null},ru(n)){if(a)throw Error(r(479))}else a=of(n,o,u,2),a!==null&&ci(a,n,2)}function ru(n){var a=n.alternate;return n===pe||a!==null&&a===pe}function S0(n,a){hs=Jl=!0;var o=n.pending;o===null?a.next=a:(a.next=o.next,o.next=a),n.pending=a}function M0(n,a,o){if((o&4194048)!==0){var u=a.lanes;u&=n.pendingLanes,o|=u,a.lanes=o,le(n,o)}}var au={readContext:Fn,use:tu,useCallback:sn,useContext:sn,useEffect:sn,useImperativeHandle:sn,useLayoutEffect:sn,useInsertionEffect:sn,useMemo:sn,useReducer:sn,useRef:sn,useState:sn,useDebugValue:sn,useDeferredValue:sn,useTransition:sn,useSyncExternalStore:sn,useId:sn,useHostTransitionStatus:sn,useFormState:sn,useActionState:sn,useOptimistic:sn,useMemoCache:sn,useCacheRefresh:sn},E0={readContext:Fn,use:tu,useCallback:function(n,a){return Kn().memoizedState=[n,a===void 0?null:a],n},useContext:Fn,useEffect:s0,useImperativeHandle:function(n,a,o){o=o!=null?o.concat([n]):null,iu(4194308,4,c0.bind(null,a,n),o)},useLayoutEffect:function(n,a){return iu(4194308,4,n,a)},useInsertionEffect:function(n,a){iu(4,2,n,a)},useMemo:function(n,a){var o=Kn();a=a===void 0?null:a;var u=n();if(Ua){xt(!0);try{n()}finally{xt(!1)}}return o.memoizedState=[u,a],u},useReducer:function(n,a,o){var u=Kn();if(o!==void 0){var p=o(a);if(Ua){xt(!0);try{o(a)}finally{xt(!1)}}}else p=a;return u.memoizedState=u.baseState=p,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:p},u.queue=n,n=n.dispatch=mE.bind(null,pe,n),[u.memoizedState,n]},useRef:function(n){var a=Kn();return n={current:n},a.memoizedState=n},useState:function(n){n=zf(n);var a=n.queue,o=x0.bind(null,pe,a);return a.dispatch=o,[n.memoizedState,o]},useDebugValue:Ff,useDeferredValue:function(n,a){var o=Kn();return Bf(o,n,a)},useTransition:function(){var n=zf(!1);return n=m0.bind(null,pe,n.queue,!0,!1),Kn().memoizedState=n,[!1,n]},useSyncExternalStore:function(n,a,o){var u=pe,p=Kn();if(Ue){if(o===void 0)throw Error(r(407));o=o()}else{if(o=a(),Ze===null)throw Error(r(349));(be&124)!==0||qg(u,a,o)}p.memoizedState=o;var _={value:o,getSnapshot:a};return p.queue=_,s0(Wg.bind(null,u,_,n),[n]),u.flags|=2048,ps(9,nu(),Xg.bind(null,u,_,o,a),null),o},useId:function(){var n=Kn(),a=Ze.identifierPrefix;if(Ue){var o=lr,u=or;o=(u&~(1<<32-Tt(u)-1)).toString(32)+o,a="«"+a+"R"+o,o=$l++,0<o&&(a+="H"+o.toString(32)),a+="»"}else o=uE++,a="«"+a+"r"+o.toString(32)+"»";return n.memoizedState=a},useHostTransitionStatus:Hf,useFormState:e0,useActionState:e0,useOptimistic:function(n){var a=Kn();a.memoizedState=a.baseState=n;var o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return a.queue=o,a=Vf.bind(null,pe,!0,o),o.dispatch=a,[n,a]},useMemoCache:Nf,useCacheRefresh:function(){return Kn().memoizedState=pE.bind(null,pe)}},b0={readContext:Fn,use:tu,useCallback:h0,useContext:Fn,useEffect:o0,useImperativeHandle:f0,useInsertionEffect:l0,useLayoutEffect:u0,useMemo:d0,useReducer:eu,useRef:a0,useState:function(){return eu(fr)},useDebugValue:Ff,useDeferredValue:function(n,a){var o=dn();return p0(o,Be.memoizedState,n,a)},useTransition:function(){var n=eu(fr)[0],a=dn().memoizedState;return[typeof n=="boolean"?n:Uo(n),a]},useSyncExternalStore:Gg,useId:v0,useHostTransitionStatus:Hf,useFormState:n0,useActionState:n0,useOptimistic:function(n,a){var o=dn();return Zg(o,Be,n,a)},useMemoCache:Nf,useCacheRefresh:y0},gE={readContext:Fn,use:tu,useCallback:h0,useContext:Fn,useEffect:o0,useImperativeHandle:f0,useInsertionEffect:l0,useLayoutEffect:u0,useMemo:d0,useReducer:Of,useRef:a0,useState:function(){return Of(fr)},useDebugValue:Ff,useDeferredValue:function(n,a){var o=dn();return Be===null?Bf(o,n,a):p0(o,Be.memoizedState,n,a)},useTransition:function(){var n=Of(fr)[0],a=dn().memoizedState;return[typeof n=="boolean"?n:Uo(n),a]},useSyncExternalStore:Gg,useId:v0,useHostTransitionStatus:Hf,useFormState:r0,useActionState:r0,useOptimistic:function(n,a){var o=dn();return Be!==null?Zg(o,Be,n,a):(o.baseState=n,[n,o.queue.dispatch])},useMemoCache:Nf,useCacheRefresh:y0},ms=null,Oo=0;function su(n){var a=Oo;return Oo+=1,ms===null&&(ms=[]),Og(ms,n,a)}function zo(n,a){a=a.props.ref,n.ref=a!==void 0?a:null}function ou(n,a){throw a.$$typeof===g?Error(r(525)):(n=Object.prototype.toString.call(a),Error(r(31,n==="[object Object]"?"object with keys {"+Object.keys(a).join(", ")+"}":n)))}function T0(n){var a=n._init;return a(n._payload)}function A0(n){function a(nt,Q){if(n){var at=nt.deletions;at===null?(nt.deletions=[Q],nt.flags|=16):at.push(Q)}}function o(nt,Q){if(!n)return null;for(;Q!==null;)a(nt,Q),Q=Q.sibling;return null}function u(nt){for(var Q=new Map;nt!==null;)nt.key!==null?Q.set(nt.key,nt):Q.set(nt.index,nt),nt=nt.sibling;return Q}function p(nt,Q){return nt=sr(nt,Q),nt.index=0,nt.sibling=null,nt}function _(nt,Q,at){return nt.index=at,n?(at=nt.alternate,at!==null?(at=at.index,at<Q?(nt.flags|=67108866,Q):at):(nt.flags|=67108866,Q)):(nt.flags|=1048576,Q)}function U(nt){return n&&nt.alternate===null&&(nt.flags|=67108866),nt}function z(nt,Q,at,yt){return Q===null||Q.tag!==6?(Q=uf(at,nt.mode,yt),Q.return=nt,Q):(Q=p(Q,at),Q.return=nt,Q)}function G(nt,Q,at,yt){var Ht=at.type;return Ht===b?_t(nt,Q,at.props.children,yt,at.key):Q!==null&&(Q.elementType===Ht||typeof Ht=="object"&&Ht!==null&&Ht.$$typeof===O&&T0(Ht)===Q.type)?(Q=p(Q,at.props),zo(Q,at),Q.return=nt,Q):(Q=Gl(at.type,at.key,at.props,null,nt.mode,yt),zo(Q,at),Q.return=nt,Q)}function st(nt,Q,at,yt){return Q===null||Q.tag!==4||Q.stateNode.containerInfo!==at.containerInfo||Q.stateNode.implementation!==at.implementation?(Q=cf(at,nt.mode,yt),Q.return=nt,Q):(Q=p(Q,at.children||[]),Q.return=nt,Q)}function _t(nt,Q,at,yt,Ht){return Q===null||Q.tag!==7?(Q=ba(at,nt.mode,yt,Ht),Q.return=nt,Q):(Q=p(Q,at),Q.return=nt,Q)}function Et(nt,Q,at){if(typeof Q=="string"&&Q!==""||typeof Q=="number"||typeof Q=="bigint")return Q=uf(""+Q,nt.mode,at),Q.return=nt,Q;if(typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case v:return at=Gl(Q.type,Q.key,Q.props,null,nt.mode,at),zo(at,Q),at.return=nt,at;case y:return Q=cf(Q,nt.mode,at),Q.return=nt,Q;case O:var yt=Q._init;return Q=yt(Q._payload),Et(nt,Q,at)}if(X(Q)||k(Q))return Q=ba(Q,nt.mode,at,null),Q.return=nt,Q;if(typeof Q.then=="function")return Et(nt,su(Q),at);if(Q.$$typeof===S)return Et(nt,jl(nt,Q),at);ou(nt,Q)}return null}function ut(nt,Q,at,yt){var Ht=Q!==null?Q.key:null;if(typeof at=="string"&&at!==""||typeof at=="number"||typeof at=="bigint")return Ht!==null?null:z(nt,Q,""+at,yt);if(typeof at=="object"&&at!==null){switch(at.$$typeof){case v:return at.key===Ht?G(nt,Q,at,yt):null;case y:return at.key===Ht?st(nt,Q,at,yt):null;case O:return Ht=at._init,at=Ht(at._payload),ut(nt,Q,at,yt)}if(X(at)||k(at))return Ht!==null?null:_t(nt,Q,at,yt,null);if(typeof at.then=="function")return ut(nt,Q,su(at),yt);if(at.$$typeof===S)return ut(nt,Q,jl(nt,at),yt);ou(nt,at)}return null}function ct(nt,Q,at,yt,Ht){if(typeof yt=="string"&&yt!==""||typeof yt=="number"||typeof yt=="bigint")return nt=nt.get(at)||null,z(Q,nt,""+yt,Ht);if(typeof yt=="object"&&yt!==null){switch(yt.$$typeof){case v:return nt=nt.get(yt.key===null?at:yt.key)||null,G(Q,nt,yt,Ht);case y:return nt=nt.get(yt.key===null?at:yt.key)||null,st(Q,nt,yt,Ht);case O:var _e=yt._init;return yt=_e(yt._payload),ct(nt,Q,at,yt,Ht)}if(X(yt)||k(yt))return nt=nt.get(at)||null,_t(Q,nt,yt,Ht,null);if(typeof yt.then=="function")return ct(nt,Q,at,su(yt),Ht);if(yt.$$typeof===S)return ct(nt,Q,at,jl(Q,yt),Ht);ou(Q,yt)}return null}function ne(nt,Q,at,yt){for(var Ht=null,_e=null,Wt=Q,te=Q=0,Rn=null;Wt!==null&&te<at.length;te++){Wt.index>te?(Rn=Wt,Wt=null):Rn=Wt.sibling;var we=ut(nt,Wt,at[te],yt);if(we===null){Wt===null&&(Wt=Rn);break}n&&Wt&&we.alternate===null&&a(nt,Wt),Q=_(we,Q,te),_e===null?Ht=we:_e.sibling=we,_e=we,Wt=Rn}if(te===at.length)return o(nt,Wt),Ue&&Aa(nt,te),Ht;if(Wt===null){for(;te<at.length;te++)Wt=Et(nt,at[te],yt),Wt!==null&&(Q=_(Wt,Q,te),_e===null?Ht=Wt:_e.sibling=Wt,_e=Wt);return Ue&&Aa(nt,te),Ht}for(Wt=u(Wt);te<at.length;te++)Rn=ct(Wt,nt,te,at[te],yt),Rn!==null&&(n&&Rn.alternate!==null&&Wt.delete(Rn.key===null?te:Rn.key),Q=_(Rn,Q,te),_e===null?Ht=Rn:_e.sibling=Rn,_e=Rn);return n&&Wt.forEach(function(na){return a(nt,na)}),Ue&&Aa(nt,te),Ht}function $t(nt,Q,at,yt){if(at==null)throw Error(r(151));for(var Ht=null,_e=null,Wt=Q,te=Q=0,Rn=null,we=at.next();Wt!==null&&!we.done;te++,we=at.next()){Wt.index>te?(Rn=Wt,Wt=null):Rn=Wt.sibling;var na=ut(nt,Wt,we.value,yt);if(na===null){Wt===null&&(Wt=Rn);break}n&&Wt&&na.alternate===null&&a(nt,Wt),Q=_(na,Q,te),_e===null?Ht=na:_e.sibling=na,_e=na,Wt=Rn}if(we.done)return o(nt,Wt),Ue&&Aa(nt,te),Ht;if(Wt===null){for(;!we.done;te++,we=at.next())we=Et(nt,we.value,yt),we!==null&&(Q=_(we,Q,te),_e===null?Ht=we:_e.sibling=we,_e=we);return Ue&&Aa(nt,te),Ht}for(Wt=u(Wt);!we.done;te++,we=at.next())we=ct(Wt,nt,te,we.value,yt),we!==null&&(n&&we.alternate!==null&&Wt.delete(we.key===null?te:we.key),Q=_(we,Q,te),_e===null?Ht=we:_e.sibling=we,_e=we);return n&&Wt.forEach(function(_1){return a(nt,_1)}),Ue&&Aa(nt,te),Ht}function He(nt,Q,at,yt){if(typeof at=="object"&&at!==null&&at.type===b&&at.key===null&&(at=at.props.children),typeof at=="object"&&at!==null){switch(at.$$typeof){case v:t:{for(var Ht=at.key;Q!==null;){if(Q.key===Ht){if(Ht=at.type,Ht===b){if(Q.tag===7){o(nt,Q.sibling),yt=p(Q,at.props.children),yt.return=nt,nt=yt;break t}}else if(Q.elementType===Ht||typeof Ht=="object"&&Ht!==null&&Ht.$$typeof===O&&T0(Ht)===Q.type){o(nt,Q.sibling),yt=p(Q,at.props),zo(yt,at),yt.return=nt,nt=yt;break t}o(nt,Q);break}else a(nt,Q);Q=Q.sibling}at.type===b?(yt=ba(at.props.children,nt.mode,yt,at.key),yt.return=nt,nt=yt):(yt=Gl(at.type,at.key,at.props,null,nt.mode,yt),zo(yt,at),yt.return=nt,nt=yt)}return U(nt);case y:t:{for(Ht=at.key;Q!==null;){if(Q.key===Ht)if(Q.tag===4&&Q.stateNode.containerInfo===at.containerInfo&&Q.stateNode.implementation===at.implementation){o(nt,Q.sibling),yt=p(Q,at.children||[]),yt.return=nt,nt=yt;break t}else{o(nt,Q);break}else a(nt,Q);Q=Q.sibling}yt=cf(at,nt.mode,yt),yt.return=nt,nt=yt}return U(nt);case O:return Ht=at._init,at=Ht(at._payload),He(nt,Q,at,yt)}if(X(at))return ne(nt,Q,at,yt);if(k(at)){if(Ht=k(at),typeof Ht!="function")throw Error(r(150));return at=Ht.call(at),$t(nt,Q,at,yt)}if(typeof at.then=="function")return He(nt,Q,su(at),yt);if(at.$$typeof===S)return He(nt,Q,jl(nt,at),yt);ou(nt,at)}return typeof at=="string"&&at!==""||typeof at=="number"||typeof at=="bigint"?(at=""+at,Q!==null&&Q.tag===6?(o(nt,Q.sibling),yt=p(Q,at),yt.return=nt,nt=yt):(o(nt,Q),yt=uf(at,nt.mode,yt),yt.return=nt,nt=yt),U(nt)):o(nt,Q)}return function(nt,Q,at,yt){try{Oo=0;var Ht=He(nt,Q,at,yt);return ms=null,Ht}catch(Wt){if(Wt===Ao||Wt===Zl)throw Wt;var _e=ai(29,Wt,null,nt.mode);return _e.lanes=yt,_e.return=nt,_e}finally{}}}var gs=A0(!0),R0=A0(!1),Si=Y(null),ki=null;function Hr(n){var a=n.alternate;B(yn,yn.current&1),B(Si,n),ki===null&&(a===null||fs.current!==null||a.memoizedState!==null)&&(ki=n)}function w0(n){if(n.tag===22){if(B(yn,yn.current),B(Si,n),ki===null){var a=n.alternate;a!==null&&a.memoizedState!==null&&(ki=n)}}else Vr()}function Vr(){B(yn,yn.current),B(Si,Si.current)}function hr(n){ft(Si),ki===n&&(ki=null),ft(yn)}var yn=Y(0);function lu(n){for(var a=n;a!==null;){if(a.tag===13){var o=a.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||Uh(o)))return a}else if(a.tag===19&&a.memoizedProps.revealOrder!==void 0){if((a.flags&128)!==0)return a}else if(a.child!==null){a.child.return=a,a=a.child;continue}if(a===n)break;for(;a.sibling===null;){if(a.return===null||a.return===n)return null;a=a.return}a.sibling.return=a.return,a=a.sibling}return null}function Gf(n,a,o,u){a=n.memoizedState,o=o(u,a),o=o==null?a:m({},a,o),n.memoizedState=o,n.lanes===0&&(n.updateQueue.baseState=o)}var qf={enqueueSetState:function(n,a,o){n=n._reactInternals;var u=ui(),p=Fr(u);p.payload=a,o!=null&&(p.callback=o),a=Br(n,p,u),a!==null&&(ci(a,n,u),wo(a,n,u))},enqueueReplaceState:function(n,a,o){n=n._reactInternals;var u=ui(),p=Fr(u);p.tag=1,p.payload=a,o!=null&&(p.callback=o),a=Br(n,p,u),a!==null&&(ci(a,n,u),wo(a,n,u))},enqueueForceUpdate:function(n,a){n=n._reactInternals;var o=ui(),u=Fr(o);u.tag=2,a!=null&&(u.callback=a),a=Br(n,u,o),a!==null&&(ci(a,n,o),wo(a,n,o))}};function C0(n,a,o,u,p,_,U){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(u,_,U):a.prototype&&a.prototype.isPureReactComponent?!vo(o,u)||!vo(p,_):!0}function D0(n,a,o,u){n=a.state,typeof a.componentWillReceiveProps=="function"&&a.componentWillReceiveProps(o,u),typeof a.UNSAFE_componentWillReceiveProps=="function"&&a.UNSAFE_componentWillReceiveProps(o,u),a.state!==n&&qf.enqueueReplaceState(a,a.state,null)}function Na(n,a){var o=a;if("ref"in a){o={};for(var u in a)u!=="ref"&&(o[u]=a[u])}if(n=n.defaultProps){o===a&&(o=m({},o));for(var p in n)o[p]===void 0&&(o[p]=n[p])}return o}var uu=typeof reportError=="function"?reportError:function(n){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var a=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof n=="object"&&n!==null&&typeof n.message=="string"?String(n.message):String(n),error:n});if(!window.dispatchEvent(a))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",n);return}console.error(n)};function L0(n){uu(n)}function U0(n){console.error(n)}function N0(n){uu(n)}function cu(n,a){try{var o=n.onUncaughtError;o(a.value,{componentStack:a.stack})}catch(u){setTimeout(function(){throw u})}}function P0(n,a,o){try{var u=n.onCaughtError;u(o.value,{componentStack:o.stack,errorBoundary:a.tag===1?a.stateNode:null})}catch(p){setTimeout(function(){throw p})}}function Xf(n,a,o){return o=Fr(o),o.tag=3,o.payload={element:null},o.callback=function(){cu(n,a)},o}function O0(n){return n=Fr(n),n.tag=3,n}function z0(n,a,o,u){var p=o.type.getDerivedStateFromError;if(typeof p=="function"){var _=u.value;n.payload=function(){return p(_)},n.callback=function(){P0(a,o,u)}}var U=o.stateNode;U!==null&&typeof U.componentDidCatch=="function"&&(n.callback=function(){P0(a,o,u),typeof p!="function"&&(Yr===null?Yr=new Set([this]):Yr.add(this));var z=u.stack;this.componentDidCatch(u.value,{componentStack:z!==null?z:""})})}function _E(n,a,o,u,p){if(o.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){if(a=o.alternate,a!==null&&Eo(a,o,p,!0),o=Si.current,o!==null){switch(o.tag){case 13:return ki===null?mh():o.alternate===null&&an===0&&(an=3),o.flags&=-257,o.flags|=65536,o.lanes=p,u===xf?o.flags|=16384:(a=o.updateQueue,a===null?o.updateQueue=new Set([u]):a.add(u),_h(n,u,p)),!1;case 22:return o.flags|=65536,u===xf?o.flags|=16384:(a=o.updateQueue,a===null?(a={transitions:null,markerInstances:null,retryQueue:new Set([u])},o.updateQueue=a):(o=a.retryQueue,o===null?a.retryQueue=new Set([u]):o.add(u)),_h(n,u,p)),!1}throw Error(r(435,o.tag))}return _h(n,u,p),mh(),!1}if(Ue)return a=Si.current,a!==null?((a.flags&65536)===0&&(a.flags|=256),a.flags|=65536,a.lanes=p,u!==df&&(n=Error(r(422),{cause:u}),Mo(_i(n,o)))):(u!==df&&(a=Error(r(423),{cause:u}),Mo(_i(a,o))),n=n.current.alternate,n.flags|=65536,p&=-p,n.lanes|=p,u=_i(u,o),p=Xf(n.stateNode,u,p),Ef(n,p),an!==4&&(an=2)),!1;var _=Error(r(520),{cause:u});if(_=_i(_,o),Go===null?Go=[_]:Go.push(_),an!==4&&(an=2),a===null)return!0;u=_i(u,o),o=a;do{switch(o.tag){case 3:return o.flags|=65536,n=p&-p,o.lanes|=n,n=Xf(o.stateNode,u,n),Ef(o,n),!1;case 1:if(a=o.type,_=o.stateNode,(o.flags&128)===0&&(typeof a.getDerivedStateFromError=="function"||_!==null&&typeof _.componentDidCatch=="function"&&(Yr===null||!Yr.has(_))))return o.flags|=65536,p&=-p,o.lanes|=p,p=O0(p),z0(p,n,o,u),Ef(o,p),!1}o=o.return}while(o!==null);return!1}var I0=Error(r(461)),Tn=!1;function Nn(n,a,o,u){a.child=n===null?R0(a,null,o,u):gs(a,n.child,o,u)}function F0(n,a,o,u,p){o=o.render;var _=a.ref;if("ref"in u){var U={};for(var z in u)z!=="ref"&&(U[z]=u[z])}else U=u;return Da(a),u=wf(n,a,o,U,_,p),z=Cf(),n!==null&&!Tn?(Df(n,a,p),dr(n,a,p)):(Ue&&z&&ff(a),a.flags|=1,Nn(n,a,u,p),a.child)}function B0(n,a,o,u,p){if(n===null){var _=o.type;return typeof _=="function"&&!lf(_)&&_.defaultProps===void 0&&o.compare===null?(a.tag=15,a.type=_,k0(n,a,_,u,p)):(n=Gl(o.type,null,u,a,a.mode,p),n.ref=a.ref,n.return=a,a.child=n)}if(_=n.child,!$f(n,p)){var U=_.memoizedProps;if(o=o.compare,o=o!==null?o:vo,o(U,u)&&n.ref===a.ref)return dr(n,a,p)}return a.flags|=1,n=sr(_,u),n.ref=a.ref,n.return=a,a.child=n}function k0(n,a,o,u,p){if(n!==null){var _=n.memoizedProps;if(vo(_,u)&&n.ref===a.ref)if(Tn=!1,a.pendingProps=u=_,$f(n,p))(n.flags&131072)!==0&&(Tn=!0);else return a.lanes=n.lanes,dr(n,a,p)}return Wf(n,a,o,u,p)}function H0(n,a,o){var u=a.pendingProps,p=u.children,_=n!==null?n.memoizedState:null;if(u.mode==="hidden"){if((a.flags&128)!==0){if(u=_!==null?_.baseLanes|o:o,n!==null){for(p=a.child=n.child,_=0;p!==null;)_=_|p.lanes|p.childLanes,p=p.sibling;a.childLanes=_&~u}else a.childLanes=0,a.child=null;return V0(n,a,u,o)}if((o&536870912)!==0)a.memoizedState={baseLanes:0,cachePool:null},n!==null&&Yl(a,_!==null?_.cachePool:null),_!==null?kg(a,_):Tf(),w0(a);else return a.lanes=a.childLanes=536870912,V0(n,a,_!==null?_.baseLanes|o:o,o)}else _!==null?(Yl(a,_.cachePool),kg(a,_),Vr(),a.memoizedState=null):(n!==null&&Yl(a,null),Tf(),Vr());return Nn(n,a,p,o),a.child}function V0(n,a,o,u){var p=yf();return p=p===null?null:{parent:vn._currentValue,pool:p},a.memoizedState={baseLanes:o,cachePool:p},n!==null&&Yl(a,null),Tf(),w0(a),n!==null&&Eo(n,a,u,!0),null}function fu(n,a){var o=a.ref;if(o===null)n!==null&&n.ref!==null&&(a.flags|=4194816);else{if(typeof o!="function"&&typeof o!="object")throw Error(r(284));(n===null||n.ref!==o)&&(a.flags|=4194816)}}function Wf(n,a,o,u,p){return Da(a),o=wf(n,a,o,u,void 0,p),u=Cf(),n!==null&&!Tn?(Df(n,a,p),dr(n,a,p)):(Ue&&u&&ff(a),a.flags|=1,Nn(n,a,o,p),a.child)}function G0(n,a,o,u,p,_){return Da(a),a.updateQueue=null,o=Vg(a,u,o,p),Hg(n),u=Cf(),n!==null&&!Tn?(Df(n,a,_),dr(n,a,_)):(Ue&&u&&ff(a),a.flags|=1,Nn(n,a,o,_),a.child)}function q0(n,a,o,u,p){if(Da(a),a.stateNode===null){var _=ss,U=o.contextType;typeof U=="object"&&U!==null&&(_=Fn(U)),_=new o(u,_),a.memoizedState=_.state!==null&&_.state!==void 0?_.state:null,_.updater=qf,a.stateNode=_,_._reactInternals=a,_=a.stateNode,_.props=u,_.state=a.memoizedState,_.refs={},Sf(a),U=o.contextType,_.context=typeof U=="object"&&U!==null?Fn(U):ss,_.state=a.memoizedState,U=o.getDerivedStateFromProps,typeof U=="function"&&(Gf(a,o,U,u),_.state=a.memoizedState),typeof o.getDerivedStateFromProps=="function"||typeof _.getSnapshotBeforeUpdate=="function"||typeof _.UNSAFE_componentWillMount!="function"&&typeof _.componentWillMount!="function"||(U=_.state,typeof _.componentWillMount=="function"&&_.componentWillMount(),typeof _.UNSAFE_componentWillMount=="function"&&_.UNSAFE_componentWillMount(),U!==_.state&&qf.enqueueReplaceState(_,_.state,null),Do(a,u,_,p),Co(),_.state=a.memoizedState),typeof _.componentDidMount=="function"&&(a.flags|=4194308),u=!0}else if(n===null){_=a.stateNode;var z=a.memoizedProps,G=Na(o,z);_.props=G;var st=_.context,_t=o.contextType;U=ss,typeof _t=="object"&&_t!==null&&(U=Fn(_t));var Et=o.getDerivedStateFromProps;_t=typeof Et=="function"||typeof _.getSnapshotBeforeUpdate=="function",z=a.pendingProps!==z,_t||typeof _.UNSAFE_componentWillReceiveProps!="function"&&typeof _.componentWillReceiveProps!="function"||(z||st!==U)&&D0(a,_,u,U),Ir=!1;var ut=a.memoizedState;_.state=ut,Do(a,u,_,p),Co(),st=a.memoizedState,z||ut!==st||Ir?(typeof Et=="function"&&(Gf(a,o,Et,u),st=a.memoizedState),(G=Ir||C0(a,o,G,u,ut,st,U))?(_t||typeof _.UNSAFE_componentWillMount!="function"&&typeof _.componentWillMount!="function"||(typeof _.componentWillMount=="function"&&_.componentWillMount(),typeof _.UNSAFE_componentWillMount=="function"&&_.UNSAFE_componentWillMount()),typeof _.componentDidMount=="function"&&(a.flags|=4194308)):(typeof _.componentDidMount=="function"&&(a.flags|=4194308),a.memoizedProps=u,a.memoizedState=st),_.props=u,_.state=st,_.context=U,u=G):(typeof _.componentDidMount=="function"&&(a.flags|=4194308),u=!1)}else{_=a.stateNode,Mf(n,a),U=a.memoizedProps,_t=Na(o,U),_.props=_t,Et=a.pendingProps,ut=_.context,st=o.contextType,G=ss,typeof st=="object"&&st!==null&&(G=Fn(st)),z=o.getDerivedStateFromProps,(st=typeof z=="function"||typeof _.getSnapshotBeforeUpdate=="function")||typeof _.UNSAFE_componentWillReceiveProps!="function"&&typeof _.componentWillReceiveProps!="function"||(U!==Et||ut!==G)&&D0(a,_,u,G),Ir=!1,ut=a.memoizedState,_.state=ut,Do(a,u,_,p),Co();var ct=a.memoizedState;U!==Et||ut!==ct||Ir||n!==null&&n.dependencies!==null&&Wl(n.dependencies)?(typeof z=="function"&&(Gf(a,o,z,u),ct=a.memoizedState),(_t=Ir||C0(a,o,_t,u,ut,ct,G)||n!==null&&n.dependencies!==null&&Wl(n.dependencies))?(st||typeof _.UNSAFE_componentWillUpdate!="function"&&typeof _.componentWillUpdate!="function"||(typeof _.componentWillUpdate=="function"&&_.componentWillUpdate(u,ct,G),typeof _.UNSAFE_componentWillUpdate=="function"&&_.UNSAFE_componentWillUpdate(u,ct,G)),typeof _.componentDidUpdate=="function"&&(a.flags|=4),typeof _.getSnapshotBeforeUpdate=="function"&&(a.flags|=1024)):(typeof _.componentDidUpdate!="function"||U===n.memoizedProps&&ut===n.memoizedState||(a.flags|=4),typeof _.getSnapshotBeforeUpdate!="function"||U===n.memoizedProps&&ut===n.memoizedState||(a.flags|=1024),a.memoizedProps=u,a.memoizedState=ct),_.props=u,_.state=ct,_.context=G,u=_t):(typeof _.componentDidUpdate!="function"||U===n.memoizedProps&&ut===n.memoizedState||(a.flags|=4),typeof _.getSnapshotBeforeUpdate!="function"||U===n.memoizedProps&&ut===n.memoizedState||(a.flags|=1024),u=!1)}return _=u,fu(n,a),u=(a.flags&128)!==0,_||u?(_=a.stateNode,o=u&&typeof o.getDerivedStateFromError!="function"?null:_.render(),a.flags|=1,n!==null&&u?(a.child=gs(a,n.child,null,p),a.child=gs(a,null,o,p)):Nn(n,a,o,p),a.memoizedState=_.state,n=a.child):n=dr(n,a,p),n}function X0(n,a,o,u){return So(),a.flags|=256,Nn(n,a,o,u),a.child}var jf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yf(n){return{baseLanes:n,cachePool:Ug()}}function Zf(n,a,o){return n=n!==null?n.childLanes&~o:0,a&&(n|=Mi),n}function W0(n,a,o){var u=a.pendingProps,p=!1,_=(a.flags&128)!==0,U;if((U=_)||(U=n!==null&&n.memoizedState===null?!1:(yn.current&2)!==0),U&&(p=!0,a.flags&=-129),U=(a.flags&32)!==0,a.flags&=-33,n===null){if(Ue){if(p?Hr(a):Vr(),Ue){var z=rn,G;if(G=z){t:{for(G=z,z=Bi;G.nodeType!==8;){if(!z){z=null;break t}if(G=Li(G.nextSibling),G===null){z=null;break t}}z=G}z!==null?(a.memoizedState={dehydrated:z,treeContext:Ta!==null?{id:or,overflow:lr}:null,retryLane:536870912,hydrationErrors:null},G=ai(18,null,null,0),G.stateNode=z,G.return=a,a.child=G,Gn=a,rn=null,G=!0):G=!1}G||wa(a)}if(z=a.memoizedState,z!==null&&(z=z.dehydrated,z!==null))return Uh(z)?a.lanes=32:a.lanes=536870912,null;hr(a)}return z=u.children,u=u.fallback,p?(Vr(),p=a.mode,z=hu({mode:"hidden",children:z},p),u=ba(u,p,o,null),z.return=a,u.return=a,z.sibling=u,a.child=z,p=a.child,p.memoizedState=Yf(o),p.childLanes=Zf(n,U,o),a.memoizedState=jf,u):(Hr(a),Kf(a,z))}if(G=n.memoizedState,G!==null&&(z=G.dehydrated,z!==null)){if(_)a.flags&256?(Hr(a),a.flags&=-257,a=Qf(n,a,o)):a.memoizedState!==null?(Vr(),a.child=n.child,a.flags|=128,a=null):(Vr(),p=u.fallback,z=a.mode,u=hu({mode:"visible",children:u.children},z),p=ba(p,z,o,null),p.flags|=2,u.return=a,p.return=a,u.sibling=p,a.child=u,gs(a,n.child,null,o),u=a.child,u.memoizedState=Yf(o),u.childLanes=Zf(n,U,o),a.memoizedState=jf,a=p);else if(Hr(a),Uh(z)){if(U=z.nextSibling&&z.nextSibling.dataset,U)var st=U.dgst;U=st,u=Error(r(419)),u.stack="",u.digest=U,Mo({value:u,source:null,stack:null}),a=Qf(n,a,o)}else if(Tn||Eo(n,a,o,!1),U=(o&n.childLanes)!==0,Tn||U){if(U=Ze,U!==null&&(u=o&-o,u=(u&42)!==0?1:je(u),u=(u&(U.suspendedLanes|o))!==0?0:u,u!==0&&u!==G.retryLane))throw G.retryLane=u,as(n,u),ci(U,n,u),I0;z.data==="$?"||mh(),a=Qf(n,a,o)}else z.data==="$?"?(a.flags|=192,a.child=n.child,a=null):(n=G.treeContext,rn=Li(z.nextSibling),Gn=a,Ue=!0,Ra=null,Bi=!1,n!==null&&(yi[xi++]=or,yi[xi++]=lr,yi[xi++]=Ta,or=n.id,lr=n.overflow,Ta=a),a=Kf(a,u.children),a.flags|=4096);return a}return p?(Vr(),p=u.fallback,z=a.mode,G=n.child,st=G.sibling,u=sr(G,{mode:"hidden",children:u.children}),u.subtreeFlags=G.subtreeFlags&65011712,st!==null?p=sr(st,p):(p=ba(p,z,o,null),p.flags|=2),p.return=a,u.return=a,u.sibling=p,a.child=u,u=p,p=a.child,z=n.child.memoizedState,z===null?z=Yf(o):(G=z.cachePool,G!==null?(st=vn._currentValue,G=G.parent!==st?{parent:st,pool:st}:G):G=Ug(),z={baseLanes:z.baseLanes|o,cachePool:G}),p.memoizedState=z,p.childLanes=Zf(n,U,o),a.memoizedState=jf,u):(Hr(a),o=n.child,n=o.sibling,o=sr(o,{mode:"visible",children:u.children}),o.return=a,o.sibling=null,n!==null&&(U=a.deletions,U===null?(a.deletions=[n],a.flags|=16):U.push(n)),a.child=o,a.memoizedState=null,o)}function Kf(n,a){return a=hu({mode:"visible",children:a},n.mode),a.return=n,n.child=a}function hu(n,a){return n=ai(22,n,null,a),n.lanes=0,n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},n}function Qf(n,a,o){return gs(a,n.child,null,o),n=Kf(a,a.pendingProps.children),n.flags|=2,a.memoizedState=null,n}function j0(n,a,o){n.lanes|=a;var u=n.alternate;u!==null&&(u.lanes|=a),mf(n.return,a,o)}function Jf(n,a,o,u,p){var _=n.memoizedState;_===null?n.memoizedState={isBackwards:a,rendering:null,renderingStartTime:0,last:u,tail:o,tailMode:p}:(_.isBackwards=a,_.rendering=null,_.renderingStartTime=0,_.last=u,_.tail=o,_.tailMode=p)}function Y0(n,a,o){var u=a.pendingProps,p=u.revealOrder,_=u.tail;if(Nn(n,a,u.children,o),u=yn.current,(u&2)!==0)u=u&1|2,a.flags|=128;else{if(n!==null&&(n.flags&128)!==0)t:for(n=a.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&j0(n,o,a);else if(n.tag===19)j0(n,o,a);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===a)break t;for(;n.sibling===null;){if(n.return===null||n.return===a)break t;n=n.return}n.sibling.return=n.return,n=n.sibling}u&=1}switch(B(yn,u),p){case"forwards":for(o=a.child,p=null;o!==null;)n=o.alternate,n!==null&&lu(n)===null&&(p=o),o=o.sibling;o=p,o===null?(p=a.child,a.child=null):(p=o.sibling,o.sibling=null),Jf(a,!1,p,o,_);break;case"backwards":for(o=null,p=a.child,a.child=null;p!==null;){if(n=p.alternate,n!==null&&lu(n)===null){a.child=p;break}n=p.sibling,p.sibling=o,o=p,p=n}Jf(a,!0,o,null,_);break;case"together":Jf(a,!1,null,null,void 0);break;default:a.memoizedState=null}return a.child}function dr(n,a,o){if(n!==null&&(a.dependencies=n.dependencies),jr|=a.lanes,(o&a.childLanes)===0)if(n!==null){if(Eo(n,a,o,!1),(o&a.childLanes)===0)return null}else return null;if(n!==null&&a.child!==n.child)throw Error(r(153));if(a.child!==null){for(n=a.child,o=sr(n,n.pendingProps),a.child=o,o.return=a;n.sibling!==null;)n=n.sibling,o=o.sibling=sr(n,n.pendingProps),o.return=a;o.sibling=null}return a.child}function $f(n,a){return(n.lanes&a)!==0?!0:(n=n.dependencies,!!(n!==null&&Wl(n)))}function vE(n,a,o){switch(a.tag){case 3:Lt(a,a.stateNode.containerInfo),zr(a,vn,n.memoizedState.cache),So();break;case 27:case 5:Gt(a);break;case 4:Lt(a,a.stateNode.containerInfo);break;case 10:zr(a,a.type,a.memoizedProps.value);break;case 13:var u=a.memoizedState;if(u!==null)return u.dehydrated!==null?(Hr(a),a.flags|=128,null):(o&a.child.childLanes)!==0?W0(n,a,o):(Hr(a),n=dr(n,a,o),n!==null?n.sibling:null);Hr(a);break;case 19:var p=(n.flags&128)!==0;if(u=(o&a.childLanes)!==0,u||(Eo(n,a,o,!1),u=(o&a.childLanes)!==0),p){if(u)return Y0(n,a,o);a.flags|=128}if(p=a.memoizedState,p!==null&&(p.rendering=null,p.tail=null,p.lastEffect=null),B(yn,yn.current),u)break;return null;case 22:case 23:return a.lanes=0,H0(n,a,o);case 24:zr(a,vn,n.memoizedState.cache)}return dr(n,a,o)}function Z0(n,a,o){if(n!==null)if(n.memoizedProps!==a.pendingProps)Tn=!0;else{if(!$f(n,o)&&(a.flags&128)===0)return Tn=!1,vE(n,a,o);Tn=(n.flags&131072)!==0}else Tn=!1,Ue&&(a.flags&1048576)!==0&&Tg(a,Xl,a.index);switch(a.lanes=0,a.tag){case 16:t:{n=a.pendingProps;var u=a.elementType,p=u._init;if(u=p(u._payload),a.type=u,typeof u=="function")lf(u)?(n=Na(u,n),a.tag=1,a=q0(null,a,u,n,o)):(a.tag=0,a=Wf(null,a,u,n,o));else{if(u!=null){if(p=u.$$typeof,p===E){a.tag=11,a=F0(null,a,u,n,o);break t}else if(p===P){a.tag=14,a=B0(null,a,u,n,o);break t}}throw a=K(u)||u,Error(r(306,a,""))}}return a;case 0:return Wf(n,a,a.type,a.pendingProps,o);case 1:return u=a.type,p=Na(u,a.pendingProps),q0(n,a,u,p,o);case 3:t:{if(Lt(a,a.stateNode.containerInfo),n===null)throw Error(r(387));u=a.pendingProps;var _=a.memoizedState;p=_.element,Mf(n,a),Do(a,u,null,o);var U=a.memoizedState;if(u=U.cache,zr(a,vn,u),u!==_.cache&&gf(a,[vn],o,!0),Co(),u=U.element,_.isDehydrated)if(_={element:u,isDehydrated:!1,cache:U.cache},a.updateQueue.baseState=_,a.memoizedState=_,a.flags&256){a=X0(n,a,u,o);break t}else if(u!==p){p=_i(Error(r(424)),a),Mo(p),a=X0(n,a,u,o);break t}else{switch(n=a.stateNode.containerInfo,n.nodeType){case 9:n=n.body;break;default:n=n.nodeName==="HTML"?n.ownerDocument.body:n}for(rn=Li(n.firstChild),Gn=a,Ue=!0,Ra=null,Bi=!0,o=R0(a,null,u,o),a.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling}else{if(So(),u===p){a=dr(n,a,o);break t}Nn(n,a,u,o)}a=a.child}return a;case 26:return fu(n,a),n===null?(o=$_(a.type,null,a.pendingProps,null))?a.memoizedState=o:Ue||(o=a.type,n=a.pendingProps,u=Au(gt.current).createElement(o),u[gn]=a,u[Ln]=n,On(u,o,n),fn(u),a.stateNode=u):a.memoizedState=$_(a.type,n.memoizedProps,a.pendingProps,n.memoizedState),null;case 27:return Gt(a),n===null&&Ue&&(u=a.stateNode=K_(a.type,a.pendingProps,gt.current),Gn=a,Bi=!0,p=rn,Qr(a.type)?(Nh=p,rn=Li(u.firstChild)):rn=p),Nn(n,a,a.pendingProps.children,o),fu(n,a),n===null&&(a.flags|=4194304),a.child;case 5:return n===null&&Ue&&((p=u=rn)&&(u=WE(u,a.type,a.pendingProps,Bi),u!==null?(a.stateNode=u,Gn=a,rn=Li(u.firstChild),Bi=!1,p=!0):p=!1),p||wa(a)),Gt(a),p=a.type,_=a.pendingProps,U=n!==null?n.memoizedProps:null,u=_.children,Ch(p,_)?u=null:U!==null&&Ch(p,U)&&(a.flags|=32),a.memoizedState!==null&&(p=wf(n,a,cE,null,null,o),Jo._currentValue=p),fu(n,a),Nn(n,a,u,o),a.child;case 6:return n===null&&Ue&&((n=o=rn)&&(o=jE(o,a.pendingProps,Bi),o!==null?(a.stateNode=o,Gn=a,rn=null,n=!0):n=!1),n||wa(a)),null;case 13:return W0(n,a,o);case 4:return Lt(a,a.stateNode.containerInfo),u=a.pendingProps,n===null?a.child=gs(a,null,u,o):Nn(n,a,u,o),a.child;case 11:return F0(n,a,a.type,a.pendingProps,o);case 7:return Nn(n,a,a.pendingProps,o),a.child;case 8:return Nn(n,a,a.pendingProps.children,o),a.child;case 12:return Nn(n,a,a.pendingProps.children,o),a.child;case 10:return u=a.pendingProps,zr(a,a.type,u.value),Nn(n,a,u.children,o),a.child;case 9:return p=a.type._context,u=a.pendingProps.children,Da(a),p=Fn(p),u=u(p),a.flags|=1,Nn(n,a,u,o),a.child;case 14:return B0(n,a,a.type,a.pendingProps,o);case 15:return k0(n,a,a.type,a.pendingProps,o);case 19:return Y0(n,a,o);case 31:return u=a.pendingProps,o=a.mode,u={mode:u.mode,children:u.children},n===null?(o=hu(u,o),o.ref=a.ref,a.child=o,o.return=a,a=o):(o=sr(n.child,u),o.ref=a.ref,a.child=o,o.return=a,a=o),a;case 22:return H0(n,a,o);case 24:return Da(a),u=Fn(vn),n===null?(p=yf(),p===null&&(p=Ze,_=_f(),p.pooledCache=_,_.refCount++,_!==null&&(p.pooledCacheLanes|=o),p=_),a.memoizedState={parent:u,cache:p},Sf(a),zr(a,vn,p)):((n.lanes&o)!==0&&(Mf(n,a),Do(a,null,null,o),Co()),p=n.memoizedState,_=a.memoizedState,p.parent!==u?(p={parent:u,cache:u},a.memoizedState=p,a.lanes===0&&(a.memoizedState=a.updateQueue.baseState=p),zr(a,vn,u)):(u=_.cache,zr(a,vn,u),u!==p.cache&&gf(a,[vn],o,!0))),Nn(n,a,a.pendingProps.children,o),a.child;case 29:throw a.pendingProps}throw Error(r(156,a.tag))}function pr(n){n.flags|=4}function K0(n,a){if(a.type!=="stylesheet"||(a.state.loading&4)!==0)n.flags&=-16777217;else if(n.flags|=16777216,!rv(a)){if(a=Si.current,a!==null&&((be&4194048)===be?ki!==null:(be&62914560)!==be&&(be&536870912)===0||a!==ki))throw Ro=xf,Ng;n.flags|=8192}}function du(n,a){a!==null&&(n.flags|=4),n.flags&16384&&(a=n.tag!==22?zt():536870912,n.lanes|=a,xs|=a)}function Io(n,a){if(!Ue)switch(n.tailMode){case"hidden":a=n.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n.tail=null:o.sibling=null;break;case"collapsed":o=n.tail;for(var u=null;o!==null;)o.alternate!==null&&(u=o),o=o.sibling;u===null?a||n.tail===null?n.tail=null:n.tail.sibling=null:u.sibling=null}}function tn(n){var a=n.alternate!==null&&n.alternate.child===n.child,o=0,u=0;if(a)for(var p=n.child;p!==null;)o|=p.lanes|p.childLanes,u|=p.subtreeFlags&65011712,u|=p.flags&65011712,p.return=n,p=p.sibling;else for(p=n.child;p!==null;)o|=p.lanes|p.childLanes,u|=p.subtreeFlags,u|=p.flags,p.return=n,p=p.sibling;return n.subtreeFlags|=u,n.childLanes=o,a}function yE(n,a,o){var u=a.pendingProps;switch(hf(a),a.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tn(a),null;case 1:return tn(a),null;case 3:return o=a.stateNode,u=null,n!==null&&(u=n.memoizedState.cache),a.memoizedState.cache!==u&&(a.flags|=2048),cr(vn),ie(),o.pendingContext&&(o.context=o.pendingContext,o.pendingContext=null),(n===null||n.child===null)&&(xo(a)?pr(a):n===null||n.memoizedState.isDehydrated&&(a.flags&256)===0||(a.flags|=1024,wg())),tn(a),null;case 26:return o=a.memoizedState,n===null?(pr(a),o!==null?(tn(a),K0(a,o)):(tn(a),a.flags&=-16777217)):o?o!==n.memoizedState?(pr(a),tn(a),K0(a,o)):(tn(a),a.flags&=-16777217):(n.memoizedProps!==u&&pr(a),tn(a),a.flags&=-16777217),null;case 27:Pe(a),o=gt.current;var p=a.type;if(n!==null&&a.stateNode!=null)n.memoizedProps!==u&&pr(a);else{if(!u){if(a.stateNode===null)throw Error(r(166));return tn(a),null}n=tt.current,xo(a)?Ag(a):(n=K_(p,u,o),a.stateNode=n,pr(a))}return tn(a),null;case 5:if(Pe(a),o=a.type,n!==null&&a.stateNode!=null)n.memoizedProps!==u&&pr(a);else{if(!u){if(a.stateNode===null)throw Error(r(166));return tn(a),null}if(n=tt.current,xo(a))Ag(a);else{switch(p=Au(gt.current),n){case 1:n=p.createElementNS("http://www.w3.org/2000/svg",o);break;case 2:n=p.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;default:switch(o){case"svg":n=p.createElementNS("http://www.w3.org/2000/svg",o);break;case"math":n=p.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;case"script":n=p.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild);break;case"select":n=typeof u.is=="string"?p.createElement("select",{is:u.is}):p.createElement("select"),u.multiple?n.multiple=!0:u.size&&(n.size=u.size);break;default:n=typeof u.is=="string"?p.createElement(o,{is:u.is}):p.createElement(o)}}n[gn]=a,n[Ln]=u;t:for(p=a.child;p!==null;){if(p.tag===5||p.tag===6)n.appendChild(p.stateNode);else if(p.tag!==4&&p.tag!==27&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===a)break t;for(;p.sibling===null;){if(p.return===null||p.return===a)break t;p=p.return}p.sibling.return=p.return,p=p.sibling}a.stateNode=n;t:switch(On(n,o,u),o){case"button":case"input":case"select":case"textarea":n=!!u.autoFocus;break t;case"img":n=!0;break t;default:n=!1}n&&pr(a)}}return tn(a),a.flags&=-16777217,null;case 6:if(n&&a.stateNode!=null)n.memoizedProps!==u&&pr(a);else{if(typeof u!="string"&&a.stateNode===null)throw Error(r(166));if(n=gt.current,xo(a)){if(n=a.stateNode,o=a.memoizedProps,u=null,p=Gn,p!==null)switch(p.tag){case 27:case 5:u=p.memoizedProps}n[gn]=a,n=!!(n.nodeValue===o||u!==null&&u.suppressHydrationWarning===!0||G_(n.nodeValue,o)),n||wa(a)}else n=Au(n).createTextNode(u),n[gn]=a,a.stateNode=n}return tn(a),null;case 13:if(u=a.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(p=xo(a),u!==null&&u.dehydrated!==null){if(n===null){if(!p)throw Error(r(318));if(p=a.memoizedState,p=p!==null?p.dehydrated:null,!p)throw Error(r(317));p[gn]=a}else So(),(a.flags&128)===0&&(a.memoizedState=null),a.flags|=4;tn(a),p=!1}else p=wg(),n!==null&&n.memoizedState!==null&&(n.memoizedState.hydrationErrors=p),p=!0;if(!p)return a.flags&256?(hr(a),a):(hr(a),null)}if(hr(a),(a.flags&128)!==0)return a.lanes=o,a;if(o=u!==null,n=n!==null&&n.memoizedState!==null,o){u=a.child,p=null,u.alternate!==null&&u.alternate.memoizedState!==null&&u.alternate.memoizedState.cachePool!==null&&(p=u.alternate.memoizedState.cachePool.pool);var _=null;u.memoizedState!==null&&u.memoizedState.cachePool!==null&&(_=u.memoizedState.cachePool.pool),_!==p&&(u.flags|=2048)}return o!==n&&o&&(a.child.flags|=8192),du(a,a.updateQueue),tn(a),null;case 4:return ie(),n===null&&bh(a.stateNode.containerInfo),tn(a),null;case 10:return cr(a.type),tn(a),null;case 19:if(ft(yn),p=a.memoizedState,p===null)return tn(a),null;if(u=(a.flags&128)!==0,_=p.rendering,_===null)if(u)Io(p,!1);else{if(an!==0||n!==null&&(n.flags&128)!==0)for(n=a.child;n!==null;){if(_=lu(n),_!==null){for(a.flags|=128,Io(p,!1),n=_.updateQueue,a.updateQueue=n,du(a,n),a.subtreeFlags=0,n=o,o=a.child;o!==null;)bg(o,n),o=o.sibling;return B(yn,yn.current&1|2),a.child}n=n.sibling}p.tail!==null&&re()>gu&&(a.flags|=128,u=!0,Io(p,!1),a.lanes=4194304)}else{if(!u)if(n=lu(_),n!==null){if(a.flags|=128,u=!0,n=n.updateQueue,a.updateQueue=n,du(a,n),Io(p,!0),p.tail===null&&p.tailMode==="hidden"&&!_.alternate&&!Ue)return tn(a),null}else 2*re()-p.renderingStartTime>gu&&o!==536870912&&(a.flags|=128,u=!0,Io(p,!1),a.lanes=4194304);p.isBackwards?(_.sibling=a.child,a.child=_):(n=p.last,n!==null?n.sibling=_:a.child=_,p.last=_)}return p.tail!==null?(a=p.tail,p.rendering=a,p.tail=a.sibling,p.renderingStartTime=re(),a.sibling=null,n=yn.current,B(yn,u?n&1|2:n&1),a):(tn(a),null);case 22:case 23:return hr(a),Af(),u=a.memoizedState!==null,n!==null?n.memoizedState!==null!==u&&(a.flags|=8192):u&&(a.flags|=8192),u?(o&536870912)!==0&&(a.flags&128)===0&&(tn(a),a.subtreeFlags&6&&(a.flags|=8192)):tn(a),o=a.updateQueue,o!==null&&du(a,o.retryQueue),o=null,n!==null&&n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),u=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(u=a.memoizedState.cachePool.pool),u!==o&&(a.flags|=2048),n!==null&&ft(La),null;case 24:return o=null,n!==null&&(o=n.memoizedState.cache),a.memoizedState.cache!==o&&(a.flags|=2048),cr(vn),tn(a),null;case 25:return null;case 30:return null}throw Error(r(156,a.tag))}function xE(n,a){switch(hf(a),a.tag){case 1:return n=a.flags,n&65536?(a.flags=n&-65537|128,a):null;case 3:return cr(vn),ie(),n=a.flags,(n&65536)!==0&&(n&128)===0?(a.flags=n&-65537|128,a):null;case 26:case 27:case 5:return Pe(a),null;case 13:if(hr(a),n=a.memoizedState,n!==null&&n.dehydrated!==null){if(a.alternate===null)throw Error(r(340));So()}return n=a.flags,n&65536?(a.flags=n&-65537|128,a):null;case 19:return ft(yn),null;case 4:return ie(),null;case 10:return cr(a.type),null;case 22:case 23:return hr(a),Af(),n!==null&&ft(La),n=a.flags,n&65536?(a.flags=n&-65537|128,a):null;case 24:return cr(vn),null;case 25:return null;default:return null}}function Q0(n,a){switch(hf(a),a.tag){case 3:cr(vn),ie();break;case 26:case 27:case 5:Pe(a);break;case 4:ie();break;case 13:hr(a);break;case 19:ft(yn);break;case 10:cr(a.type);break;case 22:case 23:hr(a),Af(),n!==null&&ft(La);break;case 24:cr(vn)}}function Fo(n,a){try{var o=a.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var p=u.next;o=p;do{if((o.tag&n)===n){u=void 0;var _=o.create,U=o.inst;u=_(),U.destroy=u}o=o.next}while(o!==p)}}catch(z){We(a,a.return,z)}}function Gr(n,a,o){try{var u=a.updateQueue,p=u!==null?u.lastEffect:null;if(p!==null){var _=p.next;u=_;do{if((u.tag&n)===n){var U=u.inst,z=U.destroy;if(z!==void 0){U.destroy=void 0,p=a;var G=o,st=z;try{st()}catch(_t){We(p,G,_t)}}}u=u.next}while(u!==_)}}catch(_t){We(a,a.return,_t)}}function J0(n){var a=n.updateQueue;if(a!==null){var o=n.stateNode;try{Bg(a,o)}catch(u){We(n,n.return,u)}}}function $0(n,a,o){o.props=Na(n.type,n.memoizedProps),o.state=n.memoizedState;try{o.componentWillUnmount()}catch(u){We(n,a,u)}}function Bo(n,a){try{var o=n.ref;if(o!==null){switch(n.tag){case 26:case 27:case 5:var u=n.stateNode;break;case 30:u=n.stateNode;break;default:u=n.stateNode}typeof o=="function"?n.refCleanup=o(u):o.current=u}}catch(p){We(n,a,p)}}function Hi(n,a){var o=n.ref,u=n.refCleanup;if(o!==null)if(typeof u=="function")try{u()}catch(p){We(n,a,p)}finally{n.refCleanup=null,n=n.alternate,n!=null&&(n.refCleanup=null)}else if(typeof o=="function")try{o(null)}catch(p){We(n,a,p)}else o.current=null}function t_(n){var a=n.type,o=n.memoizedProps,u=n.stateNode;try{t:switch(a){case"button":case"input":case"select":case"textarea":o.autoFocus&&u.focus();break t;case"img":o.src?u.src=o.src:o.srcSet&&(u.srcset=o.srcSet)}}catch(p){We(n,n.return,p)}}function th(n,a,o){try{var u=n.stateNode;HE(u,n.type,o,a),u[Ln]=a}catch(p){We(n,n.return,p)}}function e_(n){return n.tag===5||n.tag===3||n.tag===26||n.tag===27&&Qr(n.type)||n.tag===4}function eh(n){t:for(;;){for(;n.sibling===null;){if(n.return===null||e_(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.tag===27&&Qr(n.type)||n.flags&2||n.child===null||n.tag===4)continue t;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function nh(n,a,o){var u=n.tag;if(u===5||u===6)n=n.stateNode,a?(o.nodeType===9?o.body:o.nodeName==="HTML"?o.ownerDocument.body:o).insertBefore(n,a):(a=o.nodeType===9?o.body:o.nodeName==="HTML"?o.ownerDocument.body:o,a.appendChild(n),o=o._reactRootContainer,o!=null||a.onclick!==null||(a.onclick=Tu));else if(u!==4&&(u===27&&Qr(n.type)&&(o=n.stateNode,a=null),n=n.child,n!==null))for(nh(n,a,o),n=n.sibling;n!==null;)nh(n,a,o),n=n.sibling}function pu(n,a,o){var u=n.tag;if(u===5||u===6)n=n.stateNode,a?o.insertBefore(n,a):o.appendChild(n);else if(u!==4&&(u===27&&Qr(n.type)&&(o=n.stateNode),n=n.child,n!==null))for(pu(n,a,o),n=n.sibling;n!==null;)pu(n,a,o),n=n.sibling}function n_(n){var a=n.stateNode,o=n.memoizedProps;try{for(var u=n.type,p=a.attributes;p.length;)a.removeAttributeNode(p[0]);On(a,u,o),a[gn]=n,a[Ln]=o}catch(_){We(n,n.return,_)}}var mr=!1,on=!1,ih=!1,i_=typeof WeakSet=="function"?WeakSet:Set,An=null;function SE(n,a){if(n=n.containerInfo,Rh=Uu,n=pg(n),tf(n)){if("selectionStart"in n)var o={start:n.selectionStart,end:n.selectionEnd};else t:{o=(o=n.ownerDocument)&&o.defaultView||window;var u=o.getSelection&&o.getSelection();if(u&&u.rangeCount!==0){o=u.anchorNode;var p=u.anchorOffset,_=u.focusNode;u=u.focusOffset;try{o.nodeType,_.nodeType}catch{o=null;break t}var U=0,z=-1,G=-1,st=0,_t=0,Et=n,ut=null;e:for(;;){for(var ct;Et!==o||p!==0&&Et.nodeType!==3||(z=U+p),Et!==_||u!==0&&Et.nodeType!==3||(G=U+u),Et.nodeType===3&&(U+=Et.nodeValue.length),(ct=Et.firstChild)!==null;)ut=Et,Et=ct;for(;;){if(Et===n)break e;if(ut===o&&++st===p&&(z=U),ut===_&&++_t===u&&(G=U),(ct=Et.nextSibling)!==null)break;Et=ut,ut=Et.parentNode}Et=ct}o=z===-1||G===-1?null:{start:z,end:G}}else o=null}o=o||{start:0,end:0}}else o=null;for(wh={focusedElem:n,selectionRange:o},Uu=!1,An=a;An!==null;)if(a=An,n=a.child,(a.subtreeFlags&1024)!==0&&n!==null)n.return=a,An=n;else for(;An!==null;){switch(a=An,_=a.alternate,n=a.flags,a.tag){case 0:break;case 11:case 15:break;case 1:if((n&1024)!==0&&_!==null){n=void 0,o=a,p=_.memoizedProps,_=_.memoizedState,u=o.stateNode;try{var ne=Na(o.type,p,o.elementType===o.type);n=u.getSnapshotBeforeUpdate(ne,_),u.__reactInternalSnapshotBeforeUpdate=n}catch($t){We(o,o.return,$t)}}break;case 3:if((n&1024)!==0){if(n=a.stateNode.containerInfo,o=n.nodeType,o===9)Lh(n);else if(o===1)switch(n.nodeName){case"HEAD":case"HTML":case"BODY":Lh(n);break;default:n.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((n&1024)!==0)throw Error(r(163))}if(n=a.sibling,n!==null){n.return=a.return,An=n;break}An=a.return}}function r_(n,a,o){var u=o.flags;switch(o.tag){case 0:case 11:case 15:qr(n,o),u&4&&Fo(5,o);break;case 1:if(qr(n,o),u&4)if(n=o.stateNode,a===null)try{n.componentDidMount()}catch(U){We(o,o.return,U)}else{var p=Na(o.type,a.memoizedProps);a=a.memoizedState;try{n.componentDidUpdate(p,a,n.__reactInternalSnapshotBeforeUpdate)}catch(U){We(o,o.return,U)}}u&64&&J0(o),u&512&&Bo(o,o.return);break;case 3:if(qr(n,o),u&64&&(n=o.updateQueue,n!==null)){if(a=null,o.child!==null)switch(o.child.tag){case 27:case 5:a=o.child.stateNode;break;case 1:a=o.child.stateNode}try{Bg(n,a)}catch(U){We(o,o.return,U)}}break;case 27:a===null&&u&4&&n_(o);case 26:case 5:qr(n,o),a===null&&u&4&&t_(o),u&512&&Bo(o,o.return);break;case 12:qr(n,o);break;case 13:qr(n,o),u&4&&o_(n,o),u&64&&(n=o.memoizedState,n!==null&&(n=n.dehydrated,n!==null&&(o=DE.bind(null,o),YE(n,o))));break;case 22:if(u=o.memoizedState!==null||mr,!u){a=a!==null&&a.memoizedState!==null||on,p=mr;var _=on;mr=u,(on=a)&&!_?Xr(n,o,(o.subtreeFlags&8772)!==0):qr(n,o),mr=p,on=_}break;case 30:break;default:qr(n,o)}}function a_(n){var a=n.alternate;a!==null&&(n.alternate=null,a_(a)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(a=n.stateNode,a!==null&&Ur(a)),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}var Je=null,Qn=!1;function gr(n,a,o){for(o=o.child;o!==null;)s_(n,a,o),o=o.sibling}function s_(n,a,o){if(St&&typeof St.onCommitFiberUnmount=="function")try{St.onCommitFiberUnmount($,o)}catch{}switch(o.tag){case 26:on||Hi(o,a),gr(n,a,o),o.memoizedState?o.memoizedState.count--:o.stateNode&&(o=o.stateNode,o.parentNode.removeChild(o));break;case 27:on||Hi(o,a);var u=Je,p=Qn;Qr(o.type)&&(Je=o.stateNode,Qn=!1),gr(n,a,o),Yo(o.stateNode),Je=u,Qn=p;break;case 5:on||Hi(o,a);case 6:if(u=Je,p=Qn,Je=null,gr(n,a,o),Je=u,Qn=p,Je!==null)if(Qn)try{(Je.nodeType===9?Je.body:Je.nodeName==="HTML"?Je.ownerDocument.body:Je).removeChild(o.stateNode)}catch(_){We(o,a,_)}else try{Je.removeChild(o.stateNode)}catch(_){We(o,a,_)}break;case 18:Je!==null&&(Qn?(n=Je,Y_(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,o.stateNode),nl(n)):Y_(Je,o.stateNode));break;case 4:u=Je,p=Qn,Je=o.stateNode.containerInfo,Qn=!0,gr(n,a,o),Je=u,Qn=p;break;case 0:case 11:case 14:case 15:on||Gr(2,o,a),on||Gr(4,o,a),gr(n,a,o);break;case 1:on||(Hi(o,a),u=o.stateNode,typeof u.componentWillUnmount=="function"&&$0(o,a,u)),gr(n,a,o);break;case 21:gr(n,a,o);break;case 22:on=(u=on)||o.memoizedState!==null,gr(n,a,o),on=u;break;default:gr(n,a,o)}}function o_(n,a){if(a.memoizedState===null&&(n=a.alternate,n!==null&&(n=n.memoizedState,n!==null&&(n=n.dehydrated,n!==null))))try{nl(n)}catch(o){We(a,a.return,o)}}function ME(n){switch(n.tag){case 13:case 19:var a=n.stateNode;return a===null&&(a=n.stateNode=new i_),a;case 22:return n=n.stateNode,a=n._retryCache,a===null&&(a=n._retryCache=new i_),a;default:throw Error(r(435,n.tag))}}function rh(n,a){var o=ME(n);a.forEach(function(u){var p=LE.bind(null,n,u);o.has(u)||(o.add(u),u.then(p,p))})}function si(n,a){var o=a.deletions;if(o!==null)for(var u=0;u<o.length;u++){var p=o[u],_=n,U=a,z=U;t:for(;z!==null;){switch(z.tag){case 27:if(Qr(z.type)){Je=z.stateNode,Qn=!1;break t}break;case 5:Je=z.stateNode,Qn=!1;break t;case 3:case 4:Je=z.stateNode.containerInfo,Qn=!0;break t}z=z.return}if(Je===null)throw Error(r(160));s_(_,U,p),Je=null,Qn=!1,_=p.alternate,_!==null&&(_.return=null),p.return=null}if(a.subtreeFlags&13878)for(a=a.child;a!==null;)l_(a,n),a=a.sibling}var Di=null;function l_(n,a){var o=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:si(a,n),oi(n),u&4&&(Gr(3,n,n.return),Fo(3,n),Gr(5,n,n.return));break;case 1:si(a,n),oi(n),u&512&&(on||o===null||Hi(o,o.return)),u&64&&mr&&(n=n.updateQueue,n!==null&&(u=n.callbacks,u!==null&&(o=n.shared.hiddenCallbacks,n.shared.hiddenCallbacks=o===null?u:o.concat(u))));break;case 26:var p=Di;if(si(a,n),oi(n),u&512&&(on||o===null||Hi(o,o.return)),u&4){var _=o!==null?o.memoizedState:null;if(u=n.memoizedState,o===null)if(u===null)if(n.stateNode===null){t:{u=n.type,o=n.memoizedProps,p=p.ownerDocument||p;e:switch(u){case"title":_=p.getElementsByTagName("title")[0],(!_||_[Lr]||_[gn]||_.namespaceURI==="http://www.w3.org/2000/svg"||_.hasAttribute("itemprop"))&&(_=p.createElement(u),p.head.insertBefore(_,p.querySelector("head > title"))),On(_,u,o),_[gn]=n,fn(_),u=_;break t;case"link":var U=nv("link","href",p).get(u+(o.href||""));if(U){for(var z=0;z<U.length;z++)if(_=U[z],_.getAttribute("href")===(o.href==null||o.href===""?null:o.href)&&_.getAttribute("rel")===(o.rel==null?null:o.rel)&&_.getAttribute("title")===(o.title==null?null:o.title)&&_.getAttribute("crossorigin")===(o.crossOrigin==null?null:o.crossOrigin)){U.splice(z,1);break e}}_=p.createElement(u),On(_,u,o),p.head.appendChild(_);break;case"meta":if(U=nv("meta","content",p).get(u+(o.content||""))){for(z=0;z<U.length;z++)if(_=U[z],_.getAttribute("content")===(o.content==null?null:""+o.content)&&_.getAttribute("name")===(o.name==null?null:o.name)&&_.getAttribute("property")===(o.property==null?null:o.property)&&_.getAttribute("http-equiv")===(o.httpEquiv==null?null:o.httpEquiv)&&_.getAttribute("charset")===(o.charSet==null?null:o.charSet)){U.splice(z,1);break e}}_=p.createElement(u),On(_,u,o),p.head.appendChild(_);break;default:throw Error(r(468,u))}_[gn]=n,fn(_),u=_}n.stateNode=u}else iv(p,n.type,n.stateNode);else n.stateNode=ev(p,u,n.memoizedProps);else _!==u?(_===null?o.stateNode!==null&&(o=o.stateNode,o.parentNode.removeChild(o)):_.count--,u===null?iv(p,n.type,n.stateNode):ev(p,u,n.memoizedProps)):u===null&&n.stateNode!==null&&th(n,n.memoizedProps,o.memoizedProps)}break;case 27:si(a,n),oi(n),u&512&&(on||o===null||Hi(o,o.return)),o!==null&&u&4&&th(n,n.memoizedProps,o.memoizedProps);break;case 5:if(si(a,n),oi(n),u&512&&(on||o===null||Hi(o,o.return)),n.flags&32){p=n.stateNode;try{Fi(p,"")}catch(ct){We(n,n.return,ct)}}u&4&&n.stateNode!=null&&(p=n.memoizedProps,th(n,p,o!==null?o.memoizedProps:p)),u&1024&&(ih=!0);break;case 6:if(si(a,n),oi(n),u&4){if(n.stateNode===null)throw Error(r(162));u=n.memoizedProps,o=n.stateNode;try{o.nodeValue=u}catch(ct){We(n,n.return,ct)}}break;case 3:if(Cu=null,p=Di,Di=Ru(a.containerInfo),si(a,n),Di=p,oi(n),u&4&&o!==null&&o.memoizedState.isDehydrated)try{nl(a.containerInfo)}catch(ct){We(n,n.return,ct)}ih&&(ih=!1,u_(n));break;case 4:u=Di,Di=Ru(n.stateNode.containerInfo),si(a,n),oi(n),Di=u;break;case 12:si(a,n),oi(n);break;case 13:si(a,n),oi(n),n.child.flags&8192&&n.memoizedState!==null!=(o!==null&&o.memoizedState!==null)&&(ch=re()),u&4&&(u=n.updateQueue,u!==null&&(n.updateQueue=null,rh(n,u)));break;case 22:p=n.memoizedState!==null;var G=o!==null&&o.memoizedState!==null,st=mr,_t=on;if(mr=st||p,on=_t||G,si(a,n),on=_t,mr=st,oi(n),u&8192)t:for(a=n.stateNode,a._visibility=p?a._visibility&-2:a._visibility|1,p&&(o===null||G||mr||on||Pa(n)),o=null,a=n;;){if(a.tag===5||a.tag===26){if(o===null){G=o=a;try{if(_=G.stateNode,p)U=_.style,typeof U.setProperty=="function"?U.setProperty("display","none","important"):U.display="none";else{z=G.stateNode;var Et=G.memoizedProps.style,ut=Et!=null&&Et.hasOwnProperty("display")?Et.display:null;z.style.display=ut==null||typeof ut=="boolean"?"":(""+ut).trim()}}catch(ct){We(G,G.return,ct)}}}else if(a.tag===6){if(o===null){G=a;try{G.stateNode.nodeValue=p?"":G.memoizedProps}catch(ct){We(G,G.return,ct)}}}else if((a.tag!==22&&a.tag!==23||a.memoizedState===null||a===n)&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===n)break t;for(;a.sibling===null;){if(a.return===null||a.return===n)break t;o===a&&(o=null),a=a.return}o===a&&(o=null),a.sibling.return=a.return,a=a.sibling}u&4&&(u=n.updateQueue,u!==null&&(o=u.retryQueue,o!==null&&(u.retryQueue=null,rh(n,o))));break;case 19:si(a,n),oi(n),u&4&&(u=n.updateQueue,u!==null&&(n.updateQueue=null,rh(n,u)));break;case 30:break;case 21:break;default:si(a,n),oi(n)}}function oi(n){var a=n.flags;if(a&2){try{for(var o,u=n.return;u!==null;){if(e_(u)){o=u;break}u=u.return}if(o==null)throw Error(r(160));switch(o.tag){case 27:var p=o.stateNode,_=eh(n);pu(n,_,p);break;case 5:var U=o.stateNode;o.flags&32&&(Fi(U,""),o.flags&=-33);var z=eh(n);pu(n,z,U);break;case 3:case 4:var G=o.stateNode.containerInfo,st=eh(n);nh(n,st,G);break;default:throw Error(r(161))}}catch(_t){We(n,n.return,_t)}n.flags&=-3}a&4096&&(n.flags&=-4097)}function u_(n){if(n.subtreeFlags&1024)for(n=n.child;n!==null;){var a=n;u_(a),a.tag===5&&a.flags&1024&&a.stateNode.reset(),n=n.sibling}}function qr(n,a){if(a.subtreeFlags&8772)for(a=a.child;a!==null;)r_(n,a.alternate,a),a=a.sibling}function Pa(n){for(n=n.child;n!==null;){var a=n;switch(a.tag){case 0:case 11:case 14:case 15:Gr(4,a,a.return),Pa(a);break;case 1:Hi(a,a.return);var o=a.stateNode;typeof o.componentWillUnmount=="function"&&$0(a,a.return,o),Pa(a);break;case 27:Yo(a.stateNode);case 26:case 5:Hi(a,a.return),Pa(a);break;case 22:a.memoizedState===null&&Pa(a);break;case 30:Pa(a);break;default:Pa(a)}n=n.sibling}}function Xr(n,a,o){for(o=o&&(a.subtreeFlags&8772)!==0,a=a.child;a!==null;){var u=a.alternate,p=n,_=a,U=_.flags;switch(_.tag){case 0:case 11:case 15:Xr(p,_,o),Fo(4,_);break;case 1:if(Xr(p,_,o),u=_,p=u.stateNode,typeof p.componentDidMount=="function")try{p.componentDidMount()}catch(st){We(u,u.return,st)}if(u=_,p=u.updateQueue,p!==null){var z=u.stateNode;try{var G=p.shared.hiddenCallbacks;if(G!==null)for(p.shared.hiddenCallbacks=null,p=0;p<G.length;p++)Fg(G[p],z)}catch(st){We(u,u.return,st)}}o&&U&64&&J0(_),Bo(_,_.return);break;case 27:n_(_);case 26:case 5:Xr(p,_,o),o&&u===null&&U&4&&t_(_),Bo(_,_.return);break;case 12:Xr(p,_,o);break;case 13:Xr(p,_,o),o&&U&4&&o_(p,_);break;case 22:_.memoizedState===null&&Xr(p,_,o),Bo(_,_.return);break;case 30:break;default:Xr(p,_,o)}a=a.sibling}}function ah(n,a){var o=null;n!==null&&n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),n=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(n=a.memoizedState.cachePool.pool),n!==o&&(n!=null&&n.refCount++,o!=null&&bo(o))}function sh(n,a){n=null,a.alternate!==null&&(n=a.alternate.memoizedState.cache),a=a.memoizedState.cache,a!==n&&(a.refCount++,n!=null&&bo(n))}function Vi(n,a,o,u){if(a.subtreeFlags&10256)for(a=a.child;a!==null;)c_(n,a,o,u),a=a.sibling}function c_(n,a,o,u){var p=a.flags;switch(a.tag){case 0:case 11:case 15:Vi(n,a,o,u),p&2048&&Fo(9,a);break;case 1:Vi(n,a,o,u);break;case 3:Vi(n,a,o,u),p&2048&&(n=null,a.alternate!==null&&(n=a.alternate.memoizedState.cache),a=a.memoizedState.cache,a!==n&&(a.refCount++,n!=null&&bo(n)));break;case 12:if(p&2048){Vi(n,a,o,u),n=a.stateNode;try{var _=a.memoizedProps,U=_.id,z=_.onPostCommit;typeof z=="function"&&z(U,a.alternate===null?"mount":"update",n.passiveEffectDuration,-0)}catch(G){We(a,a.return,G)}}else Vi(n,a,o,u);break;case 13:Vi(n,a,o,u);break;case 23:break;case 22:_=a.stateNode,U=a.alternate,a.memoizedState!==null?_._visibility&2?Vi(n,a,o,u):ko(n,a):_._visibility&2?Vi(n,a,o,u):(_._visibility|=2,_s(n,a,o,u,(a.subtreeFlags&10256)!==0)),p&2048&&ah(U,a);break;case 24:Vi(n,a,o,u),p&2048&&sh(a.alternate,a);break;default:Vi(n,a,o,u)}}function _s(n,a,o,u,p){for(p=p&&(a.subtreeFlags&10256)!==0,a=a.child;a!==null;){var _=n,U=a,z=o,G=u,st=U.flags;switch(U.tag){case 0:case 11:case 15:_s(_,U,z,G,p),Fo(8,U);break;case 23:break;case 22:var _t=U.stateNode;U.memoizedState!==null?_t._visibility&2?_s(_,U,z,G,p):ko(_,U):(_t._visibility|=2,_s(_,U,z,G,p)),p&&st&2048&&ah(U.alternate,U);break;case 24:_s(_,U,z,G,p),p&&st&2048&&sh(U.alternate,U);break;default:_s(_,U,z,G,p)}a=a.sibling}}function ko(n,a){if(a.subtreeFlags&10256)for(a=a.child;a!==null;){var o=n,u=a,p=u.flags;switch(u.tag){case 22:ko(o,u),p&2048&&ah(u.alternate,u);break;case 24:ko(o,u),p&2048&&sh(u.alternate,u);break;default:ko(o,u)}a=a.sibling}}var Ho=8192;function vs(n){if(n.subtreeFlags&Ho)for(n=n.child;n!==null;)f_(n),n=n.sibling}function f_(n){switch(n.tag){case 26:vs(n),n.flags&Ho&&n.memoizedState!==null&&o1(Di,n.memoizedState,n.memoizedProps);break;case 5:vs(n);break;case 3:case 4:var a=Di;Di=Ru(n.stateNode.containerInfo),vs(n),Di=a;break;case 22:n.memoizedState===null&&(a=n.alternate,a!==null&&a.memoizedState!==null?(a=Ho,Ho=16777216,vs(n),Ho=a):vs(n));break;default:vs(n)}}function h_(n){var a=n.alternate;if(a!==null&&(n=a.child,n!==null)){a.child=null;do a=n.sibling,n.sibling=null,n=a;while(n!==null)}}function Vo(n){var a=n.deletions;if((n.flags&16)!==0){if(a!==null)for(var o=0;o<a.length;o++){var u=a[o];An=u,p_(u,n)}h_(n)}if(n.subtreeFlags&10256)for(n=n.child;n!==null;)d_(n),n=n.sibling}function d_(n){switch(n.tag){case 0:case 11:case 15:Vo(n),n.flags&2048&&Gr(9,n,n.return);break;case 3:Vo(n);break;case 12:Vo(n);break;case 22:var a=n.stateNode;n.memoizedState!==null&&a._visibility&2&&(n.return===null||n.return.tag!==13)?(a._visibility&=-3,mu(n)):Vo(n);break;default:Vo(n)}}function mu(n){var a=n.deletions;if((n.flags&16)!==0){if(a!==null)for(var o=0;o<a.length;o++){var u=a[o];An=u,p_(u,n)}h_(n)}for(n=n.child;n!==null;){switch(a=n,a.tag){case 0:case 11:case 15:Gr(8,a,a.return),mu(a);break;case 22:o=a.stateNode,o._visibility&2&&(o._visibility&=-3,mu(a));break;default:mu(a)}n=n.sibling}}function p_(n,a){for(;An!==null;){var o=An;switch(o.tag){case 0:case 11:case 15:Gr(8,o,a);break;case 23:case 22:if(o.memoizedState!==null&&o.memoizedState.cachePool!==null){var u=o.memoizedState.cachePool.pool;u!=null&&u.refCount++}break;case 24:bo(o.memoizedState.cache)}if(u=o.child,u!==null)u.return=o,An=u;else t:for(o=n;An!==null;){u=An;var p=u.sibling,_=u.return;if(a_(u),u===o){An=null;break t}if(p!==null){p.return=_,An=p;break t}An=_}}}var EE={getCacheForType:function(n){var a=Fn(vn),o=a.data.get(n);return o===void 0&&(o=n(),a.data.set(n,o)),o}},bE=typeof WeakMap=="function"?WeakMap:Map,ze=0,Ze=null,ye=null,be=0,Ie=0,li=null,Wr=!1,ys=!1,oh=!1,_r=0,an=0,jr=0,Oa=0,lh=0,Mi=0,xs=0,Go=null,Jn=null,uh=!1,ch=0,gu=1/0,_u=null,Yr=null,Pn=0,Zr=null,Ss=null,Ms=0,fh=0,hh=null,m_=null,qo=0,dh=null;function ui(){if((ze&2)!==0&&be!==0)return be&-be;if(H.T!==null){var n=us;return n!==0?n:xh()}return Ae()}function g_(){Mi===0&&(Mi=(be&536870912)===0||Ue?et():536870912);var n=Si.current;return n!==null&&(n.flags|=32),Mi}function ci(n,a,o){(n===Ze&&(Ie===2||Ie===9)||n.cancelPendingCommit!==null)&&(Es(n,0),Kr(n,be,Mi,!1)),Mt(n,o),((ze&2)===0||n!==Ze)&&(n===Ze&&((ze&2)===0&&(Oa|=o),an===4&&Kr(n,be,Mi,!1)),Gi(n))}function __(n,a,o){if((ze&6)!==0)throw Error(r(327));var u=!o&&(a&124)===0&&(a&n.expiredLanes)===0||Yt(n,a),p=u?RE(n,a):gh(n,a,!0),_=u;do{if(p===0){ys&&!u&&Kr(n,a,0,!1);break}else{if(o=n.current.alternate,_&&!TE(o)){p=gh(n,a,!1),_=!1;continue}if(p===2){if(_=a,n.errorRecoveryDisabledLanes&_)var U=0;else U=n.pendingLanes&-536870913,U=U!==0?U:U&536870912?536870912:0;if(U!==0){a=U;t:{var z=n;p=Go;var G=z.current.memoizedState.isDehydrated;if(G&&(Es(z,U).flags|=256),U=gh(z,U,!1),U!==2){if(oh&&!G){z.errorRecoveryDisabledLanes|=_,Oa|=_,p=4;break t}_=Jn,Jn=p,_!==null&&(Jn===null?Jn=_:Jn.push.apply(Jn,_))}p=U}if(_=!1,p!==2)continue}}if(p===1){Es(n,0),Kr(n,a,0,!0);break}t:{switch(u=n,_=p,_){case 0:case 1:throw Error(r(345));case 4:if((a&4194048)!==a)break;case 6:Kr(u,a,Mi,!Wr);break t;case 2:Jn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((a&62914560)===a&&(p=ch+300-re(),10<p)){if(Kr(u,a,Mi,!Wr),oe(u,0,!0)!==0)break t;u.timeoutHandle=W_(v_.bind(null,u,o,Jn,_u,uh,a,Mi,Oa,xs,Wr,_,2,-0,0),p);break t}v_(u,o,Jn,_u,uh,a,Mi,Oa,xs,Wr,_,0,-0,0)}}break}while(!0);Gi(n)}function v_(n,a,o,u,p,_,U,z,G,st,_t,Et,ut,ct){if(n.timeoutHandle=-1,Et=a.subtreeFlags,(Et&8192||(Et&16785408)===16785408)&&(Qo={stylesheets:null,count:0,unsuspend:s1},f_(a),Et=l1(),Et!==null)){n.cancelPendingCommit=Et(T_.bind(null,n,a,_,o,u,p,U,z,G,_t,1,ut,ct)),Kr(n,_,U,!st);return}T_(n,a,_,o,u,p,U,z,G)}function TE(n){for(var a=n;;){var o=a.tag;if((o===0||o===11||o===15)&&a.flags&16384&&(o=a.updateQueue,o!==null&&(o=o.stores,o!==null)))for(var u=0;u<o.length;u++){var p=o[u],_=p.getSnapshot;p=p.value;try{if(!ri(_(),p))return!1}catch{return!1}}if(o=a.child,a.subtreeFlags&16384&&o!==null)o.return=a,a=o;else{if(a===n)break;for(;a.sibling===null;){if(a.return===null||a.return===n)return!0;a=a.return}a.sibling.return=a.return,a=a.sibling}}return!0}function Kr(n,a,o,u){a&=~lh,a&=~Oa,n.suspendedLanes|=a,n.pingedLanes&=~a,u&&(n.warmLanes|=a),u=n.expirationTimes;for(var p=a;0<p;){var _=31-Tt(p),U=1<<_;u[_]=-1,p&=~U}o!==0&&It(n,o,a)}function vu(){return(ze&6)===0?(Xo(0),!1):!0}function ph(){if(ye!==null){if(Ie===0)var n=ye.return;else n=ye,ur=Ca=null,Lf(n),ms=null,Oo=0,n=ye;for(;n!==null;)Q0(n.alternate,n),n=n.return;ye=null}}function Es(n,a){var o=n.timeoutHandle;o!==-1&&(n.timeoutHandle=-1,GE(o)),o=n.cancelPendingCommit,o!==null&&(n.cancelPendingCommit=null,o()),ph(),Ze=n,ye=o=sr(n.current,null),be=a,Ie=0,li=null,Wr=!1,ys=Yt(n,a),oh=!1,xs=Mi=lh=Oa=jr=an=0,Jn=Go=null,uh=!1,(a&8)!==0&&(a|=a&32);var u=n.entangledLanes;if(u!==0)for(n=n.entanglements,u&=a;0<u;){var p=31-Tt(u),_=1<<p;a|=n[p],u&=~_}return _r=a,kl(),o}function y_(n,a){pe=null,H.H=au,a===Ao||a===Zl?(a=zg(),Ie=3):a===Ng?(a=zg(),Ie=4):Ie=a===I0?8:a!==null&&typeof a=="object"&&typeof a.then=="function"?6:1,li=a,ye===null&&(an=1,cu(n,_i(a,n.current)))}function x_(){var n=H.H;return H.H=au,n===null?au:n}function S_(){var n=H.A;return H.A=EE,n}function mh(){an=4,Wr||(be&4194048)!==be&&Si.current!==null||(ys=!0),(jr&134217727)===0&&(Oa&134217727)===0||Ze===null||Kr(Ze,be,Mi,!1)}function gh(n,a,o){var u=ze;ze|=2;var p=x_(),_=S_();(Ze!==n||be!==a)&&(_u=null,Es(n,a)),a=!1;var U=an;t:do try{if(Ie!==0&&ye!==null){var z=ye,G=li;switch(Ie){case 8:ph(),U=6;break t;case 3:case 2:case 9:case 6:Si.current===null&&(a=!0);var st=Ie;if(Ie=0,li=null,bs(n,z,G,st),o&&ys){U=0;break t}break;default:st=Ie,Ie=0,li=null,bs(n,z,G,st)}}AE(),U=an;break}catch(_t){y_(n,_t)}while(!0);return a&&n.shellSuspendCounter++,ur=Ca=null,ze=u,H.H=p,H.A=_,ye===null&&(Ze=null,be=0,kl()),U}function AE(){for(;ye!==null;)M_(ye)}function RE(n,a){var o=ze;ze|=2;var u=x_(),p=S_();Ze!==n||be!==a?(_u=null,gu=re()+500,Es(n,a)):ys=Yt(n,a);t:do try{if(Ie!==0&&ye!==null){a=ye;var _=li;e:switch(Ie){case 1:Ie=0,li=null,bs(n,a,_,1);break;case 2:case 9:if(Pg(_)){Ie=0,li=null,E_(a);break}a=function(){Ie!==2&&Ie!==9||Ze!==n||(Ie=7),Gi(n)},_.then(a,a);break t;case 3:Ie=7;break t;case 4:Ie=5;break t;case 7:Pg(_)?(Ie=0,li=null,E_(a)):(Ie=0,li=null,bs(n,a,_,7));break;case 5:var U=null;switch(ye.tag){case 26:U=ye.memoizedState;case 5:case 27:var z=ye;if(!U||rv(U)){Ie=0,li=null;var G=z.sibling;if(G!==null)ye=G;else{var st=z.return;st!==null?(ye=st,yu(st)):ye=null}break e}}Ie=0,li=null,bs(n,a,_,5);break;case 6:Ie=0,li=null,bs(n,a,_,6);break;case 8:ph(),an=6;break t;default:throw Error(r(462))}}wE();break}catch(_t){y_(n,_t)}while(!0);return ur=Ca=null,H.H=u,H.A=p,ze=o,ye!==null?0:(Ze=null,be=0,kl(),an)}function wE(){for(;ye!==null&&!Dn();)M_(ye)}function M_(n){var a=Z0(n.alternate,n,_r);n.memoizedProps=n.pendingProps,a===null?yu(n):ye=a}function E_(n){var a=n,o=a.alternate;switch(a.tag){case 15:case 0:a=G0(o,a,a.pendingProps,a.type,void 0,be);break;case 11:a=G0(o,a,a.pendingProps,a.type.render,a.ref,be);break;case 5:Lf(a);default:Q0(o,a),a=ye=bg(a,_r),a=Z0(o,a,_r)}n.memoizedProps=n.pendingProps,a===null?yu(n):ye=a}function bs(n,a,o,u){ur=Ca=null,Lf(a),ms=null,Oo=0;var p=a.return;try{if(_E(n,p,a,o,be)){an=1,cu(n,_i(o,n.current)),ye=null;return}}catch(_){if(p!==null)throw ye=p,_;an=1,cu(n,_i(o,n.current)),ye=null;return}a.flags&32768?(Ue||u===1?n=!0:ys||(be&536870912)!==0?n=!1:(Wr=n=!0,(u===2||u===9||u===3||u===6)&&(u=Si.current,u!==null&&u.tag===13&&(u.flags|=16384))),b_(a,n)):yu(a)}function yu(n){var a=n;do{if((a.flags&32768)!==0){b_(a,Wr);return}n=a.return;var o=yE(a.alternate,a,_r);if(o!==null){ye=o;return}if(a=a.sibling,a!==null){ye=a;return}ye=a=n}while(a!==null);an===0&&(an=5)}function b_(n,a){do{var o=xE(n.alternate,n);if(o!==null){o.flags&=32767,ye=o;return}if(o=n.return,o!==null&&(o.flags|=32768,o.subtreeFlags=0,o.deletions=null),!a&&(n=n.sibling,n!==null)){ye=n;return}ye=n=o}while(n!==null);an=6,ye=null}function T_(n,a,o,u,p,_,U,z,G){n.cancelPendingCommit=null;do xu();while(Pn!==0);if((ze&6)!==0)throw Error(r(327));if(a!==null){if(a===n.current)throw Error(r(177));if(_=a.lanes|a.childLanes,_|=sf,Bt(n,o,_,U,z,G),n===Ze&&(ye=Ze=null,be=0),Ss=a,Zr=n,Ms=o,fh=_,hh=p,m_=u,(a.subtreeFlags&10256)!==0||(a.flags&10256)!==0?(n.callbackNode=null,n.callbackPriority=0,UE(V,function(){return D_(),null})):(n.callbackNode=null,n.callbackPriority=0),u=(a.flags&13878)!==0,(a.subtreeFlags&13878)!==0||u){u=H.T,H.T=null,p=Z.p,Z.p=2,U=ze,ze|=4;try{SE(n,a,o)}finally{ze=U,Z.p=p,H.T=u}}Pn=1,A_(),R_(),w_()}}function A_(){if(Pn===1){Pn=0;var n=Zr,a=Ss,o=(a.flags&13878)!==0;if((a.subtreeFlags&13878)!==0||o){o=H.T,H.T=null;var u=Z.p;Z.p=2;var p=ze;ze|=4;try{l_(a,n);var _=wh,U=pg(n.containerInfo),z=_.focusedElem,G=_.selectionRange;if(U!==z&&z&&z.ownerDocument&&dg(z.ownerDocument.documentElement,z)){if(G!==null&&tf(z)){var st=G.start,_t=G.end;if(_t===void 0&&(_t=st),"selectionStart"in z)z.selectionStart=st,z.selectionEnd=Math.min(_t,z.value.length);else{var Et=z.ownerDocument||document,ut=Et&&Et.defaultView||window;if(ut.getSelection){var ct=ut.getSelection(),ne=z.textContent.length,$t=Math.min(G.start,ne),He=G.end===void 0?$t:Math.min(G.end,ne);!ct.extend&&$t>He&&(U=He,He=$t,$t=U);var nt=hg(z,$t),Q=hg(z,He);if(nt&&Q&&(ct.rangeCount!==1||ct.anchorNode!==nt.node||ct.anchorOffset!==nt.offset||ct.focusNode!==Q.node||ct.focusOffset!==Q.offset)){var at=Et.createRange();at.setStart(nt.node,nt.offset),ct.removeAllRanges(),$t>He?(ct.addRange(at),ct.extend(Q.node,Q.offset)):(at.setEnd(Q.node,Q.offset),ct.addRange(at))}}}}for(Et=[],ct=z;ct=ct.parentNode;)ct.nodeType===1&&Et.push({element:ct,left:ct.scrollLeft,top:ct.scrollTop});for(typeof z.focus=="function"&&z.focus(),z=0;z<Et.length;z++){var yt=Et[z];yt.element.scrollLeft=yt.left,yt.element.scrollTop=yt.top}}Uu=!!Rh,wh=Rh=null}finally{ze=p,Z.p=u,H.T=o}}n.current=a,Pn=2}}function R_(){if(Pn===2){Pn=0;var n=Zr,a=Ss,o=(a.flags&8772)!==0;if((a.subtreeFlags&8772)!==0||o){o=H.T,H.T=null;var u=Z.p;Z.p=2;var p=ze;ze|=4;try{r_(n,a.alternate,a)}finally{ze=p,Z.p=u,H.T=o}}Pn=3}}function w_(){if(Pn===4||Pn===3){Pn=0,ge();var n=Zr,a=Ss,o=Ms,u=m_;(a.subtreeFlags&10256)!==0||(a.flags&10256)!==0?Pn=5:(Pn=0,Ss=Zr=null,C_(n,n.pendingLanes));var p=n.pendingLanes;if(p===0&&(Yr=null),cn(o),a=a.stateNode,St&&typeof St.onCommitFiberRoot=="function")try{St.onCommitFiberRoot($,a,void 0,(a.current.flags&128)===128)}catch{}if(u!==null){a=H.T,p=Z.p,Z.p=2,H.T=null;try{for(var _=n.onRecoverableError,U=0;U<u.length;U++){var z=u[U];_(z.value,{componentStack:z.stack})}}finally{H.T=a,Z.p=p}}(Ms&3)!==0&&xu(),Gi(n),p=n.pendingLanes,(o&4194090)!==0&&(p&42)!==0?n===dh?qo++:(qo=0,dh=n):qo=0,Xo(0)}}function C_(n,a){(n.pooledCacheLanes&=a)===0&&(a=n.pooledCache,a!=null&&(n.pooledCache=null,bo(a)))}function xu(n){return A_(),R_(),w_(),D_()}function D_(){if(Pn!==5)return!1;var n=Zr,a=fh;fh=0;var o=cn(Ms),u=H.T,p=Z.p;try{Z.p=32>o?32:o,H.T=null,o=hh,hh=null;var _=Zr,U=Ms;if(Pn=0,Ss=Zr=null,Ms=0,(ze&6)!==0)throw Error(r(331));var z=ze;if(ze|=4,d_(_.current),c_(_,_.current,U,o),ze=z,Xo(0,!1),St&&typeof St.onPostCommitFiberRoot=="function")try{St.onPostCommitFiberRoot($,_)}catch{}return!0}finally{Z.p=p,H.T=u,C_(n,a)}}function L_(n,a,o){a=_i(o,a),a=Xf(n.stateNode,a,2),n=Br(n,a,2),n!==null&&(Mt(n,2),Gi(n))}function We(n,a,o){if(n.tag===3)L_(n,n,o);else for(;a!==null;){if(a.tag===3){L_(a,n,o);break}else if(a.tag===1){var u=a.stateNode;if(typeof a.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(Yr===null||!Yr.has(u))){n=_i(o,n),o=O0(2),u=Br(a,o,2),u!==null&&(z0(o,u,a,n),Mt(u,2),Gi(u));break}}a=a.return}}function _h(n,a,o){var u=n.pingCache;if(u===null){u=n.pingCache=new bE;var p=new Set;u.set(a,p)}else p=u.get(a),p===void 0&&(p=new Set,u.set(a,p));p.has(o)||(oh=!0,p.add(o),n=CE.bind(null,n,a,o),a.then(n,n))}function CE(n,a,o){var u=n.pingCache;u!==null&&u.delete(a),n.pingedLanes|=n.suspendedLanes&o,n.warmLanes&=~o,Ze===n&&(be&o)===o&&(an===4||an===3&&(be&62914560)===be&&300>re()-ch?(ze&2)===0&&Es(n,0):lh|=o,xs===be&&(xs=0)),Gi(n)}function U_(n,a){a===0&&(a=zt()),n=as(n,a),n!==null&&(Mt(n,a),Gi(n))}function DE(n){var a=n.memoizedState,o=0;a!==null&&(o=a.retryLane),U_(n,o)}function LE(n,a){var o=0;switch(n.tag){case 13:var u=n.stateNode,p=n.memoizedState;p!==null&&(o=p.retryLane);break;case 19:u=n.stateNode;break;case 22:u=n.stateNode._retryCache;break;default:throw Error(r(314))}u!==null&&u.delete(a),U_(n,o)}function UE(n,a){return he(n,a)}var Su=null,Ts=null,vh=!1,Mu=!1,yh=!1,za=0;function Gi(n){n!==Ts&&n.next===null&&(Ts===null?Su=Ts=n:Ts=Ts.next=n),Mu=!0,vh||(vh=!0,PE())}function Xo(n,a){if(!yh&&Mu){yh=!0;do for(var o=!1,u=Su;u!==null;){if(n!==0){var p=u.pendingLanes;if(p===0)var _=0;else{var U=u.suspendedLanes,z=u.pingedLanes;_=(1<<31-Tt(42|n)+1)-1,_&=p&~(U&~z),_=_&201326741?_&201326741|1:_?_|2:0}_!==0&&(o=!0,z_(u,_))}else _=be,_=oe(u,u===Ze?_:0,u.cancelPendingCommit!==null||u.timeoutHandle!==-1),(_&3)===0||Yt(u,_)||(o=!0,z_(u,_));u=u.next}while(o);yh=!1}}function NE(){N_()}function N_(){Mu=vh=!1;var n=0;za!==0&&(VE()&&(n=za),za=0);for(var a=re(),o=null,u=Su;u!==null;){var p=u.next,_=P_(u,a);_===0?(u.next=null,o===null?Su=p:o.next=p,p===null&&(Ts=o)):(o=u,(n!==0||(_&3)!==0)&&(Mu=!0)),u=p}Xo(n)}function P_(n,a){for(var o=n.suspendedLanes,u=n.pingedLanes,p=n.expirationTimes,_=n.pendingLanes&-62914561;0<_;){var U=31-Tt(_),z=1<<U,G=p[U];G===-1?((z&o)===0||(z&u)!==0)&&(p[U]=Fe(z,a)):G<=a&&(n.expiredLanes|=z),_&=~z}if(a=Ze,o=be,o=oe(n,n===a?o:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),u=n.callbackNode,o===0||n===a&&(Ie===2||Ie===9)||n.cancelPendingCommit!==null)return u!==null&&u!==null&&j(u),n.callbackNode=null,n.callbackPriority=0;if((o&3)===0||Yt(n,o)){if(a=o&-o,a===n.callbackPriority)return a;switch(u!==null&&j(u),cn(o)){case 2:case 8:o=Vt;break;case 32:o=V;break;case 268435456:o=lt;break;default:o=V}return u=O_.bind(null,n),o=he(o,u),n.callbackPriority=a,n.callbackNode=o,a}return u!==null&&u!==null&&j(u),n.callbackPriority=2,n.callbackNode=null,2}function O_(n,a){if(Pn!==0&&Pn!==5)return n.callbackNode=null,n.callbackPriority=0,null;var o=n.callbackNode;if(xu()&&n.callbackNode!==o)return null;var u=be;return u=oe(n,n===Ze?u:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),u===0?null:(__(n,u,a),P_(n,re()),n.callbackNode!=null&&n.callbackNode===o?O_.bind(null,n):null)}function z_(n,a){if(xu())return null;__(n,a,!0)}function PE(){qE(function(){(ze&6)!==0?he(Le,NE):N_()})}function xh(){return za===0&&(za=et()),za}function I_(n){return n==null||typeof n=="symbol"||typeof n=="boolean"?null:typeof n=="function"?n:Nl(""+n)}function F_(n,a){var o=a.ownerDocument.createElement("input");return o.name=a.name,o.value=a.value,n.id&&o.setAttribute("form",n.id),a.parentNode.insertBefore(o,a),n=new FormData(n),o.parentNode.removeChild(o),n}function OE(n,a,o,u,p){if(a==="submit"&&o&&o.stateNode===p){var _=I_((p[Ln]||null).action),U=u.submitter;U&&(a=(a=U[Ln]||null)?I_(a.formAction):U.getAttribute("formAction"),a!==null&&(_=a,U=null));var z=new Il("action","action",null,u,p);n.push({event:z,listeners:[{instance:null,listener:function(){if(u.defaultPrevented){if(za!==0){var G=U?F_(p,U):new FormData(p);kf(o,{pending:!0,data:G,method:p.method,action:_},null,G)}}else typeof _=="function"&&(z.preventDefault(),G=U?F_(p,U):new FormData(p),kf(o,{pending:!0,data:G,method:p.method,action:_},_,G))},currentTarget:p}]})}}for(var Sh=0;Sh<af.length;Sh++){var Mh=af[Sh],zE=Mh.toLowerCase(),IE=Mh[0].toUpperCase()+Mh.slice(1);Ci(zE,"on"+IE)}Ci(_g,"onAnimationEnd"),Ci(vg,"onAnimationIteration"),Ci(yg,"onAnimationStart"),Ci("dblclick","onDoubleClick"),Ci("focusin","onFocus"),Ci("focusout","onBlur"),Ci(tE,"onTransitionRun"),Ci(eE,"onTransitionStart"),Ci(nE,"onTransitionCancel"),Ci(xg,"onTransitionEnd"),F("onMouseEnter",["mouseout","mouseover"]),F("onMouseLeave",["mouseout","mouseover"]),F("onPointerEnter",["pointerout","pointerover"]),F("onPointerLeave",["pointerout","pointerover"]),nr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),nr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),nr("onBeforeInput",["compositionend","keypress","textInput","paste"]),nr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),nr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),nr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),FE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wo));function B_(n,a){a=(a&4)!==0;for(var o=0;o<n.length;o++){var u=n[o],p=u.event;u=u.listeners;t:{var _=void 0;if(a)for(var U=u.length-1;0<=U;U--){var z=u[U],G=z.instance,st=z.currentTarget;if(z=z.listener,G!==_&&p.isPropagationStopped())break t;_=z,p.currentTarget=st;try{_(p)}catch(_t){uu(_t)}p.currentTarget=null,_=G}else for(U=0;U<u.length;U++){if(z=u[U],G=z.instance,st=z.currentTarget,z=z.listener,G!==_&&p.isPropagationStopped())break t;_=z,p.currentTarget=st;try{_(p)}catch(_t){uu(_t)}p.currentTarget=null,_=G}}}}function xe(n,a){var o=a[va];o===void 0&&(o=a[va]=new Set);var u=n+"__bubble";o.has(u)||(k_(a,n,2,!1),o.add(u))}function Eh(n,a,o){var u=0;a&&(u|=4),k_(o,n,u,a)}var Eu="_reactListening"+Math.random().toString(36).slice(2);function bh(n){if(!n[Eu]){n[Eu]=!0,Ll.forEach(function(o){o!=="selectionchange"&&(FE.has(o)||Eh(o,!1,n),Eh(o,!0,n))});var a=n.nodeType===9?n:n.ownerDocument;a===null||a[Eu]||(a[Eu]=!0,Eh("selectionchange",!1,a))}}function k_(n,a,o,u){switch(cv(a)){case 2:var p=f1;break;case 8:p=h1;break;default:p=Fh}o=p.bind(null,a,o,n),p=void 0,!Xc||a!=="touchstart"&&a!=="touchmove"&&a!=="wheel"||(p=!0),u?p!==void 0?n.addEventListener(a,o,{capture:!0,passive:p}):n.addEventListener(a,o,!0):p!==void 0?n.addEventListener(a,o,{passive:p}):n.addEventListener(a,o,!1)}function Th(n,a,o,u,p){var _=u;if((a&1)===0&&(a&2)===0&&u!==null)t:for(;;){if(u===null)return;var U=u.tag;if(U===3||U===4){var z=u.stateNode.containerInfo;if(z===p)break;if(U===4)for(U=u.return;U!==null;){var G=U.tag;if((G===3||G===4)&&U.stateNode.containerInfo===p)return;U=U.return}for(;z!==null;){if(U=tr(z),U===null)return;if(G=U.tag,G===5||G===6||G===26||G===27){u=_=U;continue t}z=z.parentNode}}u=u.return}jm(function(){var st=_,_t=Gc(o),Et=[];t:{var ut=Sg.get(n);if(ut!==void 0){var ct=Il,ne=n;switch(n){case"keypress":if(Ol(o)===0)break t;case"keydown":case"keyup":ct=UM;break;case"focusin":ne="focus",ct=Zc;break;case"focusout":ne="blur",ct=Zc;break;case"beforeblur":case"afterblur":ct=Zc;break;case"click":if(o.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ct=Km;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ct=xM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ct=OM;break;case _g:case vg:case yg:ct=EM;break;case xg:ct=IM;break;case"scroll":case"scrollend":ct=vM;break;case"wheel":ct=BM;break;case"copy":case"cut":case"paste":ct=TM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ct=Jm;break;case"toggle":case"beforetoggle":ct=HM}var $t=(a&4)!==0,He=!$t&&(n==="scroll"||n==="scrollend"),nt=$t?ut!==null?ut+"Capture":null:ut;$t=[];for(var Q=st,at;Q!==null;){var yt=Q;if(at=yt.stateNode,yt=yt.tag,yt!==5&&yt!==26&&yt!==27||at===null||nt===null||(yt=co(Q,nt),yt!=null&&$t.push(jo(Q,yt,at))),He)break;Q=Q.return}0<$t.length&&(ut=new ct(ut,ne,null,o,_t),Et.push({event:ut,listeners:$t}))}}if((a&7)===0){t:{if(ut=n==="mouseover"||n==="pointerover",ct=n==="mouseout"||n==="pointerout",ut&&o!==Vc&&(ne=o.relatedTarget||o.fromElement)&&(tr(ne)||ne[Yn]))break t;if((ct||ut)&&(ut=_t.window===_t?_t:(ut=_t.ownerDocument)?ut.defaultView||ut.parentWindow:window,ct?(ne=o.relatedTarget||o.toElement,ct=st,ne=ne?tr(ne):null,ne!==null&&(He=l(ne),$t=ne.tag,ne!==He||$t!==5&&$t!==27&&$t!==6)&&(ne=null)):(ct=null,ne=st),ct!==ne)){if($t=Km,yt="onMouseLeave",nt="onMouseEnter",Q="mouse",(n==="pointerout"||n==="pointerover")&&($t=Jm,yt="onPointerLeave",nt="onPointerEnter",Q="pointer"),He=ct==null?ut:xa(ct),at=ne==null?ut:xa(ne),ut=new $t(yt,Q+"leave",ct,o,_t),ut.target=He,ut.relatedTarget=at,yt=null,tr(_t)===st&&($t=new $t(nt,Q+"enter",ne,o,_t),$t.target=at,$t.relatedTarget=He,yt=$t),He=yt,ct&&ne)e:{for($t=ct,nt=ne,Q=0,at=$t;at;at=As(at))Q++;for(at=0,yt=nt;yt;yt=As(yt))at++;for(;0<Q-at;)$t=As($t),Q--;for(;0<at-Q;)nt=As(nt),at--;for(;Q--;){if($t===nt||nt!==null&&$t===nt.alternate)break e;$t=As($t),nt=As(nt)}$t=null}else $t=null;ct!==null&&H_(Et,ut,ct,$t,!1),ne!==null&&He!==null&&H_(Et,He,ne,$t,!0)}}t:{if(ut=st?xa(st):window,ct=ut.nodeName&&ut.nodeName.toLowerCase(),ct==="select"||ct==="input"&&ut.type==="file")var Ht=sg;else if(rg(ut))if(og)Ht=QM;else{Ht=ZM;var _e=YM}else ct=ut.nodeName,!ct||ct.toLowerCase()!=="input"||ut.type!=="checkbox"&&ut.type!=="radio"?st&&Hc(st.elementType)&&(Ht=sg):Ht=KM;if(Ht&&(Ht=Ht(n,st))){ag(Et,Ht,o,_t);break t}_e&&_e(n,ut,st),n==="focusout"&&st&&ut.type==="number"&&st.memoizedProps.value!=null&&In(ut,"number",ut.value)}switch(_e=st?xa(st):window,n){case"focusin":(rg(_e)||_e.contentEditable==="true")&&(ns=_e,ef=st,yo=null);break;case"focusout":yo=ef=ns=null;break;case"mousedown":nf=!0;break;case"contextmenu":case"mouseup":case"dragend":nf=!1,mg(Et,o,_t);break;case"selectionchange":if($M)break;case"keydown":case"keyup":mg(Et,o,_t)}var Wt;if(Qc)t:{switch(n){case"compositionstart":var te="onCompositionStart";break t;case"compositionend":te="onCompositionEnd";break t;case"compositionupdate":te="onCompositionUpdate";break t}te=void 0}else es?ng(n,o)&&(te="onCompositionEnd"):n==="keydown"&&o.keyCode===229&&(te="onCompositionStart");te&&($m&&o.locale!=="ko"&&(es||te!=="onCompositionStart"?te==="onCompositionEnd"&&es&&(Wt=Ym()):(Or=_t,Wc="value"in Or?Or.value:Or.textContent,es=!0)),_e=bu(st,te),0<_e.length&&(te=new Qm(te,n,null,o,_t),Et.push({event:te,listeners:_e}),Wt?te.data=Wt:(Wt=ig(o),Wt!==null&&(te.data=Wt)))),(Wt=GM?qM(n,o):XM(n,o))&&(te=bu(st,"onBeforeInput"),0<te.length&&(_e=new Qm("onBeforeInput","beforeinput",null,o,_t),Et.push({event:_e,listeners:te}),_e.data=Wt)),OE(Et,n,st,o,_t)}B_(Et,a)})}function jo(n,a,o){return{instance:n,listener:a,currentTarget:o}}function bu(n,a){for(var o=a+"Capture",u=[];n!==null;){var p=n,_=p.stateNode;if(p=p.tag,p!==5&&p!==26&&p!==27||_===null||(p=co(n,o),p!=null&&u.unshift(jo(n,p,_)),p=co(n,a),p!=null&&u.push(jo(n,p,_))),n.tag===3)return u;n=n.return}return[]}function As(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5&&n.tag!==27);return n||null}function H_(n,a,o,u,p){for(var _=a._reactName,U=[];o!==null&&o!==u;){var z=o,G=z.alternate,st=z.stateNode;if(z=z.tag,G!==null&&G===u)break;z!==5&&z!==26&&z!==27||st===null||(G=st,p?(st=co(o,_),st!=null&&U.unshift(jo(o,st,G))):p||(st=co(o,_),st!=null&&U.push(jo(o,st,G)))),o=o.return}U.length!==0&&n.push({event:a,listeners:U})}var BE=/\r\n?/g,kE=/\u0000|\uFFFD/g;function V_(n){return(typeof n=="string"?n:""+n).replace(BE,`
`).replace(kE,"")}function G_(n,a){return a=V_(a),V_(n)===a}function Tu(){}function ke(n,a,o,u,p,_){switch(o){case"children":typeof u=="string"?a==="body"||a==="textarea"&&u===""||Fi(n,u):(typeof u=="number"||typeof u=="bigint")&&a!=="body"&&Fi(n,""+u);break;case"className":Ut(n,"class",u);break;case"tabIndex":Ut(n,"tabindex",u);break;case"dir":case"role":case"viewBox":case"width":case"height":Ut(n,o,u);break;case"style":Xm(n,u,_);break;case"data":if(a!=="object"){Ut(n,"data",u);break}case"src":case"href":if(u===""&&(a!=="a"||o!=="href")){n.removeAttribute(o);break}if(u==null||typeof u=="function"||typeof u=="symbol"||typeof u=="boolean"){n.removeAttribute(o);break}u=Nl(""+u),n.setAttribute(o,u);break;case"action":case"formAction":if(typeof u=="function"){n.setAttribute(o,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof _=="function"&&(o==="formAction"?(a!=="input"&&ke(n,a,"name",p.name,p,null),ke(n,a,"formEncType",p.formEncType,p,null),ke(n,a,"formMethod",p.formMethod,p,null),ke(n,a,"formTarget",p.formTarget,p,null)):(ke(n,a,"encType",p.encType,p,null),ke(n,a,"method",p.method,p,null),ke(n,a,"target",p.target,p,null)));if(u==null||typeof u=="symbol"||typeof u=="boolean"){n.removeAttribute(o);break}u=Nl(""+u),n.setAttribute(o,u);break;case"onClick":u!=null&&(n.onclick=Tu);break;case"onScroll":u!=null&&xe("scroll",n);break;case"onScrollEnd":u!=null&&xe("scrollend",n);break;case"dangerouslySetInnerHTML":if(u!=null){if(typeof u!="object"||!("__html"in u))throw Error(r(61));if(o=u.__html,o!=null){if(p.children!=null)throw Error(r(60));n.innerHTML=o}}break;case"multiple":n.multiple=u&&typeof u!="function"&&typeof u!="symbol";break;case"muted":n.muted=u&&typeof u!="function"&&typeof u!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(u==null||typeof u=="function"||typeof u=="boolean"||typeof u=="symbol"){n.removeAttribute("xlink:href");break}o=Nl(""+u),n.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",o);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":u!=null&&typeof u!="function"&&typeof u!="symbol"?n.setAttribute(o,""+u):n.removeAttribute(o);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":u&&typeof u!="function"&&typeof u!="symbol"?n.setAttribute(o,""):n.removeAttribute(o);break;case"capture":case"download":u===!0?n.setAttribute(o,""):u!==!1&&u!=null&&typeof u!="function"&&typeof u!="symbol"?n.setAttribute(o,u):n.removeAttribute(o);break;case"cols":case"rows":case"size":case"span":u!=null&&typeof u!="function"&&typeof u!="symbol"&&!isNaN(u)&&1<=u?n.setAttribute(o,u):n.removeAttribute(o);break;case"rowSpan":case"start":u==null||typeof u=="function"||typeof u=="symbol"||isNaN(u)?n.removeAttribute(o):n.setAttribute(o,u);break;case"popover":xe("beforetoggle",n),xe("toggle",n),Rt(n,"popover",u);break;case"xlinkActuate":Pt(n,"http://www.w3.org/1999/xlink","xlink:actuate",u);break;case"xlinkArcrole":Pt(n,"http://www.w3.org/1999/xlink","xlink:arcrole",u);break;case"xlinkRole":Pt(n,"http://www.w3.org/1999/xlink","xlink:role",u);break;case"xlinkShow":Pt(n,"http://www.w3.org/1999/xlink","xlink:show",u);break;case"xlinkTitle":Pt(n,"http://www.w3.org/1999/xlink","xlink:title",u);break;case"xlinkType":Pt(n,"http://www.w3.org/1999/xlink","xlink:type",u);break;case"xmlBase":Pt(n,"http://www.w3.org/XML/1998/namespace","xml:base",u);break;case"xmlLang":Pt(n,"http://www.w3.org/XML/1998/namespace","xml:lang",u);break;case"xmlSpace":Pt(n,"http://www.w3.org/XML/1998/namespace","xml:space",u);break;case"is":Rt(n,"is",u);break;case"innerText":case"textContent":break;default:(!(2<o.length)||o[0]!=="o"&&o[0]!=="O"||o[1]!=="n"&&o[1]!=="N")&&(o=gM.get(o)||o,Rt(n,o,u))}}function Ah(n,a,o,u,p,_){switch(o){case"style":Xm(n,u,_);break;case"dangerouslySetInnerHTML":if(u!=null){if(typeof u!="object"||!("__html"in u))throw Error(r(61));if(o=u.__html,o!=null){if(p.children!=null)throw Error(r(60));n.innerHTML=o}}break;case"children":typeof u=="string"?Fi(n,u):(typeof u=="number"||typeof u=="bigint")&&Fi(n,""+u);break;case"onScroll":u!=null&&xe("scroll",n);break;case"onScrollEnd":u!=null&&xe("scrollend",n);break;case"onClick":u!=null&&(n.onclick=Tu);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Ul.hasOwnProperty(o))t:{if(o[0]==="o"&&o[1]==="n"&&(p=o.endsWith("Capture"),a=o.slice(2,p?o.length-7:void 0),_=n[Ln]||null,_=_!=null?_[o]:null,typeof _=="function"&&n.removeEventListener(a,_,p),typeof u=="function")){typeof _!="function"&&_!==null&&(o in n?n[o]=null:n.hasAttribute(o)&&n.removeAttribute(o)),n.addEventListener(a,u,p);break t}o in n?n[o]=u:u===!0?n.setAttribute(o,""):Rt(n,o,u)}}}function On(n,a,o){switch(a){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":xe("error",n),xe("load",n);var u=!1,p=!1,_;for(_ in o)if(o.hasOwnProperty(_)){var U=o[_];if(U!=null)switch(_){case"src":u=!0;break;case"srcSet":p=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,a));default:ke(n,a,_,U,o,null)}}p&&ke(n,a,"srcSet",o.srcSet,o,null),u&&ke(n,a,"src",o.src,o,null);return;case"input":xe("invalid",n);var z=_=U=p=null,G=null,st=null;for(u in o)if(o.hasOwnProperty(u)){var _t=o[u];if(_t!=null)switch(u){case"name":p=_t;break;case"type":U=_t;break;case"checked":G=_t;break;case"defaultChecked":st=_t;break;case"value":_=_t;break;case"defaultValue":z=_t;break;case"children":case"dangerouslySetInnerHTML":if(_t!=null)throw Error(r(137,a));break;default:ke(n,a,u,_t,o,null)}}Xe(n,_,z,G,st,U,p,!1),nn(n);return;case"select":xe("invalid",n),u=U=_=null;for(p in o)if(o.hasOwnProperty(p)&&(z=o[p],z!=null))switch(p){case"value":_=z;break;case"defaultValue":U=z;break;case"multiple":u=z;default:ke(n,a,p,z,o,null)}a=_,o=U,n.multiple=!!u,a!=null?_n(n,!!u,a,!1):o!=null&&_n(n,!!u,o,!0);return;case"textarea":xe("invalid",n),_=p=u=null;for(U in o)if(o.hasOwnProperty(U)&&(z=o[U],z!=null))switch(U){case"value":u=z;break;case"defaultValue":p=z;break;case"children":_=z;break;case"dangerouslySetInnerHTML":if(z!=null)throw Error(r(91));break;default:ke(n,a,U,z,o,null)}Un(n,u,p,_),nn(n);return;case"option":for(G in o)if(o.hasOwnProperty(G)&&(u=o[G],u!=null))switch(G){case"selected":n.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:ke(n,a,G,u,o,null)}return;case"dialog":xe("beforetoggle",n),xe("toggle",n),xe("cancel",n),xe("close",n);break;case"iframe":case"object":xe("load",n);break;case"video":case"audio":for(u=0;u<Wo.length;u++)xe(Wo[u],n);break;case"image":xe("error",n),xe("load",n);break;case"details":xe("toggle",n);break;case"embed":case"source":case"link":xe("error",n),xe("load",n);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(st in o)if(o.hasOwnProperty(st)&&(u=o[st],u!=null))switch(st){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,a));default:ke(n,a,st,u,o,null)}return;default:if(Hc(a)){for(_t in o)o.hasOwnProperty(_t)&&(u=o[_t],u!==void 0&&Ah(n,a,_t,u,o,void 0));return}}for(z in o)o.hasOwnProperty(z)&&(u=o[z],u!=null&&ke(n,a,z,u,o,null))}function HE(n,a,o,u){switch(a){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var p=null,_=null,U=null,z=null,G=null,st=null,_t=null;for(ct in o){var Et=o[ct];if(o.hasOwnProperty(ct)&&Et!=null)switch(ct){case"checked":break;case"value":break;case"defaultValue":G=Et;default:u.hasOwnProperty(ct)||ke(n,a,ct,null,u,Et)}}for(var ut in u){var ct=u[ut];if(Et=o[ut],u.hasOwnProperty(ut)&&(ct!=null||Et!=null))switch(ut){case"type":_=ct;break;case"name":p=ct;break;case"checked":st=ct;break;case"defaultChecked":_t=ct;break;case"value":U=ct;break;case"defaultValue":z=ct;break;case"children":case"dangerouslySetInnerHTML":if(ct!=null)throw Error(r(137,a));break;default:ct!==Et&&ke(n,a,ut,ct,u,Et)}}ir(n,U,z,G,st,_t,_,p);return;case"select":ct=U=z=ut=null;for(_ in o)if(G=o[_],o.hasOwnProperty(_)&&G!=null)switch(_){case"value":break;case"multiple":ct=G;default:u.hasOwnProperty(_)||ke(n,a,_,null,u,G)}for(p in u)if(_=u[p],G=o[p],u.hasOwnProperty(p)&&(_!=null||G!=null))switch(p){case"value":ut=_;break;case"defaultValue":z=_;break;case"multiple":U=_;default:_!==G&&ke(n,a,p,_,u,G)}a=z,o=U,u=ct,ut!=null?_n(n,!!o,ut,!1):!!u!=!!o&&(a!=null?_n(n,!!o,a,!0):_n(n,!!o,o?[]:"",!1));return;case"textarea":ct=ut=null;for(z in o)if(p=o[z],o.hasOwnProperty(z)&&p!=null&&!u.hasOwnProperty(z))switch(z){case"value":break;case"children":break;default:ke(n,a,z,null,u,p)}for(U in u)if(p=u[U],_=o[U],u.hasOwnProperty(U)&&(p!=null||_!=null))switch(U){case"value":ut=p;break;case"defaultValue":ct=p;break;case"children":break;case"dangerouslySetInnerHTML":if(p!=null)throw Error(r(91));break;default:p!==_&&ke(n,a,U,p,u,_)}bn(n,ut,ct);return;case"option":for(var ne in o)if(ut=o[ne],o.hasOwnProperty(ne)&&ut!=null&&!u.hasOwnProperty(ne))switch(ne){case"selected":n.selected=!1;break;default:ke(n,a,ne,null,u,ut)}for(G in u)if(ut=u[G],ct=o[G],u.hasOwnProperty(G)&&ut!==ct&&(ut!=null||ct!=null))switch(G){case"selected":n.selected=ut&&typeof ut!="function"&&typeof ut!="symbol";break;default:ke(n,a,G,ut,u,ct)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var $t in o)ut=o[$t],o.hasOwnProperty($t)&&ut!=null&&!u.hasOwnProperty($t)&&ke(n,a,$t,null,u,ut);for(st in u)if(ut=u[st],ct=o[st],u.hasOwnProperty(st)&&ut!==ct&&(ut!=null||ct!=null))switch(st){case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(r(137,a));break;default:ke(n,a,st,ut,u,ct)}return;default:if(Hc(a)){for(var He in o)ut=o[He],o.hasOwnProperty(He)&&ut!==void 0&&!u.hasOwnProperty(He)&&Ah(n,a,He,void 0,u,ut);for(_t in u)ut=u[_t],ct=o[_t],!u.hasOwnProperty(_t)||ut===ct||ut===void 0&&ct===void 0||Ah(n,a,_t,ut,u,ct);return}}for(var nt in o)ut=o[nt],o.hasOwnProperty(nt)&&ut!=null&&!u.hasOwnProperty(nt)&&ke(n,a,nt,null,u,ut);for(Et in u)ut=u[Et],ct=o[Et],!u.hasOwnProperty(Et)||ut===ct||ut==null&&ct==null||ke(n,a,Et,ut,u,ct)}var Rh=null,wh=null;function Au(n){return n.nodeType===9?n:n.ownerDocument}function q_(n){switch(n){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function X_(n,a){if(n===0)switch(a){case"svg":return 1;case"math":return 2;default:return 0}return n===1&&a==="foreignObject"?0:n}function Ch(n,a){return n==="textarea"||n==="noscript"||typeof a.children=="string"||typeof a.children=="number"||typeof a.children=="bigint"||typeof a.dangerouslySetInnerHTML=="object"&&a.dangerouslySetInnerHTML!==null&&a.dangerouslySetInnerHTML.__html!=null}var Dh=null;function VE(){var n=window.event;return n&&n.type==="popstate"?n===Dh?!1:(Dh=n,!0):(Dh=null,!1)}var W_=typeof setTimeout=="function"?setTimeout:void 0,GE=typeof clearTimeout=="function"?clearTimeout:void 0,j_=typeof Promise=="function"?Promise:void 0,qE=typeof queueMicrotask=="function"?queueMicrotask:typeof j_<"u"?function(n){return j_.resolve(null).then(n).catch(XE)}:W_;function XE(n){setTimeout(function(){throw n})}function Qr(n){return n==="head"}function Y_(n,a){var o=a,u=0,p=0;do{var _=o.nextSibling;if(n.removeChild(o),_&&_.nodeType===8)if(o=_.data,o==="/$"){if(0<u&&8>u){o=u;var U=n.ownerDocument;if(o&1&&Yo(U.documentElement),o&2&&Yo(U.body),o&4)for(o=U.head,Yo(o),U=o.firstChild;U;){var z=U.nextSibling,G=U.nodeName;U[Lr]||G==="SCRIPT"||G==="STYLE"||G==="LINK"&&U.rel.toLowerCase()==="stylesheet"||o.removeChild(U),U=z}}if(p===0){n.removeChild(_),nl(a);return}p--}else o==="$"||o==="$?"||o==="$!"?p++:u=o.charCodeAt(0)-48;else u=0;o=_}while(o);nl(a)}function Lh(n){var a=n.firstChild;for(a&&a.nodeType===10&&(a=a.nextSibling);a;){var o=a;switch(a=a.nextSibling,o.nodeName){case"HTML":case"HEAD":case"BODY":Lh(o),Ur(o);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(o.rel.toLowerCase()==="stylesheet")continue}n.removeChild(o)}}function WE(n,a,o,u){for(;n.nodeType===1;){var p=o;if(n.nodeName.toLowerCase()!==a.toLowerCase()){if(!u&&(n.nodeName!=="INPUT"||n.type!=="hidden"))break}else if(u){if(!n[Lr])switch(a){case"meta":if(!n.hasAttribute("itemprop"))break;return n;case"link":if(_=n.getAttribute("rel"),_==="stylesheet"&&n.hasAttribute("data-precedence"))break;if(_!==p.rel||n.getAttribute("href")!==(p.href==null||p.href===""?null:p.href)||n.getAttribute("crossorigin")!==(p.crossOrigin==null?null:p.crossOrigin)||n.getAttribute("title")!==(p.title==null?null:p.title))break;return n;case"style":if(n.hasAttribute("data-precedence"))break;return n;case"script":if(_=n.getAttribute("src"),(_!==(p.src==null?null:p.src)||n.getAttribute("type")!==(p.type==null?null:p.type)||n.getAttribute("crossorigin")!==(p.crossOrigin==null?null:p.crossOrigin))&&_&&n.hasAttribute("async")&&!n.hasAttribute("itemprop"))break;return n;default:return n}}else if(a==="input"&&n.type==="hidden"){var _=p.name==null?null:""+p.name;if(p.type==="hidden"&&n.getAttribute("name")===_)return n}else return n;if(n=Li(n.nextSibling),n===null)break}return null}function jE(n,a,o){if(a==="")return null;for(;n.nodeType!==3;)if((n.nodeType!==1||n.nodeName!=="INPUT"||n.type!=="hidden")&&!o||(n=Li(n.nextSibling),n===null))return null;return n}function Uh(n){return n.data==="$!"||n.data==="$?"&&n.ownerDocument.readyState==="complete"}function YE(n,a){var o=n.ownerDocument;if(n.data!=="$?"||o.readyState==="complete")a();else{var u=function(){a(),o.removeEventListener("DOMContentLoaded",u)};o.addEventListener("DOMContentLoaded",u),n._reactRetry=u}}function Li(n){for(;n!=null;n=n.nextSibling){var a=n.nodeType;if(a===1||a===3)break;if(a===8){if(a=n.data,a==="$"||a==="$!"||a==="$?"||a==="F!"||a==="F")break;if(a==="/$")return null}}return n}var Nh=null;function Z_(n){n=n.previousSibling;for(var a=0;n;){if(n.nodeType===8){var o=n.data;if(o==="$"||o==="$!"||o==="$?"){if(a===0)return n;a--}else o==="/$"&&a++}n=n.previousSibling}return null}function K_(n,a,o){switch(a=Au(o),n){case"html":if(n=a.documentElement,!n)throw Error(r(452));return n;case"head":if(n=a.head,!n)throw Error(r(453));return n;case"body":if(n=a.body,!n)throw Error(r(454));return n;default:throw Error(r(451))}}function Yo(n){for(var a=n.attributes;a.length;)n.removeAttributeNode(a[0]);Ur(n)}var Ei=new Map,Q_=new Set;function Ru(n){return typeof n.getRootNode=="function"?n.getRootNode():n.nodeType===9?n:n.ownerDocument}var vr=Z.d;Z.d={f:ZE,r:KE,D:QE,C:JE,L:$E,m:t1,X:n1,S:e1,M:i1};function ZE(){var n=vr.f(),a=vu();return n||a}function KE(n){var a=er(n);a!==null&&a.tag===5&&a.type==="form"?_0(a):vr.r(n)}var Rs=typeof document>"u"?null:document;function J_(n,a,o){var u=Rs;if(u&&typeof a=="string"&&a){var p=Ye(a);p='link[rel="'+n+'"][href="'+p+'"]',typeof o=="string"&&(p+='[crossorigin="'+o+'"]'),Q_.has(p)||(Q_.add(p),n={rel:n,crossOrigin:o,href:a},u.querySelector(p)===null&&(a=u.createElement("link"),On(a,"link",n),fn(a),u.head.appendChild(a)))}}function QE(n){vr.D(n),J_("dns-prefetch",n,null)}function JE(n,a){vr.C(n,a),J_("preconnect",n,a)}function $E(n,a,o){vr.L(n,a,o);var u=Rs;if(u&&n&&a){var p='link[rel="preload"][as="'+Ye(a)+'"]';a==="image"&&o&&o.imageSrcSet?(p+='[imagesrcset="'+Ye(o.imageSrcSet)+'"]',typeof o.imageSizes=="string"&&(p+='[imagesizes="'+Ye(o.imageSizes)+'"]')):p+='[href="'+Ye(n)+'"]';var _=p;switch(a){case"style":_=ws(n);break;case"script":_=Cs(n)}Ei.has(_)||(n=m({rel:"preload",href:a==="image"&&o&&o.imageSrcSet?void 0:n,as:a},o),Ei.set(_,n),u.querySelector(p)!==null||a==="style"&&u.querySelector(Zo(_))||a==="script"&&u.querySelector(Ko(_))||(a=u.createElement("link"),On(a,"link",n),fn(a),u.head.appendChild(a)))}}function t1(n,a){vr.m(n,a);var o=Rs;if(o&&n){var u=a&&typeof a.as=="string"?a.as:"script",p='link[rel="modulepreload"][as="'+Ye(u)+'"][href="'+Ye(n)+'"]',_=p;switch(u){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":_=Cs(n)}if(!Ei.has(_)&&(n=m({rel:"modulepreload",href:n},a),Ei.set(_,n),o.querySelector(p)===null)){switch(u){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(o.querySelector(Ko(_)))return}u=o.createElement("link"),On(u,"link",n),fn(u),o.head.appendChild(u)}}}function e1(n,a,o){vr.S(n,a,o);var u=Rs;if(u&&n){var p=Nr(u).hoistableStyles,_=ws(n);a=a||"default";var U=p.get(_);if(!U){var z={loading:0,preload:null};if(U=u.querySelector(Zo(_)))z.loading=5;else{n=m({rel:"stylesheet",href:n,"data-precedence":a},o),(o=Ei.get(_))&&Ph(n,o);var G=U=u.createElement("link");fn(G),On(G,"link",n),G._p=new Promise(function(st,_t){G.onload=st,G.onerror=_t}),G.addEventListener("load",function(){z.loading|=1}),G.addEventListener("error",function(){z.loading|=2}),z.loading|=4,wu(U,a,u)}U={type:"stylesheet",instance:U,count:1,state:z},p.set(_,U)}}}function n1(n,a){vr.X(n,a);var o=Rs;if(o&&n){var u=Nr(o).hoistableScripts,p=Cs(n),_=u.get(p);_||(_=o.querySelector(Ko(p)),_||(n=m({src:n,async:!0},a),(a=Ei.get(p))&&Oh(n,a),_=o.createElement("script"),fn(_),On(_,"link",n),o.head.appendChild(_)),_={type:"script",instance:_,count:1,state:null},u.set(p,_))}}function i1(n,a){vr.M(n,a);var o=Rs;if(o&&n){var u=Nr(o).hoistableScripts,p=Cs(n),_=u.get(p);_||(_=o.querySelector(Ko(p)),_||(n=m({src:n,async:!0,type:"module"},a),(a=Ei.get(p))&&Oh(n,a),_=o.createElement("script"),fn(_),On(_,"link",n),o.head.appendChild(_)),_={type:"script",instance:_,count:1,state:null},u.set(p,_))}}function $_(n,a,o,u){var p=(p=gt.current)?Ru(p):null;if(!p)throw Error(r(446));switch(n){case"meta":case"title":return null;case"style":return typeof o.precedence=="string"&&typeof o.href=="string"?(a=ws(o.href),o=Nr(p).hoistableStyles,u=o.get(a),u||(u={type:"style",instance:null,count:0,state:null},o.set(a,u)),u):{type:"void",instance:null,count:0,state:null};case"link":if(o.rel==="stylesheet"&&typeof o.href=="string"&&typeof o.precedence=="string"){n=ws(o.href);var _=Nr(p).hoistableStyles,U=_.get(n);if(U||(p=p.ownerDocument||p,U={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},_.set(n,U),(_=p.querySelector(Zo(n)))&&!_._p&&(U.instance=_,U.state.loading=5),Ei.has(n)||(o={rel:"preload",as:"style",href:o.href,crossOrigin:o.crossOrigin,integrity:o.integrity,media:o.media,hrefLang:o.hrefLang,referrerPolicy:o.referrerPolicy},Ei.set(n,o),_||r1(p,n,o,U.state))),a&&u===null)throw Error(r(528,""));return U}if(a&&u!==null)throw Error(r(529,""));return null;case"script":return a=o.async,o=o.src,typeof o=="string"&&a&&typeof a!="function"&&typeof a!="symbol"?(a=Cs(o),o=Nr(p).hoistableScripts,u=o.get(a),u||(u={type:"script",instance:null,count:0,state:null},o.set(a,u)),u):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,n))}}function ws(n){return'href="'+Ye(n)+'"'}function Zo(n){return'link[rel="stylesheet"]['+n+"]"}function tv(n){return m({},n,{"data-precedence":n.precedence,precedence:null})}function r1(n,a,o,u){n.querySelector('link[rel="preload"][as="style"]['+a+"]")?u.loading=1:(a=n.createElement("link"),u.preload=a,a.addEventListener("load",function(){return u.loading|=1}),a.addEventListener("error",function(){return u.loading|=2}),On(a,"link",o),fn(a),n.head.appendChild(a))}function Cs(n){return'[src="'+Ye(n)+'"]'}function Ko(n){return"script[async]"+n}function ev(n,a,o){if(a.count++,a.instance===null)switch(a.type){case"style":var u=n.querySelector('style[data-href~="'+Ye(o.href)+'"]');if(u)return a.instance=u,fn(u),u;var p=m({},o,{"data-href":o.href,"data-precedence":o.precedence,href:null,precedence:null});return u=(n.ownerDocument||n).createElement("style"),fn(u),On(u,"style",p),wu(u,o.precedence,n),a.instance=u;case"stylesheet":p=ws(o.href);var _=n.querySelector(Zo(p));if(_)return a.state.loading|=4,a.instance=_,fn(_),_;u=tv(o),(p=Ei.get(p))&&Ph(u,p),_=(n.ownerDocument||n).createElement("link"),fn(_);var U=_;return U._p=new Promise(function(z,G){U.onload=z,U.onerror=G}),On(_,"link",u),a.state.loading|=4,wu(_,o.precedence,n),a.instance=_;case"script":return _=Cs(o.src),(p=n.querySelector(Ko(_)))?(a.instance=p,fn(p),p):(u=o,(p=Ei.get(_))&&(u=m({},o),Oh(u,p)),n=n.ownerDocument||n,p=n.createElement("script"),fn(p),On(p,"link",u),n.head.appendChild(p),a.instance=p);case"void":return null;default:throw Error(r(443,a.type))}else a.type==="stylesheet"&&(a.state.loading&4)===0&&(u=a.instance,a.state.loading|=4,wu(u,o.precedence,n));return a.instance}function wu(n,a,o){for(var u=o.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),p=u.length?u[u.length-1]:null,_=p,U=0;U<u.length;U++){var z=u[U];if(z.dataset.precedence===a)_=z;else if(_!==p)break}_?_.parentNode.insertBefore(n,_.nextSibling):(a=o.nodeType===9?o.head:o,a.insertBefore(n,a.firstChild))}function Ph(n,a){n.crossOrigin==null&&(n.crossOrigin=a.crossOrigin),n.referrerPolicy==null&&(n.referrerPolicy=a.referrerPolicy),n.title==null&&(n.title=a.title)}function Oh(n,a){n.crossOrigin==null&&(n.crossOrigin=a.crossOrigin),n.referrerPolicy==null&&(n.referrerPolicy=a.referrerPolicy),n.integrity==null&&(n.integrity=a.integrity)}var Cu=null;function nv(n,a,o){if(Cu===null){var u=new Map,p=Cu=new Map;p.set(o,u)}else p=Cu,u=p.get(o),u||(u=new Map,p.set(o,u));if(u.has(n))return u;for(u.set(n,null),o=o.getElementsByTagName(n),p=0;p<o.length;p++){var _=o[p];if(!(_[Lr]||_[gn]||n==="link"&&_.getAttribute("rel")==="stylesheet")&&_.namespaceURI!=="http://www.w3.org/2000/svg"){var U=_.getAttribute(a)||"";U=n+U;var z=u.get(U);z?z.push(_):u.set(U,[_])}}return u}function iv(n,a,o){n=n.ownerDocument||n,n.head.insertBefore(o,a==="title"?n.querySelector("head > title"):null)}function a1(n,a,o){if(o===1||a.itemProp!=null)return!1;switch(n){case"meta":case"title":return!0;case"style":if(typeof a.precedence!="string"||typeof a.href!="string"||a.href==="")break;return!0;case"link":if(typeof a.rel!="string"||typeof a.href!="string"||a.href===""||a.onLoad||a.onError)break;switch(a.rel){case"stylesheet":return n=a.disabled,typeof a.precedence=="string"&&n==null;default:return!0}case"script":if(a.async&&typeof a.async!="function"&&typeof a.async!="symbol"&&!a.onLoad&&!a.onError&&a.src&&typeof a.src=="string")return!0}return!1}function rv(n){return!(n.type==="stylesheet"&&(n.state.loading&3)===0)}var Qo=null;function s1(){}function o1(n,a,o){if(Qo===null)throw Error(r(475));var u=Qo;if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var p=ws(o.href),_=n.querySelector(Zo(p));if(_){n=_._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(u.count++,u=Du.bind(u),n.then(u,u)),a.state.loading|=4,a.instance=_,fn(_);return}_=n.ownerDocument||n,o=tv(o),(p=Ei.get(p))&&Ph(o,p),_=_.createElement("link"),fn(_);var U=_;U._p=new Promise(function(z,G){U.onload=z,U.onerror=G}),On(_,"link",o),a.instance=_}u.stylesheets===null&&(u.stylesheets=new Map),u.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(u.count++,a=Du.bind(u),n.addEventListener("load",a),n.addEventListener("error",a))}}function l1(){if(Qo===null)throw Error(r(475));var n=Qo;return n.stylesheets&&n.count===0&&zh(n,n.stylesheets),0<n.count?function(a){var o=setTimeout(function(){if(n.stylesheets&&zh(n,n.stylesheets),n.unsuspend){var u=n.unsuspend;n.unsuspend=null,u()}},6e4);return n.unsuspend=a,function(){n.unsuspend=null,clearTimeout(o)}}:null}function Du(){if(this.count--,this.count===0){if(this.stylesheets)zh(this,this.stylesheets);else if(this.unsuspend){var n=this.unsuspend;this.unsuspend=null,n()}}}var Lu=null;function zh(n,a){n.stylesheets=null,n.unsuspend!==null&&(n.count++,Lu=new Map,a.forEach(u1,n),Lu=null,Du.call(n))}function u1(n,a){if(!(a.state.loading&4)){var o=Lu.get(n);if(o)var u=o.get(null);else{o=new Map,Lu.set(n,o);for(var p=n.querySelectorAll("link[data-precedence],style[data-precedence]"),_=0;_<p.length;_++){var U=p[_];(U.nodeName==="LINK"||U.getAttribute("media")!=="not all")&&(o.set(U.dataset.precedence,U),u=U)}u&&o.set(null,u)}p=a.instance,U=p.getAttribute("data-precedence"),_=o.get(U)||u,_===u&&o.set(null,p),o.set(U,p),this.count++,u=Du.bind(this),p.addEventListener("load",u),p.addEventListener("error",u),_?_.parentNode.insertBefore(p,_.nextSibling):(n=n.nodeType===9?n.head:n,n.insertBefore(p,n.firstChild)),a.state.loading|=4}}var Jo={$$typeof:S,Provider:null,Consumer:null,_currentValue:J,_currentValue2:J,_threadCount:0};function c1(n,a,o,u,p,_,U,z){this.tag=1,this.containerInfo=n,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=mt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=mt(0),this.hiddenUpdates=mt(null),this.identifierPrefix=u,this.onUncaughtError=p,this.onCaughtError=_,this.onRecoverableError=U,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.incompleteTransitions=new Map}function av(n,a,o,u,p,_,U,z,G,st,_t,Et){return n=new c1(n,a,o,U,z,G,st,Et),a=1,_===!0&&(a|=24),_=ai(3,null,null,a),n.current=_,_.stateNode=n,a=_f(),a.refCount++,n.pooledCache=a,a.refCount++,_.memoizedState={element:u,isDehydrated:o,cache:a},Sf(_),n}function sv(n){return n?(n=ss,n):ss}function ov(n,a,o,u,p,_){p=sv(p),u.context===null?u.context=p:u.pendingContext=p,u=Fr(a),u.payload={element:o},_=_===void 0?null:_,_!==null&&(u.callback=_),o=Br(n,u,a),o!==null&&(ci(o,n,a),wo(o,n,a))}function lv(n,a){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var o=n.retryLane;n.retryLane=o!==0&&o<a?o:a}}function Ih(n,a){lv(n,a),(n=n.alternate)&&lv(n,a)}function uv(n){if(n.tag===13){var a=as(n,67108864);a!==null&&ci(a,n,67108864),Ih(n,67108864)}}var Uu=!0;function f1(n,a,o,u){var p=H.T;H.T=null;var _=Z.p;try{Z.p=2,Fh(n,a,o,u)}finally{Z.p=_,H.T=p}}function h1(n,a,o,u){var p=H.T;H.T=null;var _=Z.p;try{Z.p=8,Fh(n,a,o,u)}finally{Z.p=_,H.T=p}}function Fh(n,a,o,u){if(Uu){var p=Bh(u);if(p===null)Th(n,a,u,Nu,o),fv(n,u);else if(p1(p,n,a,o,u))u.stopPropagation();else if(fv(n,u),a&4&&-1<d1.indexOf(n)){for(;p!==null;){var _=er(p);if(_!==null)switch(_.tag){case 3:if(_=_.stateNode,_.current.memoizedState.isDehydrated){var U=Dt(_.pendingLanes);if(U!==0){var z=_;for(z.pendingLanes|=2,z.entangledLanes|=2;U;){var G=1<<31-Tt(U);z.entanglements[1]|=G,U&=~G}Gi(_),(ze&6)===0&&(gu=re()+500,Xo(0))}}break;case 13:z=as(_,2),z!==null&&ci(z,_,2),vu(),Ih(_,2)}if(_=Bh(u),_===null&&Th(n,a,u,Nu,o),_===p)break;p=_}p!==null&&u.stopPropagation()}else Th(n,a,u,null,o)}}function Bh(n){return n=Gc(n),kh(n)}var Nu=null;function kh(n){if(Nu=null,n=tr(n),n!==null){var a=l(n);if(a===null)n=null;else{var o=a.tag;if(o===13){if(n=c(a),n!==null)return n;n=null}else if(o===3){if(a.stateNode.current.memoizedState.isDehydrated)return a.tag===3?a.stateNode.containerInfo:null;n=null}else a!==n&&(n=null)}}return Nu=n,null}function cv(n){switch(n){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(qt()){case Le:return 2;case Vt:return 8;case V:case I:return 32;case lt:return 268435456;default:return 32}default:return 32}}var Hh=!1,Jr=null,$r=null,ta=null,$o=new Map,tl=new Map,ea=[],d1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function fv(n,a){switch(n){case"focusin":case"focusout":Jr=null;break;case"dragenter":case"dragleave":$r=null;break;case"mouseover":case"mouseout":ta=null;break;case"pointerover":case"pointerout":$o.delete(a.pointerId);break;case"gotpointercapture":case"lostpointercapture":tl.delete(a.pointerId)}}function el(n,a,o,u,p,_){return n===null||n.nativeEvent!==_?(n={blockedOn:a,domEventName:o,eventSystemFlags:u,nativeEvent:_,targetContainers:[p]},a!==null&&(a=er(a),a!==null&&uv(a)),n):(n.eventSystemFlags|=u,a=n.targetContainers,p!==null&&a.indexOf(p)===-1&&a.push(p),n)}function p1(n,a,o,u,p){switch(a){case"focusin":return Jr=el(Jr,n,a,o,u,p),!0;case"dragenter":return $r=el($r,n,a,o,u,p),!0;case"mouseover":return ta=el(ta,n,a,o,u,p),!0;case"pointerover":var _=p.pointerId;return $o.set(_,el($o.get(_)||null,n,a,o,u,p)),!0;case"gotpointercapture":return _=p.pointerId,tl.set(_,el(tl.get(_)||null,n,a,o,u,p)),!0}return!1}function hv(n){var a=tr(n.target);if(a!==null){var o=l(a);if(o!==null){if(a=o.tag,a===13){if(a=c(o),a!==null){n.blockedOn=a,ii(n.priority,function(){if(o.tag===13){var u=ui();u=je(u);var p=as(o,u);p!==null&&ci(p,o,u),Ih(o,u)}});return}}else if(a===3&&o.stateNode.current.memoizedState.isDehydrated){n.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Pu(n){if(n.blockedOn!==null)return!1;for(var a=n.targetContainers;0<a.length;){var o=Bh(n.nativeEvent);if(o===null){o=n.nativeEvent;var u=new o.constructor(o.type,o);Vc=u,o.target.dispatchEvent(u),Vc=null}else return a=er(o),a!==null&&uv(a),n.blockedOn=o,!1;a.shift()}return!0}function dv(n,a,o){Pu(n)&&o.delete(a)}function m1(){Hh=!1,Jr!==null&&Pu(Jr)&&(Jr=null),$r!==null&&Pu($r)&&($r=null),ta!==null&&Pu(ta)&&(ta=null),$o.forEach(dv),tl.forEach(dv)}function Ou(n,a){n.blockedOn===a&&(n.blockedOn=null,Hh||(Hh=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,m1)))}var zu=null;function pv(n){zu!==n&&(zu=n,i.unstable_scheduleCallback(i.unstable_NormalPriority,function(){zu===n&&(zu=null);for(var a=0;a<n.length;a+=3){var o=n[a],u=n[a+1],p=n[a+2];if(typeof u!="function"){if(kh(u||o)===null)continue;break}var _=er(o);_!==null&&(n.splice(a,3),a-=3,kf(_,{pending:!0,data:p,method:o.method,action:u},u,p))}}))}function nl(n){function a(G){return Ou(G,n)}Jr!==null&&Ou(Jr,n),$r!==null&&Ou($r,n),ta!==null&&Ou(ta,n),$o.forEach(a),tl.forEach(a);for(var o=0;o<ea.length;o++){var u=ea[o];u.blockedOn===n&&(u.blockedOn=null)}for(;0<ea.length&&(o=ea[0],o.blockedOn===null);)hv(o),o.blockedOn===null&&ea.shift();if(o=(n.ownerDocument||n).$$reactFormReplay,o!=null)for(u=0;u<o.length;u+=3){var p=o[u],_=o[u+1],U=p[Ln]||null;if(typeof _=="function")U||pv(o);else if(U){var z=null;if(_&&_.hasAttribute("formAction")){if(p=_,U=_[Ln]||null)z=U.formAction;else if(kh(p)!==null)continue}else z=U.action;typeof z=="function"?o[u+1]=z:(o.splice(u,3),u-=3),pv(o)}}}function Vh(n){this._internalRoot=n}Iu.prototype.render=Vh.prototype.render=function(n){var a=this._internalRoot;if(a===null)throw Error(r(409));var o=a.current,u=ui();ov(o,u,n,a,null,null)},Iu.prototype.unmount=Vh.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var a=n.containerInfo;ov(n.current,2,null,n,null,null),vu(),a[Yn]=null}};function Iu(n){this._internalRoot=n}Iu.prototype.unstable_scheduleHydration=function(n){if(n){var a=Ae();n={blockedOn:null,target:n,priority:a};for(var o=0;o<ea.length&&a!==0&&a<ea[o].priority;o++);ea.splice(o,0,n),o===0&&hv(n)}};var mv=t.version;if(mv!=="19.1.0")throw Error(r(527,mv,"19.1.0"));Z.findDOMNode=function(n){var a=n._reactInternals;if(a===void 0)throw typeof n.render=="function"?Error(r(188)):(n=Object.keys(n).join(","),Error(r(268,n)));return n=d(a),n=n!==null?h(n):null,n=n===null?null:n.stateNode,n};var g1={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:H,reconcilerVersion:"19.1.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fu.isDisabled&&Fu.supportsFiber)try{$=Fu.inject(g1),St=Fu}catch{}}return rl.createRoot=function(n,a){if(!s(n))throw Error(r(299));var o=!1,u="",p=L0,_=U0,U=N0,z=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(p=a.onUncaughtError),a.onCaughtError!==void 0&&(_=a.onCaughtError),a.onRecoverableError!==void 0&&(U=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(z=a.unstable_transitionCallbacks)),a=av(n,1,!1,null,null,o,u,p,_,U,z,null),n[Yn]=a.current,bh(n),new Vh(a)},rl.hydrateRoot=function(n,a,o){if(!s(n))throw Error(r(299));var u=!1,p="",_=L0,U=U0,z=N0,G=null,st=null;return o!=null&&(o.unstable_strictMode===!0&&(u=!0),o.identifierPrefix!==void 0&&(p=o.identifierPrefix),o.onUncaughtError!==void 0&&(_=o.onUncaughtError),o.onCaughtError!==void 0&&(U=o.onCaughtError),o.onRecoverableError!==void 0&&(z=o.onRecoverableError),o.unstable_transitionCallbacks!==void 0&&(G=o.unstable_transitionCallbacks),o.formState!==void 0&&(st=o.formState)),a=av(n,1,!0,a,o??null,u,p,_,U,z,G,st),a.context=sv(null),o=a.current,u=ui(),u=je(u),p=Fr(u),p.callback=null,Br(o,p,u),o=u,a.current.lanes=o,Mt(a,o),Gi(a),n[Yn]=a.current,bh(n),new Iu(a)},rl.version="19.1.0",rl}var Tv;function A1(){if(Tv)return Xh.exports;Tv=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(t){console.error(t)}}return i(),Xh.exports=T1(),Xh.exports}var R1=A1();const w1="/assets/logo1-Dj_0kRk4.png";function C1({onManual:i}){return Kt.jsxs("header",{className:"title-bar logo-only",children:[Kt.jsx("div",{className:"logo-container",children:Kt.jsx("img",{src:w1,alt:"LaserTracer Logo",className:"logo-image"})}),Kt.jsxs("button",{className:"graphite",onClick:i,children:["Instruction Manual",Kt.jsx("span",{className:"subtext",children:"(LLM friendly)"})]})]})}function D1(i,t){const e={};return(i[i.length-1]===""?[...i,""]:i).join((e.padRight?" ":"")+","+(e.padLeft===!1?"":" ")).trim()}const L1=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,U1=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,N1={};function Av(i,t){return(N1.jsx?U1:L1).test(i)}const P1=/[ \t\n\f\r]/g;function O1(i){return typeof i=="object"?i.type==="text"?Rv(i.value):!1:Rv(i)}function Rv(i){return i.replace(P1,"")===""}class El{constructor(t,e,r){this.property=t,this.normal=e,r&&(this.space=r)}}El.prototype.property={};El.prototype.normal={};El.prototype.space=null;function Gx(i,t){const e={},r={};let s=-1;for(;++s<i.length;)Object.assign(e,i[s].property),Object.assign(r,i[s].normal);return new El(e,r,t)}function pp(i){return i.toLowerCase()}class wi{constructor(t,e){this.property=t,this.attribute=e}}wi.prototype.space=null;wi.prototype.boolean=!1;wi.prototype.booleanish=!1;wi.prototype.overloadedBoolean=!1;wi.prototype.number=!1;wi.prototype.commaSeparated=!1;wi.prototype.spaceSeparated=!1;wi.prototype.commaOrSpaceSeparated=!1;wi.prototype.mustUseProperty=!1;wi.prototype.defined=!1;let z1=0;const ue=Qa(),mn=Qa(),qx=Qa(),Ct=Qa(),Ke=Qa(),Ks=Qa(),di=Qa();function Qa(){return 2**++z1}const mp=Object.freeze(Object.defineProperty({__proto__:null,boolean:ue,booleanish:mn,commaOrSpaceSeparated:di,commaSeparated:Ks,number:Ct,overloadedBoolean:qx,spaceSeparated:Ke},Symbol.toStringTag,{value:"Module"})),Zh=Object.keys(mp);class gm extends wi{constructor(t,e,r,s){let l=-1;if(super(t,e),wv(this,"space",s),typeof r=="number")for(;++l<Zh.length;){const c=Zh[l];wv(this,Zh[l],(r&mp[c])===mp[c])}}}gm.prototype.defined=!0;function wv(i,t,e){e&&(i[t]=e)}const I1={}.hasOwnProperty;function so(i){const t={},e={};let r;for(r in i.properties)if(I1.call(i.properties,r)){const s=i.properties[r],l=new gm(r,i.transform(i.attributes||{},r),s,i.space);i.mustUseProperty&&i.mustUseProperty.includes(r)&&(l.mustUseProperty=!0),t[r]=l,e[pp(r)]=r,e[pp(l.attribute)]=r}return new El(t,e,i.space)}const Xx=so({space:"xlink",transform(i,t){return"xlink:"+t.slice(5).toLowerCase()},properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null}}),Wx=so({space:"xml",transform(i,t){return"xml:"+t.slice(3).toLowerCase()},properties:{xmlLang:null,xmlBase:null,xmlSpace:null}});function jx(i,t){return t in i?i[t]:t}function Yx(i,t){return jx(i,t.toLowerCase())}const Zx=so({space:"xmlns",attributes:{xmlnsxlink:"xmlns:xlink"},transform:Yx,properties:{xmlns:null,xmlnsXLink:null}}),Kx=so({transform(i,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()},properties:{ariaActiveDescendant:null,ariaAtomic:mn,ariaAutoComplete:null,ariaBusy:mn,ariaChecked:mn,ariaColCount:Ct,ariaColIndex:Ct,ariaColSpan:Ct,ariaControls:Ke,ariaCurrent:null,ariaDescribedBy:Ke,ariaDetails:null,ariaDisabled:mn,ariaDropEffect:Ke,ariaErrorMessage:null,ariaExpanded:mn,ariaFlowTo:Ke,ariaGrabbed:mn,ariaHasPopup:null,ariaHidden:mn,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:Ke,ariaLevel:Ct,ariaLive:null,ariaModal:mn,ariaMultiLine:mn,ariaMultiSelectable:mn,ariaOrientation:null,ariaOwns:Ke,ariaPlaceholder:null,ariaPosInSet:Ct,ariaPressed:mn,ariaReadOnly:mn,ariaRelevant:null,ariaRequired:mn,ariaRoleDescription:Ke,ariaRowCount:Ct,ariaRowIndex:Ct,ariaRowSpan:Ct,ariaSelected:mn,ariaSetSize:Ct,ariaSort:null,ariaValueMax:Ct,ariaValueMin:Ct,ariaValueNow:Ct,ariaValueText:null,role:null}}),F1=so({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:Yx,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Ks,acceptCharset:Ke,accessKey:Ke,action:null,allow:null,allowFullScreen:ue,allowPaymentRequest:ue,allowUserMedia:ue,alt:null,as:null,async:ue,autoCapitalize:null,autoComplete:Ke,autoFocus:ue,autoPlay:ue,blocking:Ke,capture:null,charSet:null,checked:ue,cite:null,className:Ke,cols:Ct,colSpan:null,content:null,contentEditable:mn,controls:ue,controlsList:Ke,coords:Ct|Ks,crossOrigin:null,data:null,dateTime:null,decoding:null,default:ue,defer:ue,dir:null,dirName:null,disabled:ue,download:qx,draggable:mn,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:ue,formTarget:null,headers:Ke,height:Ct,hidden:ue,high:Ct,href:null,hrefLang:null,htmlFor:Ke,httpEquiv:Ke,id:null,imageSizes:null,imageSrcSet:null,inert:ue,inputMode:null,integrity:null,is:null,isMap:ue,itemId:null,itemProp:Ke,itemRef:Ke,itemScope:ue,itemType:Ke,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:ue,low:Ct,manifest:null,max:null,maxLength:Ct,media:null,method:null,min:null,minLength:Ct,multiple:ue,muted:ue,name:null,nonce:null,noModule:ue,noValidate:ue,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:ue,optimum:Ct,pattern:null,ping:Ke,placeholder:null,playsInline:ue,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:ue,referrerPolicy:null,rel:Ke,required:ue,reversed:ue,rows:Ct,rowSpan:Ct,sandbox:Ke,scope:null,scoped:ue,seamless:ue,selected:ue,shadowRootClonable:ue,shadowRootDelegatesFocus:ue,shadowRootMode:null,shape:null,size:Ct,sizes:null,slot:null,span:Ct,spellCheck:mn,src:null,srcDoc:null,srcLang:null,srcSet:null,start:Ct,step:null,style:null,tabIndex:Ct,target:null,title:null,translate:null,type:null,typeMustMatch:ue,useMap:null,value:mn,width:Ct,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:Ke,axis:null,background:null,bgColor:null,border:Ct,borderColor:null,bottomMargin:Ct,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:ue,declare:ue,event:null,face:null,frame:null,frameBorder:null,hSpace:Ct,leftMargin:Ct,link:null,longDesc:null,lowSrc:null,marginHeight:Ct,marginWidth:Ct,noResize:ue,noHref:ue,noShade:ue,noWrap:ue,object:null,profile:null,prompt:null,rev:null,rightMargin:Ct,rules:null,scheme:null,scrolling:mn,standby:null,summary:null,text:null,topMargin:Ct,valueType:null,version:null,vAlign:null,vLink:null,vSpace:Ct,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:ue,disableRemotePlayback:ue,prefix:null,property:null,results:Ct,security:null,unselectable:null}}),B1=so({space:"svg",attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},transform:jx,properties:{about:di,accentHeight:Ct,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:Ct,amplitude:Ct,arabicForm:null,ascent:Ct,attributeName:null,attributeType:null,azimuth:Ct,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:Ct,by:null,calcMode:null,capHeight:Ct,className:Ke,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:Ct,diffuseConstant:Ct,direction:null,display:null,dur:null,divisor:Ct,dominantBaseline:null,download:ue,dx:null,dy:null,edgeMode:null,editable:null,elevation:Ct,enableBackground:null,end:null,event:null,exponent:Ct,externalResourcesRequired:null,fill:null,fillOpacity:Ct,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Ks,g2:Ks,glyphName:Ks,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:Ct,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:Ct,horizOriginX:Ct,horizOriginY:Ct,id:null,ideographic:Ct,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:Ct,k:Ct,k1:Ct,k2:Ct,k3:Ct,k4:Ct,kernelMatrix:di,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:Ct,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:Ct,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:Ct,overlineThickness:Ct,paintOrder:null,panose1:null,path:null,pathLength:Ct,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:Ke,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:Ct,pointsAtY:Ct,pointsAtZ:Ct,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:di,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:di,rev:di,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:di,requiredFeatures:di,requiredFonts:di,requiredFormats:di,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:Ct,specularExponent:Ct,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:Ct,strikethroughThickness:Ct,string:null,stroke:null,strokeDashArray:di,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:Ct,strokeOpacity:Ct,strokeWidth:null,style:null,surfaceScale:Ct,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:di,tabIndex:Ct,tableValues:null,target:null,targetX:Ct,targetY:Ct,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:di,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:Ct,underlineThickness:Ct,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:Ct,values:null,vAlphabetic:Ct,vMathematical:Ct,vectorEffect:null,vHanging:Ct,vIdeographic:Ct,version:null,vertAdvY:Ct,vertOriginX:Ct,vertOriginY:Ct,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:Ct,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null}}),k1=/^data[-\w.:]+$/i,Cv=/-[a-z]/g,H1=/[A-Z]/g;function V1(i,t){const e=pp(t);let r=t,s=wi;if(e in i.normal)return i.property[i.normal[e]];if(e.length>4&&e.slice(0,4)==="data"&&k1.test(t)){if(t.charAt(4)==="-"){const l=t.slice(5).replace(Cv,q1);r="data"+l.charAt(0).toUpperCase()+l.slice(1)}else{const l=t.slice(4);if(!Cv.test(l)){let c=l.replace(H1,G1);c.charAt(0)!=="-"&&(c="-"+c),t="data"+c}}s=gm}return new s(r,t)}function G1(i){return"-"+i.toLowerCase()}function q1(i){return i.charAt(1).toUpperCase()}const X1={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},W1=Gx([Wx,Xx,Zx,Kx,F1],"html"),_m=Gx([Wx,Xx,Zx,Kx,B1],"svg");function j1(i){return i.join(" ").trim()}var Ds={},Kh,Dv;function Y1(){if(Dv)return Kh;Dv=1;var i=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,t=/\n/g,e=/^\s*/,r=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,s=/^:\s*/,l=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,c=/^[;\s]*/,f=/^\s+|\s+$/g,d=`
`,h="/",m="*",g="",v="comment",y="declaration";Kh=function(R,M){if(typeof R!="string")throw new TypeError("First argument must be a string");if(!R)return[];M=M||{};var x=1,D=1;function S(q){var K=q.match(t);K&&(x+=K.length);var X=q.lastIndexOf(d);D=~X?q.length-X:D+q.length}function E(){var q={line:x,column:D};return function(K){return K.position=new A(q),O(),K}}function A(q){this.start=q,this.end={line:x,column:D},this.source=M.source}A.prototype.content=R;function L(q){var K=new Error(M.source+":"+x+":"+D+": "+q);if(K.reason=q,K.filename=M.source,K.line=x,K.column=D,K.source=R,!M.silent)throw K}function P(q){var K=q.exec(R);if(K){var X=K[0];return S(X),R=R.slice(X.length),K}}function O(){P(e)}function C(q){var K;for(q=q||[];K=T();)K!==!1&&q.push(K);return q}function T(){var q=E();if(!(h!=R.charAt(0)||m!=R.charAt(1))){for(var K=2;g!=R.charAt(K)&&(m!=R.charAt(K)||h!=R.charAt(K+1));)++K;if(K+=2,g===R.charAt(K-1))return L("End of comment missing");var X=R.slice(2,K-2);return D+=2,S(X),R=R.slice(K),D+=2,q({type:v,comment:X})}}function N(){var q=E(),K=P(r);if(K){if(T(),!P(s))return L("property missing ':'");var X=P(l),H=q({type:y,property:b(K[0].replace(i,g)),value:X?b(X[0].replace(i,g)):g});return P(c),H}}function k(){var q=[];C(q);for(var K;K=N();)K!==!1&&(q.push(K),C(q));return q}return O(),k()};function b(R){return R?R.replace(f,g):g}return Kh}var Lv;function Z1(){if(Lv)return Ds;Lv=1;var i=Ds&&Ds.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(Ds,"__esModule",{value:!0});var t=i(Y1());function e(r,s){var l=null;if(!r||typeof r!="string")return l;var c=(0,t.default)(r),f=typeof s=="function";return c.forEach(function(d){if(d.type==="declaration"){var h=d.property,m=d.value;f?s(h,m,d):m&&(l=l||{},l[h]=m)}}),l}return Ds.default=e,Ds}var K1=Z1();const Uv=Uc(K1),Q1=Uv.default||Uv,Qx=Jx("end"),vm=Jx("start");function Jx(i){return t;function t(e){const r=e&&e.position&&e.position[i]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}function J1(i){const t=vm(i),e=Qx(i);if(t&&e)return{start:t,end:e}}function dl(i){return!i||typeof i!="object"?"":"position"in i||"type"in i?Nv(i.position):"start"in i||"end"in i?Nv(i):"line"in i||"column"in i?gp(i):""}function gp(i){return Pv(i&&i.line)+":"+Pv(i&&i.column)}function Nv(i){return gp(i&&i.start)+"-"+gp(i&&i.end)}function Pv(i){return i&&typeof i=="number"?i:1}class Vn extends Error{constructor(t,e,r){super(),typeof e=="string"&&(r=e,e=void 0);let s="",l={},c=!1;if(e&&("line"in e&&"column"in e?l={place:e}:"start"in e&&"end"in e?l={place:e}:"type"in e?l={ancestors:[e],place:e.position}:l={...e}),typeof t=="string"?s=t:!l.cause&&t&&(c=!0,s=t.message,l.cause=t),!l.ruleId&&!l.source&&typeof r=="string"){const d=r.indexOf(":");d===-1?l.ruleId=r:(l.source=r.slice(0,d),l.ruleId=r.slice(d+1))}if(!l.place&&l.ancestors&&l.ancestors){const d=l.ancestors[l.ancestors.length-1];d&&(l.place=d.position)}const f=l.place&&"start"in l.place?l.place.start:l.place;this.ancestors=l.ancestors||void 0,this.cause=l.cause||void 0,this.column=f?f.column:void 0,this.fatal=void 0,this.file,this.message=s,this.line=f?f.line:void 0,this.name=dl(l.place)||"1:1",this.place=l.place||void 0,this.reason=this.message,this.ruleId=l.ruleId||void 0,this.source=l.source||void 0,this.stack=c&&l.cause&&typeof l.cause.stack=="string"?l.cause.stack:"",this.actual,this.expected,this.note,this.url}}Vn.prototype.file="";Vn.prototype.name="";Vn.prototype.reason="";Vn.prototype.message="";Vn.prototype.stack="";Vn.prototype.column=void 0;Vn.prototype.line=void 0;Vn.prototype.ancestors=void 0;Vn.prototype.cause=void 0;Vn.prototype.fatal=void 0;Vn.prototype.place=void 0;Vn.prototype.ruleId=void 0;Vn.prototype.source=void 0;const ym={}.hasOwnProperty,$1=new Map,tb=/[A-Z]/g,eb=/-([a-z])/g,nb=new Set(["table","tbody","thead","tfoot","tr"]),ib=new Set(["td","th"]),$x="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function rb(i,t){if(!t||t.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const e=t.filePath||void 0;let r;if(t.development){if(typeof t.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=hb(e,t.jsxDEV)}else{if(typeof t.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof t.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=fb(e,t.jsx,t.jsxs)}const s={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:e,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space==="svg"?_m:W1,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},l=tS(s,i,void 0);return l&&typeof l!="string"?l:s.create(i,s.Fragment,{children:l||void 0},void 0)}function tS(i,t,e){if(t.type==="element")return ab(i,t,e);if(t.type==="mdxFlowExpression"||t.type==="mdxTextExpression")return sb(i,t);if(t.type==="mdxJsxFlowElement"||t.type==="mdxJsxTextElement")return lb(i,t,e);if(t.type==="mdxjsEsm")return ob(i,t);if(t.type==="root")return ub(i,t,e);if(t.type==="text")return cb(i,t)}function ab(i,t,e){const r=i.schema;let s=r;t.tagName.toLowerCase()==="svg"&&r.space==="html"&&(s=_m,i.schema=s),i.ancestors.push(t);const l=nS(i,t.tagName,!1),c=db(i,t);let f=Sm(i,t);return nb.has(t.tagName)&&(f=f.filter(function(d){return typeof d=="string"?!O1(d):!0})),eS(i,c,l,t),xm(c,f),i.ancestors.pop(),i.schema=r,i.create(t,l,c,e)}function sb(i,t){if(t.data&&t.data.estree&&i.evaluater){const r=t.data.estree.body[0];return r.type,i.evaluater.evaluateExpression(r.expression)}gl(i,t.position)}function ob(i,t){if(t.data&&t.data.estree&&i.evaluater)return i.evaluater.evaluateProgram(t.data.estree);gl(i,t.position)}function lb(i,t,e){const r=i.schema;let s=r;t.name==="svg"&&r.space==="html"&&(s=_m,i.schema=s),i.ancestors.push(t);const l=t.name===null?i.Fragment:nS(i,t.name,!0),c=pb(i,t),f=Sm(i,t);return eS(i,c,l,t),xm(c,f),i.ancestors.pop(),i.schema=r,i.create(t,l,c,e)}function ub(i,t,e){const r={};return xm(r,Sm(i,t)),i.create(t,i.Fragment,r,e)}function cb(i,t){return t.value}function eS(i,t,e,r){typeof e!="string"&&e!==i.Fragment&&i.passNode&&(t.node=r)}function xm(i,t){if(t.length>0){const e=t.length>1?t:t[0];e&&(i.children=e)}}function fb(i,t,e){return r;function r(s,l,c,f){const h=Array.isArray(c.children)?e:t;return f?h(l,c,f):h(l,c)}}function hb(i,t){return e;function e(r,s,l,c){const f=Array.isArray(l.children),d=vm(r);return t(s,l,c,f,{columnNumber:d?d.column-1:void 0,fileName:i,lineNumber:d?d.line:void 0},void 0)}}function db(i,t){const e={};let r,s;for(s in t.properties)if(s!=="children"&&ym.call(t.properties,s)){const l=mb(i,s,t.properties[s]);if(l){const[c,f]=l;i.tableCellAlignToStyle&&c==="align"&&typeof f=="string"&&ib.has(t.tagName)?r=f:e[c]=f}}if(r){const l=e.style||(e.style={});l[i.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return e}function pb(i,t){const e={};for(const r of t.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&i.evaluater){const l=r.data.estree.body[0];l.type;const c=l.expression;c.type;const f=c.properties[0];f.type,Object.assign(e,i.evaluater.evaluateExpression(f.argument))}else gl(i,t.position);else{const s=r.name;let l;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&i.evaluater){const f=r.value.data.estree.body[0];f.type,l=i.evaluater.evaluateExpression(f.expression)}else gl(i,t.position);else l=r.value===null?!0:r.value;e[s]=l}return e}function Sm(i,t){const e=[];let r=-1;const s=i.passKeys?new Map:$1;for(;++r<t.children.length;){const l=t.children[r];let c;if(i.passKeys){const d=l.type==="element"?l.tagName:l.type==="mdxJsxFlowElement"||l.type==="mdxJsxTextElement"?l.name:void 0;if(d){const h=s.get(d)||0;c=d+"-"+h,s.set(d,h+1)}}const f=tS(i,l,c);f!==void 0&&e.push(f)}return e}function mb(i,t,e){const r=V1(i.schema,t);if(!(e==null||typeof e=="number"&&Number.isNaN(e))){if(Array.isArray(e)&&(e=r.commaSeparated?D1(e):j1(e)),r.property==="style"){let s=typeof e=="object"?e:gb(i,String(e));return i.stylePropertyNameCase==="css"&&(s=_b(s)),["style",s]}return[i.elementAttributeNameCase==="react"&&r.space?X1[r.property]||r.property:r.attribute,e]}}function gb(i,t){const e={};try{Q1(t,r)}catch(s){if(!i.ignoreInvalidStyle){const l=s,c=new Vn("Cannot parse `style` attribute",{ancestors:i.ancestors,cause:l,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw c.file=i.filePath||void 0,c.url=$x+"#cannot-parse-style-attribute",c}}return e;function r(s,l){let c=s;c.slice(0,2)!=="--"&&(c.slice(0,4)==="-ms-"&&(c="ms-"+c.slice(4)),c=c.replace(eb,yb)),e[c]=l}}function nS(i,t,e){let r;if(!e)r={type:"Literal",value:t};else if(t.includes(".")){const s=t.split(".");let l=-1,c;for(;++l<s.length;){const f=Av(s[l])?{type:"Identifier",name:s[l]}:{type:"Literal",value:s[l]};c=c?{type:"MemberExpression",object:c,property:f,computed:!!(l&&f.type==="Literal"),optional:!1}:f}r=c}else r=Av(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};if(r.type==="Literal"){const s=r.value;return ym.call(i.components,s)?i.components[s]:s}if(i.evaluater)return i.evaluater.evaluateExpression(r);gl(i)}function gl(i,t){const e=new Vn("Cannot handle MDX estrees without `createEvaluater`",{ancestors:i.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw e.file=i.filePath||void 0,e.url=$x+"#cannot-handle-mdx-estrees-without-createevaluater",e}function _b(i){const t={};let e;for(e in i)ym.call(i,e)&&(t[vb(e)]=i[e]);return t}function vb(i){let t=i.replace(tb,xb);return t.slice(0,3)==="ms-"&&(t="-"+t),t}function yb(i,t){return t.toUpperCase()}function xb(i){return"-"+i.toLowerCase()}const Qh={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},Sb={};function Mb(i,t){const e=Sb,r=typeof e.includeImageAlt=="boolean"?e.includeImageAlt:!0,s=typeof e.includeHtml=="boolean"?e.includeHtml:!0;return iS(i,r,s)}function iS(i,t,e){if(Eb(i)){if("value"in i)return i.type==="html"&&!e?"":i.value;if(t&&"alt"in i&&i.alt)return i.alt;if("children"in i)return Ov(i.children,t,e)}return Array.isArray(i)?Ov(i,t,e):""}function Ov(i,t,e){const r=[];let s=-1;for(;++s<i.length;)r[s]=iS(i[s],t,e);return r.join("")}function Eb(i){return!!(i&&typeof i=="object")}const zv=document.createElement("i");function Mm(i){const t="&"+i+";";zv.innerHTML=t;const e=zv.textContent;return e.charCodeAt(e.length-1)===59&&i!=="semi"||e===t?!1:e}function Qi(i,t,e,r){const s=i.length;let l=0,c;if(t<0?t=-t>s?0:s+t:t=t>s?s:t,e=e>0?e:0,r.length<1e4)c=Array.from(r),c.unshift(t,e),i.splice(...c);else for(e&&i.splice(t,e);l<r.length;)c=r.slice(l,l+1e4),c.unshift(t,0),i.splice(...c),l+=1e4,t+=1e4}function Ai(i,t){return i.length>0?(Qi(i,i.length,0,t),i):t}const Iv={}.hasOwnProperty;function bb(i){const t={};let e=-1;for(;++e<i.length;)Tb(t,i[e]);return t}function Tb(i,t){let e;for(e in t){const s=(Iv.call(i,e)?i[e]:void 0)||(i[e]={}),l=t[e];let c;if(l)for(c in l){Iv.call(s,c)||(s[c]=[]);const f=l[c];Ab(s[c],Array.isArray(f)?f:f?[f]:[])}}}function Ab(i,t){let e=-1;const r=[];for(;++e<t.length;)(t[e].add==="after"?i:r).push(t[e]);Qi(i,0,0,r)}function rS(i,t){const e=Number.parseInt(i,t);return e<9||e===11||e>13&&e<32||e>126&&e<160||e>55295&&e<57344||e>64975&&e<65008||(e&65535)===65535||(e&65535)===65534||e>1114111?"�":String.fromCodePoint(e)}function Qs(i){return i.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Wi=_a(/[A-Za-z]/),mi=_a(/[\dA-Za-z]/),Rb=_a(/[#-'*+\--9=?A-Z^-~]/);function _p(i){return i!==null&&(i<32||i===127)}const vp=_a(/\d/),wb=_a(/[\dA-Fa-f]/),Cb=_a(/[!-/:-@[-`{-~]/);function se(i){return i!==null&&i<-2}function ei(i){return i!==null&&(i<0||i===32)}function Ne(i){return i===-2||i===-1||i===32}const Db=_a(new RegExp("\\p{P}|\\p{S}","u")),Lb=_a(/\s/);function _a(i){return t;function t(e){return e!==null&&e>-1&&i.test(String.fromCharCode(e))}}function oo(i){const t=[];let e=-1,r=0,s=0;for(;++e<i.length;){const l=i.charCodeAt(e);let c="";if(l===37&&mi(i.charCodeAt(e+1))&&mi(i.charCodeAt(e+2)))s=2;else if(l<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l))||(c=String.fromCharCode(l));else if(l>55295&&l<57344){const f=i.charCodeAt(e+1);l<56320&&f>56319&&f<57344?(c=String.fromCharCode(l,f),s=1):c="�"}else c=String.fromCharCode(l);c&&(t.push(i.slice(r,e),encodeURIComponent(c)),r=e+s+1,c=""),s&&(e+=s,s=0)}return t.join("")+i.slice(r)}function Qe(i,t,e,r){const s=r?r-1:Number.POSITIVE_INFINITY;let l=0;return c;function c(d){return Ne(d)?(i.enter(e),f(d)):t(d)}function f(d){return Ne(d)&&l++<s?(i.consume(d),f):(i.exit(e),t(d))}}const Ub={tokenize:Nb};function Nb(i){const t=i.attempt(this.parser.constructs.contentInitial,r,s);let e;return t;function r(f){if(f===null){i.consume(f);return}return i.enter("lineEnding"),i.consume(f),i.exit("lineEnding"),Qe(i,t,"linePrefix")}function s(f){return i.enter("paragraph"),l(f)}function l(f){const d=i.enter("chunkText",{contentType:"text",previous:e});return e&&(e.next=d),e=d,c(f)}function c(f){if(f===null){i.exit("chunkText"),i.exit("paragraph"),i.consume(f);return}return se(f)?(i.consume(f),i.exit("chunkText"),l):(i.consume(f),c)}}const Pb={tokenize:Ob},Fv={tokenize:zb};function Ob(i){const t=this,e=[];let r=0,s,l,c;return f;function f(S){if(r<e.length){const E=e[r];return t.containerState=E[1],i.attempt(E[0].continuation,d,h)(S)}return h(S)}function d(S){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,s&&D();const E=t.events.length;let A=E,L;for(;A--;)if(t.events[A][0]==="exit"&&t.events[A][1].type==="chunkFlow"){L=t.events[A][1].end;break}x(r);let P=E;for(;P<t.events.length;)t.events[P][1].end=Object.assign({},L),P++;return Qi(t.events,A+1,0,t.events.slice(E)),t.events.length=P,h(S)}return f(S)}function h(S){if(r===e.length){if(!s)return v(S);if(s.currentConstruct&&s.currentConstruct.concrete)return b(S);t.interrupt=!!(s.currentConstruct&&!s._gfmTableDynamicInterruptHack)}return t.containerState={},i.check(Fv,m,g)(S)}function m(S){return s&&D(),x(r),v(S)}function g(S){return t.parser.lazy[t.now().line]=r!==e.length,c=t.now().offset,b(S)}function v(S){return t.containerState={},i.attempt(Fv,y,b)(S)}function y(S){return r++,e.push([t.currentConstruct,t.containerState]),v(S)}function b(S){if(S===null){s&&D(),x(0),i.consume(S);return}return s=s||t.parser.flow(t.now()),i.enter("chunkFlow",{contentType:"flow",previous:l,_tokenizer:s}),R(S)}function R(S){if(S===null){M(i.exit("chunkFlow"),!0),x(0),i.consume(S);return}return se(S)?(i.consume(S),M(i.exit("chunkFlow")),r=0,t.interrupt=void 0,f):(i.consume(S),R)}function M(S,E){const A=t.sliceStream(S);if(E&&A.push(null),S.previous=l,l&&(l.next=S),l=S,s.defineSkip(S.start),s.write(A),t.parser.lazy[S.start.line]){let L=s.events.length;for(;L--;)if(s.events[L][1].start.offset<c&&(!s.events[L][1].end||s.events[L][1].end.offset>c))return;const P=t.events.length;let O=P,C,T;for(;O--;)if(t.events[O][0]==="exit"&&t.events[O][1].type==="chunkFlow"){if(C){T=t.events[O][1].end;break}C=!0}for(x(r),L=P;L<t.events.length;)t.events[L][1].end=Object.assign({},T),L++;Qi(t.events,O+1,0,t.events.slice(P)),t.events.length=L}}function x(S){let E=e.length;for(;E-- >S;){const A=e[E];t.containerState=A[1],A[0].exit.call(t,i)}e.length=S}function D(){s.write([null]),l=void 0,s=void 0,t.containerState._closeFlow=void 0}}function zb(i,t,e){return Qe(i,i.attempt(this.parser.constructs.document,t,e),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Bv(i){if(i===null||ei(i)||Lb(i))return 1;if(Db(i))return 2}function Em(i,t,e){const r=[];let s=-1;for(;++s<i.length;){const l=i[s].resolveAll;l&&!r.includes(l)&&(t=l(t,e),r.push(l))}return t}const yp={name:"attention",tokenize:Fb,resolveAll:Ib};function Ib(i,t){let e=-1,r,s,l,c,f,d,h,m;for(;++e<i.length;)if(i[e][0]==="enter"&&i[e][1].type==="attentionSequence"&&i[e][1]._close){for(r=e;r--;)if(i[r][0]==="exit"&&i[r][1].type==="attentionSequence"&&i[r][1]._open&&t.sliceSerialize(i[r][1]).charCodeAt(0)===t.sliceSerialize(i[e][1]).charCodeAt(0)){if((i[r][1]._close||i[e][1]._open)&&(i[e][1].end.offset-i[e][1].start.offset)%3&&!((i[r][1].end.offset-i[r][1].start.offset+i[e][1].end.offset-i[e][1].start.offset)%3))continue;d=i[r][1].end.offset-i[r][1].start.offset>1&&i[e][1].end.offset-i[e][1].start.offset>1?2:1;const g=Object.assign({},i[r][1].end),v=Object.assign({},i[e][1].start);kv(g,-d),kv(v,d),c={type:d>1?"strongSequence":"emphasisSequence",start:g,end:Object.assign({},i[r][1].end)},f={type:d>1?"strongSequence":"emphasisSequence",start:Object.assign({},i[e][1].start),end:v},l={type:d>1?"strongText":"emphasisText",start:Object.assign({},i[r][1].end),end:Object.assign({},i[e][1].start)},s={type:d>1?"strong":"emphasis",start:Object.assign({},c.start),end:Object.assign({},f.end)},i[r][1].end=Object.assign({},c.start),i[e][1].start=Object.assign({},f.end),h=[],i[r][1].end.offset-i[r][1].start.offset&&(h=Ai(h,[["enter",i[r][1],t],["exit",i[r][1],t]])),h=Ai(h,[["enter",s,t],["enter",c,t],["exit",c,t],["enter",l,t]]),h=Ai(h,Em(t.parser.constructs.insideSpan.null,i.slice(r+1,e),t)),h=Ai(h,[["exit",l,t],["enter",f,t],["exit",f,t],["exit",s,t]]),i[e][1].end.offset-i[e][1].start.offset?(m=2,h=Ai(h,[["enter",i[e][1],t],["exit",i[e][1],t]])):m=0,Qi(i,r-1,e-r+3,h),e=r+h.length-m-2;break}}for(e=-1;++e<i.length;)i[e][1].type==="attentionSequence"&&(i[e][1].type="data");return i}function Fb(i,t){const e=this.parser.constructs.attentionMarkers.null,r=this.previous,s=Bv(r);let l;return c;function c(d){return l=d,i.enter("attentionSequence"),f(d)}function f(d){if(d===l)return i.consume(d),f;const h=i.exit("attentionSequence"),m=Bv(d),g=!m||m===2&&s||e.includes(d),v=!s||s===2&&m||e.includes(r);return h._open=!!(l===42?g:g&&(s||!v)),h._close=!!(l===42?v:v&&(m||!g)),t(d)}}function kv(i,t){i.column+=t,i.offset+=t,i._bufferIndex+=t}const Bb={name:"autolink",tokenize:kb};function kb(i,t,e){let r=0;return s;function s(y){return i.enter("autolink"),i.enter("autolinkMarker"),i.consume(y),i.exit("autolinkMarker"),i.enter("autolinkProtocol"),l}function l(y){return Wi(y)?(i.consume(y),c):h(y)}function c(y){return y===43||y===45||y===46||mi(y)?(r=1,f(y)):h(y)}function f(y){return y===58?(i.consume(y),r=0,d):(y===43||y===45||y===46||mi(y))&&r++<32?(i.consume(y),f):(r=0,h(y))}function d(y){return y===62?(i.exit("autolinkProtocol"),i.enter("autolinkMarker"),i.consume(y),i.exit("autolinkMarker"),i.exit("autolink"),t):y===null||y===32||y===60||_p(y)?e(y):(i.consume(y),d)}function h(y){return y===64?(i.consume(y),m):Rb(y)?(i.consume(y),h):e(y)}function m(y){return mi(y)?g(y):e(y)}function g(y){return y===46?(i.consume(y),r=0,m):y===62?(i.exit("autolinkProtocol").type="autolinkEmail",i.enter("autolinkMarker"),i.consume(y),i.exit("autolinkMarker"),i.exit("autolink"),t):v(y)}function v(y){if((y===45||mi(y))&&r++<63){const b=y===45?v:g;return i.consume(y),b}return e(y)}}const Nc={tokenize:Hb,partial:!0};function Hb(i,t,e){return r;function r(l){return Ne(l)?Qe(i,s,"linePrefix")(l):s(l)}function s(l){return l===null||se(l)?t(l):e(l)}}const aS={name:"blockQuote",tokenize:Vb,continuation:{tokenize:Gb},exit:qb};function Vb(i,t,e){const r=this;return s;function s(c){if(c===62){const f=r.containerState;return f.open||(i.enter("blockQuote",{_container:!0}),f.open=!0),i.enter("blockQuotePrefix"),i.enter("blockQuoteMarker"),i.consume(c),i.exit("blockQuoteMarker"),l}return e(c)}function l(c){return Ne(c)?(i.enter("blockQuotePrefixWhitespace"),i.consume(c),i.exit("blockQuotePrefixWhitespace"),i.exit("blockQuotePrefix"),t):(i.exit("blockQuotePrefix"),t(c))}}function Gb(i,t,e){const r=this;return s;function s(c){return Ne(c)?Qe(i,l,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(c):l(c)}function l(c){return i.attempt(aS,t,e)(c)}}function qb(i){i.exit("blockQuote")}const sS={name:"characterEscape",tokenize:Xb};function Xb(i,t,e){return r;function r(l){return i.enter("characterEscape"),i.enter("escapeMarker"),i.consume(l),i.exit("escapeMarker"),s}function s(l){return Cb(l)?(i.enter("characterEscapeValue"),i.consume(l),i.exit("characterEscapeValue"),i.exit("characterEscape"),t):e(l)}}const oS={name:"characterReference",tokenize:Wb};function Wb(i,t,e){const r=this;let s=0,l,c;return f;function f(g){return i.enter("characterReference"),i.enter("characterReferenceMarker"),i.consume(g),i.exit("characterReferenceMarker"),d}function d(g){return g===35?(i.enter("characterReferenceMarkerNumeric"),i.consume(g),i.exit("characterReferenceMarkerNumeric"),h):(i.enter("characterReferenceValue"),l=31,c=mi,m(g))}function h(g){return g===88||g===120?(i.enter("characterReferenceMarkerHexadecimal"),i.consume(g),i.exit("characterReferenceMarkerHexadecimal"),i.enter("characterReferenceValue"),l=6,c=wb,m):(i.enter("characterReferenceValue"),l=7,c=vp,m(g))}function m(g){if(g===59&&s){const v=i.exit("characterReferenceValue");return c===mi&&!Mm(r.sliceSerialize(v))?e(g):(i.enter("characterReferenceMarker"),i.consume(g),i.exit("characterReferenceMarker"),i.exit("characterReference"),t)}return c(g)&&s++<l?(i.consume(g),m):e(g)}}const Hv={tokenize:Yb,partial:!0},Vv={name:"codeFenced",tokenize:jb,concrete:!0};function jb(i,t,e){const r=this,s={tokenize:A,partial:!0};let l=0,c=0,f;return d;function d(L){return h(L)}function h(L){const P=r.events[r.events.length-1];return l=P&&P[1].type==="linePrefix"?P[2].sliceSerialize(P[1],!0).length:0,f=L,i.enter("codeFenced"),i.enter("codeFencedFence"),i.enter("codeFencedFenceSequence"),m(L)}function m(L){return L===f?(c++,i.consume(L),m):c<3?e(L):(i.exit("codeFencedFenceSequence"),Ne(L)?Qe(i,g,"whitespace")(L):g(L))}function g(L){return L===null||se(L)?(i.exit("codeFencedFence"),r.interrupt?t(L):i.check(Hv,R,E)(L)):(i.enter("codeFencedFenceInfo"),i.enter("chunkString",{contentType:"string"}),v(L))}function v(L){return L===null||se(L)?(i.exit("chunkString"),i.exit("codeFencedFenceInfo"),g(L)):Ne(L)?(i.exit("chunkString"),i.exit("codeFencedFenceInfo"),Qe(i,y,"whitespace")(L)):L===96&&L===f?e(L):(i.consume(L),v)}function y(L){return L===null||se(L)?g(L):(i.enter("codeFencedFenceMeta"),i.enter("chunkString",{contentType:"string"}),b(L))}function b(L){return L===null||se(L)?(i.exit("chunkString"),i.exit("codeFencedFenceMeta"),g(L)):L===96&&L===f?e(L):(i.consume(L),b)}function R(L){return i.attempt(s,E,M)(L)}function M(L){return i.enter("lineEnding"),i.consume(L),i.exit("lineEnding"),x}function x(L){return l>0&&Ne(L)?Qe(i,D,"linePrefix",l+1)(L):D(L)}function D(L){return L===null||se(L)?i.check(Hv,R,E)(L):(i.enter("codeFlowValue"),S(L))}function S(L){return L===null||se(L)?(i.exit("codeFlowValue"),D(L)):(i.consume(L),S)}function E(L){return i.exit("codeFenced"),t(L)}function A(L,P,O){let C=0;return T;function T(X){return L.enter("lineEnding"),L.consume(X),L.exit("lineEnding"),N}function N(X){return L.enter("codeFencedFence"),Ne(X)?Qe(L,k,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(X):k(X)}function k(X){return X===f?(L.enter("codeFencedFenceSequence"),q(X)):O(X)}function q(X){return X===f?(C++,L.consume(X),q):C>=c?(L.exit("codeFencedFenceSequence"),Ne(X)?Qe(L,K,"whitespace")(X):K(X)):O(X)}function K(X){return X===null||se(X)?(L.exit("codeFencedFence"),P(X)):O(X)}}}function Yb(i,t,e){const r=this;return s;function s(c){return c===null?e(c):(i.enter("lineEnding"),i.consume(c),i.exit("lineEnding"),l)}function l(c){return r.parser.lazy[r.now().line]?e(c):t(c)}}const Jh={name:"codeIndented",tokenize:Kb},Zb={tokenize:Qb,partial:!0};function Kb(i,t,e){const r=this;return s;function s(h){return i.enter("codeIndented"),Qe(i,l,"linePrefix",5)(h)}function l(h){const m=r.events[r.events.length-1];return m&&m[1].type==="linePrefix"&&m[2].sliceSerialize(m[1],!0).length>=4?c(h):e(h)}function c(h){return h===null?d(h):se(h)?i.attempt(Zb,c,d)(h):(i.enter("codeFlowValue"),f(h))}function f(h){return h===null||se(h)?(i.exit("codeFlowValue"),c(h)):(i.consume(h),f)}function d(h){return i.exit("codeIndented"),t(h)}}function Qb(i,t,e){const r=this;return s;function s(c){return r.parser.lazy[r.now().line]?e(c):se(c)?(i.enter("lineEnding"),i.consume(c),i.exit("lineEnding"),s):Qe(i,l,"linePrefix",5)(c)}function l(c){const f=r.events[r.events.length-1];return f&&f[1].type==="linePrefix"&&f[2].sliceSerialize(f[1],!0).length>=4?t(c):se(c)?s(c):e(c)}}const Jb={name:"codeText",tokenize:eT,resolve:$b,previous:tT};function $b(i){let t=i.length-4,e=3,r,s;if((i[e][1].type==="lineEnding"||i[e][1].type==="space")&&(i[t][1].type==="lineEnding"||i[t][1].type==="space")){for(r=e;++r<t;)if(i[r][1].type==="codeTextData"){i[e][1].type="codeTextPadding",i[t][1].type="codeTextPadding",e+=2,t-=2;break}}for(r=e-1,t++;++r<=t;)s===void 0?r!==t&&i[r][1].type!=="lineEnding"&&(s=r):(r===t||i[r][1].type==="lineEnding")&&(i[s][1].type="codeTextData",r!==s+2&&(i[s][1].end=i[r-1][1].end,i.splice(s+2,r-s-2),t-=r-s-2,r=s+2),s=void 0);return i}function tT(i){return i!==96||this.events[this.events.length-1][1].type==="characterEscape"}function eT(i,t,e){let r=0,s,l;return c;function c(g){return i.enter("codeText"),i.enter("codeTextSequence"),f(g)}function f(g){return g===96?(i.consume(g),r++,f):(i.exit("codeTextSequence"),d(g))}function d(g){return g===null?e(g):g===32?(i.enter("space"),i.consume(g),i.exit("space"),d):g===96?(l=i.enter("codeTextSequence"),s=0,m(g)):se(g)?(i.enter("lineEnding"),i.consume(g),i.exit("lineEnding"),d):(i.enter("codeTextData"),h(g))}function h(g){return g===null||g===32||g===96||se(g)?(i.exit("codeTextData"),d(g)):(i.consume(g),h)}function m(g){return g===96?(i.consume(g),s++,m):s===r?(i.exit("codeTextSequence"),i.exit("codeText"),t(g)):(l.type="codeTextData",h(g))}}function lS(i){const t={};let e=-1,r,s,l,c,f,d,h;for(;++e<i.length;){for(;e in t;)e=t[e];if(r=i[e],e&&r[1].type==="chunkFlow"&&i[e-1][1].type==="listItemPrefix"&&(d=r[1]._tokenizer.events,l=0,l<d.length&&d[l][1].type==="lineEndingBlank"&&(l+=2),l<d.length&&d[l][1].type==="content"))for(;++l<d.length&&d[l][1].type!=="content";)d[l][1].type==="chunkText"&&(d[l][1]._isInFirstContentOfListItem=!0,l++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,nT(i,e)),e=t[e],h=!0);else if(r[1]._container){for(l=e,s=void 0;l--&&(c=i[l],c[1].type==="lineEnding"||c[1].type==="lineEndingBlank");)c[0]==="enter"&&(s&&(i[s][1].type="lineEndingBlank"),c[1].type="lineEnding",s=l);s&&(r[1].end=Object.assign({},i[s][1].start),f=i.slice(s,e),f.unshift(r),Qi(i,s,e-s+1,f))}}return!h}function nT(i,t){const e=i[t][1],r=i[t][2];let s=t-1;const l=[],c=e._tokenizer||r.parser[e.contentType](e.start),f=c.events,d=[],h={};let m,g,v=-1,y=e,b=0,R=0;const M=[R];for(;y;){for(;i[++s][1]!==y;);l.push(s),y._tokenizer||(m=r.sliceStream(y),y.next||m.push(null),g&&c.defineSkip(y.start),y._isInFirstContentOfListItem&&(c._gfmTasklistFirstContentOfListItem=!0),c.write(m),y._isInFirstContentOfListItem&&(c._gfmTasklistFirstContentOfListItem=void 0)),g=y,y=y.next}for(y=e;++v<f.length;)f[v][0]==="exit"&&f[v-1][0]==="enter"&&f[v][1].type===f[v-1][1].type&&f[v][1].start.line!==f[v][1].end.line&&(R=v+1,M.push(R),y._tokenizer=void 0,y.previous=void 0,y=y.next);for(c.events=[],y?(y._tokenizer=void 0,y.previous=void 0):M.pop(),v=M.length;v--;){const x=f.slice(M[v],M[v+1]),D=l.pop();d.unshift([D,D+x.length-1]),Qi(i,D,2,x)}for(v=-1;++v<d.length;)h[b+d[v][0]]=b+d[v][1],b+=d[v][1]-d[v][0]-1;return h}const iT={tokenize:sT,resolve:aT},rT={tokenize:oT,partial:!0};function aT(i){return lS(i),i}function sT(i,t){let e;return r;function r(f){return i.enter("content"),e=i.enter("chunkContent",{contentType:"content"}),s(f)}function s(f){return f===null?l(f):se(f)?i.check(rT,c,l)(f):(i.consume(f),s)}function l(f){return i.exit("chunkContent"),i.exit("content"),t(f)}function c(f){return i.consume(f),i.exit("chunkContent"),e.next=i.enter("chunkContent",{contentType:"content",previous:e}),e=e.next,s}}function oT(i,t,e){const r=this;return s;function s(c){return i.exit("chunkContent"),i.enter("lineEnding"),i.consume(c),i.exit("lineEnding"),Qe(i,l,"linePrefix")}function l(c){if(c===null||se(c))return e(c);const f=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&f&&f[1].type==="linePrefix"&&f[2].sliceSerialize(f[1],!0).length>=4?t(c):i.interrupt(r.parser.constructs.flow,e,t)(c)}}function uS(i,t,e,r,s,l,c,f,d){const h=d||Number.POSITIVE_INFINITY;let m=0;return g;function g(x){return x===60?(i.enter(r),i.enter(s),i.enter(l),i.consume(x),i.exit(l),v):x===null||x===32||x===41||_p(x)?e(x):(i.enter(r),i.enter(c),i.enter(f),i.enter("chunkString",{contentType:"string"}),R(x))}function v(x){return x===62?(i.enter(l),i.consume(x),i.exit(l),i.exit(s),i.exit(r),t):(i.enter(f),i.enter("chunkString",{contentType:"string"}),y(x))}function y(x){return x===62?(i.exit("chunkString"),i.exit(f),v(x)):x===null||x===60||se(x)?e(x):(i.consume(x),x===92?b:y)}function b(x){return x===60||x===62||x===92?(i.consume(x),y):y(x)}function R(x){return!m&&(x===null||x===41||ei(x))?(i.exit("chunkString"),i.exit(f),i.exit(c),i.exit(r),t(x)):m<h&&x===40?(i.consume(x),m++,R):x===41?(i.consume(x),m--,R):x===null||x===32||x===40||_p(x)?e(x):(i.consume(x),x===92?M:R)}function M(x){return x===40||x===41||x===92?(i.consume(x),R):R(x)}}function cS(i,t,e,r,s,l){const c=this;let f=0,d;return h;function h(y){return i.enter(r),i.enter(s),i.consume(y),i.exit(s),i.enter(l),m}function m(y){return f>999||y===null||y===91||y===93&&!d||y===94&&!f&&"_hiddenFootnoteSupport"in c.parser.constructs?e(y):y===93?(i.exit(l),i.enter(s),i.consume(y),i.exit(s),i.exit(r),t):se(y)?(i.enter("lineEnding"),i.consume(y),i.exit("lineEnding"),m):(i.enter("chunkString",{contentType:"string"}),g(y))}function g(y){return y===null||y===91||y===93||se(y)||f++>999?(i.exit("chunkString"),m(y)):(i.consume(y),d||(d=!Ne(y)),y===92?v:g)}function v(y){return y===91||y===92||y===93?(i.consume(y),f++,g):g(y)}}function fS(i,t,e,r,s,l){let c;return f;function f(v){return v===34||v===39||v===40?(i.enter(r),i.enter(s),i.consume(v),i.exit(s),c=v===40?41:v,d):e(v)}function d(v){return v===c?(i.enter(s),i.consume(v),i.exit(s),i.exit(r),t):(i.enter(l),h(v))}function h(v){return v===c?(i.exit(l),d(c)):v===null?e(v):se(v)?(i.enter("lineEnding"),i.consume(v),i.exit("lineEnding"),Qe(i,h,"linePrefix")):(i.enter("chunkString",{contentType:"string"}),m(v))}function m(v){return v===c||v===null||se(v)?(i.exit("chunkString"),h(v)):(i.consume(v),v===92?g:m)}function g(v){return v===c||v===92?(i.consume(v),m):m(v)}}function pl(i,t){let e;return r;function r(s){return se(s)?(i.enter("lineEnding"),i.consume(s),i.exit("lineEnding"),e=!0,r):Ne(s)?Qe(i,r,e?"linePrefix":"lineSuffix")(s):t(s)}}const lT={name:"definition",tokenize:cT},uT={tokenize:fT,partial:!0};function cT(i,t,e){const r=this;let s;return l;function l(y){return i.enter("definition"),c(y)}function c(y){return cS.call(r,i,f,e,"definitionLabel","definitionLabelMarker","definitionLabelString")(y)}function f(y){return s=Qs(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),y===58?(i.enter("definitionMarker"),i.consume(y),i.exit("definitionMarker"),d):e(y)}function d(y){return ei(y)?pl(i,h)(y):h(y)}function h(y){return uS(i,m,e,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(y)}function m(y){return i.attempt(uT,g,g)(y)}function g(y){return Ne(y)?Qe(i,v,"whitespace")(y):v(y)}function v(y){return y===null||se(y)?(i.exit("definition"),r.parser.defined.push(s),t(y)):e(y)}}function fT(i,t,e){return r;function r(f){return ei(f)?pl(i,s)(f):e(f)}function s(f){return fS(i,l,e,"definitionTitle","definitionTitleMarker","definitionTitleString")(f)}function l(f){return Ne(f)?Qe(i,c,"whitespace")(f):c(f)}function c(f){return f===null||se(f)?t(f):e(f)}}const hT={name:"hardBreakEscape",tokenize:dT};function dT(i,t,e){return r;function r(l){return i.enter("hardBreakEscape"),i.consume(l),s}function s(l){return se(l)?(i.exit("hardBreakEscape"),t(l)):e(l)}}const pT={name:"headingAtx",tokenize:gT,resolve:mT};function mT(i,t){let e=i.length-2,r=3,s,l;return i[r][1].type==="whitespace"&&(r+=2),e-2>r&&i[e][1].type==="whitespace"&&(e-=2),i[e][1].type==="atxHeadingSequence"&&(r===e-1||e-4>r&&i[e-2][1].type==="whitespace")&&(e-=r+1===e?2:4),e>r&&(s={type:"atxHeadingText",start:i[r][1].start,end:i[e][1].end},l={type:"chunkText",start:i[r][1].start,end:i[e][1].end,contentType:"text"},Qi(i,r,e-r+1,[["enter",s,t],["enter",l,t],["exit",l,t],["exit",s,t]])),i}function gT(i,t,e){let r=0;return s;function s(m){return i.enter("atxHeading"),l(m)}function l(m){return i.enter("atxHeadingSequence"),c(m)}function c(m){return m===35&&r++<6?(i.consume(m),c):m===null||ei(m)?(i.exit("atxHeadingSequence"),f(m)):e(m)}function f(m){return m===35?(i.enter("atxHeadingSequence"),d(m)):m===null||se(m)?(i.exit("atxHeading"),t(m)):Ne(m)?Qe(i,f,"whitespace")(m):(i.enter("atxHeadingText"),h(m))}function d(m){return m===35?(i.consume(m),d):(i.exit("atxHeadingSequence"),f(m))}function h(m){return m===null||m===35||ei(m)?(i.exit("atxHeadingText"),f(m)):(i.consume(m),h)}}const _T=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Gv=["pre","script","style","textarea"],vT={name:"htmlFlow",tokenize:MT,resolveTo:ST,concrete:!0},yT={tokenize:bT,partial:!0},xT={tokenize:ET,partial:!0};function ST(i){let t=i.length;for(;t--&&!(i[t][0]==="enter"&&i[t][1].type==="htmlFlow"););return t>1&&i[t-2][1].type==="linePrefix"&&(i[t][1].start=i[t-2][1].start,i[t+1][1].start=i[t-2][1].start,i.splice(t-2,2)),i}function MT(i,t,e){const r=this;let s,l,c,f,d;return h;function h(B){return m(B)}function m(B){return i.enter("htmlFlow"),i.enter("htmlFlowData"),i.consume(B),g}function g(B){return B===33?(i.consume(B),v):B===47?(i.consume(B),l=!0,R):B===63?(i.consume(B),s=3,r.interrupt?t:w):Wi(B)?(i.consume(B),c=String.fromCharCode(B),M):e(B)}function v(B){return B===45?(i.consume(B),s=2,y):B===91?(i.consume(B),s=5,f=0,b):Wi(B)?(i.consume(B),s=4,r.interrupt?t:w):e(B)}function y(B){return B===45?(i.consume(B),r.interrupt?t:w):e(B)}function b(B){const tt="CDATA[";return B===tt.charCodeAt(f++)?(i.consume(B),f===tt.length?r.interrupt?t:k:b):e(B)}function R(B){return Wi(B)?(i.consume(B),c=String.fromCharCode(B),M):e(B)}function M(B){if(B===null||B===47||B===62||ei(B)){const tt=B===47,pt=c.toLowerCase();return!tt&&!l&&Gv.includes(pt)?(s=1,r.interrupt?t(B):k(B)):_T.includes(c.toLowerCase())?(s=6,tt?(i.consume(B),x):r.interrupt?t(B):k(B)):(s=7,r.interrupt&&!r.parser.lazy[r.now().line]?e(B):l?D(B):S(B))}return B===45||mi(B)?(i.consume(B),c+=String.fromCharCode(B),M):e(B)}function x(B){return B===62?(i.consume(B),r.interrupt?t:k):e(B)}function D(B){return Ne(B)?(i.consume(B),D):T(B)}function S(B){return B===47?(i.consume(B),T):B===58||B===95||Wi(B)?(i.consume(B),E):Ne(B)?(i.consume(B),S):T(B)}function E(B){return B===45||B===46||B===58||B===95||mi(B)?(i.consume(B),E):A(B)}function A(B){return B===61?(i.consume(B),L):Ne(B)?(i.consume(B),A):S(B)}function L(B){return B===null||B===60||B===61||B===62||B===96?e(B):B===34||B===39?(i.consume(B),d=B,P):Ne(B)?(i.consume(B),L):O(B)}function P(B){return B===d?(i.consume(B),d=null,C):B===null||se(B)?e(B):(i.consume(B),P)}function O(B){return B===null||B===34||B===39||B===47||B===60||B===61||B===62||B===96||ei(B)?A(B):(i.consume(B),O)}function C(B){return B===47||B===62||Ne(B)?S(B):e(B)}function T(B){return B===62?(i.consume(B),N):e(B)}function N(B){return B===null||se(B)?k(B):Ne(B)?(i.consume(B),N):e(B)}function k(B){return B===45&&s===2?(i.consume(B),H):B===60&&s===1?(i.consume(B),Z):B===62&&s===4?(i.consume(B),Y):B===63&&s===3?(i.consume(B),w):B===93&&s===5?(i.consume(B),vt):se(B)&&(s===6||s===7)?(i.exit("htmlFlowData"),i.check(yT,ft,q)(B)):B===null||se(B)?(i.exit("htmlFlowData"),q(B)):(i.consume(B),k)}function q(B){return i.check(xT,K,ft)(B)}function K(B){return i.enter("lineEnding"),i.consume(B),i.exit("lineEnding"),X}function X(B){return B===null||se(B)?q(B):(i.enter("htmlFlowData"),k(B))}function H(B){return B===45?(i.consume(B),w):k(B)}function Z(B){return B===47?(i.consume(B),c="",J):k(B)}function J(B){if(B===62){const tt=c.toLowerCase();return Gv.includes(tt)?(i.consume(B),Y):k(B)}return Wi(B)&&c.length<8?(i.consume(B),c+=String.fromCharCode(B),J):k(B)}function vt(B){return B===93?(i.consume(B),w):k(B)}function w(B){return B===62?(i.consume(B),Y):B===45&&s===2?(i.consume(B),w):k(B)}function Y(B){return B===null||se(B)?(i.exit("htmlFlowData"),ft(B)):(i.consume(B),Y)}function ft(B){return i.exit("htmlFlow"),t(B)}}function ET(i,t,e){const r=this;return s;function s(c){return se(c)?(i.enter("lineEnding"),i.consume(c),i.exit("lineEnding"),l):e(c)}function l(c){return r.parser.lazy[r.now().line]?e(c):t(c)}}function bT(i,t,e){return r;function r(s){return i.enter("lineEnding"),i.consume(s),i.exit("lineEnding"),i.attempt(Nc,t,e)}}const TT={name:"htmlText",tokenize:AT};function AT(i,t,e){const r=this;let s,l,c;return f;function f(w){return i.enter("htmlText"),i.enter("htmlTextData"),i.consume(w),d}function d(w){return w===33?(i.consume(w),h):w===47?(i.consume(w),A):w===63?(i.consume(w),S):Wi(w)?(i.consume(w),O):e(w)}function h(w){return w===45?(i.consume(w),m):w===91?(i.consume(w),l=0,b):Wi(w)?(i.consume(w),D):e(w)}function m(w){return w===45?(i.consume(w),y):e(w)}function g(w){return w===null?e(w):w===45?(i.consume(w),v):se(w)?(c=g,Z(w)):(i.consume(w),g)}function v(w){return w===45?(i.consume(w),y):g(w)}function y(w){return w===62?H(w):w===45?v(w):g(w)}function b(w){const Y="CDATA[";return w===Y.charCodeAt(l++)?(i.consume(w),l===Y.length?R:b):e(w)}function R(w){return w===null?e(w):w===93?(i.consume(w),M):se(w)?(c=R,Z(w)):(i.consume(w),R)}function M(w){return w===93?(i.consume(w),x):R(w)}function x(w){return w===62?H(w):w===93?(i.consume(w),x):R(w)}function D(w){return w===null||w===62?H(w):se(w)?(c=D,Z(w)):(i.consume(w),D)}function S(w){return w===null?e(w):w===63?(i.consume(w),E):se(w)?(c=S,Z(w)):(i.consume(w),S)}function E(w){return w===62?H(w):S(w)}function A(w){return Wi(w)?(i.consume(w),L):e(w)}function L(w){return w===45||mi(w)?(i.consume(w),L):P(w)}function P(w){return se(w)?(c=P,Z(w)):Ne(w)?(i.consume(w),P):H(w)}function O(w){return w===45||mi(w)?(i.consume(w),O):w===47||w===62||ei(w)?C(w):e(w)}function C(w){return w===47?(i.consume(w),H):w===58||w===95||Wi(w)?(i.consume(w),T):se(w)?(c=C,Z(w)):Ne(w)?(i.consume(w),C):H(w)}function T(w){return w===45||w===46||w===58||w===95||mi(w)?(i.consume(w),T):N(w)}function N(w){return w===61?(i.consume(w),k):se(w)?(c=N,Z(w)):Ne(w)?(i.consume(w),N):C(w)}function k(w){return w===null||w===60||w===61||w===62||w===96?e(w):w===34||w===39?(i.consume(w),s=w,q):se(w)?(c=k,Z(w)):Ne(w)?(i.consume(w),k):(i.consume(w),K)}function q(w){return w===s?(i.consume(w),s=void 0,X):w===null?e(w):se(w)?(c=q,Z(w)):(i.consume(w),q)}function K(w){return w===null||w===34||w===39||w===60||w===61||w===96?e(w):w===47||w===62||ei(w)?C(w):(i.consume(w),K)}function X(w){return w===47||w===62||ei(w)?C(w):e(w)}function H(w){return w===62?(i.consume(w),i.exit("htmlTextData"),i.exit("htmlText"),t):e(w)}function Z(w){return i.exit("htmlTextData"),i.enter("lineEnding"),i.consume(w),i.exit("lineEnding"),J}function J(w){return Ne(w)?Qe(i,vt,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(w):vt(w)}function vt(w){return i.enter("htmlTextData"),c(w)}}const bm={name:"labelEnd",tokenize:UT,resolveTo:LT,resolveAll:DT},RT={tokenize:NT},wT={tokenize:PT},CT={tokenize:OT};function DT(i){let t=-1;for(;++t<i.length;){const e=i[t][1];(e.type==="labelImage"||e.type==="labelLink"||e.type==="labelEnd")&&(i.splice(t+1,e.type==="labelImage"?4:2),e.type="data",t++)}return i}function LT(i,t){let e=i.length,r=0,s,l,c,f;for(;e--;)if(s=i[e][1],l){if(s.type==="link"||s.type==="labelLink"&&s._inactive)break;i[e][0]==="enter"&&s.type==="labelLink"&&(s._inactive=!0)}else if(c){if(i[e][0]==="enter"&&(s.type==="labelImage"||s.type==="labelLink")&&!s._balanced&&(l=e,s.type!=="labelLink")){r=2;break}}else s.type==="labelEnd"&&(c=e);const d={type:i[l][1].type==="labelLink"?"link":"image",start:Object.assign({},i[l][1].start),end:Object.assign({},i[i.length-1][1].end)},h={type:"label",start:Object.assign({},i[l][1].start),end:Object.assign({},i[c][1].end)},m={type:"labelText",start:Object.assign({},i[l+r+2][1].end),end:Object.assign({},i[c-2][1].start)};return f=[["enter",d,t],["enter",h,t]],f=Ai(f,i.slice(l+1,l+r+3)),f=Ai(f,[["enter",m,t]]),f=Ai(f,Em(t.parser.constructs.insideSpan.null,i.slice(l+r+4,c-3),t)),f=Ai(f,[["exit",m,t],i[c-2],i[c-1],["exit",h,t]]),f=Ai(f,i.slice(c+1)),f=Ai(f,[["exit",d,t]]),Qi(i,l,i.length,f),i}function UT(i,t,e){const r=this;let s=r.events.length,l,c;for(;s--;)if((r.events[s][1].type==="labelImage"||r.events[s][1].type==="labelLink")&&!r.events[s][1]._balanced){l=r.events[s][1];break}return f;function f(v){return l?l._inactive?g(v):(c=r.parser.defined.includes(Qs(r.sliceSerialize({start:l.end,end:r.now()}))),i.enter("labelEnd"),i.enter("labelMarker"),i.consume(v),i.exit("labelMarker"),i.exit("labelEnd"),d):e(v)}function d(v){return v===40?i.attempt(RT,m,c?m:g)(v):v===91?i.attempt(wT,m,c?h:g)(v):c?m(v):g(v)}function h(v){return i.attempt(CT,m,g)(v)}function m(v){return t(v)}function g(v){return l._balanced=!0,e(v)}}function NT(i,t,e){return r;function r(g){return i.enter("resource"),i.enter("resourceMarker"),i.consume(g),i.exit("resourceMarker"),s}function s(g){return ei(g)?pl(i,l)(g):l(g)}function l(g){return g===41?m(g):uS(i,c,f,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(g)}function c(g){return ei(g)?pl(i,d)(g):m(g)}function f(g){return e(g)}function d(g){return g===34||g===39||g===40?fS(i,h,e,"resourceTitle","resourceTitleMarker","resourceTitleString")(g):m(g)}function h(g){return ei(g)?pl(i,m)(g):m(g)}function m(g){return g===41?(i.enter("resourceMarker"),i.consume(g),i.exit("resourceMarker"),i.exit("resource"),t):e(g)}}function PT(i,t,e){const r=this;return s;function s(f){return cS.call(r,i,l,c,"reference","referenceMarker","referenceString")(f)}function l(f){return r.parser.defined.includes(Qs(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(f):e(f)}function c(f){return e(f)}}function OT(i,t,e){return r;function r(l){return i.enter("reference"),i.enter("referenceMarker"),i.consume(l),i.exit("referenceMarker"),s}function s(l){return l===93?(i.enter("referenceMarker"),i.consume(l),i.exit("referenceMarker"),i.exit("reference"),t):e(l)}}const zT={name:"labelStartImage",tokenize:IT,resolveAll:bm.resolveAll};function IT(i,t,e){const r=this;return s;function s(f){return i.enter("labelImage"),i.enter("labelImageMarker"),i.consume(f),i.exit("labelImageMarker"),l}function l(f){return f===91?(i.enter("labelMarker"),i.consume(f),i.exit("labelMarker"),i.exit("labelImage"),c):e(f)}function c(f){return f===94&&"_hiddenFootnoteSupport"in r.parser.constructs?e(f):t(f)}}const FT={name:"labelStartLink",tokenize:BT,resolveAll:bm.resolveAll};function BT(i,t,e){const r=this;return s;function s(c){return i.enter("labelLink"),i.enter("labelMarker"),i.consume(c),i.exit("labelMarker"),i.exit("labelLink"),l}function l(c){return c===94&&"_hiddenFootnoteSupport"in r.parser.constructs?e(c):t(c)}}const $h={name:"lineEnding",tokenize:kT};function kT(i,t){return e;function e(r){return i.enter("lineEnding"),i.consume(r),i.exit("lineEnding"),Qe(i,t,"linePrefix")}}const mc={name:"thematicBreak",tokenize:HT};function HT(i,t,e){let r=0,s;return l;function l(h){return i.enter("thematicBreak"),c(h)}function c(h){return s=h,f(h)}function f(h){return h===s?(i.enter("thematicBreakSequence"),d(h)):r>=3&&(h===null||se(h))?(i.exit("thematicBreak"),t(h)):e(h)}function d(h){return h===s?(i.consume(h),r++,d):(i.exit("thematicBreakSequence"),Ne(h)?Qe(i,f,"whitespace")(h):f(h))}}const ti={name:"list",tokenize:qT,continuation:{tokenize:XT},exit:jT},VT={tokenize:YT,partial:!0},GT={tokenize:WT,partial:!0};function qT(i,t,e){const r=this,s=r.events[r.events.length-1];let l=s&&s[1].type==="linePrefix"?s[2].sliceSerialize(s[1],!0).length:0,c=0;return f;function f(y){const b=r.containerState.type||(y===42||y===43||y===45?"listUnordered":"listOrdered");if(b==="listUnordered"?!r.containerState.marker||y===r.containerState.marker:vp(y)){if(r.containerState.type||(r.containerState.type=b,i.enter(b,{_container:!0})),b==="listUnordered")return i.enter("listItemPrefix"),y===42||y===45?i.check(mc,e,h)(y):h(y);if(!r.interrupt||y===49)return i.enter("listItemPrefix"),i.enter("listItemValue"),d(y)}return e(y)}function d(y){return vp(y)&&++c<10?(i.consume(y),d):(!r.interrupt||c<2)&&(r.containerState.marker?y===r.containerState.marker:y===41||y===46)?(i.exit("listItemValue"),h(y)):e(y)}function h(y){return i.enter("listItemMarker"),i.consume(y),i.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||y,i.check(Nc,r.interrupt?e:m,i.attempt(VT,v,g))}function m(y){return r.containerState.initialBlankLine=!0,l++,v(y)}function g(y){return Ne(y)?(i.enter("listItemPrefixWhitespace"),i.consume(y),i.exit("listItemPrefixWhitespace"),v):e(y)}function v(y){return r.containerState.size=l+r.sliceSerialize(i.exit("listItemPrefix"),!0).length,t(y)}}function XT(i,t,e){const r=this;return r.containerState._closeFlow=void 0,i.check(Nc,s,l);function s(f){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,Qe(i,t,"listItemIndent",r.containerState.size+1)(f)}function l(f){return r.containerState.furtherBlankLines||!Ne(f)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,c(f)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,i.attempt(GT,t,c)(f))}function c(f){return r.containerState._closeFlow=!0,r.interrupt=void 0,Qe(i,i.attempt(ti,t,e),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(f)}}function WT(i,t,e){const r=this;return Qe(i,s,"listItemIndent",r.containerState.size+1);function s(l){const c=r.events[r.events.length-1];return c&&c[1].type==="listItemIndent"&&c[2].sliceSerialize(c[1],!0).length===r.containerState.size?t(l):e(l)}}function jT(i){i.exit(this.containerState.type)}function YT(i,t,e){const r=this;return Qe(i,s,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function s(l){const c=r.events[r.events.length-1];return!Ne(l)&&c&&c[1].type==="listItemPrefixWhitespace"?t(l):e(l)}}const qv={name:"setextUnderline",tokenize:KT,resolveTo:ZT};function ZT(i,t){let e=i.length,r,s,l;for(;e--;)if(i[e][0]==="enter"){if(i[e][1].type==="content"){r=e;break}i[e][1].type==="paragraph"&&(s=e)}else i[e][1].type==="content"&&i.splice(e,1),!l&&i[e][1].type==="definition"&&(l=e);const c={type:"setextHeading",start:Object.assign({},i[s][1].start),end:Object.assign({},i[i.length-1][1].end)};return i[s][1].type="setextHeadingText",l?(i.splice(s,0,["enter",c,t]),i.splice(l+1,0,["exit",i[r][1],t]),i[r][1].end=Object.assign({},i[l][1].end)):i[r][1]=c,i.push(["exit",c,t]),i}function KT(i,t,e){const r=this;let s;return l;function l(h){let m=r.events.length,g;for(;m--;)if(r.events[m][1].type!=="lineEnding"&&r.events[m][1].type!=="linePrefix"&&r.events[m][1].type!=="content"){g=r.events[m][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||g)?(i.enter("setextHeadingLine"),s=h,c(h)):e(h)}function c(h){return i.enter("setextHeadingLineSequence"),f(h)}function f(h){return h===s?(i.consume(h),f):(i.exit("setextHeadingLineSequence"),Ne(h)?Qe(i,d,"lineSuffix")(h):d(h))}function d(h){return h===null||se(h)?(i.exit("setextHeadingLine"),t(h)):e(h)}}const QT={tokenize:JT};function JT(i){const t=this,e=i.attempt(Nc,r,i.attempt(this.parser.constructs.flowInitial,s,Qe(i,i.attempt(this.parser.constructs.flow,s,i.attempt(iT,s)),"linePrefix")));return e;function r(l){if(l===null){i.consume(l);return}return i.enter("lineEndingBlank"),i.consume(l),i.exit("lineEndingBlank"),t.currentConstruct=void 0,e}function s(l){if(l===null){i.consume(l);return}return i.enter("lineEnding"),i.consume(l),i.exit("lineEnding"),t.currentConstruct=void 0,e}}const $T={resolveAll:dS()},tA=hS("string"),eA=hS("text");function hS(i){return{tokenize:t,resolveAll:dS(i==="text"?nA:void 0)};function t(e){const r=this,s=this.parser.constructs[i],l=e.attempt(s,c,f);return c;function c(m){return h(m)?l(m):f(m)}function f(m){if(m===null){e.consume(m);return}return e.enter("data"),e.consume(m),d}function d(m){return h(m)?(e.exit("data"),l(m)):(e.consume(m),d)}function h(m){if(m===null)return!0;const g=s[m];let v=-1;if(g)for(;++v<g.length;){const y=g[v];if(!y.previous||y.previous.call(r,r.previous))return!0}return!1}}}function dS(i){return t;function t(e,r){let s=-1,l;for(;++s<=e.length;)l===void 0?e[s]&&e[s][1].type==="data"&&(l=s,s++):(!e[s]||e[s][1].type!=="data")&&(s!==l+2&&(e[l][1].end=e[s-1][1].end,e.splice(l+2,s-l-2),s=l+2),l=void 0);return i?i(e,r):e}}function nA(i,t){let e=0;for(;++e<=i.length;)if((e===i.length||i[e][1].type==="lineEnding")&&i[e-1][1].type==="data"){const r=i[e-1][1],s=t.sliceStream(r);let l=s.length,c=-1,f=0,d;for(;l--;){const h=s[l];if(typeof h=="string"){for(c=h.length;h.charCodeAt(c-1)===32;)f++,c--;if(c)break;c=-1}else if(h===-2)d=!0,f++;else if(h!==-1){l++;break}}if(f){const h={type:e===i.length||d||f<2?"lineSuffix":"hardBreakTrailing",start:{line:r.end.line,column:r.end.column-f,offset:r.end.offset-f,_index:r.start._index+l,_bufferIndex:l?c:r.start._bufferIndex+c},end:Object.assign({},r.end)};r.end=Object.assign({},h.start),r.start.offset===r.end.offset?Object.assign(r,h):(i.splice(e,0,["enter",h,t],["exit",h,t]),e+=2)}e++}return i}function iA(i,t,e){let r=Object.assign(e?Object.assign({},e):{line:1,column:1,offset:0},{_index:0,_bufferIndex:-1});const s={},l=[];let c=[],f=[];const d={consume:D,enter:S,exit:E,attempt:P(A),check:P(L),interrupt:P(L,{interrupt:!0})},h={previous:null,code:null,containerState:{},events:[],parser:i,sliceStream:y,sliceSerialize:v,now:b,defineSkip:R,write:g};let m=t.tokenize.call(h,d);return t.resolveAll&&l.push(t),h;function g(N){return c=Ai(c,N),M(),c[c.length-1]!==null?[]:(O(t,0),h.events=Em(l,h.events,h),h.events)}function v(N,k){return aA(y(N),k)}function y(N){return rA(c,N)}function b(){const{line:N,column:k,offset:q,_index:K,_bufferIndex:X}=r;return{line:N,column:k,offset:q,_index:K,_bufferIndex:X}}function R(N){s[N.line]=N.column,T()}function M(){let N;for(;r._index<c.length;){const k=c[r._index];if(typeof k=="string")for(N=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===N&&r._bufferIndex<k.length;)x(k.charCodeAt(r._bufferIndex));else x(k)}}function x(N){m=m(N)}function D(N){se(N)?(r.line++,r.column=1,r.offset+=N===-3?2:1,T()):N!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===c[r._index].length&&(r._bufferIndex=-1,r._index++)),h.previous=N}function S(N,k){const q=k||{};return q.type=N,q.start=b(),h.events.push(["enter",q,h]),f.push(q),q}function E(N){const k=f.pop();return k.end=b(),h.events.push(["exit",k,h]),k}function A(N,k){O(N,k.from)}function L(N,k){k.restore()}function P(N,k){return q;function q(K,X,H){let Z,J,vt,w;return Array.isArray(K)?ft(K):"tokenize"in K?ft([K]):Y(K);function Y(gt){return wt;function wt(Lt){const ie=Lt!==null&&gt[Lt],Gt=Lt!==null&&gt.null,Pe=[...Array.isArray(ie)?ie:ie?[ie]:[],...Array.isArray(Gt)?Gt:Gt?[Gt]:[]];return ft(Pe)(Lt)}}function ft(gt){return Z=gt,J=0,gt.length===0?H:B(gt[J])}function B(gt){return wt;function wt(Lt){return w=C(),vt=gt,gt.partial||(h.currentConstruct=gt),gt.name&&h.parser.constructs.disable.null.includes(gt.name)?pt():gt.tokenize.call(k?Object.assign(Object.create(h),k):h,d,tt,pt)(Lt)}}function tt(gt){return N(vt,w),X}function pt(gt){return w.restore(),++J<Z.length?B(Z[J]):H}}}function O(N,k){N.resolveAll&&!l.includes(N)&&l.push(N),N.resolve&&Qi(h.events,k,h.events.length-k,N.resolve(h.events.slice(k),h)),N.resolveTo&&(h.events=N.resolveTo(h.events,h))}function C(){const N=b(),k=h.previous,q=h.currentConstruct,K=h.events.length,X=Array.from(f);return{restore:H,from:K};function H(){r=N,h.previous=k,h.currentConstruct=q,h.events.length=K,f=X,T()}}function T(){r.line in s&&r.column<2&&(r.column=s[r.line],r.offset+=s[r.line]-1)}}function rA(i,t){const e=t.start._index,r=t.start._bufferIndex,s=t.end._index,l=t.end._bufferIndex;let c;if(e===s)c=[i[e].slice(r,l)];else{if(c=i.slice(e,s),r>-1){const f=c[0];typeof f=="string"?c[0]=f.slice(r):c.shift()}l>0&&c.push(i[s].slice(0,l))}return c}function aA(i,t){let e=-1;const r=[];let s;for(;++e<i.length;){const l=i[e];let c;if(typeof l=="string")c=l;else switch(l){case-5:{c="\r";break}case-4:{c=`
`;break}case-3:{c=`\r
`;break}case-2:{c=t?" ":"	";break}case-1:{if(!t&&s)continue;c=" ";break}default:c=String.fromCharCode(l)}s=l===-2,r.push(c)}return r.join("")}const sA={42:ti,43:ti,45:ti,48:ti,49:ti,50:ti,51:ti,52:ti,53:ti,54:ti,55:ti,56:ti,57:ti,62:aS},oA={91:lT},lA={[-2]:Jh,[-1]:Jh,32:Jh},uA={35:pT,42:mc,45:[qv,mc],60:vT,61:qv,95:mc,96:Vv,126:Vv},cA={38:oS,92:sS},fA={[-5]:$h,[-4]:$h,[-3]:$h,33:zT,38:oS,42:yp,60:[Bb,TT],91:FT,92:[hT,sS],93:bm,95:yp,96:Jb},hA={null:[yp,$T]},dA={null:[42,95]},pA={null:[]},mA=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:dA,contentInitial:oA,disable:pA,document:sA,flow:uA,flowInitial:lA,insideSpan:hA,string:cA,text:fA},Symbol.toStringTag,{value:"Module"}));function gA(i){const e=bb([mA,...(i||{}).extensions||[]]),r={defined:[],lazy:{},constructs:e,content:s(Ub),document:s(Pb),flow:s(QT),string:s(tA),text:s(eA)};return r;function s(l){return c;function c(f){return iA(r,l,f)}}}function _A(i){for(;!lS(i););return i}const Xv=/[\0\t\n\r]/g;function vA(){let i=1,t="",e=!0,r;return s;function s(l,c,f){const d=[];let h,m,g,v,y;for(l=t+(typeof l=="string"?l.toString():new TextDecoder(c||void 0).decode(l)),g=0,t="",e&&(l.charCodeAt(0)===65279&&g++,e=void 0);g<l.length;){if(Xv.lastIndex=g,h=Xv.exec(l),v=h&&h.index!==void 0?h.index:l.length,y=l.charCodeAt(v),!h){t=l.slice(g);break}if(y===10&&g===v&&r)d.push(-3),r=void 0;else switch(r&&(d.push(-5),r=void 0),g<v&&(d.push(l.slice(g,v)),i+=v-g),y){case 0:{d.push(65533),i++;break}case 9:{for(m=Math.ceil(i/4)*4,d.push(-2);i++<m;)d.push(-1);break}case 10:{d.push(-4),i=1;break}default:r=!0,i=1}g=v+1}return f&&(r&&d.push(-5),t&&d.push(t),d.push(null)),d}}const yA=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function xA(i){return i.replace(yA,SA)}function SA(i,t,e){if(t)return t;if(e.charCodeAt(0)===35){const s=e.charCodeAt(1),l=s===120||s===88;return rS(e.slice(l?2:1),l?16:10)}return Mm(e)||i}const pS={}.hasOwnProperty;function MA(i,t,e){return typeof t!="string"&&(e=t,t=void 0),EA(e)(_A(gA(e).document().write(vA()(i,t,!0))))}function EA(i){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:l(qt),autolinkProtocol:C,autolinkEmail:C,atxHeading:l(j),blockQuote:l(ie),characterEscape:C,characterReference:C,codeFenced:l(Gt),codeFencedFenceInfo:c,codeFencedFenceMeta:c,codeIndented:l(Gt,c),codeText:l(Pe,c),codeTextData:C,data:C,codeFlowValue:C,definition:l(Oe),definitionDestinationString:c,definitionLabelString:c,definitionTitleString:c,emphasis:l(he),hardBreakEscape:l(Dn),hardBreakTrailing:l(Dn),htmlFlow:l(ge,c),htmlFlowData:C,htmlText:l(ge,c),htmlTextData:C,image:l(re),label:c,link:l(qt),listItem:l(Vt),listItemValue:v,listOrdered:l(Le,g),listUnordered:l(Le),paragraph:l(V),reference:B,referenceString:c,resourceDestinationString:c,resourceTitleString:c,setextHeading:l(j),strong:l(I),thematicBreak:l(bt)},exit:{atxHeading:d(),atxHeadingSequence:A,autolink:d(),autolinkEmail:Lt,autolinkProtocol:wt,blockQuote:d(),characterEscapeValue:T,characterReferenceMarkerHexadecimal:pt,characterReferenceMarkerNumeric:pt,characterReferenceValue:gt,codeFenced:d(M),codeFencedFence:R,codeFencedFenceInfo:y,codeFencedFenceMeta:b,codeFlowValue:T,codeIndented:d(x),codeText:d(X),codeTextData:T,data:T,definition:d(),definitionDestinationString:E,definitionLabelString:D,definitionTitleString:S,emphasis:d(),hardBreakEscape:d(k),hardBreakTrailing:d(k),htmlFlow:d(q),htmlFlowData:T,htmlText:d(K),htmlTextData:T,image:d(Z),label:vt,labelText:J,lineEnding:N,link:d(H),listItem:d(),listOrdered:d(),listUnordered:d(),paragraph:d(),referenceString:tt,resourceDestinationString:w,resourceTitleString:Y,resource:ft,setextHeading:d(O),setextHeadingLineSequence:P,setextHeadingText:L,strong:d(),thematicBreak:d()}};mS(t,(i||{}).mdastExtensions||[]);const e={};return r;function r(W){let $={type:"root",children:[]};const St={stack:[$],tokenStack:[],config:t,enter:f,exit:h,buffer:c,resume:m,data:e},xt=[];let Tt=-1;for(;++Tt<W.length;)if(W[Tt][1].type==="listOrdered"||W[Tt][1].type==="listUnordered")if(W[Tt][0]==="enter")xt.push(Tt);else{const ae=xt.pop();Tt=s(W,ae,Tt)}for(Tt=-1;++Tt<W.length;){const ae=t[W[Tt][0]];pS.call(ae,W[Tt][1].type)&&ae[W[Tt][1].type].call(Object.assign({sliceSerialize:W[Tt][2].sliceSerialize},St),W[Tt][1])}if(St.tokenStack.length>0){const ae=St.tokenStack[St.tokenStack.length-1];(ae[1]||Wv).call(St,void 0,ae[0])}for($.position={start:ia(W.length>0?W[0][1].start:{line:1,column:1,offset:0}),end:ia(W.length>0?W[W.length-2][1].end:{line:1,column:1,offset:0})},Tt=-1;++Tt<t.transforms.length;)$=t.transforms[Tt]($)||$;return $}function s(W,$,St){let xt=$-1,Tt=-1,ae=!1,At,Nt,Xt,jt;for(;++xt<=St;){const Dt=W[xt];switch(Dt[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{Dt[0]==="enter"?Tt++:Tt--,jt=void 0;break}case"lineEndingBlank":{Dt[0]==="enter"&&(At&&!jt&&!Tt&&!Xt&&(Xt=xt),jt=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:jt=void 0}if(!Tt&&Dt[0]==="enter"&&Dt[1].type==="listItemPrefix"||Tt===-1&&Dt[0]==="exit"&&(Dt[1].type==="listUnordered"||Dt[1].type==="listOrdered")){if(At){let oe=xt;for(Nt=void 0;oe--;){const Yt=W[oe];if(Yt[1].type==="lineEnding"||Yt[1].type==="lineEndingBlank"){if(Yt[0]==="exit")continue;Nt&&(W[Nt][1].type="lineEndingBlank",ae=!0),Yt[1].type="lineEnding",Nt=oe}else if(!(Yt[1].type==="linePrefix"||Yt[1].type==="blockQuotePrefix"||Yt[1].type==="blockQuotePrefixWhitespace"||Yt[1].type==="blockQuoteMarker"||Yt[1].type==="listItemIndent"))break}Xt&&(!Nt||Xt<Nt)&&(At._spread=!0),At.end=Object.assign({},Nt?W[Nt][1].start:Dt[1].end),W.splice(Nt||xt,0,["exit",At,Dt[2]]),xt++,St++}if(Dt[1].type==="listItemPrefix"){const oe={type:"listItem",_spread:!1,start:Object.assign({},Dt[1].start),end:void 0};At=oe,W.splice(xt,0,["enter",oe,Dt[2]]),xt++,St++,Xt=void 0,jt=!0}}}return W[$][1]._spread=ae,St}function l(W,$){return St;function St(xt){f.call(this,W(xt),xt),$&&$.call(this,xt)}}function c(){this.stack.push({type:"fragment",children:[]})}function f(W,$,St){this.stack[this.stack.length-1].children.push(W),this.stack.push(W),this.tokenStack.push([$,St]),W.position={start:ia($.start),end:void 0}}function d(W){return $;function $(St){W&&W.call(this,St),h.call(this,St)}}function h(W,$){const St=this.stack.pop(),xt=this.tokenStack.pop();if(xt)xt[0].type!==W.type&&($?$.call(this,W,xt[0]):(xt[1]||Wv).call(this,W,xt[0]));else throw new Error("Cannot close `"+W.type+"` ("+dl({start:W.start,end:W.end})+"): it’s not open");St.position.end=ia(W.end)}function m(){return Mb(this.stack.pop())}function g(){this.data.expectingFirstListItemValue=!0}function v(W){if(this.data.expectingFirstListItemValue){const $=this.stack[this.stack.length-2];$.start=Number.parseInt(this.sliceSerialize(W),10),this.data.expectingFirstListItemValue=void 0}}function y(){const W=this.resume(),$=this.stack[this.stack.length-1];$.lang=W}function b(){const W=this.resume(),$=this.stack[this.stack.length-1];$.meta=W}function R(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function M(){const W=this.resume(),$=this.stack[this.stack.length-1];$.value=W.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function x(){const W=this.resume(),$=this.stack[this.stack.length-1];$.value=W.replace(/(\r?\n|\r)$/g,"")}function D(W){const $=this.resume(),St=this.stack[this.stack.length-1];St.label=$,St.identifier=Qs(this.sliceSerialize(W)).toLowerCase()}function S(){const W=this.resume(),$=this.stack[this.stack.length-1];$.title=W}function E(){const W=this.resume(),$=this.stack[this.stack.length-1];$.url=W}function A(W){const $=this.stack[this.stack.length-1];if(!$.depth){const St=this.sliceSerialize(W).length;$.depth=St}}function L(){this.data.setextHeadingSlurpLineEnding=!0}function P(W){const $=this.stack[this.stack.length-1];$.depth=this.sliceSerialize(W).codePointAt(0)===61?1:2}function O(){this.data.setextHeadingSlurpLineEnding=void 0}function C(W){const St=this.stack[this.stack.length-1].children;let xt=St[St.length-1];(!xt||xt.type!=="text")&&(xt=lt(),xt.position={start:ia(W.start),end:void 0},St.push(xt)),this.stack.push(xt)}function T(W){const $=this.stack.pop();$.value+=this.sliceSerialize(W),$.position.end=ia(W.end)}function N(W){const $=this.stack[this.stack.length-1];if(this.data.atHardBreak){const St=$.children[$.children.length-1];St.position.end=ia(W.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes($.type)&&(C.call(this,W),T.call(this,W))}function k(){this.data.atHardBreak=!0}function q(){const W=this.resume(),$=this.stack[this.stack.length-1];$.value=W}function K(){const W=this.resume(),$=this.stack[this.stack.length-1];$.value=W}function X(){const W=this.resume(),$=this.stack[this.stack.length-1];$.value=W}function H(){const W=this.stack[this.stack.length-1];if(this.data.inReference){const $=this.data.referenceType||"shortcut";W.type+="Reference",W.referenceType=$,delete W.url,delete W.title}else delete W.identifier,delete W.label;this.data.referenceType=void 0}function Z(){const W=this.stack[this.stack.length-1];if(this.data.inReference){const $=this.data.referenceType||"shortcut";W.type+="Reference",W.referenceType=$,delete W.url,delete W.title}else delete W.identifier,delete W.label;this.data.referenceType=void 0}function J(W){const $=this.sliceSerialize(W),St=this.stack[this.stack.length-2];St.label=xA($),St.identifier=Qs($).toLowerCase()}function vt(){const W=this.stack[this.stack.length-1],$=this.resume(),St=this.stack[this.stack.length-1];if(this.data.inReference=!0,St.type==="link"){const xt=W.children;St.children=xt}else St.alt=$}function w(){const W=this.resume(),$=this.stack[this.stack.length-1];$.url=W}function Y(){const W=this.resume(),$=this.stack[this.stack.length-1];$.title=W}function ft(){this.data.inReference=void 0}function B(){this.data.referenceType="collapsed"}function tt(W){const $=this.resume(),St=this.stack[this.stack.length-1];St.label=$,St.identifier=Qs(this.sliceSerialize(W)).toLowerCase(),this.data.referenceType="full"}function pt(W){this.data.characterReferenceType=W.type}function gt(W){const $=this.sliceSerialize(W),St=this.data.characterReferenceType;let xt;St?(xt=rS($,St==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):xt=Mm($);const Tt=this.stack.pop();Tt.value+=xt,Tt.position.end=ia(W.end)}function wt(W){T.call(this,W);const $=this.stack[this.stack.length-1];$.url=this.sliceSerialize(W)}function Lt(W){T.call(this,W);const $=this.stack[this.stack.length-1];$.url="mailto:"+this.sliceSerialize(W)}function ie(){return{type:"blockquote",children:[]}}function Gt(){return{type:"code",lang:null,meta:null,value:""}}function Pe(){return{type:"inlineCode",value:""}}function Oe(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function he(){return{type:"emphasis",children:[]}}function j(){return{type:"heading",depth:0,children:[]}}function Dn(){return{type:"break"}}function ge(){return{type:"html",value:""}}function re(){return{type:"image",title:null,url:"",alt:null}}function qt(){return{type:"link",title:null,url:"",children:[]}}function Le(W){return{type:"list",ordered:W.type==="listOrdered",start:null,spread:W._spread,children:[]}}function Vt(W){return{type:"listItem",spread:W._spread,checked:null,children:[]}}function V(){return{type:"paragraph",children:[]}}function I(){return{type:"strong",children:[]}}function lt(){return{type:"text",value:""}}function bt(){return{type:"thematicBreak"}}}function ia(i){return{line:i.line,column:i.column,offset:i.offset}}function mS(i,t){let e=-1;for(;++e<t.length;){const r=t[e];Array.isArray(r)?mS(i,r):bA(i,r)}}function bA(i,t){let e;for(e in t)if(pS.call(t,e))switch(e){case"canContainEols":{const r=t[e];r&&i[e].push(...r);break}case"transforms":{const r=t[e];r&&i[e].push(...r);break}case"enter":case"exit":{const r=t[e];r&&Object.assign(i[e],r);break}}}function Wv(i,t){throw i?new Error("Cannot close `"+i.type+"` ("+dl({start:i.start,end:i.end})+"): a different token (`"+t.type+"`, "+dl({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+dl({start:t.start,end:t.end})+") is still open")}function TA(i){const t=this;t.parser=e;function e(r){return MA(r,{...t.data("settings"),...i,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function AA(i,t){const e={type:"element",tagName:"blockquote",properties:{},children:i.wrap(i.all(t),!0)};return i.patch(t,e),i.applyData(t,e)}function RA(i,t){const e={type:"element",tagName:"br",properties:{},children:[]};return i.patch(t,e),[i.applyData(t,e),{type:"text",value:`
`}]}function wA(i,t){const e=t.value?t.value+`
`:"",r={};t.lang&&(r.className=["language-"+t.lang]);let s={type:"element",tagName:"code",properties:r,children:[{type:"text",value:e}]};return t.meta&&(s.data={meta:t.meta}),i.patch(t,s),s=i.applyData(t,s),s={type:"element",tagName:"pre",properties:{},children:[s]},i.patch(t,s),s}function CA(i,t){const e={type:"element",tagName:"del",properties:{},children:i.all(t)};return i.patch(t,e),i.applyData(t,e)}function DA(i,t){const e={type:"element",tagName:"em",properties:{},children:i.all(t)};return i.patch(t,e),i.applyData(t,e)}function LA(i,t){const e=typeof i.options.clobberPrefix=="string"?i.options.clobberPrefix:"user-content-",r=String(t.identifier).toUpperCase(),s=oo(r.toLowerCase()),l=i.footnoteOrder.indexOf(r);let c,f=i.footnoteCounts.get(r);f===void 0?(f=0,i.footnoteOrder.push(r),c=i.footnoteOrder.length):c=l+1,f+=1,i.footnoteCounts.set(r,f);const d={type:"element",tagName:"a",properties:{href:"#"+e+"fn-"+s,id:e+"fnref-"+s+(f>1?"-"+f:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(c)}]};i.patch(t,d);const h={type:"element",tagName:"sup",properties:{},children:[d]};return i.patch(t,h),i.applyData(t,h)}function UA(i,t){const e={type:"element",tagName:"h"+t.depth,properties:{},children:i.all(t)};return i.patch(t,e),i.applyData(t,e)}function NA(i,t){if(i.options.allowDangerousHtml){const e={type:"raw",value:t.value};return i.patch(t,e),i.applyData(t,e)}}function gS(i,t){const e=t.referenceType;let r="]";if(e==="collapsed"?r+="[]":e==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return[{type:"text",value:"!["+t.alt+r}];const s=i.all(t),l=s[0];l&&l.type==="text"?l.value="["+l.value:s.unshift({type:"text",value:"["});const c=s[s.length-1];return c&&c.type==="text"?c.value+=r:s.push({type:"text",value:r}),s}function PA(i,t){const e=String(t.identifier).toUpperCase(),r=i.definitionById.get(e);if(!r)return gS(i,t);const s={src:oo(r.url||""),alt:t.alt};r.title!==null&&r.title!==void 0&&(s.title=r.title);const l={type:"element",tagName:"img",properties:s,children:[]};return i.patch(t,l),i.applyData(t,l)}function OA(i,t){const e={src:oo(t.url)};t.alt!==null&&t.alt!==void 0&&(e.alt=t.alt),t.title!==null&&t.title!==void 0&&(e.title=t.title);const r={type:"element",tagName:"img",properties:e,children:[]};return i.patch(t,r),i.applyData(t,r)}function zA(i,t){const e={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};i.patch(t,e);const r={type:"element",tagName:"code",properties:{},children:[e]};return i.patch(t,r),i.applyData(t,r)}function IA(i,t){const e=String(t.identifier).toUpperCase(),r=i.definitionById.get(e);if(!r)return gS(i,t);const s={href:oo(r.url||"")};r.title!==null&&r.title!==void 0&&(s.title=r.title);const l={type:"element",tagName:"a",properties:s,children:i.all(t)};return i.patch(t,l),i.applyData(t,l)}function FA(i,t){const e={href:oo(t.url)};t.title!==null&&t.title!==void 0&&(e.title=t.title);const r={type:"element",tagName:"a",properties:e,children:i.all(t)};return i.patch(t,r),i.applyData(t,r)}function BA(i,t,e){const r=i.all(t),s=e?kA(e):_S(t),l={},c=[];if(typeof t.checked=="boolean"){const m=r[0];let g;m&&m.type==="element"&&m.tagName==="p"?g=m:(g={type:"element",tagName:"p",properties:{},children:[]},r.unshift(g)),g.children.length>0&&g.children.unshift({type:"text",value:" "}),g.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),l.className=["task-list-item"]}let f=-1;for(;++f<r.length;){const m=r[f];(s||f!==0||m.type!=="element"||m.tagName!=="p")&&c.push({type:"text",value:`
`}),m.type==="element"&&m.tagName==="p"&&!s?c.push(...m.children):c.push(m)}const d=r[r.length-1];d&&(s||d.type!=="element"||d.tagName!=="p")&&c.push({type:"text",value:`
`});const h={type:"element",tagName:"li",properties:l,children:c};return i.patch(t,h),i.applyData(t,h)}function kA(i){let t=!1;if(i.type==="list"){t=i.spread||!1;const e=i.children;let r=-1;for(;!t&&++r<e.length;)t=_S(e[r])}return t}function _S(i){const t=i.spread;return t??i.children.length>1}function HA(i,t){const e={},r=i.all(t);let s=-1;for(typeof t.start=="number"&&t.start!==1&&(e.start=t.start);++s<r.length;){const c=r[s];if(c.type==="element"&&c.tagName==="li"&&c.properties&&Array.isArray(c.properties.className)&&c.properties.className.includes("task-list-item")){e.className=["contains-task-list"];break}}const l={type:"element",tagName:t.ordered?"ol":"ul",properties:e,children:i.wrap(r,!0)};return i.patch(t,l),i.applyData(t,l)}function VA(i,t){const e={type:"element",tagName:"p",properties:{},children:i.all(t)};return i.patch(t,e),i.applyData(t,e)}function GA(i,t){const e={type:"root",children:i.wrap(i.all(t))};return i.patch(t,e),i.applyData(t,e)}function qA(i,t){const e={type:"element",tagName:"strong",properties:{},children:i.all(t)};return i.patch(t,e),i.applyData(t,e)}function XA(i,t){const e=i.all(t),r=e.shift(),s=[];if(r){const c={type:"element",tagName:"thead",properties:{},children:i.wrap([r],!0)};i.patch(t.children[0],c),s.push(c)}if(e.length>0){const c={type:"element",tagName:"tbody",properties:{},children:i.wrap(e,!0)},f=vm(t.children[1]),d=Qx(t.children[t.children.length-1]);f&&d&&(c.position={start:f,end:d}),s.push(c)}const l={type:"element",tagName:"table",properties:{},children:i.wrap(s,!0)};return i.patch(t,l),i.applyData(t,l)}function WA(i,t,e){const r=e?e.children:void 0,l=(r?r.indexOf(t):1)===0?"th":"td",c=e&&e.type==="table"?e.align:void 0,f=c?c.length:t.children.length;let d=-1;const h=[];for(;++d<f;){const g=t.children[d],v={},y=c?c[d]:void 0;y&&(v.align=y);let b={type:"element",tagName:l,properties:v,children:[]};g&&(b.children=i.all(g),i.patch(g,b),b=i.applyData(g,b)),h.push(b)}const m={type:"element",tagName:"tr",properties:{},children:i.wrap(h,!0)};return i.patch(t,m),i.applyData(t,m)}function jA(i,t){const e={type:"element",tagName:"td",properties:{},children:i.all(t)};return i.patch(t,e),i.applyData(t,e)}const jv=9,Yv=32;function YA(i){const t=String(i),e=/\r?\n|\r/g;let r=e.exec(t),s=0;const l=[];for(;r;)l.push(Zv(t.slice(s,r.index),s>0,!0),r[0]),s=r.index+r[0].length,r=e.exec(t);return l.push(Zv(t.slice(s),s>0,!1)),l.join("")}function Zv(i,t,e){let r=0,s=i.length;if(t){let l=i.codePointAt(r);for(;l===jv||l===Yv;)r++,l=i.codePointAt(r)}if(e){let l=i.codePointAt(s-1);for(;l===jv||l===Yv;)s--,l=i.codePointAt(s-1)}return s>r?i.slice(r,s):""}function ZA(i,t){const e={type:"text",value:YA(String(t.value))};return i.patch(t,e),i.applyData(t,e)}function KA(i,t){const e={type:"element",tagName:"hr",properties:{},children:[]};return i.patch(t,e),i.applyData(t,e)}const QA={blockquote:AA,break:RA,code:wA,delete:CA,emphasis:DA,footnoteReference:LA,heading:UA,html:NA,imageReference:PA,image:OA,inlineCode:zA,linkReference:IA,link:FA,listItem:BA,list:HA,paragraph:VA,root:GA,strong:qA,table:XA,tableCell:jA,tableRow:WA,text:ZA,thematicBreak:KA,toml:Bu,yaml:Bu,definition:Bu,footnoteDefinition:Bu};function Bu(){}const vS=-1,Pc=0,bc=1,Tc=2,Tm=3,Am=4,Rm=5,wm=6,yS=7,xS=8,Kv=typeof self=="object"?self:globalThis,JA=(i,t)=>{const e=(s,l)=>(i.set(l,s),s),r=s=>{if(i.has(s))return i.get(s);const[l,c]=t[s];switch(l){case Pc:case vS:return e(c,s);case bc:{const f=e([],s);for(const d of c)f.push(r(d));return f}case Tc:{const f=e({},s);for(const[d,h]of c)f[r(d)]=r(h);return f}case Tm:return e(new Date(c),s);case Am:{const{source:f,flags:d}=c;return e(new RegExp(f,d),s)}case Rm:{const f=e(new Map,s);for(const[d,h]of c)f.set(r(d),r(h));return f}case wm:{const f=e(new Set,s);for(const d of c)f.add(r(d));return f}case yS:{const{name:f,message:d}=c;return e(new Kv[f](d),s)}case xS:return e(BigInt(c),s);case"BigInt":return e(Object(BigInt(c)),s)}return e(new Kv[l](c),s)};return r},Qv=i=>JA(new Map,i)(0),Ls="",{toString:$A}={},{keys:tR}=Object,al=i=>{const t=typeof i;if(t!=="object"||!i)return[Pc,t];const e=$A.call(i).slice(8,-1);switch(e){case"Array":return[bc,Ls];case"Object":return[Tc,Ls];case"Date":return[Tm,Ls];case"RegExp":return[Am,Ls];case"Map":return[Rm,Ls];case"Set":return[wm,Ls]}return e.includes("Array")?[bc,e]:e.includes("Error")?[yS,e]:[Tc,e]},ku=([i,t])=>i===Pc&&(t==="function"||t==="symbol"),eR=(i,t,e,r)=>{const s=(c,f)=>{const d=r.push(c)-1;return e.set(f,d),d},l=c=>{if(e.has(c))return e.get(c);let[f,d]=al(c);switch(f){case Pc:{let m=c;switch(d){case"bigint":f=xS,m=c.toString();break;case"function":case"symbol":if(i)throw new TypeError("unable to serialize "+d);m=null;break;case"undefined":return s([vS],c)}return s([f,m],c)}case bc:{if(d)return s([d,[...c]],c);const m=[],g=s([f,m],c);for(const v of c)m.push(l(v));return g}case Tc:{if(d)switch(d){case"BigInt":return s([d,c.toString()],c);case"Boolean":case"Number":case"String":return s([d,c.valueOf()],c)}if(t&&"toJSON"in c)return l(c.toJSON());const m=[],g=s([f,m],c);for(const v of tR(c))(i||!ku(al(c[v])))&&m.push([l(v),l(c[v])]);return g}case Tm:return s([f,c.toISOString()],c);case Am:{const{source:m,flags:g}=c;return s([f,{source:m,flags:g}],c)}case Rm:{const m=[],g=s([f,m],c);for(const[v,y]of c)(i||!(ku(al(v))||ku(al(y))))&&m.push([l(v),l(y)]);return g}case wm:{const m=[],g=s([f,m],c);for(const v of c)(i||!ku(al(v)))&&m.push(l(v));return g}}const{message:h}=c;return s([f,{name:d,message:h}],c)};return l},Jv=(i,{json:t,lossy:e}={})=>{const r=[];return eR(!(t||e),!!t,new Map,r)(i),r},Ac=typeof structuredClone=="function"?(i,t)=>t&&("json"in t||"lossy"in t)?Qv(Jv(i,t)):structuredClone(i):(i,t)=>Qv(Jv(i,t));function nR(i,t){const e=[{type:"text",value:"↩"}];return t>1&&e.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),e}function iR(i,t){return"Back to reference "+(i+1)+(t>1?"-"+t:"")}function rR(i){const t=typeof i.options.clobberPrefix=="string"?i.options.clobberPrefix:"user-content-",e=i.options.footnoteBackContent||nR,r=i.options.footnoteBackLabel||iR,s=i.options.footnoteLabel||"Footnotes",l=i.options.footnoteLabelTagName||"h2",c=i.options.footnoteLabelProperties||{className:["sr-only"]},f=[];let d=-1;for(;++d<i.footnoteOrder.length;){const h=i.footnoteById.get(i.footnoteOrder[d]);if(!h)continue;const m=i.all(h),g=String(h.identifier).toUpperCase(),v=oo(g.toLowerCase());let y=0;const b=[],R=i.footnoteCounts.get(g);for(;R!==void 0&&++y<=R;){b.length>0&&b.push({type:"text",value:" "});let D=typeof e=="string"?e:e(d,y);typeof D=="string"&&(D={type:"text",value:D}),b.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+v+(y>1?"-"+y:""),dataFootnoteBackref:"",ariaLabel:typeof r=="string"?r:r(d,y),className:["data-footnote-backref"]},children:Array.isArray(D)?D:[D]})}const M=m[m.length-1];if(M&&M.type==="element"&&M.tagName==="p"){const D=M.children[M.children.length-1];D&&D.type==="text"?D.value+=" ":M.children.push({type:"text",value:" "}),M.children.push(...b)}else m.push(...b);const x={type:"element",tagName:"li",properties:{id:t+"fn-"+v},children:i.wrap(m,!0)};i.patch(h,x),f.push(x)}if(f.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:l,properties:{...Ac(c),id:"footnote-label"},children:[{type:"text",value:s}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:i.wrap(f,!0)},{type:"text",value:`
`}]}}const SS=function(i){if(i==null)return lR;if(typeof i=="function")return Oc(i);if(typeof i=="object")return Array.isArray(i)?aR(i):sR(i);if(typeof i=="string")return oR(i);throw new Error("Expected function, string, or object as test")};function aR(i){const t=[];let e=-1;for(;++e<i.length;)t[e]=SS(i[e]);return Oc(r);function r(...s){let l=-1;for(;++l<t.length;)if(t[l].apply(this,s))return!0;return!1}}function sR(i){const t=i;return Oc(e);function e(r){const s=r;let l;for(l in i)if(s[l]!==t[l])return!1;return!0}}function oR(i){return Oc(t);function t(e){return e&&e.type===i}}function Oc(i){return t;function t(e,r,s){return!!(uR(e)&&i.call(this,e,typeof r=="number"?r:void 0,s||void 0))}}function lR(){return!0}function uR(i){return i!==null&&typeof i=="object"&&"type"in i}const MS=[],cR=!0,$v=!1,fR="skip";function hR(i,t,e,r){let s;typeof t=="function"&&typeof e!="function"?(r=e,e=t):s=t;const l=SS(s),c=r?-1:1;f(i,void 0,[])();function f(d,h,m){const g=d&&typeof d=="object"?d:{};if(typeof g.type=="string"){const y=typeof g.tagName=="string"?g.tagName:typeof g.name=="string"?g.name:void 0;Object.defineProperty(v,"name",{value:"node ("+(d.type+(y?"<"+y+">":""))+")"})}return v;function v(){let y=MS,b,R,M;if((!t||l(d,h,m[m.length-1]||void 0))&&(y=dR(e(d,m)),y[0]===$v))return y;if("children"in d&&d.children){const x=d;if(x.children&&y[0]!==fR)for(R=(r?x.children.length:-1)+c,M=m.concat(x);R>-1&&R<x.children.length;){const D=x.children[R];if(b=f(D,R,M)(),b[0]===$v)return b;R=typeof b[1]=="number"?b[1]:R+c}}return y}}}function dR(i){return Array.isArray(i)?i:typeof i=="number"?[cR,i]:i==null?MS:[i]}function ES(i,t,e,r){let s,l,c;typeof t=="function"?(l=void 0,c=t,s=e):(l=t,c=e,s=r),hR(i,l,f,s);function f(d,h){const m=h[h.length-1],g=m?m.children.indexOf(d):void 0;return c(d,g,m)}}const xp={}.hasOwnProperty,pR={};function mR(i,t){const e=t||pR,r=new Map,s=new Map,l=new Map,c={...QA,...e.handlers},f={all:h,applyData:_R,definitionById:r,footnoteById:s,footnoteCounts:l,footnoteOrder:[],handlers:c,one:d,options:e,patch:gR,wrap:yR};return ES(i,function(m){if(m.type==="definition"||m.type==="footnoteDefinition"){const g=m.type==="definition"?r:s,v=String(m.identifier).toUpperCase();g.has(v)||g.set(v,m)}}),f;function d(m,g){const v=m.type,y=f.handlers[v];if(xp.call(f.handlers,v)&&y)return y(f,m,g);if(f.options.passThrough&&f.options.passThrough.includes(v)){if("children"in m){const{children:R,...M}=m,x=Ac(M);return x.children=f.all(m),x}return Ac(m)}return(f.options.unknownHandler||vR)(f,m,g)}function h(m){const g=[];if("children"in m){const v=m.children;let y=-1;for(;++y<v.length;){const b=f.one(v[y],m);if(b){if(y&&v[y-1].type==="break"&&(!Array.isArray(b)&&b.type==="text"&&(b.value=ty(b.value)),!Array.isArray(b)&&b.type==="element")){const R=b.children[0];R&&R.type==="text"&&(R.value=ty(R.value))}Array.isArray(b)?g.push(...b):g.push(b)}}}return g}}function gR(i,t){i.position&&(t.position=J1(i))}function _R(i,t){let e=t;if(i&&i.data){const r=i.data.hName,s=i.data.hChildren,l=i.data.hProperties;if(typeof r=="string")if(e.type==="element")e.tagName=r;else{const c="children"in e?e.children:[e];e={type:"element",tagName:r,properties:{},children:c}}e.type==="element"&&l&&Object.assign(e.properties,Ac(l)),"children"in e&&e.children&&s!==null&&s!==void 0&&(e.children=s)}return e}function vR(i,t){const e=t.data||{},r="value"in t&&!(xp.call(e,"hProperties")||xp.call(e,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:i.all(t)};return i.patch(t,r),i.applyData(t,r)}function yR(i,t){const e=[];let r=-1;for(t&&e.push({type:"text",value:`
`});++r<i.length;)r&&e.push({type:"text",value:`
`}),e.push(i[r]);return t&&i.length>0&&e.push({type:"text",value:`
`}),e}function ty(i){let t=0,e=i.charCodeAt(t);for(;e===9||e===32;)t++,e=i.charCodeAt(t);return i.slice(t)}function ey(i,t){const e=mR(i,t),r=e.one(i,void 0),s=rR(e),l=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return s&&l.children.push({type:"text",value:`
`},s),l}function xR(i,t){return i&&"run"in i?async function(e,r){const s=ey(e,{file:r,...t});await i.run(s,r)}:function(e,r){return ey(e,{file:r,...t||i})}}function ny(i){if(i)throw i}var td,iy;function SR(){if(iy)return td;iy=1;var i=Object.prototype.hasOwnProperty,t=Object.prototype.toString,e=Object.defineProperty,r=Object.getOwnPropertyDescriptor,s=function(h){return typeof Array.isArray=="function"?Array.isArray(h):t.call(h)==="[object Array]"},l=function(h){if(!h||t.call(h)!=="[object Object]")return!1;var m=i.call(h,"constructor"),g=h.constructor&&h.constructor.prototype&&i.call(h.constructor.prototype,"isPrototypeOf");if(h.constructor&&!m&&!g)return!1;var v;for(v in h);return typeof v>"u"||i.call(h,v)},c=function(h,m){e&&m.name==="__proto__"?e(h,m.name,{enumerable:!0,configurable:!0,value:m.newValue,writable:!0}):h[m.name]=m.newValue},f=function(h,m){if(m==="__proto__")if(i.call(h,m)){if(r)return r(h,m).value}else return;return h[m]};return td=function d(){var h,m,g,v,y,b,R=arguments[0],M=1,x=arguments.length,D=!1;for(typeof R=="boolean"&&(D=R,R=arguments[1]||{},M=2),(R==null||typeof R!="object"&&typeof R!="function")&&(R={});M<x;++M)if(h=arguments[M],h!=null)for(m in h)g=f(R,m),v=f(h,m),R!==v&&(D&&v&&(l(v)||(y=s(v)))?(y?(y=!1,b=g&&s(g)?g:[]):b=g&&l(g)?g:{},c(R,{name:m,newValue:d(D,b,v)})):typeof v<"u"&&c(R,{name:m,newValue:v}));return R},td}var MR=SR();const ed=Uc(MR);function Sp(i){if(typeof i!="object"||i===null)return!1;const t=Object.getPrototypeOf(i);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in i)&&!(Symbol.iterator in i)}function ER(){const i=[],t={run:e,use:r};return t;function e(...s){let l=-1;const c=s.pop();if(typeof c!="function")throw new TypeError("Expected function as last argument, not "+c);f(null,...s);function f(d,...h){const m=i[++l];let g=-1;if(d){c(d);return}for(;++g<s.length;)(h[g]===null||h[g]===void 0)&&(h[g]=s[g]);s=h,m?bR(m,f)(...h):c(null,...h)}}function r(s){if(typeof s!="function")throw new TypeError("Expected `middelware` to be a function, not "+s);return i.push(s),t}}function bR(i,t){let e;return r;function r(...c){const f=i.length>c.length;let d;f&&c.push(s);try{d=i.apply(this,c)}catch(h){const m=h;if(f&&e)throw m;return s(m)}f||(d&&d.then&&typeof d.then=="function"?d.then(l,s):d instanceof Error?s(d):l(d))}function s(c,...f){e||(e=!0,t(c,...f))}function l(c){s(null,c)}}const qi={basename:TR,dirname:AR,extname:RR,join:wR,sep:"/"};function TR(i,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');bl(i);let e=0,r=-1,s=i.length,l;if(t===void 0||t.length===0||t.length>i.length){for(;s--;)if(i.codePointAt(s)===47){if(l){e=s+1;break}}else r<0&&(l=!0,r=s+1);return r<0?"":i.slice(e,r)}if(t===i)return"";let c=-1,f=t.length-1;for(;s--;)if(i.codePointAt(s)===47){if(l){e=s+1;break}}else c<0&&(l=!0,c=s+1),f>-1&&(i.codePointAt(s)===t.codePointAt(f--)?f<0&&(r=s):(f=-1,r=c));return e===r?r=c:r<0&&(r=i.length),i.slice(e,r)}function AR(i){if(bl(i),i.length===0)return".";let t=-1,e=i.length,r;for(;--e;)if(i.codePointAt(e)===47){if(r){t=e;break}}else r||(r=!0);return t<0?i.codePointAt(0)===47?"/":".":t===1&&i.codePointAt(0)===47?"//":i.slice(0,t)}function RR(i){bl(i);let t=i.length,e=-1,r=0,s=-1,l=0,c;for(;t--;){const f=i.codePointAt(t);if(f===47){if(c){r=t+1;break}continue}e<0&&(c=!0,e=t+1),f===46?s<0?s=t:l!==1&&(l=1):s>-1&&(l=-1)}return s<0||e<0||l===0||l===1&&s===e-1&&s===r+1?"":i.slice(s,e)}function wR(...i){let t=-1,e;for(;++t<i.length;)bl(i[t]),i[t]&&(e=e===void 0?i[t]:e+"/"+i[t]);return e===void 0?".":CR(e)}function CR(i){bl(i);const t=i.codePointAt(0)===47;let e=DR(i,!t);return e.length===0&&!t&&(e="."),e.length>0&&i.codePointAt(i.length-1)===47&&(e+="/"),t?"/"+e:e}function DR(i,t){let e="",r=0,s=-1,l=0,c=-1,f,d;for(;++c<=i.length;){if(c<i.length)f=i.codePointAt(c);else{if(f===47)break;f=47}if(f===47){if(!(s===c-1||l===1))if(s!==c-1&&l===2){if(e.length<2||r!==2||e.codePointAt(e.length-1)!==46||e.codePointAt(e.length-2)!==46){if(e.length>2){if(d=e.lastIndexOf("/"),d!==e.length-1){d<0?(e="",r=0):(e=e.slice(0,d),r=e.length-1-e.lastIndexOf("/")),s=c,l=0;continue}}else if(e.length>0){e="",r=0,s=c,l=0;continue}}t&&(e=e.length>0?e+"/..":"..",r=2)}else e.length>0?e+="/"+i.slice(s+1,c):e=i.slice(s+1,c),r=c-s-1;s=c,l=0}else f===46&&l>-1?l++:l=-1}return e}function bl(i){if(typeof i!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(i))}const LR={cwd:UR};function UR(){return"/"}function Mp(i){return!!(i!==null&&typeof i=="object"&&"href"in i&&i.href&&"protocol"in i&&i.protocol&&i.auth===void 0)}function NR(i){if(typeof i=="string")i=new URL(i);else if(!Mp(i)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+i+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(i.protocol!=="file:"){const t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return PR(i)}function PR(i){if(i.hostname!==""){const r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}const t=i.pathname;let e=-1;for(;++e<t.length;)if(t.codePointAt(e)===37&&t.codePointAt(e+1)===50){const r=t.codePointAt(e+2);if(r===70||r===102){const s=new TypeError("File URL path must not include encoded / characters");throw s.code="ERR_INVALID_FILE_URL_PATH",s}}return decodeURIComponent(t)}const nd=["history","path","basename","stem","extname","dirname"];class bS{constructor(t){let e;t?Mp(t)?e={path:t}:typeof t=="string"||OR(t)?e={value:t}:e=t:e={},this.cwd=LR.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<nd.length;){const l=nd[r];l in e&&e[l]!==void 0&&e[l]!==null&&(this[l]=l==="history"?[...e[l]]:e[l])}let s;for(s in e)nd.includes(s)||(this[s]=e[s])}get basename(){return typeof this.path=="string"?qi.basename(this.path):void 0}set basename(t){rd(t,"basename"),id(t,"basename"),this.path=qi.join(this.dirname||"",t)}get dirname(){return typeof this.path=="string"?qi.dirname(this.path):void 0}set dirname(t){ry(this.basename,"dirname"),this.path=qi.join(t||"",this.basename)}get extname(){return typeof this.path=="string"?qi.extname(this.path):void 0}set extname(t){if(id(t,"extname"),ry(this.dirname,"extname"),t){if(t.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(t.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=qi.join(this.dirname,this.stem+(t||""))}get path(){return this.history[this.history.length-1]}set path(t){Mp(t)&&(t=NR(t)),rd(t,"path"),this.path!==t&&this.history.push(t)}get stem(){return typeof this.path=="string"?qi.basename(this.path,this.extname):void 0}set stem(t){rd(t,"stem"),id(t,"stem"),this.path=qi.join(this.dirname||"",t+(this.extname||""))}fail(t,e,r){const s=this.message(t,e,r);throw s.fatal=!0,s}info(t,e,r){const s=this.message(t,e,r);return s.fatal=void 0,s}message(t,e,r){const s=new Vn(t,e,r);return this.path&&(s.name=this.path+":"+s.name,s.file=this.path),s.fatal=!1,this.messages.push(s),s}toString(t){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(t||void 0).decode(this.value)}}function id(i,t){if(i&&i.includes(qi.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+qi.sep+"`")}function rd(i,t){if(!i)throw new Error("`"+t+"` cannot be empty")}function ry(i,t){if(!i)throw new Error("Setting `"+t+"` requires `path` to be set too")}function OR(i){return!!(i&&typeof i=="object"&&"byteLength"in i&&"byteOffset"in i)}const zR=function(i){const r=this.constructor.prototype,s=r[i],l=function(){return s.apply(l,arguments)};Object.setPrototypeOf(l,r);const c=Object.getOwnPropertyNames(s);for(const f of c){const d=Object.getOwnPropertyDescriptor(s,f);d&&Object.defineProperty(l,f,d)}return l},IR={}.hasOwnProperty;class Cm extends zR{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=ER()}copy(){const t=new Cm;let e=-1;for(;++e<this.attachers.length;){const r=this.attachers[e];t.use(...r)}return t.data(ed(!0,{},this.namespace)),t}data(t,e){return typeof t=="string"?arguments.length===2?(od("data",this.frozen),this.namespace[t]=e,this):IR.call(this.namespace,t)&&this.namespace[t]||void 0:t?(od("data",this.frozen),this.namespace=t,this):this.namespace}freeze(){if(this.frozen)return this;const t=this;for(;++this.freezeIndex<this.attachers.length;){const[e,...r]=this.attachers[this.freezeIndex];if(r[0]===!1)continue;r[0]===!0&&(r[0]=void 0);const s=e.call(t,...r);typeof s=="function"&&this.transformers.use(s)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(t){this.freeze();const e=Hu(t),r=this.parser||this.Parser;return ad("parse",r),r(String(e),e)}process(t,e){const r=this;return this.freeze(),ad("process",this.parser||this.Parser),sd("process",this.compiler||this.Compiler),e?s(void 0,e):new Promise(s);function s(l,c){const f=Hu(t),d=r.parse(f);r.run(d,f,function(m,g,v){if(m||!g||!v)return h(m);const y=g,b=r.stringify(y,v);kR(b)?v.value=b:v.result=b,h(m,v)});function h(m,g){m||!g?c(m):l?l(g):e(void 0,g)}}}processSync(t){let e=!1,r;return this.freeze(),ad("processSync",this.parser||this.Parser),sd("processSync",this.compiler||this.Compiler),this.process(t,s),sy("processSync","process",e),r;function s(l,c){e=!0,ny(l),r=c}}run(t,e,r){ay(t),this.freeze();const s=this.transformers;return!r&&typeof e=="function"&&(r=e,e=void 0),r?l(void 0,r):new Promise(l);function l(c,f){const d=Hu(e);s.run(t,d,h);function h(m,g,v){const y=g||t;m?f(m):c?c(y):r(void 0,y,v)}}}runSync(t,e){let r=!1,s;return this.run(t,e,l),sy("runSync","run",r),s;function l(c,f){ny(c),s=f,r=!0}}stringify(t,e){this.freeze();const r=Hu(e),s=this.compiler||this.Compiler;return sd("stringify",s),ay(t),s(t,r)}use(t,...e){const r=this.attachers,s=this.namespace;if(od("use",this.frozen),t!=null)if(typeof t=="function")d(t,e);else if(typeof t=="object")Array.isArray(t)?f(t):c(t);else throw new TypeError("Expected usable value, not `"+t+"`");return this;function l(h){if(typeof h=="function")d(h,[]);else if(typeof h=="object")if(Array.isArray(h)){const[m,...g]=h;d(m,g)}else c(h);else throw new TypeError("Expected usable value, not `"+h+"`")}function c(h){if(!("plugins"in h)&&!("settings"in h))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");f(h.plugins),h.settings&&(s.settings=ed(!0,s.settings,h.settings))}function f(h){let m=-1;if(h!=null)if(Array.isArray(h))for(;++m<h.length;){const g=h[m];l(g)}else throw new TypeError("Expected a list of plugins, not `"+h+"`")}function d(h,m){let g=-1,v=-1;for(;++g<r.length;)if(r[g][0]===h){v=g;break}if(v===-1)r.push([h,...m]);else if(m.length>0){let[y,...b]=m;const R=r[v][1];Sp(R)&&Sp(y)&&(y=ed(!0,R,y)),r[v]=[h,y,...b]}}}}const FR=new Cm().freeze();function ad(i,t){if(typeof t!="function")throw new TypeError("Cannot `"+i+"` without `parser`")}function sd(i,t){if(typeof t!="function")throw new TypeError("Cannot `"+i+"` without `compiler`")}function od(i,t){if(t)throw new Error("Cannot call `"+i+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function ay(i){if(!Sp(i)||typeof i.type!="string")throw new TypeError("Expected node, got `"+i+"`")}function sy(i,t,e){if(!e)throw new Error("`"+i+"` finished async. Use `"+t+"` instead")}function Hu(i){return BR(i)?i:new bS(i)}function BR(i){return!!(i&&typeof i=="object"&&"message"in i&&"messages"in i)}function kR(i){return typeof i=="string"||HR(i)}function HR(i){return!!(i&&typeof i=="object"&&"byteLength"in i&&"byteOffset"in i)}const VR="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",oy=[],ly={allowDangerousHtml:!0},GR=/^(https?|ircs?|mailto|xmpp)$/i,qR=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function XR(i){const t=i.allowedElements,e=i.allowElement,r=i.children||"",s=i.className,l=i.components,c=i.disallowedElements,f=i.rehypePlugins||oy,d=i.remarkPlugins||oy,h=i.remarkRehypeOptions?{...i.remarkRehypeOptions,...ly}:ly,m=i.skipHtml,g=i.unwrapDisallowed,v=i.urlTransform||WR,y=FR().use(TA).use(d).use(xR,h).use(f),b=new bS;typeof r=="string"&&(b.value=r);for(const D of qR)Object.hasOwn(i,D.from)&&(""+D.from+(D.to?"use `"+D.to+"` instead":"remove it")+VR+D.id,void 0);const R=y.parse(b);let M=y.runSync(R,b);return s&&(M={type:"element",tagName:"div",properties:{className:s},children:M.type==="root"?M.children:[M]}),ES(M,x),rb(M,{Fragment:Kt.Fragment,components:l,ignoreInvalidStyle:!0,jsx:Kt.jsx,jsxs:Kt.jsxs,passKeys:!0,passNode:!0});function x(D,S,E){if(D.type==="raw"&&E&&typeof S=="number")return m?E.children.splice(S,1):E.children[S]={type:"text",value:D.value},S;if(D.type==="element"){let A;for(A in Qh)if(Object.hasOwn(Qh,A)&&Object.hasOwn(D.properties,A)){const L=D.properties[A],P=Qh[A];(P===null||P.includes(D.tagName))&&(D.properties[A]=v(String(L||""),A,D))}}if(D.type==="element"){let A=t?!t.includes(D.tagName):c?c.includes(D.tagName):!1;if(!A&&e&&typeof S=="number"&&(A=!e(D,S,E)),A&&E&&typeof S=="number")return g&&D.children?E.children.splice(S,1,...D.children):E.children.splice(S,1),S}}}function WR(i){const t=i.indexOf(":"),e=i.indexOf("?"),r=i.indexOf("#"),s=i.indexOf("/");return t<0||s>-1&&t>s||e>-1&&t>e||r>-1&&t>r||GR.test(i.slice(0,t))?i:""}function jR({markdown:i,onClose:t}){Ft.useEffect(()=>{const r=s=>{s.key==="Escape"&&t()};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[t]);const e=()=>{navigator.clipboard.writeText(i).then(()=>{const r=document.createElement("div");r.textContent="Copied!",Object.assign(r.style,{position:"fixed",bottom:"20px",left:"50%",transform:"translateX(-50%)",background:"#333",color:"#ddd",padding:"6px 12px",borderRadius:"4px",zIndex:2001,opacity:0,transition:"opacity 0.2s"}),document.body.appendChild(r),requestAnimationFrame(()=>r.style.opacity=1),setTimeout(()=>{r.style.opacity=0,setTimeout(()=>document.body.removeChild(r),200)},900)})};return Kt.jsxs("div",{className:"modal-backdrop",onClick:t,children:[Kt.jsx("style",{children:`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }
        .modal-wrapper {
          background: #14191e;
          border: 1px solid #333;
          border-radius: 8px;
          width: 80%;
          max-width: 900px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 768px) {
          .modal-wrapper {
            width: 94%;
            max-height: 88vh;
          }
        }
        .modal-header, .modal-footer {
          padding: 0.8rem 1rem;
          display: flex;
          align-items: center;
        }
        .modal-header {
          justify-content: space-between;
          border-bottom: 1px solid #222;
        }
        .modal-footer {
          justify-content: flex-end;
          border-top: 1px solid #222;
        }
        .modal-header h2 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 600;
        }
        .modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.25rem;
        }
        .modal-btn {
          background: #333;
          color: #ddd;
          border: none;
          padding: 0.45rem 0.8rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .modal-btn:hover {
          background: #444;
        }
      `}),Kt.jsxs("div",{className:"modal-wrapper",onClick:r=>r.stopPropagation(),children:[Kt.jsxs("div",{className:"modal-header",children:[Kt.jsx("h2",{children:"Instruction Manual"}),Kt.jsx("button",{className:"modal-btn",onClick:t,"aria-label":"Close",children:"×"})]}),Kt.jsx("div",{className:"modal-content",children:Kt.jsx(XR,{children:i})}),Kt.jsx("div",{className:"modal-footer",children:Kt.jsx("button",{className:"modal-btn",onClick:e,children:"Copy markdown"})})]})]})}function YR({options:i,title:t,isUserProgram:e,isDirty:r,onSelect:s,onNew:l,onTitleChange:c,onSave:f,onDelete:d}){const[h,m]=Ft.useState("__none"),g=e&&r,v=e,y=Kt.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",children:Kt.jsx("path",{fill:"currentColor",d:"M11 11V4h2v7h7v2h-7v7h-2v-7H4v-2z"})}),b=Kt.jsx("svg",{width:"17",height:"17",viewBox:"0 0 24 24",children:Kt.jsx("path",{fill:"currentColor",d:`M17 3H5a2 2 0 0 0-2 2v14a2 2
       0 0 0 2 2h14a2 2 0 0 0 2-2V7zM5 5h11v4H5zm7 14a3 3 0 1 1 0-6
       3 3 0 0 1 0 6z`})}),R=Kt.jsx("svg",{width:"17",height:"17",viewBox:"0 0 24 24",children:Kt.jsx("path",{fill:"currentColor",d:`M9 3h6l1 1h5v2H4V4h5zm1
       5h2v10h-2zm4 0h2v10h-2zM5 8h14l-1 12H6z`})}),M=x=>{const D=x.target.value;D!=="__none"&&(s(D),m("__none"))};return Kt.jsxs(Kt.Fragment,{children:[Kt.jsxs("div",{className:"control-panel",children:[Kt.jsxs("div",{className:"row",children:[Kt.jsxs("select",{value:h,onChange:M,children:[Kt.jsx("option",{value:"__none",disabled:!0,children:"Select a laser tracer…"}),i.map(({key:x,label:D})=>Kt.jsx("option",{value:x,children:D},x))]}),Kt.jsx("button",{className:"btn",onClick:l,title:"New sketch",children:y})]}),Kt.jsxs("div",{className:"row",children:[Kt.jsx("input",{className:"title",value:t,onChange:x=>c(x.target.value),placeholder:"Untitled",disabled:!e}),Kt.jsx("button",{className:`btn save${g?" dirty":""}`,onClick:f,title:g?"Save (modified)":"Saved",disabled:!g,children:b}),Kt.jsx("button",{className:"btn",onClick:d,title:"Delete",disabled:!v,children:R})]})]}),Kt.jsx("style",{children:`
        .control-panel {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding: 4px;
        }
        .row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        select {
          flex: 1 1 auto;
          padding: 0.35rem 0.55rem;
          font-size: 0.95rem;
          background: #222;
          color: #20a64f;
          border: 1px solid #444;
          border-radius: 4px;
        }
        .title {
          flex: 1 1 auto;
          padding: 0.35rem 0.55rem;
          font-size: 0.95rem;
          background: #222;
          color: #eee;
          border: 1px solid #444;
          border-radius: 4px;
        }
        .btn {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          background: #333;
          border: 1px solid #444;
          border-radius: 4px;
          color: #ddd;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn:hover:not(:disabled) {
          background: #444;
        }
        .btn:disabled {
          opacity: 0.4;
          cursor: default;
        }
        .save.dirty {
          background: #3a5;
          border-color: #4b6;
        }
      `})]})}function ZR(i,t,e){return t in i?Object.defineProperty(i,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):i[t]=e,i}function uy(i,t){var e=Object.keys(i);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(i);t&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),e.push.apply(e,r)}return e}function cy(i){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?uy(Object(e),!0).forEach(function(r){ZR(i,r,e[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(e)):uy(Object(e)).forEach(function(r){Object.defineProperty(i,r,Object.getOwnPropertyDescriptor(e,r))})}return i}function KR(i,t){if(i==null)return{};var e={},r=Object.keys(i),s,l;for(l=0;l<r.length;l++)s=r[l],!(t.indexOf(s)>=0)&&(e[s]=i[s]);return e}function QR(i,t){if(i==null)return{};var e=KR(i,t),r,s;if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(i);for(s=0;s<l.length;s++)r=l[s],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(i,r)&&(e[r]=i[r])}return e}function JR(i,t){return $R(i)||tw(i,t)||ew(i,t)||nw()}function $R(i){if(Array.isArray(i))return i}function tw(i,t){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(i)))){var e=[],r=!0,s=!1,l=void 0;try{for(var c=i[Symbol.iterator](),f;!(r=(f=c.next()).done)&&(e.push(f.value),!(t&&e.length===t));r=!0);}catch(d){s=!0,l=d}finally{try{!r&&c.return!=null&&c.return()}finally{if(s)throw l}}return e}}function ew(i,t){if(i){if(typeof i=="string")return fy(i,t);var e=Object.prototype.toString.call(i).slice(8,-1);if(e==="Object"&&i.constructor&&(e=i.constructor.name),e==="Map"||e==="Set")return Array.from(i);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return fy(i,t)}}function fy(i,t){(t==null||t>i.length)&&(t=i.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=i[e];return r}function nw(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function iw(i,t,e){return t in i?Object.defineProperty(i,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):i[t]=e,i}function hy(i,t){var e=Object.keys(i);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(i);t&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),e.push.apply(e,r)}return e}function dy(i){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?hy(Object(e),!0).forEach(function(r){iw(i,r,e[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(e)):hy(Object(e)).forEach(function(r){Object.defineProperty(i,r,Object.getOwnPropertyDescriptor(e,r))})}return i}function rw(){for(var i=arguments.length,t=new Array(i),e=0;e<i;e++)t[e]=arguments[e];return function(r){return t.reduceRight(function(s,l){return l(s)},r)}}function fl(i){return function t(){for(var e=this,r=arguments.length,s=new Array(r),l=0;l<r;l++)s[l]=arguments[l];return s.length>=i.length?i.apply(this,s):function(){for(var c=arguments.length,f=new Array(c),d=0;d<c;d++)f[d]=arguments[d];return t.apply(e,[].concat(s,f))}}}function Rc(i){return{}.toString.call(i).includes("Object")}function aw(i){return!Object.keys(i).length}function _l(i){return typeof i=="function"}function sw(i,t){return Object.prototype.hasOwnProperty.call(i,t)}function ow(i,t){return Rc(t)||ha("changeType"),Object.keys(t).some(function(e){return!sw(i,e)})&&ha("changeField"),t}function lw(i){_l(i)||ha("selectorType")}function uw(i){_l(i)||Rc(i)||ha("handlerType"),Rc(i)&&Object.values(i).some(function(t){return!_l(t)})&&ha("handlersType")}function cw(i){i||ha("initialIsRequired"),Rc(i)||ha("initialType"),aw(i)&&ha("initialContent")}function fw(i,t){throw new Error(i[t]||i.default)}var hw={initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"},ha=fl(fw)(hw),Vu={changes:ow,selector:lw,handler:uw,initial:cw};function dw(i){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};Vu.initial(i),Vu.handler(t);var e={current:i},r=fl(gw)(e,t),s=fl(mw)(e),l=fl(Vu.changes)(i),c=fl(pw)(e);function f(){var h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(m){return m};return Vu.selector(h),h(e.current)}function d(h){rw(r,s,l,c)(h)}return[f,d]}function pw(i,t){return _l(t)?t(i.current):t}function mw(i,t){return i.current=dy(dy({},i.current),t),t}function gw(i,t,e){return _l(t)?t(i.current):Object.keys(e).forEach(function(r){var s;return(s=t[r])===null||s===void 0?void 0:s.call(t,i.current[r])}),e}var _w={create:dw},vw={paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs"}};function yw(i){return function t(){for(var e=this,r=arguments.length,s=new Array(r),l=0;l<r;l++)s[l]=arguments[l];return s.length>=i.length?i.apply(this,s):function(){for(var c=arguments.length,f=new Array(c),d=0;d<c;d++)f[d]=arguments[d];return t.apply(e,[].concat(s,f))}}}function xw(i){return{}.toString.call(i).includes("Object")}function Sw(i){return i||py("configIsRequired"),xw(i)||py("configType"),i.urls?(Mw(),{paths:{vs:i.urls.monacoBase}}):i}function Mw(){console.warn(TS.deprecation)}function Ew(i,t){throw new Error(i[t]||i.default)}var TS={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:`Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `},py=yw(Ew)(TS),bw={config:Sw},Tw=function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(s){return e.reduceRight(function(l,c){return c(l)},s)}};function AS(i,t){return Object.keys(t).forEach(function(e){t[e]instanceof Object&&i[e]&&Object.assign(t[e],AS(i[e],t[e]))}),cy(cy({},i),t)}var Aw={type:"cancelation",msg:"operation is manually canceled"};function ld(i){var t=!1,e=new Promise(function(r,s){i.then(function(l){return t?s(Aw):r(l)}),i.catch(s)});return e.cancel=function(){return t=!0},e}var Rw=_w.create({config:vw,isInitialized:!1,resolve:null,reject:null,monaco:null}),RS=JR(Rw,2),Tl=RS[0],zc=RS[1];function ww(i){var t=bw.config(i),e=t.monaco,r=QR(t,["monaco"]);zc(function(s){return{config:AS(s.config,r),monaco:e}})}function Cw(){var i=Tl(function(t){var e=t.monaco,r=t.isInitialized,s=t.resolve;return{monaco:e,isInitialized:r,resolve:s}});if(!i.isInitialized){if(zc({isInitialized:!0}),i.monaco)return i.resolve(i.monaco),ld(ud);if(window.monaco&&window.monaco.editor)return wS(window.monaco),i.resolve(window.monaco),ld(ud);Tw(Dw,Uw)(Nw)}return ld(ud)}function Dw(i){return document.body.appendChild(i)}function Lw(i){var t=document.createElement("script");return i&&(t.src=i),t}function Uw(i){var t=Tl(function(r){var s=r.config,l=r.reject;return{config:s,reject:l}}),e=Lw("".concat(t.config.paths.vs,"/loader.js"));return e.onload=function(){return i()},e.onerror=t.reject,e}function Nw(){var i=Tl(function(e){var r=e.config,s=e.resolve,l=e.reject;return{config:r,resolve:s,reject:l}}),t=window.require;t.config(i.config),t(["vs/editor/editor.main"],function(e){wS(e),i.resolve(e)},function(e){i.reject(e)})}function wS(i){Tl().monaco||zc({monaco:i})}function Pw(){return Tl(function(i){var t=i.monaco;return t})}var ud=new Promise(function(i,t){return zc({resolve:i,reject:t})}),CS={config:ww,init:Cw,__getMonacoInstance:Pw},Ow={wrapper:{display:"flex",position:"relative",textAlign:"initial"},fullWidth:{width:"100%"},hide:{display:"none"}},cd=Ow,zw={container:{display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}},Iw=zw;function Fw({children:i}){return Zs.createElement("div",{style:Iw.container},i)}var Bw=Fw,kw=Bw;function Hw({width:i,height:t,isEditorReady:e,loading:r,_ref:s,className:l,wrapperProps:c}){return Zs.createElement("section",{style:{...cd.wrapper,width:i,height:t},...c},!e&&Zs.createElement(kw,null,r),Zs.createElement("div",{ref:s,style:{...cd.fullWidth,...!e&&cd.hide},className:l}))}var Vw=Hw,DS=Ft.memo(Vw);function Gw(i){Ft.useEffect(i,[])}var LS=Gw;function qw(i,t,e=!0){let r=Ft.useRef(!0);Ft.useEffect(r.current||!e?()=>{r.current=!1}:i,t)}var pi=qw;function ml(){}function Ws(i,t,e,r){return Xw(i,r)||Ww(i,t,e,r)}function Xw(i,t){return i.editor.getModel(US(i,t))}function Ww(i,t,e,r){return i.editor.createModel(t,e,r?US(i,r):void 0)}function US(i,t){return i.Uri.parse(t)}function jw({original:i,modified:t,language:e,originalLanguage:r,modifiedLanguage:s,originalModelPath:l,modifiedModelPath:c,keepCurrentOriginalModel:f=!1,keepCurrentModifiedModel:d=!1,theme:h="light",loading:m="Loading...",options:g={},height:v="100%",width:y="100%",className:b,wrapperProps:R={},beforeMount:M=ml,onMount:x=ml}){let[D,S]=Ft.useState(!1),[E,A]=Ft.useState(!0),L=Ft.useRef(null),P=Ft.useRef(null),O=Ft.useRef(null),C=Ft.useRef(x),T=Ft.useRef(M),N=Ft.useRef(!1);LS(()=>{let X=CS.init();return X.then(H=>(P.current=H)&&A(!1)).catch(H=>(H==null?void 0:H.type)!=="cancelation"&&console.error("Monaco initialization: error:",H)),()=>L.current?K():X.cancel()}),pi(()=>{if(L.current&&P.current){let X=L.current.getOriginalEditor(),H=Ws(P.current,i||"",r||e||"text",l||"");H!==X.getModel()&&X.setModel(H)}},[l],D),pi(()=>{if(L.current&&P.current){let X=L.current.getModifiedEditor(),H=Ws(P.current,t||"",s||e||"text",c||"");H!==X.getModel()&&X.setModel(H)}},[c],D),pi(()=>{let X=L.current.getModifiedEditor();X.getOption(P.current.editor.EditorOption.readOnly)?X.setValue(t||""):t!==X.getValue()&&(X.executeEdits("",[{range:X.getModel().getFullModelRange(),text:t||"",forceMoveMarkers:!0}]),X.pushUndoStop())},[t],D),pi(()=>{var X,H;(H=(X=L.current)==null?void 0:X.getModel())==null||H.original.setValue(i||"")},[i],D),pi(()=>{let{original:X,modified:H}=L.current.getModel();P.current.editor.setModelLanguage(X,r||e||"text"),P.current.editor.setModelLanguage(H,s||e||"text")},[e,r,s],D),pi(()=>{var X;(X=P.current)==null||X.editor.setTheme(h)},[h],D),pi(()=>{var X;(X=L.current)==null||X.updateOptions(g)},[g],D);let k=Ft.useCallback(()=>{var Z;if(!P.current)return;T.current(P.current);let X=Ws(P.current,i||"",r||e||"text",l||""),H=Ws(P.current,t||"",s||e||"text",c||"");(Z=L.current)==null||Z.setModel({original:X,modified:H})},[e,t,s,i,r,l,c]),q=Ft.useCallback(()=>{var X;!N.current&&O.current&&(L.current=P.current.editor.createDiffEditor(O.current,{automaticLayout:!0,...g}),k(),(X=P.current)==null||X.editor.setTheme(h),S(!0),N.current=!0)},[g,h,k]);Ft.useEffect(()=>{D&&C.current(L.current,P.current)},[D]),Ft.useEffect(()=>{!E&&!D&&q()},[E,D,q]);function K(){var H,Z,J,vt;let X=(H=L.current)==null?void 0:H.getModel();f||((Z=X==null?void 0:X.original)==null||Z.dispose()),d||((J=X==null?void 0:X.modified)==null||J.dispose()),(vt=L.current)==null||vt.dispose()}return Zs.createElement(DS,{width:y,height:v,isEditorReady:D,loading:m,_ref:O,className:b,wrapperProps:R})}var Yw=jw;Ft.memo(Yw);function Zw(i){let t=Ft.useRef();return Ft.useEffect(()=>{t.current=i},[i]),t.current}var Kw=Zw,Gu=new Map;function Qw({defaultValue:i,defaultLanguage:t,defaultPath:e,value:r,language:s,path:l,theme:c="light",line:f,loading:d="Loading...",options:h={},overrideServices:m={},saveViewState:g=!0,keepCurrentModel:v=!1,width:y="100%",height:b="100%",className:R,wrapperProps:M={},beforeMount:x=ml,onMount:D=ml,onChange:S,onValidate:E=ml}){let[A,L]=Ft.useState(!1),[P,O]=Ft.useState(!0),C=Ft.useRef(null),T=Ft.useRef(null),N=Ft.useRef(null),k=Ft.useRef(D),q=Ft.useRef(x),K=Ft.useRef(),X=Ft.useRef(r),H=Kw(l),Z=Ft.useRef(!1),J=Ft.useRef(!1);LS(()=>{let Y=CS.init();return Y.then(ft=>(C.current=ft)&&O(!1)).catch(ft=>(ft==null?void 0:ft.type)!=="cancelation"&&console.error("Monaco initialization: error:",ft)),()=>T.current?w():Y.cancel()}),pi(()=>{var ft,B,tt,pt;let Y=Ws(C.current,i||r||"",t||s||"",l||e||"");Y!==((ft=T.current)==null?void 0:ft.getModel())&&(g&&Gu.set(H,(B=T.current)==null?void 0:B.saveViewState()),(tt=T.current)==null||tt.setModel(Y),g&&((pt=T.current)==null||pt.restoreViewState(Gu.get(l))))},[l],A),pi(()=>{var Y;(Y=T.current)==null||Y.updateOptions(h)},[h],A),pi(()=>{!T.current||r===void 0||(T.current.getOption(C.current.editor.EditorOption.readOnly)?T.current.setValue(r):r!==T.current.getValue()&&(J.current=!0,T.current.executeEdits("",[{range:T.current.getModel().getFullModelRange(),text:r,forceMoveMarkers:!0}]),T.current.pushUndoStop(),J.current=!1))},[r],A),pi(()=>{var ft,B;let Y=(ft=T.current)==null?void 0:ft.getModel();Y&&s&&((B=C.current)==null||B.editor.setModelLanguage(Y,s))},[s],A),pi(()=>{var Y;f!==void 0&&((Y=T.current)==null||Y.revealLine(f))},[f],A),pi(()=>{var Y;(Y=C.current)==null||Y.editor.setTheme(c)},[c],A);let vt=Ft.useCallback(()=>{var Y;if(!(!N.current||!C.current)&&!Z.current){q.current(C.current);let ft=l||e,B=Ws(C.current,r||i||"",t||s||"",ft||"");T.current=(Y=C.current)==null?void 0:Y.editor.create(N.current,{model:B,automaticLayout:!0,...h},m),g&&T.current.restoreViewState(Gu.get(ft)),C.current.editor.setTheme(c),f!==void 0&&T.current.revealLine(f),L(!0),Z.current=!0}},[i,t,e,r,s,l,h,m,g,c,f]);Ft.useEffect(()=>{A&&k.current(T.current,C.current)},[A]),Ft.useEffect(()=>{!P&&!A&&vt()},[P,A,vt]),X.current=r,Ft.useEffect(()=>{var Y,ft;A&&S&&((Y=K.current)==null||Y.dispose(),K.current=(ft=T.current)==null?void 0:ft.onDidChangeModelContent(B=>{J.current||S(T.current.getValue(),B)}))},[A,S]),Ft.useEffect(()=>{if(A){let Y=C.current.editor.onDidChangeMarkers(ft=>{var tt;let B=(tt=T.current.getModel())==null?void 0:tt.uri;if(B&&ft.find(pt=>pt.path===B.path)){let pt=C.current.editor.getModelMarkers({resource:B});E==null||E(pt)}});return()=>{Y==null||Y.dispose()}}return()=>{}},[A,E]);function w(){var Y,ft;(Y=K.current)==null||Y.dispose(),v?g&&Gu.set(l,T.current.saveViewState()):(ft=T.current.getModel())==null||ft.dispose(),T.current.dispose()}return Zs.createElement(DS,{width:y,height:b,isEditorReady:A,loading:d,_ref:N,className:R,wrapperProps:M})}var Jw=Qw,$w=Ft.memo(Jw),tC=$w;const eC=Ft.forwardRef(function({source:t,onChange:e,compileErr:r,onEditorReady:s},l){const c=Ft.useRef(null);Ft.useImperativeHandle(l,()=>({trigger:(...d)=>{var h;return(h=c.current)==null?void 0:h.trigger(...d)},layout:()=>{var d;return(d=c.current)==null?void 0:d.layout()},editor:c.current}));const f=Ft.useCallback(d=>{c.current=d,s==null||s(),requestAnimationFrame(()=>{d.layout(),d.trigger("react","editor.action.forceRetokenize",null)})},[s]);return Ft.useEffect(()=>{const d=c.current;d&&(d.trigger("react","editor.action.forceRetokenize",null),requestAnimationFrame(()=>d.layout()))},[t]),Ft.useEffect(()=>{const d=()=>{var h;return(h=c.current)==null?void 0:h.layout()};return window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)},[]),Kt.jsxs("div",{className:"code-pane",children:[Kt.jsx(tC,{language:"javascript",value:t,onChange:d=>e(d??""),onMount:f,theme:"vs-dark",loading:null,options:{automaticLayout:!0,minimap:{enabled:!1},quickSuggestions:!1,suggestOnTriggerCharacters:!1,parameterHints:{enabled:!1},wordBasedSuggestions:!1,suggest:{showWords:!1}}}),r&&Kt.jsx("div",{className:"compile-error",children:r})]})});/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Dm="175",Js={ROTATE:0,DOLLY:1,PAN:2},js={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},nC=0,my=1,iC=2,NS=1,rC=2,br=3,ga=0,ni=1,ji=2,da=0,$s=1,Ep=2,gy=3,_y=4,aC=5,qa=100,sC=101,oC=102,lC=103,uC=104,cC=200,fC=201,hC=202,dC=203,bp=204,Tp=205,pC=206,mC=207,gC=208,_C=209,vC=210,yC=211,xC=212,SC=213,MC=214,Ap=0,Rp=1,wp=2,eo=3,Cp=4,Dp=5,Lp=6,Up=7,PS=0,EC=1,bC=2,pa=0,TC=1,AC=2,RC=3,wC=4,CC=5,DC=6,LC=7,OS=300,no=301,io=302,Np=303,Pp=304,Ic=306,wc=1e3,Wa=1001,Op=1002,Ii=1003,UC=1004,qu=1005,Zi=1006,fd=1007,ja=1008,wr=1009,zS=1010,IS=1011,vl=1012,Lm=1013,Za=1014,Tr=1015,Al=1016,Um=1017,Nm=1018,yl=1020,FS=35902,BS=1021,kS=1022,zi=1023,HS=1024,VS=1025,xl=1026,Sl=1027,GS=1028,Pm=1029,qS=1030,Om=1031,zm=1033,gc=33776,_c=33777,vc=33778,yc=33779,zp=35840,Ip=35841,Fp=35842,Bp=35843,kp=36196,Hp=37492,Vp=37496,Gp=37808,qp=37809,Xp=37810,Wp=37811,jp=37812,Yp=37813,Zp=37814,Kp=37815,Qp=37816,Jp=37817,$p=37818,tm=37819,em=37820,nm=37821,xc=36492,im=36494,rm=36495,XS=36283,am=36284,sm=36285,om=36286,NC=3200,PC=3201,WS=0,OC=1,fa="",Ti="srgb",ro="srgb-linear",Cc="linear",Ve="srgb",Us=7680,vy=519,zC=512,IC=513,FC=514,jS=515,BC=516,kC=517,HC=518,VC=519,lm=35044,um=35048,yy="300 es",Ar=2e3,Dc=2001;class Ja{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[t]===void 0&&(r[t]=[]),r[t].indexOf(e)===-1&&r[t].push(e)}hasEventListener(t,e){const r=this._listeners;return r===void 0?!1:r[t]!==void 0&&r[t].indexOf(e)!==-1}removeEventListener(t,e){const r=this._listeners;if(r===void 0)return;const s=r[t];if(s!==void 0){const l=s.indexOf(e);l!==-1&&s.splice(l,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const r=e[t.type];if(r!==void 0){t.target=this;const s=r.slice(0);for(let l=0,c=s.length;l<c;l++)s[l].call(this,t);t.target=null}}}const kn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sc=Math.PI/180,cm=180/Math.PI;function ma(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(kn[i&255]+kn[i>>8&255]+kn[i>>16&255]+kn[i>>24&255]+"-"+kn[t&255]+kn[t>>8&255]+"-"+kn[t>>16&15|64]+kn[t>>24&255]+"-"+kn[e&63|128]+kn[e>>8&255]+"-"+kn[e>>16&255]+kn[e>>24&255]+kn[r&255]+kn[r>>8&255]+kn[r>>16&255]+kn[r>>24&255]).toLowerCase()}function Se(i,t,e){return Math.max(t,Math.min(e,i))}function GC(i,t){return(i%t+t)%t}function hd(i,t,e){return(1-e)*i+e*t}function Yi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ge(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const qC={DEG2RAD:Sc};class me{constructor(t=0,e=0){me.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,r=this.y,s=t.elements;return this.x=s[0]*e+s[3]*r+s[6],this.y=s[1]*e+s[4]*r+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this}clampLength(t,e){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Se(r,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const r=this.dot(t)/e;return Math.acos(Se(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,r=this.y-t.y;return e*e+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,r){return this.x=t.x+(e.x-t.x)*r,this.y=t.y+(e.y-t.y)*r,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const r=Math.cos(e),s=Math.sin(e),l=this.x-t.x,c=this.y-t.y;return this.x=l*r-c*s+t.x,this.y=l*s+c*r+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class fe{constructor(t,e,r,s,l,c,f,d,h){fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,r,s,l,c,f,d,h)}set(t,e,r,s,l,c,f,d,h){const m=this.elements;return m[0]=t,m[1]=s,m[2]=f,m[3]=e,m[4]=l,m[5]=d,m[6]=r,m[7]=c,m[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,r=t.elements;return e[0]=r[0],e[1]=r[1],e[2]=r[2],e[3]=r[3],e[4]=r[4],e[5]=r[5],e[6]=r[6],e[7]=r[7],e[8]=r[8],this}extractBasis(t,e,r){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const r=t.elements,s=e.elements,l=this.elements,c=r[0],f=r[3],d=r[6],h=r[1],m=r[4],g=r[7],v=r[2],y=r[5],b=r[8],R=s[0],M=s[3],x=s[6],D=s[1],S=s[4],E=s[7],A=s[2],L=s[5],P=s[8];return l[0]=c*R+f*D+d*A,l[3]=c*M+f*S+d*L,l[6]=c*x+f*E+d*P,l[1]=h*R+m*D+g*A,l[4]=h*M+m*S+g*L,l[7]=h*x+m*E+g*P,l[2]=v*R+y*D+b*A,l[5]=v*M+y*S+b*L,l[8]=v*x+y*E+b*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],r=t[1],s=t[2],l=t[3],c=t[4],f=t[5],d=t[6],h=t[7],m=t[8];return e*c*m-e*f*h-r*l*m+r*f*d+s*l*h-s*c*d}invert(){const t=this.elements,e=t[0],r=t[1],s=t[2],l=t[3],c=t[4],f=t[5],d=t[6],h=t[7],m=t[8],g=m*c-f*h,v=f*d-m*l,y=h*l-c*d,b=e*g+r*v+s*y;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const R=1/b;return t[0]=g*R,t[1]=(s*h-m*r)*R,t[2]=(f*r-s*c)*R,t[3]=v*R,t[4]=(m*e-s*d)*R,t[5]=(s*l-f*e)*R,t[6]=y*R,t[7]=(r*d-h*e)*R,t[8]=(c*e-r*l)*R,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,r,s,l,c,f){const d=Math.cos(l),h=Math.sin(l);return this.set(r*d,r*h,-r*(d*c+h*f)+c+t,-s*h,s*d,-s*(-h*c+d*f)+f+e,0,0,1),this}scale(t,e){return this.premultiply(dd.makeScale(t,e)),this}rotate(t){return this.premultiply(dd.makeRotation(-t)),this}translate(t,e){return this.premultiply(dd.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),r=Math.sin(t);return this.set(e,-r,0,r,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,r=t.elements;for(let s=0;s<9;s++)if(e[s]!==r[s])return!1;return!0}fromArray(t,e=0){for(let r=0;r<9;r++)this.elements[r]=t[r+e];return this}toArray(t=[],e=0){const r=this.elements;return t[e]=r[0],t[e+1]=r[1],t[e+2]=r[2],t[e+3]=r[3],t[e+4]=r[4],t[e+5]=r[5],t[e+6]=r[6],t[e+7]=r[7],t[e+8]=r[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const dd=new fe;function YS(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ml(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function XC(){const i=Ml("canvas");return i.style.display="block",i}const xy={};function Mc(i){i in xy||(xy[i]=!0,console.warn(i))}function WC(i,t,e){return new Promise(function(r,s){function l(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(l,e);break;default:r()}}setTimeout(l,e)})}function jC(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function YC(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Sy=new fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),My=new fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ZC(){const i={enabled:!0,workingColorSpace:ro,spaces:{},convert:function(s,l,c){return this.enabled===!1||l===c||!l||!c||(this.spaces[l].transfer===Ve&&(s.r=Rr(s.r),s.g=Rr(s.g),s.b=Rr(s.b)),this.spaces[l].primaries!==this.spaces[c].primaries&&(s.applyMatrix3(this.spaces[l].toXYZ),s.applyMatrix3(this.spaces[c].fromXYZ)),this.spaces[c].transfer===Ve&&(s.r=to(s.r),s.g=to(s.g),s.b=to(s.b))),s},fromWorkingColorSpace:function(s,l){return this.convert(s,this.workingColorSpace,l)},toWorkingColorSpace:function(s,l){return this.convert(s,l,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===fa?Cc:this.spaces[s].transfer},getLuminanceCoefficients:function(s,l=this.workingColorSpace){return s.fromArray(this.spaces[l].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,l,c){return s.copy(this.spaces[l].toXYZ).multiply(this.spaces[c].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],r=[.3127,.329];return i.define({[ro]:{primaries:t,whitePoint:r,transfer:Cc,toXYZ:Sy,fromXYZ:My,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ti},outputColorSpaceConfig:{drawingBufferColorSpace:Ti}},[Ti]:{primaries:t,whitePoint:r,transfer:Ve,toXYZ:Sy,fromXYZ:My,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ti}}}),i}const Ce=ZC();function Rr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function to(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ns;class KC{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let r;if(t instanceof HTMLCanvasElement)r=t;else{Ns===void 0&&(Ns=Ml("canvas")),Ns.width=t.width,Ns.height=t.height;const s=Ns.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),r=Ns}return r.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ml("canvas");e.width=t.width,e.height=t.height;const r=e.getContext("2d");r.drawImage(t,0,0,t.width,t.height);const s=r.getImageData(0,0,t.width,t.height),l=s.data;for(let c=0;c<l.length;c++)l[c]=Rr(l[c]/255)*255;return r.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let r=0;r<e.length;r++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[r]=Math.floor(Rr(e[r]/255)*255):e[r]=Rr(e[r]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let QC=0;class Im{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:QC++}),this.uuid=ma(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const r={uuid:this.uuid,url:""},s=this.data;if(s!==null){let l;if(Array.isArray(s)){l=[];for(let c=0,f=s.length;c<f;c++)s[c].isDataTexture?l.push(pd(s[c].image)):l.push(pd(s[c]))}else l=pd(s);r.url=l}return e||(t.images[this.uuid]=r),r}}function pd(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?KC.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let JC=0;class jn extends Ja{constructor(t=jn.DEFAULT_IMAGE,e=jn.DEFAULT_MAPPING,r=Wa,s=Wa,l=Zi,c=ja,f=zi,d=wr,h=jn.DEFAULT_ANISOTROPY,m=fa){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:JC++}),this.uuid=ma(),this.name="",this.source=new Im(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=l,this.minFilter=c,this.anisotropy=h,this.format=f,this.internalFormat=null,this.type=d,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),e||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==OS)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case wc:t.x=t.x-Math.floor(t.x);break;case Wa:t.x=t.x<0?0:1;break;case Op:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case wc:t.y=t.y-Math.floor(t.y);break;case Wa:t.y=t.y<0?0:1;break;case Op:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}jn.DEFAULT_IMAGE=null;jn.DEFAULT_MAPPING=OS;jn.DEFAULT_ANISOTROPY=1;class ln{constructor(t=0,e=0,r=0,s=1){ln.prototype.isVector4=!0,this.x=t,this.y=e,this.z=r,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,r,s){return this.x=t,this.y=e,this.z=r,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,r=this.y,s=this.z,l=this.w,c=t.elements;return this.x=c[0]*e+c[4]*r+c[8]*s+c[12]*l,this.y=c[1]*e+c[5]*r+c[9]*s+c[13]*l,this.z=c[2]*e+c[6]*r+c[10]*s+c[14]*l,this.w=c[3]*e+c[7]*r+c[11]*s+c[15]*l,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,r,s,l;const d=t.elements,h=d[0],m=d[4],g=d[8],v=d[1],y=d[5],b=d[9],R=d[2],M=d[6],x=d[10];if(Math.abs(m-v)<.01&&Math.abs(g-R)<.01&&Math.abs(b-M)<.01){if(Math.abs(m+v)<.1&&Math.abs(g+R)<.1&&Math.abs(b+M)<.1&&Math.abs(h+y+x-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(h+1)/2,E=(y+1)/2,A=(x+1)/2,L=(m+v)/4,P=(g+R)/4,O=(b+M)/4;return S>E&&S>A?S<.01?(r=0,s=.707106781,l=.707106781):(r=Math.sqrt(S),s=L/r,l=P/r):E>A?E<.01?(r=.707106781,s=0,l=.707106781):(s=Math.sqrt(E),r=L/s,l=O/s):A<.01?(r=.707106781,s=.707106781,l=0):(l=Math.sqrt(A),r=P/l,s=O/l),this.set(r,s,l,e),this}let D=Math.sqrt((M-b)*(M-b)+(g-R)*(g-R)+(v-m)*(v-m));return Math.abs(D)<.001&&(D=1),this.x=(M-b)/D,this.y=(g-R)/D,this.z=(v-m)/D,this.w=Math.acos((h+y+x-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this.z=Se(this.z,t.z,e.z),this.w=Se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this.z=Se(this.z,t,e),this.w=Se(this.w,t,e),this}clampLength(t,e){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Se(r,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,r){return this.x=t.x+(e.x-t.x)*r,this.y=t.y+(e.y-t.y)*r,this.z=t.z+(e.z-t.z)*r,this.w=t.w+(e.w-t.w)*r,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $C extends Ja{constructor(t=1,e=1,r={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ln(0,0,t,e),this.scissorTest=!1,this.viewport=new ln(0,0,t,e);const s={width:t,height:e,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const l=new jn(s,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);l.flipY=!1,l.generateMipmaps=r.generateMipmaps,l.internalFormat=r.internalFormat,this.textures=[];const c=r.count;for(let f=0;f<c;f++)this.textures[f]=l.clone(),this.textures[f].isRenderTargetTexture=!0,this.textures[f].renderTarget=this;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,r=1){if(this.width!==t||this.height!==e||this.depth!==r){this.width=t,this.height=e,this.depth=r;for(let s=0,l=this.textures.length;s<l;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=r;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,r=t.textures.length;e<r;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Im(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ka extends $C{constructor(t=1,e=1,r={}){super(t,e,r),this.isWebGLRenderTarget=!0}}class ZS extends jn{constructor(t=null,e=1,r=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:r,depth:s},this.magFilter=Ii,this.minFilter=Ii,this.wrapR=Wa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class t2 extends jn{constructor(t=null,e=1,r=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:r,depth:s},this.magFilter=Ii,this.minFilter=Ii,this.wrapR=Wa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cr{constructor(t=0,e=0,r=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=r,this._w=s}static slerpFlat(t,e,r,s,l,c,f){let d=r[s+0],h=r[s+1],m=r[s+2],g=r[s+3];const v=l[c+0],y=l[c+1],b=l[c+2],R=l[c+3];if(f===0){t[e+0]=d,t[e+1]=h,t[e+2]=m,t[e+3]=g;return}if(f===1){t[e+0]=v,t[e+1]=y,t[e+2]=b,t[e+3]=R;return}if(g!==R||d!==v||h!==y||m!==b){let M=1-f;const x=d*v+h*y+m*b+g*R,D=x>=0?1:-1,S=1-x*x;if(S>Number.EPSILON){const A=Math.sqrt(S),L=Math.atan2(A,x*D);M=Math.sin(M*L)/A,f=Math.sin(f*L)/A}const E=f*D;if(d=d*M+v*E,h=h*M+y*E,m=m*M+b*E,g=g*M+R*E,M===1-f){const A=1/Math.sqrt(d*d+h*h+m*m+g*g);d*=A,h*=A,m*=A,g*=A}}t[e]=d,t[e+1]=h,t[e+2]=m,t[e+3]=g}static multiplyQuaternionsFlat(t,e,r,s,l,c){const f=r[s],d=r[s+1],h=r[s+2],m=r[s+3],g=l[c],v=l[c+1],y=l[c+2],b=l[c+3];return t[e]=f*b+m*g+d*y-h*v,t[e+1]=d*b+m*v+h*g-f*y,t[e+2]=h*b+m*y+f*v-d*g,t[e+3]=m*b-f*g-d*v-h*y,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,r,s){return this._x=t,this._y=e,this._z=r,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const r=t._x,s=t._y,l=t._z,c=t._order,f=Math.cos,d=Math.sin,h=f(r/2),m=f(s/2),g=f(l/2),v=d(r/2),y=d(s/2),b=d(l/2);switch(c){case"XYZ":this._x=v*m*g+h*y*b,this._y=h*y*g-v*m*b,this._z=h*m*b+v*y*g,this._w=h*m*g-v*y*b;break;case"YXZ":this._x=v*m*g+h*y*b,this._y=h*y*g-v*m*b,this._z=h*m*b-v*y*g,this._w=h*m*g+v*y*b;break;case"ZXY":this._x=v*m*g-h*y*b,this._y=h*y*g+v*m*b,this._z=h*m*b+v*y*g,this._w=h*m*g-v*y*b;break;case"ZYX":this._x=v*m*g-h*y*b,this._y=h*y*g+v*m*b,this._z=h*m*b-v*y*g,this._w=h*m*g+v*y*b;break;case"YZX":this._x=v*m*g+h*y*b,this._y=h*y*g+v*m*b,this._z=h*m*b-v*y*g,this._w=h*m*g-v*y*b;break;case"XZY":this._x=v*m*g-h*y*b,this._y=h*y*g-v*m*b,this._z=h*m*b+v*y*g,this._w=h*m*g+v*y*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+c)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const r=e/2,s=Math.sin(r);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,r=e[0],s=e[4],l=e[8],c=e[1],f=e[5],d=e[9],h=e[2],m=e[6],g=e[10],v=r+f+g;if(v>0){const y=.5/Math.sqrt(v+1);this._w=.25/y,this._x=(m-d)*y,this._y=(l-h)*y,this._z=(c-s)*y}else if(r>f&&r>g){const y=2*Math.sqrt(1+r-f-g);this._w=(m-d)/y,this._x=.25*y,this._y=(s+c)/y,this._z=(l+h)/y}else if(f>g){const y=2*Math.sqrt(1+f-r-g);this._w=(l-h)/y,this._x=(s+c)/y,this._y=.25*y,this._z=(d+m)/y}else{const y=2*Math.sqrt(1+g-r-f);this._w=(c-s)/y,this._x=(l+h)/y,this._y=(d+m)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let r=t.dot(e)+1;return r<Number.EPSILON?(r=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=r):(this._x=0,this._y=-t.z,this._z=t.y,this._w=r)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=r),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Se(this.dot(t),-1,1)))}rotateTowards(t,e){const r=this.angleTo(t);if(r===0)return this;const s=Math.min(1,e/r);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const r=t._x,s=t._y,l=t._z,c=t._w,f=e._x,d=e._y,h=e._z,m=e._w;return this._x=r*m+c*f+s*h-l*d,this._y=s*m+c*d+l*f-r*h,this._z=l*m+c*h+r*d-s*f,this._w=c*m-r*f-s*d-l*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const r=this._x,s=this._y,l=this._z,c=this._w;let f=c*t._w+r*t._x+s*t._y+l*t._z;if(f<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,f=-f):this.copy(t),f>=1)return this._w=c,this._x=r,this._y=s,this._z=l,this;const d=1-f*f;if(d<=Number.EPSILON){const y=1-e;return this._w=y*c+e*this._w,this._x=y*r+e*this._x,this._y=y*s+e*this._y,this._z=y*l+e*this._z,this.normalize(),this}const h=Math.sqrt(d),m=Math.atan2(h,f),g=Math.sin((1-e)*m)/h,v=Math.sin(e*m)/h;return this._w=c*g+this._w*v,this._x=r*g+this._x*v,this._y=s*g+this._y*v,this._z=l*g+this._z*v,this._onChangeCallback(),this}slerpQuaternions(t,e,r){return this.copy(t).slerp(e,r)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),r=Math.random(),s=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(s*Math.sin(t),s*Math.cos(t),l*Math.sin(e),l*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ot{constructor(t=0,e=0,r=0){ot.prototype.isVector3=!0,this.x=t,this.y=e,this.z=r}set(t,e,r){return r===void 0&&(r=this.z),this.x=t,this.y=e,this.z=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ey.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ey.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,r=this.y,s=this.z,l=t.elements;return this.x=l[0]*e+l[3]*r+l[6]*s,this.y=l[1]*e+l[4]*r+l[7]*s,this.z=l[2]*e+l[5]*r+l[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,r=this.y,s=this.z,l=t.elements,c=1/(l[3]*e+l[7]*r+l[11]*s+l[15]);return this.x=(l[0]*e+l[4]*r+l[8]*s+l[12])*c,this.y=(l[1]*e+l[5]*r+l[9]*s+l[13])*c,this.z=(l[2]*e+l[6]*r+l[10]*s+l[14])*c,this}applyQuaternion(t){const e=this.x,r=this.y,s=this.z,l=t.x,c=t.y,f=t.z,d=t.w,h=2*(c*s-f*r),m=2*(f*e-l*s),g=2*(l*r-c*e);return this.x=e+d*h+c*g-f*m,this.y=r+d*m+f*h-l*g,this.z=s+d*g+l*m-c*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,r=this.y,s=this.z,l=t.elements;return this.x=l[0]*e+l[4]*r+l[8]*s,this.y=l[1]*e+l[5]*r+l[9]*s,this.z=l[2]*e+l[6]*r+l[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this.z=Se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this.z=Se(this.z,t,e),this}clampLength(t,e){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Se(r,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,r){return this.x=t.x+(e.x-t.x)*r,this.y=t.y+(e.y-t.y)*r,this.z=t.z+(e.z-t.z)*r,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const r=t.x,s=t.y,l=t.z,c=e.x,f=e.y,d=e.z;return this.x=s*d-l*f,this.y=l*c-r*d,this.z=r*f-s*c,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const r=t.dot(this)/e;return this.copy(t).multiplyScalar(r)}projectOnPlane(t){return md.copy(this).projectOnVector(t),this.sub(md)}reflect(t){return this.sub(md.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const r=this.dot(t)/e;return Math.acos(Se(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,r=this.y-t.y,s=this.z-t.z;return e*e+r*r+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,r){const s=Math.sin(e)*t;return this.x=s*Math.sin(r),this.y=Math.cos(e)*t,this.z=s*Math.cos(r),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,r){return this.x=t*Math.sin(e),this.y=r,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),r=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=r,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,r=Math.sqrt(1-e*e);return this.x=r*Math.cos(t),this.y=e,this.z=r*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const md=new ot,Ey=new Cr;class Rl{constructor(t=new ot(1/0,1/0,1/0),e=new ot(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,r=t.length;e<r;e+=3)this.expandByPoint(Ui.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,r=t.count;e<r;e++)this.expandByPoint(Ui.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,r=t.length;e<r;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const r=Ui.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(r),this.max.copy(t).add(r),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const r=t.geometry;if(r!==void 0){const l=r.getAttribute("position");if(e===!0&&l!==void 0&&t.isInstancedMesh!==!0)for(let c=0,f=l.count;c<f;c++)t.isMesh===!0?t.getVertexPosition(c,Ui):Ui.fromBufferAttribute(l,c),Ui.applyMatrix4(t.matrixWorld),this.expandByPoint(Ui);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xu.copy(t.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Xu.copy(r.boundingBox)),Xu.applyMatrix4(t.matrixWorld),this.union(Xu)}const s=t.children;for(let l=0,c=s.length;l<c;l++)this.expandByObject(s[l],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ui),Ui.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,r;return t.normal.x>0?(e=t.normal.x*this.min.x,r=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,r=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,r+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,r+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,r+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,r+=t.normal.z*this.min.z),e<=-t.constant&&r>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(sl),Wu.subVectors(this.max,sl),Ps.subVectors(t.a,sl),Os.subVectors(t.b,sl),zs.subVectors(t.c,sl),ra.subVectors(Os,Ps),aa.subVectors(zs,Os),Ia.subVectors(Ps,zs);let e=[0,-ra.z,ra.y,0,-aa.z,aa.y,0,-Ia.z,Ia.y,ra.z,0,-ra.x,aa.z,0,-aa.x,Ia.z,0,-Ia.x,-ra.y,ra.x,0,-aa.y,aa.x,0,-Ia.y,Ia.x,0];return!gd(e,Ps,Os,zs,Wu)||(e=[1,0,0,0,1,0,0,0,1],!gd(e,Ps,Os,zs,Wu))?!1:(ju.crossVectors(ra,aa),e=[ju.x,ju.y,ju.z],gd(e,Ps,Os,zs,Wu))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ui).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ui).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yr),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const yr=[new ot,new ot,new ot,new ot,new ot,new ot,new ot,new ot],Ui=new ot,Xu=new Rl,Ps=new ot,Os=new ot,zs=new ot,ra=new ot,aa=new ot,Ia=new ot,sl=new ot,Wu=new ot,ju=new ot,Fa=new ot;function gd(i,t,e,r,s){for(let l=0,c=i.length-3;l<=c;l+=3){Fa.fromArray(i,l);const f=s.x*Math.abs(Fa.x)+s.y*Math.abs(Fa.y)+s.z*Math.abs(Fa.z),d=t.dot(Fa),h=e.dot(Fa),m=r.dot(Fa);if(Math.max(-Math.max(d,h,m),Math.min(d,h,m))>f)return!1}return!0}const e2=new Rl,ol=new ot,_d=new ot;class Fc{constructor(t=new ot,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const r=this.center;e!==void 0?r.copy(e):e2.setFromPoints(t).getCenter(r);let s=0;for(let l=0,c=t.length;l<c;l++)s=Math.max(s,r.distanceToSquared(t[l]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const r=this.center.distanceToSquared(t);return e.copy(t),r>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ol.subVectors(t,this.center);const e=ol.lengthSq();if(e>this.radius*this.radius){const r=Math.sqrt(e),s=(r-this.radius)*.5;this.center.addScaledVector(ol,s/r),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_d.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ol.copy(t.center).add(_d)),this.expandByPoint(ol.copy(t.center).sub(_d))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xr=new ot,vd=new ot,Yu=new ot,sa=new ot,yd=new ot,Zu=new ot,xd=new ot;class Fm{constructor(t=new ot,e=new ot(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xr)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const r=e.dot(this.direction);return r<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=xr.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xr.copy(this.origin).addScaledVector(this.direction,e),xr.distanceToSquared(t))}distanceSqToSegment(t,e,r,s){vd.copy(t).add(e).multiplyScalar(.5),Yu.copy(e).sub(t).normalize(),sa.copy(this.origin).sub(vd);const l=t.distanceTo(e)*.5,c=-this.direction.dot(Yu),f=sa.dot(this.direction),d=-sa.dot(Yu),h=sa.lengthSq(),m=Math.abs(1-c*c);let g,v,y,b;if(m>0)if(g=c*d-f,v=c*f-d,b=l*m,g>=0)if(v>=-b)if(v<=b){const R=1/m;g*=R,v*=R,y=g*(g+c*v+2*f)+v*(c*g+v+2*d)+h}else v=l,g=Math.max(0,-(c*v+f)),y=-g*g+v*(v+2*d)+h;else v=-l,g=Math.max(0,-(c*v+f)),y=-g*g+v*(v+2*d)+h;else v<=-b?(g=Math.max(0,-(-c*l+f)),v=g>0?-l:Math.min(Math.max(-l,-d),l),y=-g*g+v*(v+2*d)+h):v<=b?(g=0,v=Math.min(Math.max(-l,-d),l),y=v*(v+2*d)+h):(g=Math.max(0,-(c*l+f)),v=g>0?l:Math.min(Math.max(-l,-d),l),y=-g*g+v*(v+2*d)+h);else v=c>0?-l:l,g=Math.max(0,-(c*v+f)),y=-g*g+v*(v+2*d)+h;return r&&r.copy(this.origin).addScaledVector(this.direction,g),s&&s.copy(vd).addScaledVector(Yu,v),y}intersectSphere(t,e){xr.subVectors(t.center,this.origin);const r=xr.dot(this.direction),s=xr.dot(xr)-r*r,l=t.radius*t.radius;if(s>l)return null;const c=Math.sqrt(l-s),f=r-c,d=r+c;return d<0?null:f<0?this.at(d,e):this.at(f,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(t.normal)+t.constant)/e;return r>=0?r:null}intersectPlane(t,e){const r=this.distanceToPlane(t);return r===null?null:this.at(r,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let r,s,l,c,f,d;const h=1/this.direction.x,m=1/this.direction.y,g=1/this.direction.z,v=this.origin;return h>=0?(r=(t.min.x-v.x)*h,s=(t.max.x-v.x)*h):(r=(t.max.x-v.x)*h,s=(t.min.x-v.x)*h),m>=0?(l=(t.min.y-v.y)*m,c=(t.max.y-v.y)*m):(l=(t.max.y-v.y)*m,c=(t.min.y-v.y)*m),r>c||l>s||((l>r||isNaN(r))&&(r=l),(c<s||isNaN(s))&&(s=c),g>=0?(f=(t.min.z-v.z)*g,d=(t.max.z-v.z)*g):(f=(t.max.z-v.z)*g,d=(t.min.z-v.z)*g),r>d||f>s)||((f>r||r!==r)&&(r=f),(d<s||s!==s)&&(s=d),s<0)?null:this.at(r>=0?r:s,e)}intersectsBox(t){return this.intersectBox(t,xr)!==null}intersectTriangle(t,e,r,s,l){yd.subVectors(e,t),Zu.subVectors(r,t),xd.crossVectors(yd,Zu);let c=this.direction.dot(xd),f;if(c>0){if(s)return null;f=1}else if(c<0)f=-1,c=-c;else return null;sa.subVectors(this.origin,t);const d=f*this.direction.dot(Zu.crossVectors(sa,Zu));if(d<0)return null;const h=f*this.direction.dot(yd.cross(sa));if(h<0||d+h>c)return null;const m=-f*sa.dot(xd);return m<0?null:this.at(m/c,l)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class un{constructor(t,e,r,s,l,c,f,d,h,m,g,v,y,b,R,M){un.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,r,s,l,c,f,d,h,m,g,v,y,b,R,M)}set(t,e,r,s,l,c,f,d,h,m,g,v,y,b,R,M){const x=this.elements;return x[0]=t,x[4]=e,x[8]=r,x[12]=s,x[1]=l,x[5]=c,x[9]=f,x[13]=d,x[2]=h,x[6]=m,x[10]=g,x[14]=v,x[3]=y,x[7]=b,x[11]=R,x[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new un().fromArray(this.elements)}copy(t){const e=this.elements,r=t.elements;return e[0]=r[0],e[1]=r[1],e[2]=r[2],e[3]=r[3],e[4]=r[4],e[5]=r[5],e[6]=r[6],e[7]=r[7],e[8]=r[8],e[9]=r[9],e[10]=r[10],e[11]=r[11],e[12]=r[12],e[13]=r[13],e[14]=r[14],e[15]=r[15],this}copyPosition(t){const e=this.elements,r=t.elements;return e[12]=r[12],e[13]=r[13],e[14]=r[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,r){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(t,e,r){return this.set(t.x,e.x,r.x,0,t.y,e.y,r.y,0,t.z,e.z,r.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,r=t.elements,s=1/Is.setFromMatrixColumn(t,0).length(),l=1/Is.setFromMatrixColumn(t,1).length(),c=1/Is.setFromMatrixColumn(t,2).length();return e[0]=r[0]*s,e[1]=r[1]*s,e[2]=r[2]*s,e[3]=0,e[4]=r[4]*l,e[5]=r[5]*l,e[6]=r[6]*l,e[7]=0,e[8]=r[8]*c,e[9]=r[9]*c,e[10]=r[10]*c,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,r=t.x,s=t.y,l=t.z,c=Math.cos(r),f=Math.sin(r),d=Math.cos(s),h=Math.sin(s),m=Math.cos(l),g=Math.sin(l);if(t.order==="XYZ"){const v=c*m,y=c*g,b=f*m,R=f*g;e[0]=d*m,e[4]=-d*g,e[8]=h,e[1]=y+b*h,e[5]=v-R*h,e[9]=-f*d,e[2]=R-v*h,e[6]=b+y*h,e[10]=c*d}else if(t.order==="YXZ"){const v=d*m,y=d*g,b=h*m,R=h*g;e[0]=v+R*f,e[4]=b*f-y,e[8]=c*h,e[1]=c*g,e[5]=c*m,e[9]=-f,e[2]=y*f-b,e[6]=R+v*f,e[10]=c*d}else if(t.order==="ZXY"){const v=d*m,y=d*g,b=h*m,R=h*g;e[0]=v-R*f,e[4]=-c*g,e[8]=b+y*f,e[1]=y+b*f,e[5]=c*m,e[9]=R-v*f,e[2]=-c*h,e[6]=f,e[10]=c*d}else if(t.order==="ZYX"){const v=c*m,y=c*g,b=f*m,R=f*g;e[0]=d*m,e[4]=b*h-y,e[8]=v*h+R,e[1]=d*g,e[5]=R*h+v,e[9]=y*h-b,e[2]=-h,e[6]=f*d,e[10]=c*d}else if(t.order==="YZX"){const v=c*d,y=c*h,b=f*d,R=f*h;e[0]=d*m,e[4]=R-v*g,e[8]=b*g+y,e[1]=g,e[5]=c*m,e[9]=-f*m,e[2]=-h*m,e[6]=y*g+b,e[10]=v-R*g}else if(t.order==="XZY"){const v=c*d,y=c*h,b=f*d,R=f*h;e[0]=d*m,e[4]=-g,e[8]=h*m,e[1]=v*g+R,e[5]=c*m,e[9]=y*g-b,e[2]=b*g-y,e[6]=f*m,e[10]=R*g+v}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(n2,t,i2)}lookAt(t,e,r){const s=this.elements;return fi.subVectors(t,e),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),oa.crossVectors(r,fi),oa.lengthSq()===0&&(Math.abs(r.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),oa.crossVectors(r,fi)),oa.normalize(),Ku.crossVectors(fi,oa),s[0]=oa.x,s[4]=Ku.x,s[8]=fi.x,s[1]=oa.y,s[5]=Ku.y,s[9]=fi.y,s[2]=oa.z,s[6]=Ku.z,s[10]=fi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const r=t.elements,s=e.elements,l=this.elements,c=r[0],f=r[4],d=r[8],h=r[12],m=r[1],g=r[5],v=r[9],y=r[13],b=r[2],R=r[6],M=r[10],x=r[14],D=r[3],S=r[7],E=r[11],A=r[15],L=s[0],P=s[4],O=s[8],C=s[12],T=s[1],N=s[5],k=s[9],q=s[13],K=s[2],X=s[6],H=s[10],Z=s[14],J=s[3],vt=s[7],w=s[11],Y=s[15];return l[0]=c*L+f*T+d*K+h*J,l[4]=c*P+f*N+d*X+h*vt,l[8]=c*O+f*k+d*H+h*w,l[12]=c*C+f*q+d*Z+h*Y,l[1]=m*L+g*T+v*K+y*J,l[5]=m*P+g*N+v*X+y*vt,l[9]=m*O+g*k+v*H+y*w,l[13]=m*C+g*q+v*Z+y*Y,l[2]=b*L+R*T+M*K+x*J,l[6]=b*P+R*N+M*X+x*vt,l[10]=b*O+R*k+M*H+x*w,l[14]=b*C+R*q+M*Z+x*Y,l[3]=D*L+S*T+E*K+A*J,l[7]=D*P+S*N+E*X+A*vt,l[11]=D*O+S*k+E*H+A*w,l[15]=D*C+S*q+E*Z+A*Y,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],r=t[4],s=t[8],l=t[12],c=t[1],f=t[5],d=t[9],h=t[13],m=t[2],g=t[6],v=t[10],y=t[14],b=t[3],R=t[7],M=t[11],x=t[15];return b*(+l*d*g-s*h*g-l*f*v+r*h*v+s*f*y-r*d*y)+R*(+e*d*y-e*h*v+l*c*v-s*c*y+s*h*m-l*d*m)+M*(+e*h*g-e*f*y-l*c*g+r*c*y+l*f*m-r*h*m)+x*(-s*f*m-e*d*g+e*f*v+s*c*g-r*c*v+r*d*m)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,r){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=r),this}invert(){const t=this.elements,e=t[0],r=t[1],s=t[2],l=t[3],c=t[4],f=t[5],d=t[6],h=t[7],m=t[8],g=t[9],v=t[10],y=t[11],b=t[12],R=t[13],M=t[14],x=t[15],D=g*M*h-R*v*h+R*d*y-f*M*y-g*d*x+f*v*x,S=b*v*h-m*M*h-b*d*y+c*M*y+m*d*x-c*v*x,E=m*R*h-b*g*h+b*f*y-c*R*y-m*f*x+c*g*x,A=b*g*d-m*R*d-b*f*v+c*R*v+m*f*M-c*g*M,L=e*D+r*S+s*E+l*A;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/L;return t[0]=D*P,t[1]=(R*v*l-g*M*l-R*s*y+r*M*y+g*s*x-r*v*x)*P,t[2]=(f*M*l-R*d*l+R*s*h-r*M*h-f*s*x+r*d*x)*P,t[3]=(g*d*l-f*v*l-g*s*h+r*v*h+f*s*y-r*d*y)*P,t[4]=S*P,t[5]=(m*M*l-b*v*l+b*s*y-e*M*y-m*s*x+e*v*x)*P,t[6]=(b*d*l-c*M*l-b*s*h+e*M*h+c*s*x-e*d*x)*P,t[7]=(c*v*l-m*d*l+m*s*h-e*v*h-c*s*y+e*d*y)*P,t[8]=E*P,t[9]=(b*g*l-m*R*l-b*r*y+e*R*y+m*r*x-e*g*x)*P,t[10]=(c*R*l-b*f*l+b*r*h-e*R*h-c*r*x+e*f*x)*P,t[11]=(m*f*l-c*g*l-m*r*h+e*g*h+c*r*y-e*f*y)*P,t[12]=A*P,t[13]=(m*R*s-b*g*s+b*r*v-e*R*v-m*r*M+e*g*M)*P,t[14]=(b*f*s-c*R*s-b*r*d+e*R*d+c*r*M-e*f*M)*P,t[15]=(c*g*s-m*f*s+m*r*d-e*g*d-c*r*v+e*f*v)*P,this}scale(t){const e=this.elements,r=t.x,s=t.y,l=t.z;return e[0]*=r,e[4]*=s,e[8]*=l,e[1]*=r,e[5]*=s,e[9]*=l,e[2]*=r,e[6]*=s,e[10]*=l,e[3]*=r,e[7]*=s,e[11]*=l,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,r,s))}makeTranslation(t,e,r){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,r,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,e,-r,0,0,r,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),r=Math.sin(t);return this.set(e,0,r,0,0,1,0,0,-r,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),r=Math.sin(t);return this.set(e,-r,0,0,r,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const r=Math.cos(e),s=Math.sin(e),l=1-r,c=t.x,f=t.y,d=t.z,h=l*c,m=l*f;return this.set(h*c+r,h*f-s*d,h*d+s*f,0,h*f+s*d,m*f+r,m*d-s*c,0,h*d-s*f,m*d+s*c,l*d*d+r,0,0,0,0,1),this}makeScale(t,e,r){return this.set(t,0,0,0,0,e,0,0,0,0,r,0,0,0,0,1),this}makeShear(t,e,r,s,l,c){return this.set(1,r,l,0,t,1,c,0,e,s,1,0,0,0,0,1),this}compose(t,e,r){const s=this.elements,l=e._x,c=e._y,f=e._z,d=e._w,h=l+l,m=c+c,g=f+f,v=l*h,y=l*m,b=l*g,R=c*m,M=c*g,x=f*g,D=d*h,S=d*m,E=d*g,A=r.x,L=r.y,P=r.z;return s[0]=(1-(R+x))*A,s[1]=(y+E)*A,s[2]=(b-S)*A,s[3]=0,s[4]=(y-E)*L,s[5]=(1-(v+x))*L,s[6]=(M+D)*L,s[7]=0,s[8]=(b+S)*P,s[9]=(M-D)*P,s[10]=(1-(v+R))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,r){const s=this.elements;let l=Is.set(s[0],s[1],s[2]).length();const c=Is.set(s[4],s[5],s[6]).length(),f=Is.set(s[8],s[9],s[10]).length();this.determinant()<0&&(l=-l),t.x=s[12],t.y=s[13],t.z=s[14],Ni.copy(this);const h=1/l,m=1/c,g=1/f;return Ni.elements[0]*=h,Ni.elements[1]*=h,Ni.elements[2]*=h,Ni.elements[4]*=m,Ni.elements[5]*=m,Ni.elements[6]*=m,Ni.elements[8]*=g,Ni.elements[9]*=g,Ni.elements[10]*=g,e.setFromRotationMatrix(Ni),r.x=l,r.y=c,r.z=f,this}makePerspective(t,e,r,s,l,c,f=Ar){const d=this.elements,h=2*l/(e-t),m=2*l/(r-s),g=(e+t)/(e-t),v=(r+s)/(r-s);let y,b;if(f===Ar)y=-(c+l)/(c-l),b=-2*c*l/(c-l);else if(f===Dc)y=-c/(c-l),b=-c*l/(c-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+f);return d[0]=h,d[4]=0,d[8]=g,d[12]=0,d[1]=0,d[5]=m,d[9]=v,d[13]=0,d[2]=0,d[6]=0,d[10]=y,d[14]=b,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(t,e,r,s,l,c,f=Ar){const d=this.elements,h=1/(e-t),m=1/(r-s),g=1/(c-l),v=(e+t)*h,y=(r+s)*m;let b,R;if(f===Ar)b=(c+l)*g,R=-2*g;else if(f===Dc)b=l*g,R=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+f);return d[0]=2*h,d[4]=0,d[8]=0,d[12]=-v,d[1]=0,d[5]=2*m,d[9]=0,d[13]=-y,d[2]=0,d[6]=0,d[10]=R,d[14]=-b,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(t){const e=this.elements,r=t.elements;for(let s=0;s<16;s++)if(e[s]!==r[s])return!1;return!0}fromArray(t,e=0){for(let r=0;r<16;r++)this.elements[r]=t[r+e];return this}toArray(t=[],e=0){const r=this.elements;return t[e]=r[0],t[e+1]=r[1],t[e+2]=r[2],t[e+3]=r[3],t[e+4]=r[4],t[e+5]=r[5],t[e+6]=r[6],t[e+7]=r[7],t[e+8]=r[8],t[e+9]=r[9],t[e+10]=r[10],t[e+11]=r[11],t[e+12]=r[12],t[e+13]=r[13],t[e+14]=r[14],t[e+15]=r[15],t}}const Is=new ot,Ni=new un,n2=new ot(0,0,0),i2=new ot(1,1,1),oa=new ot,Ku=new ot,fi=new ot,by=new un,Ty=new Cr;class Ji{constructor(t=0,e=0,r=0,s=Ji.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=r,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,r,s=this._order){return this._x=t,this._y=e,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,r=!0){const s=t.elements,l=s[0],c=s[4],f=s[8],d=s[1],h=s[5],m=s[9],g=s[2],v=s[6],y=s[10];switch(e){case"XYZ":this._y=Math.asin(Se(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-m,y),this._z=Math.atan2(-c,l)):(this._x=Math.atan2(v,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Se(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(f,y),this._z=Math.atan2(d,h)):(this._y=Math.atan2(-g,l),this._z=0);break;case"ZXY":this._x=Math.asin(Se(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-g,y),this._z=Math.atan2(-c,h)):(this._y=0,this._z=Math.atan2(d,l));break;case"ZYX":this._y=Math.asin(-Se(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(v,y),this._z=Math.atan2(d,l)):(this._x=0,this._z=Math.atan2(-c,h));break;case"YZX":this._z=Math.asin(Se(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-m,h),this._y=Math.atan2(-g,l)):(this._x=0,this._y=Math.atan2(f,y));break;case"XZY":this._z=Math.asin(-Se(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(v,h),this._y=Math.atan2(f,l)):(this._x=Math.atan2(-m,y),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,r){return by.makeRotationFromQuaternion(t),this.setFromRotationMatrix(by,e,r)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ty.setFromEuler(this),this.setFromQuaternion(Ty,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ji.DEFAULT_ORDER="XYZ";class KS{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let r2=0;const Ay=new ot,Fs=new Cr,Sr=new un,Qu=new ot,ll=new ot,a2=new ot,s2=new Cr,Ry=new ot(1,0,0),wy=new ot(0,1,0),Cy=new ot(0,0,1),Dy={type:"added"},o2={type:"removed"},Bs={type:"childadded",child:null},Sd={type:"childremoved",child:null};class Cn extends Ja{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:r2++}),this.uuid=ma(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Cn.DEFAULT_UP.clone();const t=new ot,e=new Ji,r=new Cr,s=new ot(1,1,1);function l(){r.setFromEuler(e,!1)}function c(){e.setFromQuaternion(r,void 0,!1)}e._onChange(l),r._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new un},normalMatrix:{value:new fe}}),this.matrix=new un,this.matrixWorld=new un,this.matrixAutoUpdate=Cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new KS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Fs.setFromAxisAngle(t,e),this.quaternion.multiply(Fs),this}rotateOnWorldAxis(t,e){return Fs.setFromAxisAngle(t,e),this.quaternion.premultiply(Fs),this}rotateX(t){return this.rotateOnAxis(Ry,t)}rotateY(t){return this.rotateOnAxis(wy,t)}rotateZ(t){return this.rotateOnAxis(Cy,t)}translateOnAxis(t,e){return Ay.copy(t).applyQuaternion(this.quaternion),this.position.add(Ay.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ry,t)}translateY(t){return this.translateOnAxis(wy,t)}translateZ(t){return this.translateOnAxis(Cy,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Sr.copy(this.matrixWorld).invert())}lookAt(t,e,r){t.isVector3?Qu.copy(t):Qu.set(t,e,r);const s=this.parent;this.updateWorldMatrix(!0,!1),ll.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sr.lookAt(ll,Qu,this.up):Sr.lookAt(Qu,ll,this.up),this.quaternion.setFromRotationMatrix(Sr),s&&(Sr.extractRotation(s.matrixWorld),Fs.setFromRotationMatrix(Sr),this.quaternion.premultiply(Fs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Dy),Bs.child=t,this.dispatchEvent(Bs),Bs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(o2),Sd.child=t,this.dispatchEvent(Sd),Sd.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Sr.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Sr.multiply(t.parent.matrixWorld)),t.applyMatrix4(Sr),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Dy),Bs.child=t,this.dispatchEvent(Bs),Bs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let r=0,s=this.children.length;r<s;r++){const c=this.children[r].getObjectByProperty(t,e);if(c!==void 0)return c}}getObjectsByProperty(t,e,r=[]){this[t]===e&&r.push(this);const s=this.children;for(let l=0,c=s.length;l<c;l++)s[l].getObjectsByProperty(t,e,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ll,t,a2),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ll,s2,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let r=0,s=e.length;r<s;r++)e[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let r=0,s=e.length;r<s;r++)e[r].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let r=0,s=e.length;r<s;r++)e[r].updateMatrixWorld(t)}updateWorldMatrix(t,e){const r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let l=0,c=s.length;l<c;l++)s[l].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",r={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(f=>({boxInitialized:f.boxInitialized,boxMin:f.box.min.toArray(),boxMax:f.box.max.toArray(),sphereInitialized:f.sphereInitialized,sphereRadius:f.sphere.radius,sphereCenter:f.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function l(f,d){return f[d.uuid]===void 0&&(f[d.uuid]=d.toJSON(t)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=l(t.geometries,this.geometry);const f=this.geometry.parameters;if(f!==void 0&&f.shapes!==void 0){const d=f.shapes;if(Array.isArray(d))for(let h=0,m=d.length;h<m;h++){const g=d[h];l(t.shapes,g)}else l(t.shapes,d)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const f=[];for(let d=0,h=this.material.length;d<h;d++)f.push(l(t.materials,this.material[d]));s.material=f}else s.material=l(t.materials,this.material);if(this.children.length>0){s.children=[];for(let f=0;f<this.children.length;f++)s.children.push(this.children[f].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let f=0;f<this.animations.length;f++){const d=this.animations[f];s.animations.push(l(t.animations,d))}}if(e){const f=c(t.geometries),d=c(t.materials),h=c(t.textures),m=c(t.images),g=c(t.shapes),v=c(t.skeletons),y=c(t.animations),b=c(t.nodes);f.length>0&&(r.geometries=f),d.length>0&&(r.materials=d),h.length>0&&(r.textures=h),m.length>0&&(r.images=m),g.length>0&&(r.shapes=g),v.length>0&&(r.skeletons=v),y.length>0&&(r.animations=y),b.length>0&&(r.nodes=b)}return r.object=s,r;function c(f){const d=[];for(const h in f){const m=f[h];delete m.metadata,d.push(m)}return d}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let r=0;r<t.children.length;r++){const s=t.children[r];this.add(s.clone())}return this}}Cn.DEFAULT_UP=new ot(0,1,0);Cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pi=new ot,Mr=new ot,Md=new ot,Er=new ot,ks=new ot,Hs=new ot,Ly=new ot,Ed=new ot,bd=new ot,Td=new ot,Ad=new ln,Rd=new ln,wd=new ln;class Oi{constructor(t=new ot,e=new ot,r=new ot){this.a=t,this.b=e,this.c=r}static getNormal(t,e,r,s){s.subVectors(r,e),Pi.subVectors(t,e),s.cross(Pi);const l=s.lengthSq();return l>0?s.multiplyScalar(1/Math.sqrt(l)):s.set(0,0,0)}static getBarycoord(t,e,r,s,l){Pi.subVectors(s,e),Mr.subVectors(r,e),Md.subVectors(t,e);const c=Pi.dot(Pi),f=Pi.dot(Mr),d=Pi.dot(Md),h=Mr.dot(Mr),m=Mr.dot(Md),g=c*h-f*f;if(g===0)return l.set(0,0,0),null;const v=1/g,y=(h*d-f*m)*v,b=(c*m-f*d)*v;return l.set(1-y-b,b,y)}static containsPoint(t,e,r,s){return this.getBarycoord(t,e,r,s,Er)===null?!1:Er.x>=0&&Er.y>=0&&Er.x+Er.y<=1}static getInterpolation(t,e,r,s,l,c,f,d){return this.getBarycoord(t,e,r,s,Er)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(l,Er.x),d.addScaledVector(c,Er.y),d.addScaledVector(f,Er.z),d)}static getInterpolatedAttribute(t,e,r,s,l,c){return Ad.setScalar(0),Rd.setScalar(0),wd.setScalar(0),Ad.fromBufferAttribute(t,e),Rd.fromBufferAttribute(t,r),wd.fromBufferAttribute(t,s),c.setScalar(0),c.addScaledVector(Ad,l.x),c.addScaledVector(Rd,l.y),c.addScaledVector(wd,l.z),c}static isFrontFacing(t,e,r,s){return Pi.subVectors(r,e),Mr.subVectors(t,e),Pi.cross(Mr).dot(s)<0}set(t,e,r){return this.a.copy(t),this.b.copy(e),this.c.copy(r),this}setFromPointsAndIndices(t,e,r,s){return this.a.copy(t[e]),this.b.copy(t[r]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,r,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,r),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pi.subVectors(this.c,this.b),Mr.subVectors(this.a,this.b),Pi.cross(Mr).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Oi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Oi.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,r,s,l){return Oi.getInterpolation(t,this.a,this.b,this.c,e,r,s,l)}containsPoint(t){return Oi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Oi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const r=this.a,s=this.b,l=this.c;let c,f;ks.subVectors(s,r),Hs.subVectors(l,r),Ed.subVectors(t,r);const d=ks.dot(Ed),h=Hs.dot(Ed);if(d<=0&&h<=0)return e.copy(r);bd.subVectors(t,s);const m=ks.dot(bd),g=Hs.dot(bd);if(m>=0&&g<=m)return e.copy(s);const v=d*g-m*h;if(v<=0&&d>=0&&m<=0)return c=d/(d-m),e.copy(r).addScaledVector(ks,c);Td.subVectors(t,l);const y=ks.dot(Td),b=Hs.dot(Td);if(b>=0&&y<=b)return e.copy(l);const R=y*h-d*b;if(R<=0&&h>=0&&b<=0)return f=h/(h-b),e.copy(r).addScaledVector(Hs,f);const M=m*b-y*g;if(M<=0&&g-m>=0&&y-b>=0)return Ly.subVectors(l,s),f=(g-m)/(g-m+(y-b)),e.copy(s).addScaledVector(Ly,f);const x=1/(M+R+v);return c=R*x,f=v*x,e.copy(r).addScaledVector(ks,c).addScaledVector(Hs,f)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const QS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},la={h:0,s:0,l:0},Ju={h:0,s:0,l:0};function Cd(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class De{constructor(t,e,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,r)}set(t,e,r){if(e===void 0&&r===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,r);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ti){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ce.toWorkingColorSpace(this,e),this}setRGB(t,e,r,s=Ce.workingColorSpace){return this.r=t,this.g=e,this.b=r,Ce.toWorkingColorSpace(this,s),this}setHSL(t,e,r,s=Ce.workingColorSpace){if(t=GC(t,1),e=Se(e,0,1),r=Se(r,0,1),e===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+e):r+e-r*e,c=2*r-l;this.r=Cd(c,l,t+1/3),this.g=Cd(c,l,t),this.b=Cd(c,l,t-1/3)}return Ce.toWorkingColorSpace(this,s),this}setStyle(t,e=Ti){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let l;const c=s[1],f=s[2];switch(c){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,e);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,e);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const l=s[1],c=l.length;if(c===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,e);if(c===6)return this.setHex(parseInt(l,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ti){const r=QS[t.toLowerCase()];return r!==void 0?this.setHex(r,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Rr(t.r),this.g=Rr(t.g),this.b=Rr(t.b),this}copyLinearToSRGB(t){return this.r=to(t.r),this.g=to(t.g),this.b=to(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ti){return Ce.fromWorkingColorSpace(Hn.copy(this),t),Math.round(Se(Hn.r*255,0,255))*65536+Math.round(Se(Hn.g*255,0,255))*256+Math.round(Se(Hn.b*255,0,255))}getHexString(t=Ti){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Ce.workingColorSpace){Ce.fromWorkingColorSpace(Hn.copy(this),e);const r=Hn.r,s=Hn.g,l=Hn.b,c=Math.max(r,s,l),f=Math.min(r,s,l);let d,h;const m=(f+c)/2;if(f===c)d=0,h=0;else{const g=c-f;switch(h=m<=.5?g/(c+f):g/(2-c-f),c){case r:d=(s-l)/g+(s<l?6:0);break;case s:d=(l-r)/g+2;break;case l:d=(r-s)/g+4;break}d/=6}return t.h=d,t.s=h,t.l=m,t}getRGB(t,e=Ce.workingColorSpace){return Ce.fromWorkingColorSpace(Hn.copy(this),e),t.r=Hn.r,t.g=Hn.g,t.b=Hn.b,t}getStyle(t=Ti){Ce.fromWorkingColorSpace(Hn.copy(this),t);const e=Hn.r,r=Hn.g,s=Hn.b;return t!==Ti?`color(${t} ${e.toFixed(3)} ${r.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(r*255)},${Math.round(s*255)})`}offsetHSL(t,e,r){return this.getHSL(la),this.setHSL(la.h+t,la.s+e,la.l+r)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,r){return this.r=t.r+(e.r-t.r)*r,this.g=t.g+(e.g-t.g)*r,this.b=t.b+(e.b-t.b)*r,this}lerpHSL(t,e){this.getHSL(la),t.getHSL(Ju);const r=hd(la.h,Ju.h,e),s=hd(la.s,Ju.s,e),l=hd(la.l,Ju.l,e);return this.setHSL(r,s,l),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,r=this.g,s=this.b,l=t.elements;return this.r=l[0]*e+l[3]*r+l[6]*s,this.g=l[1]*e+l[4]*r+l[7]*s,this.b=l[2]*e+l[5]*r+l[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Hn=new De;De.NAMES=QS;let l2=0;class lo extends Ja{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:l2++}),this.uuid=ma(),this.name="",this.type="Material",this.blending=$s,this.side=ga,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bp,this.blendDst=Tp,this.blendEquation=qa,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=eo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vy,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Us,this.stencilZFail=Us,this.stencilZPass=Us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const r=t[e];if(r===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(r):s&&s.isVector3&&r&&r.isVector3?s.copy(r):this[e]=r}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(t).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(t).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(t).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(t).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(t).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==$s&&(r.blending=this.blending),this.side!==ga&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==bp&&(r.blendSrc=this.blendSrc),this.blendDst!==Tp&&(r.blendDst=this.blendDst),this.blendEquation!==qa&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==eo&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vy&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Us&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Us&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Us&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function s(l){const c=[];for(const f in l){const d=l[f];delete d.metadata,c.push(d)}return c}if(e){const l=s(t.textures),c=s(t.images);l.length>0&&(r.textures=l),c.length>0&&(r.images=c)}return r}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let r=null;if(e!==null){const s=e.length;r=new Array(s);for(let l=0;l!==s;++l)r[l]=e[l].clone()}return this.clippingPlanes=r,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class JS extends lo{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ji,this.combine=PS,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pn=new ot,$u=new me;let u2=0;class gi{constructor(t,e,r=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:u2++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=r,this.usage=lm,this.updateRanges=[],this.gpuType=Tr,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,r){t*=this.itemSize,r*=e.itemSize;for(let s=0,l=this.itemSize;s<l;s++)this.array[t+s]=e.array[r+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,r=this.count;e<r;e++)$u.fromBufferAttribute(this,e),$u.applyMatrix3(t),this.setXY(e,$u.x,$u.y);else if(this.itemSize===3)for(let e=0,r=this.count;e<r;e++)pn.fromBufferAttribute(this,e),pn.applyMatrix3(t),this.setXYZ(e,pn.x,pn.y,pn.z);return this}applyMatrix4(t){for(let e=0,r=this.count;e<r;e++)pn.fromBufferAttribute(this,e),pn.applyMatrix4(t),this.setXYZ(e,pn.x,pn.y,pn.z);return this}applyNormalMatrix(t){for(let e=0,r=this.count;e<r;e++)pn.fromBufferAttribute(this,e),pn.applyNormalMatrix(t),this.setXYZ(e,pn.x,pn.y,pn.z);return this}transformDirection(t){for(let e=0,r=this.count;e<r;e++)pn.fromBufferAttribute(this,e),pn.transformDirection(t),this.setXYZ(e,pn.x,pn.y,pn.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let r=this.array[t*this.itemSize+e];return this.normalized&&(r=Yi(r,this.array)),r}setComponent(t,e,r){return this.normalized&&(r=Ge(r,this.array)),this.array[t*this.itemSize+e]=r,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Yi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Yi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Yi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Yi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,r){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),r=Ge(r,this.array)),this.array[t+0]=e,this.array[t+1]=r,this}setXYZ(t,e,r,s){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),r=Ge(r,this.array),s=Ge(s,this.array)),this.array[t+0]=e,this.array[t+1]=r,this.array[t+2]=s,this}setXYZW(t,e,r,s,l){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),r=Ge(r,this.array),s=Ge(s,this.array),l=Ge(l,this.array)),this.array[t+0]=e,this.array[t+1]=r,this.array[t+2]=s,this.array[t+3]=l,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==lm&&(t.usage=this.usage),t}}class $S extends gi{constructor(t,e,r){super(new Uint16Array(t),e,r)}}class tM extends gi{constructor(t,e,r){super(new Uint32Array(t),e,r)}}class Ya extends gi{constructor(t,e,r){super(new Float32Array(t),e,r)}}let c2=0;const bi=new un,Dd=new Cn,Vs=new ot,hi=new Rl,ul=new Rl,wn=new ot;class $i extends Ja{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:c2++}),this.uuid=ma(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(YS(t)?tM:$S)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,r=0){this.groups.push({start:t,count:e,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new fe().getNormalMatrix(t);r.applyNormalMatrix(l),r.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return bi.makeRotationFromQuaternion(t),this.applyMatrix4(bi),this}rotateX(t){return bi.makeRotationX(t),this.applyMatrix4(bi),this}rotateY(t){return bi.makeRotationY(t),this.applyMatrix4(bi),this}rotateZ(t){return bi.makeRotationZ(t),this.applyMatrix4(bi),this}translate(t,e,r){return bi.makeTranslation(t,e,r),this.applyMatrix4(bi),this}scale(t,e,r){return bi.makeScale(t,e,r),this.applyMatrix4(bi),this}lookAt(t){return Dd.lookAt(t),Dd.updateMatrix(),this.applyMatrix4(Dd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const r=[];for(let s=0,l=t.length;s<l;s++){const c=t[s];r.push(c.x,c.y,c.z||0)}this.setAttribute("position",new Ya(r,3))}else{const r=Math.min(t.length,e.count);for(let s=0;s<r;s++){const l=t[s];e.setXYZ(s,l.x,l.y,l.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rl);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ot(-1/0,-1/0,-1/0),new ot(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let r=0,s=e.length;r<s;r++){const l=e[r];hi.setFromBufferAttribute(l),this.morphTargetsRelative?(wn.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(wn),wn.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(wn)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fc);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ot,1/0);return}if(t){const r=this.boundingSphere.center;if(hi.setFromBufferAttribute(t),e)for(let l=0,c=e.length;l<c;l++){const f=e[l];ul.setFromBufferAttribute(f),this.morphTargetsRelative?(wn.addVectors(hi.min,ul.min),hi.expandByPoint(wn),wn.addVectors(hi.max,ul.max),hi.expandByPoint(wn)):(hi.expandByPoint(ul.min),hi.expandByPoint(ul.max))}hi.getCenter(r);let s=0;for(let l=0,c=t.count;l<c;l++)wn.fromBufferAttribute(t,l),s=Math.max(s,r.distanceToSquared(wn));if(e)for(let l=0,c=e.length;l<c;l++){const f=e[l],d=this.morphTargetsRelative;for(let h=0,m=f.count;h<m;h++)wn.fromBufferAttribute(f,h),d&&(Vs.fromBufferAttribute(t,h),wn.add(Vs)),s=Math.max(s,r.distanceToSquared(wn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=e.position,s=e.normal,l=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gi(new Float32Array(4*r.count),4));const c=this.getAttribute("tangent"),f=[],d=[];for(let O=0;O<r.count;O++)f[O]=new ot,d[O]=new ot;const h=new ot,m=new ot,g=new ot,v=new me,y=new me,b=new me,R=new ot,M=new ot;function x(O,C,T){h.fromBufferAttribute(r,O),m.fromBufferAttribute(r,C),g.fromBufferAttribute(r,T),v.fromBufferAttribute(l,O),y.fromBufferAttribute(l,C),b.fromBufferAttribute(l,T),m.sub(h),g.sub(h),y.sub(v),b.sub(v);const N=1/(y.x*b.y-b.x*y.y);isFinite(N)&&(R.copy(m).multiplyScalar(b.y).addScaledVector(g,-y.y).multiplyScalar(N),M.copy(g).multiplyScalar(y.x).addScaledVector(m,-b.x).multiplyScalar(N),f[O].add(R),f[C].add(R),f[T].add(R),d[O].add(M),d[C].add(M),d[T].add(M))}let D=this.groups;D.length===0&&(D=[{start:0,count:t.count}]);for(let O=0,C=D.length;O<C;++O){const T=D[O],N=T.start,k=T.count;for(let q=N,K=N+k;q<K;q+=3)x(t.getX(q+0),t.getX(q+1),t.getX(q+2))}const S=new ot,E=new ot,A=new ot,L=new ot;function P(O){A.fromBufferAttribute(s,O),L.copy(A);const C=f[O];S.copy(C),S.sub(A.multiplyScalar(A.dot(C))).normalize(),E.crossVectors(L,C);const N=E.dot(d[O])<0?-1:1;c.setXYZW(O,S.x,S.y,S.z,N)}for(let O=0,C=D.length;O<C;++O){const T=D[O],N=T.start,k=T.count;for(let q=N,K=N+k;q<K;q+=3)P(t.getX(q+0)),P(t.getX(q+1)),P(t.getX(q+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new gi(new Float32Array(e.count*3),3),this.setAttribute("normal",r);else for(let v=0,y=r.count;v<y;v++)r.setXYZ(v,0,0,0);const s=new ot,l=new ot,c=new ot,f=new ot,d=new ot,h=new ot,m=new ot,g=new ot;if(t)for(let v=0,y=t.count;v<y;v+=3){const b=t.getX(v+0),R=t.getX(v+1),M=t.getX(v+2);s.fromBufferAttribute(e,b),l.fromBufferAttribute(e,R),c.fromBufferAttribute(e,M),m.subVectors(c,l),g.subVectors(s,l),m.cross(g),f.fromBufferAttribute(r,b),d.fromBufferAttribute(r,R),h.fromBufferAttribute(r,M),f.add(m),d.add(m),h.add(m),r.setXYZ(b,f.x,f.y,f.z),r.setXYZ(R,d.x,d.y,d.z),r.setXYZ(M,h.x,h.y,h.z)}else for(let v=0,y=e.count;v<y;v+=3)s.fromBufferAttribute(e,v+0),l.fromBufferAttribute(e,v+1),c.fromBufferAttribute(e,v+2),m.subVectors(c,l),g.subVectors(s,l),m.cross(g),r.setXYZ(v+0,m.x,m.y,m.z),r.setXYZ(v+1,m.x,m.y,m.z),r.setXYZ(v+2,m.x,m.y,m.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,r=t.count;e<r;e++)wn.fromBufferAttribute(t,e),wn.normalize(),t.setXYZ(e,wn.x,wn.y,wn.z)}toNonIndexed(){function t(f,d){const h=f.array,m=f.itemSize,g=f.normalized,v=new h.constructor(d.length*m);let y=0,b=0;for(let R=0,M=d.length;R<M;R++){f.isInterleavedBufferAttribute?y=d[R]*f.data.stride+f.offset:y=d[R]*m;for(let x=0;x<m;x++)v[b++]=h[y++]}return new gi(v,m,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new $i,r=this.index.array,s=this.attributes;for(const f in s){const d=s[f],h=t(d,r);e.setAttribute(f,h)}const l=this.morphAttributes;for(const f in l){const d=[],h=l[f];for(let m=0,g=h.length;m<g;m++){const v=h[m],y=t(v,r);d.push(y)}e.morphAttributes[f]=d}e.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let f=0,d=c.length;f<d;f++){const h=c[f];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const d=this.parameters;for(const h in d)d[h]!==void 0&&(t[h]=d[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const r=this.attributes;for(const d in r){const h=r[d];t.data.attributes[d]=h.toJSON(t.data)}const s={};let l=!1;for(const d in this.morphAttributes){const h=this.morphAttributes[d],m=[];for(let g=0,v=h.length;g<v;g++){const y=h[g];m.push(y.toJSON(t.data))}m.length>0&&(s[d]=m,l=!0)}l&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(t.data.groups=JSON.parse(JSON.stringify(c)));const f=this.boundingSphere;return f!==null&&(t.data.boundingSphere={center:f.center.toArray(),radius:f.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const r=t.index;r!==null&&this.setIndex(r.clone());const s=t.attributes;for(const h in s){const m=s[h];this.setAttribute(h,m.clone(e))}const l=t.morphAttributes;for(const h in l){const m=[],g=l[h];for(let v=0,y=g.length;v<y;v++)m.push(g[v].clone(e));this.morphAttributes[h]=m}this.morphTargetsRelative=t.morphTargetsRelative;const c=t.groups;for(let h=0,m=c.length;h<m;h++){const g=c[h];this.addGroup(g.start,g.count,g.materialIndex)}const f=t.boundingBox;f!==null&&(this.boundingBox=f.clone());const d=t.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Uy=new un,Ba=new Fm,tc=new Fc,Ny=new ot,ec=new ot,nc=new ot,ic=new ot,Ld=new ot,rc=new ot,Py=new ot,ac=new ot;class Ki extends Cn{constructor(t=new $i,e=new JS){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,r=Object.keys(e);if(r.length>0){const s=e[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,c=s.length;l<c;l++){const f=s[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}getVertexPosition(t,e){const r=this.geometry,s=r.attributes.position,l=r.morphAttributes.position,c=r.morphTargetsRelative;e.fromBufferAttribute(s,t);const f=this.morphTargetInfluences;if(l&&f){rc.set(0,0,0);for(let d=0,h=l.length;d<h;d++){const m=f[d],g=l[d];m!==0&&(Ld.fromBufferAttribute(g,t),c?rc.addScaledVector(Ld,m):rc.addScaledVector(Ld.sub(e),m))}e.add(rc)}return e}raycast(t,e){const r=this.geometry,s=this.material,l=this.matrixWorld;s!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),tc.copy(r.boundingSphere),tc.applyMatrix4(l),Ba.copy(t.ray).recast(t.near),!(tc.containsPoint(Ba.origin)===!1&&(Ba.intersectSphere(tc,Ny)===null||Ba.origin.distanceToSquared(Ny)>(t.far-t.near)**2))&&(Uy.copy(l).invert(),Ba.copy(t.ray).applyMatrix4(Uy),!(r.boundingBox!==null&&Ba.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(t,e,Ba)))}_computeIntersections(t,e,r){let s;const l=this.geometry,c=this.material,f=l.index,d=l.attributes.position,h=l.attributes.uv,m=l.attributes.uv1,g=l.attributes.normal,v=l.groups,y=l.drawRange;if(f!==null)if(Array.isArray(c))for(let b=0,R=v.length;b<R;b++){const M=v[b],x=c[M.materialIndex],D=Math.max(M.start,y.start),S=Math.min(f.count,Math.min(M.start+M.count,y.start+y.count));for(let E=D,A=S;E<A;E+=3){const L=f.getX(E),P=f.getX(E+1),O=f.getX(E+2);s=sc(this,x,t,r,h,m,g,L,P,O),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=M.materialIndex,e.push(s))}}else{const b=Math.max(0,y.start),R=Math.min(f.count,y.start+y.count);for(let M=b,x=R;M<x;M+=3){const D=f.getX(M),S=f.getX(M+1),E=f.getX(M+2);s=sc(this,c,t,r,h,m,g,D,S,E),s&&(s.faceIndex=Math.floor(M/3),e.push(s))}}else if(d!==void 0)if(Array.isArray(c))for(let b=0,R=v.length;b<R;b++){const M=v[b],x=c[M.materialIndex],D=Math.max(M.start,y.start),S=Math.min(d.count,Math.min(M.start+M.count,y.start+y.count));for(let E=D,A=S;E<A;E+=3){const L=E,P=E+1,O=E+2;s=sc(this,x,t,r,h,m,g,L,P,O),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=M.materialIndex,e.push(s))}}else{const b=Math.max(0,y.start),R=Math.min(d.count,y.start+y.count);for(let M=b,x=R;M<x;M+=3){const D=M,S=M+1,E=M+2;s=sc(this,c,t,r,h,m,g,D,S,E),s&&(s.faceIndex=Math.floor(M/3),e.push(s))}}}}function f2(i,t,e,r,s,l,c,f){let d;if(t.side===ni?d=r.intersectTriangle(c,l,s,!0,f):d=r.intersectTriangle(s,l,c,t.side===ga,f),d===null)return null;ac.copy(f),ac.applyMatrix4(i.matrixWorld);const h=e.ray.origin.distanceTo(ac);return h<e.near||h>e.far?null:{distance:h,point:ac.clone(),object:i}}function sc(i,t,e,r,s,l,c,f,d,h){i.getVertexPosition(f,ec),i.getVertexPosition(d,nc),i.getVertexPosition(h,ic);const m=f2(i,t,e,r,ec,nc,ic,Py);if(m){const g=new ot;Oi.getBarycoord(Py,ec,nc,ic,g),s&&(m.uv=Oi.getInterpolatedAttribute(s,f,d,h,g,new me)),l&&(m.uv1=Oi.getInterpolatedAttribute(l,f,d,h,g,new me)),c&&(m.normal=Oi.getInterpolatedAttribute(c,f,d,h,g,new ot),m.normal.dot(r.direction)>0&&m.normal.multiplyScalar(-1));const v={a:f,b:d,c:h,normal:new ot,materialIndex:0};Oi.getNormal(ec,nc,ic,v.normal),m.face=v,m.barycoord=g}return m}class wl extends $i{constructor(t=1,e=1,r=1,s=1,l=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:r,widthSegments:s,heightSegments:l,depthSegments:c};const f=this;s=Math.floor(s),l=Math.floor(l),c=Math.floor(c);const d=[],h=[],m=[],g=[];let v=0,y=0;b("z","y","x",-1,-1,r,e,t,c,l,0),b("z","y","x",1,-1,r,e,-t,c,l,1),b("x","z","y",1,1,t,r,e,s,c,2),b("x","z","y",1,-1,t,r,-e,s,c,3),b("x","y","z",1,-1,t,e,r,s,l,4),b("x","y","z",-1,-1,t,e,-r,s,l,5),this.setIndex(d),this.setAttribute("position",new Ya(h,3)),this.setAttribute("normal",new Ya(m,3)),this.setAttribute("uv",new Ya(g,2));function b(R,M,x,D,S,E,A,L,P,O,C){const T=E/P,N=A/O,k=E/2,q=A/2,K=L/2,X=P+1,H=O+1;let Z=0,J=0;const vt=new ot;for(let w=0;w<H;w++){const Y=w*N-q;for(let ft=0;ft<X;ft++){const B=ft*T-k;vt[R]=B*D,vt[M]=Y*S,vt[x]=K,h.push(vt.x,vt.y,vt.z),vt[R]=0,vt[M]=0,vt[x]=L>0?1:-1,m.push(vt.x,vt.y,vt.z),g.push(ft/P),g.push(1-w/O),Z+=1}}for(let w=0;w<O;w++)for(let Y=0;Y<P;Y++){const ft=v+Y+X*w,B=v+Y+X*(w+1),tt=v+(Y+1)+X*(w+1),pt=v+(Y+1)+X*w;d.push(ft,B,pt),d.push(B,tt,pt),J+=6}f.addGroup(y,J,C),y+=J,v+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ao(i){const t={};for(const e in i){t[e]={};for(const r in i[e]){const s=i[e][r];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][r]=null):t[e][r]=s.clone():Array.isArray(s)?t[e][r]=s.slice():t[e][r]=s}}return t}function Wn(i){const t={};for(let e=0;e<i.length;e++){const r=ao(i[e]);for(const s in r)t[s]=r[s]}return t}function h2(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function eM(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ce.workingColorSpace}const d2={clone:ao,merge:Wn};var p2=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,m2=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dr extends lo{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=p2,this.fragmentShader=m2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ao(t.uniforms),this.uniformsGroups=h2(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const c=this.uniforms[s].value;c&&c.isTexture?e.uniforms[s]={type:"t",value:c.toJSON(t).uuid}:c&&c.isColor?e.uniforms[s]={type:"c",value:c.getHex()}:c&&c.isVector2?e.uniforms[s]={type:"v2",value:c.toArray()}:c&&c.isVector3?e.uniforms[s]={type:"v3",value:c.toArray()}:c&&c.isVector4?e.uniforms[s]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?e.uniforms[s]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?e.uniforms[s]={type:"m4",value:c.toArray()}:e.uniforms[s]={value:c}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const r={};for(const s in this.extensions)this.extensions[s]===!0&&(r[s]=!0);return Object.keys(r).length>0&&(e.extensions=r),e}}class nM extends Cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new un,this.projectionMatrix=new un,this.projectionMatrixInverse=new un,this.coordinateSystem=Ar}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ua=new ot,Oy=new me,zy=new me;class Ri extends nM{constructor(t=50,e=1,r=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=r,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=cm*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Sc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return cm*2*Math.atan(Math.tan(Sc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,r){ua.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ua.x,ua.y).multiplyScalar(-t/ua.z),ua.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(ua.x,ua.y).multiplyScalar(-t/ua.z)}getViewSize(t,e){return this.getViewBounds(t,Oy,zy),e.subVectors(zy,Oy)}setViewOffset(t,e,r,s,l,c){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=r,this.view.offsetY=s,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Sc*.5*this.fov)/this.zoom,r=2*e,s=this.aspect*r,l=-.5*s;const c=this.view;if(this.view!==null&&this.view.enabled){const d=c.fullWidth,h=c.fullHeight;l+=c.offsetX*s/d,e-=c.offsetY*r/h,s*=c.width/d,r*=c.height/h}const f=this.filmOffset;f!==0&&(l+=t*f/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+s,e,e-r,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Gs=-90,qs=1;class g2 extends Cn{constructor(t,e,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ri(Gs,qs,t,e);s.layers=this.layers,this.add(s);const l=new Ri(Gs,qs,t,e);l.layers=this.layers,this.add(l);const c=new Ri(Gs,qs,t,e);c.layers=this.layers,this.add(c);const f=new Ri(Gs,qs,t,e);f.layers=this.layers,this.add(f);const d=new Ri(Gs,qs,t,e);d.layers=this.layers,this.add(d);const h=new Ri(Gs,qs,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[r,s,l,c,f,d]=e;for(const h of e)this.remove(h);if(t===Ar)r.up.set(0,1,0),r.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),f.up.set(0,1,0),f.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(t===Dc)r.up.set(0,-1,0),r.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),f.up.set(0,-1,0),f.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[l,c,f,d,h,m]=this.children,g=t.getRenderTarget(),v=t.getActiveCubeFace(),y=t.getActiveMipmapLevel(),b=t.xr.enabled;t.xr.enabled=!1;const R=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,t.setRenderTarget(r,0,s),t.render(e,l),t.setRenderTarget(r,1,s),t.render(e,c),t.setRenderTarget(r,2,s),t.render(e,f),t.setRenderTarget(r,3,s),t.render(e,d),t.setRenderTarget(r,4,s),t.render(e,h),r.texture.generateMipmaps=R,t.setRenderTarget(r,5,s),t.render(e,m),t.setRenderTarget(g,v,y),t.xr.enabled=b,r.texture.needsPMREMUpdate=!0}}class iM extends jn{constructor(t=[],e=no,r,s,l,c,f,d,h,m){super(t,e,r,s,l,c,f,d,h,m),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class _2 extends Ka{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const r={width:t,height:t,depth:1},s=[r,r,r,r,r,r];this.texture=new iM(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Zi}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new wl(5,5,5),l=new Dr({name:"CubemapFromEquirect",uniforms:ao(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:ni,blending:da});l.uniforms.tEquirect.value=e;const c=new Ki(s,l),f=e.minFilter;return e.minFilter===ja&&(e.minFilter=Zi),new g2(1,10,this).update(t,c),e.minFilter=f,c.geometry.dispose(),c.material.dispose(),this}clear(t,e=!0,r=!0,s=!0){const l=t.getRenderTarget();for(let c=0;c<6;c++)t.setRenderTarget(this,c),t.clear(e,r,s);t.setRenderTarget(l)}}class oc extends Cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const v2={type:"move"};class Ud{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new oc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new oc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ot,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ot),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new oc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ot,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ot),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const r of t.hand.values())this._getHandJoint(e,r)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,r){let s=null,l=null,c=null;const f=this._targetRay,d=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){c=!0;for(const R of t.hand.values()){const M=e.getJointPose(R,r),x=this._getHandJoint(h,R);M!==null&&(x.matrix.fromArray(M.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=M.radius),x.visible=M!==null}const m=h.joints["index-finger-tip"],g=h.joints["thumb-tip"],v=m.position.distanceTo(g.position),y=.02,b=.005;h.inputState.pinching&&v>y+b?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&v<=y-b&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else d!==null&&t.gripSpace&&(l=e.getPose(t.gripSpace,r),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1));f!==null&&(s=e.getPose(t.targetRaySpace,r),s===null&&l!==null&&(s=l),s!==null&&(f.matrix.fromArray(s.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,s.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(s.linearVelocity)):f.hasLinearVelocity=!1,s.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(s.angularVelocity)):f.hasAngularVelocity=!1,this.dispatchEvent(v2)))}return f!==null&&(f.visible=s!==null),d!==null&&(d.visible=l!==null),h!==null&&(h.visible=c!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const r=new oc;r.matrixAutoUpdate=!1,r.visible=!1,t.joints[e.jointName]=r,t.add(r)}return t.joints[e.jointName]}}class y2 extends Cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ji,this.environmentIntensity=1,this.environmentRotation=new Ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class x2{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=lm,this.updateRanges=[],this.version=0,this.uuid=ma()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,r){t*=this.stride,r*=e.stride;for(let s=0,l=this.stride;s<l;s++)this.array[t+s]=e.array[r+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ma()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),r=new this.constructor(e,this.stride);return r.setUsage(this.usage),r}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ma()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const qn=new ot;class Lc{constructor(t,e,r,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=r,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,r=this.data.count;e<r;e++)qn.fromBufferAttribute(this,e),qn.applyMatrix4(t),this.setXYZ(e,qn.x,qn.y,qn.z);return this}applyNormalMatrix(t){for(let e=0,r=this.count;e<r;e++)qn.fromBufferAttribute(this,e),qn.applyNormalMatrix(t),this.setXYZ(e,qn.x,qn.y,qn.z);return this}transformDirection(t){for(let e=0,r=this.count;e<r;e++)qn.fromBufferAttribute(this,e),qn.transformDirection(t),this.setXYZ(e,qn.x,qn.y,qn.z);return this}getComponent(t,e){let r=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(r=Yi(r,this.array)),r}setComponent(t,e,r){return this.normalized&&(r=Ge(r,this.array)),this.data.array[t*this.data.stride+this.offset+e]=r,this}setX(t,e){return this.normalized&&(e=Ge(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Yi(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Yi(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Yi(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Yi(e,this.array)),e}setXY(t,e,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ge(e,this.array),r=Ge(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=r,this}setXYZ(t,e,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ge(e,this.array),r=Ge(r,this.array),s=Ge(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=r,this.data.array[t+2]=s,this}setXYZW(t,e,r,s,l){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ge(e,this.array),r=Ge(r,this.array),s=Ge(s,this.array),l=Ge(l,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=r,this.data.array[t+2]=s,this.data.array[t+3]=l,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let r=0;r<this.count;r++){const s=r*this.data.stride+this.offset;for(let l=0;l<this.itemSize;l++)e.push(this.data.array[s+l])}return new gi(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Lc(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let r=0;r<this.count;r++){const s=r*this.data.stride+this.offset;for(let l=0;l<this.itemSize;l++)e.push(this.data.array[s+l])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Nd=new ot,S2=new ot,M2=new fe;class ca{constructor(t=new ot(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,r,s){return this.normal.set(t,e,r),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,r){const s=Nd.subVectors(r,e).cross(S2.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const r=t.delta(Nd),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const l=-(t.start.dot(this.normal)+this.constant)/s;return l<0||l>1?null:e.copy(t.start).addScaledVector(r,l)}intersectsLine(t){const e=this.distanceToPoint(t.start),r=this.distanceToPoint(t.end);return e<0&&r>0||r<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const r=e||M2.getNormalMatrix(t),s=this.coplanarPoint(Nd).applyMatrix4(t),l=this.normal.applyMatrix3(r).normalize();return this.constant=-s.dot(l),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ka=new Fc,lc=new ot;class rM{constructor(t=new ca,e=new ca,r=new ca,s=new ca,l=new ca,c=new ca){this.planes=[t,e,r,s,l,c]}set(t,e,r,s,l,c){const f=this.planes;return f[0].copy(t),f[1].copy(e),f[2].copy(r),f[3].copy(s),f[4].copy(l),f[5].copy(c),this}copy(t){const e=this.planes;for(let r=0;r<6;r++)e[r].copy(t.planes[r]);return this}setFromProjectionMatrix(t,e=Ar){const r=this.planes,s=t.elements,l=s[0],c=s[1],f=s[2],d=s[3],h=s[4],m=s[5],g=s[6],v=s[7],y=s[8],b=s[9],R=s[10],M=s[11],x=s[12],D=s[13],S=s[14],E=s[15];if(r[0].setComponents(d-l,v-h,M-y,E-x).normalize(),r[1].setComponents(d+l,v+h,M+y,E+x).normalize(),r[2].setComponents(d+c,v+m,M+b,E+D).normalize(),r[3].setComponents(d-c,v-m,M-b,E-D).normalize(),r[4].setComponents(d-f,v-g,M-R,E-S).normalize(),e===Ar)r[5].setComponents(d+f,v+g,M+R,E+S).normalize();else if(e===Dc)r[5].setComponents(f,g,R,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ka.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ka.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ka)}intersectsSprite(t){return ka.center.set(0,0,0),ka.radius=.7071067811865476,ka.applyMatrix4(t.matrixWorld),this.intersectsSphere(ka)}intersectsSphere(t){const e=this.planes,r=t.center,s=-t.radius;for(let l=0;l<6;l++)if(e[l].distanceToPoint(r)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let r=0;r<6;r++){const s=e[r];if(lc.x=s.normal.x>0?t.max.x:t.min.x,lc.y=s.normal.y>0?t.max.y:t.min.y,lc.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(lc)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let r=0;r<6;r++)if(e[r].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class E2 extends lo{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Iy=new un,fm=new Fm,uc=new Fc,cc=new ot;class b2 extends Cn{constructor(t=new $i,e=new E2){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const r=this.geometry,s=this.matrixWorld,l=t.params.Points.threshold,c=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),uc.copy(r.boundingSphere),uc.applyMatrix4(s),uc.radius+=l,t.ray.intersectsSphere(uc)===!1)return;Iy.copy(s).invert(),fm.copy(t.ray).applyMatrix4(Iy);const f=l/((this.scale.x+this.scale.y+this.scale.z)/3),d=f*f,h=r.index,g=r.attributes.position;if(h!==null){const v=Math.max(0,c.start),y=Math.min(h.count,c.start+c.count);for(let b=v,R=y;b<R;b++){const M=h.getX(b);cc.fromBufferAttribute(g,M),Fy(cc,M,d,s,t,e,this)}}else{const v=Math.max(0,c.start),y=Math.min(g.count,c.start+c.count);for(let b=v,R=y;b<R;b++)cc.fromBufferAttribute(g,b),Fy(cc,b,d,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,r=Object.keys(e);if(r.length>0){const s=e[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,c=s.length;l<c;l++){const f=s[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}}function Fy(i,t,e,r,s,l,c){const f=fm.distanceSqToPoint(i);if(f<e){const d=new ot;fm.closestPointToPoint(i,d),d.applyMatrix4(r);const h=s.ray.origin.distanceTo(d);if(h<s.near||h>s.far)return;l.push({distance:h,distanceToRay:Math.sqrt(f),point:d,index:t,face:null,faceIndex:null,barycoord:null,object:c})}}class aM extends jn{constructor(t,e,r=Za,s,l,c,f=Ii,d=Ii,h,m=xl){if(m!==xl&&m!==Sl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super(null,s,l,c,f,d,m,r,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Im(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Bc extends $i{constructor(t=1,e=1,r=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:r,heightSegments:s};const l=t/2,c=e/2,f=Math.floor(r),d=Math.floor(s),h=f+1,m=d+1,g=t/f,v=e/d,y=[],b=[],R=[],M=[];for(let x=0;x<m;x++){const D=x*v-c;for(let S=0;S<h;S++){const E=S*g-l;b.push(E,-D,0),R.push(0,0,1),M.push(S/f),M.push(1-x/d)}}for(let x=0;x<d;x++)for(let D=0;D<f;D++){const S=D+h*x,E=D+h*(x+1),A=D+1+h*(x+1),L=D+1+h*x;y.push(S,E,L),y.push(E,A,L)}this.setIndex(y),this.setAttribute("position",new Ya(b,3)),this.setAttribute("normal",new Ya(R,3)),this.setAttribute("uv",new Ya(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bc(t.width,t.height,t.widthSegments,t.heightSegments)}}class T2 extends lo{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=WS,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ji,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class A2 extends lo{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=NC,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class R2 extends lo{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const By={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class w2{constructor(t,e,r){const s=this;let l=!1,c=0,f=0,d;const h=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=r,this.itemStart=function(m){f++,l===!1&&s.onStart!==void 0&&s.onStart(m,c,f),l=!0},this.itemEnd=function(m){c++,s.onProgress!==void 0&&s.onProgress(m,c,f),c===f&&(l=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(m){s.onError!==void 0&&s.onError(m)},this.resolveURL=function(m){return d?d(m):m},this.setURLModifier=function(m){return d=m,this},this.addHandler=function(m,g){return h.push(m,g),this},this.removeHandler=function(m){const g=h.indexOf(m);return g!==-1&&h.splice(g,2),this},this.getHandler=function(m){for(let g=0,v=h.length;g<v;g+=2){const y=h[g],b=h[g+1];if(y.global&&(y.lastIndex=0),y.test(m))return b}return null}}}const C2=new w2;class Bm{constructor(t){this.manager=t!==void 0?t:C2,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const r=this;return new Promise(function(s,l){r.load(t,s,e,l)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Bm.DEFAULT_MATERIAL_NAME="__DEFAULT";class D2 extends Bm{constructor(t){super(t)}load(t,e,r,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const l=this,c=By.get(t);if(c!==void 0)return l.manager.itemStart(t),setTimeout(function(){e&&e(c),l.manager.itemEnd(t)},0),c;const f=Ml("img");function d(){m(),By.add(t,this),e&&e(this),l.manager.itemEnd(t)}function h(g){m(),s&&s(g),l.manager.itemError(t),l.manager.itemEnd(t)}function m(){f.removeEventListener("load",d,!1),f.removeEventListener("error",h,!1)}return f.addEventListener("load",d,!1),f.addEventListener("error",h,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(f.crossOrigin=this.crossOrigin),l.manager.itemStart(t),f.src=t,f}}class L2 extends Bm{constructor(t){super(t)}load(t,e,r,s){const l=new jn,c=new D2(this.manager);return c.setCrossOrigin(this.crossOrigin),c.setPath(this.path),c.load(t,function(f){l.image=f,l.needsUpdate=!0,e!==void 0&&e(l)},r,s),l}}class U2 extends nM{constructor(t=-1,e=1,r=1,s=-1,l=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=r,this.bottom=s,this.near=l,this.far=c,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,r,s,l,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=r,this.view.offsetY=s,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let l=r-t,c=r+t,f=s+e,d=s-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,m=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=h*this.view.offsetX,c=l+h*this.view.width,f-=m*this.view.offsetY,d=f-m*this.view.height}this.projectionMatrix.makeOrthographic(l,c,f,d,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class N2 extends Ri{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}}class ky{constructor(t=1,e=0,r=0){this.radius=t,this.phi=e,this.theta=r}set(t,e,r){return this.radius=t,this.phi=e,this.theta=r,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Se(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,r){return this.radius=Math.sqrt(t*t+e*e+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,r),this.phi=Math.acos(Se(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class P2 extends Ja{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Hy(i,t,e,r){const s=O2(r);switch(e){case BS:return i*t;case HS:return i*t;case VS:return i*t*2;case GS:return i*t/s.components*s.byteLength;case Pm:return i*t/s.components*s.byteLength;case qS:return i*t*2/s.components*s.byteLength;case Om:return i*t*2/s.components*s.byteLength;case kS:return i*t*3/s.components*s.byteLength;case zi:return i*t*4/s.components*s.byteLength;case zm:return i*t*4/s.components*s.byteLength;case gc:case _c:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case vc:case yc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ip:case Bp:return Math.max(i,16)*Math.max(t,8)/4;case zp:case Fp:return Math.max(i,8)*Math.max(t,8)/2;case kp:case Hp:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Vp:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Gp:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case qp:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Xp:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Wp:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case jp:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Yp:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Zp:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Kp:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Qp:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Jp:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case $p:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case tm:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case em:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case nm:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case xc:case im:case rm:return Math.ceil(i/4)*Math.ceil(t/4)*16;case XS:case am:return Math.ceil(i/4)*Math.ceil(t/4)*8;case sm:case om:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function O2(i){switch(i){case wr:case zS:return{byteLength:1,components:1};case vl:case IS:case Al:return{byteLength:2,components:1};case Um:case Nm:return{byteLength:2,components:4};case Za:case Lm:case Tr:return{byteLength:4,components:1};case FS:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dm}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dm);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function sM(){let i=null,t=!1,e=null,r=null;function s(l,c){e(l,c),r=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(r=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(l){e=l},setContext:function(l){i=l}}}function z2(i){const t=new WeakMap;function e(f,d){const h=f.array,m=f.usage,g=h.byteLength,v=i.createBuffer();i.bindBuffer(d,v),i.bufferData(d,h,m),f.onUploadCallback();let y;if(h instanceof Float32Array)y=i.FLOAT;else if(h instanceof Uint16Array)f.isFloat16BufferAttribute?y=i.HALF_FLOAT:y=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)y=i.SHORT;else if(h instanceof Uint32Array)y=i.UNSIGNED_INT;else if(h instanceof Int32Array)y=i.INT;else if(h instanceof Int8Array)y=i.BYTE;else if(h instanceof Uint8Array)y=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)y=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:v,type:y,bytesPerElement:h.BYTES_PER_ELEMENT,version:f.version,size:g}}function r(f,d,h){const m=d.array,g=d.updateRanges;if(i.bindBuffer(h,f),g.length===0)i.bufferSubData(h,0,m);else{g.sort((y,b)=>y.start-b.start);let v=0;for(let y=1;y<g.length;y++){const b=g[v],R=g[y];R.start<=b.start+b.count+1?b.count=Math.max(b.count,R.start+R.count-b.start):(++v,g[v]=R)}g.length=v+1;for(let y=0,b=g.length;y<b;y++){const R=g[y];i.bufferSubData(h,R.start*m.BYTES_PER_ELEMENT,m,R.start,R.count)}d.clearUpdateRanges()}d.onUploadCallback()}function s(f){return f.isInterleavedBufferAttribute&&(f=f.data),t.get(f)}function l(f){f.isInterleavedBufferAttribute&&(f=f.data);const d=t.get(f);d&&(i.deleteBuffer(d.buffer),t.delete(f))}function c(f,d){if(f.isInterleavedBufferAttribute&&(f=f.data),f.isGLBufferAttribute){const m=t.get(f);(!m||m.version<f.version)&&t.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}const h=t.get(f);if(h===void 0)t.set(f,e(f,d));else if(h.version<f.version){if(h.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,f,d),h.version=f.version}}return{get:s,remove:l,update:c}}var I2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,F2=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,B2=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,k2=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,H2=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,V2=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,G2=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,q2=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,X2=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,W2=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,j2=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Y2=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Z2=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,K2=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Q2=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,J2=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tD=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eD=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nD=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,iD=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,rD=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,aD=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,sD=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,oD=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,lD=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,uD=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cD=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fD=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hD=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dD="gl_FragColor = linearToOutputTexel( gl_FragColor );",pD=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mD=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,gD=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_D=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,vD=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yD=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,xD=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,SD=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,MD=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ED=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bD=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,TD=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,AD=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,RD=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wD=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,CD=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,DD=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,LD=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,UD=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ND=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,PD=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,OD=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zD=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ID=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,FD=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,BD=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kD=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,HD=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,VD=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,GD=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qD=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,XD=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,WD=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jD=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,YD=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ZD=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,KD=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,QD=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JD=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$D=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,t3=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,e3=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,n3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,i3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,r3=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,a3=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,s3=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,o3=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,l3=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,u3=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,c3=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,f3=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,h3=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,d3=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,p3=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,m3=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,g3=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_3=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,v3=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,y3=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,x3=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,S3=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,M3=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,E3=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,b3=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,T3=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,A3=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,R3=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w3=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,C3=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,D3=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,L3=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,U3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,N3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,P3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,O3=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const z3=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,I3=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,F3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B3=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,k3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H3=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V3=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,G3=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,q3=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,X3=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,W3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,j3=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y3=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Z3=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,K3=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Q3=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J3=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$3=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tL=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,eL=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nL=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,iL=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,rL=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aL=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sL=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,oL=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lL=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uL=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cL=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fL=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hL=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dL=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pL=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mL=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,de={alphahash_fragment:I2,alphahash_pars_fragment:F2,alphamap_fragment:B2,alphamap_pars_fragment:k2,alphatest_fragment:H2,alphatest_pars_fragment:V2,aomap_fragment:G2,aomap_pars_fragment:q2,batching_pars_vertex:X2,batching_vertex:W2,begin_vertex:j2,beginnormal_vertex:Y2,bsdfs:Z2,iridescence_fragment:K2,bumpmap_pars_fragment:Q2,clipping_planes_fragment:J2,clipping_planes_pars_fragment:$2,clipping_planes_pars_vertex:tD,clipping_planes_vertex:eD,color_fragment:nD,color_pars_fragment:iD,color_pars_vertex:rD,color_vertex:aD,common:sD,cube_uv_reflection_fragment:oD,defaultnormal_vertex:lD,displacementmap_pars_vertex:uD,displacementmap_vertex:cD,emissivemap_fragment:fD,emissivemap_pars_fragment:hD,colorspace_fragment:dD,colorspace_pars_fragment:pD,envmap_fragment:mD,envmap_common_pars_fragment:gD,envmap_pars_fragment:_D,envmap_pars_vertex:vD,envmap_physical_pars_fragment:CD,envmap_vertex:yD,fog_vertex:xD,fog_pars_vertex:SD,fog_fragment:MD,fog_pars_fragment:ED,gradientmap_pars_fragment:bD,lightmap_pars_fragment:TD,lights_lambert_fragment:AD,lights_lambert_pars_fragment:RD,lights_pars_begin:wD,lights_toon_fragment:DD,lights_toon_pars_fragment:LD,lights_phong_fragment:UD,lights_phong_pars_fragment:ND,lights_physical_fragment:PD,lights_physical_pars_fragment:OD,lights_fragment_begin:zD,lights_fragment_maps:ID,lights_fragment_end:FD,logdepthbuf_fragment:BD,logdepthbuf_pars_fragment:kD,logdepthbuf_pars_vertex:HD,logdepthbuf_vertex:VD,map_fragment:GD,map_pars_fragment:qD,map_particle_fragment:XD,map_particle_pars_fragment:WD,metalnessmap_fragment:jD,metalnessmap_pars_fragment:YD,morphinstance_vertex:ZD,morphcolor_vertex:KD,morphnormal_vertex:QD,morphtarget_pars_vertex:JD,morphtarget_vertex:$D,normal_fragment_begin:t3,normal_fragment_maps:e3,normal_pars_fragment:n3,normal_pars_vertex:i3,normal_vertex:r3,normalmap_pars_fragment:a3,clearcoat_normal_fragment_begin:s3,clearcoat_normal_fragment_maps:o3,clearcoat_pars_fragment:l3,iridescence_pars_fragment:u3,opaque_fragment:c3,packing:f3,premultiplied_alpha_fragment:h3,project_vertex:d3,dithering_fragment:p3,dithering_pars_fragment:m3,roughnessmap_fragment:g3,roughnessmap_pars_fragment:_3,shadowmap_pars_fragment:v3,shadowmap_pars_vertex:y3,shadowmap_vertex:x3,shadowmask_pars_fragment:S3,skinbase_vertex:M3,skinning_pars_vertex:E3,skinning_vertex:b3,skinnormal_vertex:T3,specularmap_fragment:A3,specularmap_pars_fragment:R3,tonemapping_fragment:w3,tonemapping_pars_fragment:C3,transmission_fragment:D3,transmission_pars_fragment:L3,uv_pars_fragment:U3,uv_pars_vertex:N3,uv_vertex:P3,worldpos_vertex:O3,background_vert:z3,background_frag:I3,backgroundCube_vert:F3,backgroundCube_frag:B3,cube_vert:k3,cube_frag:H3,depth_vert:V3,depth_frag:G3,distanceRGBA_vert:q3,distanceRGBA_frag:X3,equirect_vert:W3,equirect_frag:j3,linedashed_vert:Y3,linedashed_frag:Z3,meshbasic_vert:K3,meshbasic_frag:Q3,meshlambert_vert:J3,meshlambert_frag:$3,meshmatcap_vert:tL,meshmatcap_frag:eL,meshnormal_vert:nL,meshnormal_frag:iL,meshphong_vert:rL,meshphong_frag:aL,meshphysical_vert:sL,meshphysical_frag:oL,meshtoon_vert:lL,meshtoon_frag:uL,points_vert:cL,points_frag:fL,shadow_vert:hL,shadow_frag:dL,sprite_vert:pL,sprite_frag:mL},Ot={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new fe}},envmap:{envMap:{value:null},envMapRotation:{value:new fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new fe},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0},uvTransform:{value:new fe}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}}},Xi={basic:{uniforms:Wn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:de.meshbasic_vert,fragmentShader:de.meshbasic_frag},lambert:{uniforms:Wn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new De(0)}}]),vertexShader:de.meshlambert_vert,fragmentShader:de.meshlambert_frag},phong:{uniforms:Wn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:de.meshphong_vert,fragmentShader:de.meshphong_frag},standard:{uniforms:Wn([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag},toon:{uniforms:Wn([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new De(0)}}]),vertexShader:de.meshtoon_vert,fragmentShader:de.meshtoon_frag},matcap:{uniforms:Wn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:de.meshmatcap_vert,fragmentShader:de.meshmatcap_frag},points:{uniforms:Wn([Ot.points,Ot.fog]),vertexShader:de.points_vert,fragmentShader:de.points_frag},dashed:{uniforms:Wn([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:de.linedashed_vert,fragmentShader:de.linedashed_frag},depth:{uniforms:Wn([Ot.common,Ot.displacementmap]),vertexShader:de.depth_vert,fragmentShader:de.depth_frag},normal:{uniforms:Wn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:de.meshnormal_vert,fragmentShader:de.meshnormal_frag},sprite:{uniforms:Wn([Ot.sprite,Ot.fog]),vertexShader:de.sprite_vert,fragmentShader:de.sprite_frag},background:{uniforms:{uvTransform:{value:new fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:de.background_vert,fragmentShader:de.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new fe}},vertexShader:de.backgroundCube_vert,fragmentShader:de.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:de.cube_vert,fragmentShader:de.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:de.equirect_vert,fragmentShader:de.equirect_frag},distanceRGBA:{uniforms:Wn([Ot.common,Ot.displacementmap,{referencePosition:{value:new ot},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:de.distanceRGBA_vert,fragmentShader:de.distanceRGBA_frag},shadow:{uniforms:Wn([Ot.lights,Ot.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:de.shadow_vert,fragmentShader:de.shadow_frag}};Xi.physical={uniforms:Wn([Xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new fe},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new fe},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new fe},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new fe},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new fe},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new fe}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag};const fc={r:0,b:0,g:0},Ha=new Ji,gL=new un;function _L(i,t,e,r,s,l,c){const f=new De(0);let d=l===!0?0:1,h,m,g=null,v=0,y=null;function b(S){let E=S.isScene===!0?S.background:null;return E&&E.isTexture&&(E=(S.backgroundBlurriness>0?e:t).get(E)),E}function R(S){let E=!1;const A=b(S);A===null?x(f,d):A&&A.isColor&&(x(A,1),E=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?r.buffers.color.setClear(0,0,0,1,c):L==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,c),(i.autoClear||E)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(S,E){const A=b(E);A&&(A.isCubeTexture||A.mapping===Ic)?(m===void 0&&(m=new Ki(new wl(1,1,1),new Dr({name:"BackgroundCubeMaterial",uniforms:ao(Xi.backgroundCube.uniforms),vertexShader:Xi.backgroundCube.vertexShader,fragmentShader:Xi.backgroundCube.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(L,P,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(m)),Ha.copy(E.backgroundRotation),Ha.x*=-1,Ha.y*=-1,Ha.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Ha.y*=-1,Ha.z*=-1),m.material.uniforms.envMap.value=A,m.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,m.material.uniforms.backgroundRotation.value.setFromMatrix4(gL.makeRotationFromEuler(Ha)),m.material.toneMapped=Ce.getTransfer(A.colorSpace)!==Ve,(g!==A||v!==A.version||y!==i.toneMapping)&&(m.material.needsUpdate=!0,g=A,v=A.version,y=i.toneMapping),m.layers.enableAll(),S.unshift(m,m.geometry,m.material,0,0,null)):A&&A.isTexture&&(h===void 0&&(h=new Ki(new Bc(2,2),new Dr({name:"BackgroundMaterial",uniforms:ao(Xi.background.uniforms),vertexShader:Xi.background.vertexShader,fragmentShader:Xi.background.fragmentShader,side:ga,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=A,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.toneMapped=Ce.getTransfer(A.colorSpace)!==Ve,A.matrixAutoUpdate===!0&&A.updateMatrix(),h.material.uniforms.uvTransform.value.copy(A.matrix),(g!==A||v!==A.version||y!==i.toneMapping)&&(h.material.needsUpdate=!0,g=A,v=A.version,y=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null))}function x(S,E){S.getRGB(fc,eM(i)),r.buffers.color.setClear(fc.r,fc.g,fc.b,E,c)}function D(){m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return f},setClearColor:function(S,E=1){f.set(S),d=E,x(f,d)},getClearAlpha:function(){return d},setClearAlpha:function(S){d=S,x(f,d)},render:R,addToRenderList:M,dispose:D}}function vL(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),r={},s=v(null);let l=s,c=!1;function f(T,N,k,q,K){let X=!1;const H=g(q,k,N);l!==H&&(l=H,h(l.object)),X=y(T,q,k,K),X&&b(T,q,k,K),K!==null&&t.update(K,i.ELEMENT_ARRAY_BUFFER),(X||c)&&(c=!1,E(T,N,k,q),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function d(){return i.createVertexArray()}function h(T){return i.bindVertexArray(T)}function m(T){return i.deleteVertexArray(T)}function g(T,N,k){const q=k.wireframe===!0;let K=r[T.id];K===void 0&&(K={},r[T.id]=K);let X=K[N.id];X===void 0&&(X={},K[N.id]=X);let H=X[q];return H===void 0&&(H=v(d()),X[q]=H),H}function v(T){const N=[],k=[],q=[];for(let K=0;K<e;K++)N[K]=0,k[K]=0,q[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:k,attributeDivisors:q,object:T,attributes:{},index:null}}function y(T,N,k,q){const K=l.attributes,X=N.attributes;let H=0;const Z=k.getAttributes();for(const J in Z)if(Z[J].location>=0){const w=K[J];let Y=X[J];if(Y===void 0&&(J==="instanceMatrix"&&T.instanceMatrix&&(Y=T.instanceMatrix),J==="instanceColor"&&T.instanceColor&&(Y=T.instanceColor)),w===void 0||w.attribute!==Y||Y&&w.data!==Y.data)return!0;H++}return l.attributesNum!==H||l.index!==q}function b(T,N,k,q){const K={},X=N.attributes;let H=0;const Z=k.getAttributes();for(const J in Z)if(Z[J].location>=0){let w=X[J];w===void 0&&(J==="instanceMatrix"&&T.instanceMatrix&&(w=T.instanceMatrix),J==="instanceColor"&&T.instanceColor&&(w=T.instanceColor));const Y={};Y.attribute=w,w&&w.data&&(Y.data=w.data),K[J]=Y,H++}l.attributes=K,l.attributesNum=H,l.index=q}function R(){const T=l.newAttributes;for(let N=0,k=T.length;N<k;N++)T[N]=0}function M(T){x(T,0)}function x(T,N){const k=l.newAttributes,q=l.enabledAttributes,K=l.attributeDivisors;k[T]=1,q[T]===0&&(i.enableVertexAttribArray(T),q[T]=1),K[T]!==N&&(i.vertexAttribDivisor(T,N),K[T]=N)}function D(){const T=l.newAttributes,N=l.enabledAttributes;for(let k=0,q=N.length;k<q;k++)N[k]!==T[k]&&(i.disableVertexAttribArray(k),N[k]=0)}function S(T,N,k,q,K,X,H){H===!0?i.vertexAttribIPointer(T,N,k,K,X):i.vertexAttribPointer(T,N,k,q,K,X)}function E(T,N,k,q){R();const K=q.attributes,X=k.getAttributes(),H=N.defaultAttributeValues;for(const Z in X){const J=X[Z];if(J.location>=0){let vt=K[Z];if(vt===void 0&&(Z==="instanceMatrix"&&T.instanceMatrix&&(vt=T.instanceMatrix),Z==="instanceColor"&&T.instanceColor&&(vt=T.instanceColor)),vt!==void 0){const w=vt.normalized,Y=vt.itemSize,ft=t.get(vt);if(ft===void 0)continue;const B=ft.buffer,tt=ft.type,pt=ft.bytesPerElement,gt=tt===i.INT||tt===i.UNSIGNED_INT||vt.gpuType===Lm;if(vt.isInterleavedBufferAttribute){const wt=vt.data,Lt=wt.stride,ie=vt.offset;if(wt.isInstancedInterleavedBuffer){for(let Gt=0;Gt<J.locationSize;Gt++)x(J.location+Gt,wt.meshPerAttribute);T.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=wt.meshPerAttribute*wt.count)}else for(let Gt=0;Gt<J.locationSize;Gt++)M(J.location+Gt);i.bindBuffer(i.ARRAY_BUFFER,B);for(let Gt=0;Gt<J.locationSize;Gt++)S(J.location+Gt,Y/J.locationSize,tt,w,Lt*pt,(ie+Y/J.locationSize*Gt)*pt,gt)}else{if(vt.isInstancedBufferAttribute){for(let wt=0;wt<J.locationSize;wt++)x(J.location+wt,vt.meshPerAttribute);T.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let wt=0;wt<J.locationSize;wt++)M(J.location+wt);i.bindBuffer(i.ARRAY_BUFFER,B);for(let wt=0;wt<J.locationSize;wt++)S(J.location+wt,Y/J.locationSize,tt,w,Y*pt,Y/J.locationSize*wt*pt,gt)}}else if(H!==void 0){const w=H[Z];if(w!==void 0)switch(w.length){case 2:i.vertexAttrib2fv(J.location,w);break;case 3:i.vertexAttrib3fv(J.location,w);break;case 4:i.vertexAttrib4fv(J.location,w);break;default:i.vertexAttrib1fv(J.location,w)}}}}D()}function A(){O();for(const T in r){const N=r[T];for(const k in N){const q=N[k];for(const K in q)m(q[K].object),delete q[K];delete N[k]}delete r[T]}}function L(T){if(r[T.id]===void 0)return;const N=r[T.id];for(const k in N){const q=N[k];for(const K in q)m(q[K].object),delete q[K];delete N[k]}delete r[T.id]}function P(T){for(const N in r){const k=r[N];if(k[T.id]===void 0)continue;const q=k[T.id];for(const K in q)m(q[K].object),delete q[K];delete k[T.id]}}function O(){C(),c=!0,l!==s&&(l=s,h(l.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:f,reset:O,resetDefaultState:C,dispose:A,releaseStatesOfGeometry:L,releaseStatesOfProgram:P,initAttributes:R,enableAttribute:M,disableUnusedAttributes:D}}function yL(i,t,e){let r;function s(h){r=h}function l(h,m){i.drawArrays(r,h,m),e.update(m,r,1)}function c(h,m,g){g!==0&&(i.drawArraysInstanced(r,h,m,g),e.update(m,r,g))}function f(h,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,h,0,m,0,g);let y=0;for(let b=0;b<g;b++)y+=m[b];e.update(y,r,1)}function d(h,m,g,v){if(g===0)return;const y=t.get("WEBGL_multi_draw");if(y===null)for(let b=0;b<h.length;b++)c(h[b],m[b],v[b]);else{y.multiDrawArraysInstancedWEBGL(r,h,0,m,0,v,0,g);let b=0;for(let R=0;R<g;R++)b+=m[R]*v[R];e.update(b,r,1)}}this.setMode=s,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=d}function xL(i,t,e,r){let s;function l(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function c(P){return!(P!==zi&&r.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function f(P){const O=P===Al&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==wr&&r.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Tr&&!O)}function d(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const m=d(h);m!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",m,"instead."),h=m);const g=e.logarithmicDepthBuffer===!0,v=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),y=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),R=i.getParameter(i.MAX_TEXTURE_SIZE),M=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),D=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=b>0,L=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:d,textureFormatReadable:c,textureTypeReadable:f,precision:h,logarithmicDepthBuffer:g,reverseDepthBuffer:v,maxTextures:y,maxVertexTextures:b,maxTextureSize:R,maxCubemapSize:M,maxAttributes:x,maxVertexUniforms:D,maxVaryings:S,maxFragmentUniforms:E,vertexTextures:A,maxSamples:L}}function SL(i){const t=this;let e=null,r=0,s=!1,l=!1;const c=new ca,f=new fe,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(g,v){const y=g.length!==0||v||r!==0||s;return s=v,r=g.length,y},this.beginShadows=function(){l=!0,m(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(g,v){e=m(g,v,0)},this.setState=function(g,v,y){const b=g.clippingPlanes,R=g.clipIntersection,M=g.clipShadows,x=i.get(g);if(!s||b===null||b.length===0||l&&!M)l?m(null):h();else{const D=l?0:r,S=D*4;let E=x.clippingState||null;d.value=E,E=m(b,v,S,y);for(let A=0;A!==S;++A)E[A]=e[A];x.clippingState=E,this.numIntersection=R?this.numPlanes:0,this.numPlanes+=D}};function h(){d.value!==e&&(d.value=e,d.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function m(g,v,y,b){const R=g!==null?g.length:0;let M=null;if(R!==0){if(M=d.value,b!==!0||M===null){const x=y+R*4,D=v.matrixWorldInverse;f.getNormalMatrix(D),(M===null||M.length<x)&&(M=new Float32Array(x));for(let S=0,E=y;S!==R;++S,E+=4)c.copy(g[S]).applyMatrix4(D,f),c.normal.toArray(M,E),M[E+3]=c.constant}d.value=M,d.needsUpdate=!0}return t.numPlanes=R,t.numIntersection=0,M}}function ML(i){let t=new WeakMap;function e(c,f){return f===Np?c.mapping=no:f===Pp&&(c.mapping=io),c}function r(c){if(c&&c.isTexture){const f=c.mapping;if(f===Np||f===Pp)if(t.has(c)){const d=t.get(c).texture;return e(d,c.mapping)}else{const d=c.image;if(d&&d.height>0){const h=new _2(d.height);return h.fromEquirectangularTexture(i,c),t.set(c,h),c.addEventListener("dispose",s),e(h.texture,c.mapping)}else return null}}return c}function s(c){const f=c.target;f.removeEventListener("dispose",s);const d=t.get(f);d!==void 0&&(t.delete(f),d.dispose())}function l(){t=new WeakMap}return{get:r,dispose:l}}const Ys=4,Vy=[.125,.215,.35,.446,.526,.582],Xa=20,Pd=new U2,Gy=new De;let Od=null,zd=0,Id=0,Fd=!1;const Ga=(1+Math.sqrt(5))/2,Xs=1/Ga,qy=[new ot(-Ga,Xs,0),new ot(Ga,Xs,0),new ot(-Xs,0,Ga),new ot(Xs,0,Ga),new ot(0,Ga,-Xs),new ot(0,Ga,Xs),new ot(-1,1,-1),new ot(1,1,-1),new ot(-1,1,1),new ot(1,1,1)],EL=new ot;class Xy{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,r=.1,s=100,l={}){const{size:c=256,position:f=EL}=l;Od=this._renderer.getRenderTarget(),zd=this._renderer.getActiveCubeFace(),Id=this._renderer.getActiveMipmapLevel(),Fd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(c);const d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(t,r,s,d,f),e>0&&this._blur(d,0,0,e),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yy(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jy(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Od,zd,Id),this._renderer.xr.enabled=Fd,t.scissorTest=!1,hc(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===no||t.mapping===io?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Od=this._renderer.getRenderTarget(),zd=this._renderer.getActiveCubeFace(),Id=this._renderer.getActiveMipmapLevel(),Fd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=e||this._allocateTargets();return this._textureToCubeUV(t,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,r={magFilter:Zi,minFilter:Zi,generateMipmaps:!1,type:Al,format:zi,colorSpace:ro,depthBuffer:!1},s=Wy(t,e,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wy(t,e,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=bL(l)),this._blurMaterial=TL(l,t,e)}return s}_compileMaterial(t){const e=new Ki(this._lodPlanes[0],t);this._renderer.compile(e,Pd)}_sceneToCubeUV(t,e,r,s,l){const d=new Ri(90,1,e,r),h=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],g=this._renderer,v=g.autoClear,y=g.toneMapping;g.getClearColor(Gy),g.toneMapping=pa,g.autoClear=!1;const b=new JS({name:"PMREM.Background",side:ni,depthWrite:!1,depthTest:!1}),R=new Ki(new wl,b);let M=!1;const x=t.background;x?x.isColor&&(b.color.copy(x),t.background=null,M=!0):(b.color.copy(Gy),M=!0);for(let D=0;D<6;D++){const S=D%3;S===0?(d.up.set(0,h[D],0),d.position.set(l.x,l.y,l.z),d.lookAt(l.x+m[D],l.y,l.z)):S===1?(d.up.set(0,0,h[D]),d.position.set(l.x,l.y,l.z),d.lookAt(l.x,l.y+m[D],l.z)):(d.up.set(0,h[D],0),d.position.set(l.x,l.y,l.z),d.lookAt(l.x,l.y,l.z+m[D]));const E=this._cubeSize;hc(s,S*E,D>2?E:0,E,E),g.setRenderTarget(s),M&&g.render(R,d),g.render(t,d)}R.geometry.dispose(),R.material.dispose(),g.toneMapping=y,g.autoClear=v,t.background=x}_textureToCubeUV(t,e){const r=this._renderer,s=t.mapping===no||t.mapping===io;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yy()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jy());const l=s?this._cubemapMaterial:this._equirectMaterial,c=new Ki(this._lodPlanes[0],l),f=l.uniforms;f.envMap.value=t;const d=this._cubeSize;hc(e,0,0,3*d,2*d),r.setRenderTarget(e),r.render(c,Pd)}_applyPMREM(t){const e=this._renderer,r=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let l=1;l<s;l++){const c=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),f=qy[(s-l-1)%qy.length];this._blur(t,l-1,l,c,f)}e.autoClear=r}_blur(t,e,r,s,l){const c=this._pingPongRenderTarget;this._halfBlur(t,c,e,r,s,"latitudinal",l),this._halfBlur(c,t,r,r,s,"longitudinal",l)}_halfBlur(t,e,r,s,l,c,f){const d=this._renderer,h=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const m=3,g=new Ki(this._lodPlanes[s],h),v=h.uniforms,y=this._sizeLods[r]-1,b=isFinite(l)?Math.PI/(2*y):2*Math.PI/(2*Xa-1),R=l/b,M=isFinite(l)?1+Math.floor(m*R):Xa;M>Xa&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${Xa}`);const x=[];let D=0;for(let P=0;P<Xa;++P){const O=P/R,C=Math.exp(-O*O/2);x.push(C),P===0?D+=C:P<M&&(D+=2*C)}for(let P=0;P<x.length;P++)x[P]=x[P]/D;v.envMap.value=t.texture,v.samples.value=M,v.weights.value=x,v.latitudinal.value=c==="latitudinal",f&&(v.poleAxis.value=f);const{_lodMax:S}=this;v.dTheta.value=b,v.mipInt.value=S-r;const E=this._sizeLods[s],A=3*E*(s>S-Ys?s-S+Ys:0),L=4*(this._cubeSize-E);hc(e,A,L,3*E,2*E),d.setRenderTarget(e),d.render(g,Pd)}}function bL(i){const t=[],e=[],r=[];let s=i;const l=i-Ys+1+Vy.length;for(let c=0;c<l;c++){const f=Math.pow(2,s);e.push(f);let d=1/f;c>i-Ys?d=Vy[c-i+Ys-1]:c===0&&(d=0),r.push(d);const h=1/(f-2),m=-h,g=1+h,v=[m,m,g,m,g,g,m,m,g,g,m,g],y=6,b=6,R=3,M=2,x=1,D=new Float32Array(R*b*y),S=new Float32Array(M*b*y),E=new Float32Array(x*b*y);for(let L=0;L<y;L++){const P=L%3*2/3-1,O=L>2?0:-1,C=[P,O,0,P+2/3,O,0,P+2/3,O+1,0,P,O,0,P+2/3,O+1,0,P,O+1,0];D.set(C,R*b*L),S.set(v,M*b*L);const T=[L,L,L,L,L,L];E.set(T,x*b*L)}const A=new $i;A.setAttribute("position",new gi(D,R)),A.setAttribute("uv",new gi(S,M)),A.setAttribute("faceIndex",new gi(E,x)),t.push(A),s>Ys&&s--}return{lodPlanes:t,sizeLods:e,sigmas:r}}function Wy(i,t,e){const r=new Ka(i,t,e);return r.texture.mapping=Ic,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function hc(i,t,e,r,s){i.viewport.set(t,e,r,s),i.scissor.set(t,e,r,s)}function TL(i,t,e){const r=new Float32Array(Xa),s=new ot(0,1,0);return new Dr({name:"SphericalGaussianBlur",defines:{n:Xa,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:km(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:da,depthTest:!1,depthWrite:!1})}function jy(){return new Dr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:km(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:da,depthTest:!1,depthWrite:!1})}function Yy(){return new Dr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:km(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:da,depthTest:!1,depthWrite:!1})}function km(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function AL(i){let t=new WeakMap,e=null;function r(f){if(f&&f.isTexture){const d=f.mapping,h=d===Np||d===Pp,m=d===no||d===io;if(h||m){let g=t.get(f);const v=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==v)return e===null&&(e=new Xy(i)),g=h?e.fromEquirectangular(f,g):e.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{const y=f.image;return h&&y&&y.height>0||m&&y&&s(y)?(e===null&&(e=new Xy(i)),g=h?e.fromEquirectangular(f):e.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",l),g.texture):null}}}return f}function s(f){let d=0;const h=6;for(let m=0;m<h;m++)f[m]!==void 0&&d++;return d===h}function l(f){const d=f.target;d.removeEventListener("dispose",l);const h=t.get(d);h!==void 0&&(t.delete(d),h.dispose())}function c(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:r,dispose:c}}function RL(i){const t={};function e(r){if(t[r]!==void 0)return t[r];let s;switch(r){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(r)}return t[r]=s,s}return{has:function(r){return e(r)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(r){const s=e(r);return s===null&&Mc("THREE.WebGLRenderer: "+r+" extension not supported."),s}}}function wL(i,t,e,r){const s={},l=new WeakMap;function c(g){const v=g.target;v.index!==null&&t.remove(v.index);for(const b in v.attributes)t.remove(v.attributes[b]);v.removeEventListener("dispose",c),delete s[v.id];const y=l.get(v);y&&(t.remove(y),l.delete(v)),r.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,e.memory.geometries--}function f(g,v){return s[v.id]===!0||(v.addEventListener("dispose",c),s[v.id]=!0,e.memory.geometries++),v}function d(g){const v=g.attributes;for(const y in v)t.update(v[y],i.ARRAY_BUFFER)}function h(g){const v=[],y=g.index,b=g.attributes.position;let R=0;if(y!==null){const D=y.array;R=y.version;for(let S=0,E=D.length;S<E;S+=3){const A=D[S+0],L=D[S+1],P=D[S+2];v.push(A,L,L,P,P,A)}}else if(b!==void 0){const D=b.array;R=b.version;for(let S=0,E=D.length/3-1;S<E;S+=3){const A=S+0,L=S+1,P=S+2;v.push(A,L,L,P,P,A)}}else return;const M=new(YS(v)?tM:$S)(v,1);M.version=R;const x=l.get(g);x&&t.remove(x),l.set(g,M)}function m(g){const v=l.get(g);if(v){const y=g.index;y!==null&&v.version<y.version&&h(g)}else h(g);return l.get(g)}return{get:f,update:d,getWireframeAttribute:m}}function CL(i,t,e){let r;function s(v){r=v}let l,c;function f(v){l=v.type,c=v.bytesPerElement}function d(v,y){i.drawElements(r,y,l,v*c),e.update(y,r,1)}function h(v,y,b){b!==0&&(i.drawElementsInstanced(r,y,l,v*c,b),e.update(y,r,b))}function m(v,y,b){if(b===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,y,0,l,v,0,b);let M=0;for(let x=0;x<b;x++)M+=y[x];e.update(M,r,1)}function g(v,y,b,R){if(b===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let x=0;x<v.length;x++)h(v[x]/c,y[x],R[x]);else{M.multiDrawElementsInstancedWEBGL(r,y,0,l,v,0,R,0,b);let x=0;for(let D=0;D<b;D++)x+=y[D]*R[D];e.update(x,r,1)}}this.setMode=s,this.setIndex=f,this.render=d,this.renderInstances=h,this.renderMultiDraw=m,this.renderMultiDrawInstances=g}function DL(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,c,f){switch(e.calls++,c){case i.TRIANGLES:e.triangles+=f*(l/3);break;case i.LINES:e.lines+=f*(l/2);break;case i.LINE_STRIP:e.lines+=f*(l-1);break;case i.LINE_LOOP:e.lines+=f*l;break;case i.POINTS:e.points+=f*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",c);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:r}}function LL(i,t,e){const r=new WeakMap,s=new ln;function l(c,f,d){const h=c.morphTargetInfluences,m=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,g=m!==void 0?m.length:0;let v=r.get(f);if(v===void 0||v.count!==g){let T=function(){O.dispose(),r.delete(f),f.removeEventListener("dispose",T)};var y=T;v!==void 0&&v.texture.dispose();const b=f.morphAttributes.position!==void 0,R=f.morphAttributes.normal!==void 0,M=f.morphAttributes.color!==void 0,x=f.morphAttributes.position||[],D=f.morphAttributes.normal||[],S=f.morphAttributes.color||[];let E=0;b===!0&&(E=1),R===!0&&(E=2),M===!0&&(E=3);let A=f.attributes.position.count*E,L=1;A>t.maxTextureSize&&(L=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const P=new Float32Array(A*L*4*g),O=new ZS(P,A,L,g);O.type=Tr,O.needsUpdate=!0;const C=E*4;for(let N=0;N<g;N++){const k=x[N],q=D[N],K=S[N],X=A*L*4*N;for(let H=0;H<k.count;H++){const Z=H*C;b===!0&&(s.fromBufferAttribute(k,H),P[X+Z+0]=s.x,P[X+Z+1]=s.y,P[X+Z+2]=s.z,P[X+Z+3]=0),R===!0&&(s.fromBufferAttribute(q,H),P[X+Z+4]=s.x,P[X+Z+5]=s.y,P[X+Z+6]=s.z,P[X+Z+7]=0),M===!0&&(s.fromBufferAttribute(K,H),P[X+Z+8]=s.x,P[X+Z+9]=s.y,P[X+Z+10]=s.z,P[X+Z+11]=K.itemSize===4?s.w:1)}}v={count:g,texture:O,size:new me(A,L)},r.set(f,v),f.addEventListener("dispose",T)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)d.getUniforms().setValue(i,"morphTexture",c.morphTexture,e);else{let b=0;for(let M=0;M<h.length;M++)b+=h[M];const R=f.morphTargetsRelative?1:1-b;d.getUniforms().setValue(i,"morphTargetBaseInfluence",R),d.getUniforms().setValue(i,"morphTargetInfluences",h)}d.getUniforms().setValue(i,"morphTargetsTexture",v.texture,e),d.getUniforms().setValue(i,"morphTargetsTextureSize",v.size)}return{update:l}}function UL(i,t,e,r){let s=new WeakMap;function l(d){const h=r.render.frame,m=d.geometry,g=t.get(d,m);if(s.get(g)!==h&&(t.update(g),s.set(g,h)),d.isInstancedMesh&&(d.hasEventListener("dispose",f)===!1&&d.addEventListener("dispose",f),s.get(d)!==h&&(e.update(d.instanceMatrix,i.ARRAY_BUFFER),d.instanceColor!==null&&e.update(d.instanceColor,i.ARRAY_BUFFER),s.set(d,h))),d.isSkinnedMesh){const v=d.skeleton;s.get(v)!==h&&(v.update(),s.set(v,h))}return g}function c(){s=new WeakMap}function f(d){const h=d.target;h.removeEventListener("dispose",f),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:l,dispose:c}}const oM=new jn,Zy=new aM(1,1),lM=new ZS,uM=new t2,cM=new iM,Ky=[],Qy=[],Jy=new Float32Array(16),$y=new Float32Array(9),tx=new Float32Array(4);function uo(i,t,e){const r=i[0];if(r<=0||r>0)return i;const s=t*e;let l=Ky[s];if(l===void 0&&(l=new Float32Array(s),Ky[s]=l),t!==0){r.toArray(l,0);for(let c=1,f=0;c!==t;++c)f+=e,i[c].toArray(l,f)}return l}function Sn(i,t){if(i.length!==t.length)return!1;for(let e=0,r=i.length;e<r;e++)if(i[e]!==t[e])return!1;return!0}function Mn(i,t){for(let e=0,r=t.length;e<r;e++)i[e]=t[e]}function kc(i,t){let e=Qy[t];e===void 0&&(e=new Int32Array(t),Qy[t]=e);for(let r=0;r!==t;++r)e[r]=i.allocateTextureUnit();return e}function NL(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function PL(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Sn(e,t))return;i.uniform2fv(this.addr,t),Mn(e,t)}}function OL(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Sn(e,t))return;i.uniform3fv(this.addr,t),Mn(e,t)}}function zL(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Sn(e,t))return;i.uniform4fv(this.addr,t),Mn(e,t)}}function IL(i,t){const e=this.cache,r=t.elements;if(r===void 0){if(Sn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Mn(e,t)}else{if(Sn(e,r))return;tx.set(r),i.uniformMatrix2fv(this.addr,!1,tx),Mn(e,r)}}function FL(i,t){const e=this.cache,r=t.elements;if(r===void 0){if(Sn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Mn(e,t)}else{if(Sn(e,r))return;$y.set(r),i.uniformMatrix3fv(this.addr,!1,$y),Mn(e,r)}}function BL(i,t){const e=this.cache,r=t.elements;if(r===void 0){if(Sn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Mn(e,t)}else{if(Sn(e,r))return;Jy.set(r),i.uniformMatrix4fv(this.addr,!1,Jy),Mn(e,r)}}function kL(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function HL(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Sn(e,t))return;i.uniform2iv(this.addr,t),Mn(e,t)}}function VL(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Sn(e,t))return;i.uniform3iv(this.addr,t),Mn(e,t)}}function GL(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Sn(e,t))return;i.uniform4iv(this.addr,t),Mn(e,t)}}function qL(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function XL(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Sn(e,t))return;i.uniform2uiv(this.addr,t),Mn(e,t)}}function WL(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Sn(e,t))return;i.uniform3uiv(this.addr,t),Mn(e,t)}}function jL(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Sn(e,t))return;i.uniform4uiv(this.addr,t),Mn(e,t)}}function YL(i,t,e){const r=this.cache,s=e.allocateTextureUnit();r[0]!==s&&(i.uniform1i(this.addr,s),r[0]=s);let l;this.type===i.SAMPLER_2D_SHADOW?(Zy.compareFunction=jS,l=Zy):l=oM,e.setTexture2D(t||l,s)}function ZL(i,t,e){const r=this.cache,s=e.allocateTextureUnit();r[0]!==s&&(i.uniform1i(this.addr,s),r[0]=s),e.setTexture3D(t||uM,s)}function KL(i,t,e){const r=this.cache,s=e.allocateTextureUnit();r[0]!==s&&(i.uniform1i(this.addr,s),r[0]=s),e.setTextureCube(t||cM,s)}function QL(i,t,e){const r=this.cache,s=e.allocateTextureUnit();r[0]!==s&&(i.uniform1i(this.addr,s),r[0]=s),e.setTexture2DArray(t||lM,s)}function JL(i){switch(i){case 5126:return NL;case 35664:return PL;case 35665:return OL;case 35666:return zL;case 35674:return IL;case 35675:return FL;case 35676:return BL;case 5124:case 35670:return kL;case 35667:case 35671:return HL;case 35668:case 35672:return VL;case 35669:case 35673:return GL;case 5125:return qL;case 36294:return XL;case 36295:return WL;case 36296:return jL;case 35678:case 36198:case 36298:case 36306:case 35682:return YL;case 35679:case 36299:case 36307:return ZL;case 35680:case 36300:case 36308:case 36293:return KL;case 36289:case 36303:case 36311:case 36292:return QL}}function $L(i,t){i.uniform1fv(this.addr,t)}function tU(i,t){const e=uo(t,this.size,2);i.uniform2fv(this.addr,e)}function eU(i,t){const e=uo(t,this.size,3);i.uniform3fv(this.addr,e)}function nU(i,t){const e=uo(t,this.size,4);i.uniform4fv(this.addr,e)}function iU(i,t){const e=uo(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function rU(i,t){const e=uo(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function aU(i,t){const e=uo(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function sU(i,t){i.uniform1iv(this.addr,t)}function oU(i,t){i.uniform2iv(this.addr,t)}function lU(i,t){i.uniform3iv(this.addr,t)}function uU(i,t){i.uniform4iv(this.addr,t)}function cU(i,t){i.uniform1uiv(this.addr,t)}function fU(i,t){i.uniform2uiv(this.addr,t)}function hU(i,t){i.uniform3uiv(this.addr,t)}function dU(i,t){i.uniform4uiv(this.addr,t)}function pU(i,t,e){const r=this.cache,s=t.length,l=kc(e,s);Sn(r,l)||(i.uniform1iv(this.addr,l),Mn(r,l));for(let c=0;c!==s;++c)e.setTexture2D(t[c]||oM,l[c])}function mU(i,t,e){const r=this.cache,s=t.length,l=kc(e,s);Sn(r,l)||(i.uniform1iv(this.addr,l),Mn(r,l));for(let c=0;c!==s;++c)e.setTexture3D(t[c]||uM,l[c])}function gU(i,t,e){const r=this.cache,s=t.length,l=kc(e,s);Sn(r,l)||(i.uniform1iv(this.addr,l),Mn(r,l));for(let c=0;c!==s;++c)e.setTextureCube(t[c]||cM,l[c])}function _U(i,t,e){const r=this.cache,s=t.length,l=kc(e,s);Sn(r,l)||(i.uniform1iv(this.addr,l),Mn(r,l));for(let c=0;c!==s;++c)e.setTexture2DArray(t[c]||lM,l[c])}function vU(i){switch(i){case 5126:return $L;case 35664:return tU;case 35665:return eU;case 35666:return nU;case 35674:return iU;case 35675:return rU;case 35676:return aU;case 5124:case 35670:return sU;case 35667:case 35671:return oU;case 35668:case 35672:return lU;case 35669:case 35673:return uU;case 5125:return cU;case 36294:return fU;case 36295:return hU;case 36296:return dU;case 35678:case 36198:case 36298:case 36306:case 35682:return pU;case 35679:case 36299:case 36307:return mU;case 35680:case 36300:case 36308:case 36293:return gU;case 36289:case 36303:case 36311:case 36292:return _U}}class yU{constructor(t,e,r){this.id=t,this.addr=r,this.cache=[],this.type=e.type,this.setValue=JL(e.type)}}class xU{constructor(t,e,r){this.id=t,this.addr=r,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=vU(e.type)}}class SU{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,r){const s=this.seq;for(let l=0,c=s.length;l!==c;++l){const f=s[l];f.setValue(t,e[f.id],r)}}}const Bd=/(\w+)(\])?(\[|\.)?/g;function ex(i,t){i.seq.push(t),i.map[t.id]=t}function MU(i,t,e){const r=i.name,s=r.length;for(Bd.lastIndex=0;;){const l=Bd.exec(r),c=Bd.lastIndex;let f=l[1];const d=l[2]==="]",h=l[3];if(d&&(f=f|0),h===void 0||h==="["&&c+2===s){ex(e,h===void 0?new yU(f,i,t):new xU(f,i,t));break}else{let g=e.map[f];g===void 0&&(g=new SU(f),ex(e,g)),e=g}}}class Ec{constructor(t,e){this.seq=[],this.map={};const r=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<r;++s){const l=t.getActiveUniform(e,s),c=t.getUniformLocation(e,l.name);MU(l,c,this)}}setValue(t,e,r,s){const l=this.map[e];l!==void 0&&l.setValue(t,r,s)}setOptional(t,e,r){const s=e[r];s!==void 0&&this.setValue(t,r,s)}static upload(t,e,r,s){for(let l=0,c=e.length;l!==c;++l){const f=e[l],d=r[f.id];d.needsUpdate!==!1&&f.setValue(t,d.value,s)}}static seqWithValue(t,e){const r=[];for(let s=0,l=t.length;s!==l;++s){const c=t[s];c.id in e&&r.push(c)}return r}}function nx(i,t,e){const r=i.createShader(t);return i.shaderSource(r,e),i.compileShader(r),r}const EU=37297;let bU=0;function TU(i,t){const e=i.split(`
`),r=[],s=Math.max(t-6,0),l=Math.min(t+6,e.length);for(let c=s;c<l;c++){const f=c+1;r.push(`${f===t?">":" "} ${f}: ${e[c]}`)}return r.join(`
`)}const ix=new fe;function AU(i){Ce._getMatrix(ix,Ce.workingColorSpace,i);const t=`mat3( ${ix.elements.map(e=>e.toFixed(4))} )`;switch(Ce.getTransfer(i)){case Cc:return[t,"LinearTransferOETF"];case Ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function rx(i,t,e){const r=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(r&&s==="")return"";const l=/ERROR: 0:(\d+)/.exec(s);if(l){const c=parseInt(l[1]);return e.toUpperCase()+`

`+s+`

`+TU(i.getShaderSource(t),c)}else return s}function RU(i,t){const e=AU(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function wU(i,t){let e;switch(t){case TC:e="Linear";break;case AC:e="Reinhard";break;case RC:e="Cineon";break;case wC:e="ACESFilmic";break;case DC:e="AgX";break;case LC:e="Neutral";break;case CC:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const dc=new ot;function CU(){Ce.getLuminanceCoefficients(dc);const i=dc.x.toFixed(4),t=dc.y.toFixed(4),e=dc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function DU(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hl).join(`
`)}function LU(i){const t=[];for(const e in i){const r=i[e];r!==!1&&t.push("#define "+e+" "+r)}return t.join(`
`)}function UU(i,t){const e={},r=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<r;s++){const l=i.getActiveAttrib(t,s),c=l.name;let f=1;l.type===i.FLOAT_MAT2&&(f=2),l.type===i.FLOAT_MAT3&&(f=3),l.type===i.FLOAT_MAT4&&(f=4),e[c]={type:l.type,location:i.getAttribLocation(t,c),locationSize:f}}return e}function hl(i){return i!==""}function ax(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sx(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const NU=/^[ \t]*#include +<([\w\d./]+)>/gm;function hm(i){return i.replace(NU,OU)}const PU=new Map;function OU(i,t){let e=de[t];if(e===void 0){const r=PU.get(t);if(r!==void 0)e=de[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,r);else throw new Error("Can not resolve #include <"+t+">")}return hm(e)}const zU=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ox(i){return i.replace(zU,IU)}function IU(i,t,e,r){let s="";for(let l=parseInt(t);l<parseInt(e);l++)s+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return s}function lx(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function FU(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===NS?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===rC?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===br&&(t="SHADOWMAP_TYPE_VSM"),t}function BU(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case no:case io:t="ENVMAP_TYPE_CUBE";break;case Ic:t="ENVMAP_TYPE_CUBE_UV";break}return t}function kU(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case io:t="ENVMAP_MODE_REFRACTION";break}return t}function HU(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case PS:t="ENVMAP_BLENDING_MULTIPLY";break;case EC:t="ENVMAP_BLENDING_MIX";break;case bC:t="ENVMAP_BLENDING_ADD";break}return t}function VU(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:r,maxMip:e}}function GU(i,t,e,r){const s=i.getContext(),l=e.defines;let c=e.vertexShader,f=e.fragmentShader;const d=FU(e),h=BU(e),m=kU(e),g=HU(e),v=VU(e),y=DU(e),b=LU(l),R=s.createProgram();let M,x,D=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(M=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,b].filter(hl).join(`
`),M.length>0&&(M+=`
`),x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,b].filter(hl).join(`
`),x.length>0&&(x+=`
`)):(M=[lx(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,b,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+m:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+d:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hl).join(`
`),x=[lx(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,b,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+m:"",e.envMap?"#define "+g:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+d:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==pa?"#define TONE_MAPPING":"",e.toneMapping!==pa?de.tonemapping_pars_fragment:"",e.toneMapping!==pa?wU("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",de.colorspace_pars_fragment,RU("linearToOutputTexel",e.outputColorSpace),CU(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(hl).join(`
`)),c=hm(c),c=ax(c,e),c=sx(c,e),f=hm(f),f=ax(f,e),f=sx(f,e),c=ox(c),f=ox(f),e.isRawShaderMaterial!==!0&&(D=`#version 300 es
`,M=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,x=["#define varying in",e.glslVersion===yy?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===yy?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const S=D+M+c,E=D+x+f,A=nx(s,s.VERTEX_SHADER,S),L=nx(s,s.FRAGMENT_SHADER,E);s.attachShader(R,A),s.attachShader(R,L),e.index0AttributeName!==void 0?s.bindAttribLocation(R,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(R,0,"position"),s.linkProgram(R);function P(N){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(R).trim(),q=s.getShaderInfoLog(A).trim(),K=s.getShaderInfoLog(L).trim();let X=!0,H=!0;if(s.getProgramParameter(R,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,R,A,L);else{const Z=rx(s,A,"vertex"),J=rx(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(R,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+k+`
`+Z+`
`+J)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(q===""||K==="")&&(H=!1);H&&(N.diagnostics={runnable:X,programLog:k,vertexShader:{log:q,prefix:M},fragmentShader:{log:K,prefix:x}})}s.deleteShader(A),s.deleteShader(L),O=new Ec(s,R),C=UU(s,R)}let O;this.getUniforms=function(){return O===void 0&&P(this),O};let C;this.getAttributes=function(){return C===void 0&&P(this),C};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=s.getProgramParameter(R,EU)),T},this.destroy=function(){r.releaseStatesOfProgram(this),s.deleteProgram(R),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=bU++,this.cacheKey=t,this.usedTimes=1,this.program=R,this.vertexShader=A,this.fragmentShader=L,this}let qU=0;class XU{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,r=t.fragmentShader,s=this._getShaderStage(e),l=this._getShaderStage(r),c=this._getShaderCacheForMaterial(t);return c.has(s)===!1&&(c.add(s),s.usedTimes++),c.has(l)===!1&&(c.add(l),l.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const r of e)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let r=e.get(t);return r===void 0&&(r=new Set,e.set(t,r)),r}_getShaderStage(t){const e=this.shaderCache;let r=e.get(t);return r===void 0&&(r=new WU(t),e.set(t,r)),r}}class WU{constructor(t){this.id=qU++,this.code=t,this.usedTimes=0}}function jU(i,t,e,r,s,l,c){const f=new KS,d=new XU,h=new Set,m=[],g=s.logarithmicDepthBuffer,v=s.vertexTextures;let y=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(C){return h.add(C),C===0?"uv":`uv${C}`}function M(C,T,N,k,q){const K=k.fog,X=q.geometry,H=C.isMeshStandardMaterial?k.environment:null,Z=(C.isMeshStandardMaterial?e:t).get(C.envMap||H),J=Z&&Z.mapping===Ic?Z.image.height:null,vt=b[C.type];C.precision!==null&&(y=s.getMaxPrecision(C.precision),y!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",y,"instead."));const w=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Y=w!==void 0?w.length:0;let ft=0;X.morphAttributes.position!==void 0&&(ft=1),X.morphAttributes.normal!==void 0&&(ft=2),X.morphAttributes.color!==void 0&&(ft=3);let B,tt,pt,gt;if(vt){const Ae=Xi[vt];B=Ae.vertexShader,tt=Ae.fragmentShader}else B=C.vertexShader,tt=C.fragmentShader,d.update(C),pt=d.getVertexShaderID(C),gt=d.getFragmentShaderID(C);const wt=i.getRenderTarget(),Lt=i.state.buffers.depth.getReversed(),ie=q.isInstancedMesh===!0,Gt=q.isBatchedMesh===!0,Pe=!!C.map,Oe=!!C.matcap,he=!!Z,j=!!C.aoMap,Dn=!!C.lightMap,ge=!!C.bumpMap,re=!!C.normalMap,qt=!!C.displacementMap,Le=!!C.emissiveMap,Vt=!!C.metalnessMap,V=!!C.roughnessMap,I=C.anisotropy>0,lt=C.clearcoat>0,bt=C.dispersion>0,W=C.iridescence>0,$=C.sheen>0,St=C.transmission>0,xt=I&&!!C.anisotropyMap,Tt=lt&&!!C.clearcoatMap,ae=lt&&!!C.clearcoatNormalMap,At=lt&&!!C.clearcoatRoughnessMap,Nt=W&&!!C.iridescenceMap,Xt=W&&!!C.iridescenceThicknessMap,jt=$&&!!C.sheenColorMap,Dt=$&&!!C.sheenRoughnessMap,oe=!!C.specularMap,Yt=!!C.specularColorMap,Fe=!!C.specularIntensityMap,et=St&&!!C.transmissionMap,zt=St&&!!C.thicknessMap,mt=!!C.gradientMap,Mt=!!C.alphaMap,Bt=C.alphaTest>0,It=!!C.alphaHash,le=!!C.extensions;let je=pa;C.toneMapped&&(wt===null||wt.isXRRenderTarget===!0)&&(je=i.toneMapping);const cn={shaderID:vt,shaderType:C.type,shaderName:C.name,vertexShader:B,fragmentShader:tt,defines:C.defines,customVertexShaderID:pt,customFragmentShaderID:gt,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:y,batching:Gt,batchingColor:Gt&&q._colorsTexture!==null,instancing:ie,instancingColor:ie&&q.instanceColor!==null,instancingMorph:ie&&q.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:wt===null?i.outputColorSpace:wt.isXRRenderTarget===!0?wt.texture.colorSpace:ro,alphaToCoverage:!!C.alphaToCoverage,map:Pe,matcap:Oe,envMap:he,envMapMode:he&&Z.mapping,envMapCubeUVHeight:J,aoMap:j,lightMap:Dn,bumpMap:ge,normalMap:re,displacementMap:v&&qt,emissiveMap:Le,normalMapObjectSpace:re&&C.normalMapType===OC,normalMapTangentSpace:re&&C.normalMapType===WS,metalnessMap:Vt,roughnessMap:V,anisotropy:I,anisotropyMap:xt,clearcoat:lt,clearcoatMap:Tt,clearcoatNormalMap:ae,clearcoatRoughnessMap:At,dispersion:bt,iridescence:W,iridescenceMap:Nt,iridescenceThicknessMap:Xt,sheen:$,sheenColorMap:jt,sheenRoughnessMap:Dt,specularMap:oe,specularColorMap:Yt,specularIntensityMap:Fe,transmission:St,transmissionMap:et,thicknessMap:zt,gradientMap:mt,opaque:C.transparent===!1&&C.blending===$s&&C.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Bt,alphaHash:It,combine:C.combine,mapUv:Pe&&R(C.map.channel),aoMapUv:j&&R(C.aoMap.channel),lightMapUv:Dn&&R(C.lightMap.channel),bumpMapUv:ge&&R(C.bumpMap.channel),normalMapUv:re&&R(C.normalMap.channel),displacementMapUv:qt&&R(C.displacementMap.channel),emissiveMapUv:Le&&R(C.emissiveMap.channel),metalnessMapUv:Vt&&R(C.metalnessMap.channel),roughnessMapUv:V&&R(C.roughnessMap.channel),anisotropyMapUv:xt&&R(C.anisotropyMap.channel),clearcoatMapUv:Tt&&R(C.clearcoatMap.channel),clearcoatNormalMapUv:ae&&R(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&R(C.clearcoatRoughnessMap.channel),iridescenceMapUv:Nt&&R(C.iridescenceMap.channel),iridescenceThicknessMapUv:Xt&&R(C.iridescenceThicknessMap.channel),sheenColorMapUv:jt&&R(C.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&R(C.sheenRoughnessMap.channel),specularMapUv:oe&&R(C.specularMap.channel),specularColorMapUv:Yt&&R(C.specularColorMap.channel),specularIntensityMapUv:Fe&&R(C.specularIntensityMap.channel),transmissionMapUv:et&&R(C.transmissionMap.channel),thicknessMapUv:zt&&R(C.thicknessMap.channel),alphaMapUv:Mt&&R(C.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(re||I),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!X.attributes.uv&&(Pe||Mt),fog:!!K,useFog:C.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:g,reverseDepthBuffer:Lt,skinning:q.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:ft,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:C.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,decodeVideoTexture:Pe&&C.map.isVideoTexture===!0&&Ce.getTransfer(C.map.colorSpace)===Ve,decodeVideoTextureEmissive:Le&&C.emissiveMap.isVideoTexture===!0&&Ce.getTransfer(C.emissiveMap.colorSpace)===Ve,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===ji,flipSided:C.side===ni,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:le&&C.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&C.extensions.multiDraw===!0||Gt)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return cn.vertexUv1s=h.has(1),cn.vertexUv2s=h.has(2),cn.vertexUv3s=h.has(3),h.clear(),cn}function x(C){const T=[];if(C.shaderID?T.push(C.shaderID):(T.push(C.customVertexShaderID),T.push(C.customFragmentShaderID)),C.defines!==void 0)for(const N in C.defines)T.push(N),T.push(C.defines[N]);return C.isRawShaderMaterial===!1&&(D(T,C),S(T,C),T.push(i.outputColorSpace)),T.push(C.customProgramCacheKey),T.join()}function D(C,T){C.push(T.precision),C.push(T.outputColorSpace),C.push(T.envMapMode),C.push(T.envMapCubeUVHeight),C.push(T.mapUv),C.push(T.alphaMapUv),C.push(T.lightMapUv),C.push(T.aoMapUv),C.push(T.bumpMapUv),C.push(T.normalMapUv),C.push(T.displacementMapUv),C.push(T.emissiveMapUv),C.push(T.metalnessMapUv),C.push(T.roughnessMapUv),C.push(T.anisotropyMapUv),C.push(T.clearcoatMapUv),C.push(T.clearcoatNormalMapUv),C.push(T.clearcoatRoughnessMapUv),C.push(T.iridescenceMapUv),C.push(T.iridescenceThicknessMapUv),C.push(T.sheenColorMapUv),C.push(T.sheenRoughnessMapUv),C.push(T.specularMapUv),C.push(T.specularColorMapUv),C.push(T.specularIntensityMapUv),C.push(T.transmissionMapUv),C.push(T.thicknessMapUv),C.push(T.combine),C.push(T.fogExp2),C.push(T.sizeAttenuation),C.push(T.morphTargetsCount),C.push(T.morphAttributeCount),C.push(T.numDirLights),C.push(T.numPointLights),C.push(T.numSpotLights),C.push(T.numSpotLightMaps),C.push(T.numHemiLights),C.push(T.numRectAreaLights),C.push(T.numDirLightShadows),C.push(T.numPointLightShadows),C.push(T.numSpotLightShadows),C.push(T.numSpotLightShadowsWithMaps),C.push(T.numLightProbes),C.push(T.shadowMapType),C.push(T.toneMapping),C.push(T.numClippingPlanes),C.push(T.numClipIntersection),C.push(T.depthPacking)}function S(C,T){f.disableAll(),T.supportsVertexTextures&&f.enable(0),T.instancing&&f.enable(1),T.instancingColor&&f.enable(2),T.instancingMorph&&f.enable(3),T.matcap&&f.enable(4),T.envMap&&f.enable(5),T.normalMapObjectSpace&&f.enable(6),T.normalMapTangentSpace&&f.enable(7),T.clearcoat&&f.enable(8),T.iridescence&&f.enable(9),T.alphaTest&&f.enable(10),T.vertexColors&&f.enable(11),T.vertexAlphas&&f.enable(12),T.vertexUv1s&&f.enable(13),T.vertexUv2s&&f.enable(14),T.vertexUv3s&&f.enable(15),T.vertexTangents&&f.enable(16),T.anisotropy&&f.enable(17),T.alphaHash&&f.enable(18),T.batching&&f.enable(19),T.dispersion&&f.enable(20),T.batchingColor&&f.enable(21),C.push(f.mask),f.disableAll(),T.fog&&f.enable(0),T.useFog&&f.enable(1),T.flatShading&&f.enable(2),T.logarithmicDepthBuffer&&f.enable(3),T.reverseDepthBuffer&&f.enable(4),T.skinning&&f.enable(5),T.morphTargets&&f.enable(6),T.morphNormals&&f.enable(7),T.morphColors&&f.enable(8),T.premultipliedAlpha&&f.enable(9),T.shadowMapEnabled&&f.enable(10),T.doubleSided&&f.enable(11),T.flipSided&&f.enable(12),T.useDepthPacking&&f.enable(13),T.dithering&&f.enable(14),T.transmission&&f.enable(15),T.sheen&&f.enable(16),T.opaque&&f.enable(17),T.pointsUvs&&f.enable(18),T.decodeVideoTexture&&f.enable(19),T.decodeVideoTextureEmissive&&f.enable(20),T.alphaToCoverage&&f.enable(21),C.push(f.mask)}function E(C){const T=b[C.type];let N;if(T){const k=Xi[T];N=d2.clone(k.uniforms)}else N=C.uniforms;return N}function A(C,T){let N;for(let k=0,q=m.length;k<q;k++){const K=m[k];if(K.cacheKey===T){N=K,++N.usedTimes;break}}return N===void 0&&(N=new GU(i,T,C,l),m.push(N)),N}function L(C){if(--C.usedTimes===0){const T=m.indexOf(C);m[T]=m[m.length-1],m.pop(),C.destroy()}}function P(C){d.remove(C)}function O(){d.dispose()}return{getParameters:M,getProgramCacheKey:x,getUniforms:E,acquireProgram:A,releaseProgram:L,releaseShaderCache:P,programs:m,dispose:O}}function YU(){let i=new WeakMap;function t(c){return i.has(c)}function e(c){let f=i.get(c);return f===void 0&&(f={},i.set(c,f)),f}function r(c){i.delete(c)}function s(c,f,d){i.get(c)[f]=d}function l(){i=new WeakMap}return{has:t,get:e,remove:r,update:s,dispose:l}}function ZU(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ux(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function cx(){const i=[];let t=0;const e=[],r=[],s=[];function l(){t=0,e.length=0,r.length=0,s.length=0}function c(g,v,y,b,R,M){let x=i[t];return x===void 0?(x={id:g.id,object:g,geometry:v,material:y,groupOrder:b,renderOrder:g.renderOrder,z:R,group:M},i[t]=x):(x.id=g.id,x.object=g,x.geometry=v,x.material=y,x.groupOrder=b,x.renderOrder=g.renderOrder,x.z=R,x.group=M),t++,x}function f(g,v,y,b,R,M){const x=c(g,v,y,b,R,M);y.transmission>0?r.push(x):y.transparent===!0?s.push(x):e.push(x)}function d(g,v,y,b,R,M){const x=c(g,v,y,b,R,M);y.transmission>0?r.unshift(x):y.transparent===!0?s.unshift(x):e.unshift(x)}function h(g,v){e.length>1&&e.sort(g||ZU),r.length>1&&r.sort(v||ux),s.length>1&&s.sort(v||ux)}function m(){for(let g=t,v=i.length;g<v;g++){const y=i[g];if(y.id===null)break;y.id=null,y.object=null,y.geometry=null,y.material=null,y.group=null}}return{opaque:e,transmissive:r,transparent:s,init:l,push:f,unshift:d,finish:m,sort:h}}function KU(){let i=new WeakMap;function t(r,s){const l=i.get(r);let c;return l===void 0?(c=new cx,i.set(r,[c])):s>=l.length?(c=new cx,l.push(c)):c=l[s],c}function e(){i=new WeakMap}return{get:t,dispose:e}}function QU(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new ot,color:new De};break;case"SpotLight":e={position:new ot,direction:new ot,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new ot,color:new De,distance:0,decay:0};break;case"HemisphereLight":e={direction:new ot,skyColor:new De,groundColor:new De};break;case"RectAreaLight":e={color:new De,position:new ot,halfWidth:new ot,halfHeight:new ot};break}return i[t.id]=e,e}}}function JU(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let $U=0;function tN(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function eN(i){const t=new QU,e=JU(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new ot);const s=new ot,l=new un,c=new un;function f(h){let m=0,g=0,v=0;for(let C=0;C<9;C++)r.probe[C].set(0,0,0);let y=0,b=0,R=0,M=0,x=0,D=0,S=0,E=0,A=0,L=0,P=0;h.sort(tN);for(let C=0,T=h.length;C<T;C++){const N=h[C],k=N.color,q=N.intensity,K=N.distance,X=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)m+=k.r*q,g+=k.g*q,v+=k.b*q;else if(N.isLightProbe){for(let H=0;H<9;H++)r.probe[H].addScaledVector(N.sh.coefficients[H],q);P++}else if(N.isDirectionalLight){const H=t.get(N);if(H.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const Z=N.shadow,J=e.get(N);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,r.directionalShadow[y]=J,r.directionalShadowMap[y]=X,r.directionalShadowMatrix[y]=N.shadow.matrix,D++}r.directional[y]=H,y++}else if(N.isSpotLight){const H=t.get(N);H.position.setFromMatrixPosition(N.matrixWorld),H.color.copy(k).multiplyScalar(q),H.distance=K,H.coneCos=Math.cos(N.angle),H.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),H.decay=N.decay,r.spot[R]=H;const Z=N.shadow;if(N.map&&(r.spotLightMap[A]=N.map,A++,Z.updateMatrices(N),N.castShadow&&L++),r.spotLightMatrix[R]=Z.matrix,N.castShadow){const J=e.get(N);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,r.spotShadow[R]=J,r.spotShadowMap[R]=X,E++}R++}else if(N.isRectAreaLight){const H=t.get(N);H.color.copy(k).multiplyScalar(q),H.halfWidth.set(N.width*.5,0,0),H.halfHeight.set(0,N.height*.5,0),r.rectArea[M]=H,M++}else if(N.isPointLight){const H=t.get(N);if(H.color.copy(N.color).multiplyScalar(N.intensity),H.distance=N.distance,H.decay=N.decay,N.castShadow){const Z=N.shadow,J=e.get(N);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,J.shadowCameraNear=Z.camera.near,J.shadowCameraFar=Z.camera.far,r.pointShadow[b]=J,r.pointShadowMap[b]=X,r.pointShadowMatrix[b]=N.shadow.matrix,S++}r.point[b]=H,b++}else if(N.isHemisphereLight){const H=t.get(N);H.skyColor.copy(N.color).multiplyScalar(q),H.groundColor.copy(N.groundColor).multiplyScalar(q),r.hemi[x]=H,x++}}M>0&&(i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ot.LTC_FLOAT_1,r.rectAreaLTC2=Ot.LTC_FLOAT_2):(r.rectAreaLTC1=Ot.LTC_HALF_1,r.rectAreaLTC2=Ot.LTC_HALF_2)),r.ambient[0]=m,r.ambient[1]=g,r.ambient[2]=v;const O=r.hash;(O.directionalLength!==y||O.pointLength!==b||O.spotLength!==R||O.rectAreaLength!==M||O.hemiLength!==x||O.numDirectionalShadows!==D||O.numPointShadows!==S||O.numSpotShadows!==E||O.numSpotMaps!==A||O.numLightProbes!==P)&&(r.directional.length=y,r.spot.length=R,r.rectArea.length=M,r.point.length=b,r.hemi.length=x,r.directionalShadow.length=D,r.directionalShadowMap.length=D,r.pointShadow.length=S,r.pointShadowMap.length=S,r.spotShadow.length=E,r.spotShadowMap.length=E,r.directionalShadowMatrix.length=D,r.pointShadowMatrix.length=S,r.spotLightMatrix.length=E+A-L,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=L,r.numLightProbes=P,O.directionalLength=y,O.pointLength=b,O.spotLength=R,O.rectAreaLength=M,O.hemiLength=x,O.numDirectionalShadows=D,O.numPointShadows=S,O.numSpotShadows=E,O.numSpotMaps=A,O.numLightProbes=P,r.version=$U++)}function d(h,m){let g=0,v=0,y=0,b=0,R=0;const M=m.matrixWorldInverse;for(let x=0,D=h.length;x<D;x++){const S=h[x];if(S.isDirectionalLight){const E=r.directional[g];E.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(M),g++}else if(S.isSpotLight){const E=r.spot[y];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(M),E.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(M),y++}else if(S.isRectAreaLight){const E=r.rectArea[b];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(M),c.identity(),l.copy(S.matrixWorld),l.premultiply(M),c.extractRotation(l),E.halfWidth.set(S.width*.5,0,0),E.halfHeight.set(0,S.height*.5,0),E.halfWidth.applyMatrix4(c),E.halfHeight.applyMatrix4(c),b++}else if(S.isPointLight){const E=r.point[v];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(M),v++}else if(S.isHemisphereLight){const E=r.hemi[R];E.direction.setFromMatrixPosition(S.matrixWorld),E.direction.transformDirection(M),R++}}}return{setup:f,setupView:d,state:r}}function fx(i){const t=new eN(i),e=[],r=[];function s(m){h.camera=m,e.length=0,r.length=0}function l(m){e.push(m)}function c(m){r.push(m)}function f(){t.setup(e)}function d(m){t.setupView(e,m)}const h={lightsArray:e,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:f,setupLightsView:d,pushLight:l,pushShadow:c}}function nN(i){let t=new WeakMap;function e(s,l=0){const c=t.get(s);let f;return c===void 0?(f=new fx(i),t.set(s,[f])):l>=c.length?(f=new fx(i),c.push(f)):f=c[l],f}function r(){t=new WeakMap}return{get:e,dispose:r}}const iN=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rN=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function aN(i,t,e){let r=new rM;const s=new me,l=new me,c=new ln,f=new A2({depthPacking:PC}),d=new R2,h={},m=e.maxTextureSize,g={[ga]:ni,[ni]:ga,[ji]:ji},v=new Dr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:iN,fragmentShader:rN}),y=v.clone();y.defines.HORIZONTAL_PASS=1;const b=new $i;b.setAttribute("position",new gi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const R=new Ki(b,v),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=NS;let x=this.type;this.render=function(L,P,O){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||L.length===0)return;const C=i.getRenderTarget(),T=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),k=i.state;k.setBlending(da),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const q=x!==br&&this.type===br,K=x===br&&this.type!==br;for(let X=0,H=L.length;X<H;X++){const Z=L[X],J=Z.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;s.copy(J.mapSize);const vt=J.getFrameExtents();if(s.multiply(vt),l.copy(J.mapSize),(s.x>m||s.y>m)&&(s.x>m&&(l.x=Math.floor(m/vt.x),s.x=l.x*vt.x,J.mapSize.x=l.x),s.y>m&&(l.y=Math.floor(m/vt.y),s.y=l.y*vt.y,J.mapSize.y=l.y)),J.map===null||q===!0||K===!0){const Y=this.type!==br?{minFilter:Ii,magFilter:Ii}:{};J.map!==null&&J.map.dispose(),J.map=new Ka(s.x,s.y,Y),J.map.texture.name=Z.name+".shadowMap",J.camera.updateProjectionMatrix()}i.setRenderTarget(J.map),i.clear();const w=J.getViewportCount();for(let Y=0;Y<w;Y++){const ft=J.getViewport(Y);c.set(l.x*ft.x,l.y*ft.y,l.x*ft.z,l.y*ft.w),k.viewport(c),J.updateMatrices(Z,Y),r=J.getFrustum(),E(P,O,J.camera,Z,this.type)}J.isPointLightShadow!==!0&&this.type===br&&D(J,O),J.needsUpdate=!1}x=this.type,M.needsUpdate=!1,i.setRenderTarget(C,T,N)};function D(L,P){const O=t.update(R);v.defines.VSM_SAMPLES!==L.blurSamples&&(v.defines.VSM_SAMPLES=L.blurSamples,y.defines.VSM_SAMPLES=L.blurSamples,v.needsUpdate=!0,y.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Ka(s.x,s.y)),v.uniforms.shadow_pass.value=L.map.texture,v.uniforms.resolution.value=L.mapSize,v.uniforms.radius.value=L.radius,i.setRenderTarget(L.mapPass),i.clear(),i.renderBufferDirect(P,null,O,v,R,null),y.uniforms.shadow_pass.value=L.mapPass.texture,y.uniforms.resolution.value=L.mapSize,y.uniforms.radius.value=L.radius,i.setRenderTarget(L.map),i.clear(),i.renderBufferDirect(P,null,O,y,R,null)}function S(L,P,O,C){let T=null;const N=O.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(N!==void 0)T=N;else if(T=O.isPointLight===!0?d:f,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const k=T.uuid,q=P.uuid;let K=h[k];K===void 0&&(K={},h[k]=K);let X=K[q];X===void 0&&(X=T.clone(),K[q]=X,P.addEventListener("dispose",A)),T=X}if(T.visible=P.visible,T.wireframe=P.wireframe,C===br?T.side=P.shadowSide!==null?P.shadowSide:P.side:T.side=P.shadowSide!==null?P.shadowSide:g[P.side],T.alphaMap=P.alphaMap,T.alphaTest=P.alphaTest,T.map=P.map,T.clipShadows=P.clipShadows,T.clippingPlanes=P.clippingPlanes,T.clipIntersection=P.clipIntersection,T.displacementMap=P.displacementMap,T.displacementScale=P.displacementScale,T.displacementBias=P.displacementBias,T.wireframeLinewidth=P.wireframeLinewidth,T.linewidth=P.linewidth,O.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const k=i.properties.get(T);k.light=O}return T}function E(L,P,O,C,T){if(L.visible===!1)return;if(L.layers.test(P.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&T===br)&&(!L.frustumCulled||r.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,L.matrixWorld);const q=t.update(L),K=L.material;if(Array.isArray(K)){const X=q.groups;for(let H=0,Z=X.length;H<Z;H++){const J=X[H],vt=K[J.materialIndex];if(vt&&vt.visible){const w=S(L,vt,C,T);L.onBeforeShadow(i,L,P,O,q,w,J),i.renderBufferDirect(O,null,q,w,L,J),L.onAfterShadow(i,L,P,O,q,w,J)}}}else if(K.visible){const X=S(L,K,C,T);L.onBeforeShadow(i,L,P,O,q,X,null),i.renderBufferDirect(O,null,q,X,L,null),L.onAfterShadow(i,L,P,O,q,X,null)}}const k=L.children;for(let q=0,K=k.length;q<K;q++)E(k[q],P,O,C,T)}function A(L){L.target.removeEventListener("dispose",A);for(const O in h){const C=h[O],T=L.target.uuid;T in C&&(C[T].dispose(),delete C[T])}}}const sN={[Ap]:Rp,[wp]:Lp,[Cp]:Up,[eo]:Dp,[Rp]:Ap,[Lp]:wp,[Up]:Cp,[Dp]:eo};function oN(i,t){function e(){let et=!1;const zt=new ln;let mt=null;const Mt=new ln(0,0,0,0);return{setMask:function(Bt){mt!==Bt&&!et&&(i.colorMask(Bt,Bt,Bt,Bt),mt=Bt)},setLocked:function(Bt){et=Bt},setClear:function(Bt,It,le,je,cn){cn===!0&&(Bt*=je,It*=je,le*=je),zt.set(Bt,It,le,je),Mt.equals(zt)===!1&&(i.clearColor(Bt,It,le,je),Mt.copy(zt))},reset:function(){et=!1,mt=null,Mt.set(-1,0,0,0)}}}function r(){let et=!1,zt=!1,mt=null,Mt=null,Bt=null;return{setReversed:function(It){if(zt!==It){const le=t.get("EXT_clip_control");It?le.clipControlEXT(le.LOWER_LEFT_EXT,le.ZERO_TO_ONE_EXT):le.clipControlEXT(le.LOWER_LEFT_EXT,le.NEGATIVE_ONE_TO_ONE_EXT),zt=It;const je=Bt;Bt=null,this.setClear(je)}},getReversed:function(){return zt},setTest:function(It){It?wt(i.DEPTH_TEST):Lt(i.DEPTH_TEST)},setMask:function(It){mt!==It&&!et&&(i.depthMask(It),mt=It)},setFunc:function(It){if(zt&&(It=sN[It]),Mt!==It){switch(It){case Ap:i.depthFunc(i.NEVER);break;case Rp:i.depthFunc(i.ALWAYS);break;case wp:i.depthFunc(i.LESS);break;case eo:i.depthFunc(i.LEQUAL);break;case Cp:i.depthFunc(i.EQUAL);break;case Dp:i.depthFunc(i.GEQUAL);break;case Lp:i.depthFunc(i.GREATER);break;case Up:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Mt=It}},setLocked:function(It){et=It},setClear:function(It){Bt!==It&&(zt&&(It=1-It),i.clearDepth(It),Bt=It)},reset:function(){et=!1,mt=null,Mt=null,Bt=null,zt=!1}}}function s(){let et=!1,zt=null,mt=null,Mt=null,Bt=null,It=null,le=null,je=null,cn=null;return{setTest:function(Ae){et||(Ae?wt(i.STENCIL_TEST):Lt(i.STENCIL_TEST))},setMask:function(Ae){zt!==Ae&&!et&&(i.stencilMask(Ae),zt=Ae)},setFunc:function(Ae,ii,En){(mt!==Ae||Mt!==ii||Bt!==En)&&(i.stencilFunc(Ae,ii,En),mt=Ae,Mt=ii,Bt=En)},setOp:function(Ae,ii,En){(It!==Ae||le!==ii||je!==En)&&(i.stencilOp(Ae,ii,En),It=Ae,le=ii,je=En)},setLocked:function(Ae){et=Ae},setClear:function(Ae){cn!==Ae&&(i.clearStencil(Ae),cn=Ae)},reset:function(){et=!1,zt=null,mt=null,Mt=null,Bt=null,It=null,le=null,je=null,cn=null}}}const l=new e,c=new r,f=new s,d=new WeakMap,h=new WeakMap;let m={},g={},v=new WeakMap,y=[],b=null,R=!1,M=null,x=null,D=null,S=null,E=null,A=null,L=null,P=new De(0,0,0),O=0,C=!1,T=null,N=null,k=null,q=null,K=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,Z=0;const J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(J)[1]),H=Z>=1):J.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),H=Z>=2);let vt=null,w={};const Y=i.getParameter(i.SCISSOR_BOX),ft=i.getParameter(i.VIEWPORT),B=new ln().fromArray(Y),tt=new ln().fromArray(ft);function pt(et,zt,mt,Mt){const Bt=new Uint8Array(4),It=i.createTexture();i.bindTexture(et,It),i.texParameteri(et,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(et,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let le=0;le<mt;le++)et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?i.texImage3D(zt,0,i.RGBA,1,1,Mt,0,i.RGBA,i.UNSIGNED_BYTE,Bt):i.texImage2D(zt+le,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Bt);return It}const gt={};gt[i.TEXTURE_2D]=pt(i.TEXTURE_2D,i.TEXTURE_2D,1),gt[i.TEXTURE_CUBE_MAP]=pt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),gt[i.TEXTURE_2D_ARRAY]=pt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),gt[i.TEXTURE_3D]=pt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),l.setClear(0,0,0,1),c.setClear(1),f.setClear(0),wt(i.DEPTH_TEST),c.setFunc(eo),ge(!1),re(my),wt(i.CULL_FACE),j(da);function wt(et){m[et]!==!0&&(i.enable(et),m[et]=!0)}function Lt(et){m[et]!==!1&&(i.disable(et),m[et]=!1)}function ie(et,zt){return g[et]!==zt?(i.bindFramebuffer(et,zt),g[et]=zt,et===i.DRAW_FRAMEBUFFER&&(g[i.FRAMEBUFFER]=zt),et===i.FRAMEBUFFER&&(g[i.DRAW_FRAMEBUFFER]=zt),!0):!1}function Gt(et,zt){let mt=y,Mt=!1;if(et){mt=v.get(zt),mt===void 0&&(mt=[],v.set(zt,mt));const Bt=et.textures;if(mt.length!==Bt.length||mt[0]!==i.COLOR_ATTACHMENT0){for(let It=0,le=Bt.length;It<le;It++)mt[It]=i.COLOR_ATTACHMENT0+It;mt.length=Bt.length,Mt=!0}}else mt[0]!==i.BACK&&(mt[0]=i.BACK,Mt=!0);Mt&&i.drawBuffers(mt)}function Pe(et){return b!==et?(i.useProgram(et),b=et,!0):!1}const Oe={[qa]:i.FUNC_ADD,[sC]:i.FUNC_SUBTRACT,[oC]:i.FUNC_REVERSE_SUBTRACT};Oe[lC]=i.MIN,Oe[uC]=i.MAX;const he={[cC]:i.ZERO,[fC]:i.ONE,[hC]:i.SRC_COLOR,[bp]:i.SRC_ALPHA,[vC]:i.SRC_ALPHA_SATURATE,[gC]:i.DST_COLOR,[pC]:i.DST_ALPHA,[dC]:i.ONE_MINUS_SRC_COLOR,[Tp]:i.ONE_MINUS_SRC_ALPHA,[_C]:i.ONE_MINUS_DST_COLOR,[mC]:i.ONE_MINUS_DST_ALPHA,[yC]:i.CONSTANT_COLOR,[xC]:i.ONE_MINUS_CONSTANT_COLOR,[SC]:i.CONSTANT_ALPHA,[MC]:i.ONE_MINUS_CONSTANT_ALPHA};function j(et,zt,mt,Mt,Bt,It,le,je,cn,Ae){if(et===da){R===!0&&(Lt(i.BLEND),R=!1);return}if(R===!1&&(wt(i.BLEND),R=!0),et!==aC){if(et!==M||Ae!==C){if((x!==qa||E!==qa)&&(i.blendEquation(i.FUNC_ADD),x=qa,E=qa),Ae)switch(et){case $s:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ep:i.blendFunc(i.ONE,i.ONE);break;case gy:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case _y:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",et);break}else switch(et){case $s:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ep:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case gy:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case _y:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",et);break}D=null,S=null,A=null,L=null,P.set(0,0,0),O=0,M=et,C=Ae}return}Bt=Bt||zt,It=It||mt,le=le||Mt,(zt!==x||Bt!==E)&&(i.blendEquationSeparate(Oe[zt],Oe[Bt]),x=zt,E=Bt),(mt!==D||Mt!==S||It!==A||le!==L)&&(i.blendFuncSeparate(he[mt],he[Mt],he[It],he[le]),D=mt,S=Mt,A=It,L=le),(je.equals(P)===!1||cn!==O)&&(i.blendColor(je.r,je.g,je.b,cn),P.copy(je),O=cn),M=et,C=!1}function Dn(et,zt){et.side===ji?Lt(i.CULL_FACE):wt(i.CULL_FACE);let mt=et.side===ni;zt&&(mt=!mt),ge(mt),et.blending===$s&&et.transparent===!1?j(da):j(et.blending,et.blendEquation,et.blendSrc,et.blendDst,et.blendEquationAlpha,et.blendSrcAlpha,et.blendDstAlpha,et.blendColor,et.blendAlpha,et.premultipliedAlpha),c.setFunc(et.depthFunc),c.setTest(et.depthTest),c.setMask(et.depthWrite),l.setMask(et.colorWrite);const Mt=et.stencilWrite;f.setTest(Mt),Mt&&(f.setMask(et.stencilWriteMask),f.setFunc(et.stencilFunc,et.stencilRef,et.stencilFuncMask),f.setOp(et.stencilFail,et.stencilZFail,et.stencilZPass)),Le(et.polygonOffset,et.polygonOffsetFactor,et.polygonOffsetUnits),et.alphaToCoverage===!0?wt(i.SAMPLE_ALPHA_TO_COVERAGE):Lt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ge(et){T!==et&&(et?i.frontFace(i.CW):i.frontFace(i.CCW),T=et)}function re(et){et!==nC?(wt(i.CULL_FACE),et!==N&&(et===my?i.cullFace(i.BACK):et===iC?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Lt(i.CULL_FACE),N=et}function qt(et){et!==k&&(H&&i.lineWidth(et),k=et)}function Le(et,zt,mt){et?(wt(i.POLYGON_OFFSET_FILL),(q!==zt||K!==mt)&&(i.polygonOffset(zt,mt),q=zt,K=mt)):Lt(i.POLYGON_OFFSET_FILL)}function Vt(et){et?wt(i.SCISSOR_TEST):Lt(i.SCISSOR_TEST)}function V(et){et===void 0&&(et=i.TEXTURE0+X-1),vt!==et&&(i.activeTexture(et),vt=et)}function I(et,zt,mt){mt===void 0&&(vt===null?mt=i.TEXTURE0+X-1:mt=vt);let Mt=w[mt];Mt===void 0&&(Mt={type:void 0,texture:void 0},w[mt]=Mt),(Mt.type!==et||Mt.texture!==zt)&&(vt!==mt&&(i.activeTexture(mt),vt=mt),i.bindTexture(et,zt||gt[et]),Mt.type=et,Mt.texture=zt)}function lt(){const et=w[vt];et!==void 0&&et.type!==void 0&&(i.bindTexture(et.type,null),et.type=void 0,et.texture=void 0)}function bt(){try{i.compressedTexImage2D(...arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function W(){try{i.compressedTexImage3D(...arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function $(){try{i.texSubImage2D(...arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function St(){try{i.texSubImage3D(...arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function xt(){try{i.compressedTexSubImage2D(...arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function Tt(){try{i.compressedTexSubImage3D(...arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function ae(){try{i.texStorage2D(...arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function At(){try{i.texStorage3D(...arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function Nt(){try{i.texImage2D(...arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function Xt(){try{i.texImage3D(...arguments)}catch(et){console.error("THREE.WebGLState:",et)}}function jt(et){B.equals(et)===!1&&(i.scissor(et.x,et.y,et.z,et.w),B.copy(et))}function Dt(et){tt.equals(et)===!1&&(i.viewport(et.x,et.y,et.z,et.w),tt.copy(et))}function oe(et,zt){let mt=h.get(zt);mt===void 0&&(mt=new WeakMap,h.set(zt,mt));let Mt=mt.get(et);Mt===void 0&&(Mt=i.getUniformBlockIndex(zt,et.name),mt.set(et,Mt))}function Yt(et,zt){const Mt=h.get(zt).get(et);d.get(zt)!==Mt&&(i.uniformBlockBinding(zt,Mt,et.__bindingPointIndex),d.set(zt,Mt))}function Fe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),c.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),m={},vt=null,w={},g={},v=new WeakMap,y=[],b=null,R=!1,M=null,x=null,D=null,S=null,E=null,A=null,L=null,P=new De(0,0,0),O=0,C=!1,T=null,N=null,k=null,q=null,K=null,B.set(0,0,i.canvas.width,i.canvas.height),tt.set(0,0,i.canvas.width,i.canvas.height),l.reset(),c.reset(),f.reset()}return{buffers:{color:l,depth:c,stencil:f},enable:wt,disable:Lt,bindFramebuffer:ie,drawBuffers:Gt,useProgram:Pe,setBlending:j,setMaterial:Dn,setFlipSided:ge,setCullFace:re,setLineWidth:qt,setPolygonOffset:Le,setScissorTest:Vt,activeTexture:V,bindTexture:I,unbindTexture:lt,compressedTexImage2D:bt,compressedTexImage3D:W,texImage2D:Nt,texImage3D:Xt,updateUBOMapping:oe,uniformBlockBinding:Yt,texStorage2D:ae,texStorage3D:At,texSubImage2D:$,texSubImage3D:St,compressedTexSubImage2D:xt,compressedTexSubImage3D:Tt,scissor:jt,viewport:Dt,reset:Fe}}function lN(i,t,e,r,s,l,c){const f=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new me,m=new WeakMap;let g;const v=new WeakMap;let y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(V,I){return y?new OffscreenCanvas(V,I):Ml("canvas")}function R(V,I,lt){let bt=1;const W=Vt(V);if((W.width>lt||W.height>lt)&&(bt=lt/Math.max(W.width,W.height)),bt<1)if(typeof HTMLImageElement<"u"&&V instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&V instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&V instanceof ImageBitmap||typeof VideoFrame<"u"&&V instanceof VideoFrame){const $=Math.floor(bt*W.width),St=Math.floor(bt*W.height);g===void 0&&(g=b($,St));const xt=I?b($,St):g;return xt.width=$,xt.height=St,xt.getContext("2d").drawImage(V,0,0,$,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+$+"x"+St+")."),xt}else return"data"in V&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),V;return V}function M(V){return V.generateMipmaps}function x(V){i.generateMipmap(V)}function D(V){return V.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:V.isWebGL3DRenderTarget?i.TEXTURE_3D:V.isWebGLArrayRenderTarget||V.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(V,I,lt,bt,W=!1){if(V!==null){if(i[V]!==void 0)return i[V];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+V+"'")}let $=I;if(I===i.RED&&(lt===i.FLOAT&&($=i.R32F),lt===i.HALF_FLOAT&&($=i.R16F),lt===i.UNSIGNED_BYTE&&($=i.R8)),I===i.RED_INTEGER&&(lt===i.UNSIGNED_BYTE&&($=i.R8UI),lt===i.UNSIGNED_SHORT&&($=i.R16UI),lt===i.UNSIGNED_INT&&($=i.R32UI),lt===i.BYTE&&($=i.R8I),lt===i.SHORT&&($=i.R16I),lt===i.INT&&($=i.R32I)),I===i.RG&&(lt===i.FLOAT&&($=i.RG32F),lt===i.HALF_FLOAT&&($=i.RG16F),lt===i.UNSIGNED_BYTE&&($=i.RG8)),I===i.RG_INTEGER&&(lt===i.UNSIGNED_BYTE&&($=i.RG8UI),lt===i.UNSIGNED_SHORT&&($=i.RG16UI),lt===i.UNSIGNED_INT&&($=i.RG32UI),lt===i.BYTE&&($=i.RG8I),lt===i.SHORT&&($=i.RG16I),lt===i.INT&&($=i.RG32I)),I===i.RGB_INTEGER&&(lt===i.UNSIGNED_BYTE&&($=i.RGB8UI),lt===i.UNSIGNED_SHORT&&($=i.RGB16UI),lt===i.UNSIGNED_INT&&($=i.RGB32UI),lt===i.BYTE&&($=i.RGB8I),lt===i.SHORT&&($=i.RGB16I),lt===i.INT&&($=i.RGB32I)),I===i.RGBA_INTEGER&&(lt===i.UNSIGNED_BYTE&&($=i.RGBA8UI),lt===i.UNSIGNED_SHORT&&($=i.RGBA16UI),lt===i.UNSIGNED_INT&&($=i.RGBA32UI),lt===i.BYTE&&($=i.RGBA8I),lt===i.SHORT&&($=i.RGBA16I),lt===i.INT&&($=i.RGBA32I)),I===i.RGB&&lt===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),I===i.RGBA){const St=W?Cc:Ce.getTransfer(bt);lt===i.FLOAT&&($=i.RGBA32F),lt===i.HALF_FLOAT&&($=i.RGBA16F),lt===i.UNSIGNED_BYTE&&($=St===Ve?i.SRGB8_ALPHA8:i.RGBA8),lt===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),lt===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function E(V,I){let lt;return V?I===null||I===Za||I===yl?lt=i.DEPTH24_STENCIL8:I===Tr?lt=i.DEPTH32F_STENCIL8:I===vl&&(lt=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):I===null||I===Za||I===yl?lt=i.DEPTH_COMPONENT24:I===Tr?lt=i.DEPTH_COMPONENT32F:I===vl&&(lt=i.DEPTH_COMPONENT16),lt}function A(V,I){return M(V)===!0||V.isFramebufferTexture&&V.minFilter!==Ii&&V.minFilter!==Zi?Math.log2(Math.max(I.width,I.height))+1:V.mipmaps!==void 0&&V.mipmaps.length>0?V.mipmaps.length:V.isCompressedTexture&&Array.isArray(V.image)?I.mipmaps.length:1}function L(V){const I=V.target;I.removeEventListener("dispose",L),O(I),I.isVideoTexture&&m.delete(I)}function P(V){const I=V.target;I.removeEventListener("dispose",P),T(I)}function O(V){const I=r.get(V);if(I.__webglInit===void 0)return;const lt=V.source,bt=v.get(lt);if(bt){const W=bt[I.__cacheKey];W.usedTimes--,W.usedTimes===0&&C(V),Object.keys(bt).length===0&&v.delete(lt)}r.remove(V)}function C(V){const I=r.get(V);i.deleteTexture(I.__webglTexture);const lt=V.source,bt=v.get(lt);delete bt[I.__cacheKey],c.memory.textures--}function T(V){const I=r.get(V);if(V.depthTexture&&(V.depthTexture.dispose(),r.remove(V.depthTexture)),V.isWebGLCubeRenderTarget)for(let bt=0;bt<6;bt++){if(Array.isArray(I.__webglFramebuffer[bt]))for(let W=0;W<I.__webglFramebuffer[bt].length;W++)i.deleteFramebuffer(I.__webglFramebuffer[bt][W]);else i.deleteFramebuffer(I.__webglFramebuffer[bt]);I.__webglDepthbuffer&&i.deleteRenderbuffer(I.__webglDepthbuffer[bt])}else{if(Array.isArray(I.__webglFramebuffer))for(let bt=0;bt<I.__webglFramebuffer.length;bt++)i.deleteFramebuffer(I.__webglFramebuffer[bt]);else i.deleteFramebuffer(I.__webglFramebuffer);if(I.__webglDepthbuffer&&i.deleteRenderbuffer(I.__webglDepthbuffer),I.__webglMultisampledFramebuffer&&i.deleteFramebuffer(I.__webglMultisampledFramebuffer),I.__webglColorRenderbuffer)for(let bt=0;bt<I.__webglColorRenderbuffer.length;bt++)I.__webglColorRenderbuffer[bt]&&i.deleteRenderbuffer(I.__webglColorRenderbuffer[bt]);I.__webglDepthRenderbuffer&&i.deleteRenderbuffer(I.__webglDepthRenderbuffer)}const lt=V.textures;for(let bt=0,W=lt.length;bt<W;bt++){const $=r.get(lt[bt]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),c.memory.textures--),r.remove(lt[bt])}r.remove(V)}let N=0;function k(){N=0}function q(){const V=N;return V>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+V+" texture units while this GPU supports only "+s.maxTextures),N+=1,V}function K(V){const I=[];return I.push(V.wrapS),I.push(V.wrapT),I.push(V.wrapR||0),I.push(V.magFilter),I.push(V.minFilter),I.push(V.anisotropy),I.push(V.internalFormat),I.push(V.format),I.push(V.type),I.push(V.generateMipmaps),I.push(V.premultiplyAlpha),I.push(V.flipY),I.push(V.unpackAlignment),I.push(V.colorSpace),I.join()}function X(V,I){const lt=r.get(V);if(V.isVideoTexture&&qt(V),V.isRenderTargetTexture===!1&&V.version>0&&lt.__version!==V.version){const bt=V.image;if(bt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(bt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(lt,V,I);return}}e.bindTexture(i.TEXTURE_2D,lt.__webglTexture,i.TEXTURE0+I)}function H(V,I){const lt=r.get(V);if(V.version>0&&lt.__version!==V.version){tt(lt,V,I);return}e.bindTexture(i.TEXTURE_2D_ARRAY,lt.__webglTexture,i.TEXTURE0+I)}function Z(V,I){const lt=r.get(V);if(V.version>0&&lt.__version!==V.version){tt(lt,V,I);return}e.bindTexture(i.TEXTURE_3D,lt.__webglTexture,i.TEXTURE0+I)}function J(V,I){const lt=r.get(V);if(V.version>0&&lt.__version!==V.version){pt(lt,V,I);return}e.bindTexture(i.TEXTURE_CUBE_MAP,lt.__webglTexture,i.TEXTURE0+I)}const vt={[wc]:i.REPEAT,[Wa]:i.CLAMP_TO_EDGE,[Op]:i.MIRRORED_REPEAT},w={[Ii]:i.NEAREST,[UC]:i.NEAREST_MIPMAP_NEAREST,[qu]:i.NEAREST_MIPMAP_LINEAR,[Zi]:i.LINEAR,[fd]:i.LINEAR_MIPMAP_NEAREST,[ja]:i.LINEAR_MIPMAP_LINEAR},Y={[zC]:i.NEVER,[VC]:i.ALWAYS,[IC]:i.LESS,[jS]:i.LEQUAL,[FC]:i.EQUAL,[HC]:i.GEQUAL,[BC]:i.GREATER,[kC]:i.NOTEQUAL};function ft(V,I){if(I.type===Tr&&t.has("OES_texture_float_linear")===!1&&(I.magFilter===Zi||I.magFilter===fd||I.magFilter===qu||I.magFilter===ja||I.minFilter===Zi||I.minFilter===fd||I.minFilter===qu||I.minFilter===ja)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(V,i.TEXTURE_WRAP_S,vt[I.wrapS]),i.texParameteri(V,i.TEXTURE_WRAP_T,vt[I.wrapT]),(V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY)&&i.texParameteri(V,i.TEXTURE_WRAP_R,vt[I.wrapR]),i.texParameteri(V,i.TEXTURE_MAG_FILTER,w[I.magFilter]),i.texParameteri(V,i.TEXTURE_MIN_FILTER,w[I.minFilter]),I.compareFunction&&(i.texParameteri(V,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(V,i.TEXTURE_COMPARE_FUNC,Y[I.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(I.magFilter===Ii||I.minFilter!==qu&&I.minFilter!==ja||I.type===Tr&&t.has("OES_texture_float_linear")===!1)return;if(I.anisotropy>1||r.get(I).__currentAnisotropy){const lt=t.get("EXT_texture_filter_anisotropic");i.texParameterf(V,lt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(I.anisotropy,s.getMaxAnisotropy())),r.get(I).__currentAnisotropy=I.anisotropy}}}function B(V,I){let lt=!1;V.__webglInit===void 0&&(V.__webglInit=!0,I.addEventListener("dispose",L));const bt=I.source;let W=v.get(bt);W===void 0&&(W={},v.set(bt,W));const $=K(I);if($!==V.__cacheKey){W[$]===void 0&&(W[$]={texture:i.createTexture(),usedTimes:0},c.memory.textures++,lt=!0),W[$].usedTimes++;const St=W[V.__cacheKey];St!==void 0&&(W[V.__cacheKey].usedTimes--,St.usedTimes===0&&C(I)),V.__cacheKey=$,V.__webglTexture=W[$].texture}return lt}function tt(V,I,lt){let bt=i.TEXTURE_2D;(I.isDataArrayTexture||I.isCompressedArrayTexture)&&(bt=i.TEXTURE_2D_ARRAY),I.isData3DTexture&&(bt=i.TEXTURE_3D);const W=B(V,I),$=I.source;e.bindTexture(bt,V.__webglTexture,i.TEXTURE0+lt);const St=r.get($);if($.version!==St.__version||W===!0){e.activeTexture(i.TEXTURE0+lt);const xt=Ce.getPrimaries(Ce.workingColorSpace),Tt=I.colorSpace===fa?null:Ce.getPrimaries(I.colorSpace),ae=I.colorSpace===fa||xt===Tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,I.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,I.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);let At=R(I.image,!1,s.maxTextureSize);At=Le(I,At);const Nt=l.convert(I.format,I.colorSpace),Xt=l.convert(I.type);let jt=S(I.internalFormat,Nt,Xt,I.colorSpace,I.isVideoTexture);ft(bt,I);let Dt;const oe=I.mipmaps,Yt=I.isVideoTexture!==!0,Fe=St.__version===void 0||W===!0,et=$.dataReady,zt=A(I,At);if(I.isDepthTexture)jt=E(I.format===Sl,I.type),Fe&&(Yt?e.texStorage2D(i.TEXTURE_2D,1,jt,At.width,At.height):e.texImage2D(i.TEXTURE_2D,0,jt,At.width,At.height,0,Nt,Xt,null));else if(I.isDataTexture)if(oe.length>0){Yt&&Fe&&e.texStorage2D(i.TEXTURE_2D,zt,jt,oe[0].width,oe[0].height);for(let mt=0,Mt=oe.length;mt<Mt;mt++)Dt=oe[mt],Yt?et&&e.texSubImage2D(i.TEXTURE_2D,mt,0,0,Dt.width,Dt.height,Nt,Xt,Dt.data):e.texImage2D(i.TEXTURE_2D,mt,jt,Dt.width,Dt.height,0,Nt,Xt,Dt.data);I.generateMipmaps=!1}else Yt?(Fe&&e.texStorage2D(i.TEXTURE_2D,zt,jt,At.width,At.height),et&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,At.width,At.height,Nt,Xt,At.data)):e.texImage2D(i.TEXTURE_2D,0,jt,At.width,At.height,0,Nt,Xt,At.data);else if(I.isCompressedTexture)if(I.isCompressedArrayTexture){Yt&&Fe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,zt,jt,oe[0].width,oe[0].height,At.depth);for(let mt=0,Mt=oe.length;mt<Mt;mt++)if(Dt=oe[mt],I.format!==zi)if(Nt!==null)if(Yt){if(et)if(I.layerUpdates.size>0){const Bt=Hy(Dt.width,Dt.height,I.format,I.type);for(const It of I.layerUpdates){const le=Dt.data.subarray(It*Bt/Dt.data.BYTES_PER_ELEMENT,(It+1)*Bt/Dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,mt,0,0,It,Dt.width,Dt.height,1,Nt,le)}I.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,mt,0,0,0,Dt.width,Dt.height,At.depth,Nt,Dt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,mt,jt,Dt.width,Dt.height,At.depth,0,Dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Yt?et&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,mt,0,0,0,Dt.width,Dt.height,At.depth,Nt,Xt,Dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,mt,jt,Dt.width,Dt.height,At.depth,0,Nt,Xt,Dt.data)}else{Yt&&Fe&&e.texStorage2D(i.TEXTURE_2D,zt,jt,oe[0].width,oe[0].height);for(let mt=0,Mt=oe.length;mt<Mt;mt++)Dt=oe[mt],I.format!==zi?Nt!==null?Yt?et&&e.compressedTexSubImage2D(i.TEXTURE_2D,mt,0,0,Dt.width,Dt.height,Nt,Dt.data):e.compressedTexImage2D(i.TEXTURE_2D,mt,jt,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Yt?et&&e.texSubImage2D(i.TEXTURE_2D,mt,0,0,Dt.width,Dt.height,Nt,Xt,Dt.data):e.texImage2D(i.TEXTURE_2D,mt,jt,Dt.width,Dt.height,0,Nt,Xt,Dt.data)}else if(I.isDataArrayTexture)if(Yt){if(Fe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,zt,jt,At.width,At.height,At.depth),et)if(I.layerUpdates.size>0){const mt=Hy(At.width,At.height,I.format,I.type);for(const Mt of I.layerUpdates){const Bt=At.data.subarray(Mt*mt/At.data.BYTES_PER_ELEMENT,(Mt+1)*mt/At.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Mt,At.width,At.height,1,Nt,Xt,Bt)}I.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,Nt,Xt,At.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,jt,At.width,At.height,At.depth,0,Nt,Xt,At.data);else if(I.isData3DTexture)Yt?(Fe&&e.texStorage3D(i.TEXTURE_3D,zt,jt,At.width,At.height,At.depth),et&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,Nt,Xt,At.data)):e.texImage3D(i.TEXTURE_3D,0,jt,At.width,At.height,At.depth,0,Nt,Xt,At.data);else if(I.isFramebufferTexture){if(Fe)if(Yt)e.texStorage2D(i.TEXTURE_2D,zt,jt,At.width,At.height);else{let mt=At.width,Mt=At.height;for(let Bt=0;Bt<zt;Bt++)e.texImage2D(i.TEXTURE_2D,Bt,jt,mt,Mt,0,Nt,Xt,null),mt>>=1,Mt>>=1}}else if(oe.length>0){if(Yt&&Fe){const mt=Vt(oe[0]);e.texStorage2D(i.TEXTURE_2D,zt,jt,mt.width,mt.height)}for(let mt=0,Mt=oe.length;mt<Mt;mt++)Dt=oe[mt],Yt?et&&e.texSubImage2D(i.TEXTURE_2D,mt,0,0,Nt,Xt,Dt):e.texImage2D(i.TEXTURE_2D,mt,jt,Nt,Xt,Dt);I.generateMipmaps=!1}else if(Yt){if(Fe){const mt=Vt(At);e.texStorage2D(i.TEXTURE_2D,zt,jt,mt.width,mt.height)}et&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Nt,Xt,At)}else e.texImage2D(i.TEXTURE_2D,0,jt,Nt,Xt,At);M(I)&&x(bt),St.__version=$.version,I.onUpdate&&I.onUpdate(I)}V.__version=I.version}function pt(V,I,lt){if(I.image.length!==6)return;const bt=B(V,I),W=I.source;e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+lt);const $=r.get(W);if(W.version!==$.__version||bt===!0){e.activeTexture(i.TEXTURE0+lt);const St=Ce.getPrimaries(Ce.workingColorSpace),xt=I.colorSpace===fa?null:Ce.getPrimaries(I.colorSpace),Tt=I.colorSpace===fa||St===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,I.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,I.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);const ae=I.isCompressedTexture||I.image[0].isCompressedTexture,At=I.image[0]&&I.image[0].isDataTexture,Nt=[];for(let Mt=0;Mt<6;Mt++)!ae&&!At?Nt[Mt]=R(I.image[Mt],!0,s.maxCubemapSize):Nt[Mt]=At?I.image[Mt].image:I.image[Mt],Nt[Mt]=Le(I,Nt[Mt]);const Xt=Nt[0],jt=l.convert(I.format,I.colorSpace),Dt=l.convert(I.type),oe=S(I.internalFormat,jt,Dt,I.colorSpace),Yt=I.isVideoTexture!==!0,Fe=$.__version===void 0||bt===!0,et=W.dataReady;let zt=A(I,Xt);ft(i.TEXTURE_CUBE_MAP,I);let mt;if(ae){Yt&&Fe&&e.texStorage2D(i.TEXTURE_CUBE_MAP,zt,oe,Xt.width,Xt.height);for(let Mt=0;Mt<6;Mt++){mt=Nt[Mt].mipmaps;for(let Bt=0;Bt<mt.length;Bt++){const It=mt[Bt];I.format!==zi?jt!==null?Yt?et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Bt,0,0,It.width,It.height,jt,It.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Bt,oe,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Yt?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Bt,0,0,It.width,It.height,jt,Dt,It.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Bt,oe,It.width,It.height,0,jt,Dt,It.data)}}}else{if(mt=I.mipmaps,Yt&&Fe){mt.length>0&&zt++;const Mt=Vt(Nt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,zt,oe,Mt.width,Mt.height)}for(let Mt=0;Mt<6;Mt++)if(At){Yt?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,Nt[Mt].width,Nt[Mt].height,jt,Dt,Nt[Mt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,oe,Nt[Mt].width,Nt[Mt].height,0,jt,Dt,Nt[Mt].data);for(let Bt=0;Bt<mt.length;Bt++){const le=mt[Bt].image[Mt].image;Yt?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Bt+1,0,0,le.width,le.height,jt,Dt,le.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Bt+1,oe,le.width,le.height,0,jt,Dt,le.data)}}else{Yt?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,jt,Dt,Nt[Mt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,oe,jt,Dt,Nt[Mt]);for(let Bt=0;Bt<mt.length;Bt++){const It=mt[Bt];Yt?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Bt+1,0,0,jt,Dt,It.image[Mt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Bt+1,oe,jt,Dt,It.image[Mt])}}}M(I)&&x(i.TEXTURE_CUBE_MAP),$.__version=W.version,I.onUpdate&&I.onUpdate(I)}V.__version=I.version}function gt(V,I,lt,bt,W,$){const St=l.convert(lt.format,lt.colorSpace),xt=l.convert(lt.type),Tt=S(lt.internalFormat,St,xt,lt.colorSpace),ae=r.get(I),At=r.get(lt);if(At.__renderTarget=I,!ae.__hasExternalTextures){const Nt=Math.max(1,I.width>>$),Xt=Math.max(1,I.height>>$);W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?e.texImage3D(W,$,Tt,Nt,Xt,I.depth,0,St,xt,null):e.texImage2D(W,$,Tt,Nt,Xt,0,St,xt,null)}e.bindFramebuffer(i.FRAMEBUFFER,V),re(I)?f.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,bt,W,At.__webglTexture,0,ge(I)):(W===i.TEXTURE_2D||W>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,bt,W,At.__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function wt(V,I,lt){if(i.bindRenderbuffer(i.RENDERBUFFER,V),I.depthBuffer){const bt=I.depthTexture,W=bt&&bt.isDepthTexture?bt.type:null,$=E(I.stencilBuffer,W),St=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=ge(I);re(I)?f.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt,$,I.width,I.height):lt?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt,$,I.width,I.height):i.renderbufferStorage(i.RENDERBUFFER,$,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,V)}else{const bt=I.textures;for(let W=0;W<bt.length;W++){const $=bt[W],St=l.convert($.format,$.colorSpace),xt=l.convert($.type),Tt=S($.internalFormat,St,xt,$.colorSpace),ae=ge(I);lt&&re(I)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,Tt,I.width,I.height):re(I)?f.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,Tt,I.width,I.height):i.renderbufferStorage(i.RENDERBUFFER,Tt,I.width,I.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Lt(V,I){if(I&&I.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,V),!(I.depthTexture&&I.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const bt=r.get(I.depthTexture);bt.__renderTarget=I,(!bt.__webglTexture||I.depthTexture.image.width!==I.width||I.depthTexture.image.height!==I.height)&&(I.depthTexture.image.width=I.width,I.depthTexture.image.height=I.height,I.depthTexture.needsUpdate=!0),X(I.depthTexture,0);const W=bt.__webglTexture,$=ge(I);if(I.depthTexture.format===xl)re(I)?f.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,W,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,W,0);else if(I.depthTexture.format===Sl)re(I)?f.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,W,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,W,0);else throw new Error("Unknown depthTexture format")}function ie(V){const I=r.get(V),lt=V.isWebGLCubeRenderTarget===!0;if(I.__boundDepthTexture!==V.depthTexture){const bt=V.depthTexture;if(I.__depthDisposeCallback&&I.__depthDisposeCallback(),bt){const W=()=>{delete I.__boundDepthTexture,delete I.__depthDisposeCallback,bt.removeEventListener("dispose",W)};bt.addEventListener("dispose",W),I.__depthDisposeCallback=W}I.__boundDepthTexture=bt}if(V.depthTexture&&!I.__autoAllocateDepthBuffer){if(lt)throw new Error("target.depthTexture not supported in Cube render targets");Lt(I.__webglFramebuffer,V)}else if(lt){I.__webglDepthbuffer=[];for(let bt=0;bt<6;bt++)if(e.bindFramebuffer(i.FRAMEBUFFER,I.__webglFramebuffer[bt]),I.__webglDepthbuffer[bt]===void 0)I.__webglDepthbuffer[bt]=i.createRenderbuffer(),wt(I.__webglDepthbuffer[bt],V,!1);else{const W=V.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=I.__webglDepthbuffer[bt];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,I.__webglFramebuffer),I.__webglDepthbuffer===void 0)I.__webglDepthbuffer=i.createRenderbuffer(),wt(I.__webglDepthbuffer,V,!1);else{const bt=V.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=I.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,bt,i.RENDERBUFFER,W)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Gt(V,I,lt){const bt=r.get(V);I!==void 0&&gt(bt.__webglFramebuffer,V,V.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),lt!==void 0&&ie(V)}function Pe(V){const I=V.texture,lt=r.get(V),bt=r.get(I);V.addEventListener("dispose",P);const W=V.textures,$=V.isWebGLCubeRenderTarget===!0,St=W.length>1;if(St||(bt.__webglTexture===void 0&&(bt.__webglTexture=i.createTexture()),bt.__version=I.version,c.memory.textures++),$){lt.__webglFramebuffer=[];for(let xt=0;xt<6;xt++)if(I.mipmaps&&I.mipmaps.length>0){lt.__webglFramebuffer[xt]=[];for(let Tt=0;Tt<I.mipmaps.length;Tt++)lt.__webglFramebuffer[xt][Tt]=i.createFramebuffer()}else lt.__webglFramebuffer[xt]=i.createFramebuffer()}else{if(I.mipmaps&&I.mipmaps.length>0){lt.__webglFramebuffer=[];for(let xt=0;xt<I.mipmaps.length;xt++)lt.__webglFramebuffer[xt]=i.createFramebuffer()}else lt.__webglFramebuffer=i.createFramebuffer();if(St)for(let xt=0,Tt=W.length;xt<Tt;xt++){const ae=r.get(W[xt]);ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture(),c.memory.textures++)}if(V.samples>0&&re(V)===!1){lt.__webglMultisampledFramebuffer=i.createFramebuffer(),lt.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer);for(let xt=0;xt<W.length;xt++){const Tt=W[xt];lt.__webglColorRenderbuffer[xt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,lt.__webglColorRenderbuffer[xt]);const ae=l.convert(Tt.format,Tt.colorSpace),At=l.convert(Tt.type),Nt=S(Tt.internalFormat,ae,At,Tt.colorSpace,V.isXRRenderTarget===!0),Xt=ge(V);i.renderbufferStorageMultisample(i.RENDERBUFFER,Xt,Nt,V.width,V.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,lt.__webglColorRenderbuffer[xt])}i.bindRenderbuffer(i.RENDERBUFFER,null),V.depthBuffer&&(lt.__webglDepthRenderbuffer=i.createRenderbuffer(),wt(lt.__webglDepthRenderbuffer,V,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,bt.__webglTexture),ft(i.TEXTURE_CUBE_MAP,I);for(let xt=0;xt<6;xt++)if(I.mipmaps&&I.mipmaps.length>0)for(let Tt=0;Tt<I.mipmaps.length;Tt++)gt(lt.__webglFramebuffer[xt][Tt],V,I,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Tt);else gt(lt.__webglFramebuffer[xt],V,I,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0);M(I)&&x(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let xt=0,Tt=W.length;xt<Tt;xt++){const ae=W[xt],At=r.get(ae);e.bindTexture(i.TEXTURE_2D,At.__webglTexture),ft(i.TEXTURE_2D,ae),gt(lt.__webglFramebuffer,V,ae,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,0),M(ae)&&x(i.TEXTURE_2D)}e.unbindTexture()}else{let xt=i.TEXTURE_2D;if((V.isWebGL3DRenderTarget||V.isWebGLArrayRenderTarget)&&(xt=V.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(xt,bt.__webglTexture),ft(xt,I),I.mipmaps&&I.mipmaps.length>0)for(let Tt=0;Tt<I.mipmaps.length;Tt++)gt(lt.__webglFramebuffer[Tt],V,I,i.COLOR_ATTACHMENT0,xt,Tt);else gt(lt.__webglFramebuffer,V,I,i.COLOR_ATTACHMENT0,xt,0);M(I)&&x(xt),e.unbindTexture()}V.depthBuffer&&ie(V)}function Oe(V){const I=V.textures;for(let lt=0,bt=I.length;lt<bt;lt++){const W=I[lt];if(M(W)){const $=D(V),St=r.get(W).__webglTexture;e.bindTexture($,St),x($),e.unbindTexture()}}}const he=[],j=[];function Dn(V){if(V.samples>0){if(re(V)===!1){const I=V.textures,lt=V.width,bt=V.height;let W=i.COLOR_BUFFER_BIT;const $=V.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=r.get(V),xt=I.length>1;if(xt)for(let Tt=0;Tt<I.length;Tt++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let Tt=0;Tt<I.length;Tt++){if(V.resolveDepthBuffer&&(V.depthBuffer&&(W|=i.DEPTH_BUFFER_BIT),V.stencilBuffer&&V.resolveStencilBuffer&&(W|=i.STENCIL_BUFFER_BIT)),xt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[Tt]);const ae=r.get(I[Tt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ae,0)}i.blitFramebuffer(0,0,lt,bt,0,0,lt,bt,W,i.NEAREST),d===!0&&(he.length=0,j.length=0,he.push(i.COLOR_ATTACHMENT0+Tt),V.depthBuffer&&V.resolveDepthBuffer===!1&&(he.push($),j.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,j)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,he))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),xt)for(let Tt=0;Tt<I.length;Tt++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,St.__webglColorRenderbuffer[Tt]);const ae=r.get(I[Tt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,ae,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(V.depthBuffer&&V.resolveDepthBuffer===!1&&d){const I=V.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[I])}}}function ge(V){return Math.min(s.maxSamples,V.samples)}function re(V){const I=r.get(V);return V.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&I.__useRenderToTexture!==!1}function qt(V){const I=c.render.frame;m.get(V)!==I&&(m.set(V,I),V.update())}function Le(V,I){const lt=V.colorSpace,bt=V.format,W=V.type;return V.isCompressedTexture===!0||V.isVideoTexture===!0||lt!==ro&&lt!==fa&&(Ce.getTransfer(lt)===Ve?(bt!==zi||W!==wr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",lt)),I}function Vt(V){return typeof HTMLImageElement<"u"&&V instanceof HTMLImageElement?(h.width=V.naturalWidth||V.width,h.height=V.naturalHeight||V.height):typeof VideoFrame<"u"&&V instanceof VideoFrame?(h.width=V.displayWidth,h.height=V.displayHeight):(h.width=V.width,h.height=V.height),h}this.allocateTextureUnit=q,this.resetTextureUnits=k,this.setTexture2D=X,this.setTexture2DArray=H,this.setTexture3D=Z,this.setTextureCube=J,this.rebindTextures=Gt,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=Dn,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=re}function uN(i,t){function e(r,s=fa){let l;const c=Ce.getTransfer(s);if(r===wr)return i.UNSIGNED_BYTE;if(r===Um)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Nm)return i.UNSIGNED_SHORT_5_5_5_1;if(r===FS)return i.UNSIGNED_INT_5_9_9_9_REV;if(r===zS)return i.BYTE;if(r===IS)return i.SHORT;if(r===vl)return i.UNSIGNED_SHORT;if(r===Lm)return i.INT;if(r===Za)return i.UNSIGNED_INT;if(r===Tr)return i.FLOAT;if(r===Al)return i.HALF_FLOAT;if(r===BS)return i.ALPHA;if(r===kS)return i.RGB;if(r===zi)return i.RGBA;if(r===HS)return i.LUMINANCE;if(r===VS)return i.LUMINANCE_ALPHA;if(r===xl)return i.DEPTH_COMPONENT;if(r===Sl)return i.DEPTH_STENCIL;if(r===GS)return i.RED;if(r===Pm)return i.RED_INTEGER;if(r===qS)return i.RG;if(r===Om)return i.RG_INTEGER;if(r===zm)return i.RGBA_INTEGER;if(r===gc||r===_c||r===vc||r===yc)if(c===Ve)if(l=t.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===gc)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===_c)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===vc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===yc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=t.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===gc)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===_c)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===vc)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===yc)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===zp||r===Ip||r===Fp||r===Bp)if(l=t.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===zp)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ip)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Fp)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Bp)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===kp||r===Hp||r===Vp)if(l=t.get("WEBGL_compressed_texture_etc"),l!==null){if(r===kp||r===Hp)return c===Ve?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===Vp)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Gp||r===qp||r===Xp||r===Wp||r===jp||r===Yp||r===Zp||r===Kp||r===Qp||r===Jp||r===$p||r===tm||r===em||r===nm)if(l=t.get("WEBGL_compressed_texture_astc"),l!==null){if(r===Gp)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===qp)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Xp)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Wp)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===jp)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Yp)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Zp)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Kp)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Qp)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Jp)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===$p)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===tm)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===em)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===nm)return c===Ve?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===xc||r===im||r===rm)if(l=t.get("EXT_texture_compression_bptc"),l!==null){if(r===xc)return c===Ve?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===im)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===rm)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===XS||r===am||r===sm||r===om)if(l=t.get("EXT_texture_compression_rgtc"),l!==null){if(r===xc)return l.COMPRESSED_RED_RGTC1_EXT;if(r===am)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===sm)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===om)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===yl?i.UNSIGNED_INT_24_8:i[r]!==void 0?i[r]:null}return{convert:e}}const cN=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fN=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class hN{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,r){if(this.texture===null){const s=new jn,l=t.properties.get(s);l.__webglTexture=e.texture,(e.depthNear!==r.depthNear||e.depthFar!==r.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,r=new Dr({vertexShader:cN,fragmentShader:fN,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ki(new Bc(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dN extends Ja{constructor(t,e){super();const r=this;let s=null,l=1,c=null,f="local-floor",d=1,h=null,m=null,g=null,v=null,y=null,b=null;const R=new hN,M=e.getContextAttributes();let x=null,D=null;const S=[],E=[],A=new me;let L=null;const P=new Ri;P.viewport=new ln;const O=new Ri;O.viewport=new ln;const C=[P,O],T=new N2;let N=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(tt){let pt=S[tt];return pt===void 0&&(pt=new Ud,S[tt]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(tt){let pt=S[tt];return pt===void 0&&(pt=new Ud,S[tt]=pt),pt.getGripSpace()},this.getHand=function(tt){let pt=S[tt];return pt===void 0&&(pt=new Ud,S[tt]=pt),pt.getHandSpace()};function q(tt){const pt=E.indexOf(tt.inputSource);if(pt===-1)return;const gt=S[pt];gt!==void 0&&(gt.update(tt.inputSource,tt.frame,h||c),gt.dispatchEvent({type:tt.type,data:tt.inputSource}))}function K(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",X);for(let tt=0;tt<S.length;tt++){const pt=E[tt];pt!==null&&(E[tt]=null,S[tt].disconnect(pt))}N=null,k=null,R.reset(),t.setRenderTarget(x),y=null,v=null,g=null,s=null,D=null,B.stop(),r.isPresenting=!1,t.setPixelRatio(L),t.setSize(A.width,A.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(tt){l=tt,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(tt){f=tt,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||c},this.setReferenceSpace=function(tt){h=tt},this.getBaseLayer=function(){return v!==null?v:y},this.getBinding=function(){return g},this.getFrame=function(){return b},this.getSession=function(){return s},this.setSession=async function(tt){if(s=tt,s!==null){if(x=t.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",K),s.addEventListener("inputsourceschange",X),M.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(A),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let gt=null,wt=null,Lt=null;M.depth&&(Lt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,gt=M.stencil?Sl:xl,wt=M.stencil?yl:Za);const ie={colorFormat:e.RGBA8,depthFormat:Lt,scaleFactor:l};g=new XRWebGLBinding(s,e),v=g.createProjectionLayer(ie),s.updateRenderState({layers:[v]}),t.setPixelRatio(1),t.setSize(v.textureWidth,v.textureHeight,!1),D=new Ka(v.textureWidth,v.textureHeight,{format:zi,type:wr,depthTexture:new aM(v.textureWidth,v.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,gt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}else{const gt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:l};y=new XRWebGLLayer(s,e,gt),s.updateRenderState({baseLayer:y}),t.setPixelRatio(1),t.setSize(y.framebufferWidth,y.framebufferHeight,!1),D=new Ka(y.framebufferWidth,y.framebufferHeight,{format:zi,type:wr,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}D.isXRRenderTarget=!0,this.setFoveation(d),h=null,c=await s.requestReferenceSpace(f),B.setContext(s),B.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return R.getDepthTexture()};function X(tt){for(let pt=0;pt<tt.removed.length;pt++){const gt=tt.removed[pt],wt=E.indexOf(gt);wt>=0&&(E[wt]=null,S[wt].disconnect(gt))}for(let pt=0;pt<tt.added.length;pt++){const gt=tt.added[pt];let wt=E.indexOf(gt);if(wt===-1){for(let ie=0;ie<S.length;ie++)if(ie>=E.length){E.push(gt),wt=ie;break}else if(E[ie]===null){E[ie]=gt,wt=ie;break}if(wt===-1)break}const Lt=S[wt];Lt&&Lt.connect(gt)}}const H=new ot,Z=new ot;function J(tt,pt,gt){H.setFromMatrixPosition(pt.matrixWorld),Z.setFromMatrixPosition(gt.matrixWorld);const wt=H.distanceTo(Z),Lt=pt.projectionMatrix.elements,ie=gt.projectionMatrix.elements,Gt=Lt[14]/(Lt[10]-1),Pe=Lt[14]/(Lt[10]+1),Oe=(Lt[9]+1)/Lt[5],he=(Lt[9]-1)/Lt[5],j=(Lt[8]-1)/Lt[0],Dn=(ie[8]+1)/ie[0],ge=Gt*j,re=Gt*Dn,qt=wt/(-j+Dn),Le=qt*-j;if(pt.matrixWorld.decompose(tt.position,tt.quaternion,tt.scale),tt.translateX(Le),tt.translateZ(qt),tt.matrixWorld.compose(tt.position,tt.quaternion,tt.scale),tt.matrixWorldInverse.copy(tt.matrixWorld).invert(),Lt[10]===-1)tt.projectionMatrix.copy(pt.projectionMatrix),tt.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const Vt=Gt+qt,V=Pe+qt,I=ge-Le,lt=re+(wt-Le),bt=Oe*Pe/V*Vt,W=he*Pe/V*Vt;tt.projectionMatrix.makePerspective(I,lt,bt,W,Vt,V),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert()}}function vt(tt,pt){pt===null?tt.matrixWorld.copy(tt.matrix):tt.matrixWorld.multiplyMatrices(pt.matrixWorld,tt.matrix),tt.matrixWorldInverse.copy(tt.matrixWorld).invert()}this.updateCamera=function(tt){if(s===null)return;let pt=tt.near,gt=tt.far;R.texture!==null&&(R.depthNear>0&&(pt=R.depthNear),R.depthFar>0&&(gt=R.depthFar)),T.near=O.near=P.near=pt,T.far=O.far=P.far=gt,(N!==T.near||k!==T.far)&&(s.updateRenderState({depthNear:T.near,depthFar:T.far}),N=T.near,k=T.far),P.layers.mask=tt.layers.mask|2,O.layers.mask=tt.layers.mask|4,T.layers.mask=P.layers.mask|O.layers.mask;const wt=tt.parent,Lt=T.cameras;vt(T,wt);for(let ie=0;ie<Lt.length;ie++)vt(Lt[ie],wt);Lt.length===2?J(T,P,O):T.projectionMatrix.copy(P.projectionMatrix),w(tt,T,wt)};function w(tt,pt,gt){gt===null?tt.matrix.copy(pt.matrixWorld):(tt.matrix.copy(gt.matrixWorld),tt.matrix.invert(),tt.matrix.multiply(pt.matrixWorld)),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.updateMatrixWorld(!0),tt.projectionMatrix.copy(pt.projectionMatrix),tt.projectionMatrixInverse.copy(pt.projectionMatrixInverse),tt.isPerspectiveCamera&&(tt.fov=cm*2*Math.atan(1/tt.projectionMatrix.elements[5]),tt.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(v===null&&y===null))return d},this.setFoveation=function(tt){d=tt,v!==null&&(v.fixedFoveation=tt),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=tt)},this.hasDepthSensing=function(){return R.texture!==null},this.getDepthSensingMesh=function(){return R.getMesh(T)};let Y=null;function ft(tt,pt){if(m=pt.getViewerPose(h||c),b=pt,m!==null){const gt=m.views;y!==null&&(t.setRenderTargetFramebuffer(D,y.framebuffer),t.setRenderTarget(D));let wt=!1;gt.length!==T.cameras.length&&(T.cameras.length=0,wt=!0);for(let Gt=0;Gt<gt.length;Gt++){const Pe=gt[Gt];let Oe=null;if(y!==null)Oe=y.getViewport(Pe);else{const j=g.getViewSubImage(v,Pe);Oe=j.viewport,Gt===0&&(t.setRenderTargetTextures(D,j.colorTexture,j.depthStencilTexture),t.setRenderTarget(D))}let he=C[Gt];he===void 0&&(he=new Ri,he.layers.enable(Gt),he.viewport=new ln,C[Gt]=he),he.matrix.fromArray(Pe.transform.matrix),he.matrix.decompose(he.position,he.quaternion,he.scale),he.projectionMatrix.fromArray(Pe.projectionMatrix),he.projectionMatrixInverse.copy(he.projectionMatrix).invert(),he.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),Gt===0&&(T.matrix.copy(he.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),wt===!0&&T.cameras.push(he)}const Lt=s.enabledFeatures;if(Lt&&Lt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){const Gt=g.getDepthInformation(gt[0]);Gt&&Gt.isValid&&Gt.texture&&R.init(t,Gt,s.renderState)}}for(let gt=0;gt<S.length;gt++){const wt=E[gt],Lt=S[gt];wt!==null&&Lt!==void 0&&Lt.update(wt,pt,h||c)}Y&&Y(tt,pt),pt.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:pt}),b=null}const B=new sM;B.setAnimationLoop(ft),this.setAnimationLoop=function(tt){Y=tt},this.dispose=function(){}}}const Va=new Ji,pN=new un;function mN(i,t){function e(M,x){M.matrixAutoUpdate===!0&&M.updateMatrix(),x.value.copy(M.matrix)}function r(M,x){x.color.getRGB(M.fogColor.value,eM(i)),x.isFog?(M.fogNear.value=x.near,M.fogFar.value=x.far):x.isFogExp2&&(M.fogDensity.value=x.density)}function s(M,x,D,S,E){x.isMeshBasicMaterial||x.isMeshLambertMaterial?l(M,x):x.isMeshToonMaterial?(l(M,x),g(M,x)):x.isMeshPhongMaterial?(l(M,x),m(M,x)):x.isMeshStandardMaterial?(l(M,x),v(M,x),x.isMeshPhysicalMaterial&&y(M,x,E)):x.isMeshMatcapMaterial?(l(M,x),b(M,x)):x.isMeshDepthMaterial?l(M,x):x.isMeshDistanceMaterial?(l(M,x),R(M,x)):x.isMeshNormalMaterial?l(M,x):x.isLineBasicMaterial?(c(M,x),x.isLineDashedMaterial&&f(M,x)):x.isPointsMaterial?d(M,x,D,S):x.isSpriteMaterial?h(M,x):x.isShadowMaterial?(M.color.value.copy(x.color),M.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function l(M,x){M.opacity.value=x.opacity,x.color&&M.diffuse.value.copy(x.color),x.emissive&&M.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(M.map.value=x.map,e(x.map,M.mapTransform)),x.alphaMap&&(M.alphaMap.value=x.alphaMap,e(x.alphaMap,M.alphaMapTransform)),x.bumpMap&&(M.bumpMap.value=x.bumpMap,e(x.bumpMap,M.bumpMapTransform),M.bumpScale.value=x.bumpScale,x.side===ni&&(M.bumpScale.value*=-1)),x.normalMap&&(M.normalMap.value=x.normalMap,e(x.normalMap,M.normalMapTransform),M.normalScale.value.copy(x.normalScale),x.side===ni&&M.normalScale.value.negate()),x.displacementMap&&(M.displacementMap.value=x.displacementMap,e(x.displacementMap,M.displacementMapTransform),M.displacementScale.value=x.displacementScale,M.displacementBias.value=x.displacementBias),x.emissiveMap&&(M.emissiveMap.value=x.emissiveMap,e(x.emissiveMap,M.emissiveMapTransform)),x.specularMap&&(M.specularMap.value=x.specularMap,e(x.specularMap,M.specularMapTransform)),x.alphaTest>0&&(M.alphaTest.value=x.alphaTest);const D=t.get(x),S=D.envMap,E=D.envMapRotation;S&&(M.envMap.value=S,Va.copy(E),Va.x*=-1,Va.y*=-1,Va.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Va.y*=-1,Va.z*=-1),M.envMapRotation.value.setFromMatrix4(pN.makeRotationFromEuler(Va)),M.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,M.reflectivity.value=x.reflectivity,M.ior.value=x.ior,M.refractionRatio.value=x.refractionRatio),x.lightMap&&(M.lightMap.value=x.lightMap,M.lightMapIntensity.value=x.lightMapIntensity,e(x.lightMap,M.lightMapTransform)),x.aoMap&&(M.aoMap.value=x.aoMap,M.aoMapIntensity.value=x.aoMapIntensity,e(x.aoMap,M.aoMapTransform))}function c(M,x){M.diffuse.value.copy(x.color),M.opacity.value=x.opacity,x.map&&(M.map.value=x.map,e(x.map,M.mapTransform))}function f(M,x){M.dashSize.value=x.dashSize,M.totalSize.value=x.dashSize+x.gapSize,M.scale.value=x.scale}function d(M,x,D,S){M.diffuse.value.copy(x.color),M.opacity.value=x.opacity,M.size.value=x.size*D,M.scale.value=S*.5,x.map&&(M.map.value=x.map,e(x.map,M.uvTransform)),x.alphaMap&&(M.alphaMap.value=x.alphaMap,e(x.alphaMap,M.alphaMapTransform)),x.alphaTest>0&&(M.alphaTest.value=x.alphaTest)}function h(M,x){M.diffuse.value.copy(x.color),M.opacity.value=x.opacity,M.rotation.value=x.rotation,x.map&&(M.map.value=x.map,e(x.map,M.mapTransform)),x.alphaMap&&(M.alphaMap.value=x.alphaMap,e(x.alphaMap,M.alphaMapTransform)),x.alphaTest>0&&(M.alphaTest.value=x.alphaTest)}function m(M,x){M.specular.value.copy(x.specular),M.shininess.value=Math.max(x.shininess,1e-4)}function g(M,x){x.gradientMap&&(M.gradientMap.value=x.gradientMap)}function v(M,x){M.metalness.value=x.metalness,x.metalnessMap&&(M.metalnessMap.value=x.metalnessMap,e(x.metalnessMap,M.metalnessMapTransform)),M.roughness.value=x.roughness,x.roughnessMap&&(M.roughnessMap.value=x.roughnessMap,e(x.roughnessMap,M.roughnessMapTransform)),x.envMap&&(M.envMapIntensity.value=x.envMapIntensity)}function y(M,x,D){M.ior.value=x.ior,x.sheen>0&&(M.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),M.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(M.sheenColorMap.value=x.sheenColorMap,e(x.sheenColorMap,M.sheenColorMapTransform)),x.sheenRoughnessMap&&(M.sheenRoughnessMap.value=x.sheenRoughnessMap,e(x.sheenRoughnessMap,M.sheenRoughnessMapTransform))),x.clearcoat>0&&(M.clearcoat.value=x.clearcoat,M.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(M.clearcoatMap.value=x.clearcoatMap,e(x.clearcoatMap,M.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,e(x.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(M.clearcoatNormalMap.value=x.clearcoatNormalMap,e(x.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===ni&&M.clearcoatNormalScale.value.negate())),x.dispersion>0&&(M.dispersion.value=x.dispersion),x.iridescence>0&&(M.iridescence.value=x.iridescence,M.iridescenceIOR.value=x.iridescenceIOR,M.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(M.iridescenceMap.value=x.iridescenceMap,e(x.iridescenceMap,M.iridescenceMapTransform)),x.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=x.iridescenceThicknessMap,e(x.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),x.transmission>0&&(M.transmission.value=x.transmission,M.transmissionSamplerMap.value=D.texture,M.transmissionSamplerSize.value.set(D.width,D.height),x.transmissionMap&&(M.transmissionMap.value=x.transmissionMap,e(x.transmissionMap,M.transmissionMapTransform)),M.thickness.value=x.thickness,x.thicknessMap&&(M.thicknessMap.value=x.thicknessMap,e(x.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=x.attenuationDistance,M.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(M.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(M.anisotropyMap.value=x.anisotropyMap,e(x.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=x.specularIntensity,M.specularColor.value.copy(x.specularColor),x.specularColorMap&&(M.specularColorMap.value=x.specularColorMap,e(x.specularColorMap,M.specularColorMapTransform)),x.specularIntensityMap&&(M.specularIntensityMap.value=x.specularIntensityMap,e(x.specularIntensityMap,M.specularIntensityMapTransform))}function b(M,x){x.matcap&&(M.matcap.value=x.matcap)}function R(M,x){const D=t.get(x).light;M.referencePosition.value.setFromMatrixPosition(D.matrixWorld),M.nearDistance.value=D.shadow.camera.near,M.farDistance.value=D.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:s}}function gN(i,t,e,r){let s={},l={},c=[];const f=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function d(D,S){const E=S.program;r.uniformBlockBinding(D,E)}function h(D,S){let E=s[D.id];E===void 0&&(b(D),E=m(D),s[D.id]=E,D.addEventListener("dispose",M));const A=S.program;r.updateUBOMapping(D,A);const L=t.render.frame;l[D.id]!==L&&(v(D),l[D.id]=L)}function m(D){const S=g();D.__bindingPointIndex=S;const E=i.createBuffer(),A=D.__size,L=D.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,A,L),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,E),E}function g(){for(let D=0;D<f;D++)if(c.indexOf(D)===-1)return c.push(D),D;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(D){const S=s[D.id],E=D.uniforms,A=D.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let L=0,P=E.length;L<P;L++){const O=Array.isArray(E[L])?E[L]:[E[L]];for(let C=0,T=O.length;C<T;C++){const N=O[C];if(y(N,L,C,A)===!0){const k=N.__offset,q=Array.isArray(N.value)?N.value:[N.value];let K=0;for(let X=0;X<q.length;X++){const H=q[X],Z=R(H);typeof H=="number"||typeof H=="boolean"?(N.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,k+K,N.__data)):H.isMatrix3?(N.__data[0]=H.elements[0],N.__data[1]=H.elements[1],N.__data[2]=H.elements[2],N.__data[3]=0,N.__data[4]=H.elements[3],N.__data[5]=H.elements[4],N.__data[6]=H.elements[5],N.__data[7]=0,N.__data[8]=H.elements[6],N.__data[9]=H.elements[7],N.__data[10]=H.elements[8],N.__data[11]=0):(H.toArray(N.__data,K),K+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,N.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function y(D,S,E,A){const L=D.value,P=S+"_"+E;if(A[P]===void 0)return typeof L=="number"||typeof L=="boolean"?A[P]=L:A[P]=L.clone(),!0;{const O=A[P];if(typeof L=="number"||typeof L=="boolean"){if(O!==L)return A[P]=L,!0}else if(O.equals(L)===!1)return O.copy(L),!0}return!1}function b(D){const S=D.uniforms;let E=0;const A=16;for(let P=0,O=S.length;P<O;P++){const C=Array.isArray(S[P])?S[P]:[S[P]];for(let T=0,N=C.length;T<N;T++){const k=C[T],q=Array.isArray(k.value)?k.value:[k.value];for(let K=0,X=q.length;K<X;K++){const H=q[K],Z=R(H),J=E%A,vt=J%Z.boundary,w=J+vt;E+=vt,w!==0&&A-w<Z.storage&&(E+=A-w),k.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=E,E+=Z.storage}}}const L=E%A;return L>0&&(E+=A-L),D.__size=E,D.__cache={},this}function R(D){const S={boundary:0,storage:0};return typeof D=="number"||typeof D=="boolean"?(S.boundary=4,S.storage=4):D.isVector2?(S.boundary=8,S.storage=8):D.isVector3||D.isColor?(S.boundary=16,S.storage=12):D.isVector4?(S.boundary=16,S.storage=16):D.isMatrix3?(S.boundary=48,S.storage=48):D.isMatrix4?(S.boundary=64,S.storage=64):D.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",D),S}function M(D){const S=D.target;S.removeEventListener("dispose",M);const E=c.indexOf(S.__bindingPointIndex);c.splice(E,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete l[S.id]}function x(){for(const D in s)i.deleteBuffer(s[D]);c=[],s={},l={}}return{bind:d,update:h,dispose:x}}class _N{constructor(t={}){const{canvas:e=XC(),context:r=null,depth:s=!0,stencil:l=!1,alpha:c=!1,antialias:f=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:h=!1,powerPreference:m="default",failIfMajorPerformanceCaveat:g=!1,reverseDepthBuffer:v=!1}=t;this.isWebGLRenderer=!0;let y;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");y=r.getContextAttributes().alpha}else y=c;const b=new Uint32Array(4),R=new Int32Array(4);let M=null,x=null;const D=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pa,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let A=!1;this._outputColorSpace=Ti;let L=0,P=0,O=null,C=-1,T=null;const N=new ln,k=new ln;let q=null;const K=new De(0);let X=0,H=e.width,Z=e.height,J=1,vt=null,w=null;const Y=new ln(0,0,H,Z),ft=new ln(0,0,H,Z);let B=!1;const tt=new rM;let pt=!1,gt=!1;const wt=new un,Lt=new un,ie=new ot,Gt=new ln,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function he(){return O===null?J:1}let j=r;function Dn(F,it){return e.getContext(F,it)}try{const F={alpha:!0,depth:s,stencil:l,antialias:f,premultipliedAlpha:d,preserveDrawingBuffer:h,powerPreference:m,failIfMajorPerformanceCaveat:g};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Dm}`),e.addEventListener("webglcontextlost",Mt,!1),e.addEventListener("webglcontextrestored",Bt,!1),e.addEventListener("webglcontextcreationerror",It,!1),j===null){const it="webgl2";if(j=Dn(it,F),j===null)throw Dn(it)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(F){throw console.error("THREE.WebGLRenderer: "+F.message),F}let ge,re,qt,Le,Vt,V,I,lt,bt,W,$,St,xt,Tt,ae,At,Nt,Xt,jt,Dt,oe,Yt,Fe,et;function zt(){ge=new RL(j),ge.init(),Yt=new uN(j,ge),re=new xL(j,ge,t,Yt),qt=new oN(j,ge),re.reverseDepthBuffer&&v&&qt.buffers.depth.setReversed(!0),Le=new DL(j),Vt=new YU,V=new lN(j,ge,qt,Vt,re,Yt,Le),I=new ML(E),lt=new AL(E),bt=new z2(j),Fe=new vL(j,bt),W=new wL(j,bt,Le,Fe),$=new UL(j,W,bt,Le),jt=new LL(j,re,V),At=new SL(Vt),St=new jU(E,I,lt,ge,re,Fe,At),xt=new mN(E,Vt),Tt=new KU,ae=new nN(ge),Xt=new _L(E,I,lt,qt,$,y,d),Nt=new aN(E,$,re),et=new gN(j,Le,re,qt),Dt=new yL(j,ge,Le),oe=new CL(j,ge,Le),Le.programs=St.programs,E.capabilities=re,E.extensions=ge,E.properties=Vt,E.renderLists=Tt,E.shadowMap=Nt,E.state=qt,E.info=Le}zt();const mt=new dN(E,j);this.xr=mt,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const F=ge.get("WEBGL_lose_context");F&&F.loseContext()},this.forceContextRestore=function(){const F=ge.get("WEBGL_lose_context");F&&F.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(F){F!==void 0&&(J=F,this.setSize(H,Z,!1))},this.getSize=function(F){return F.set(H,Z)},this.setSize=function(F,it,ht=!0){if(mt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=F,Z=it,e.width=Math.floor(F*J),e.height=Math.floor(it*J),ht===!0&&(e.style.width=F+"px",e.style.height=it+"px"),this.setViewport(0,0,F,it)},this.getDrawingBufferSize=function(F){return F.set(H*J,Z*J).floor()},this.setDrawingBufferSize=function(F,it,ht){H=F,Z=it,J=ht,e.width=Math.floor(F*ht),e.height=Math.floor(it*ht),this.setViewport(0,0,F,it)},this.getCurrentViewport=function(F){return F.copy(N)},this.getViewport=function(F){return F.copy(Y)},this.setViewport=function(F,it,ht,dt){F.isVector4?Y.set(F.x,F.y,F.z,F.w):Y.set(F,it,ht,dt),qt.viewport(N.copy(Y).multiplyScalar(J).round())},this.getScissor=function(F){return F.copy(ft)},this.setScissor=function(F,it,ht,dt){F.isVector4?ft.set(F.x,F.y,F.z,F.w):ft.set(F,it,ht,dt),qt.scissor(k.copy(ft).multiplyScalar(J).round())},this.getScissorTest=function(){return B},this.setScissorTest=function(F){qt.setScissorTest(B=F)},this.setOpaqueSort=function(F){vt=F},this.setTransparentSort=function(F){w=F},this.getClearColor=function(F){return F.copy(Xt.getClearColor())},this.setClearColor=function(){Xt.setClearColor(...arguments)},this.getClearAlpha=function(){return Xt.getClearAlpha()},this.setClearAlpha=function(){Xt.setClearAlpha(...arguments)},this.clear=function(F=!0,it=!0,ht=!0){let dt=0;if(F){let rt=!1;if(O!==null){const Rt=O.texture.format;rt=Rt===zm||Rt===Om||Rt===Pm}if(rt){const Rt=O.texture.type,Ut=Rt===wr||Rt===Za||Rt===vl||Rt===yl||Rt===Um||Rt===Nm,Pt=Xt.getClearColor(),kt=Xt.getClearAlpha(),ee=Pt.r,Qt=Pt.g,Zt=Pt.b;Ut?(b[0]=ee,b[1]=Qt,b[2]=Zt,b[3]=kt,j.clearBufferuiv(j.COLOR,0,b)):(R[0]=ee,R[1]=Qt,R[2]=Zt,R[3]=kt,j.clearBufferiv(j.COLOR,0,R))}else dt|=j.COLOR_BUFFER_BIT}it&&(dt|=j.DEPTH_BUFFER_BIT),ht&&(dt|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear(dt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Mt,!1),e.removeEventListener("webglcontextrestored",Bt,!1),e.removeEventListener("webglcontextcreationerror",It,!1),Xt.dispose(),Tt.dispose(),ae.dispose(),Vt.dispose(),I.dispose(),lt.dispose(),$.dispose(),Fe.dispose(),et.dispose(),St.dispose(),mt.dispose(),mt.removeEventListener("sessionstart",gn),mt.removeEventListener("sessionend",Ln),Yn.stop()};function Mt(F){F.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Bt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const F=Le.autoReset,it=Nt.enabled,ht=Nt.autoUpdate,dt=Nt.needsUpdate,rt=Nt.type;zt(),Le.autoReset=F,Nt.enabled=it,Nt.autoUpdate=ht,Nt.needsUpdate=dt,Nt.type=rt}function It(F){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",F.statusMessage)}function le(F){const it=F.target;it.removeEventListener("dispose",le),je(it)}function je(F){cn(F),Vt.remove(F)}function cn(F){const it=Vt.get(F).programs;it!==void 0&&(it.forEach(function(ht){St.releaseProgram(ht)}),F.isShaderMaterial&&St.releaseShaderCache(F))}this.renderBufferDirect=function(F,it,ht,dt,rt,Rt){it===null&&(it=Pe);const Ut=rt.isMesh&&rt.matrixWorld.determinant()<0,Pt=xa(F,it,ht,dt,rt);qt.setMaterial(dt,Ut);let kt=ht.index,ee=1;if(dt.wireframe===!0){if(kt=W.getWireframeAttribute(ht),kt===void 0)return;ee=2}const Qt=ht.drawRange,Zt=ht.attributes.position;let ve=Qt.start*ee,Re=(Qt.start+Qt.count)*ee;Rt!==null&&(ve=Math.max(ve,Rt.start*ee),Re=Math.min(Re,(Rt.start+Rt.count)*ee)),kt!==null?(ve=Math.max(ve,0),Re=Math.min(Re,kt.count)):Zt!=null&&(ve=Math.max(ve,0),Re=Math.min(Re,Zt.count));const $e=Re-ve;if($e<0||$e===1/0)return;Fe.setup(rt,dt,Pt,ht,kt);let Me,Ee=Dt;if(kt!==null&&(Me=bt.get(kt),Ee=oe,Ee.setIndex(Me)),rt.isMesh)dt.wireframe===!0?(qt.setLineWidth(dt.wireframeLinewidth*he()),Ee.setMode(j.LINES)):Ee.setMode(j.TRIANGLES);else if(rt.isLine){let Jt=dt.linewidth;Jt===void 0&&(Jt=1),qt.setLineWidth(Jt*he()),rt.isLineSegments?Ee.setMode(j.LINES):rt.isLineLoop?Ee.setMode(j.LINE_LOOP):Ee.setMode(j.LINE_STRIP)}else rt.isPoints?Ee.setMode(j.POINTS):rt.isSprite&&Ee.setMode(j.TRIANGLES);if(rt.isBatchedMesh)if(rt._multiDrawInstances!==null)Mc("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ee.renderMultiDrawInstances(rt._multiDrawStarts,rt._multiDrawCounts,rt._multiDrawCount,rt._multiDrawInstances);else if(ge.get("WEBGL_multi_draw"))Ee.renderMultiDraw(rt._multiDrawStarts,rt._multiDrawCounts,rt._multiDrawCount);else{const Jt=rt._multiDrawStarts,nn=rt._multiDrawCounts,Te=rt._multiDrawCount,zn=kt?bt.get(kt).bytesPerElement:1,Pr=Vt.get(dt).currentProgram.getUniforms();for(let Ye=0;Ye<Te;Ye++)Pr.setValue(j,"_gl_DrawID",Ye),Ee.render(Jt[Ye]/zn,nn[Ye])}else if(rt.isInstancedMesh)Ee.renderInstances(ve,$e,rt.count);else if(ht.isInstancedBufferGeometry){const Jt=ht._maxInstanceCount!==void 0?ht._maxInstanceCount:1/0,nn=Math.min(ht.instanceCount,Jt);Ee.renderInstances(ve,$e,nn)}else Ee.render(ve,$e)};function Ae(F,it,ht){F.transparent===!0&&F.side===ji&&F.forceSinglePass===!1?(F.side=ni,F.needsUpdate=!0,Ur(F,it,ht),F.side=ga,F.needsUpdate=!0,Ur(F,it,ht),F.side=ji):Ur(F,it,ht)}this.compile=function(F,it,ht=null){ht===null&&(ht=F),x=ae.get(ht),x.init(it),S.push(x),ht.traverseVisible(function(rt){rt.isLight&&rt.layers.test(it.layers)&&(x.pushLight(rt),rt.castShadow&&x.pushShadow(rt))}),F!==ht&&F.traverseVisible(function(rt){rt.isLight&&rt.layers.test(it.layers)&&(x.pushLight(rt),rt.castShadow&&x.pushShadow(rt))}),x.setupLights();const dt=new Set;return F.traverse(function(rt){if(!(rt.isMesh||rt.isPoints||rt.isLine||rt.isSprite))return;const Rt=rt.material;if(Rt)if(Array.isArray(Rt))for(let Ut=0;Ut<Rt.length;Ut++){const Pt=Rt[Ut];Ae(Pt,ht,rt),dt.add(Pt)}else Ae(Rt,ht,rt),dt.add(Rt)}),x=S.pop(),dt},this.compileAsync=function(F,it,ht=null){const dt=this.compile(F,it,ht);return new Promise(rt=>{function Rt(){if(dt.forEach(function(Ut){Vt.get(Ut).currentProgram.isReady()&&dt.delete(Ut)}),dt.size===0){rt(F);return}setTimeout(Rt,10)}ge.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let ii=null;function En(F){ii&&ii(F)}function gn(){Yn.stop()}function Ln(){Yn.start()}const Yn=new sM;Yn.setAnimationLoop(En),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(F){ii=F,mt.setAnimationLoop(F),F===null?Yn.stop():Yn.start()},mt.addEventListener("sessionstart",gn),mt.addEventListener("sessionend",Ln),this.render=function(F,it){if(it!==void 0&&it.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),it.parent===null&&it.matrixWorldAutoUpdate===!0&&it.updateMatrixWorld(),mt.enabled===!0&&mt.isPresenting===!0&&(mt.cameraAutoUpdate===!0&&mt.updateCamera(it),it=mt.getCamera()),F.isScene===!0&&F.onBeforeRender(E,F,it,O),x=ae.get(F,S.length),x.init(it),S.push(x),Lt.multiplyMatrices(it.projectionMatrix,it.matrixWorldInverse),tt.setFromProjectionMatrix(Lt),gt=this.localClippingEnabled,pt=At.init(this.clippingPlanes,gt),M=Tt.get(F,D.length),M.init(),D.push(M),mt.enabled===!0&&mt.isPresenting===!0){const Rt=E.xr.getDepthSensingMesh();Rt!==null&&va(Rt,it,-1/0,E.sortObjects)}va(F,it,0,E.sortObjects),M.finish(),E.sortObjects===!0&&M.sort(vt,w),Oe=mt.enabled===!1||mt.isPresenting===!1||mt.hasDepthSensing()===!1,Oe&&Xt.addToRenderList(M,F),this.info.render.frame++,pt===!0&&At.beginShadows();const ht=x.state.shadowsArray;Nt.render(ht,F,it),pt===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const dt=M.opaque,rt=M.transmissive;if(x.setupLights(),it.isArrayCamera){const Rt=it.cameras;if(rt.length>0)for(let Ut=0,Pt=Rt.length;Ut<Pt;Ut++){const kt=Rt[Ut];Dl(dt,rt,F,kt)}Oe&&Xt.render(F);for(let Ut=0,Pt=Rt.length;Ut<Pt;Ut++){const kt=Rt[Ut];Cl(M,F,kt,kt.viewport)}}else rt.length>0&&Dl(dt,rt,F,it),Oe&&Xt.render(F),Cl(M,F,it);O!==null&&P===0&&(V.updateMultisampleRenderTarget(O),V.updateRenderTargetMipmap(O)),F.isScene===!0&&F.onAfterRender(E,F,it),Fe.resetDefaultState(),C=-1,T=null,S.pop(),S.length>0?(x=S[S.length-1],pt===!0&&At.setGlobalState(E.clippingPlanes,x.state.camera)):x=null,D.pop(),D.length>0?M=D[D.length-1]:M=null};function va(F,it,ht,dt){if(F.visible===!1)return;if(F.layers.test(it.layers)){if(F.isGroup)ht=F.renderOrder;else if(F.isLOD)F.autoUpdate===!0&&F.update(it);else if(F.isLight)x.pushLight(F),F.castShadow&&x.pushShadow(F);else if(F.isSprite){if(!F.frustumCulled||tt.intersectsSprite(F)){dt&&Gt.setFromMatrixPosition(F.matrixWorld).applyMatrix4(Lt);const Ut=$.update(F),Pt=F.material;Pt.visible&&M.push(F,Ut,Pt,ht,Gt.z,null)}}else if((F.isMesh||F.isLine||F.isPoints)&&(!F.frustumCulled||tt.intersectsObject(F))){const Ut=$.update(F),Pt=F.material;if(dt&&(F.boundingSphere!==void 0?(F.boundingSphere===null&&F.computeBoundingSphere(),Gt.copy(F.boundingSphere.center)):(Ut.boundingSphere===null&&Ut.computeBoundingSphere(),Gt.copy(Ut.boundingSphere.center)),Gt.applyMatrix4(F.matrixWorld).applyMatrix4(Lt)),Array.isArray(Pt)){const kt=Ut.groups;for(let ee=0,Qt=kt.length;ee<Qt;ee++){const Zt=kt[ee],ve=Pt[Zt.materialIndex];ve&&ve.visible&&M.push(F,Ut,ve,ht,Gt.z,Zt)}}else Pt.visible&&M.push(F,Ut,Pt,ht,Gt.z,null)}}const Rt=F.children;for(let Ut=0,Pt=Rt.length;Ut<Pt;Ut++)va(Rt[Ut],it,ht,dt)}function Cl(F,it,ht,dt){const rt=F.opaque,Rt=F.transmissive,Ut=F.transparent;x.setupLightsView(ht),pt===!0&&At.setGlobalState(E.clippingPlanes,ht),dt&&qt.viewport(N.copy(dt)),rt.length>0&&ya(rt,it,ht),Rt.length>0&&ya(Rt,it,ht),Ut.length>0&&ya(Ut,it,ht),qt.buffers.depth.setTest(!0),qt.buffers.depth.setMask(!0),qt.buffers.color.setMask(!0),qt.setPolygonOffset(!1)}function Dl(F,it,ht,dt){if((ht.isScene===!0?ht.overrideMaterial:null)!==null)return;x.state.transmissionRenderTarget[dt.id]===void 0&&(x.state.transmissionRenderTarget[dt.id]=new Ka(1,1,{generateMipmaps:!0,type:ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float")?Al:wr,minFilter:ja,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ce.workingColorSpace}));const Rt=x.state.transmissionRenderTarget[dt.id],Ut=dt.viewport||N;Rt.setSize(Ut.z*E.transmissionResolutionScale,Ut.w*E.transmissionResolutionScale);const Pt=E.getRenderTarget();E.setRenderTarget(Rt),E.getClearColor(K),X=E.getClearAlpha(),X<1&&E.setClearColor(16777215,.5),E.clear(),Oe&&Xt.render(ht);const kt=E.toneMapping;E.toneMapping=pa;const ee=dt.viewport;if(dt.viewport!==void 0&&(dt.viewport=void 0),x.setupLightsView(dt),pt===!0&&At.setGlobalState(E.clippingPlanes,dt),ya(F,ht,dt),V.updateMultisampleRenderTarget(Rt),V.updateRenderTargetMipmap(Rt),ge.has("WEBGL_multisampled_render_to_texture")===!1){let Qt=!1;for(let Zt=0,ve=it.length;Zt<ve;Zt++){const Re=it[Zt],$e=Re.object,Me=Re.geometry,Ee=Re.material,Jt=Re.group;if(Ee.side===ji&&$e.layers.test(dt.layers)){const nn=Ee.side;Ee.side=ni,Ee.needsUpdate=!0,Lr($e,ht,dt,Me,Ee,Jt),Ee.side=nn,Ee.needsUpdate=!0,Qt=!0}}Qt===!0&&(V.updateMultisampleRenderTarget(Rt),V.updateRenderTargetMipmap(Rt))}E.setRenderTarget(Pt),E.setClearColor(K,X),ee!==void 0&&(dt.viewport=ee),E.toneMapping=kt}function ya(F,it,ht){const dt=it.isScene===!0?it.overrideMaterial:null;for(let rt=0,Rt=F.length;rt<Rt;rt++){const Ut=F[rt],Pt=Ut.object,kt=Ut.geometry,ee=Ut.group;let Qt=Ut.material;Qt.allowOverride===!0&&dt!==null&&(Qt=dt),Pt.layers.test(ht.layers)&&Lr(Pt,it,ht,kt,Qt,ee)}}function Lr(F,it,ht,dt,rt,Rt){F.onBeforeRender(E,it,ht,dt,rt,Rt),F.modelViewMatrix.multiplyMatrices(ht.matrixWorldInverse,F.matrixWorld),F.normalMatrix.getNormalMatrix(F.modelViewMatrix),rt.onBeforeRender(E,it,ht,dt,F,Rt),rt.transparent===!0&&rt.side===ji&&rt.forceSinglePass===!1?(rt.side=ni,rt.needsUpdate=!0,E.renderBufferDirect(ht,it,dt,rt,F,Rt),rt.side=ga,rt.needsUpdate=!0,E.renderBufferDirect(ht,it,dt,rt,F,Rt),rt.side=ji):E.renderBufferDirect(ht,it,dt,rt,F,Rt),F.onAfterRender(E,it,ht,dt,rt,Rt)}function Ur(F,it,ht){it.isScene!==!0&&(it=Pe);const dt=Vt.get(F),rt=x.state.lights,Rt=x.state.shadowsArray,Ut=rt.state.version,Pt=St.getParameters(F,rt.state,Rt,it,ht),kt=St.getProgramCacheKey(Pt);let ee=dt.programs;dt.environment=F.isMeshStandardMaterial?it.environment:null,dt.fog=it.fog,dt.envMap=(F.isMeshStandardMaterial?lt:I).get(F.envMap||dt.environment),dt.envMapRotation=dt.environment!==null&&F.envMap===null?it.environmentRotation:F.envMapRotation,ee===void 0&&(F.addEventListener("dispose",le),ee=new Map,dt.programs=ee);let Qt=ee.get(kt);if(Qt!==void 0){if(dt.currentProgram===Qt&&dt.lightsStateVersion===Ut)return er(F,Pt),Qt}else Pt.uniforms=St.getUniforms(F),F.onBeforeCompile(Pt,E),Qt=St.acquireProgram(Pt,kt),ee.set(kt,Qt),dt.uniforms=Pt.uniforms;const Zt=dt.uniforms;return(!F.isShaderMaterial&&!F.isRawShaderMaterial||F.clipping===!0)&&(Zt.clippingPlanes=At.uniform),er(F,Pt),dt.needsLights=fn(F),dt.lightsStateVersion=Ut,dt.needsLights&&(Zt.ambientLightColor.value=rt.state.ambient,Zt.lightProbe.value=rt.state.probe,Zt.directionalLights.value=rt.state.directional,Zt.directionalLightShadows.value=rt.state.directionalShadow,Zt.spotLights.value=rt.state.spot,Zt.spotLightShadows.value=rt.state.spotShadow,Zt.rectAreaLights.value=rt.state.rectArea,Zt.ltc_1.value=rt.state.rectAreaLTC1,Zt.ltc_2.value=rt.state.rectAreaLTC2,Zt.pointLights.value=rt.state.point,Zt.pointLightShadows.value=rt.state.pointShadow,Zt.hemisphereLights.value=rt.state.hemi,Zt.directionalShadowMap.value=rt.state.directionalShadowMap,Zt.directionalShadowMatrix.value=rt.state.directionalShadowMatrix,Zt.spotShadowMap.value=rt.state.spotShadowMap,Zt.spotLightMatrix.value=rt.state.spotLightMatrix,Zt.spotLightMap.value=rt.state.spotLightMap,Zt.pointShadowMap.value=rt.state.pointShadowMap,Zt.pointShadowMatrix.value=rt.state.pointShadowMatrix),dt.currentProgram=Qt,dt.uniformsList=null,Qt}function tr(F){if(F.uniformsList===null){const it=F.currentProgram.getUniforms();F.uniformsList=Ec.seqWithValue(it.seq,F.uniforms)}return F.uniformsList}function er(F,it){const ht=Vt.get(F);ht.outputColorSpace=it.outputColorSpace,ht.batching=it.batching,ht.batchingColor=it.batchingColor,ht.instancing=it.instancing,ht.instancingColor=it.instancingColor,ht.instancingMorph=it.instancingMorph,ht.skinning=it.skinning,ht.morphTargets=it.morphTargets,ht.morphNormals=it.morphNormals,ht.morphColors=it.morphColors,ht.morphTargetsCount=it.morphTargetsCount,ht.numClippingPlanes=it.numClippingPlanes,ht.numIntersection=it.numClipIntersection,ht.vertexAlphas=it.vertexAlphas,ht.vertexTangents=it.vertexTangents,ht.toneMapping=it.toneMapping}function xa(F,it,ht,dt,rt){it.isScene!==!0&&(it=Pe),V.resetTextureUnits();const Rt=it.fog,Ut=dt.isMeshStandardMaterial?it.environment:null,Pt=O===null?E.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:ro,kt=(dt.isMeshStandardMaterial?lt:I).get(dt.envMap||Ut),ee=dt.vertexColors===!0&&!!ht.attributes.color&&ht.attributes.color.itemSize===4,Qt=!!ht.attributes.tangent&&(!!dt.normalMap||dt.anisotropy>0),Zt=!!ht.morphAttributes.position,ve=!!ht.morphAttributes.normal,Re=!!ht.morphAttributes.color;let $e=pa;dt.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&($e=E.toneMapping);const Me=ht.morphAttributes.position||ht.morphAttributes.normal||ht.morphAttributes.color,Ee=Me!==void 0?Me.length:0,Jt=Vt.get(dt),nn=x.state.lights;if(pt===!0&&(gt===!0||F!==T)){const bn=F===T&&dt.id===C;At.setState(dt,F,bn)}let Te=!1;dt.version===Jt.__version?(Jt.needsLights&&Jt.lightsStateVersion!==nn.state.version||Jt.outputColorSpace!==Pt||rt.isBatchedMesh&&Jt.batching===!1||!rt.isBatchedMesh&&Jt.batching===!0||rt.isBatchedMesh&&Jt.batchingColor===!0&&rt.colorTexture===null||rt.isBatchedMesh&&Jt.batchingColor===!1&&rt.colorTexture!==null||rt.isInstancedMesh&&Jt.instancing===!1||!rt.isInstancedMesh&&Jt.instancing===!0||rt.isSkinnedMesh&&Jt.skinning===!1||!rt.isSkinnedMesh&&Jt.skinning===!0||rt.isInstancedMesh&&Jt.instancingColor===!0&&rt.instanceColor===null||rt.isInstancedMesh&&Jt.instancingColor===!1&&rt.instanceColor!==null||rt.isInstancedMesh&&Jt.instancingMorph===!0&&rt.morphTexture===null||rt.isInstancedMesh&&Jt.instancingMorph===!1&&rt.morphTexture!==null||Jt.envMap!==kt||dt.fog===!0&&Jt.fog!==Rt||Jt.numClippingPlanes!==void 0&&(Jt.numClippingPlanes!==At.numPlanes||Jt.numIntersection!==At.numIntersection)||Jt.vertexAlphas!==ee||Jt.vertexTangents!==Qt||Jt.morphTargets!==Zt||Jt.morphNormals!==ve||Jt.morphColors!==Re||Jt.toneMapping!==$e||Jt.morphTargetsCount!==Ee)&&(Te=!0):(Te=!0,Jt.__version=dt.version);let zn=Jt.currentProgram;Te===!0&&(zn=Ur(dt,it,rt));let Pr=!1,Ye=!1,ir=!1;const Xe=zn.getUniforms(),In=Jt.uniforms;if(qt.useProgram(zn.program)&&(Pr=!0,Ye=!0,ir=!0),dt.id!==C&&(C=dt.id,Ye=!0),Pr||T!==F){qt.buffers.depth.getReversed()?(wt.copy(F.projectionMatrix),jC(wt),YC(wt),Xe.setValue(j,"projectionMatrix",wt)):Xe.setValue(j,"projectionMatrix",F.projectionMatrix),Xe.setValue(j,"viewMatrix",F.matrixWorldInverse);const Un=Xe.map.cameraPosition;Un!==void 0&&Un.setValue(j,ie.setFromMatrixPosition(F.matrixWorld)),re.logarithmicDepthBuffer&&Xe.setValue(j,"logDepthBufFC",2/(Math.log(F.far+1)/Math.LN2)),(dt.isMeshPhongMaterial||dt.isMeshToonMaterial||dt.isMeshLambertMaterial||dt.isMeshBasicMaterial||dt.isMeshStandardMaterial||dt.isShaderMaterial)&&Xe.setValue(j,"isOrthographic",F.isOrthographicCamera===!0),T!==F&&(T=F,Ye=!0,ir=!0)}if(rt.isSkinnedMesh){Xe.setOptional(j,rt,"bindMatrix"),Xe.setOptional(j,rt,"bindMatrixInverse");const bn=rt.skeleton;bn&&(bn.boneTexture===null&&bn.computeBoneTexture(),Xe.setValue(j,"boneTexture",bn.boneTexture,V))}rt.isBatchedMesh&&(Xe.setOptional(j,rt,"batchingTexture"),Xe.setValue(j,"batchingTexture",rt._matricesTexture,V),Xe.setOptional(j,rt,"batchingIdTexture"),Xe.setValue(j,"batchingIdTexture",rt._indirectTexture,V),Xe.setOptional(j,rt,"batchingColorTexture"),rt._colorsTexture!==null&&Xe.setValue(j,"batchingColorTexture",rt._colorsTexture,V));const _n=ht.morphAttributes;if((_n.position!==void 0||_n.normal!==void 0||_n.color!==void 0)&&jt.update(rt,ht,zn),(Ye||Jt.receiveShadow!==rt.receiveShadow)&&(Jt.receiveShadow=rt.receiveShadow,Xe.setValue(j,"receiveShadow",rt.receiveShadow)),dt.isMeshGouraudMaterial&&dt.envMap!==null&&(In.envMap.value=kt,In.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),dt.isMeshStandardMaterial&&dt.envMap===null&&it.environment!==null&&(In.envMapIntensity.value=it.environmentIntensity),Ye&&(Xe.setValue(j,"toneMappingExposure",E.toneMappingExposure),Jt.needsLights&&Nr(In,ir),Rt&&dt.fog===!0&&xt.refreshFogUniforms(In,Rt),xt.refreshMaterialUniforms(In,dt,J,Z,x.state.transmissionRenderTarget[F.id]),Ec.upload(j,tr(Jt),In,V)),dt.isShaderMaterial&&dt.uniformsNeedUpdate===!0&&(Ec.upload(j,tr(Jt),In,V),dt.uniformsNeedUpdate=!1),dt.isSpriteMaterial&&Xe.setValue(j,"center",rt.center),Xe.setValue(j,"modelViewMatrix",rt.modelViewMatrix),Xe.setValue(j,"normalMatrix",rt.normalMatrix),Xe.setValue(j,"modelMatrix",rt.matrixWorld),dt.isShaderMaterial||dt.isRawShaderMaterial){const bn=dt.uniformsGroups;for(let Un=0,Fi=bn.length;Un<Fi;Un++){const rr=bn[Un];et.update(rr,zn),et.bind(rr,zn)}}return zn}function Nr(F,it){F.ambientLightColor.needsUpdate=it,F.lightProbe.needsUpdate=it,F.directionalLights.needsUpdate=it,F.directionalLightShadows.needsUpdate=it,F.pointLights.needsUpdate=it,F.pointLightShadows.needsUpdate=it,F.spotLights.needsUpdate=it,F.spotLightShadows.needsUpdate=it,F.rectAreaLights.needsUpdate=it,F.hemisphereLights.needsUpdate=it}function fn(F){return F.isMeshLambertMaterial||F.isMeshToonMaterial||F.isMeshPhongMaterial||F.isMeshStandardMaterial||F.isShadowMaterial||F.isShaderMaterial&&F.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(F,it,ht){const dt=Vt.get(F);dt.__autoAllocateDepthBuffer=F.resolveDepthBuffer===!1,dt.__autoAllocateDepthBuffer===!1&&(dt.__useRenderToTexture=!1),Vt.get(F.texture).__webglTexture=it,Vt.get(F.depthTexture).__webglTexture=dt.__autoAllocateDepthBuffer?void 0:ht,dt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(F,it){const ht=Vt.get(F);ht.__webglFramebuffer=it,ht.__useDefaultFramebuffer=it===void 0};const Ll=j.createFramebuffer();this.setRenderTarget=function(F,it=0,ht=0){O=F,L=it,P=ht;let dt=!0,rt=null,Rt=!1,Ut=!1;if(F){const kt=Vt.get(F);if(kt.__useDefaultFramebuffer!==void 0)qt.bindFramebuffer(j.FRAMEBUFFER,null),dt=!1;else if(kt.__webglFramebuffer===void 0)V.setupRenderTarget(F);else if(kt.__hasExternalTextures)V.rebindTextures(F,Vt.get(F.texture).__webglTexture,Vt.get(F.depthTexture).__webglTexture);else if(F.depthBuffer){const Zt=F.depthTexture;if(kt.__boundDepthTexture!==Zt){if(Zt!==null&&Vt.has(Zt)&&(F.width!==Zt.image.width||F.height!==Zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");V.setupDepthRenderbuffer(F)}}const ee=F.texture;(ee.isData3DTexture||ee.isDataArrayTexture||ee.isCompressedArrayTexture)&&(Ut=!0);const Qt=Vt.get(F).__webglFramebuffer;F.isWebGLCubeRenderTarget?(Array.isArray(Qt[it])?rt=Qt[it][ht]:rt=Qt[it],Rt=!0):F.samples>0&&V.useMultisampledRTT(F)===!1?rt=Vt.get(F).__webglMultisampledFramebuffer:Array.isArray(Qt)?rt=Qt[ht]:rt=Qt,N.copy(F.viewport),k.copy(F.scissor),q=F.scissorTest}else N.copy(Y).multiplyScalar(J).floor(),k.copy(ft).multiplyScalar(J).floor(),q=B;if(ht!==0&&(rt=Ll),qt.bindFramebuffer(j.FRAMEBUFFER,rt)&&dt&&qt.drawBuffers(F,rt),qt.viewport(N),qt.scissor(k),qt.setScissorTest(q),Rt){const kt=Vt.get(F.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+it,kt.__webglTexture,ht)}else if(Ut){const kt=Vt.get(F.texture),ee=it;j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,kt.__webglTexture,ht,ee)}else if(F!==null&&ht!==0){const kt=Vt.get(F.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,kt.__webglTexture,ht)}C=-1},this.readRenderTargetPixels=function(F,it,ht,dt,rt,Rt,Ut){if(!(F&&F.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=Vt.get(F).__webglFramebuffer;if(F.isWebGLCubeRenderTarget&&Ut!==void 0&&(Pt=Pt[Ut]),Pt){qt.bindFramebuffer(j.FRAMEBUFFER,Pt);try{const kt=F.texture,ee=kt.format,Qt=kt.type;if(!re.textureFormatReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}it>=0&&it<=F.width-dt&&ht>=0&&ht<=F.height-rt&&j.readPixels(it,ht,dt,rt,Yt.convert(ee),Yt.convert(Qt),Rt)}finally{const kt=O!==null?Vt.get(O).__webglFramebuffer:null;qt.bindFramebuffer(j.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(F,it,ht,dt,rt,Rt,Ut){if(!(F&&F.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=Vt.get(F).__webglFramebuffer;if(F.isWebGLCubeRenderTarget&&Ut!==void 0&&(Pt=Pt[Ut]),Pt)if(it>=0&&it<=F.width-dt&&ht>=0&&ht<=F.height-rt){qt.bindFramebuffer(j.FRAMEBUFFER,Pt);const kt=F.texture,ee=kt.format,Qt=kt.type;if(!re.textureFormatReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Zt=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,Zt),j.bufferData(j.PIXEL_PACK_BUFFER,Rt.byteLength,j.STREAM_READ),j.readPixels(it,ht,dt,rt,Yt.convert(ee),Yt.convert(Qt),0);const ve=O!==null?Vt.get(O).__webglFramebuffer:null;qt.bindFramebuffer(j.FRAMEBUFFER,ve);const Re=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await WC(j,Re,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,Zt),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,Rt),j.deleteBuffer(Zt),j.deleteSync(Re),Rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(F,it=null,ht=0){const dt=Math.pow(2,-ht),rt=Math.floor(F.image.width*dt),Rt=Math.floor(F.image.height*dt),Ut=it!==null?it.x:0,Pt=it!==null?it.y:0;V.setTexture2D(F,0),j.copyTexSubImage2D(j.TEXTURE_2D,ht,0,0,Ut,Pt,rt,Rt),qt.unbindTexture()};const Ul=j.createFramebuffer(),nr=j.createFramebuffer();this.copyTextureToTexture=function(F,it,ht=null,dt=null,rt=0,Rt=null){Rt===null&&(rt!==0?(Mc("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Rt=rt,rt=0):Rt=0);let Ut,Pt,kt,ee,Qt,Zt,ve,Re,$e;const Me=F.isCompressedTexture?F.mipmaps[Rt]:F.image;if(ht!==null)Ut=ht.max.x-ht.min.x,Pt=ht.max.y-ht.min.y,kt=ht.isBox3?ht.max.z-ht.min.z:1,ee=ht.min.x,Qt=ht.min.y,Zt=ht.isBox3?ht.min.z:0;else{const _n=Math.pow(2,-rt);Ut=Math.floor(Me.width*_n),Pt=Math.floor(Me.height*_n),F.isDataArrayTexture?kt=Me.depth:F.isData3DTexture?kt=Math.floor(Me.depth*_n):kt=1,ee=0,Qt=0,Zt=0}dt!==null?(ve=dt.x,Re=dt.y,$e=dt.z):(ve=0,Re=0,$e=0);const Ee=Yt.convert(it.format),Jt=Yt.convert(it.type);let nn;it.isData3DTexture?(V.setTexture3D(it,0),nn=j.TEXTURE_3D):it.isDataArrayTexture||it.isCompressedArrayTexture?(V.setTexture2DArray(it,0),nn=j.TEXTURE_2D_ARRAY):(V.setTexture2D(it,0),nn=j.TEXTURE_2D),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,it.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,it.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,it.unpackAlignment);const Te=j.getParameter(j.UNPACK_ROW_LENGTH),zn=j.getParameter(j.UNPACK_IMAGE_HEIGHT),Pr=j.getParameter(j.UNPACK_SKIP_PIXELS),Ye=j.getParameter(j.UNPACK_SKIP_ROWS),ir=j.getParameter(j.UNPACK_SKIP_IMAGES);j.pixelStorei(j.UNPACK_ROW_LENGTH,Me.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,Me.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,ee),j.pixelStorei(j.UNPACK_SKIP_ROWS,Qt),j.pixelStorei(j.UNPACK_SKIP_IMAGES,Zt);const Xe=F.isDataArrayTexture||F.isData3DTexture,In=it.isDataArrayTexture||it.isData3DTexture;if(F.isDepthTexture){const _n=Vt.get(F),bn=Vt.get(it),Un=Vt.get(_n.__renderTarget),Fi=Vt.get(bn.__renderTarget);qt.bindFramebuffer(j.READ_FRAMEBUFFER,Un.__webglFramebuffer),qt.bindFramebuffer(j.DRAW_FRAMEBUFFER,Fi.__webglFramebuffer);for(let rr=0;rr<kt;rr++)Xe&&(j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Vt.get(F).__webglTexture,rt,Zt+rr),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Vt.get(it).__webglTexture,Rt,$e+rr)),j.blitFramebuffer(ee,Qt,Ut,Pt,ve,Re,Ut,Pt,j.DEPTH_BUFFER_BIT,j.NEAREST);qt.bindFramebuffer(j.READ_FRAMEBUFFER,null),qt.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(rt!==0||F.isRenderTargetTexture||Vt.has(F)){const _n=Vt.get(F),bn=Vt.get(it);qt.bindFramebuffer(j.READ_FRAMEBUFFER,Ul),qt.bindFramebuffer(j.DRAW_FRAMEBUFFER,nr);for(let Un=0;Un<kt;Un++)Xe?j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,_n.__webglTexture,rt,Zt+Un):j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,_n.__webglTexture,rt),In?j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,bn.__webglTexture,Rt,$e+Un):j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,bn.__webglTexture,Rt),rt!==0?j.blitFramebuffer(ee,Qt,Ut,Pt,ve,Re,Ut,Pt,j.COLOR_BUFFER_BIT,j.NEAREST):In?j.copyTexSubImage3D(nn,Rt,ve,Re,$e+Un,ee,Qt,Ut,Pt):j.copyTexSubImage2D(nn,Rt,ve,Re,ee,Qt,Ut,Pt);qt.bindFramebuffer(j.READ_FRAMEBUFFER,null),qt.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else In?F.isDataTexture||F.isData3DTexture?j.texSubImage3D(nn,Rt,ve,Re,$e,Ut,Pt,kt,Ee,Jt,Me.data):it.isCompressedArrayTexture?j.compressedTexSubImage3D(nn,Rt,ve,Re,$e,Ut,Pt,kt,Ee,Me.data):j.texSubImage3D(nn,Rt,ve,Re,$e,Ut,Pt,kt,Ee,Jt,Me):F.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,Rt,ve,Re,Ut,Pt,Ee,Jt,Me.data):F.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,Rt,ve,Re,Me.width,Me.height,Ee,Me.data):j.texSubImage2D(j.TEXTURE_2D,Rt,ve,Re,Ut,Pt,Ee,Jt,Me);j.pixelStorei(j.UNPACK_ROW_LENGTH,Te),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,zn),j.pixelStorei(j.UNPACK_SKIP_PIXELS,Pr),j.pixelStorei(j.UNPACK_SKIP_ROWS,Ye),j.pixelStorei(j.UNPACK_SKIP_IMAGES,ir),Rt===0&&it.generateMipmaps&&j.generateMipmap(nn),qt.unbindTexture()},this.copyTextureToTexture3D=function(F,it,ht=null,dt=null,rt=0){return Mc('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(F,it,ht,dt,rt)},this.initRenderTarget=function(F){Vt.get(F).__webglFramebuffer===void 0&&V.setupRenderTarget(F)},this.initTexture=function(F){F.isCubeTexture?V.setTextureCube(F,0):F.isData3DTexture?V.setTexture3D(F,0):F.isDataArrayTexture||F.isCompressedArrayTexture?V.setTexture2DArray(F,0):V.setTexture2D(F,0),qt.unbindTexture()},this.resetState=function(){L=0,P=0,O=null,qt.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ar}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=Ce._getUnpackColorSpace()}}const hx={type:"change"},Hm={type:"start"},fM={type:"end"},pc=new Fm,dx=new ca,vN=Math.cos(70*qC.DEG2RAD),xn=new ot,$n=2*Math.PI,qe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},kd=1e-6;class yN extends P2{constructor(t,e=null){super(t,e),this.state=qe.NONE,this.target=new ot,this.cursor=new ot,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Js.ROTATE,MIDDLE:Js.DOLLY,RIGHT:Js.PAN},this.touches={ONE:js.ROTATE,TWO:js.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new ot,this._lastQuaternion=new Cr,this._lastTargetPosition=new ot,this._quat=new Cr().setFromUnitVectors(t.up,new ot(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ky,this._sphericalDelta=new ky,this._scale=1,this._panOffset=new ot,this._rotateStart=new me,this._rotateEnd=new me,this._rotateDelta=new me,this._panStart=new me,this._panEnd=new me,this._panDelta=new me,this._dollyStart=new me,this._dollyEnd=new me,this._dollyDelta=new me,this._dollyDirection=new ot,this._mouse=new me,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=SN.bind(this),this._onPointerDown=xN.bind(this),this._onPointerUp=MN.bind(this),this._onContextMenu=CN.bind(this),this._onMouseWheel=TN.bind(this),this._onKeyDown=AN.bind(this),this._onTouchStart=RN.bind(this),this._onTouchMove=wN.bind(this),this._onMouseDown=EN.bind(this),this._onMouseMove=bN.bind(this),this._interceptControlDown=DN.bind(this),this._interceptControlUp=LN.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(hx),this.update(),this.state=qe.NONE}update(t=null){const e=this.object.position;xn.copy(e).sub(this.target),xn.applyQuaternion(this._quat),this._spherical.setFromVector3(xn),this.autoRotate&&this.state===qe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(r)&&isFinite(s)&&(r<-Math.PI?r+=$n:r>Math.PI&&(r-=$n),s<-Math.PI?s+=$n:s>Math.PI&&(s-=$n),r<=s?this._spherical.theta=Math.max(r,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+s)/2?Math.max(r,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let l=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const c=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),l=c!=this._spherical.radius}if(xn.setFromSpherical(this._spherical),xn.applyQuaternion(this._quatInverse),e.copy(this.target).add(xn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let c=null;if(this.object.isPerspectiveCamera){const f=xn.length();c=this._clampDistance(f*this._scale);const d=f-c;this.object.position.addScaledVector(this._dollyDirection,d),this.object.updateMatrixWorld(),l=!!d}else if(this.object.isOrthographicCamera){const f=new ot(this._mouse.x,this._mouse.y,0);f.unproject(this.object);const d=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),l=d!==this.object.zoom;const h=new ot(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(f),this.object.updateMatrixWorld(),c=xn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;c!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(c).add(this.object.position):(pc.origin.copy(this.object.position),pc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(pc.direction))<vN?this.object.lookAt(this.target):(dx.setFromNormalAndCoplanarPoint(this.object.up,this.target),pc.intersectPlane(dx,this.target))))}else if(this.object.isOrthographicCamera){const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),c!==this.object.zoom&&(this.object.updateProjectionMatrix(),l=!0)}return this._scale=1,this._performCursorZoom=!1,l||this._lastPosition.distanceToSquared(this.object.position)>kd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>kd||this._lastTargetPosition.distanceToSquared(this.target)>kd?(this.dispatchEvent(hx),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?$n/60*this.autoRotateSpeed*t:$n/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){xn.setFromMatrixColumn(e,0),xn.multiplyScalar(-t),this._panOffset.add(xn)}_panUp(t,e){this.screenSpacePanning===!0?xn.setFromMatrixColumn(e,1):(xn.setFromMatrixColumn(e,0),xn.crossVectors(this.object.up,xn)),xn.multiplyScalar(t),this._panOffset.add(xn)}_pan(t,e){const r=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;xn.copy(s).sub(this.target);let l=xn.length();l*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*l/r.clientHeight,this.object.matrix),this._panUp(2*e*l/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),s=t-r.left,l=e-r.top,c=r.width,f=r.height;this._mouse.x=s/c*2-1,this._mouse.y=-(l/f)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft($n*this._rotateDelta.x/e.clientHeight),this._rotateUp($n*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp($n*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-$n*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft($n*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-$n*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),r=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(r,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),r=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(r,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),r=t.pageX-e.x,s=t.pageY-e.y,l=Math.sqrt(r*r+s*s);this._dollyStart.set(0,l)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const r=this._getSecondPointerPosition(t),s=.5*(t.pageX+r.x),l=.5*(t.pageY+r.y);this._rotateEnd.set(s,l)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft($n*this._rotateDelta.x/e.clientHeight),this._rotateUp($n*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),r=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(r,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),r=t.pageX-e.x,s=t.pageY-e.y,l=Math.sqrt(r*r+s*s);this._dollyEnd.set(0,l),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const c=(t.pageX+e.x)*.5,f=(t.pageY+e.y)*.5;this._updateZoomParameters(c,f)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new me,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,r={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function xN(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function SN(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function MN(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(fM),this.state=qe.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function EN(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Js.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=qe.DOLLY;break;case Js.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=qe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=qe.ROTATE}break;case Js.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=qe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=qe.PAN}break;default:this.state=qe.NONE}this.state!==qe.NONE&&this.dispatchEvent(Hm)}function bN(i){switch(this.state){case qe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case qe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case qe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function TN(i){this.enabled===!1||this.enableZoom===!1||this.state!==qe.NONE||(i.preventDefault(),this.dispatchEvent(Hm),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(fM))}function AN(i){this.enabled!==!1&&this._handleKeyDown(i)}function RN(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case js.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=qe.TOUCH_ROTATE;break;case js.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=qe.TOUCH_PAN;break;default:this.state=qe.NONE}break;case 2:switch(this.touches.TWO){case js.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=qe.TOUCH_DOLLY_PAN;break;case js.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=qe.TOUCH_DOLLY_ROTATE;break;default:this.state=qe.NONE}break;default:this.state=qe.NONE}this.state!==qe.NONE&&this.dispatchEvent(Hm)}function wN(i){switch(this._trackPointer(i),this.state){case qe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case qe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case qe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case qe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=qe.NONE}}function CN(i){this.enabled!==!1&&i.preventDefault()}function DN(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function LN(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Vm extends Cn{constructor(t={}){super(),this.PARTICLE_COUNT=t.maxParticles||1e6,this.PARTICLE_CONTAINERS=t.containerCount||1,this.PARTICLES_PER_CONTAINER=Math.ceil(this.PARTICLE_COUNT/this.PARTICLE_CONTAINERS);const e=new L2;this.particleSpriteTex=t.particleSpriteTex||e.load("textures/particle2.png"),this.particleSpriteTex.wrapS=this.particleSpriteTex.wrapT=wc;const r=Vm.getShaderStrings();this.particleShaderMat=new Dr({transparent:!0,depthWrite:!1,depthTest:!1,blending:Ep,uniforms:{uTime:{value:0},uScale:{value:1},tSprite:{value:this.particleSpriteTex}},vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.rand=Array.from({length:1e5},()=>Math.random()-.5),this.randIndex=0,this.PARTICLE_CURSOR=0,this.particleContainers=[];for(let s=0;s<this.PARTICLE_CONTAINERS;++s){const l=new UN(this.PARTICLES_PER_CONTAINER,this);this.particleContainers.push(l),this.add(l)}}random(){return++this.randIndex>=this.rand.length?this.rand[this.randIndex=1]:this.rand[this.randIndex]}spawnParticle(t){++this.PARTICLE_CURSOR>=this.PARTICLE_COUNT&&(this.PARTICLE_CURSOR=0);const e=Math.floor(this.PARTICLE_CURSOR/this.PARTICLES_PER_CONTAINER);this.particleContainers[e].spawnParticle(t)}update(t){this.particleShaderMat.uniforms.uTime.value=t;for(const e of this.particleContainers)e.update(t)}dispose(){this.particleShaderMat.dispose(),this.particleSpriteTex.dispose();for(const t of this.particleContainers)t.dispose()}static getShaderStrings(){return{vertexShader:`
      uniform float uTime;
      uniform float uScale;

      /* packed attributes */
      attribute vec3 positionStart;
      attribute vec3 sizeLifeStart;  // x=size, y=lifeTime, z=startTime
      attribute vec3 color;

      varying vec4 vColor;
      varying float lifeLeft;

      void main () {

        float size      = sizeLifeStart.x;
        float lifeTime  = sizeLifeStart.y;
        float startTime = sizeLifeStart.z;

        float timeElapsed = uTime - startTime;
        lifeLeft = 1.0 - (timeElapsed / lifeTime);

        /* quadratic size fall‑off, clamped */
        gl_PointSize = min(24.0, (uScale * size) * lifeLeft * lifeLeft);

        vec4 mvPos = modelViewMatrix * vec4(positionStart, 1.0);

        /* If not yet born or already dead, collapse to nothing */
        if (timeElapsed < 0.0 || lifeLeft <= 0.0) {
          gl_PointSize = 0.0;
          lifeLeft = 0.0;
        }

        vColor = vec4(color, 1.0);
        gl_Position = projectionMatrix * mvPos;
      }`,fragmentShader:`
      varying vec4 vColor;
      varying float lifeLeft;
      uniform sampler2D tSprite;

      float scaleLinear (float v, vec2 d)       { return (v - d.x) / (d.y - d.x); }
      float scaleLinear (float v, vec2 d, vec2 r){ return mix(r.x, r.y, scaleLinear(v,d)); }

      void main () {
        float alpha = lifeLeft > 0.995
                    ? scaleLinear(lifeLeft, vec2(1.0, 0.995), vec2(0.0, 1.0))
                    : lifeLeft * 0.75;

        vec4 tex = texture2D(tSprite, gl_PointCoord);
        gl_FragColor = vec4(vColor.rgb * tex.a, alpha * tex.a);
      }`}}}class UN extends Cn{constructor(t,e){super(),this.FREE_CURSOR=0,this.FRAME_ADVANCE=0,this.PARTICLE_COUNT=t,this.PARTICLE_CURSOR=0,this.time=0,this.count=0,this.offset=0,this.DPR=window.devicePixelRatio,this.particleSystem=e,this._color=new De,this.particleShaderGeo=new $i;const r=7,s=new Float32Array(this.PARTICLE_COUNT*r),l=new x2(s,r).setUsage(um),c=new Lc(l,3,0);this.particleShaderGeo.setAttribute("positionStart",c),this.particleShaderGeo.setAttribute("position",c);const f=new Lc(l,3,3);this.particleShaderGeo.setAttribute("sizeLifeStart",f);const d=new Float32Array(this.PARTICLE_COUNT*3),h=new gi(d,3).setUsage(um);this.particleShaderGeo.setAttribute("color",h),this.pointsObj3d=new b2(this.particleShaderGeo,this.particleSystem.particleShaderMat),this.pointsObj3d.frustumCulled=!1,this.pointsObj3d.geometry.drawRange.count=0,this.add(this.pointsObj3d),this.attrPositionStart=c,this.attrMisc=f,this.attrColor=h}spawnParticle(t={}){const e=this.FREE_CURSOR,s=e*7,l=this.attrPositionStart.data.array,c=t.position??new ot;let f=t.size??10;const d=t.lifetime??5;this.DPR&&(f*=this.DPR);const h=this.time+this.particleSystem.random()*.05;l[s+0]=c.x,l[s+1]=c.y,l[s+2]=c.z,l[s+3]=f,l[s+4]=d,l[s+5]=h;const m=this.attrColor.array,g=this._color.set(t.color??16777215);m[e*3+0]=g.r,m[e*3+1]=g.g,m[e*3+2]=g.b,this.attrPositionStart.data.needsUpdate=!0,this.attrColor.needsUpdate=!0,this.pointsObj3d.geometry.drawRange.count<this.PARTICLE_COUNT&&++this.pointsObj3d.geometry.drawRange.count,this.FREE_CURSOR=(e+1)%this.PARTICLE_COUNT}update(t){this.time=t,this.FRAME_ADVANCE=0;const e=7,r=this.attrPositionStart.data.array;let s=this.FREE_CURSOR;for(;;){const l=s*e,c=r[l+4],f=r[l+5]+c;if(c===0||t>=f||(s=(s+1)%this.PARTICLE_COUNT,s===this.FREE_CURSOR))break;++this.FRAME_ADVANCE}this.FREE_CURSOR=s}dispose(){this.particleShaderGeo.dispose()}}const Hd=(()=>{let i=null;return()=>{if(i!==null){const l=i;return i=null,l}let t,e,r;do t=Math.random()*2-1,e=Math.random()*2-1,r=t*t+e*e;while(!r||r>=1);const s=Math.sqrt(-2*Math.log(r)/r);return i=e*s,t*s}})(),NN=i=>i*Math.PI/180;class PN{constructor({maxParticles:t=5e5}={}){this.options={position:new ot,velocity:new ot,color:11176191,lifetime:1,size:5},this.spawnDistance=.03,this.fuzzBrush={count:0,sx:0,sy:0,sz:0},this.tracerPos=new ot,this.tracerRot=new Cr,this.stack=[],this.particleSystem=new Vm({maxParticles:t}),this.obj3d=new Cn,this.obj3d.add(this.particleSystem),this.scratch=new ot}color(t){this.options.color=t}size(t){this.options.size=t}spacing(t){this.spawnDistance=t}residue(t){this.options.lifetime=t}fuzz(t=0,e=4,r=e,s=e){this.fuzzBrush={count:t,sx:e,sy:r,sz:s}}move(t){this.options.position.copy(t),this.tracerPos.copy(t)}trace(t){const e=t.clone().sub(this.tracerPos),r=e.length();if(!r)return;e.normalize();const s=r/this.spawnDistance;for(let l=0;l<s;l++)this.tracerPos.addScaledVector(e,this.spawnDistance),this._spawnWithFuzz(this.tracerPos);this.tracerPos.copy(t)}moveRel(t){const e=t.clone().applyQuaternion(this.tracerRot).add(this.tracerPos);this.move(e)}traceRel(t){const e=t.clone().applyQuaternion(this.tracerRot).add(this.tracerPos);this.trace(e)}yaw(t){this._rotateAroundAxis(new ot(0,1,0),t)}pitch(t){this._rotateAroundAxis(new ot(1,0,0),t)}roll(t){this._rotateAroundAxis(new ot(0,0,1),t)}_rotateAroundAxis(t,e){const r=new Cr().setFromAxisAngle(t,NN(e));this.tracerRot.multiply(r)}push(){this.stack.push({pos:this.tracerPos.clone(),rot:this.tracerRot.clone(),opts:{...this.options},fuzz:{...this.fuzzBrush},space:this.spawnDistance})}pop(){const t=this.stack.pop();t&&(this.tracerPos.copy(t.pos),this.tracerRot.copy(t.rot),this.options={...this.options,...t.opts},this.fuzzBrush={...t.fuzz},this.spawnDistance=t.space,this.options.position.copy(this.tracerPos))}_spawnWithFuzz(t){const e=this.particleSystem,{position:r}=this.options,{count:s,sx:l,sy:c,sz:f}=this.fuzzBrush;r.copy(t),e.spawnParticle(this.options);for(let d=0;d<s;d++)this.scratch.set(Hd()*l,Hd()*c,Hd()*f),r.addVectors(t,this.scratch),e.spawnParticle(this.options)}deposit(t){this._spawnWithFuzz(t),this.tracerPos.copy(t)}update(t){this.particleSystem.update((this.animate?t:100)/1e3)}getSceneGraphNode(){return this.obj3d}}var Vd={exports:{}},Gd,px;function Gm(){if(px)return Gd;px=1,Gd=t;var i=+(Math.pow(2,27)+1);function t(e,r,s){var l=e*r,c=i*e,f=c-e,d=c-f,h=e-d,m=i*r,g=m-r,v=m-g,y=r-v,b=l-d*v,R=b-h*v,M=R-d*y,x=h*y-M;return s?(s[0]=x,s[1]=l,s):[x,l]}return Gd}var qd,mx;function hM(){if(mx)return qd;mx=1,qd=t;function i(e,r){var s=e+r,l=s-e,c=s-l,f=r-l,d=e-c,h=d+f;return h?[h,s]:[s]}function t(e,r){var s=e.length|0,l=r.length|0;if(s===1&&l===1)return i(e[0],r[0]);var c=s+l,f=new Array(c),d=0,h=0,m=0,g=Math.abs,v=e[h],y=g(v),b=r[m],R=g(b),M,x;y<R?(x=v,h+=1,h<s&&(v=e[h],y=g(v))):(x=b,m+=1,m<l&&(b=r[m],R=g(b))),h<s&&y<R||m>=l?(M=v,h+=1,h<s&&(v=e[h],y=g(v))):(M=b,m+=1,m<l&&(b=r[m],R=g(b)));for(var D=M+x,S=D-M,E=x-S,A=E,L=D,P,O,C,T,N;h<s&&m<l;)y<R?(M=v,h+=1,h<s&&(v=e[h],y=g(v))):(M=b,m+=1,m<l&&(b=r[m],R=g(b))),x=A,D=M+x,S=D-M,E=x-S,E&&(f[d++]=E),P=L+D,O=P-L,C=P-O,T=D-O,N=L-C,A=N+T,L=P;for(;h<s;)M=v,x=A,D=M+x,S=D-M,E=x-S,E&&(f[d++]=E),P=L+D,O=P-L,C=P-O,T=D-O,N=L-C,A=N+T,L=P,h+=1,h<s&&(v=e[h]);for(;m<l;)M=b,x=A,D=M+x,S=D-M,E=x-S,E&&(f[d++]=E),P=L+D,O=P-L,C=P-O,T=D-O,N=L-C,A=N+T,L=P,m+=1,m<l&&(b=r[m]);return A&&(f[d++]=A),L&&(f[d++]=L),d||(f[d++]=0),f.length=d,f}return qd}var Xd,gx;function ON(){if(gx)return Xd;gx=1,Xd=i;function i(t,e,r){var s=t+e,l=s-t,c=s-l,f=e-l,d=t-c;return r?(r[0]=d+f,r[1]=s,r):[d+f,s]}return Xd}var Wd,_x;function dM(){if(_x)return Wd;_x=1;var i=Gm(),t=ON();Wd=e;function e(r,s){var l=r.length;if(l===1){var c=i(r[0],s);return c[0]?c:[c[1]]}var f=new Array(2*l),d=[.1,.1],h=[.1,.1],m=0;i(r[0],s,d),d[0]&&(f[m++]=d[0]);for(var g=1;g<l;++g){i(r[g],s,h);var v=d[1];t(v,h[0],d),d[0]&&(f[m++]=d[0]);var y=h[1],b=d[1],R=y+b,M=R-y,x=b-M;d[1]=R,x&&(f[m++]=x)}return d[1]&&(f[m++]=d[1]),m===0&&(f[m++]=0),f.length=m,f}return Wd}var jd,vx;function zN(){if(vx)return jd;vx=1,jd=t;function i(e,r){var s=e+r,l=s-e,c=s-l,f=r-l,d=e-c,h=d+f;return h?[h,s]:[s]}function t(e,r){var s=e.length|0,l=r.length|0;if(s===1&&l===1)return i(e[0],-r[0]);var c=s+l,f=new Array(c),d=0,h=0,m=0,g=Math.abs,v=e[h],y=g(v),b=-r[m],R=g(b),M,x;y<R?(x=v,h+=1,h<s&&(v=e[h],y=g(v))):(x=b,m+=1,m<l&&(b=-r[m],R=g(b))),h<s&&y<R||m>=l?(M=v,h+=1,h<s&&(v=e[h],y=g(v))):(M=b,m+=1,m<l&&(b=-r[m],R=g(b)));for(var D=M+x,S=D-M,E=x-S,A=E,L=D,P,O,C,T,N;h<s&&m<l;)y<R?(M=v,h+=1,h<s&&(v=e[h],y=g(v))):(M=b,m+=1,m<l&&(b=-r[m],R=g(b))),x=A,D=M+x,S=D-M,E=x-S,E&&(f[d++]=E),P=L+D,O=P-L,C=P-O,T=D-O,N=L-C,A=N+T,L=P;for(;h<s;)M=v,x=A,D=M+x,S=D-M,E=x-S,E&&(f[d++]=E),P=L+D,O=P-L,C=P-O,T=D-O,N=L-C,A=N+T,L=P,h+=1,h<s&&(v=e[h]);for(;m<l;)M=b,x=A,D=M+x,S=D-M,E=x-S,E&&(f[d++]=E),P=L+D,O=P-L,C=P-O,T=D-O,N=L-C,A=N+T,L=P,m+=1,m<l&&(b=-r[m]);return A&&(f[d++]=A),L&&(f[d++]=L),d||(f[d++]=0),f.length=d,f}return jd}var yx;function IN(){return yx||(yx=1,function(i){var t=Gm(),e=hM(),r=dM(),s=zN(),l=5,c=11102230246251565e-32,f=(3+16*c)*c,d=(7+56*c)*c;function h(S,E,A,L){return function(O,C,T){var N=S(S(E(C[1],T[0]),E(-T[1],C[0])),S(E(O[1],C[0]),E(-C[1],O[0]))),k=S(E(O[1],T[0]),E(-T[1],O[0])),q=L(N,k);return q[q.length-1]}}function m(S,E,A,L){return function(O,C,T,N){var k=S(S(A(S(E(T[1],N[0]),E(-N[1],T[0])),C[2]),S(A(S(E(C[1],N[0]),E(-N[1],C[0])),-T[2]),A(S(E(C[1],T[0]),E(-T[1],C[0])),N[2]))),S(A(S(E(C[1],N[0]),E(-N[1],C[0])),O[2]),S(A(S(E(O[1],N[0]),E(-N[1],O[0])),-C[2]),A(S(E(O[1],C[0]),E(-C[1],O[0])),N[2])))),q=S(S(A(S(E(T[1],N[0]),E(-N[1],T[0])),O[2]),S(A(S(E(O[1],N[0]),E(-N[1],O[0])),-T[2]),A(S(E(O[1],T[0]),E(-T[1],O[0])),N[2]))),S(A(S(E(C[1],T[0]),E(-T[1],C[0])),O[2]),S(A(S(E(O[1],T[0]),E(-T[1],O[0])),-C[2]),A(S(E(O[1],C[0]),E(-C[1],O[0])),T[2])))),K=L(k,q);return K[K.length-1]}}function g(S,E,A,L){return function(O,C,T,N,k){var q=S(S(S(A(S(A(S(E(N[1],k[0]),E(-k[1],N[0])),T[2]),S(A(S(E(T[1],k[0]),E(-k[1],T[0])),-N[2]),A(S(E(T[1],N[0]),E(-N[1],T[0])),k[2]))),C[3]),S(A(S(A(S(E(N[1],k[0]),E(-k[1],N[0])),C[2]),S(A(S(E(C[1],k[0]),E(-k[1],C[0])),-N[2]),A(S(E(C[1],N[0]),E(-N[1],C[0])),k[2]))),-T[3]),A(S(A(S(E(T[1],k[0]),E(-k[1],T[0])),C[2]),S(A(S(E(C[1],k[0]),E(-k[1],C[0])),-T[2]),A(S(E(C[1],T[0]),E(-T[1],C[0])),k[2]))),N[3]))),S(A(S(A(S(E(T[1],N[0]),E(-N[1],T[0])),C[2]),S(A(S(E(C[1],N[0]),E(-N[1],C[0])),-T[2]),A(S(E(C[1],T[0]),E(-T[1],C[0])),N[2]))),-k[3]),S(A(S(A(S(E(N[1],k[0]),E(-k[1],N[0])),C[2]),S(A(S(E(C[1],k[0]),E(-k[1],C[0])),-N[2]),A(S(E(C[1],N[0]),E(-N[1],C[0])),k[2]))),O[3]),A(S(A(S(E(N[1],k[0]),E(-k[1],N[0])),O[2]),S(A(S(E(O[1],k[0]),E(-k[1],O[0])),-N[2]),A(S(E(O[1],N[0]),E(-N[1],O[0])),k[2]))),-C[3])))),S(S(A(S(A(S(E(C[1],k[0]),E(-k[1],C[0])),O[2]),S(A(S(E(O[1],k[0]),E(-k[1],O[0])),-C[2]),A(S(E(O[1],C[0]),E(-C[1],O[0])),k[2]))),N[3]),S(A(S(A(S(E(C[1],N[0]),E(-N[1],C[0])),O[2]),S(A(S(E(O[1],N[0]),E(-N[1],O[0])),-C[2]),A(S(E(O[1],C[0]),E(-C[1],O[0])),N[2]))),-k[3]),A(S(A(S(E(T[1],N[0]),E(-N[1],T[0])),C[2]),S(A(S(E(C[1],N[0]),E(-N[1],C[0])),-T[2]),A(S(E(C[1],T[0]),E(-T[1],C[0])),N[2]))),O[3]))),S(A(S(A(S(E(T[1],N[0]),E(-N[1],T[0])),O[2]),S(A(S(E(O[1],N[0]),E(-N[1],O[0])),-T[2]),A(S(E(O[1],T[0]),E(-T[1],O[0])),N[2]))),-C[3]),S(A(S(A(S(E(C[1],N[0]),E(-N[1],C[0])),O[2]),S(A(S(E(O[1],N[0]),E(-N[1],O[0])),-C[2]),A(S(E(O[1],C[0]),E(-C[1],O[0])),N[2]))),T[3]),A(S(A(S(E(C[1],T[0]),E(-T[1],C[0])),O[2]),S(A(S(E(O[1],T[0]),E(-T[1],O[0])),-C[2]),A(S(E(O[1],C[0]),E(-C[1],O[0])),T[2]))),-N[3]))))),K=S(S(S(A(S(A(S(E(N[1],k[0]),E(-k[1],N[0])),T[2]),S(A(S(E(T[1],k[0]),E(-k[1],T[0])),-N[2]),A(S(E(T[1],N[0]),E(-N[1],T[0])),k[2]))),O[3]),A(S(A(S(E(N[1],k[0]),E(-k[1],N[0])),O[2]),S(A(S(E(O[1],k[0]),E(-k[1],O[0])),-N[2]),A(S(E(O[1],N[0]),E(-N[1],O[0])),k[2]))),-T[3])),S(A(S(A(S(E(T[1],k[0]),E(-k[1],T[0])),O[2]),S(A(S(E(O[1],k[0]),E(-k[1],O[0])),-T[2]),A(S(E(O[1],T[0]),E(-T[1],O[0])),k[2]))),N[3]),A(S(A(S(E(T[1],N[0]),E(-N[1],T[0])),O[2]),S(A(S(E(O[1],N[0]),E(-N[1],O[0])),-T[2]),A(S(E(O[1],T[0]),E(-T[1],O[0])),N[2]))),-k[3]))),S(S(A(S(A(S(E(T[1],k[0]),E(-k[1],T[0])),C[2]),S(A(S(E(C[1],k[0]),E(-k[1],C[0])),-T[2]),A(S(E(C[1],T[0]),E(-T[1],C[0])),k[2]))),O[3]),A(S(A(S(E(T[1],k[0]),E(-k[1],T[0])),O[2]),S(A(S(E(O[1],k[0]),E(-k[1],O[0])),-T[2]),A(S(E(O[1],T[0]),E(-T[1],O[0])),k[2]))),-C[3])),S(A(S(A(S(E(C[1],k[0]),E(-k[1],C[0])),O[2]),S(A(S(E(O[1],k[0]),E(-k[1],O[0])),-C[2]),A(S(E(O[1],C[0]),E(-C[1],O[0])),k[2]))),T[3]),A(S(A(S(E(C[1],T[0]),E(-T[1],C[0])),O[2]),S(A(S(E(O[1],T[0]),E(-T[1],O[0])),-C[2]),A(S(E(O[1],C[0]),E(-C[1],O[0])),T[2]))),-k[3])))),X=L(q,K);return X[X.length-1]}}function v(S){var E=S===3?h:S===4?m:g;return E(e,t,r,s)}var y=v(3),b=v(4),R=[function(){return 0},function(){return 0},function(E,A){return A[0]-E[0]},function(E,A,L){var P=(E[1]-L[1])*(A[0]-L[0]),O=(E[0]-L[0])*(A[1]-L[1]),C=P-O,T;if(P>0){if(O<=0)return C;T=P+O}else if(P<0){if(O>=0)return C;T=-(P+O)}else return C;var N=f*T;return C>=N||C<=-N?C:y(E,A,L)},function(E,A,L,P){var O=E[0]-P[0],C=A[0]-P[0],T=L[0]-P[0],N=E[1]-P[1],k=A[1]-P[1],q=L[1]-P[1],K=E[2]-P[2],X=A[2]-P[2],H=L[2]-P[2],Z=C*q,J=T*k,vt=T*N,w=O*q,Y=O*k,ft=C*N,B=K*(Z-J)+X*(vt-w)+H*(Y-ft),tt=(Math.abs(Z)+Math.abs(J))*Math.abs(K)+(Math.abs(vt)+Math.abs(w))*Math.abs(X)+(Math.abs(Y)+Math.abs(ft))*Math.abs(H),pt=d*tt;return B>pt||-B>pt?B:b(E,A,L,P)}];function M(S){var E=R[S.length];return E||(E=R[S.length]=v(S.length)),E.apply(void 0,S)}function x(S,E,A,L,P,O,C){return function(N,k,q,K,X){switch(arguments.length){case 0:case 1:return 0;case 2:return L(N,k);case 3:return P(N,k,q);case 4:return O(N,k,q,K);case 5:return C(N,k,q,K,X)}for(var H=new Array(arguments.length),Z=0;Z<arguments.length;++Z)H[Z]=arguments[Z];return S(H)}}function D(){for(;R.length<=l;)R.push(v(R.length));i.exports=x.apply(void 0,[M].concat(R));for(var S=0;S<=l;++S)i.exports[S]=R[S]}D()}(Vd)),Vd.exports}var Xn={},en={},xx;function FN(){if(xx)return en;xx=1;var i=32;en.INT_BITS=i,en.INT_MAX=2147483647,en.INT_MIN=-1<<i-1,en.sign=function(r){return(r>0)-(r<0)},en.abs=function(r){var s=r>>i-1;return(r^s)-s},en.min=function(r,s){return s^(r^s)&-(r<s)},en.max=function(r,s){return r^(r^s)&-(r<s)},en.isPow2=function(r){return!(r&r-1)&&!!r},en.log2=function(r){var s,l;return s=(r>65535)<<4,r>>>=s,l=(r>255)<<3,r>>>=l,s|=l,l=(r>15)<<2,r>>>=l,s|=l,l=(r>3)<<1,r>>>=l,s|=l,s|r>>1},en.log10=function(r){return r>=1e9?9:r>=1e8?8:r>=1e7?7:r>=1e6?6:r>=1e5?5:r>=1e4?4:r>=1e3?3:r>=100?2:r>=10?1:0},en.popCount=function(r){return r=r-(r>>>1&1431655765),r=(r&858993459)+(r>>>2&858993459),(r+(r>>>4)&252645135)*16843009>>>24};function t(r){var s=32;return r&=-r,r&&s--,r&65535&&(s-=16),r&16711935&&(s-=8),r&252645135&&(s-=4),r&858993459&&(s-=2),r&1431655765&&(s-=1),s}en.countTrailingZeros=t,en.nextPow2=function(r){return r+=r===0,--r,r|=r>>>1,r|=r>>>2,r|=r>>>4,r|=r>>>8,r|=r>>>16,r+1},en.prevPow2=function(r){return r|=r>>>1,r|=r>>>2,r|=r>>>4,r|=r>>>8,r|=r>>>16,r-(r>>>1)},en.parity=function(r){return r^=r>>>16,r^=r>>>8,r^=r>>>4,r&=15,27030>>>r&1};var e=new Array(256);return function(r){for(var s=0;s<256;++s){var l=s,c=s,f=7;for(l>>>=1;l;l>>>=1)c<<=1,c|=l&1,--f;r[s]=c<<f&255}}(e),en.reverse=function(r){return e[r&255]<<24|e[r>>>8&255]<<16|e[r>>>16&255]<<8|e[r>>>24&255]},en.interleave2=function(r,s){return r&=65535,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,s&=65535,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,r|s<<1},en.deinterleave2=function(r,s){return r=r>>>s&1431655765,r=(r|r>>>1)&858993459,r=(r|r>>>2)&252645135,r=(r|r>>>4)&16711935,r=(r|r>>>16)&65535,r<<16>>16},en.interleave3=function(r,s,l){return r&=1023,r=(r|r<<16)&4278190335,r=(r|r<<8)&251719695,r=(r|r<<4)&3272356035,r=(r|r<<2)&1227133513,s&=1023,s=(s|s<<16)&4278190335,s=(s|s<<8)&251719695,s=(s|s<<4)&3272356035,s=(s|s<<2)&1227133513,r|=s<<1,l&=1023,l=(l|l<<16)&4278190335,l=(l|l<<8)&251719695,l=(l|l<<4)&3272356035,l=(l|l<<2)&1227133513,r|l<<2},en.deinterleave3=function(r,s){return r=r>>>s&1227133513,r=(r|r>>>2)&3272356035,r=(r|r>>>4)&251719695,r=(r|r>>>8)&4278190335,r=(r|r>>>16)&1023,r<<22>>22},en.nextCombination=function(r){var s=r|r-1;return s+1|(~s&-~s)-1>>>t(r)+1},en}var Yd,Sx;function BN(){if(Sx)return Yd;Sx=1,Yd=i;function i(e){this.roots=new Array(e),this.ranks=new Array(e);for(var r=0;r<e;++r)this.roots[r]=r,this.ranks[r]=0}var t=i.prototype;return Object.defineProperty(t,"length",{get:function(){return this.roots.length}}),t.makeSet=function(){var e=this.roots.length;return this.roots.push(e),this.ranks.push(0),e},t.find=function(e){for(var r=e,s=this.roots;s[e]!==e;)e=s[e];for(;s[r]!==e;){var l=s[r];s[r]=e,r=l}return e},t.link=function(e,r){var s=this.find(e),l=this.find(r);if(s!==l){var c=this.ranks,f=this.roots,d=c[s],h=c[l];d<h?f[s]=l:h<d?f[l]=s:(f[l]=s,++c[s])}},Yd}var Mx;function kN(){if(Mx)return Xn;Mx=1;var i=FN(),t=BN();function e(D){for(var S=0,E=Math.max,A=0,L=D.length;A<L;++A)S=E(S,D[A].length);return S-1}Xn.dimension=e;function r(D){for(var S=-1,E=Math.max,A=0,L=D.length;A<L;++A)for(var P=D[A],O=0,C=P.length;O<C;++O)S=E(S,P[O]);return S+1}Xn.countVertices=r;function s(D){for(var S=new Array(D.length),E=0,A=D.length;E<A;++E)S[E]=D[E].slice(0);return S}Xn.cloneCells=s;function l(D,S){var E=D.length,A=D.length-S.length,L=Math.min;if(A)return A;switch(E){case 0:return 0;case 1:return D[0]-S[0];case 2:var N=D[0]+D[1]-S[0]-S[1];return N||L(D[0],D[1])-L(S[0],S[1]);case 3:var P=D[0]+D[1],O=S[0]+S[1];if(N=P+D[2]-(O+S[2]),N)return N;var C=L(D[0],D[1]),T=L(S[0],S[1]),N=L(C,D[2])-L(T,S[2]);return N||L(C+D[2],P)-L(T+S[2],O);default:var k=D.slice(0);k.sort();var q=S.slice(0);q.sort();for(var K=0;K<E;++K)if(A=k[K]-q[K],A)return A;return 0}}Xn.compareCells=l;function c(D,S){return l(D[0],S[0])}function f(D,S){if(S){for(var E=D.length,A=new Array(E),L=0;L<E;++L)A[L]=[D[L],S[L]];A.sort(c);for(var L=0;L<E;++L)D[L]=A[L][0],S[L]=A[L][1];return D}else return D.sort(l),D}Xn.normalize=f;function d(D){if(D.length===0)return[];for(var S=1,E=D.length,A=1;A<E;++A){var L=D[A];if(l(L,D[A-1])){if(A===S){S++;continue}D[S++]=L}}return D.length=S,D}Xn.unique=d;function h(D,S){for(var E=0,A=D.length-1,L=-1;E<=A;){var P=E+A>>1,O=l(D[P],S);O<=0?(O===0&&(L=P),E=P+1):O>0&&(A=P-1)}return L}Xn.findCell=h;function m(D,S){for(var E=new Array(D.length),A=0,L=E.length;A<L;++A)E[A]=[];for(var P=[],A=0,O=S.length;A<O;++A)for(var C=S[A],T=C.length,N=1,k=1<<T;N<k;++N){P.length=i.popCount(N);for(var q=0,K=0;K<T;++K)N&1<<K&&(P[q++]=C[K]);var X=h(D,P);if(!(X<0))for(;E[X++].push(A),!(X>=D.length||l(D[X],P)!==0););}return E}Xn.incidence=m;function g(D,S){if(!S)return m(d(y(D,0)),D);for(var E=new Array(S),A=0;A<S;++A)E[A]=[];for(var A=0,L=D.length;A<L;++A)for(var P=D[A],O=0,C=P.length;O<C;++O)E[P[O]].push(A);return E}Xn.dual=g;function v(D){for(var S=[],E=0,A=D.length;E<A;++E)for(var L=D[E],P=L.length|0,O=1,C=1<<P;O<C;++O){for(var T=[],N=0;N<P;++N)O>>>N&1&&T.push(L[N]);S.push(T)}return f(S)}Xn.explode=v;function y(D,S){if(S<0)return[];for(var E=[],A=(1<<S+1)-1,L=0;L<D.length;++L)for(var P=D[L],O=A;O<1<<P.length;O=i.nextCombination(O)){for(var C=new Array(S+1),T=0,N=0;N<P.length;++N)O&1<<N&&(C[T++]=P[N]);E.push(C)}return f(E)}Xn.skeleton=y;function b(D){for(var S=[],E=0,A=D.length;E<A;++E)for(var L=D[E],P=0,O=L.length;P<O;++P){for(var C=new Array(L.length-1),T=0,N=0;T<O;++T)T!==P&&(C[N++]=L[T]);S.push(C)}return f(S)}Xn.boundary=b;function R(D,S){for(var E=new t(S),A=0;A<D.length;++A)for(var L=D[A],P=0;P<L.length;++P)for(var O=P+1;O<L.length;++O)E.link(L[P],L[O]);for(var C=[],T=E.ranks,A=0;A<T.length;++A)T[A]=-1;for(var A=0;A<D.length;++A){var N=E.find(D[A][0]);T[N]<0?(T[N]=C.length,C.push([D[A].slice(0)])):C[T[N]].push(D[A].slice(0))}return C}function M(D){for(var S=d(f(y(D,0))),E=new t(S.length),A=0;A<D.length;++A)for(var L=D[A],P=0;P<L.length;++P)for(var O=h(S,[L[P]]),C=P+1;C<L.length;++C)E.link(O,h(S,[L[C]]));for(var T=[],N=E.ranks,A=0;A<N.length;++A)N[A]=-1;for(var A=0;A<D.length;++A){var k=E.find(h(S,[D[A][0]]));N[k]<0?(N[k]=T.length,T.push([D[A].slice(0)])):T[N[k]].push(D[A].slice(0))}return T}function x(D,S){return S?R(D,S):M(D)}return Xn.connectedComponents=x,Xn}var Zd,Ex;function HN(){if(Ex)return Zd;Ex=1,Zd=h;var i=IN(),t=kN().compareCells;function e(m,g,v){this.vertices=m,this.adjacent=g,this.boundary=v,this.lastVisited=-1}e.prototype.flip=function(){var m=this.vertices[0];this.vertices[0]=this.vertices[1],this.vertices[1]=m;var g=this.adjacent[0];this.adjacent[0]=this.adjacent[1],this.adjacent[1]=g};function r(m,g,v){this.vertices=m,this.cell=g,this.index=v}function s(m,g){return t(m.vertices,g.vertices)}function l(m){for(var g=["function orient(){var tuple=this.tuple;return test("],v=0;v<=m;++v)v>0&&g.push(","),g.push("tuple[",v,"]");g.push(")}return orient");var y=new Function("test",g.join("")),b=i[m+1];return b||(b=i),y(b)}var c=[];function f(m,g,v){this.dimension=m,this.vertices=g,this.simplices=v,this.interior=v.filter(function(R){return!R.boundary}),this.tuple=new Array(m+1);for(var y=0;y<=m;++y)this.tuple[y]=this.vertices[y];var b=c[m];b||(b=c[m]=l(m)),this.orient=b}var d=f.prototype;d.handleBoundaryDegeneracy=function(m,g){var v=this.dimension,y=this.vertices.length-1,b=this.tuple,R=this.vertices,M=[m];for(m.lastVisited=-y;M.length>0;){m=M.pop(),m.vertices;for(var x=m.adjacent,D=0;D<=v;++D){var S=x[D];if(!(!S.boundary||S.lastVisited<=-y)){for(var E=S.vertices,A=0;A<=v;++A){var L=E[A];L<0?b[A]=g:b[A]=R[L]}var P=this.orient();if(P>0)return S;S.lastVisited=-y,P===0&&M.push(S)}}}return null},d.walk=function(m,g){var v=this.vertices.length-1,y=this.dimension,b=this.vertices,R=this.tuple,M=g?this.interior.length*Math.random()|0:this.interior.length-1,x=this.interior[M];t:for(;!x.boundary;){for(var D=x.vertices,S=x.adjacent,E=0;E<=y;++E)R[E]=b[D[E]];x.lastVisited=v;for(var E=0;E<=y;++E){var A=S[E];if(!(A.lastVisited>=v)){var L=R[E];R[E]=m;var P=this.orient();if(R[E]=L,P<0){x=A;continue t}else A.boundary?A.lastVisited=-v:A.lastVisited=v}}return}return x},d.addPeaks=function(m,g){var v=this.vertices.length-1,y=this.dimension,b=this.vertices,R=this.tuple,M=this.interior,x=this.simplices,D=[g];g.lastVisited=v,g.vertices[g.vertices.indexOf(-1)]=v,g.boundary=!1,M.push(g);for(var S=[];D.length>0;){var g=D.pop(),E=g.vertices,A=g.adjacent,L=E.indexOf(v);if(!(L<0)){for(var P=0;P<=y;++P)if(P!==L){var O=A[P];if(!(!O.boundary||O.lastVisited>=v)){var C=O.vertices;if(O.lastVisited!==-v){for(var T=0,N=0;N<=y;++N)C[N]<0?(T=N,R[N]=m):R[N]=b[C[N]];var k=this.orient();if(k>0){C[T]=v,O.boundary=!1,M.push(O),D.push(O),O.lastVisited=v;continue}else O.lastVisited=-v}var q=O.adjacent,K=E.slice(),X=A.slice(),H=new e(K,X,!0);x.push(H);var Z=q.indexOf(g);if(!(Z<0)){q[Z]=H,X[L]=O,K[P]=-1,X[P]=g,A[P]=H,H.flip();for(var N=0;N<=y;++N){var J=K[N];if(!(J<0||J===v)){for(var vt=new Array(y-1),w=0,Y=0;Y<=y;++Y){var ft=K[Y];ft<0||Y===N||(vt[w++]=ft)}S.push(new r(vt,H,N))}}}}}}}S.sort(s);for(var P=0;P+1<S.length;P+=2){var B=S[P],tt=S[P+1],pt=B.index,gt=tt.index;pt<0||gt<0||(B.cell.adjacent[B.index]=tt.cell,tt.cell.adjacent[tt.index]=B.cell)}},d.insert=function(m,g){var v=this.vertices;v.push(m);var y=this.walk(m,g);if(y){for(var b=this.dimension,R=this.tuple,M=0;M<=b;++M){var x=y.vertices[M];x<0?R[M]=m:R[M]=v[x]}var D=this.orient(R);D<0||D===0&&(y=this.handleBoundaryDegeneracy(y,m),!y)||this.addPeaks(m,y)}},d.boundary=function(){for(var m=this.dimension,g=[],v=this.simplices,y=v.length,b=0;b<y;++b){var R=v[b];if(R.boundary){for(var M=new Array(m),x=R.vertices,D=0,S=0,E=0;E<=m;++E)x[E]>=0?M[D++]=x[E]:S=E&1;if(S===(m&1)){var A=M[0];M[0]=M[1],M[1]=A}g.push(M)}}return g};function h(m,g){var v=m.length;if(v===0)throw new Error("Must have at least d+1 points");var y=m[0].length;if(v<=y)throw new Error("Must input at least d+1 points");var b=m.slice(0,y+1),R=i.apply(void 0,b);if(R===0)throw new Error("Input not in general position");for(var M=new Array(y+1),x=0;x<=y;++x)M[x]=x;R<0&&(M[0]=1,M[1]=0);for(var D=new e(M,new Array(y+1),!1),S=D.adjacent,E=new Array(y+2),x=0;x<=y;++x){for(var A=M.slice(),L=0;L<=y;++L)L===x&&(A[L]=-1);var P=A[0];A[0]=A[1],A[1]=P;var O=new e(A,new Array(y+1),!0);S[x]=O,E[x]=O}E[y+1]=D;for(var x=0;x<=y;++x)for(var A=S[x].vertices,C=S[x].adjacent,L=0;L<=y;++L){var T=A[L];if(T<0){C[L]=D;continue}for(var N=0;N<=y;++N)S[N].vertices.indexOf(T)<0&&(C[L]=S[N])}for(var k=new f(y,b,E),q=!!g,x=y+1;x<v;++x)k.insert(m[x],q);return k.boundary()}return Zd}var Kd,bx;function VN(){if(bx)return Kd;bx=1;function i(r,s){for(var l=1,c=r.length,f=r[0],d=r[0],h=1;h<c;++h)if(d=f,f=r[h],s(f,d)){if(h===l){l++;continue}r[l++]=f}return r.length=l,r}function t(r){for(var s=1,l=r.length,c=r[0],f=r[0],d=1;d<l;++d,f=c)if(f=c,c=r[d],c!==f){if(d===s){s++;continue}r[s++]=c}return r.length=s,r}function e(r,s,l){return r.length===0?r:s?(l||r.sort(s),i(r,s)):(l||r.sort(),t(r))}return Kd=e,Kd}var Qd,Tx;function GN(){if(Tx)return Qd;Tx=1;var i=HN(),t=VN();Qd=l;function e(c,f){this.point=c,this.index=f}function r(c,f){for(var d=c.point,h=f.point,m=d.length,g=0;g<m;++g){var v=h[g]-d[g];if(v)return v}return 0}function s(c,f,d){if(c===1)return d?[[-1,0]]:[];var h=f.map(function(b,R){return[b[0],R]});h.sort(function(b,R){return b[0]-R[0]});for(var m=new Array(c-1),g=1;g<c;++g){var v=h[g-1],y=h[g];m[g-1]=[v[1],y[1]]}return d&&m.push([-1,m[0][1]],[m[c-1][1],-1]),m}function l(c,f){var d=c.length;if(d===0)return[];var h=c[0].length;if(h<1)return[];if(h===1)return s(d,c,f);for(var m=new Array(d),g=1,v=0;v<d;++v){for(var y=c[v],b=new Array(h+1),R=0,M=0;M<h;++M){var x=y[M];b[M]=x,R+=x*x}b[h]=R,m[v]=new e(b,v),g=Math.max(R,g)}t(m,r),d=m.length;for(var D=new Array(d+h+1),S=new Array(d+h+1),E=(h+1)*(h+1)*g,A=new Array(h+1),v=0;v<=h;++v)A[v]=0;A[h]=E,D[0]=A.slice(),S[0]=-1;for(var v=0;v<=h;++v){var b=A.slice();b[v]=1,D[v+1]=b,S[v+1]=-1}for(var v=0;v<d;++v){var L=m[v];D[v+h+1]=L.point,S[v+h+1]=L.index}var P=i(D,!1);if(f?P=P.filter(function(O){for(var C=0,T=0;T<=h;++T){var N=S[O[T]];if(N<0&&++C>=2)return!1;O[T]=N}return!0}):P=P.filter(function(O){for(var C=0;C<=h;++C){var T=S[O[C]];if(T<0)return!1;O[C]=T}return!0}),h&1)for(var v=0;v<P.length;++v){var L=P[v],b=L[0];L[0]=L[1],L[1]=b}return P}return Qd}var Jd,Ax;function qN(){if(Ax)return Jd;Ax=1;function i(r,s,l){var c=r[l]|0;if(c<=0)return[];var f=new Array(c),d;if(l===r.length-1)for(d=0;d<c;++d)f[d]=s;else for(d=0;d<c;++d)f[d]=i(r,s,l+1);return f}function t(r,s){var l,c;for(l=new Array(r),c=0;c<r;++c)l[c]=s;return l}function e(r,s){switch(typeof s>"u"&&(s=0),typeof r){case"number":if(r>0)return t(r|0,s);break;case"object":if(typeof r.length=="number")return i(r,s,0);break}return[]}return Jd=e,Jd}var $d={exports:{}},tp={exports:{}},ep,Rx;function XN(){if(Rx)return ep;Rx=1,ep=i;function i(t){for(var e=t.length,r=t[t.length-1],s=e,l=e-2;l>=0;--l){var c=r,f=t[l];r=c+f;var d=r-c,h=f-d;h&&(t[--s]=r,r=h)}for(var m=0,l=s;l<e;++l){var c=t[l],f=r;r=c+f;var d=r-c,h=f-d;h&&(t[m++]=h)}return t[m++]=r,t.length=m,t}return ep}var wx;function WN(){return wx||(wx=1,function(i){var t=Gm(),e=hM(),r=dM(),s=XN(),l=6;function c(b,R){for(var M=new Array(b.length-1),x=1;x<b.length;++x)for(var D=M[x-1]=new Array(b.length-1),S=0,E=0;S<b.length;++S)S!==R&&(D[E++]=b[x][S]);return M}function f(b){for(var R=new Array(b),M=0;M<b;++M){R[M]=new Array(b);for(var x=0;x<b;++x)R[M][x]=["m[",M,"][",x,"]"].join("")}return R}function d(b){return b&1?"-":""}function h(b){if(b.length===1)return b[0];if(b.length===2)return["sum(",b[0],",",b[1],")"].join("");var R=b.length>>1;return["sum(",h(b.slice(0,R)),",",h(b.slice(R)),")"].join("")}function m(b){if(b.length===2)return["sum(prod(",b[0][0],",",b[1][1],"),prod(-",b[0][1],",",b[1][0],"))"].join("");for(var R=[],M=0;M<b.length;++M)R.push(["scale(",m(c(b,M)),",",d(M),b[0][M],")"].join(""));return h(R)}function g(b){var R=new Function("sum","scale","prod","compress",["function robustDeterminant",b,"(m){return compress(",m(f(b)),")};return robustDeterminant",b].join(""));return R(e,r,t,s)}var v=[function(){return[0]},function(R){return[R[0][0]]}];function y(){for(;v.length<l;)v.push(g(v.length));for(var b=[],R=["function robustDeterminant(m){switch(m.length){"],M=0;M<l;++M)b.push("det"+M),R.push("case ",M,":return det",M,"(m);");R.push("}		var det=CACHE[m.length];		if(!det)		det=CACHE[m.length]=gen(m.length);		return det(m);		}		return robustDeterminant"),b.push("CACHE","gen",R.join(""));var x=Function.apply(void 0,b);i.exports=x.apply(void 0,v.concat([v,g]));for(var M=0;M<v.length;++M)i.exports[M]=v[M]}y()}(tp)),tp.exports}var Cx;function jN(){return Cx||(Cx=1,function(i){var t=WN(),e=6;function r(d){for(var h="robustLinearSolve"+d+"d",m=["function ",h,"(A,b){return ["],g=0;g<d;++g){m.push("det([");for(var v=0;v<d;++v){v>0&&m.push(","),m.push("[");for(var y=0;y<d;++y)y>0&&m.push(","),y===g?m.push("+b[",v,"]"):m.push("+A[",v,"][",y,"]");m.push("]")}m.push("]),")}m.push("det(A)]}return ",h);var b=new Function("det",m.join(""));return d<6?b(t[d]):b(t)}function s(){return[0]}function l(d,h){return[[h[0]],[d[0][0]]]}var c=[s,l];function f(){for(;c.length<e;)c.push(r(c.length));for(var d=[],h=["function dispatchLinearSolve(A,b){switch(A.length){"],m=0;m<e;++m)d.push("s"+m),h.push("case ",m,":return s",m,"(A,b);");h.push("}var s=CACHE[A.length];if(!s)s=CACHE[A.length]=g(A.length);return s(A,b)}return dispatchLinearSolve"),d.push("CACHE","g",h.join(""));var g=Function.apply(void 0,d);i.exports=g.apply(void 0,c.concat([c,r]));for(var m=0;m<e;++m)i.exports[m]=c[m]}f()}($d)),$d.exports}var np,Dx;function YN(){if(Dx)return np;Dx=1;var i=qN(),t=jN();function e(l,c){for(var f=0,d=l.length,h=0;h<d;++h)f+=l[h]*c[h];return f}function r(l){var c=l.length;if(c===0)return[];l[0].length;var f=i([l.length+1,l.length+1],1),d=i([l.length+1],1);f[c][c]=0;for(var h=0;h<c;++h){for(var m=0;m<=h;++m)f[m][h]=f[h][m]=2*e(l[h],l[m]);d[h]=e(l[h],l[h])}for(var g=t(f,d),v=0,y=g[c+1],h=0;h<y.length;++h)v+=y[h];for(var b=new Array(c),h=0;h<c;++h){for(var y=g[h],R=0,m=0;m<y.length;++m)R+=y[m];b[h]=R/v}return b}function s(l){if(l.length===0)return[];for(var c=l[0].length,f=i([c]),d=r(l),h=0;h<l.length;++h)for(var m=0;m<c;++m)f[m]+=l[h][m]*d[h];return f}return s.barycenetric=r,np=s,np}var ip,Lx;function ZN(){if(Lx)return ip;Lx=1,ip=t;var i=YN();function t(e){for(var r=i(e),s=0,l=0;l<e.length;++l)for(var c=e[l],f=0;f<r.length;++f)s+=Math.pow(c[f]-r[f],2);return Math.sqrt(s/e.length)}return ip}var rp,Ux;function KN(){if(Ux)return rp;Ux=1,rp=e;var i=GN(),t=ZN();function e(r,s){return i(s).filter(function(l){for(var c=new Array(l.length),f=0;f<l.length;++f)c[f]=s[l[f]];return t(c)*r<1})}return rp}var ap,Nx;function QN(){if(Nx)return ap;Nx=1,ap=i;function i(t){var e,r,s,l=t.length,c=0;for(e=0;e<l;++e)c+=t[e].length;var f=new Array(c),d=0;for(e=0;e<l;++e){var h=t[e],m=h.length;for(r=0;r<m;++r){var g=f[d++]=new Array(m-1),v=0;for(s=0;s<m;++s)s!==r&&(g[v++]=h[s]);if(r&1){var y=g[1];g[1]=g[0],g[0]=y}}}return f}return ap}var sp,Px;function pM(){if(Px)return sp;Px=1,sp=e;var i=Math.min;function t(r,s){return r-s}function e(r,s){var l=r.length,c=r.length-s.length;if(c)return c;switch(l){case 0:return 0;case 1:return r[0]-s[0];case 2:return r[0]+r[1]-s[0]-s[1]||i(r[0],r[1])-i(s[0],s[1]);case 3:var f=r[0]+r[1],d=s[0]+s[1];if(c=f+r[2]-(d+s[2]),c)return c;var h=i(r[0],r[1]),m=i(s[0],s[1]);return i(h,r[2])-i(m,s[2])||i(h+r[2],f)-i(m+s[2],d);case 4:var g=r[0],v=r[1],y=r[2],b=r[3],R=s[0],M=s[1],x=s[2],D=s[3];return g+v+y+b-(R+M+x+D)||i(g,v,y,b)-i(R,M,x,D,R)||i(g+v,g+y,g+b,v+y,v+b,y+b)-i(R+M,R+x,R+D,M+x,M+D,x+D)||i(g+v+y,g+v+b,g+y+b,v+y+b)-i(R+M+x,R+M+D,R+x+D,M+x+D);default:for(var S=r.slice().sort(t),E=s.slice().sort(t),A=0;A<l;++A)if(c=S[A]-E[A],c)return c;return 0}}return sp}var op,Ox;function mM(){if(Ox)return op;Ox=1,op=i;function i(t){for(var e=1,r=1;r<t.length;++r)for(var s=0;s<r;++s)if(t[r]<t[s])e=-e;else if(t[s]===t[r])return 0;return e}return op}var lp,zx;function JN(){if(zx)return lp;zx=1;var i=pM(),t=mM();lp=e;function e(r,s){return i(r,s)||t(r)-t(s)}return lp}var up,Ix;function $N(){if(Ix)return up;Ix=1;var i=pM(),t=JN(),e=mM();up=r;function r(s){s.sort(t);for(var l=s.length,c=0,f=0;f<l;++f){var d=s[f],h=e(d);if(h!==0){if(c>0){var m=s[c-1];if(i(d,m)===0&&e(m)!==h){c-=1;continue}}s[c++]=d}}return s.length=c,s}return up}var cp,Fx;function tP(){if(Fx)return cp;Fx=1,cp=e;var i=QN(),t=$N();function e(r){return t(i(r))}return cp}var fp,Bx;function eP(){if(Bx)return fp;Bx=1,fp=e;var i=KN(),t=tP();function e(r,s){return t(i(r,s))}return fp}var nP=eP();const iP=Uc(nP);class rP{constructor(t={}){this.animate=t.animate,this.executedOnce=!1,this.obj3d=new Cn,this.bg=new $i;const e=this.bg,r=new Float32Array(2084*3);e.setAttribute("position",new gi(r,3));const s=e.getAttribute("position");s.usage=um,this.mesh=new Ki(this.bg,new T2({color:1149098,metalness:.1,roughness:.9,side:ji})),this.obj3d.add(this.mesh),this.done=!1}update(t){}execute(t){if(this.executedOnce){if(!this.animate)return}else this.executedOnce=!0;console.log("program",t);const e=t.getTracedPaths();console.log("paths: ",e);const r=e.map(d=>[d.x,d.y,d.z]),s=iP(.01,r);s.reverse(),console.log("indices",s);const l=new Float32Array(s.length*3*3);let c=0;s.forEach(d=>{l[c++]=r[d[0]][0],l[c++]=r[d[0]][1],l[c++]=r[d[0]][2],l[c++]=r[d[1]][0],l[c++]=r[d[1]][1],l[c++]=r[d[1]][2],l[c++]=r[d[2]][0],l[c++]=r[d[2]][1],l[c++]=r[d[2]][2]});const f=this.bg.getAttribute("position");f.copyArray(l),f.needsUpdate=!0,this.bg.computeVertexNormals()}getSceneGraphNode(){return this.obj3d}}class aP{constructor(){this.enableMesh=!1,this.enableLaser=!0,this.timeScale=1,this.init()}init(){this.tracers={meshTracer:new rP,laserTracer:new PN},this.enableTable={meshTracer:this.enableMesh,laserTracer:this.enableLaser},this.totalTime=0,this.timeScale=this.timeScale}attachToScene(t){this._forEachEnabled(e=>t.add(e.getSceneGraphNode()))}update(t){const e=t*this.timeScale;this.totalTime+=e,typeof this.runUserProgram=="function"&&this.runUserProgram(this.totalTime),this._forEachEnabled(r=>r.update(this.totalTime))}setEnabled(t,e=!0){t in this.enableTable&&(this.enableTable[t]=!!e)}dispose(){Object.values(this.tracers).forEach(t=>{var e;return(e=t.dispose)==null?void 0:e.call(t)})}reset(){this.dispose(),this.init()}_forEachEnabled(t){for(const[e,r]of Object.entries(this.tracers))this.enableTable[e]&&t(r,e)}}const dm=[];function sP(){const i=dm.slice();return dm.length=0,i}function oP(i){const t=i.newFunction("emit",(...e)=>{const r=i.dump(e[0]),s=e.slice(1).map(l=>i.dump(l));dm.push([r,...s])});i.setProp(i.global,"emit",t),t.dispose()}const lP=`
 // === Laser‑tracer turtle primitives (auto‑generated) ===
 // These live *inside* the QuickJS VM and call the host‑side emit().
 const move     = (x,y,z)      => emit('MOVE',     x,y,z);
 const trace    = (x,y,z)      => emit('TRACE',    x,y,z);
 const deposit  = (x,y,z)      => emit('DEPOSIT',  x,y,z);
 const moveRel  = (dx,dy,dz)   => emit('MOVE_REL', dx,dy,dz);
 const traceRel = (dx,dy,dz)   => emit('TRACE_REL',dx,dy,dz);

 const yaw     = (d)          => emit('YAW',     d);
 const pitch    = (d)          => emit('PITCH',    d);
 const roll     = (d)          => emit('ROLL',     d);
 const push     = (d)          => emit('PUSH',     d);
 const pop     = (d)          => emit('POP',     d);

 const size     = (px)         => emit('SIZE',     px);
 const spacing  = (d)          => emit('SPACING',  d);
 const residue  = (s)          => emit('RESIDUE',  s);
 const fuzz     = (n=0,sx=4,sy=sx,sz=sx) =>
   emit('FUZZ', n|0, +sx, +sy, +sz);

 // ---- colour helpers --------------------------------------------------
 // All channel values are floats 0‑1 unless noted. color() is kept as a
 // legacy alias for hex.
 const colorHex      = (hex)                 => emit('COLOR', hex >>> 0);
 const colorRGB      = (r,g,b)               => emit('COLOR', rgb2hex(r,g,b));
 const colorHSV      = (h,s,v)               => emit('COLOR', hsv2hex(h,s,v));
 const colorViridis  = t                     => emit('COLOR', viridisHex(t));
 const colorCubehelix = (t,start=0.5,rot=-1.5,gamma=1) =>
   emit('COLOR', cubehelixHex(t,start,rot,gamma));
 const color         = colorHex;             // back‑compat

 /* ---------- tiny converters ---------------------------------------- */
 function rgb2hex(r,g,b){
   const toB = x => Math.max(0, Math.min(255, Math.round(x*255)));
   return (toB(r)<<16) | (toB(g)<<8) | toB(b);
 }

 function hsv2hex(h,s,v){
   h = ((h % 1) + 1) % 1;                    // wrap hue
   const i = Math.floor(h * 6);
   const f = h * 6 - i;
   const p = v * (1 - s);
   const q = v * (1 - f * s);
   const t = v * (1 - (1 - f) * s);
   const [r,g,b] = [
     [v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]
   ][i % 6];
   return rgb2hex(r,g,b);
 }

 /* ---------- viridis palette (lookup + lerp) ------------------------- */
 /* 64‑entry table keeps size tiny; linear interpolation is smooth.     */
 const _viridis = [
   0x440154,0x471164,0x482071,0x472d7b,0x453882,0x414287,0x3b4b8a,0x35538c,
   0x2f5c8e,0x2a648f,0x266c91,0x227394,0x1e7b96,0x1c8397,0x1b8a98,0x1d9299,
   0x219a98,0x28a197,0x30a897,0x39af95,0x42b694,0x4cbd92,0x55c390,0x5fc98d,
   0x68ce8a,0x72d387,0x7cd784,0x86db81,0x8fdf7e,0x99e37b,0xa2e678,0xacea74,
   0xb5ed70,0xbeef6d,0xc7f169,0xcff366,0xd7f562,0xdff65e,0xe7f65a,0xeff756,
   0xf7f752,0xfef74e
 ];
 function viridisHex(t){
   t = Math.max(0, Math.min(1, t));
   const idx = t * (_viridis.length - 1);
   const i0  = Math.floor(idx);
   const i1  = Math.min(i0 + 1, _viridis.length - 1);
   const f   = idx - i0;
   const lerp = (a,b) => {
     const rb = a & 0xff,   gb = (a>>8)&0xff,   bb = (a>>16);
     const re = b & 0xff,   ge = (b>>8)&0xff,   be = (b>>16);
     const r  = rb + (re - rb) * f;
     const g  = gb + (ge - gb) * f;
     const v  = bb + (be - bb) * f;
     return (Math.round(v)<<16)|(Math.round(g)<<8)|Math.round(r);
   };
   return lerp(_viridis[i0], _viridis[i1]);
 }

 /* ---------- parametric cubehelix ----------------------------------- */
 function cubehelixHex(t,start=0.5,rot=-1.5,gamma=1){
   t = Math.pow(Math.max(0, Math.min(1, t)), gamma);
   const a   = 0.5;
   const phi = 2 * Math.PI * (start + rot * t);
   const amp = a * t * (1 - t);
   const r = t + amp * (-0.14861 * Math.cos(phi) + 1.78277 * Math.sin(phi));
   const g = t + amp * (-0.29227 * Math.cos(phi) - 0.90649 * Math.sin(phi));
   const b = t + amp * ( 1.97294 * Math.cos(phi));
   return rgb2hex(r,g,b);
 }
 `;function uP(i){return`globalThis.program = (function(){
${lP}
${i}
return program;})();`}const cl=(i,t,e)=>new ot(i,t,e),cP={MOVE:(i,[t,e,r])=>{var s;return(s=i.move)==null?void 0:s.call(i,cl(t,e,r))},MOVE_REL:(i,[t,e,r])=>{var s;return(s=i.moveRel)==null?void 0:s.call(i,cl(t,e,r))},TRACE:(i,[t,e,r])=>{var s;return(s=i.trace)==null?void 0:s.call(i,cl(t,e,r))},TRACE_REL:(i,[t,e,r])=>{var s;return(s=i.traceRel)==null?void 0:s.call(i,cl(t,e,r))},DEPOSIT:(i,[t,e,r])=>{var s;return(s=i.deposit)==null?void 0:s.call(i,cl(t,e,r))},COLOR:(i,[t])=>{var e;return(e=i.color)==null?void 0:e.call(i,t)},SIZE:(i,[t])=>{var e;return(e=i.size)==null?void 0:e.call(i,t)},SPACING:(i,[t])=>{var e;return(e=i.spacing)==null?void 0:e.call(i,t)},RESIDUE:(i,[t])=>{var e;return(e=i.residue)==null?void 0:e.call(i,t)},FUZZ:(i,t)=>{var e;return(e=i.fuzz)==null?void 0:e.call(i,...t)},YAW:(i,[t])=>{var e;return(e=i.yaw)==null?void 0:e.call(i,t)},PITCH:(i,[t])=>{var e;return(e=i.pitch)==null?void 0:e.call(i,t)},ROLL:(i,[t])=>{var e;return(e=i.roll)==null?void 0:e.call(i,t)},PUSH:i=>{var t;return(t=i.push)==null?void 0:t.call(i)},POP:i=>{var t;return(t=i.pop)==null?void 0:t.call(i)}};function fP(i,t){for(const[e,...r]of t){const s=cP[e];s?s(i,r):console.warn("Unknown opcode",e)}}const hP="modulepreload",dP=function(i){return"/"+i},kx={},pm=function(t,e,r){let s=Promise.resolve();if(e&&e.length>0){let c=function(h){return Promise.all(h.map(m=>Promise.resolve(m).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const f=document.querySelector("meta[property=csp-nonce]"),d=(f==null?void 0:f.nonce)||(f==null?void 0:f.getAttribute("nonce"));s=c(e.map(h=>{if(h=dP(h),h in kx)return;kx[h]=!0;const m=h.endsWith(".css"),g=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${g}`))return;const v=document.createElement("link");if(v.rel=m?"stylesheet":hP,m||(v.as="script"),v.crossOrigin="",v.href=h,d&&v.setAttribute("nonce",d),document.head.appendChild(v),m)return new Promise((y,b)=>{v.addEventListener("load",y),v.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${h}`)))})}))}function l(c){const f=new Event("vite:preloadError",{cancelable:!0});if(f.payload=c,window.dispatchEvent(f),!f.defaultPrevented)throw c}return s.then(c=>{for(const f of c||[])f.status==="rejected"&&l(f.reason);return t().catch(l)})};var pP={type:"sync",importFFI:()=>pm(()=>import("./ffi-DlhRHxHv.js"),[]).then(i=>i.QuickJSFFI),importModuleLoader:()=>pm(()=>import("./emscripten-module.browser-VTL2UBYQ-DgCUx61h.js"),[]).then(i=>i.default)},mP=pP;async function gP(i){let t=hp(await i),[e,r,{QuickJSWASMModule:s}]=await Promise.all([t.importModuleLoader().then(hp),t.importFFI(),pm(()=>import("./module-6F3E5H7Y-iGyMzioi.js"),[]).then(hp)]),l=await e();l.type="sync";let c=new r(l);return new s(l,c)}function hp(i){return i&&"default"in i&&i.default?i.default&&"default"in i.default&&i.default.default?i.default.default:i.default:i}function Hx(i,t){const e=i.dump(t);if(typeof e=="string")return e;if(e&&typeof e=="object"){const{name:r="Error",message:s="",stack:l=""}=e;return`${r}: ${s}${l?`
`+l:""}`}try{return JSON.stringify(e)}catch{return String(e)}}class _P{constructor(t,e){this.onError=t,this.laserTracer=e,this._ready=!1,this._queuedSrc=null,this.hasError=!1}async init(){const t=await gP(mP);if(this.ctx=t.newContext(),oP(this.ctx),this._ready=!0,this._queuedSrc!==null){const e=this._queuedSrc;this._queuedSrc=null,this.loadSource(e)}}loadSource(t){var s,l;if(!this._ready){this._queuedSrc=t;return}const e=uP(t),r=this.ctx.evalCode(e);if(r.error){this._enterError(Hx(this.ctx,r.error)),r.error.dispose();return}this.hasError=!1,this.onError(null),(l=(s=this.programHandle)==null?void 0:s.dispose)==null||l.call(s),this.programHandle=this.ctx.getProp(this.ctx.global,"program")}tick(t){var l;if(this.hasError||!this._ready||!this.programHandle)return;const e=this.ctx.newNumber(t),r=this.ctx.callFunction(this.programHandle,this.ctx.undefined,e);if(e.dispose(),r.error){this._enterError(Hx(this.ctx,r.error)),r.error.dispose();return}(l=r.value)==null||l.dispose();const s=sP();s.length&&fP(this.laserTracer,s)}_enterError(t){var e,r;this.hasError=!0,this.onError(t),(r=(e=this.programHandle)==null?void 0:e.dispose)==null||r.call(e),this.programHandle=null}dispose(){var t,e,r;(e=(t=this.programHandle)==null?void 0:t.dispose)==null||e.call(t),(r=this.ctx)==null||r.dispose()}}function vP({srcCode:i,activeProgram:t,compileErrCb:e,className:r}){const s=Ft.useRef(null),l=Ft.useRef(null),c=Ft.useRef(null),f=Ft.useRef(null),d=Ft.useRef(null),h=Ft.useRef(null),m=Ft.useRef(performance.now()),g=Ft.useRef(!1),v=y=>{g.current=!!y,y||(m.current=performance.now()),e==null||e(y)};return Ft.useEffect(()=>{const y=s.current;if(!y)return;const b=new y2,R=new Ri(60,1,.1,1e3);R.position.set(0,0,150),d.current=R;const M=new _N({antialias:!0,alpha:!0});M.setPixelRatio(Math.min(window.devicePixelRatio,2)),y.appendChild(M.domElement);const x=new yN(R,M.domElement);x.enableDamping=!0,x.dampingFactor=.12,h.current=x;const D=new aP;D.attachToScene(b),c.current=D;const S=new _P(v,D.tracers.laserTracer);l.current=S,S.init().then(()=>{D.runUserProgram=L=>S.tick(L),S.loadSource(i)});const E=()=>{const{clientWidth:L,clientHeight:P}=y;P!==0&&(R.aspect=L/P,R.updateProjectionMatrix(),M.setSize(L,P))};E(),window.addEventListener("resize",E);const A=L=>{if(!g.current){const P=L-m.current;m.current=L,D.update(P)}x.update(),M.render(b,R),f.current=requestAnimationFrame(A)};return f.current=requestAnimationFrame(A),()=>{var L;cancelAnimationFrame(f.current),window.removeEventListener("resize",E),D.dispose(),S.dispose(),(L=x.dispose)==null||L.call(x),M.dispose(),y.removeChild(M.domElement)}},[]),Ft.useEffect(()=>{var y;(y=l.current)==null||y.loadSource(i)},[i]),Ft.useEffect(()=>{var R;(R=c.current)==null||R.reset();const y=d.current;y&&(y.position.set(0,0,150),y.lookAt(0,0,0),y.updateProjectionMatrix());const b=h.current;b==null||b.reset()},[t]),Kt.jsx("div",{ref:s,className:r??"",style:{width:"100%",height:"100%"}})}const Vx="/assets/laser-tracer-patch-sm-Dy94tAMP.png";function yP({ready:i,minDuration:t=1e3,onHide:e}){const[r,s]=Ft.useState(!1),[l]=Ft.useState(()=>Date.now()),[c,f]=Ft.useState(!1),[d,h]=Ft.useState(!1);return Ft.useEffect(()=>{const m=new Image;m.src=Vx,m.onload=()=>s(!0)},[]),Ft.useEffect(()=>{if(!i||!r||c)return;const m=Date.now()-l,g=Math.max(0,t-m),v=setTimeout(()=>f(!0),g);return()=>clearTimeout(v)},[i,r,t,l,c]),Ft.useEffect(()=>{if(!c)return;const m=setTimeout(()=>{h(!0),e==null||e()},250);return()=>clearTimeout(m)},[c,e]),d?null:Kt.jsx("div",{className:`splash-overlay${c?" fade-out":""}`,children:r?Kt.jsx("img",{src:Vx,alt:"Laser‑Tracer logo",className:"splash-logo"}):Kt.jsx("svg",{className:"spin",width:"64",height:"64",viewBox:"0 0 64 64",stroke:"#eee",children:Kt.jsx("circle",{cx:"32",cy:"32",r:"28",fill:"none",strokeWidth:"6",strokeLinecap:"round",strokeDasharray:"44 188"})})})}const xP=`// wave params
const PLANE_SIZE = 150;
const CELLS = 60;
const INC = PLANE_SIZE / CELLS;
const k1 = Math.PI / 14; // spatial freqs
const k2 = Math.PI / 15;
const φ = Math.PI / 4; // ±45° waves
const plane = (x, z, k, a) => Math.cos(k * (x * Math.cos(a) + z * Math.sin(a)));

// custom cubehelix implementation
function cubehelix(h) {
  const a = 0.5,
    b = 1.4; // brightness, saturation
  const ang = 2 * Math.PI * (h + 0.5);
  const amp = b * ang;
  const c = a + amp * (Math.cos(ang) - 0.148 * Math.sin(ang));
  const d = a + amp * (Math.sin(ang) - 0.292 * Math.cos(ang));
  const e = a + amp * (0.3 * Math.cos(ang) + Math.sin(ang));
  const r = (c < 0 ? 0 : c > 1 ? 255 : c * 255) & 255;
  const g = (d < 0 ? 0 : d > 1 ? 255 : d * 255) & 255;
  const b2 = (e < 0 ? 0 : e > 1 ? 255 : e * 255) & 255;
  return (r << 16) | (g << 8) | b2;
}

function program(tMs) {
  const t = tMs * 0.001;
  size(3);
  residue(6);
  fuzz(7, 2);

  for (let i = 0; i <= CELLS; i++) {
    for (let j = 0; j <= CELLS; j++) {
      const x = i * INC - PLANE_SIZE / 2;
      const z = j * INC - PLANE_SIZE / 2;

      const w1 = plane(x, z, k1, φ);
      const w2 = plane(x, z, k1, -φ);
      const w3 = plane(x, z, k2, φ) * Math.cos(t * 0.7);
      const w4 = plane(x, z, k2, -φ) * Math.sin(t * 0.7);

      const A = (w1 + w2 + w3 + w4) * 0.5; // −1 … +1

      /* colour + height encoding */
      const h = (A + 1) * 0.5; // 0 … 1
      color(cubehelix(h, 0.3, -2.1, 0.6));
      const y = A * 10;

      deposit(x, y, z);
    }
  }
}
`,SP=`/* — Cubehelix Spiral — smooth chroma‑luminance spin */

// custom cubehelix implementation
function cubehelix(h) {
  const a = 0.5,
    b = 1.4; // brightness, saturation
  const ang = 2 * Math.PI * (h + 0.5);
  const amp = b * ang;
  const c = a + amp * (Math.cos(ang) - 0.148 * Math.sin(ang));
  const d = a + amp * (Math.sin(ang) - 0.292 * Math.cos(ang));
  const e = a + amp * (0.3 * Math.cos(ang) + Math.sin(ang));
  const r = (c < 0 ? 0 : c > 1 ? 255 : c * 255) & 255;
  const g = (d < 0 ? 0 : d > 1 ? 255 : d * 255) & 255;
  const b2 = (e < 0 ? 0 : e > 1 ? 255 : e * 255) & 255;
  return (r << 16) | (g << 8) | b2;
}

let θ = 0;
function program(tMs) {
  const t = tMs * 0.001;
  const N = 1200;
  size(3);
  residue(4);
  fuzz(3, 2);

  for (let i = 0; i < N; i++) {
    θ += 0.02;
    const r = 30 + 15 * Math.sin(t * 0.6 + i * 0.005);
    const x = r * Math.cos(θ);
    const y = r * Math.sin(θ);
    const z = (i - N / 2) * 0.12;
    color(cubehelix((t * 0.05 + i * 0.002) % 1));
    deposit(x, y, z);
  }
}
`,MP=`/* === Ripple Lace – dual‑source interference ================= */

/* Quick HSV → hex */
function hsv(h, s, v) {
  const f = (n, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  const r = Math.round(f(5) * 255),
    g = Math.round(f(3) * 255),
    b = Math.round(f(1) * 255);
  return ((r << 16) | (g << 8) | b) >>> 0;
}

/* Wave parameters */
const GRID = 160; // total grid size
const CELLS = 80; // resolution (CELLS² deposits / frame)
const INC = GRID / CELLS;
const λ = 18; // wavelength
const k = (Math.PI * 2) / λ; // spatial frequency
const ampl = 7; // vertical scale in tracer coords

/* Soft palette: positive phase → teal–cyan, negative → magenta–pink */
function phaseColor(phase) {
  if (phase >= 0) {
    return hsv(180 + phase * 40, 0.8, 1); // 180–220°
  } else {
    return hsv(300 + -phase * 40, 0.8, 1); // 300–340°
  }
}

function program(tMs) {
  const t = tMs * 0.001; // seconds

  /* Moving source centres (slow Lissajous drift) */
  const src1 = {
    x: 20 * Math.sin(t * 0.23),
    y: 20 * Math.cos(t * 0.17),
  };
  const src2 = {
    x: 20 * Math.sin(t * 0.31 + 1.3),
    y: 20 * Math.cos(t * 0.19 + 0.7),
  };

  size(3);
  residue(6);

  for (let i = 0; i <= CELLS; i++) {
    for (let j = 0; j <= CELLS; j++) {
      const x = i * INC - GRID / 2;
      const y = j * INC - GRID / 2;

      /* Distance to each source → phase */
      const d1 = Math.hypot(x - src1.x, y - src1.y);
      const d2 = Math.hypot(x - src2.x, y - src2.y);

      /* Interference: cosine sum → amplitude */
      const phase1 = Math.cos(k * d1 - t * 4);
      const phase2 = Math.cos(k * d2 - t * 4);
      const A = (phase1 + phase2) * 0.5; // -1 … +1

      /* Threshold for rendering – skip weak points to save particles */
      if (Math.abs(A) < 0.15) continue;

      color(phaseColor(A));
      const z = A * ampl; // height encodes intensity
      deposit(x, z, y); // y→z swap for top‑down view
    }
  }
}
`,EP=`function program(tMs) {
  const spikes = 16; // Number of crystal spikes
  const segments = 40; // Segments per spike
  const radius = 15; // Base radius of spikes
  const spikeLength = 25; // Maximum spike length
  const rotationSpeed = 0.0003; // Rotation speed of entire structure

  residue(4);
  fuzz(8, 0.3);
  spacing(1);

  // Rotate entire structure slowly over time
  yaw(tMs * rotationSpeed * 60);
  pitch(tMs * rotationSpeed * 40);
  roll(tMs * rotationSpeed * 20);

  for (let i = 0; i < spikes; i++) {
    push();

    const spikeAngle = (360 / spikes) * i;
    yaw(spikeAngle);
    pitch(spikeAngle / 2);

    for (let j = 0; j <= segments; j++) {
      const t = j / segments;

      // Crystal-like geometry: jagged spikes modulated by sine functions
      const length =
        radius +
        spikeLength * Math.abs(Math.sin(t * Math.PI * 4 + tMs * 0.001 + i));

      const x = 0;
      const y = length * t;
      const z = Math.sin(t * 12 * Math.PI + tMs * 0.0005) * (radius / 3);

      const hue = (i / spikes + t + tMs * 0.0001) % 1;
      size(2 + 5 * (1 - t));
      colorCubehelix(hue, 0.5, -1.5, 1);

      if (j === 0) moveRel(x, y, z);
      else traceRel(x, y, z);
    }

    pop();
  }

  // Internal glowing core
  fuzz(800, 3.0);
  size(12);
  residue(5);
  colorViridis((tMs * 0.00008) % 1);
  deposit(0, 0, 0);
}
`,bP=`function program(tMs) {
  const numTendrils = 8;
  const segments = 100;
  const baseRadius = 15;
  const maxRadius = 80;
  const twistSpeed = 0.0004;
  const pulseSpeed = 0.002;

  residue(3.5);
  fuzz(6, 0.5);
  spacing(1);

  for (let i = 0; i < numTendrils; i++) {
    push();

    const angleOffset = (Math.PI * 2 * i) / numTendrils;
    yaw((angleOffset * 180) / Math.PI);
    pitch(15 * Math.sin(tMs * 0.0006 + i));

    for (let j = 0; j <= segments; j++) {
      const t = j / segments;
      const spiralAngle = angleOffset + t * 12 * Math.PI + tMs * twistSpeed;
      const pulse =
        Math.sin(tMs * pulseSpeed + t * Math.PI * 4 + i) * 0.5 + 0.5;
      const radius =
        baseRadius + (maxRadius - baseRadius) * Math.pow(t, 0.7) * pulse;

      const x = radius * Math.cos(spiralAngle);
      const y = radius * Math.sin(spiralAngle);
      const z = Math.sin(t * 8 * Math.PI + tMs * 0.001 + i) * 10;

      const hue = (t * 0.2 + pulse * 0.1 + i * 0.05 + tMs * 0.00005) % 1;
      const brightness = 0.6 + 0.4 * pulse;

      size(3 + 4 * pulse * (1 - t));
      colorHSV(hue, 0.9, brightness);

      if (j === 0) move(x, y, z);
      else trace(x, y, z);
    }

    pop();
  }

  // Central eldritch core
  fuzz(500, 5.0);
  residue(4);
  size(10);
  colorHSV((tMs * 0.0001) % 1, 1.0, 0.8);
  deposit(0, 0, 0);
}
`,TP=`function program(tMs) {
  const layers = 6; // Number of concentric layers
  const spokesPerLayer = 32; // Spokes in each layer
  const baseRadius = 10; // Starting radius
  const layerGap = 8; // Gap between layers
  const rotationSpeed = 0.00000001; // Gentle rotation speed
  const pulseSpeed = 0.002; // Gentle pulsation speed

  residue(6);
  spacing(0.5);
  fuzz(10, 1);

  roll(tMs * rotationSpeed * 30);

  for (let layer = 0; layer < layers; layer++) {
    const radius = baseRadius + layer * layerGap;
    const pulse = 0.5 + 0.5 * Math.sin(tMs * pulseSpeed + layer);

    for (let spoke = 0; spoke < spokesPerLayer; spoke++) {
      push();

      const angle = (360 / spokesPerLayer) * spoke + layer * 5;
      yaw(angle);

      const innerRadius = radius * pulse;
      const outerRadius = (radius + layerGap / 2) * (1.2 - pulse * 0.2);

      // Color shifts gently per layer and spoke
      const hue =
        (layer / layers + (spoke / spokesPerLayer) * 0.5 + tMs * 0.00005) % 1;
      size(2 + 3 * pulse);
      colorHSV(hue, 0.5, 0.9);

      moveRel(0, 0, innerRadius);
      traceRel(0, 0, outerRadius);

      pop();
    }
  }

  // Center glow
  size(10);
  residue(6);
  fuzz(400, 2.5);
  colorHSV((tMs * 0.00003 + 0.5) % 1, 0.4, 1.0);
  deposit(0, 0, 0);
}
`,AP=`/* Lorenz attractor – classic chaos */

function hsv(h, s, v) {
  const f = (n, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return (
    (Math.round(f(5) * 255) << 16) |
    (Math.round(f(3) * 255) << 8) |
    Math.round(f(1) * 255)
  );
}

let x = 0.1,
  y = 0,
  z = 0; // initial point
function program(tMs) {
  const dt = 0.004,
    σ = 10,
    β = 8 / 3,
    ρ = 28; // Lorenz params
  const steps = 600; // ∼N deposits per frame
  size(3);
  spacing(4);
  residue(6);
  fuzz(5, 0.4);

  for (let i = 0; i < steps; i++) {
    const dx = σ * (y - x),
      dy = x * (ρ - z) - y,
      dz = x * y - β * z;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
    const hue = (tMs * 0.02 + i) % 360;
    color(hsv(hue, 1, 1));
    deposit(x * 2, y * 2, z * 2);
  }
}
`,RP=`/* ================================================================
   LORENZ FLOW – real‑time stream‑tracer demo
================================================================= */

// ---------- FIELD PARAMETERS ------------------------------------
const sigma = 5;
const rho = 42;
const beta = 9 / 3;

// ---------- INTEGRATOR SETTINGS ---------------------------------
const N_PARTICLES = 256; // keep it modest for first test
const DT = 0.004; // time‑step per rendered frame
const SEED_RADIUS = 1.0; // random seed sphere around origin

// ---------- BRUSH ------------------------------------------------
const PX_SIZE = 3; // sprite px
const SPACING = 0.25; // unused (deposit only)
const RESIDUE = 9; // seconds – fade
const FUZZ_N = 6; // soft glow
const FUZZ_SIG = 0.2;

// ---------- PERSISTENT STATE -------------------------------------
if (!globalThis.__lorenz) {
  // first frame bootstrap
  const pts = [];
  for (let i = 0; i < N_PARTICLES; i++) {
    // random seed near origin
    const r = Math.random() * SEED_RADIUS;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pts.push({
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta),
      z: r * Math.cos(phi),
    });
  }
  globalThis.__lorenz = { pts };
}

function lorenzStep(p, dt) {
  const dx = sigma * (p.y - p.x);
  const dy = p.x * (rho - p.z) - p.y;
  const dz = p.x * p.y - beta * p.z;
  return {
    x: p.x + dx * dt,
    y: p.y + dy * dt,
    z: p.z + dz * dt,
  };
}

function program(tMs) {
  // --- brush -----------------------------------------------------
  size(PX_SIZE);
  residue(RESIDUE);
  fuzz(FUZZ_N, FUZZ_SIG);

  const pts = globalThis.__lorenz.pts;

  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[i];
    const p1 = lorenzStep(p0, DT);
    pts[i] = p1; // persist new position

    // approximate local stretching intensity
    const dx = sigma * (p1.y - p1.x);
    const dy = p1.x * (rho - p1.z) - p1.y;
    const dz = p1.x * p1.y - beta * p1.z;
    // cubehelix phase by orbit index so lobes differ
    const phase = (i / N_PARTICLES + tMs * 0.00005) % 1;

    // stretch as above
    const stretch = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const sNorm = Math.min(1, stretch / 50);

    // gamma <1 brightens fast zones, darkens slow
    const gamma = 0.5 + 0.5 * sNorm; // 0.5..1
    colorCubehelix(phase, 0.5, -1.5, gamma);

    deposit(p0.x, p0.y, p0.z);
    deposit(p1.x, p1.y, p1.z);
  }
}
`,wP=`/* === Cubehelix Nebula Spiral ================================= */

// custom cubehelix implementation
function cubehelix(h) {
  const a = 0.5,
    b = 1.4; // brightness, saturation
  const ang = 2 * Math.PI * (h + 0.5);
  const amp = b * ang;
  const c = a + amp * (Math.cos(ang) - 0.148 * Math.sin(ang));
  const d = a + amp * (Math.sin(ang) - 0.292 * Math.cos(ang));
  const e = a + amp * (0.3 * Math.cos(ang) + Math.sin(ang));
  const r = (c < 0 ? 0 : c > 1 ? 255 : c * 255) & 255;
  const g = (d < 0 ? 0 : d > 1 ? 255 : d * 255) & 255;
  const b2 = (e < 0 ? 0 : e > 1 ? 255 : e * 255) & 255;
  return (r << 16) | (g << 8) | b2;
}

/* fast Gaussian via Box‑Muller */
function gauss() {
  const u = Math.random(),
    v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* spiral parameters */
let θ = 0; // running angle

function program(tMs) {
  const t = tMs * 0.001;
  const N = 700; // backbone samples / frame
  const splat = 6; // fuzz points per backbone vertex
  const R0 = 28,
    R1 = 16; // base radius & wobble

  size(2); // each micro‑point thickness
  residue(1);
  fuzz(5, 0.25);

  for (let i = 0; i < N; i++) {
    θ += 0.03;
    const r = R0 + R1 * Math.sin(θ * 0.2 + t * 0.3); // pulsating radius
    const x0 = r * Math.cos(θ);
    const y0 = r * Math.sin(θ);
    const z0 = (i - N / 2) * 0.14;

    /* cubehelix hue scrolls along backbone */
    const hue = (t * 0.04 + i * 0.002) % 1;
    color(cubehelix(hue));

    /* deposit backbone centre */
    deposit(x0, y0, z0);
  }
}
`,CP=`function program(timeMs) {
  // Time variables
  const t = timeMs * 0.001;

  // Configure global properties
  residue(5);

  // Draw cube wireframe with grid lines
  drawCubeFrame(t);

  // Draw solar system inside the cube
  drawSolarSystem(t);
}

//----------------------------------------------------------------------
// drawCubeFrame – CAD‑style cube grid with major / minor subdivisions
//----------------------------------------------------------------------
// • draws outer cube edges every frame with a gentle brightness pulse
// • constructs a dense face grid (major + minor)
//----------------------------------------------------------------------

function drawCubeFrame(t) {
  // ---------------- parameters --------------------------------------
  const cubeSize = 40; // half‑extent of cube
  const majorDiv = 10; // major grid squares per side
  const minorDiv = 5; // minor subdivisions inside each major square
  const spacingMaj = 1.0; // particle spacing for major lines
  const spacingMin = 1.5; // particle spacing for minor lines
  const pulse = Math.sin(t * 0.5) * 0.5 + 0.5; // 0‥1 edge‑glow

  residue(3);

  // ----- minor grid (thinner, dimmer) -----
  size(2);
  spacing(spacingMin);
  fuzz(3, 1);
  colorHSV(0.33, 0.3, 0.25); // muted green
  buildFaceGrid(majorDiv * minorDiv, false);

  // ----- major grid (heavier, brighter) ---
  size(4);
  fuzz(3, 2);
  spacing(spacingMaj);
  colorHSV(0.33, 0.35, 0.45); // brighter green
  buildFaceGrid(majorDiv, true);

  // ---------- 2. outer cube edges (pulse every frame) ---------------
  residue(6);
  size(2.2);
  spacing(0.5);
  fuzz(0);
  colorHSV(0.35, 0.6, 0.8 + pulse * 0.2);

  const edges = [
    // bottom square
    [-1, -1, -1],
    [1, -1, -1],
    [1, -1, -1],
    [1, -1, 1],
    [1, -1, 1],
    [-1, -1, 1],
    [-1, -1, 1],
    [-1, -1, -1],
    // top square
    [-1, 1, -1],
    [1, 1, -1],
    [1, 1, -1],
    [1, 1, 1],
    [1, 1, 1],
    [-1, 1, 1],
    [-1, 1, 1],
    [-1, 1, -1],
    // uprights
    [-1, -1, -1],
    [-1, 1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, -1, 1],
    [-1, 1, 1],
  ];

  for (let i = 0; i < edges.length; i += 2) {
    move(
      edges[i][0] * cubeSize,
      edges[i][1] * cubeSize,
      edges[i][2] * cubeSize,
    );
    trace(
      edges[i + 1][0] * cubeSize,
      edges[i + 1][1] * cubeSize,
      edges[i + 1][2] * cubeSize,
    );
  }

  // -------- helper to build grid lines on six faces -----------------
  function buildFaceGrid(divisions, drawEveryLine) {
    const step = 2 / divisions; // maps i→[-1,1]
    for (let fixed = 0; fixed < 3; fixed++) {
      // axis held constant on face
      for (const sign of [-1, 1]) {
        // -1 & +1 faces
        const u = (fixed + 1) % 3; // first varying axis
        const v = (fixed + 2) % 3; // second varying axis

        // lines parallel to u (vary v)
        for (let i = 0; i <= divisions; i++) {
          if (!drawEveryLine && i % minorDiv !== 0) continue;
          const frac = -1 + i * step;

          let a = [0, 0, 0],
            b = [0, 0, 0];
          a[fixed] = b[fixed] = sign;
          a[v] = b[v] = frac;
          a[u] = -1;
          b[u] = 1;

          move(a[0] * cubeSize, a[1] * cubeSize, a[2] * cubeSize);
          trace(b[0] * cubeSize, b[1] * cubeSize, b[2] * cubeSize);
        }

        // lines parallel to v (vary u)
        for (let i = 0; i <= divisions; i++) {
          if (!drawEveryLine && i % minorDiv !== 0) continue;
          const frac = -1 + i * step;

          let a = [0, 0, 0],
            b = [0, 0, 0];
          a[fixed] = b[fixed] = sign;
          a[u] = b[u] = frac;
          a[v] = -1;
          b[v] = 1;

          move(a[0] * cubeSize, a[1] * cubeSize, a[2] * cubeSize);
          trace(b[0] * cubeSize, b[1] * cubeSize, b[2] * cubeSize);
        }
      }
    }
  }
}

//------------------------------------------------------------------
// spiralSample(i, n)
//   • quasi‑uniform point on the unit sphere
//   • progressive: first N samples already well distributed
//------------------------------------------------------------------
function spiralSample(i, n) {
  const g = Math.PI * (3 - Math.sqrt(5)); // golden angle
  const z = 1 - (2 * (i + 0.5)) / n; // z ∈ [‑1, 1]
  const r = Math.sqrt(1 - z * z); // radius in xy‑plane
  const theta = g * i;
  return [r * Math.cos(theta), z, r * Math.sin(theta)];
}

//------------------------------------------------------------------
// spiralSample(i, n)  – already in your file
//------------------------------------------------------------------

//------------------------------------------------------------------
// drawEllipsoid‑Lit
//   cx,cy,cz     : centre
//   rx,ry,rz     : radii
//   hue          : 0‑1
//   intensity    : base Value multiplier   (default 1)
//   opts = {
//     light   : [lx, ly, lz]   // point‑light position  (null ⇒ no shading)
//     emissive: false          // true ⇒ skip shading completely
//     ambient : 0.2            // ambient floor (0‑1)
//   }
//------------------------------------------------------------------
function drawEllipsoidLit(cx, cy, cz, rx, ry, rz, hue, samples, opts = {}) {
  const {
    light = null, // null → lighting disabled
    emissive = false,
    ambient = 0.2, // tweak if you want darker nightsides
  } = opts;

  const intensity = 1;
  const N = samples; // surface resolution
  const invRx = 1 / rx,
    invRy = 1 / ry,
    invRz = 1 / rz;

  for (let i = 0; i < N; i++) {
    // --- even point on unit sphere -------------------------------
    const [ux, uy, uz] = spiralSample(i, N);

    // --- surface position ----------------------------------------
    const px = cx + ux * rx;
    const py = cy + uy * ry;
    const pz = cz + uz * rz;

    // --- brightness ----------------------------------------------
    let value = intensity; // default (for emissive / no‑light)

    if (!emissive && light) {
      // surface normal for an ellipsoid: ∇F = [x/rx², y/ry², z/rz²]
      let nx = ux * invRx;
      let ny = uy * invRy;
      let nz = uz * invRz;
      const nLen = Math.hypot(nx, ny, nz);
      nx /= nLen;
      ny /= nLen;
      nz /= nLen;

      // light direction
      let lx = light[0] - px;
      let ly = light[1] - py;
      let lz = light[2] - pz;
      const lLen = Math.hypot(lx, ly, lz);
      lx /= lLen;
      ly /= lLen;
      lz /= lLen;

      const diffuse = Math.max(0, nx * lx + ny * ly + nz * lz); // Lambert
      value = intensity * (ambient + (1 - ambient) * diffuse);
    }

    colorHSV(hue, 0.5, value);
    deposit(px, py, pz);
  }
}

function drawSolarSystem(t) {
  // 80s neon color palette
  const neonPalette = [
    { h: 0.95, name: "Pink" }, // Neon pink
    { h: 0.58, name: "Cyan" }, // Neon cyan
    { h: 0.18, name: "Yellow" }, // Neon yellow
    { h: 0.83, name: "Purple" }, // Neon purple
  ];

  // Draw Sun
  size(6);
  fuzz(6, 0.8);
  residue(4);

  // Draw sun as an ellipsoid with undulating surface
  const sunRadius = 12;
  const pulse = Math.sin(t * 2) * 0.05 + 1;

  // Draw sun surface
  drawEllipsoidLit(
    0,
    0,
    0,
    sunRadius * pulse,
    sunRadius * pulse,
    sunRadius * pulse,
    0 + Math.sin(t * 0.3) * 0.5,
    500,
    { emmissive: true },
  );

  // Draw sun corona
  size(5);
  fuzz(16, 3);
  const coronaPoints = 100;
  for (let i = 0; i < coronaPoints; i++) {
    const angle = (i / coronaPoints) * Math.PI * 2;
    const r = sunRadius * 1.5 + Math.sin(angle * 8 + t * 5) * 2;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = Math.sin(angle * 4 + t * 3) * 2;

    colorHSV(0.5 + Math.sin(t * 0.3) * 0.5, 0.8, 0.9);
    deposit(x, y, z);
  }

  // Parameters for planets
  const planets = [
    {
      distance: 24,
      size: 4,
      color: neonPalette[0],
      speed: 1.5,
      moons: 0,
      stretch: { x: 1, y: 1, z: 1 },
    },
    {
      distance: 32,
      size: 5,
      color: neonPalette[1],
      speed: 1.0,
      moons: 0,
      stretch: { x: 1, y: 0.95, z: 1 },
    },
    {
      distance: 39,
      size: 8.0,
      color: neonPalette[2],
      speed: 0.7,
      moons: 1,
      moonColor: neonPalette[0],
      stretch: { x: 1, y: 1, z: 1 },
    },
    {
      distance: 52,
      size: 6,
      color: neonPalette[3],
      speed: 0.5,
      moons: 0,
      rings: true,
      stretch: { x: 1, y: 0.9, z: 1 },
    },
  ];

  // Draw each planet
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    const angle = t * planet.speed;
    const orbitRadius = planet.distance;

    // Calculate position
    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;
    const y = Math.cos(angle * 0.5) * 2; // Slight up/down motion

    // Draw planet with surface detail
    size(8);
    fuzz(3, 0.5);

    // Draw planet as an ellipsoid
    drawEllipsoidLit(
      x,
      y,
      z,
      planet.size * planet.stretch.x,
      planet.size * planet.stretch.y,
      planet.size * planet.stretch.z,
      planet.color.h,
      100,
      { emmissive: false, ambient: 0.5, light: [0, 0, 0] },
    );

    // Draw moon if planet has one
    if (planet.moons > 0) {
      const moonAngle = angle * 3; // Moon orbits faster
      const moonDist = planet.size * 1.8;
      const moonX = x + Math.cos(moonAngle) * moonDist;
      const moonY = y + Math.sin(moonAngle * 2) * moonDist * 0.5;
      const moonZ = z + Math.sin(moonAngle) * moonDist;

      residue(10);
      // Draw moon as smaller ellipsoid
      drawEllipsoidLit(
        moonX,
        moonY,
        moonZ,
        planet.size * 0.2,
        planet.size * 0.2,
        planet.size * 0.2,
        planet.moonColor.h,
        100,
        { emmissive: false, ambient: 0.5, light: [0, 0, 0] },
      );
    }

    // Draw rings if planet has them
    if (planet.rings) {
      size(4);
      fuzz(2, 0.4);

      // Draw two elliptical rings
      const ringColors = [planet.color.h + 0.3, planet.color.h - 0.3];

      // Draw each ring set
      for (let r = 0; r < 2; r++) {
        const ringRadius = planet.size * (1.8 + r * 0.8);
        const ringWidth = planet.size * 0.2;
        colorHSV(ringColors[r], 0.9, 0.8);

        // Draw inner and outer ring bounds
        for (
          let radius = ringRadius - ringWidth;
          radius <= ringRadius + ringWidth;
          radius += ringWidth
        ) {
          for (let j = 0; j < 180; j++) {
            const a = (j / 180) * Math.PI * 2;
            // Tilt the rings
            const rx = Math.cos(a) * radius;
            const ry = Math.sin(a) * radius * 0.2; // Flattened on y-axis to create tilt effect
            const rz = Math.sin(a) * radius;
            deposit(x + rx, y + ry, z + rz);
          }
        }

        // Fill in between the rings with some points
        const fillPoints = 200;
        for (let j = 0; j < fillPoints; j++) {
          const a = (j / fillPoints) * Math.PI * 2;
          const r = ringRadius - ringWidth + Math.random() * (ringWidth * 2);
          const rx = Math.cos(a) * r;
          const ry = Math.sin(a) * r * 0.2;
          const rz = Math.sin(a) * r;
          deposit(x + rx, y + ry, z + rz);
        }
      }
    }
  }
}
`,DP=`/* — Triadic Pulse Torus — colour beats synced to scale “breath” */

function hsv(h, s, v) {
  const f = (n, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return (
    ((Math.round(f(5) * 255) << 16) |
      (Math.round(f(3) * 255) << 8) |
      Math.round(f(1) * 255)) >>>
    0
  );
}

function program(tMs) {
  const t = tMs * 0.001;
  const R = 45 + 10 * Math.sin(t); // torus breath
  const r = 7;
  const N = 800;
  size(3);
  spacing(24);
  residue(5);
  fuzz(6, 2);

  /* colour pulses in a 3‑step triad every π/2 s */
  const triad = [0xff3344, 0x33ff66, 0x3366ff];
  const beat = Math.floor((t * 2) % 3);

  for (let i = 0; i < N; i++) {
    const u = (i / N) * Math.PI * 2;
    const v = Math.sin(u * 5 + t) * Math.PI; // flower
    const x = (R + r * Math.cos(v)) * Math.cos(u);
    const y = (R + r * Math.cos(v)) * Math.sin(u);
    const z = r * Math.sin(v);
    color(triad[(beat + i) % 3]);
    trace(i ? x : x, y, z); // one ribbon
  }
}
`,LP=`function program(tMs) {
  const t = tMs * 0.001;
  const R = 30;
  const arms = 7; // number of spikes
  size(2);
  spacing(15);
  residue(4);
  fuzz(10, 0.4);

  for (let a = 0; a < arms; a++) {
    const angle = (a / arms) * Math.PI * 2 + t * 0.6;
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);
    const z = Math.sin(angle * 3 + t) * 30; // wavy height

    // Use viridis color palette instead of fixed color
    // Each arm gets a different position in the spectrum
    // The position shifts over time for animation
    colorViridis((a / arms + t * 0.2) % 1);

    trace(x, y, z);

    /* return to hub so next arm is clean */
    trace(0, 0, 0);
  }
}
`,UP=Object.assign({"./examples/beat-lattice.js":xP,"./examples/cubehelix-spiral.js":SP,"./examples/dual-source-interference.js":MP,"./examples/gpt4.5-eldritch-graffiti.js":EP,"./examples/gpt4.5-eldritch-spiral.js":bP,"./examples/gpt4.5-shield-mandala.js":TP,"./examples/lorenz-attractor.js":AP,"./examples/lorenz-flow.js":RP,"./examples/nebula-spiral.js":wP,"./examples/solar-system.js":CP,"./examples/triadic-pulse-torus.js":DP,"./examples/webbed-orb.js":LP}),NP=Object.entries(UP).map(([i,t])=>({label:i.split("/").pop().replace(".js","").replace(/([A-Z])/g," $1").replace(/^./,r=>r.toUpperCase()),code:t})),PP=`# Laser-Tracer Technical Manual

## Overview

Laser-Tracer is a real-time, programmable 3D (virtual) vector display that enables the creation of dynamic illuminated structures through sandboxed JavaScript scripting using turtle-graphics-style primitives. Users write code within a secure QuickJS environment, leveraging a set of specially provided functions to define visual/dynamic behavior. Programs are executed automatically once per animation frame:

\`\`\`javascript
function program(timeMs) {
  /* ... */
}
\`\`\`

This contains the user program which calls built-in functions that define points or paths along which glowing particles are spawned, mimicing the decay dynamics of real vector displays.

## Frame Execution Model

### Program Entry Point

- Define a function \`program(timeMs)\`.
- Automatically called once per frame with \`timeMs\` as the current timestamp in milliseconds.

### Persistent State Between Frames

- **Tracer Pose** (position and orientation) persists automatically.
- **Brush State** (color, size, fuzz, spacing, residue) also persists automatically.

Particles emitted during frame execution remain visible for their lifetime and gradually decay visually.

Important: Laser‑Tracer is a phosphor‑style vector display. A line persists only as long as each individual particle’s residue. If you want a line to stay bright indefinitely, you must retrace it every frame (or on some cadence faster than the fade‑out you intend). Think of trace() as “refreshing the stroke” rather than placing a permanent object (same for points placed with deposit()).

## Drawing Primitives

### Motion (No Particle Emission)

- **\`move(x,y,z)\`**: Moves tracer instantly to absolute coordinates \`(x,y,z)\`.
- **\`moveRel(dx,dy,dz)\`**: Moves tracer relative to its current orientation and position.

### Drawing + Motion

- **\`trace(x,y,z)\`**: Emits particles evenly spaced from current position to \`(x,y,z)\` and moves tracer to \`(x,y,z)\`.
- **\`traceRel(dx,dy,dz)\`**: Similar to \`trace\`, but relative to tracer's orientation and position.

### Drawing Only

- **\`deposit(x,y,z)\`**: Emits particles exactly at \`(x,y,z)\` without intermediate spacing. Updates tracer position accordingly.

### Tracer Orientation

- **\`yaw(θ)\`**: Yaw rotation in degrees, positive left/CCW.
- **\`pitch(θ)\`**: Pitch rotation in degrees, positive nose-up.
- **\`roll(θ)\`**: Roll rotation in degrees, positive clockwise.

Orientation is cumulative, affecting subsequent relative movements.

### Stack Operations

- **\`push()\`**: Saves current tracer pose and brush state.
- **\`pop()\`**: Restores previously saved pose and brush state.

## Brush & Particle System

### Brush Parameters

- **\`size(px)\`**: Diameter of each particle sprite (pixels).
- **\`spacing(d)\`**: Distance in world-units between particles emitted by \`trace()\`. Has no effect if only \`deposit()\`s are used.
- **\`residue(s)\`**: Lifetime of particles in seconds.
- **\`fuzz(count, sx, sy, sz)\`**: Spawns \`count\` jittered particles (according to a Gaussian distribution) around each emitted particle.

### Color Functions

- **\`colorHex(hex)\`**: Sets particle color with RGB hex value (e.g., \`0xffaa00\`).
- **\`colorRGB(r,g,b)\`**: RGB values between 0 and 1.
- **\`colorHSV(h,s,v)\`**: Hue [0–1], saturation [0–1], value [0–1].
- **\`colorViridis(t)\`**: Selects color from Viridis palette; \`t\` in [0–1].
- **\`colorCubehelix(t, start=0.5, rot=-1.5, gamma=1)\`**: Parametric Cubehelix color scheme.

### Particle Lifetime & Persistence

- Each particle emitted remains visible for its \`residue\` lifetime; alpha value goes to zero gradually.

## Performance Recommendations

- Recommended particle cap: approximately **500,000 visible particles** for smooth 60 FPS performance on mid-range GPUs.
- Be mindful of **\`spacing\`**: ≥ 0.5 world-units. Smaller spacing dramatically increases particle count.
- Suggested **\`residue\`** values:
  - Short (\`0.2–1s\`).
  - Medium (\`1–3s\`).
  - Long (\`3–10s\`).
- Moderate fuzz (\`count ≤ 10\`) is usually sufficient without excessive performance costs. You can also zero out the fuzz completely with fuzz(0) if more basic/sharp lines are desired.

## Examples

### Shield Mandala

\`\`\`javascript
function program(tMs) {
  const layers = 6; // Number of concentric layers
  const spokesPerLayer = 32; // Spokes in each layer
  const baseRadius = 10; // Starting radius
  const layerGap = 8; // Gap between layers
  const rotationSpeed = 0.00000001; // Gentle rotation speed
  const pulseSpeed = 0.002; // Gentle pulsation speed

  residue(6);
  spacing(0.5);
  fuzz(10, 1);

  roll(tMs * rotationSpeed * 30);

  for (let layer = 0; layer < layers; layer++) {
    const radius = baseRadius + layer * layerGap;
    const pulse = 0.5 + 0.5 * Math.sin(tMs * pulseSpeed + layer);

    for (let spoke = 0; spoke < spokesPerLayer; spoke++) {
      push();

      const angle = (360 / spokesPerLayer) * spoke + layer * 5;
      yaw(angle);

      const innerRadius = radius * pulse;
      const outerRadius = (radius + layerGap / 2) * (1.2 - pulse * 0.2);

      // Color shifts gently per layer and spoke
      const hue =
        (layer / layers + (spoke / spokesPerLayer) * 0.5 + tMs * 0.00005) % 1;
      size(2 + 3 * pulse);
      colorHSV(hue, 0.5, 0.9);

      moveRel(0, 0, innerRadius);
      traceRel(0, 0, outerRadius);

      pop();
    }
  }

  // Center glow
  size(15);
  residue(6);
  fuzz(400, 2.5);
  colorHSV((tMs * 0.00003 + 0.5) % 1, 0.4, 1.0);
  deposit(0, 0, 0);
}
\`\`\`

### Lorenz Flow

\`\`\`javascript
/* ================================================================
   LORENZ FLOW – real‑time stream‑tracer demo
   -----------------------------------------------------------------
   • Exercises: persistent per‑particle state, per‑frame integration,
     colour‑by‑height, hundreds of deposits each frame.
   • Parameters are exposed up top for quick experimentation.
================================================================= */

// ---------- FIELD PARAMETERS ------------------------------------
const sigma = 5;
const rho = 42;
const beta = 9 / 3;

// ---------- INTEGRATOR SETTINGS ---------------------------------
const N_PARTICLES = 256; // keep it modest for first test
const DT = 0.004; // time‑step per rendered frame
const SEED_RADIUS = 1.0; // random seed sphere around origin

// ---------- BRUSH ------------------------------------------------
const PX_SIZE = 3; // sprite px
const SPACING = 0.25; // unused (deposit only)
const RESIDUE = 9; // seconds – fade
const FUZZ_N = 6; // soft glow
const FUZZ_SIG = 0.2;

// ---------- PERSISTENT STATE -------------------------------------
if (!globalThis.__lorenz) {
  // first frame bootstrap
  const pts = [];
  for (let i = 0; i < N_PARTICLES; i++) {
    // random seed near origin
    const r = Math.random() * SEED_RADIUS;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pts.push({
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta),
      z: r * Math.cos(phi),
    });
  }
  globalThis.__lorenz = { pts };
}

function lorenzStep(p, dt) {
  const dx = sigma * (p.y - p.x);
  const dy = p.x * (rho - p.z) - p.y;
  const dz = p.x * p.y - beta * p.z;
  return {
    x: p.x + dx * dt,
    y: p.y + dy * dt,
    z: p.z + dz * dt,
  };
}

function program(tMs) {
  // --- brush -----------------------------------------------------
  size(PX_SIZE);
  residue(RESIDUE);
  fuzz(FUZZ_N, FUZZ_SIG);

  const pts = globalThis.__lorenz.pts;

  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[i];
    const p1 = lorenzStep(p0, DT);
    pts[i] = p1; // persist new position

    // approximate local stretching intensity
    const dx = sigma * (p1.y - p1.x);
    const dy = p1.x * (rho - p1.z) - p1.y;
    const dz = p1.x * p1.y - beta * p1.z;
    // cubehelix phase by orbit index so lobes differ
    const phase = (i / N_PARTICLES + tMs * 0.00005) % 1;

    // stretch as above
    const stretch = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const sNorm = Math.min(1, stretch / 50);

    // gamma <1 brightens fast zones, darkens slow
    const gamma = 0.5 + 0.5 * sNorm; // 0.5..1
    colorCubehelix(phase, 0.5, -1.5, gamma);

    deposit(p0.x, p0.y, p0.z);
    deposit(p1.x, p1.y, p1.z);
  }
}
\`\`\`

### Cubehelix Spiral

\`\`\`javascript
/* — Cubehelix Spiral — smooth chroma‑luminance spin */

let θ = 0;
function program(tMs) {
  const t = tMs * 0.001;
  const N = 1200;
  size(6);
  spacing(10);
  residue(9);
  fuzz(0);

  for (let i = 0; i < N; i++) {
    θ += 0.02;
    const r = 30 + 15 * Math.sin(t * 0.6 + i * 0.005);
    const x = r * Math.cos(θ);
    const y = r * Math.sin(θ);
    const z = (i - N / 2) * 0.12;
    colorCubehelix((t * 0.05 + i * 0.002) % 1);
    deposit(x, y, z);
  }
}
\`\`\`

### Webbed Orb

\`\`\`javascript
function program(tMs) {
  const t = tMs * 0.001;
  const R = 30;
  const arms = 7; // number of spikes
  size(2);
  spacing(15);
  residue(20);
  fuzz(10, 0.4);

  for (let a = 0; a < arms; a++) {
    const angle = (a / arms) * Math.PI * 2 + t * 0.6;
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);
    const z = Math.sin(angle * 3 + t) * 30; // wavy height
    color(0xff3366);
    trace(x, y, z);

    /* return to hub so next arm is clean */
    trace(0, 0, 0);
  }
}
\`\`\`

### Beat Lattice

\`\`\`javascript
/* grid + wave parameters */
const SIZE = 150;
const CELLS = 60;
const INC = SIZE / CELLS;
const k1 = Math.PI / 14,
  k2 = Math.PI / 15; // spatial freqs
const φ = Math.PI / 4; // ±45° waves

const plane = (x, z, k, a) => Math.cos(k * (x * Math.cos(a) + z * Math.sin(a)));

function program(tMs) {
  const t = tMs * 0.001;

  size(3);
  spacing(40);
  residue(12);
  fuzz(6, 1.5);

  for (let i = 0; i <= CELLS; i++) {
    for (let j = 0; j <= CELLS; j++) {
      const x = i * INC - SIZE / 2;
      const z = j * INC - SIZE / 2;

      /* four coherent plane waves */
      const w1 = plane(x, z, k1, φ);
      const w2 = plane(x, z, k1, -φ);
      const w3 = plane(x, z, k2, φ) * Math.cos(t * 0.7);
      const w4 = plane(x, z, k2, -φ) * Math.sin(t * 0.7);

      const A = (w1 + w2 + w3 + w4) * 0.5; // −1 … +1

      if (Math.abs(A) < 0.22) continue; // performance threshold

      /* colour + height encoding */
      const h = (A + 1) * 0.5; // 0 … 1
      colorCubehelix(h, 0.3, -2.1, 0.6);
      const y = A * 10;

      deposit(x, y, z);
    }
  }
}
\`\`\`
`,dp=NP.map((i,t)=>({key:`sys-${t}`,label:i.label,code:i.code,user:!1}));function OP(){const[i,t]=Ft.useState(null),[e,r]=Ft.useState(""),[s,l]=Ft.useState(!1),[c,f]=Ft.useState(!1),d=Ft.useRef(null),[h,m]=Ft.useState(()=>{const T=localStorage.getItem("laserTracer_user");return T?JSON.parse(T):[]}),g=[...dp,...h],v=T=>g.find(N=>N.key===T),[y,b]=Ft.useState(dp.find(T=>T.label==="Solar-system").key),R=v(y),[M,x]=Ft.useState(R.label),D=e!==R.code;Ft.useEffect(()=>{r(R.code),x(R.label)},[y]);const S=r,E=()=>{const T=h.length+1,N=`user-${T}`,k=`user_program_${T}`,q={key:N,label:k,code:"",user:!0};m(K=>[...K,q]),b(N)},A=T=>localStorage.setItem("laserTracer_user",JSON.stringify(T)),L=()=>{m(T=>{const N=T.map(k=>k.key===y?{...k,code:e,label:M}:k);return A(N),N})},P=()=>{m(T=>{const N=T.filter(q=>q.key!==y);A(N);const k=dp[0].key;return b(k),N})},O=T=>{b(T)},C=x;return Kt.jsxs("div",{className:"app-root",children:[Kt.jsx(C1,{onManual:()=>l(!0)}),Kt.jsxs("div",{className:"left-col",children:[Kt.jsx(YR,{options:g,selectedKey:y,title:M,isUserProgram:R.user,isDirty:D,onSelect:O,onNew:E,onTitleChange:C,onSave:L,onDelete:P}),Kt.jsx(eC,{ref:d,source:e,onChange:S,compileErr:i,onEditorReady:()=>f(!0)})]}),Kt.jsx(vP,{className:"canvas-pane",srcCode:e,compileErrCb:t,activeProgram:y}),Kt.jsx(yP,{ready:c,minDuration:800,onHide:()=>{var T;(T=d.current)==null||T.trigger("react","editor.action.forceRetokenize",null)}}),s&&Kt.jsx(jR,{markdown:PP,onClose:()=>l(!1)})]})}R1.createRoot(document.getElementById("root")).render(Kt.jsx(OP,{}));
