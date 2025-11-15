<<<<<<< Updated upstream
var HeatPumpFlowCard=function(t){"use strict";function e(t,e,i,o){var a,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(r<3?a(n):r>3?a(e,i,n):a(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,o=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const s=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,a))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:f}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",y=u.reactiveElementPolyfillSupport,_=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&h(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:a}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(o)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of e){const e=document.createElement("style"),a=i.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=o.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=o;const r=a.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const o=this.constructor,a=this[t];if(i??=o.getPropertyOptions(t),!((i.hasChanged??$)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[_("elementProperties")]=new Map,b[_("finalized")]=new Map,y?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.1");const k=globalThis,v=k.trustedTypes,S=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+T,H=`<${C}>`,P=document,M=()=>P.createComment(""),V=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,E="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,D=/>/g,O=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,W=/"/g,N=/^(?:script|style|textarea|title)$/i,I=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),U=I(1),G=I(2),Q=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),j=new WeakMap,q=P.createTreeWalker(P,129);function Z(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,o=[];let a,r=2===e?"<svg>":3===e?"<math>":"",n=z;for(let e=0;e<i;e++){const i=t[e];let s,l,h=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===z?"!--"===l[1]?n=R:void 0!==l[1]?n=D:void 0!==l[2]?(N.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=O):void 0!==l[3]&&(n=O):n===O?">"===l[0]?(n=a??z,h=-1):void 0===l[1]?h=-2:(h=n.lastIndex-l[2].length,s=l[1],n=void 0===l[3]?O:'"'===l[3]?W:F):n===W||n===F?n=O:n===R||n===D?n=z:(n=O,a=void 0);const d=n===O&&t[e+1].startsWith("/>")?" ":"";r+=n===z?i+H:h>=0?(o.push(s),i.slice(0,h)+A+i.slice(h)+T+d):i+T+(-2===h?e:d)}return[Z(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class J{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let a=0,r=0;const n=t.length-1,s=this.parts,[l,h]=Y(t,e);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=q.nextNode())&&s.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(A)){const e=h[r++],i=o.getAttribute(t).split(T),n=/([.?@])?(.*)/.exec(e);s.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?it:"?"===n[1]?ot:"@"===n[1]?at:et}),o.removeAttribute(t)}else t.startsWith(T)&&(s.push({type:6,index:a}),o.removeAttribute(t));if(N.test(o.tagName)){const t=o.textContent.split(T),e=t.length-1;if(e>0){o.textContent=v?v.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],M()),q.nextNode(),s.push({type:2,index:++a});o.append(t[e],M())}}}else if(8===o.nodeType)if(o.data===C)s.push({type:2,index:a});else{let t=-1;for(;-1!==(t=o.data.indexOf(T,t+1));)s.push({type:7,index:a}),t+=T.length-1}a++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,o){if(e===Q)return e;let a=void 0!==o?i._$Co?.[o]:i._$Cl;const r=V(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,o)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??P).importNode(e,!0);q.currentNode=o;let a=q.nextNode(),r=0,n=0,s=i[0];for(;void 0!==s;){if(r===s.index){let e;2===s.type?e=new tt(a,a.nextSibling,this,t):1===s.type?e=new s.ctor(a,s.name,s.strings,this,t):6===s.type&&(e=new rt(a,this,t)),this._$AV.push(e),s=i[++n]}r!==s?.index&&(a=q.nextNode(),r++)}return q.currentNode=P,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),V(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==Q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&V(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new K(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new J(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const a of t)o===e.length?e.push(i=new tt(this.O(M()),this.O(M()),this,this.options)):i=e[o],i._$AI(a),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,a){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,o){const a=this.strings;let r=!1;if(void 0===a)t=X(this,t,e,0),r=!V(t)||t!==this._$AH&&t!==Q,r&&(this._$AH=t);else{const o=t;let n,s;for(t=a[0],n=0;n<a.length-1;n++)s=X(this,o[i+n],e,n),s===Q&&(s=this._$AH[n]),r||=!V(s)||s!==this._$AH[n],s===B?t=B:t!==B&&(t+=(s??"")+a[n+1]),this._$AH[n]=s}r&&!o&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class ot extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class at extends et{constructor(t,e,i,o,a){super(t,e,i,o,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??B)===Q)return;const i=this._$AH,o=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==B&&(i===B||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=k.litHtmlPolyfillSupport;nt?.(J,tt),(k.litHtmlVersions??=[]).push("3.3.1");const st=globalThis;class lt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let a=o._$litPart$;if(void 0===a){const t=i?.renderBefore??null;o._$litPart$=a=new tt(e.insertBefore(M(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}}lt._$litElement$=!0,lt.finalized=!0,st.litElementHydrateSupport?.({LitElement:lt});const ht=st.litElementPolyfillSupport;ht?.({LitElement:lt}),(st.litElementVersions??=[]).push("4.2.1");const ct={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:$},dt=(t=ct,e,i)=>{const{kind:o,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,a,t)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const a=this[o];e.call(this,i),this.requestUpdate(o,a,t)}}throw Error("Unsupported decorator location: "+o)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ft(t,e){return(e,i,o)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const ut="1.0.13",gt=(new Date).toISOString(),mt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(i,t,a)})`
=======
var HeatPumpFlowCard=function(t){"use strict";function e(t,e,i,o){var a,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(r<3?a(n):r>3?a(e,i,n):a(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,o=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const s=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,a))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:f}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",y=u.reactiveElementPolyfillSupport,_=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&h(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:a}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(o)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of e){const e=document.createElement("style"),a=i.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=o.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=o;const r=a.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const o=this.constructor,a=this[t];if(i??=o.getPropertyOptions(t),!((i.hasChanged??$)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[_("elementProperties")]=new Map,b[_("finalized")]=new Map,y?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.1");const k=globalThis,v=k.trustedTypes,S=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+T,H=`<${C}>`,P=document,M=()=>P.createComment(""),V=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,E="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,D=/>/g,O=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,W=/"/g,N=/^(?:script|style|textarea|title)$/i,I=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),U=I(1),G=I(2),Q=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),j=new WeakMap,q=P.createTreeWalker(P,129);function Z(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,o=[];let a,r=2===e?"<svg>":3===e?"<math>":"",n=z;for(let e=0;e<i;e++){const i=t[e];let s,l,h=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===z?"!--"===l[1]?n=R:void 0!==l[1]?n=D:void 0!==l[2]?(N.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=O):void 0!==l[3]&&(n=O):n===O?">"===l[0]?(n=a??z,h=-1):void 0===l[1]?h=-2:(h=n.lastIndex-l[2].length,s=l[1],n=void 0===l[3]?O:'"'===l[3]?W:F):n===W||n===F?n=O:n===R||n===D?n=z:(n=O,a=void 0);const d=n===O&&t[e+1].startsWith("/>")?" ":"";r+=n===z?i+H:h>=0?(o.push(s),i.slice(0,h)+A+i.slice(h)+T+d):i+T+(-2===h?e:d)}return[Z(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class J{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let a=0,r=0;const n=t.length-1,s=this.parts,[l,h]=Y(t,e);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=q.nextNode())&&s.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(A)){const e=h[r++],i=o.getAttribute(t).split(T),n=/([.?@])?(.*)/.exec(e);s.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?it:"?"===n[1]?ot:"@"===n[1]?at:et}),o.removeAttribute(t)}else t.startsWith(T)&&(s.push({type:6,index:a}),o.removeAttribute(t));if(N.test(o.tagName)){const t=o.textContent.split(T),e=t.length-1;if(e>0){o.textContent=v?v.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],M()),q.nextNode(),s.push({type:2,index:++a});o.append(t[e],M())}}}else if(8===o.nodeType)if(o.data===C)s.push({type:2,index:a});else{let t=-1;for(;-1!==(t=o.data.indexOf(T,t+1));)s.push({type:7,index:a}),t+=T.length-1}a++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,o){if(e===Q)return e;let a=void 0!==o?i._$Co?.[o]:i._$Cl;const r=V(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,o)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??P).importNode(e,!0);q.currentNode=o;let a=q.nextNode(),r=0,n=0,s=i[0];for(;void 0!==s;){if(r===s.index){let e;2===s.type?e=new tt(a,a.nextSibling,this,t):1===s.type?e=new s.ctor(a,s.name,s.strings,this,t):6===s.type&&(e=new rt(a,this,t)),this._$AV.push(e),s=i[++n]}r!==s?.index&&(a=q.nextNode(),r++)}return q.currentNode=P,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),V(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==Q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&V(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new K(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new J(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const a of t)o===e.length?e.push(i=new tt(this.O(M()),this.O(M()),this,this.options)):i=e[o],i._$AI(a),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,a){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,o){const a=this.strings;let r=!1;if(void 0===a)t=X(this,t,e,0),r=!V(t)||t!==this._$AH&&t!==Q,r&&(this._$AH=t);else{const o=t;let n,s;for(t=a[0],n=0;n<a.length-1;n++)s=X(this,o[i+n],e,n),s===Q&&(s=this._$AH[n]),r||=!V(s)||s!==this._$AH[n],s===B?t=B:t!==B&&(t+=(s??"")+a[n+1]),this._$AH[n]=s}r&&!o&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class ot extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class at extends et{constructor(t,e,i,o,a){super(t,e,i,o,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??B)===Q)return;const i=this._$AH,o=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==B&&(i===B||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=k.litHtmlPolyfillSupport;nt?.(J,tt),(k.litHtmlVersions??=[]).push("3.3.1");const st=globalThis;class lt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let a=o._$litPart$;if(void 0===a){const t=i?.renderBefore??null;o._$litPart$=a=new tt(e.insertBefore(M(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}}lt._$litElement$=!0,lt.finalized=!0,st.litElementHydrateSupport?.({LitElement:lt});const ht=st.litElementPolyfillSupport;ht?.({LitElement:lt}),(st.litElementVersions??=[]).push("4.2.1");const ct={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:$},dt=(t=ct,e,i)=>{const{kind:o,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,a,t)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const a=this[o];e.call(this,i),this.requestUpdate(o,a,t)}}throw Error("Unsupported decorator location: "+o)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ft(t,e){return(e,i,o)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const ut="1.0.12",gt=(new Date).toISOString(),mt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(i,t,a)})`
>>>>>>> Stashed changes
  ha-card {
    padding: 16px;
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
  }

  .card-header {
    font-size: 24px;
    font-weight: 500;
    margin: 0 0 16px 0;
    color: var(--primary-text-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-logo-link {
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .card-logo-link:hover {
    transform: scale(1.05);
  }

  .card-logo {
    height: var(--logo-size, 40px);
    width: auto;
    opacity: 0.9;
    transition: opacity 0.3s ease;
    border-radius: 8px;
    display: block;
  }

  .card-logo:hover {
    opacity: 1;
  }

  .card-content {
    width: 100%;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  text {
    font-family: var(--paper-font-body1_-_font-family);
  }

  /* Animated gradient flow effect on pipes */
  /* Note: Animation is handled by SVG animateTransform on the gradient definitions */
  /* Note: Opacity controlled per-element via opacity attribute (0 = hidden, 1 = visible) */
  .flow-gradient {
  }

  /* Fan rotation animation */
  .fan-rotating {
    transform-origin: 60px 51px;
    animation: fan-spin linear infinite;
    animation-duration: var(--fan-duration, 1s);
  }

  @keyframes fan-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* G2 Valve animations */
  .g2-valve-path {
    transition: stroke 0.5s ease, stroke-width 0.3s ease, opacity 0.5s ease;
  }

  .g2-valve-active-path {
    animation: valve-flow-pulse 2s ease-in-out infinite;
  }

  @keyframes valve-flow-pulse {
    0%, 100% {
      stroke-width: 6;
      opacity: 1;
    }
    50% {
      stroke-width: 7;
      opacity: 0.8;
    }
  }

  .g2-valve-label {
    transition: fill 0.3s ease;
  }

  /* Aux heater pulsing animations - DRAMATIC pulsing with glow effects */
  /* Shadow blur sizes are scaled by --aux-shadow-blur CSS variable (default: 1.0) */
  @keyframes aux-glow-outer {
    0%, 100% {
      opacity: 0.2;
      filter: drop-shadow(0 0 calc(8px * var(--aux-shadow-blur, 1)) rgba(255, 68, 34, 0.5));
    }
    50% {
      opacity: 0.7;
      filter: drop-shadow(0 0 calc(16px * var(--aux-shadow-blur, 1)) rgba(255, 68, 34, 0.9));
    }
  }

  @keyframes aux-glow-middle {
    0%, 100% {
      opacity: 0.4;
      filter: drop-shadow(0 0 calc(6px * var(--aux-shadow-blur, 1)) rgba(255, 102, 68, 0.6));
    }
    50% {
      opacity: 0.9;
      filter: drop-shadow(0 0 calc(12px * var(--aux-shadow-blur, 1)) rgba(255, 102, 68, 1.0));
    }
  }

  @keyframes aux-glow-inner {
    0%, 100% {
      opacity: 0.6;
      filter: drop-shadow(0 0 calc(4px * var(--aux-shadow-blur, 1)) rgba(255, 136, 85, 0.7));
    }
    50% {
      opacity: 1.0;
      filter: drop-shadow(0 0 calc(10px * var(--aux-shadow-blur, 1)) rgba(255, 136, 85, 1.0));
    }
  }

  @keyframes aux-cylinder-pulse {
    0%, 100% {
      opacity: 0.7;
      filter: drop-shadow(0 0 calc(6px * var(--aux-shadow-blur, 1)) rgba(255, 68, 34, 0.6));
    }
    50% {
      opacity: 1.0;
      filter: drop-shadow(0 0 calc(12px * var(--aux-shadow-blur, 1)) rgba(255, 68, 34, 1.0));
    }
  }

  /* Base state for aux heater elements - hidden by default */
  .aux-heater-layer {
    opacity: 0 !important;
    filter: none !important; /* Remove default rect drop-shadow */
  }

  /* DHW coil pulsing animations - similar to aux heater but for coil heating */
  @keyframes dhw-coil-glow-outer {
    0%, 100% {
      opacity: 0.15;
      filter: drop-shadow(0 0 6px rgba(255, 102, 68, 0.4));
    }
    50% {
      opacity: 0.4;
      filter: drop-shadow(0 0 12px rgba(255, 102, 68, 0.7));
    }
  }

  @keyframes dhw-coil-glow-inner {
    0%, 100% {
      opacity: 0.3;
      filter: drop-shadow(0 0 4px rgba(255, 136, 85, 0.5));
    }
    50% {
      opacity: 0.6;
      filter: drop-shadow(0 0 8px rgba(255, 136, 85, 0.9));
    }
  }

  /* Base state for DHW coil glow - hidden by default */
  .dhw-coil-glow-layer {
    opacity: 0 !important;
    filter: none !important;
  }

  /* DHW coil active state - show and animate when G2 valve sends water to DHW */
  .dhw-coil-glow-outer {
    opacity: 0.25;
    animation: dhw-coil-glow-outer 1.5s ease-in-out infinite;
    filter: none; /* Will be set by animation */
  }

  .dhw-coil-glow-inner {
    opacity: 0.45;
    animation: dhw-coil-glow-inner 1.2s ease-in-out infinite;
    filter: none; /* Will be set by animation */
  }

  /* When active, show and animate - SPEED INCREASES WITH POWER LEVEL */
  .aux-glow-outer {
    opacity: 0.45;
    animation: aux-glow-outer var(--aux-anim-speed, 1s) ease-in-out infinite;
    filter: none; /* Will be set by animation */
  }

  .aux-glow-middle {
    opacity: 0.65;
    animation: aux-glow-middle calc(var(--aux-anim-speed, 1s) * 0.8) ease-in-out infinite;
    filter: none; /* Will be set by animation */
  }

  .aux-glow-inner {
    opacity: 0.8;
    animation: aux-glow-inner calc(var(--aux-anim-speed, 1s) * 0.6) ease-in-out infinite;
    filter: none; /* Will be set by animation */
  }

  .aux-cylinder-pulse {
    opacity: 0.85;
    animation: aux-cylinder-pulse var(--aux-anim-speed, 1s) ease-in-out infinite;
    filter: none; /* Will be set by animation */
  }

  /* Pipe styling - exclude flow-gradient animations from drop-shadow */
  path:not(.flow-gradient) {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  /* Component boxes */
  rect {
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  }

  ellipse {
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  }
`;return console.info(`%c  HEAT-PUMP-FLOW-CARD  \n%c  Version ${ut}  \n%c  Built: ${gt}  `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray","color: #95a5a6; font-weight: normal; background: dimgray"),t.HeatPumpFlowCard=class extends lt{constructor(){super(...arguments),this.lastRenderTime=0,this.lastHassState={}}static getConfigElement(){}static getStubConfig(){return{type:"custom:heat-pump-flow-card",title:"Heat Pump Flow"}}setConfig(t){if(!t)throw new Error("Invalid configuration");const{animation:e,temperature:i,display:o,heat_pump_visual:a,labels:r,temperature_status:n,...s}=t;this.config={...s,animation:{enabled:!0,min_flow_rate:5,max_flow_rate:1,max_flow_rate_value:50,idle_threshold:0,...e},temperature:{delta_threshold:10,hot_color:"#e74c3c",cold_color:"#3498db",neutral_color:"#95a5a6",unit:"C",...i},display:{show_values:!0,show_labels:!0,show_icons:!0,compact:!1,decimal_places:1,...o},heat_pump_visual:{off_color:"#95a5a6",heating_color:"#e74c3c",cooling_color:"#3498db",dhw_color:"#e67e22",defrost_color:"#f1c40f",show_metrics:!0,animate_fan:!0,...a},labels:{hp_supply:"HP Supply",hp_return:"HP Return",hvac_supply:"HVAC Supply",hvac_return:"HVAC Return",buffer_tank:"BUFFER",dhw_tank:"DHW",power_in:"Power In",thermal_out:"Thermal Out",cop:"COP",flow:"Flow",energy:"Energy",cost:"Cost",...r},temperature_status:{enabled:!1,circle_radius:12,...n,points:{hp_outlet:{enabled:!0},hp_inlet:{enabled:!0},buffer_supply:{enabled:!0},buffer_return:{enabled:!0},hvac_supply:{enabled:!0},hvac_return:{enabled:!0},dhw_inlet:{enabled:!0},dhw_outlet:{enabled:!0},dhw_tank_inlet:{enabled:!0},dhw_tank_outlet:{enabled:!0},dhw_tank_2_outlet:{enabled:!0},...n?.points}}}}shouldUpdate(t){if(t.has("config"))return!0;if(t.has("hass")){const t=Date.now();if(t-this.lastRenderTime<1e3)return this.updateAnimationVariables(),!1;this.lastRenderTime=t}return super.shouldUpdate(t)}updated(t){super.updated(t),t.has("hass")&&this.hass&&this.updateAnimationVariables()}firstUpdated(){this.config.animation.enabled&&setTimeout(()=>{this.updateAnimationVariables()},100),window.debugCard=()=>{const t=document.querySelector("heat-pump-flow-card");return t?(console.log("Card found:",t),console.log("Shadow root:",t.shadowRoot),{card:t,shadowRoot:t.shadowRoot,config:this.config,dhwTank2State:this.getDHWTank2State(),querySelector:e=>t.shadowRoot?.querySelector(e)}):null}}updateAnimationVariables(){this.updateFanAnimation()}updateFanAnimation(){const t=this.shadowRoot?.querySelector("#fan-blades");if(!t||!this.config.heat_pump_visual?.animate_fan)return;const e=this.getHeatPumpState().fanSpeed||0;if(e>0){t.classList.add("fan-rotating");const i=e>0?100/e:999;t.style.setProperty("--fan-duration",`${i}s`)}else t.classList.remove("fan-rotating")}getHeatPumpState(){const t=this.config.heat_pump||{};return{power:this.getStateValue(t.power_entity)||0,thermal:this.getStateValue(t.thermal_entity)||0,cop:this.getStateValue(t.cop_entity)||0,outletTemp:this.getStateValue(t.outlet_temp_entity)||0,inletTemp:this.getStateValue(t.inlet_temp_entity)||0,flowRate:this.getStateValue(t.flow_rate_entity)||0,fanSpeed:this.getStateValue(t.fan_speed_entity),mode:this.getStateString(t.mode_entity),modeDisplay:this.getStateString(t.mode_display_entity),defrost:"on"===this.getStateString(t.defrost_entity),error:this.getStateString(t.error_entity),energy:this.getStateValue(t.energy_entity),cost:this.getStateValue(t.cost_entity),runtime:this.getStateValue(t.runtime_entity),heatingTargetTemp:this.getStateValue(t.heating_target_temp_entity),dhwTargetTemp:this.getStateValue(t.dhw_target_temp_entity),coolingTargetTemp:this.getStateValue(t.cooling_target_temp_entity),amps:this.getStateValue(t.amps_entity),volts:this.getStateValue(t.volts_entity),compressorFrequency:this.getStateValue(t.compressor_frequency_entity),dischargeTemp:this.getStateValue(t.discharge_temp_entity),ambientTemp:this.getStateValue(t.ambient_temp_entity),dhwTemp:this.getStateValue(t.dhw_temp_entity),outdoorCoilTemp:this.getStateValue(t.outdoor_coil_temp_entity),suctionTemp:this.getStateValue(t.suction_temp_entity),heatExchangerTemp:this.getStateValue(t.heat_exchanger_temp_entity),plateExchangeTemp:this.getStateValue(t.plate_exchange_temp_entity),ecFanMotor1Speed:this.getStateValue(t.ec_fan_motor_1_speed_entity),ecFanMotor2Speed:this.getStateValue(t.ec_fan_motor_2_speed_entity),busLineVoltage:this.getStateValue(t.bus_line_voltage_entity),fanShutdownCode:this.getStateValue(t.fan_shutdown_code_entity),ipmTemp:this.getStateValue(t.ipm_temp_entity),compressorRunningTime:this.getStateValue(t.compressor_running_time_entity),eHeaterPower:this.getStateValue(t.e_heater_power_entity),din6ModeSwitch:this.getStateValue(t.din6_mode_switch_entity),din7ModeSwitch:this.getStateValue(t.din7_mode_switch_entity),pumpEnabled:"on"===this.getStateString(t.pump_enabled_entity),compressorMaxPercentage:this.getStateValue(t.compressor_max_percentage_entity)}}getStateString(t){if(!t||!this.hass)return;const e=this.hass.states[t];return e?.state}getBufferTankState(){const t=this.config.buffer_tank||{};return{supplyTemp:this.getStateValue(t.supply_temp_entity)||0,returnTemp:this.getStateValue(t.return_temp_entity)||0,level:this.getStateValue(t.level_entity),tankTemp:this.getStateValue(t.tank_temp_entity),energyReserve:this.getStateValue(t.energy_reserve_entity)}}getHVACState(){const t=this.config.hvac||{};return{thermal:this.getStateValue(t.thermal_entity)||0,flowRate:this.getStateValue(t.flow_rate_entity)||0,supplyTemp:this.getStateValue(t.supply_temp_entity)||0,returnTemp:this.getStateValue(t.return_temp_entity)||0}}getDHWTankState(){const t=this.config.dhw_tank||{};return{inletTemp:this.getStateValue(t.inlet_temp_entity)||0,outletTemp:this.getStateValue(t.outlet_temp_entity)||0,tankTemp:this.getStateValue(t.tank_temp_entity),tankInletFlow:this.getStateValue(t.tank_inlet_flow_entity),tankInletTemp:this.getStateValue(t.tank_inlet_temp_entity),tankOutletTemp:this.getStateValue(t.tank_outlet_temp_entity)}}getDHWTank2State(){const t=this.config.dhw_tank_2||{};return{enabled:t.enabled||!1,inletTemp:this.getStateValue(t.inlet_temp_entity)||0,outletTemp:this.getStateValue(t.outlet_temp_entity)||0,tankTemp:this.getStateValue(t.tank_temp_entity)}}getG2ValveState(){const t=this.config.g2_valve||{},e=this.getStateString(t.state_entity);return{isActive:"on"===e||"true"===e||"1"===e}}getAuxHeaterState(){const t=this.config.aux_heater||{},e=t.enabled||!1,i=this.getStateValue(t.power_entity)||0,o=t.max_power||18e3;return{enabled:e,power:i,maxPower:o,intensity:Math.min(i/o,1),displayName:t.display_name||t.name||"AUX"}}getStateValue(t){if(!t||!this.hass)return;const e=this.hass.states[t];if(!e)return;const i=parseFloat(e.state);return isNaN(i)?void 0:i}getStateUnit(t){if(!t||!this.hass)return"";const e=this.hass.states[t];return e?.attributes?.unit_of_measurement||""}formatValue(t,e=1){return void 0===t?"N/A":t.toFixed(e)}renderTankTempIndicator(t,e,i,o,a,r,n){if(!a||!o||void 0===i||isNaN(i))return G``;return G`
      <g class="tank-temp-indicator"
         style="cursor: pointer;"
         @click="${t=>this.handleTemperatureClick(t,o)}">
        <!-- Circle with white fill and colored border -->
        <circle
          cx="${t}"
          cy="${e}"
          r="${r||15}"
          fill="white"
          stroke="${n}"
          stroke-width="2.5"
          opacity="0.95"
          filter="url(#circle-shadow)" />

        <!-- Temperature text -->
        <text
          x="${t}"
          y="${e+1}"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="${n}"
          font-size="10"
          font-weight="bold"
          letter-spacing="-0.5"
          font-family="Arial, sans-serif">
          ${this.formatValue(i,1)}°
        </text>
      </g>
    `}handleTemperatureClick(t,e){if(t.stopPropagation(),!e||!this.hass)return;const i=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(i)}renderTemperatureIndicator(t,e,i,o,a,r){if(!this.config.temperature_status?.enabled||!a?.enabled||!i)return G``;if(void 0===o||isNaN(o))return G``;const n=this.config.temperature_status.circle_radius||12;return G`
      <g class="temp-status-indicator"
         style="cursor: pointer;"
         @click="${t=>this.handleTemperatureClick(t,i)}">
        <!-- Circle with white fill and pipe-colored border -->
        <circle
          cx="${t}"
          cy="${e}"
          r="${n}"
          fill="white"
          stroke="${r}"
          stroke-width="2"
          opacity="0.95"
          filter="url(#circle-shadow)" />

        <!-- Temperature text with condensed spacing -->
        <text
          x="${t}"
          y="${e+1}"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="${r}"
          font-size="7.5"
          font-weight="bold"
          letter-spacing="-0.5"
          font-family="Arial, sans-serif">
          ${this.formatValue(o,1)}°
        </text>
      </g>
    `}getPipeColors(t,e,i){const o=this.config.temperature,a=Math.abs(t-e);return i<=this.config.animation.idle_threshold||a<o.delta_threshold?{hotPipe:o.neutral_color,coldPipe:o.neutral_color}:t>e?{hotPipe:o.hot_color,coldPipe:o.cold_color}:{hotPipe:o.cold_color,coldPipe:o.hot_color}}generateTankGradient(t,e,i){const o="buffer"===t?this.config.buffer_tank?.gradient:"dhw_tank_2"===t?this.config.dhw_tank_2?.gradient:this.config.dhw_tank?.gradient;let a,r;if(void 0!==o?.min_temp){a=("number"==typeof o.min_temp?o.min_temp:this.getStateValue(o.min_temp))??60}else a=this.getStateValue(o?.min_temp_entity)??o?.min_temp_fallback??60;if(void 0!==o?.max_temp){r=("number"==typeof o.max_temp?o.max_temp:this.getStateValue(o.max_temp))??130}else r=this.getStateValue(o?.max_temp_entity)??o?.max_temp_fallback??130;const n=r-a,s=n>0?Math.max(0,Math.min(1,(e-a)/n)):0,l=Math.round(100*s);if(!1===o?.enabled)return{levels:[],fillPercentage:l};const h=Math.max(2,o?.levels??10),c=o?.bottom_color??this.config.temperature?.neutral_color??"#95a5a6";let d;d="buffer"===t?i?o?.heating_top_color??this.config.temperature?.hot_color??"#e74c3c":o?.cooling_top_color??this.config.temperature?.cold_color??"#3498db":o?.top_color??this.config.temperature?.hot_color??"#e74c3c";const p=130/h,f=[];for(let t=0;t<h;t++){const e=t/(h-1),i=155-(t+1)*p,o=this.interpolateColor(c,d,e),a=(t/h+(t+1)/h)/2<=s?.95:.05;f.push({y:i,height:p,color:o,opacity:a})}return{levels:f,fillPercentage:l}}renderGradientRects(t){const e=[];for(let i=0;i<t.length;i++){const o=t[i];e.push(G`<rect x="15" y="${o.y}" width="60" height="${o.height}" fill="${o.color}" opacity="${o.opacity}"></rect>`)}return e}hexToRgb(t){const e={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#008000",blue:"#0000FF",yellow:"#FFFF00",cyan:"#00FFFF",magenta:"#FF00FF",orange:"#FFA500",purple:"#800080",pink:"#FFC0CB",brown:"#A52A2A",gray:"#808080",grey:"#808080"}[t.toLowerCase()]||t,i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return i?{r:parseInt(i[1],16),g:parseInt(i[2],16),b:parseInt(i[3],16)}:{r:0,g:0,b:0}}interpolateColor(t,e,i){i=Math.max(0,Math.min(1,i));const o=this.hexToRgb(t),a=this.hexToRgb(e),r=Math.round(o.r+(a.r-o.r)*i),n=Math.round(o.g+(a.g-o.g)*i),s=Math.round(o.b+(a.b-o.b)*i);return`#${r.toString(16).padStart(2,"0")}${n.toString(16).padStart(2,"0")}${s.toString(16).padStart(2,"0")}`}getHeatPumpColor(t){const e=this.config.heat_pump_visual;if(t.defrost)return e.defrost_color;if(t.power<=0)return e.off_color;const i=(t.mode||t.modeDisplay)?.toLowerCase();return i?.includes("heat")?e.heating_color:i?.includes("cool")?e.cooling_color:i?.includes("dhw")||i?.includes("hot water")?e.dhw_color:e.off_color}getDisplayMode(t,e){return t.mode?t.mode.toUpperCase():t.modeDisplay?t.modeDisplay.toUpperCase():t.defrost?"DEFROST":t.power<=0&&t.thermal<=0?"OFF":t.power>0?e.isActive?"DHW":"HEATING":"OFF"}getContrastTextColor(t){const e=t.replace("#","");return(.299*parseInt(e.substr(0,2),16)+.587*parseInt(e.substr(2,2),16)+.114*parseInt(e.substr(4,2),16))/255>.35?"#2c3e50":"#ffffff"}renderIcon(t,e,i,o,a,r=.8,n){if(t.startsWith("mdi:")){const s=5;return G`
        <foreignObject x="${e-s}" y="${i-s}" width="${o+2*s}" height="${a+2*s}">
          <ha-icon
            icon="${t}"
            style="
              --mdc-icon-size: ${o}px;
              width: ${o}px;
              height: ${a}px;
              display: block;
              color: ${n||"var(--primary-text-color)"};
              opacity: ${r};
              padding: ${s}px;
            "
          ></ha-icon>
        </foreignObject>
      `}return G`
        <image
          x="${e}"
          y="${i}"
          width="${o}"
          height="${a}"
          href="${t}"
          opacity="${r}"
        />
      `}getAnimationDuration(t){const e=this.config.animation;if(t<=0)return e.min_flow_rate;const i=Math.min(t/e.max_flow_rate_value,1);return e.min_flow_rate-i*(e.min_flow_rate-e.max_flow_rate)}render(){if(!this.config||!this.hass)return U``;const t=this.getHeatPumpState(),e=this.getBufferTankState(),i=this.getHVACState(),o=this.getDHWTankState(),a=this.getDHWTank2State(),r=this.getG2ValveState(),n=this.getAuxHeaterState(),s=this.getPipeColors(t.outletTemp,t.inletTemp,t.flowRate),l=this.getPipeColors(e.supplyTemp,i.returnTemp,i.flowRate),h=s.hotPipe,c=s.coldPipe,d=l.hotPipe,p=l.coldPipe,f=t.flowRate>this.config.animation.idle_threshold,u=this.config.temperature.hot_color,g=this.config.temperature.cold_color,m=this.config.dhw_tank?.inlet_color||this.config.temperature.hot_color,y=this.config.dhw_tank?.outlet_color||this.config.temperature.cold_color,_=this.config.dhw_tank?.tank_inlet_color||"#3498db",w=this.config.dhw_tank?.tank_outlet_color||"#e74c3c",$=this.config.dhw_tank_2?.tank_outlet_color||"#e74c3c",x=e.supplyTemp>e.returnTemp,b=e.supplyTemp,k=this.generateTankGradient("buffer",b,x),v=k.levels,S=k.fillPercentage,A=o.tankTemp??o.inletTemp,T=this.generateTankGradient("dhw",A,!0),C=T.levels,H=T.fillPercentage;let P=[],M=0;if(a.enabled){const t=a.tankTemp??a.inletTemp,e=this.generateTankGradient("dhw_tank_2",t,!0);P=e.levels,M=e.fillPercentage}const V=this.getHeatPumpColor(t),L=this.getContrastTextColor(V),E="var(--primary-text-color)";t.error;const z=n.intensity;let R="#bdc3c7";if(z>0){const t=189,e=195,i=199,o=255,a=68,r=34;R=`rgb(${Math.round(t+(o-t)*z)}, ${Math.round(e+(a-e)*z)}, ${Math.round(i+(r-i)*z)})`}const D=this.config.aux_heater?.glow_size??8,O=224,F=172,W=60,N=O,I=F-D,Q=W,B=16+2*D,j=2,q=2,Z=O,Y=F-.75*D,J=W,X=16+2*D*.75,K=2,tt=2,et=O,it=F-.5*D,ot=W,at=16+2*D*.5,rt=2,nt=2,st=z>0?2-1.4*z:2,lt=Math.max(1.2,Math.min(4,4-.18*t.flowRate)),ht=this.config.aux_heater?.shadow_blur??1,ct=z>0?"aux-glow-outer":"aux-heater-layer",dt=z>0?"aux-glow-middle":"aux-heater-layer",pt=z>0?"aux-glow-inner":"aux-heater-layer",ft=z>0?"aux-cylinder-pulse":"",gt=this.config.logo_size||40,mt=!1!==this.config.show_logo,yt=this.config.logo_path||"/local/heat-pump-flow.png",_t=this.config.logo_url||"https://github.com/jasipsw/heat-pump-flow-card#readme";return U`
      <ha-card style="--logo-size: ${gt}px">
        ${this.config.title||mt?U`
          <h1 class="card-header">
            <span>${this.config.title||""}</span>
            ${mt?U`
              <a href="${_t}" target="_blank" rel="noopener noreferrer" class="card-logo-link">
                <img src="${yt}" class="card-logo" alt="Heat Pump Flow Card" />
              </a>
            `:""}
          </h1>
        `:""}

        <div class="card-content">
          <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG Filter Definitions -->
            <defs>
              <!-- Drop shadow filter for aux heater -->
              <filter id="aux-heater-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000000" flood-opacity="0.5"/>
              </filter>

              <!-- Drop shadow filter for main entities (stronger for better depth) -->
              <filter id="entity-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
              </filter>

              <!-- Subtle shadow filter for temperature indicators (softer, more circular) -->
              <filter id="circle-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
              </filter>

              <!-- Blur filters for aux heater glow layers -->
              <filter id="aux-glow-outer">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12"/>
              </filter>
              <filter id="aux-glow-middle">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8"/>
              </filter>
              <filter id="aux-glow-inner">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4"/>
              </filter>

              <!-- Flow gradients defined inline with each path for unique staggered timing -->
            </defs>

            <!-- Flow Pipes (rendered first so they appear behind entities) -->

            <!-- Pipes with 10px gaps from entities for clean appearance -->
            <!-- CONVENTIONAL: Supply on top (hot), Return on bottom (cold) -->

            <!-- HEATING MODE PIPES (shown when G2 valve is OFF - heating mode) -->
            <!-- Z-ORDER: Return pipes first (behind), then supply pipes (on top) -->

            <!-- Pipe: Buffer to HP (cold return) - BOTTOM - Connects to DHW return junction at x=330 - BEHIND -->
            <path id="buffer-to-hp-path"
                  d="M 390 220 L 330 220"
                  stroke="${r.isActive?this.config.temperature?.neutral_color||"#95a5a6":c}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive?"0.3":"1"}"/>

            <!-- Pipe: Junction to HP (cold return continuation) - heating mode only -->
            <path id="junction-to-hp-path"
                  d="M 330 220 L 180 220"
                  stroke="${c}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive?"0":"1"}"/>

            <!-- Pipe: HP to aux heater (first segment) -->
            <!-- Shows water at HP outlet temperature before aux heater boost -->
            <path id="hp-to-aux-heating-path"
                  d="M 180 180 L 254 180"
                  stroke="${h}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${z>0?"0.5":"1"}"/>

            <!-- Pipe: Aux heater to G2 valve (second segment) -->
            <!-- Shows boosted temperature after aux heater adds energy -->
            <!-- Hidden when flow animation is active to prevent color visibility issues -->
            <path id="aux-to-g2-heating-path"
                  d="M 254 180 L 328 180"
                  stroke="${z>0?this.config.temperature?.hot_color||"#e74c3c":h}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${t.flowRate>this.config.animation.idle_threshold?"0":"1"}"/>

            <!-- Pipe: G2 to Buffer (continuation) - only active in heating mode -->
            <path id="g2-to-buffer-path"
                  d="M 367 180 L 390 180"
                  stroke="${r.isActive?this.config.temperature?.neutral_color||"#95a5a6":h}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive?"0.3":"1"}"/>

            <!-- DHW MODE PIPES (shown when G2 valve is ON - DHW mode) -->
            <!-- Z-ORDER: Return pipes first (behind), then supply pipes (on top) -->

            <!-- Pipe: DHW outlet to HP return (BOTTOM) - Separated horizontally at x=330 (left of G2 pipe) - BEHIND -->
            <!-- Always visible: gray when inactive, colored when active -->
            <path id="dhw-to-hp-return-path"
                  d="M 418 470 L 330 470 L 330 220 L 180 220"
                  stroke="${r.isActive?g:this.config.temperature?.neutral_color||"#95a5a6"}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Pipe: G2 valve down to DHW tank inlet (supply to coil) - At x=348, horizontally separated from return -->
            <!-- Always visible: gray when inactive, colored when active -->
            <path id="g2-to-dhw-path"
                  d="M 348 195 L 348 370 L 418 370"
                  stroke="${r.isActive?u:this.config.temperature?.neutral_color||"#95a5a6"}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- DHW coil spiral path (for flow animation) - Matches actual tank coil position -->
            <path id="dhw-coil-path"
                  d="M 418 370 Q 438 378, 458 370 Q 438 390, 418 390 Q 438 406, 458 390 Q 438 422, 418 422 Q 438 438, 458 422 Q 438 454, 418 454 Q 438 470, 458 454 Q 438 478, 418 470"
                  stroke="none"
                  stroke-width="0"
                  fill="none"
                  opacity="0"/>

            <!-- DHW TANK INLET/OUTLET PIPES (street water in, hot water out) -->
            <!-- Pipe: Street water inlet to DHW tank (cold water supply to vertical center) -->
            <path id="dhw-tank-inlet-path"
                  d="M 305 420 L 435 420"
                  stroke="${_}"
                  stroke-width="8"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Water source icon (e.g., water tower) at inlet start - rendered after pipe for z-order -->
            ${this.renderIcon(this.config.dhw_tank?.tank_inlet_icon_url||"mdi:water-pump",245,390,60,60,.9,this.config.dhw_tank?.tank_inlet_icon_color)}

            <!-- Pipe: DHW tank outlet (hot water) -->
            ${a.enabled?G`
              <!-- Pipe from DHW tank 1 to DHW tank 2 -->
              <path id="dhw-tank-outlet-path"
                    d="M 470 380 L 560 380"
                    stroke="${"#e74c3c"}"
                    stroke-width="8"
                    fill="none"
                    stroke-linecap="butt"/>
            `:G`
              <!-- Pipe from DHW tank 1 to house (when tank 2 is disabled) -->
              <path id="dhw-tank-outlet-path"
                    d="M 470 380 L 550 380"
                    stroke="${w}"
                    stroke-width="8"
                    fill="none"
                    stroke-linecap="butt"/>
            `}

            <!-- Pipe: DHW tank 2 outlet to house (only when tank 2 is enabled) -->
            ${a.enabled?G`
              <path id="dhw-tank-2-outlet-path"
                    d="M 630 380 L 710 380"
                    stroke="${$}"
                    stroke-width="8"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- Faucet icon at final outlet -->
              ${this.renderIcon(this.config.dhw_tank_2?.tank_outlet_icon_url||"mdi:faucet-variant",705,350,60,60,.9,this.config.dhw_tank_2?.tank_outlet_icon_color)}
            `:G`
              <!-- Faucet icon at DHW tank 1 outlet (when tank 2 is disabled) -->
              ${this.renderIcon(this.config.dhw_tank?.tank_outlet_icon_url||"mdi:faucet-variant",545,350,60,60,.9,this.config.dhw_tank?.tank_outlet_icon_color)}
            `}

            <!-- Z-ORDER: Return first (behind), supply on top -->
            <!-- Pipe: HVAC to Buffer (cold return) - 10px gap from buffer - BEHIND -->
            <path id="hvac-to-buffer-path"
                  d="M 620 220 L 480 220"
                  stroke="${p}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Pipe: Buffer to HVAC (hot supply) - 10px gap from buffer - ON TOP -->
            <path id="buffer-to-hvac-path"
                  d="M 480 180 L 620 180"
                  stroke="${d}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Animated Flow Overlays (shimmer effect on pipes) -->
            <!-- Note: Adding tiny kinks to straight paths for gradient rendering -->
            <!-- Note: Animations use smooth constant flow gradients with staggered timing -->
            <!-- Note: Visibility controlled by opacity (always rendered for proper SVG structure) -->

            <!-- HP to Buffer continuous animation (heating mode) -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 180 180 L 283.5 180 L 283.5 180.01 L 390 180"
                  stroke="${h}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${!r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-hp-to-buffer" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="x1" values="-50%;50%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="50%;150%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 180 180 L 283.5 180 L 283.5 180.01 L 390 180"
                  stroke="url(#flow-grad-hp-to-buffer)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${!r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>

            <!-- HP to G2 continuous animation (DHW mode) -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 180 180 L 254 180 L 254 180.01 L 328 180"
                  stroke="${h}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-hp-to-g2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="x1" values="-50%;50%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="50%;150%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 180 180 L 254 180 L 254 180.01 L 328 180"
                  stroke="url(#flow-grad-hp-to-g2)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>


            <!-- Buffer to HVAC (horizontal hot) -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 480 180 L 550 180 L 550 180.01 L 620 180"
                  stroke="${d}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${i.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="x1" values="-50%;50%" dur="${lt}s" begin="0.9s" repeatCount="indefinite" />
                <animate attributeName="x2" values="50%;150%" dur="${lt}s" begin="0.9s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 480 180 L 550 180 L 550 180.01 L 620 180"
                  stroke="url(#flow-grad-4)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${i.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>

            <!-- Buffer to HP return continuous animation (heating mode) -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 390 220 L 285 220 L 285 220.01 L 180 220"
                  stroke="${c}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${!r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-buffer-to-hp-return" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(50, 100, 180, 0.6)" />
                <stop offset="40%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="50%" stop-color="rgba(110, 170, 255, 1.0)" />
                <stop offset="60%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="100%" stop-color="rgba(50, 100, 180, 0.6)" />
                <animate attributeName="x1" values="50%;-50%" dur="${lt}s" begin="1.2s" repeatCount="indefinite" />
                <animate attributeName="x2" values="150%;50%" dur="${lt}s" begin="1.2s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 390 220 L 285 220 L 285 220.01 L 180 220"
                  stroke="url(#flow-grad-buffer-to-hp-return)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${!r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>

            <!-- HVAC to buffer return (horizontal cold) -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 620 220 L 550 220 L 550 220.01 L 480 220"
                  stroke="${p}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${i.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-6" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(50, 100, 180, 0.6)" />
                <stop offset="40%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="50%" stop-color="rgba(110, 170, 255, 1.0)" />
                <stop offset="60%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="100%" stop-color="rgba(50, 100, 180, 0.6)" />
                <animate attributeName="x1" values="50%;-50%" dur="${lt}s" begin="1.5s" repeatCount="indefinite" />
                <animate attributeName="x2" values="150%;50%" dur="${lt}s" begin="1.5s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 620 220 L 550 220 L 550 220.01 L 480 220"
                  stroke="url(#flow-grad-6)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${i.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>

            <!-- Z-ORDER: Return paths first (behind), then supply paths (on top) -->

            <!-- DHW to HP return - horizontal segment 1 (cold) - DHW mode only -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 418 470 L 374 470 L 374 470.01 L 330 470"
                  stroke="${g}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-9a" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(50, 100, 180, 0.6)" />
                <stop offset="40%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="50%" stop-color="rgba(110, 170, 255, 1.0)" />
                <stop offset="60%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="100%" stop-color="rgba(50, 100, 180, 0.6)" />
                <animate attributeName="x1" values="50%;-50%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="150%;50%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 418 470 L 374 470 L 374 470.01 L 330 470"
                  stroke="url(#flow-grad-9a)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>

            <!-- DHW to HP return - vertical segment (cold) - DHW mode only -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 330 470 L 330 345 L 330 345.01 L 330 220"
                  stroke="${g}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-9b" x1="330" y1="470" x2="330" y2="220" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="rgba(50, 100, 180, 0.6)" />
                <stop offset="40%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="50%" stop-color="rgba(110, 170, 255, 1.0)" />
                <stop offset="60%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="100%" stop-color="rgba(50, 100, 180, 0.6)" />
                <animate attributeName="y1" values="345;95" dur="${lt}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="y2" values="595;345" dur="${lt}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 330 470 L 330 345 L 330 345.01 L 330 220"
                  stroke="url(#flow-grad-9b)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>

            <!-- DHW to HP return - horizontal segment 2 (cold) - DHW mode only -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 330 220 L 255 220 L 255 220.01 L 180 220"
                  stroke="${g}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-9c" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(50, 100, 180, 0.6)" />
                <stop offset="40%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="50%" stop-color="rgba(110, 170, 255, 1.0)" />
                <stop offset="60%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="100%" stop-color="rgba(50, 100, 180, 0.6)" />
                <animate attributeName="x1" values="50%;-50%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="150%;50%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 330 220 L 255 220 L 255 220.01 L 180 220"
                  stroke="url(#flow-grad-9c)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>

            <!-- G2 to DHW - vertical segment (hot) - DHW mode only -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 348 195 L 348 282.5 L 348 282.51 L 348 370"
                  stroke="${u}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-7a" x1="348" y1="195" x2="348" y2="370" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="y1" values="107;282" dur="${lt}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="y2" values="282;457" dur="${lt}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 348 195 L 348 282.5 L 348 282.51 L 348 370"
                  stroke="url(#flow-grad-7a)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>

            <!-- G2 to DHW - horizontal segment (hot) - DHW mode only -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 348 370 L 383 370 L 383 370.01 L 418 370"
                  stroke="${u}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-7b" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="x1" values="-50%;50%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="50%;150%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 348 370 L 383 370 L 383 370.01 L 418 370"
                  stroke="url(#flow-grad-7b)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>

            <!-- DHW coil spiral (vertical hot) - DHW mode only -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 418 370 Q 438 378, 458 370 Q 438 390, 418 390 Q 438 406, 458 390 Q 438 422, 418 422 Q 438 438, 458 422 Q 438 454, 418 454 Q 438 470, 458 454 Q 438 478, 418 470"
                  stroke="${u}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-8" x1="438" y1="370" x2="438" y2="478" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="y1" values="316;424" dur="${lt}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="y2" values="424;532" dur="${lt}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 418 370 Q 438 378, 458 370 Q 438 390, 418 390 Q 438 406, 458 390 Q 438 422, 418 422 Q 438 438, 458 422 Q 438 454, 418 454 Q 438 470, 458 454 Q 438 478, 418 470"
                  stroke="url(#flow-grad-8)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></path>

            <!-- DHW Tank Inlet (street water) - horizontal cold -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 360 420 L 397.5 420 L 397.5 420.01 L 435 420"
                  stroke="${_}"
                  stroke-width="6"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${(o.tankInletFlow??0)>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-dhw-inlet" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(52, 152, 219, 0.6)" />
                <stop offset="40%" stop-color="rgba(72, 172, 239, 0.9)" />
                <stop offset="50%" stop-color="rgba(92, 192, 255, 1.0)" />
                <stop offset="60%" stop-color="rgba(72, 172, 239, 0.9)" />
                <stop offset="100%" stop-color="rgba(52, 152, 219, 0.6)" />
                <animate attributeName="x1" values="-50%;50%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="50%;150%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 360 420 L 397.5 420 L 397.5 420.01 L 435 420"
                  stroke="url(#flow-grad-dhw-inlet)"
                  stroke-width="6"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${(o.tankInletFlow??0)>this.config.animation.idle_threshold?"1":"0"}"></path>

            <!-- DHW Tank Outlet (hot water to house) - horizontal hot -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 470 380 L 510 380 L 510 380.01 L 550 380"
                  stroke="${w}"
                  stroke-width="6"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${(o.tankInletFlow??0)>this.config.animation.idle_threshold?"1":"0"}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-dhw-outlet" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="x1" values="-50%;50%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="50%;150%" dur="${lt}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 470 380 L 510 380 L 510 380.01 L 550 380"
                  stroke="url(#flow-grad-dhw-outlet)"
                  stroke-width="6"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${(o.tankInletFlow??0)>this.config.animation.idle_threshold?"1":"0"}"></path>

            <!-- Pipe corner elbows to hide animation seams - DHW mode only -->
            <!-- Corner at G2 to DHW (348, 370) - vertical to horizontal -->
            <rect x="341" y="363"
                  width="14" height="14"
                  fill="${this.config.temperature?.neutral_color||"#95a5a6"}"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></rect>

            <!-- Corner at DHW to HP return first turn (330, 470) - horizontal to vertical -->
            <rect x="323" y="463"
                  width="14" height="14"
                  fill="${this.config.temperature?.neutral_color||"#95a5a6"}"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></rect>

            <!-- Corner at DHW to HP return second turn (330, 220) - vertical to horizontal -->
            <rect x="323" y="213"
                  width="14" height="14"
                  fill="${this.config.temperature?.neutral_color||"#95a5a6"}"
                  opacity="${r.isActive&&t.flowRate>this.config.animation.idle_threshold?"1":"0"}"></rect>

            <!-- Heat Pump (left side) -->
            <g id="heat-pump" transform="translate(50, 100)" filter="url(#entity-shadow)">
              <!-- Heat pump body with state-based color -->
              <rect width="120" height="150" rx="10" fill="${this.getHeatPumpColor(t)}" fill-opacity="0.2" stroke="${this.getHeatPumpColor(t)}" stroke-width="3"/>

              <!-- Fan housing (moved down to make room for brand name) -->
              <circle cx="60" cy="51" r="30" fill="#34495e" stroke="${this.getHeatPumpColor(t)}" stroke-width="2"/>

              <!-- Fan blades (will be animated) -->
              <g id="fan-blades">
                <!-- 4 fan blades -->
                <path d="M 60 21 Q 70 41, 60 51 Q 50 41, 60 21" fill="#7f8c8d" opacity="0.8"/>
                <path d="M 90 51 Q 70 61, 60 51 Q 70 41, 90 51" fill="#7f8c8d" opacity="0.8"/>
                <path d="M 60 81 Q 50 61, 60 51 Q 70 61, 60 81" fill="#7f8c8d" opacity="0.8"/>
                <path d="M 30 51 Q 50 41, 60 51 Q 50 61, 30 51" fill="#7f8c8d" opacity="0.8"/>
                <!-- Center cap -->
                <circle cx="60" cy="51" r="8" fill="#2c3e50"/>
              </g>

              <!-- Brand name with logo (upper left corner) -->
              <!-- Background for logo/text (configurable to match logo background) -->
              <rect x="3" y="3" width="114" height="20" rx="4"
                    fill="${this.config.heat_pump?.logo_background_color||"transparent"}"
                    opacity="${this.config.heat_pump?.logo_background_color?"1":"0"}"/>
              <!-- Logo (16x16px favicon size) -->
              <image x="5" y="4" width="16" height="16"
                     href="${this.config.heat_pump?.logo_url||""}"
                     opacity="${this.config.heat_pump?.logo_url?"0.9":"0"}"/>
              <!-- Brand text (center-aligned vertically with logo) -->
              <text x="25" y="14" text-anchor="start"
                    fill="${this.config.heat_pump?.logo_text_color||this.getHeatPumpColor(t)}"
                    font-size="12"
                    font-weight="bold">
                ${this.config.heat_pump?.display_name||""}
              </text>

              <!-- Heat pump label -->
              <text x="60" y="96" text-anchor="middle" fill="${this.getHeatPumpColor(t)}" font-size="10" font-weight="bold">
                ${this.getDisplayMode(t,r)}
              </text>

              <!-- Error indicator -->
              ${t.error?U`
                <text x="60" y="111" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">
                  ⚠ ${t.error}
                </text>
              `:""}

              <!-- Temperature Setpoint Indicators (3 circles below mode text, styled like pipe temp sensors) -->
              ${(()=>{const e=this.getDisplayMode(t,r).toLowerCase(),i=e.includes("heat"),o=e.includes("dhw"),a=e.includes("cool"),n="off"===e||"defrost"===e,s=i||n?.95:.3,l=o||n?.95:.3,h=a||n?.95:.3,c=this.config.temperature_status?.circle_radius||12,d="#e74c3c",p="#e74c3c",f="#3498db";return G`
                  <g id="hp-setpoints" transform="translate(0, 115)">
                    <!-- Setpoints label above circles -->
                    <text x="60" y="-8" text-anchor="middle"
                          fill="${L}" font-size="5" opacity="0.5"
                          letter-spacing="0.5" font-family="Arial, sans-serif">
                      SETPOINTS
                    </text>

                    <!-- Heating Target Temperature (red circle, left position) -->
                    ${void 0!==t.heatingTargetTemp?G`
                      <circle cx="24" cy="8" r="${c}"
                              fill="white" stroke="${d}" stroke-width="2"
                              opacity="${s}"
                              filter="url(#circle-shadow)"/>
                      <text x="24" y="9" text-anchor="middle" dominant-baseline="middle"
                            fill="${d}" font-size="7.5" font-weight="bold"
                            letter-spacing="-0.5" font-family="Arial, sans-serif"
                            opacity="${s}">
                        ${this.formatValue(t.heatingTargetTemp,0)}°
                      </text>
                      <text x="24" y="27" text-anchor="middle"
                            fill="${L}" font-size="6" opacity="${.7*s}">
                        HEAT
                      </text>
                    `:""}

                    <!-- DHW Target Temperature (red circle, center position) -->
                    ${void 0!==t.dhwTargetTemp?G`
                      <circle cx="60" cy="8" r="${c}"
                              fill="white" stroke="${p}" stroke-width="2"
                              opacity="${l}"
                              filter="url(#circle-shadow)"/>
                      <text x="60" y="9" text-anchor="middle" dominant-baseline="middle"
                            fill="${p}" font-size="7.5" font-weight="bold"
                            letter-spacing="-0.5" font-family="Arial, sans-serif"
                            opacity="${l}">
                        ${this.formatValue(t.dhwTargetTemp,0)}°
                      </text>
                      <text x="60" y="27" text-anchor="middle"
                            fill="${L}" font-size="6" opacity="${.7*l}">
                        DHW
                      </text>
                    `:""}

                    <!-- Cooling Target Temperature (blue circle, right position) -->
                    ${void 0!==t.coolingTargetTemp?G`
                      <circle cx="96" cy="8" r="${c}"
                              fill="white" stroke="${f}" stroke-width="2"
                              opacity="${h}"
                              filter="url(#circle-shadow)"/>
                      <text x="96" y="9" text-anchor="middle" dominant-baseline="middle"
                            fill="${f}" font-size="7.5" font-weight="bold"
                            letter-spacing="-0.5" font-family="Arial, sans-serif"
                            opacity="${h}">
                        ${this.formatValue(t.coolingTargetTemp,0)}°
                      </text>
                      <text x="96" y="27" text-anchor="middle"
                            fill="${L}" font-size="6" opacity="${.7*h}">
                        COOL
                      </text>
                    `:""}
                  </g>
                `})()}
            </g>

            <!-- Detailed Metrics Panel (always shown, includes core metrics + optional detailed metrics) -->
            <!-- Position below the heat pump box (box is 150px tall, so start at y=255) -->
            <g id="hp-detailed-metrics" transform="translate(50, 255)">
                <!-- Divider line -->
                <line x1="8" y1="0" x2="112" y2="0" stroke="${E}" stroke-width="0.5" opacity="0.3"/>

                <!-- Core Metrics Row 1: Power In, Thermal Out, COP -->
                ${this.config.heat_pump?.power_entity?G`
                  <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.power_entity)}">
                    <text x="8" y="8" fill="${E}" font-size="7" opacity="0.7">IN</text>
                    <text x="8" y="15" fill="${E}" font-size="8" font-weight="bold">
                      ${this.formatValue(t.power/1e3,1)}kW
                    </text>
                  </g>
                `:""}

                ${this.config.heat_pump?.thermal_entity?G`
                  <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.thermal_entity)}">
                    <text x="42" y="8" fill="${E}" font-size="7" opacity="0.7">OUT</text>
                    <text x="42" y="15" fill="${E}" font-size="8" font-weight="bold">
                      ${this.formatValue(t.thermal/1e3,1)}kW
                    </text>
                  </g>
                `:""}

                ${this.config.heat_pump?.cop_entity?G`
                  <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.cop_entity)}">
                    <text x="76" y="8" fill="${E}" font-size="7" opacity="0.7">COP</text>
                    <text x="76" y="15" fill="${E}" font-size="8" font-weight="bold">
                      ${this.formatValue(t.cop,2)}
                    </text>
                  </g>
                `:""}

                <!-- Core Metrics Row 2: Flow Rate, Amps, Volts -->
                ${this.config.heat_pump?.flow_rate_entity?G`
                  <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.flow_rate_entity)}">
                    <text x="8" y="26" fill="${E}" font-size="7" opacity="0.7">Flow</text>
                    <text x="8" y="33" fill="${E}" font-size="8" font-weight="bold">
                      ${this.formatValue(t.flowRate,1)}${this.getStateUnit(this.config.heat_pump?.flow_rate_entity)||"L/m"}
                    </text>
                  </g>
                `:""}

                ${void 0!==t.amps&&this.config.heat_pump?.amps_entity?G`
                  <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.amps_entity)}">
                    <text x="42" y="26" fill="${E}" font-size="7" opacity="0.7">Amps</text>
                    <text x="42" y="33" fill="${E}" font-size="8" font-weight="bold">
                      ${this.formatValue(t.amps,1)}A
                    </text>
                  </g>
                `:""}

                ${void 0!==t.volts&&this.config.heat_pump?.volts_entity?G`
                  <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.volts_entity)}">
                    <text x="76" y="26" fill="${E}" font-size="7" opacity="0.7">Volts</text>
                    <text x="76" y="33" fill="${E}" font-size="8" font-weight="bold">
                      ${this.formatValue(t.volts,0)}V
                    </text>
                  </g>
                `:""}

                <!-- Optional Detailed Metrics (shown only if enabled) -->
                ${this.config.heat_pump?.show_detailed_metrics?G`
                  <!-- Divider line before detailed metrics -->
                  <line x1="8" y1="42" x2="112" y2="42" stroke="${E}" stroke-width="0.5" opacity="0.3"/>

                  <!-- Detailed Row 1: Compressor, Discharge, Ambient -->
                  ${void 0!==t.compressorFrequency&&this.config.heat_pump?.compressor_frequency_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.compressor_frequency_entity)}">
                      <text x="8" y="50" fill="${E}" font-size="7" opacity="0.7">Comp</text>
                      <text x="8" y="57" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.compressorFrequency,0)}Hz
                      </text>
                    </g>
                  `:""}

                  ${void 0!==t.dischargeTemp&&this.config.heat_pump?.discharge_temp_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.discharge_temp_entity)}">
                      <text x="42" y="50" fill="${E}" font-size="7" opacity="0.7">Disch</text>
                      <text x="42" y="57" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.dischargeTemp,0)}°
                      </text>
                    </g>
                  `:""}

                  ${void 0!==t.ambientTemp&&this.config.heat_pump?.ambient_temp_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.ambient_temp_entity)}">
                      <text x="76" y="50" fill="${E}" font-size="7" opacity="0.7">Amb</text>
                      <text x="76" y="57" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.ambientTemp,0)}°
                      </text>
                    </g>
                  `:""}

                  <!-- Detailed Row 2: DHW, Outdoor Coil, Suction -->
                  ${void 0!==t.dhwTemp&&this.config.heat_pump?.dhw_temp_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.dhw_temp_entity)}">
                      <text x="8" y="68" fill="${E}" font-size="7" opacity="0.7">DHW</text>
                      <text x="8" y="75" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.dhwTemp,0)}°
                      </text>
                    </g>
                  `:""}

                  ${void 0!==t.outdoorCoilTemp&&this.config.heat_pump?.outdoor_coil_temp_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.outdoor_coil_temp_entity)}">
                      <text x="42" y="68" fill="${E}" font-size="7" opacity="0.7">O-Coil</text>
                      <text x="42" y="75" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.outdoorCoilTemp,0)}°
                      </text>
                    </g>
                  `:""}

                  ${void 0!==t.suctionTemp&&this.config.heat_pump?.suction_temp_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.suction_temp_entity)}">
                      <text x="76" y="68" fill="${E}" font-size="7" opacity="0.7">Suct</text>
                      <text x="76" y="75" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.suctionTemp,0)}°
                      </text>
                    </g>
                  `:""}

                  <!-- Detailed Row 3: Heat Exchanger, Plate Exchange -->
                  ${void 0!==t.heatExchangerTemp&&this.config.heat_pump?.heat_exchanger_temp_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.heat_exchanger_temp_entity)}">
                      <text x="8" y="86" fill="${E}" font-size="7" opacity="0.7">HX</text>
                      <text x="8" y="93" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.heatExchangerTemp,0)}°
                      </text>
                    </g>
                  `:""}

                  ${void 0!==t.plateExchangeTemp&&this.config.heat_pump?.plate_exchange_temp_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.plate_exchange_temp_entity)}">
                      <text x="42" y="86" fill="${E}" font-size="7" opacity="0.7">Plate</text>
                      <text x="42" y="93" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.plateExchangeTemp,0)}°
                      </text>
                    </g>
                  `:""}

                  ${void 0!==t.ipmTemp&&this.config.heat_pump?.ipm_temp_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.ipm_temp_entity)}">
                      <text x="76" y="86" fill="${E}" font-size="7" opacity="0.7">IPM</text>
                      <text x="76" y="93" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.ipmTemp,0)}°
                      </text>
                    </g>
                  `:""}

                  <!-- Detailed Row 4: Fan Motors -->
                  ${void 0!==t.ecFanMotor1Speed&&this.config.heat_pump?.ec_fan_motor_1_speed_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.ec_fan_motor_1_speed_entity)}">
                      <text x="8" y="104" fill="${E}" font-size="7" opacity="0.7">Fan1</text>
                      <text x="8" y="111" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.ecFanMotor1Speed,0)}
                      </text>
                    </g>
                  `:""}

                  ${void 0!==t.ecFanMotor2Speed&&this.config.heat_pump?.ec_fan_motor_2_speed_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.ec_fan_motor_2_speed_entity)}">
                      <text x="42" y="104" fill="${E}" font-size="7" opacity="0.7">Fan2</text>
                      <text x="42" y="111" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.ecFanMotor2Speed,0)}
                      </text>
                    </g>
                  `:""}

                  ${void 0!==t.busLineVoltage&&this.config.heat_pump?.bus_line_voltage_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.bus_line_voltage_entity)}">
                      <text x="76" y="104" fill="${E}" font-size="7" opacity="0.7">Bus V</text>
                      <text x="76" y="111" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.busLineVoltage,0)}V
                      </text>
                    </g>
                  `:""}

                  <!-- Detailed Row 5: Additional metrics -->
                  ${void 0!==t.eHeaterPower&&this.config.heat_pump?.e_heater_power_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.e_heater_power_entity)}">
                      <text x="8" y="122" fill="${E}" font-size="7" opacity="0.7">E-Htr</text>
                      <text x="8" y="129" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.eHeaterPower,0)}W
                      </text>
                    </g>
                  `:""}

                  ${void 0!==t.compressorRunningTime&&this.config.heat_pump?.compressor_running_time_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.compressor_running_time_entity)}">
                      <text x="42" y="122" fill="${E}" font-size="7" opacity="0.7">Comp H</text>
                      <text x="42" y="129" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.compressorRunningTime,0)}h
                      </text>
                    </g>
                  `:""}

                  ${void 0!==t.compressorMaxPercentage&&this.config.heat_pump?.compressor_max_percentage_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.compressor_max_percentage_entity)}">
                      <text x="76" y="122" fill="${E}" font-size="7" opacity="0.7">MaxC%</text>
                      <text x="76" y="129" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.compressorMaxPercentage,0)}%
                      </text>
                    </g>
                  `:""}

                  <!-- Detailed Row 6: Status indicators -->
                  ${void 0!==t.pumpEnabled&&this.config.heat_pump?.pump_enabled_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.pump_enabled_entity)}">
                      <text x="8" y="140" fill="${E}" font-size="7" opacity="0.7">Pump</text>
                      <text x="8" y="147" fill="${E}" font-size="8" font-weight="bold">
                        ${t.pumpEnabled?"ON":"OFF"}
                      </text>
                    </g>
                  `:""}

                  ${void 0!==t.fanShutdownCode&&0!==t.fanShutdownCode&&this.config.heat_pump?.fan_shutdown_code_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.fan_shutdown_code_entity)}">
                      <text x="42" y="140" fill="${E}" font-size="7" opacity="0.7">F-Code</text>
                      <text x="42" y="147" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.fanShutdownCode,0)}
                      </text>
                    </g>
                  `:""}

                  ${void 0!==t.din6ModeSwitch&&this.config.heat_pump?.din6_mode_switch_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.din6_mode_switch_entity)}">
                      <text x="76" y="140" fill="${E}" font-size="7" opacity="0.7">DIN6</text>
                      <text x="76" y="147" fill="${E}" font-size="8" font-weight="bold">
                        ${this.formatValue(t.din6ModeSwitch,0)}
                      </text>
                    </g>
                  `:""}

                  <!-- Detailed Row 7: Defrost and Error Status -->
                  ${void 0!==t.defrost&&this.config.heat_pump?.defrost_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.defrost_entity)}">
                      <text x="8" y="158" fill="${E}" font-size="7" opacity="0.7">Defrost</text>
                      <text x="8" y="165" fill="${E}" font-size="8" font-weight="bold">
                        ${t.defrost?"ON":"OFF"}
                      </text>
                    </g>
                  `:""}

                  ${t.error&&this.config.heat_pump?.error_entity?G`
                    <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.heat_pump.error_entity)}">
                      <text x="42" y="158" fill="#e74c3c" font-size="7" opacity="0.7">Error</text>
                      <text x="42" y="165" fill="#e74c3c" font-size="8" font-weight="bold">
                        ${t.error}
                      </text>
                    </g>
                  `:""}
                `:""}

                <!-- Custom Metrics Section -->
                ${this.config.metrics&&this.config.metrics.length>0?(()=>{const t=this.config.heat_pump?.show_detailed_metrics?176:44,e=this.config.heat_pump?.show_detailed_metrics?168:36,i=[];for(let t=0;t<this.config.metrics.length;t+=3)i.push(this.config.metrics.slice(t,t+3));return G`
                    <!-- Divider line before custom metrics -->
                    <line x1="8" y1="${e}" x2="112" y2="${e}" stroke="${E}" stroke-width="0.5" opacity="0.3"/>

                    ${i.map((e,i)=>{const o=t+18*i,a=o+7,r=[8,42,76];return G`
                        ${e.map((t,e)=>{const i=this.getStateValue(t.entity);if(void 0===i)return"";const n=r[e],s=void 0!==t.decimals?t.decimals:1,l=t.unit||this.getStateUnit(t.entity)||"";return G`
                            <g style="cursor: pointer;" @click="${e=>this.handleTemperatureClick(e,t.entity)}">
                              <text x="${n}" y="${o}" fill="${E}" font-size="7" opacity="0.7">${t.label}</text>
                              <text x="${n}" y="${a}" fill="${E}" font-size="8" font-weight="bold">
                                ${this.formatValue(i,s)}${l}
                              </text>
                            </g>
                          `})}
                      `})}
                  `})():""}
              </g>

            <!-- Heat Pump Metrics (legacy - now moved inside HP box, keeping for optional extra data) -->
            <g id="hp-metrics-external" transform="translate(50, 265)" opacity="0">
              <!-- Metrics display in compact 2-column layout -->
              <!-- Left column -->
              <text x="0" y="0" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels.power_in}:</text>
              <text x="0" y="16" fill="#3498db" font-size="12">${this.formatValue(t.power,0)} W</text>

              <text x="0" y="36" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels.thermal_out}:</text>
              <text x="0" y="52" fill="#e74c3c" font-size="12">${this.formatValue(t.thermal,0)} W</text>

              <text x="0" y="72" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels.cop}:</text>
              <text x="0" y="88" fill="#f1c40f" font-size="12">${this.formatValue(t.cop,2)}</text>

              <text x="0" y="108" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels.flow}:</text>
              <text x="0" y="124" fill="#9b59b6" font-size="12">${this.formatValue(t.flowRate,1)} ${this.getStateUnit(this.config.heat_pump?.flow_rate_entity)||"L/min"}</text>

              <!-- Right column -->
              ${void 0!==t.energy?U`
                <text x="80" y="0" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels.energy}:</text>
                <text x="80" y="16" fill="#16a085" font-size="12">${this.formatValue(t.energy,2)} kWh</text>
              `:""}

              ${void 0!==t.cost?U`
                <text x="80" y="36" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels.cost}:</text>
                <text x="80" y="52" fill="#27ae60" font-size="12">$${this.formatValue(t.cost,2)}</text>
              `:""}
            </g>

            <!-- DHW Heating Diverter Valve (3-way valve between HP and tanks) -->
            <g id="g2-valve" transform="translate(360, 180) scale(0.7)"
               style="${this.config.g2_valve?.state_entity?"cursor: pointer;":""}"
               @click="${this.config.g2_valve?.state_entity?t=>this.handleTemperatureClick(t,this.config.g2_valve.state_entity):null}">
              <!-- Valve body - cylindrical with flanges (matching valve idea graphic) -->
              <!-- Left inlet flange -->
              <rect x="-45" y="-8" width="10" height="16" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Main body cylinder -->
              <rect x="-35" y="-12" width="35" height="24" fill="#bdc3c7" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Right outlet flange (to buffer/heating) -->
              <rect x="0" y="-8" width="10" height="16" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Bottom outlet flange (to DHW) - adjusted for better alignment -->
              <rect x="-25" y="12" width="16" height="10" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>

              <!-- 3-Way Valve Symbol (hydronic standard: triangles at flanges with connecting lines) -->
              <g id="valve-symbol" opacity="0.8">
                <!-- Left port: line and larger centered triangle at flange (from HP inlet) - always active when flow -->
                <line x1="-17" y1="0" x2="-36" y2="0"
                      stroke="${f?h:"#7f8c8d"}"
                      stroke-width="2"/>
                <path d="M -44 0 L -36 -6 L -36 6 Z"
                      fill="${f?h:"#7f8c8d"}"
                      stroke="${f?h:"#7f8c8d"}"
                      stroke-width="0.5"/>

                <!-- Right port: line and larger centered triangle at flange (to buffer/heating) -->
                <line x1="-17" y1="0" x2="1" y2="0"
                      stroke="${f?r.isActive?"#7f8c8d":h:"#7f8c8d"}"
                      stroke-width="2"/>
                <path d="M 9 0 L 1 -6 L 1 6 Z"
                      fill="${f?r.isActive?"#7f8c8d":h:"#7f8c8d"}"
                      stroke="${f?r.isActive?"#7f8c8d":h:"#7f8c8d"}"
                      stroke-width="0.5"/>

                <!-- Bottom port: line and larger centered triangle at flange (to DHW) -->
                <line x1="-17" y1="0" x2="-17" y2="13"
                      stroke="${f&&r.isActive?h:"#7f8c8d"}"
                      stroke-width="2"/>
                <path d="M -17 21 L -23 13 L -11 13 Z"
                      fill="${f&&r.isActive?h:"#7f8c8d"}"
                      stroke="${f&&r.isActive?h:"#7f8c8d"}"
                      stroke-width="0.5"/>

                <!-- Center circle (ball/switching mechanism) - bigger and flow-colored, drawn last to cover line ends -->
                <circle cx="-17" cy="0" r="5"
                        fill="${f?h:"#7f8c8d"}"/>
              </g>

              <!-- Internal flow path visualization with animations -->
              ${r.isActive?U`
                <!-- DHW Mode: Flow DOWN (from left inlet to bottom outlet) -->
                <!-- Active path matching hot flow color -->
                <path class="g2-valve-path g2-valve-active-path"
                      d="M -35 0 L -17 0 L -17 12"
                      stroke="${h}"
                      stroke-width="6"
                      fill="none"
                      stroke-linecap="butt"
                      stroke-linejoin="round"/>
                <!-- Inactive path (to right) shown as X with transition -->
                <path class="g2-valve-path"
                      d="M -17 -8 L 0 8 M -17 8 L 0 -8"
                      stroke="#7f8c8d"
                      stroke-width="2"
                      opacity="0.4"/>
              `:U`
                <!-- Heating Mode: Flow ACROSS (from left inlet to right outlet) -->
                <!-- Active path matching hot flow color -->
                <path class="g2-valve-path g2-valve-active-path"
                      d="M -35 0 L 0 0"
                      stroke="${h}"
                      stroke-width="6"
                      fill="none"
                      stroke-linecap="butt"/>
                <!-- Inactive path (to bottom) shown as X with transition -->
                <path class="g2-valve-path"
                      d="M -25 4 L -9 20 M -9 4 L -25 20"
                      stroke="#7f8c8d"
                      stroke-width="2"
                      opacity="0.4"/>
              `}

              <!-- Valve label -->
              <text x="-17" y="-20" text-anchor="middle" fill="#2c3e50" font-size="10" font-weight="bold">
                DHW Valve
              </text>
            </g>

            <!-- Improved Buffer Tank (center) -->
            <g id="buffer-tank" transform="translate(390, 100)" filter="url(#entity-shadow)">
              <!-- Tank cylinder body - reduced from 160 to 140 height -->
              <rect x="10" y="20" width="70" height="140" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap - reduced from rx=40 to rx=35 -->
              <ellipse cx="45" cy="20" rx="35" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="45" cy="160" rx="35" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              ${v.length>0?this.renderGradientRects(v):U`
                <!-- Thermal stratification (fallback - 4 zones) -->
                <rect x="15" y="25" width="60" height="30" fill="${d}" opacity="0.9"/>
                <rect x="15" y="55" width="60" height="35" fill="${d}" opacity="0.7"/>
                <rect x="15" y="90" width="60" height="35" fill="${p}" opacity="0.7"/>
                <rect x="15" y="125" width="60" height="30" fill="${p}" opacity="0.9"/>

                <!-- Structural bands (fallback only) -->
                <line x1="10" y1="55" x2="80" y2="55" stroke="#2c3e50" stroke-width="2"/>
                <line x1="10" y1="90" x2="80" y2="90" stroke="#2c3e50" stroke-width="2"/>
                <line x1="10" y1="125" x2="80" y2="125" stroke="#2c3e50" stroke-width="2"/>
              `}

              <!-- Tank label centered in top cap -->
              <text x="45" y="20" text-anchor="middle" dominant-baseline="middle"
                    fill="${this.config.buffer_tank?.label_color||"white"}"
                    font-size="${this.config.buffer_tank?.label_font_size||12}"
                    font-weight="bold">
                ${this.config.buffer_tank?.name||"BUFFER"}
              </text>

              <!-- Brand logo centered above tank -->
              ${this.config.buffer_tank?.logo_url?G`
                <image
                  x="${35}"
                  y="-25"
                  width="20"
                  height="20"
                  href="${this.config.buffer_tank.logo_url}"
                  opacity="0.9"
                  preserveAspectRatio="xMidYMid meet" />
              `:""}

              <!-- Fill percentage display (always shown) -->
              ${void 0!==e.energyReserve?G`
                <!-- Percentage on left, energy reserve on right -->
                <text x="20" y="173" text-anchor="start" fill="${x?"#e74c3c":"#3498db"}" font-size="11" font-weight="bold">
                  ${S}%
                </text>
                <text x="70" y="173" text-anchor="end" fill="${x?"#e74c3c":"#3498db"}" font-size="10" font-weight="bold"
                      style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.buffer_tank.energy_reserve_entity)}">
                  ${this.formatValue(e.energyReserve,1)} kWh
                </text>
              `:G`
                <!-- Just percentage, centered -->
                <text x="45" y="173" text-anchor="middle" fill="${x?"#e74c3c":"#3498db"}" font-size="11" font-weight="bold">
                  ${S}%
                </text>
              `}

              <!-- Tank temperature indicator (optional, centered in tank) -->
              ${this.renderTankTempIndicator(45,90,e.tankTemp,this.config.buffer_tank?.tank_temp_entity,this.config.buffer_tank?.show_temp_indicator,this.config.buffer_tank?.temp_indicator_radius,x?"#e74c3c":"#3498db")}
            </g>

            <!-- DHW (Domestic Hot Water) Tank with Coil (center-bottom) -->
            <g id="dhw-tank" transform="translate(390, 330)" filter="url(#entity-shadow)">
              <!-- Tank cylinder body - reduced from 160 to 140 height -->
              <rect x="10" y="20" width="70" height="140" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap - reduced from rx=40 to rx=35 -->
              <ellipse cx="45" cy="20" rx="35" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="45" cy="160" rx="35" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              ${C.length>0?this.renderGradientRects(C):U`
                <!-- Inner cylinder (DHW water - fallback to simple blue) -->
                <rect x="15" y="25" width="60" height="130" fill="#3498db" opacity="0.3"/>
              `}

              <!-- Heating coil inside tank (spiral) - complete path from inlet to outlet -->
              <!-- Outer glow layer - pulsing when active -->
              <path d="M 28 40 Q 45 48, 62 40 Q 45 60, 28 60 Q 45 76, 62 60 Q 45 92, 28 92 Q 45 108, 62 92 Q 45 124, 28 124 Q 45 132, 62 124 Q 45 140, 28 140"
                    stroke="${u}"
                    stroke-width="10"
                    fill="none"
                    class="${r.isActive?"dhw-coil-glow-outer":"dhw-coil-glow-layer"}"
                    pointer-events="none"/>
              <!-- Inner glow layer - pulsing when active -->
              <path d="M 28 40 Q 45 48, 62 40 Q 45 60, 28 60 Q 45 76, 62 60 Q 45 92, 28 92 Q 45 108, 62 92 Q 45 124, 28 124 Q 45 132, 62 124 Q 45 140, 28 140"
                    stroke="${u}"
                    stroke-width="7"
                    fill="none"
                    class="${r.isActive?"dhw-coil-glow-inner":"dhw-coil-glow-layer"}"
                    pointer-events="none"/>
              <!-- Main coil path -->
              <path d="M 28 40 Q 45 48, 62 40 Q 45 60, 28 60 Q 45 76, 62 60 Q 45 92, 28 92 Q 45 108, 62 92 Q 45 124, 28 124 Q 45 132, 62 124 Q 45 140, 28 140"
                    stroke="${r.isActive?u:this.config.temperature?.neutral_color||"#95a5a6"}"
                    stroke-width="4"
                    fill="none"
                    opacity="${r.isActive?"0.9":"0.3"}"/>

              <!-- Coil inlet/outlet markers - 100px vertical span -->
              <circle cx="28" cy="40" r="3" fill="${r.isActive?u:this.config.temperature?.neutral_color||"#95a5a6"}"/>
              <circle cx="28" cy="140" r="3" fill="${r.isActive?u:this.config.temperature?.neutral_color||"#95a5a6"}"/>

              <!-- Structural bands -->
              <line x1="10" y1="55" x2="80" y2="55" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="90" x2="80" y2="90" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="125" x2="80" y2="125" stroke="#2c3e50" stroke-width="2"/>

              <!-- Tank label centered in top cap -->
              <text x="45" y="20" text-anchor="middle" dominant-baseline="middle"
                    fill="${this.config.dhw_tank?.label_color||"white"}"
                    font-size="${this.config.dhw_tank?.label_font_size||12}"
                    font-weight="bold">
                ${this.config.dhw_tank?.name||"DHW"}
              </text>

              <!-- Brand logo centered above tank -->
              ${this.config.dhw_tank?.logo_url?G`
                <image
                  x="${35}"
                  y="-25"
                  width="20"
                  height="20"
                  href="${this.config.dhw_tank.logo_url}"
                  opacity="0.9"
                  preserveAspectRatio="xMidYMid meet" />
              `:""}

              <!-- Fill percentage display (always shown) -->
              <text x="45" y="173" text-anchor="middle" fill="#e74c3c" font-size="11" font-weight="bold">
                ${H}%
              </text>

              <!-- Tank temperature indicator (optional, centered in tank) -->
              ${this.renderTankTempIndicator(45,90,o.tankTemp,this.config.dhw_tank?.tank_temp_entity,this.config.dhw_tank?.show_temp_indicator,this.config.dhw_tank?.temp_indicator_radius,"#e74c3c")}
            </g>

            <!-- DHW Tank 2 (Secondary/Finishing Heater) - Optional -->
            ${a.enabled?G`
            <g id="dhw-tank-2" transform="translate(550, 330)" filter="url(#entity-shadow)">
              <!-- Tank cylinder body -->
              <rect x="10" y="20" width="70" height="140" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap -->
              <ellipse cx="45" cy="20" rx="35" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="45" cy="160" rx="35" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              ${P.length>0?this.renderGradientRects(P):G`
                <!-- Inner cylinder (DHW water - fallback to simple red) -->
                <rect x="15" y="25" width="60" height="130" fill="#e74c3c" opacity="0.3"/>
              `}

              <!-- Structural bands -->
              <line x1="10" y1="55" x2="80" y2="55" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="90" x2="80" y2="90" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="125" x2="80" y2="125" stroke="#2c3e50" stroke-width="2"/>

              <!-- Tank label centered in top cap -->
              <text x="45" y="20" text-anchor="middle" dominant-baseline="middle"
                    fill="${this.config.dhw_tank_2?.label_color||"white"}"
                    font-size="${this.config.dhw_tank_2?.label_font_size||12}"
                    font-weight="bold">
                ${this.config.dhw_tank_2?.name||"DHW 2"}
              </text>

              <!-- Brand logo centered above tank -->
              ${this.config.dhw_tank_2?.logo_url?G`
                <image
                  x="${35}"
                  y="-25"
                  width="20"
                  height="20"
                  href="${this.config.dhw_tank_2.logo_url}"
                  opacity="0.9"
                  preserveAspectRatio="xMidYMid meet" />
              `:""}

              <!-- Fill percentage display (always shown) -->
              <text x="45" y="173" text-anchor="middle" fill="#e74c3c" font-size="11" font-weight="bold">
                ${M}%
              </text>

              <!-- Tank temperature indicator (optional, centered in tank) -->
              ${this.renderTankTempIndicator(45,90,a.tankTemp,this.config.dhw_tank_2?.tank_temp_entity,this.config.dhw_tank_2?.show_temp_indicator,this.config.dhw_tank_2?.temp_indicator_radius,"#e74c3c")}
            </g>
            `:""}

            <!-- HVAC Load (right side) -->
            <g id="hvac-load" transform="translate(630, 150)" filter="url(#entity-shadow)">
              <!-- Logo centered above HVAC box -->
              ${this.config.hvac?.logo_url?G`
                <image
                  x="${50}"
                  y="-25"
                  width="20"
                  height="20"
                  href="${this.config.hvac.logo_url}"
                  opacity="0.9"
                  preserveAspectRatio="xMidYMid meet" />
              `:""}

              <rect width="120" height="100" rx="10" fill="#2c3e50" stroke="#34495e" stroke-width="2"/>
              <text x="60" y="30" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                HVAC LOAD
              </text>
              ${this.config.hvac?.thermal_entity?G`
                <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.hvac.thermal_entity)}">
                  <text x="60" y="55" text-anchor="middle" fill="#e74c3c" font-size="20" font-weight="bold">
                    ${this.formatValue(i.thermal,0)} W
                  </text>
                </g>
              `:G`
                <text x="60" y="55" text-anchor="middle" fill="#e74c3c" font-size="20" font-weight="bold">
                  ${this.formatValue(i.thermal,0)} W
                </text>
              `}
              <!-- Flow rate display at bottom -->
              ${this.config.hvac?.flow_rate_entity?G`
                <g style="cursor: pointer;" @click="${t=>this.handleTemperatureClick(t,this.config.hvac.flow_rate_entity)}">
                  <text x="60" y="85" text-anchor="middle" fill="white" font-size="10">
                    ${this.formatValue(i.flowRate,1)} ${this.getStateUnit(this.config.hvac?.flow_rate_entity)||"L/m"}
                  </text>
                </g>
              `:G`
                <text x="60" y="85" text-anchor="middle" fill="white" font-size="10">
                  ${this.formatValue(i.flowRate,1)} ${this.getStateUnit(this.config.hvac?.flow_rate_entity)||"L/m"}
                </text>
              `}
            </g>

            <!-- Auxiliary Heater - Glowing cylinder with animated pulsing glow -->
            <!-- Centered between HP outlet (180) and G2 inlet (328) = 254 -->
            <!-- Glow size configurable via aux_heater.glow_size (default: 8px) -->
            <!-- Animation speed increases with power level for visual feedback -->
            <!-- Shadow blur configurable via aux_heater.shadow_blur (default: 1.0) -->
            <g id="aux-heater"
               opacity="${n.enabled?"1":"0"}"
               style="--aux-anim-speed: ${st}s; --aux-shadow-blur: ${ht};">
              <!-- Glow layers - simple solid colors with CSS pulsing animation -->
              <!-- Outermost glow layer - size based on config -->
              ${G`<rect x="${N}" y="${I}"
                    width="${Q}" height="${B}"
                    rx="${j}" ry="${q}"
                    class="${ct}"
                    fill="#ff4422"
                    pointer-events="none"></rect>`}

              <!-- Middle glow layer - size based on config -->
              ${G`<rect x="${Z}" y="${Y}"
                    width="${J}" height="${X}"
                    rx="${K}" ry="${tt}"
                    class="${dt}"
                    fill="#ff6644"
                    pointer-events="none"></rect>`}

              <!-- Inner glow layer - size based on config -->
              ${G`<rect x="${et}" y="${it}"
                    width="${ot}" height="${at}"
                    rx="${rt}" ry="${nt}"
                    class="${pt}"
                    fill="#ff8855"
                    pointer-events="none"></rect>`}

              <!-- Main heated cylinder body (centered at x=254) -->
              ${G`<rect x="${O}" y="${F}" width="${W}" height="${16}" rx="2" ry="2"
                    class="${ft}"
                    fill="${R}"
                    stroke="#7f8c8d"
                    stroke-width="1.5"></rect>`}

              <!-- Left flange (pipe connection) -->
              ${G`<rect x="${218}" y="${174}" width="6" height="12"
                    fill="#95a5a6"
                    stroke="#7f8c8d"
                    stroke-width="1.5"></rect>`}

              <!-- Right flange (pipe connection) -->
              ${G`<rect x="${284}" y="${174}" width="6" height="12"
                    fill="#95a5a6"
                    stroke="#7f8c8d"
                    stroke-width="1.5"></rect>`}

              <!-- Label and logo (inside the heater cylinder) -->
              <!-- Brand logo (if configured) - left-aligned within cylinder, vertically centered -->
              ${this.config.aux_heater?.logo_url?G`<image x="${227}"
                       y="${175}"
                       width="10"
                       height="10"
                       href="${this.config.aux_heater.logo_url}"
                       opacity="0.9"></image>`:""}

              <!-- Label text (if show_label is not false and displayName exists) - horizontally centered in cylinder, vertically centered -->
              ${!1!==this.config.aux_heater?.show_label&&n.displayName?G`<text x="${254}"
                      y="${180}"
                      text-anchor="middle"
                      dominant-baseline="middle"
                      fill="${this.config.aux_heater?.label_color||"#2c3e50"}"
                      font-size="9"
                      font-weight="bold">${n.displayName}</text>`:""}
            </g>

            <!-- Version display (upper right corner) -->
            <text x="790" y="15" text-anchor="end" fill="#95a5a6" font-size="10" opacity="0.7">
              v${ut}
            </text>

            <!-- Temperature Status Indicators - Rendered last to appear on top -->
            <!-- HP outlet (on supply pipe at y=180) -->
            ${this.renderTemperatureIndicator(185,180,this.config.temperature_status?.points?.hp_outlet?.entity||this.config.heat_pump?.outlet_temp_entity,t.outletTemp,this.config.temperature_status?.points?.hp_outlet,h)}

            <!-- HP inlet (on return pipe at y=220) -->
            ${this.renderTemperatureIndicator(185,220,this.config.temperature_status?.points?.hp_inlet?.entity||this.config.heat_pump?.inlet_temp_entity,t.inletTemp,this.config.temperature_status?.points?.hp_inlet,c)}

            <!-- Buffer supply (on supply pipe at y=180, outside buffer tank) -->
            ${this.renderTemperatureIndicator(385,180,this.config.temperature_status?.points?.buffer_supply?.entity||this.config.buffer_tank?.supply_temp_entity,e.supplyTemp,this.config.temperature_status?.points?.buffer_supply,d)}

            <!-- HVAC supply (on supply pipe at y=180, near HVAC load) -->
            ${this.renderTemperatureIndicator(615,180,this.config.temperature_status?.points?.hvac_supply?.entity||this.config.hvac?.supply_temp_entity,i.supplyTemp,this.config.temperature_status?.points?.hvac_supply,d)}

            <!-- Buffer return (on return pipe at y=220, outside buffer tank) -->
            ${this.renderTemperatureIndicator(385,220,this.config.temperature_status?.points?.buffer_return?.entity||this.config.buffer_tank?.return_temp_entity,e.returnTemp,this.config.temperature_status?.points?.buffer_return,p)}

            <!-- HVAC return (on return pipe at y=220, near HVAC load) -->
            ${this.renderTemperatureIndicator(615,220,this.config.temperature_status?.points?.hvac_return?.entity||this.config.hvac?.return_temp_entity,i.returnTemp,this.config.temperature_status?.points?.hvac_return,p)}

            <!-- DHW Tank Inlet (on pipe outside tank) -->
            ${this.renderTemperatureIndicator(385,370,this.config.temperature_status?.points?.dhw_inlet?.entity||this.config.dhw_tank?.inlet_temp_entity,o.inletTemp,this.config.temperature_status?.points?.dhw_inlet,m)}

            <!-- DHW Tank Outlet (on pipe outside tank) -->
            ${this.renderTemperatureIndicator(385,470,this.config.temperature_status?.points?.dhw_outlet?.entity||this.config.dhw_tank?.outlet_temp_entity,o.outletTemp,this.config.temperature_status?.points?.dhw_outlet,y)}

            <!-- DHW Tank Street Water Inlet (cold water supply) -->
            ${this.renderTemperatureIndicator(370,420,this.config.temperature_status?.points?.dhw_tank_inlet?.entity||this.config.dhw_tank?.tank_inlet_temp_entity,o.tankInletTemp??0,this.config.temperature_status?.points?.dhw_tank_inlet,_)}

            <!-- DHW Tank Hot Water Outlet (to house or to tank 2) -->
            ${this.renderTemperatureIndicator(510,380,this.config.temperature_status?.points?.dhw_tank_outlet?.entity||this.config.dhw_tank?.tank_outlet_temp_entity,o.tankOutletTemp??0,this.config.temperature_status?.points?.dhw_tank_outlet,w)}

            <!-- DHW Tank 2 Temperature Indicator (only when tank 2 is enabled) -->
            <!-- DHW Tank 2 Outlet (to house) -->
            ${a.enabled?this.renderTemperatureIndicator(670,380,this.config.temperature_status?.points?.dhw_tank_2_outlet?.entity||this.config.dhw_tank_2?.outlet_temp_entity,a.outletTemp,this.config.temperature_status?.points?.dhw_tank_2_outlet,$):""}
          </svg>
        </div>
      </ha-card>
    `}static get styles(){return mt}getCardSize(){return 5}},e([pt({attribute:!1})],t.HeatPumpFlowCard.prototype,"hass",void 0),e([function(t){return pt({...t,state:!0,attribute:!1})}()],t.HeatPumpFlowCard.prototype,"config",void 0),e([ft("#hp-to-buffer-flow")],t.HeatPumpFlowCard.prototype,"hpToBufferFlow",void 0),e([ft("#buffer-to-hp-flow")],t.HeatPumpFlowCard.prototype,"bufferToHpFlow",void 0),e([ft("#buffer-to-hvac-flow")],t.HeatPumpFlowCard.prototype,"bufferToHvacFlow",void 0),e([ft("#hvac-to-buffer-flow")],t.HeatPumpFlowCard.prototype,"hvacToBufferFlow",void 0),t.HeatPumpFlowCard=e([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("heat-pump-flow-card")],t.HeatPumpFlowCard),window.customCards=window.customCards||[],window.customCards.push({type:"heat-pump-flow-card",name:"Heat Pump Flow Card",description:"Animated heat pump flow visualization card",preview:!0,documentationURL:"https://github.com/YOUR_USERNAME/heat-pump-flow-card"}),window.findHeatPumpCard=function(t=document){const e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);let i;for(;i=e.nextNode();){if("HEAT-PUMP-FLOW-CARD"===i.tagName)return i;if(i.shadowRoot){const t=window.findHeatPumpCard(i.shadowRoot);if(t)return t}}return null},t}({});
//# sourceMappingURL=heat-pump-flow-card.js.map
