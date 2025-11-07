var HeatPumpFlowCard=function(t){"use strict";function e(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n}"function"==typeof SuppressedError&&SuppressedError;const o=globalThis,i=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&r.set(e,t))}return t}toString(){return this.cssText}};const a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:p,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,f=globalThis,m=f.trustedTypes,g=m?m.emptyScript:"",y=f.reactiveElementPolyfillSupport,w=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},$=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:s}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);s?.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(i)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),s=o.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const s=(void 0!==o.converter?.toAttribute?o.converter:_).toAttribute(e,o.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=i;const r=s.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,o){if(void 0!==t){const i=this.constructor,s=this[t];if(o??=i.getPropertyOptions(t),!((o.hasChanged??$)(s,e)||o.useDefault&&o.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:s},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[w("elementProperties")]=new Map,v[w("finalized")]=new Map,y?.({ReactiveElement:v}),(f.reactiveElementVersions??=[]).push("2.1.1");const x=globalThis,A=x.trustedTypes,T=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+P,C=`<${k}>`,H=document,E=()=>H.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,O="[ \t\n\f\r]",V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,D=/>/g,U=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,z=/"/g,N=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),W=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),Q=new WeakMap,j=H.createTreeWalker(H,129);function G(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(e):e}const q=(t,e)=>{const o=t.length-1,i=[];let s,r=2===e?"<svg>":3===e?"<math>":"",n=V;for(let e=0;e<o;e++){const o=t[e];let a,l,h=-1,p=0;for(;p<o.length&&(n.lastIndex=p,l=n.exec(o),null!==l);)p=n.lastIndex,n===V?"!--"===l[1]?n=F:void 0!==l[1]?n=D:void 0!==l[2]?(N.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=U):void 0!==l[3]&&(n=U):n===U?">"===l[0]?(n=s??V,h=-1):void 0===l[1]?h=-2:(h=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?U:'"'===l[3]?z:L):n===z||n===L?n=U:n===F||n===D?n=V:(n=U,s=void 0);const c=n===U&&t[e+1].startsWith("/>")?" ":"";r+=n===V?o+C:h>=0?(i.push(a),o.slice(0,h)+S+o.slice(h)+P+c):o+P+(-2===h?e:c)}return[G(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[l,h]=q(t,e);if(this.el=J.createElement(l,o),j.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=j.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=h[r++],o=i.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:o,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?ot:Z}),i.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:s}),i.removeAttribute(t));if(N.test(i.tagName)){const t=i.textContent.split(P),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],E()),j.nextNode(),a.push({type:2,index:++s});i.append(t[e],E())}}}else if(8===i.nodeType)if(i.data===k)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(P,t+1));)a.push({type:7,index:s}),t+=P.length-1}s++}}static createElement(t,e){const o=H.createElement("template");return o.innerHTML=t,o}}function K(t,e,o=t,i){if(e===W)return e;let s=void 0!==i?o._$Co?.[i]:o._$Cl;const r=R(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=s:o._$Cl=s),void 0!==s&&(e=K(t,s._$AS(t,e.values),s,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??H).importNode(e,!0);j.currentNode=i;let s=j.nextNode(),r=0,n=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Y(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new it(s,this,t)),this._$AV.push(e),a=o[++n]}r!==a?.index&&(s=j.nextNode(),r++)}return j.currentNode=H,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),R(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=J.createElement(G(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new J(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const s of t)i===e.length?e.push(o=new Y(this.O(E()),this.O(E()),this,this.options)):o=e[i],o._$AI(s),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,s){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=B}_$AI(t,e=this,o,i){const s=this.strings;let r=!1;if(void 0===s)t=K(this,t,e,0),r=!R(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const i=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=K(this,i[o+n],e,n),a===W&&(a=this._$AH[n]),r||=!R(a)||a!==this._$AH[n],a===B?t=B:t!==B&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends Z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class ot extends Z{constructor(t,e,o,i,s){super(t,e,o,i,s),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??B)===W)return;const o=this._$AH,i=t===B&&o!==B||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==B&&(o===B||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const st=x.litHtmlPolyfillSupport;st?.(J,Y),(x.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;class nt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=o?.renderBefore??null;i._$litPart$=s=new Y(e.insertBefore(E(),t),t,void 0,o??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.1");const lt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:$},ht=(t=lt,e,o)=>{const{kind:i,metadata:s}=o;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const s=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,s,t)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const s=this[i];e.call(this,o),this.requestUpdate(i,s,t)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,o)=>"object"==typeof o?ht(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function ct(t,e){return(e,o,i)=>((t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,o),o))(e,o,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const dt="0.19.0",ut=(new Date).toISOString(),ft=((t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new n(o,t,s)})`
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

  /* CSS-based flow dot animations (hardware-accelerated) */
  .flow-dot {
    offset-path: var(--dot-path);
    offset-rotate: 0deg;
    animation: flow-along-path linear infinite;
    animation-duration: var(--dot-duration, 5s);
    animation-delay: var(--dot-delay, 0s);
    opacity: var(--dot-opacity, 1);
    filter: drop-shadow(0 0 4px currentColor);
  }

  @keyframes flow-along-path {
    from {
      offset-distance: 0%;
    }
    to {
      offset-distance: 100%;
    }
  }

  /* Fan rotation animation */
  .fan-rotating {
    transform-origin: 60px 40px;
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

  /* Pipe styling */
  path {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  /* Component boxes */
  rect {
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  }

  ellipse {
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  }
`;return console.info(`%c  HEAT-PUMP-FLOW-CARD  \n%c  Version ${dt}  \n%c  Built: ${ut}  `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray","color: #95a5a6; font-weight: normal; background: dimgray"),t.HeatPumpFlowCard=class extends nt{constructor(){super(...arguments),this.lastRenderTime=0,this.lastHassState={},this.lastG2State=null,this.lastHpMode=null,this.initialLogDone=!1}static getConfigElement(){}static getStubConfig(){return{type:"custom:heat-pump-flow-card",title:"Heat Pump Flow"}}setConfig(t){if(!t)throw new Error("Invalid configuration");const{animation:e,temperature:o,display:i,heat_pump_visual:s,labels:r,...n}=t;this.config={...n,animation:{enabled:!0,min_flow_rate:5,max_flow_rate:1,max_flow_rate_value:50,dot_size:8,dot_spacing:30,use_temp_color:!0,dot_color:"#3498db",dot_stroke_color:"white",dot_stroke_width:1.5,dot_opacity:1,dot_shadow:!0,...e},temperature:{delta_threshold:10,hot_color:"#e74c3c",cold_color:"#3498db",neutral_color:"#95a5a6",unit:"C",...o},display:{show_values:!0,show_labels:!0,show_icons:!0,compact:!1,decimal_places:1,...i},heat_pump_visual:{off_color:"#95a5a6",heating_color:"#e74c3c",cooling_color:"#3498db",dhw_color:"#e67e22",defrost_color:"#f1c40f",show_metrics:!0,animate_fan:!0,...s},labels:{hp_supply:"HP Supply",hp_return:"HP Return",hvac_supply:"HVAC Supply",hvac_return:"HVAC Return",buffer_tank:"BUFFER",dhw_tank:"DHW",power_in:"Power In",thermal_out:"Thermal Out",cop:"COP",flow:"Flow",energy:"Energy",cost:"Cost",...r}}}shouldUpdate(t){if(t.has("config"))return!0;if(t.has("hass")){const t=Date.now();if(t-this.lastRenderTime<1e3)return this.updateAnimationVariables(),!1;this.lastRenderTime=t}return super.shouldUpdate(t)}updated(t){super.updated(t),t.has("hass")&&this.hass&&this.updateAnimationVariables()}firstUpdated(){this.config.animation.enabled&&(this.createFlowDots(),setTimeout(()=>{this.updateAnimationVariables()},100))}createFlowDots(){const t=this.shadowRoot?.querySelector("svg");if(!t)return;const e=this.getHeatPumpState(),o=this.getBufferTankState(),i=this.getHVACState(),s=this.getDHWTankState();[{id:"hp-to-buffer-path",flowRate:e.flowRate,supplyTemp:e.outletTemp,returnTemp:e.inletTemp,mode:"heating"},{id:"buffer-to-hp-path",flowRate:e.flowRate,supplyTemp:e.outletTemp,returnTemp:e.inletTemp,mode:"heating"},{id:"buffer-to-hvac-path",flowRate:i.flowRate,supplyTemp:o.supplyTemp,returnTemp:i.returnTemp,mode:"both"},{id:"hvac-to-buffer-path",flowRate:i.flowRate,supplyTemp:o.supplyTemp,returnTemp:i.returnTemp,mode:"both"},{id:"hp-to-g2-path",flowRate:e.flowRate,supplyTemp:e.outletTemp,returnTemp:e.inletTemp,mode:"dhw"},{id:"g2-to-dhw-path",flowRate:e.flowRate,supplyTemp:s.inletTemp,returnTemp:s.outletTemp,mode:"dhw"},{id:"dhw-coil-path",flowRate:e.flowRate,supplyTemp:s.inletTemp,returnTemp:s.outletTemp,mode:"dhw"},{id:"dhw-to-hp-return-path",flowRate:e.flowRate,supplyTemp:e.outletTemp,returnTemp:e.inletTemp,mode:"dhw"}].forEach((e,o)=>{const i=this.shadowRoot?.querySelector(`#${e.id}`);if(!i)return;const s=i.getAttribute("d");if(!s)return;const r=this.getPipeColors(e.supplyTemp,e.returnTemp,e.flowRate),n=o%2==0,a=this.config.animation.use_temp_color?n?r.hotPipe:r.coldPipe:this.config.animation.dot_color,l=this.getAnimationDuration(e.flowRate),h=e.flowRate>0;for(let o=0;o<3;o++){const i=document.createElementNS("http://www.w3.org/2000/svg","circle");i.classList.add("flow-dot"),i.setAttribute("data-path-id",e.id),i.setAttribute("cx","0"),i.setAttribute("cy","0"),i.setAttribute("r",this.config.animation.dot_size.toString()),i.setAttribute("fill",a),i.setAttribute("stroke",this.config.animation.dot_stroke_color),i.setAttribute("stroke-width",this.config.animation.dot_stroke_width.toString());const r=o/3*l;i.style.setProperty("--dot-path",`path('${s}')`),i.style.setProperty("--dot-duration",`${l}s`),i.style.setProperty("--dot-delay",`${r}s`),i.style.setProperty("--dot-opacity",h?this.config.animation.dot_opacity.toString():"0"),t.appendChild(i)}})}updateAnimationVariables(){if(!this.config.animation.enabled)return;const t=this.getHeatPumpState(),e=this.getBufferTankState(),o=this.getHVACState(),i=this.getDHWTankState(),s=this.getG2ValveState();[{id:"hp-to-buffer-path",flowRate:t.flowRate,supplyTemp:t.outletTemp,returnTemp:t.inletTemp,mode:"heating",visible:!s.isActive},{id:"buffer-to-hp-path",flowRate:t.flowRate,supplyTemp:t.outletTemp,returnTemp:t.inletTemp,mode:"heating",visible:!s.isActive},{id:"buffer-to-hvac-path",flowRate:o.flowRate,supplyTemp:e.supplyTemp,returnTemp:o.returnTemp,mode:"both",visible:!0},{id:"hvac-to-buffer-path",flowRate:o.flowRate,supplyTemp:e.supplyTemp,returnTemp:o.returnTemp,mode:"both",visible:!0},{id:"hp-to-g2-path",flowRate:t.flowRate,supplyTemp:t.outletTemp,returnTemp:t.inletTemp,mode:"dhw",visible:s.isActive},{id:"g2-to-dhw-path",flowRate:t.flowRate,supplyTemp:i.inletTemp,returnTemp:i.outletTemp,mode:"dhw",visible:s.isActive},{id:"dhw-coil-path",flowRate:t.flowRate,supplyTemp:i.inletTemp,returnTemp:i.outletTemp,mode:"dhw",visible:s.isActive},{id:"dhw-to-hp-return-path",flowRate:t.flowRate,supplyTemp:t.outletTemp,returnTemp:t.inletTemp,mode:"dhw",visible:s.isActive}].forEach((t,e)=>{const o=this.shadowRoot?.querySelectorAll(`.flow-dot[data-path-id="${t.id}"]`);if(!o)return;const i=this.getPipeColors(t.supplyTemp,t.returnTemp,t.flowRate),s=e%2==0,r=this.config.animation.use_temp_color?s?i.hotPipe:i.coldPipe:this.config.animation.dot_color,n=this.getAnimationDuration(t.flowRate),a=t.flowRate>0,l=t.visible&&a;o.forEach(t=>{t.setAttribute("fill",r),t.style.setProperty("--dot-duration",`${n}s`),t.style.setProperty("--dot-opacity",l?this.config.animation.dot_opacity.toString():"0")})}),this.updateFanAnimation()}updateFanAnimation(){const t=this.shadowRoot?.querySelector("#fan-blades");if(!t||!this.config.heat_pump_visual?.animate_fan)return;const e=this.getHeatPumpState().fanSpeed||0;if(e>0){t.classList.add("fan-rotating");const o=e>0?100/e:999;t.style.setProperty("--fan-duration",`${o}s`)}else t.classList.remove("fan-rotating")}getHeatPumpState(){const t=this.config.heat_pump||{};return{power:this.getStateValue(t.power_entity)||0,thermal:this.getStateValue(t.thermal_entity)||0,cop:this.getStateValue(t.cop_entity)||0,outletTemp:this.getStateValue(t.outlet_temp_entity)||0,inletTemp:this.getStateValue(t.inlet_temp_entity)||0,flowRate:this.getStateValue(t.flow_rate_entity)||0,fanSpeed:this.getStateValue(t.fan_speed_entity),mode:this.getStateString(t.mode_entity),modeDisplay:this.getStateString(t.mode_display_entity),defrost:"on"===this.getStateString(t.defrost_entity),error:this.getStateString(t.error_entity),energy:this.getStateValue(t.energy_entity),cost:this.getStateValue(t.cost_entity),runtime:this.getStateValue(t.runtime_entity)}}getStateString(t){if(!t||!this.hass)return;const e=this.hass.states[t];return e?.state}getBufferTankState(){const t=this.config.buffer_tank||{};return{supplyTemp:this.getStateValue(t.supply_temp_entity)||0,returnTemp:this.getStateValue(t.return_temp_entity)||0,level:this.getStateValue(t.level_entity)}}getHVACState(){const t=this.config.hvac||{};return{thermal:this.getStateValue(t.thermal_entity)||0,flowRate:this.getStateValue(t.flow_rate_entity)||0,supplyTemp:this.getStateValue(t.supply_temp_entity)||0,returnTemp:this.getStateValue(t.return_temp_entity)||0}}getDHWTankState(){const t=this.config.dhw_tank||{};return{inletTemp:this.getStateValue(t.inlet_temp_entity)||0,outletTemp:this.getStateValue(t.outlet_temp_entity)||0,tankTemp:this.getStateValue(t.tank_temp_entity)}}getG2ValveState(){const t=this.config.g2_valve||{},e=this.getStateString(t.state_entity);return{isActive:"on"===e||"true"===e||"1"===e}}getStateValue(t){if(!t||!this.hass)return;const e=this.hass.states[t];if(!e)return;const o=parseFloat(e.state);return isNaN(o)?void 0:o}getStateUnit(t){if(!t||!this.hass)return"";const e=this.hass.states[t];return e?.attributes?.unit_of_measurement||""}formatValue(t,e=1){return void 0===t?"N/A":t.toFixed(e)}getPipeColors(t,e,o){const i=this.config.temperature,s=Math.abs(t-e);return o<=0||s<i.delta_threshold?{hotPipe:i.neutral_color,coldPipe:i.neutral_color}:t>e?{hotPipe:i.hot_color,coldPipe:i.cold_color}:{hotPipe:i.cold_color,coldPipe:i.hot_color}}hexToRgb(t){const e={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#008000",blue:"#0000FF",yellow:"#FFFF00",cyan:"#00FFFF",magenta:"#FF00FF",orange:"#FFA500",purple:"#800080",pink:"#FFC0CB",brown:"#A52A2A",gray:"#808080",grey:"#808080"}[t.toLowerCase()]||t,o=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return o?{r:parseInt(o[1],16),g:parseInt(o[2],16),b:parseInt(o[3],16)}:{r:0,g:0,b:0}}getHeatPumpColor(t){const e=this.config.heat_pump_visual;if(t.defrost)return e.defrost_color;if(t.power<=0)return e.off_color;const o=(t.mode||t.modeDisplay)?.toLowerCase();return o?.includes("heat")?e.heating_color:o?.includes("cool")?e.cooling_color:o?.includes("dhw")||o?.includes("hot water")?e.dhw_color:e.off_color}getDisplayMode(t,e){return t.mode?t.mode.toUpperCase():t.modeDisplay?t.modeDisplay.toUpperCase():t.defrost?"DEFROST":t.power<=0&&t.thermal<=0?"OFF":t.power>0?e.isActive?"DHW":"HEATING":"OFF"}getContrastTextColor(t){const e=t.replace("#","");return(.299*parseInt(e.substr(0,2),16)+.587*parseInt(e.substr(2,2),16)+.114*parseInt(e.substr(4,2),16))/255>.5?"#2c3e50":"#ffffff"}getAnimationDuration(t){const e=this.config.animation;if(t<=0)return e.min_flow_rate;const o=Math.min(t/e.max_flow_rate_value,1);return e.min_flow_rate-o*(e.min_flow_rate-e.max_flow_rate)}render(){if(!this.config||!this.hass)return I``;const t=this.getHeatPumpState(),e=this.getBufferTankState(),o=this.getHVACState(),i=this.getDHWTankState(),s=this.getG2ValveState(),r=this.getPipeColors(t.outletTemp,t.inletTemp,t.flowRate),n=this.getPipeColors(e.supplyTemp,o.returnTemp,o.flowRate),a=this.getPipeColors(i.inletTemp,i.outletTemp,t.flowRate),l=r.hotPipe,h=r.coldPipe,p=n.hotPipe,c=n.coldPipe,d=a.hotPipe;return this.initialLogDone||(console.log("╔═══════════════════════════════════════╗"),console.log("║     INITIAL STATE (First Render)     ║"),console.log("╚═══════════════════════════════════════╝"),console.log("🔄 G2 Valve:"),console.log("   - isActive:",s.isActive),console.log("   - Entity:",this.config.g2_valve?.state_entity||"(not configured)"),console.log("   - Heating pipes opacity:",s.isActive?"0 (hidden)":"1 (visible)"),console.log("   - DHW pipes opacity:",s.isActive?"1 (visible)":"0 (hidden)"),console.log("⚡ Heat Pump:"),console.log("   - Mode:",t.mode||"(undefined)"),console.log("   - Mode Entity:",this.config.heat_pump?.mode_entity||"(not configured)"),console.log("   - Power:",t.power,"W"),console.log("   - Flow Rate:",t.flowRate,"L/min"),console.log("   - Outlet Temp:",t.outletTemp,"°C"),console.log("   - Inlet Temp:",t.inletTemp,"°C"),console.log("🎨 Pipe Colors:"),console.log("   - HP Outlet:",l),console.log("   - HP Inlet:",h),console.log("   - DHW Coil:",d),console.log("═══════════════════════════════════════\n"),this.initialLogDone=!0,this.lastG2State=s.isActive,this.lastHpMode=t.mode||null),this.lastG2State!==s.isActive&&(console.log("═══════════════════════════════════════"),console.log("🔄 G2 VALVE STATE CHANGED"),console.log("G2 isActive:",s.isActive),console.log("Will render:",s.isActive?"🔵 DHW pipes":"🔴 Heating pipes"),this.lastG2State=s.isActive,console.log("═══════════════════════════════════════")),this.lastHpMode!==t.mode&&(console.log("═══════════════════════════════════════"),console.log("⚡ HP MODE CHANGED"),console.log("HP Mode:",t.mode||"(undefined)"),console.log("HP Power:",t.power,"W"),this.lastHpMode=t.mode||null,console.log("═══════════════════════════════════════")),I`
      <ha-card>
        ${this.config.title?I`<h1 class="card-header">${this.config.title}</h1>`:""}

        <div class="card-content">
          <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
            <!-- Flow Pipes (rendered first so they appear behind entities) -->

            <!-- Pipes with 10px gaps from entities for clean appearance -->
            <!-- CONVENTIONAL: Supply on top (hot), Return on bottom (cold) -->

            <!-- HEATING MODE PIPES (shown when G2 valve is OFF - heating mode) -->
            <!-- Pipe: HP to Buffer (hot supply) - TOP - 10px gap from HP -->
            <path id="hp-to-buffer-path"
                  d="M 180 180 L 350 180"
                  stroke="${s.isActive?this.config.temperature?.neutral_color||"#95a5a6":l}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${s.isActive?"0.3":"1"}"/>

            <!-- Pipe: Buffer to HP (cold return) - BOTTOM - 10px gap from HP -->
            <path id="buffer-to-hp-path"
                  d="M 350 220 L 180 220"
                  stroke="${s.isActive?this.config.temperature?.neutral_color||"#95a5a6":h}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${s.isActive?"0.3":"1"}"/>

            <!-- DHW MODE PIPES (shown when G2 valve is ON - DHW mode) -->
            <!-- Pipe: HP to G2 valve (hot supply from TOP) - leaves room for aux heater -->
            <path id="hp-to-g2-path"
                  d="M 180 180 L 280 180 L 280 200"
                  stroke="${s.isActive?l:this.config.temperature?.neutral_color||"#95a5a6"}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${s.isActive?"1":"0.3"}"/>

            <!-- Pipe: G2 valve down to DHW tank inlet -->
            <path id="g2-to-dhw-path"
                  d="M 280 200 L 280 370 L 350 370 L 350 420 L 380 420"
                  stroke="${s.isActive?d:this.config.temperature?.neutral_color||"#95a5a6"}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${s.isActive?"1":"0.3"}"/>

            <!-- DHW coil spiral path (for flow animation) -->
            <path id="dhw-coil-path"
                  d="M 380 420 Q 400 425, 420 420 Q 400 428, 380 435 Q 400 440, 420 435 Q 400 448, 380 455 Q 400 460, 420 455 Q 400 468, 380 475 Q 400 480, 420 475 Q 400 488, 380 495 Q 400 500, 420 495 Q 400 508, 380 515 Q 400 520, 420 515 Q 400 528, 380 535"
                  stroke="none"
                  stroke-width="0"
                  fill="none"
                  opacity="0"/>

            <!-- Pipe: DHW outlet to HP return (BOTTOM) - routed away from buffer tank -->
            <path id="dhw-to-hp-return-path"
                  d="M 380 535 L 300 535 L 300 220 L 180 220"
                  stroke="${s.isActive?h:this.config.temperature?.neutral_color||"#95a5a6"}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${s.isActive?"1":"0.3"}"/>

            <!-- Pipe: Buffer to HVAC (hot) - 10px gap from HVAC -->
            <path id="buffer-to-hvac-path"
                  d="M 450 180 L 620 180"
                  stroke="${p}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Pipe: HVAC to Buffer (cold return) - 10px gap from HVAC -->
            <path id="hvac-to-buffer-path"
                  d="M 620 220 L 450 220"
                  stroke="${c}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Temperature labels (hot supply on top, cold return on bottom) -->
            <text x="260" y="170" text-anchor="middle" fill="${l}" font-size="11" font-weight="bold">
              ${this.config.labels.hp_supply}: ${this.formatValue(t.outletTemp,1)}°${this.config.temperature?.unit||"C"}
            </text>

            <text x="260" y="240" text-anchor="middle" fill="${h}" font-size="11" font-weight="bold">
              ${this.config.labels.hp_return}: ${this.formatValue(t.inletTemp,1)}°${this.config.temperature?.unit||"C"}
            </text>

            <text x="540" y="170" text-anchor="middle" fill="${p}" font-size="11" font-weight="bold">
              ${this.config.labels.hvac_supply}: ${this.formatValue(e.supplyTemp,1)}°${this.config.temperature?.unit||"C"}
            </text>

            <text x="540" y="240" text-anchor="middle" fill="${c}" font-size="11" font-weight="bold">
              ${this.config.labels.hvac_return}: ${this.formatValue(o.returnTemp,1)}°${this.config.temperature?.unit||"C"}
            </text>

            <!-- Heat Pump (left side) -->
            <g id="heat-pump" transform="translate(50, 100)">
              <!-- Heat pump body with state-based color -->
              <rect width="120" height="150" rx="10" fill="${this.getHeatPumpColor(t)}" fill-opacity="0.2" stroke="${this.getHeatPumpColor(t)}" stroke-width="3"/>

              <!-- Brand logo (if configured) -->
              ${this.config.heat_pump?.logo_url?I`
                <image href="${this.config.heat_pump.logo_url}" x="10" y="5" width="100" height="20" preserveAspectRatio="xMidYMid meet"/>
              `:""}

              <!-- Brand name (if configured) -->
              ${this.config.heat_pump?.display_name?I`
                <text x="60" y="${this.config.heat_pump?.logo_url?"30":"15"}" text-anchor="middle" fill="${this.getContrastTextColor(this.getHeatPumpColor(t))}" font-size="8" font-weight="bold">
                  ${this.config.heat_pump.display_name}
                </text>
              `:""}

              <!-- Fan housing -->
              <circle cx="60" cy="40" r="30" fill="#34495e" stroke="${this.getHeatPumpColor(t)}" stroke-width="2"/>

              <!-- Fan blades (will be animated) -->
              <g id="fan-blades">
                <!-- 4 fan blades -->
                <path d="M 60 10 Q 70 30, 60 40 Q 50 30, 60 10" fill="#7f8c8d" opacity="0.8"/>
                <path d="M 90 40 Q 70 50, 60 40 Q 70 30, 90 40" fill="#7f8c8d" opacity="0.8"/>
                <path d="M 60 70 Q 50 50, 60 40 Q 70 50, 60 70" fill="#7f8c8d" opacity="0.8"/>
                <path d="M 30 40 Q 50 30, 60 40 Q 50 50, 30 40" fill="#7f8c8d" opacity="0.8"/>
                <!-- Center cap -->
                <circle cx="60" cy="40" r="8" fill="#2c3e50"/>
              </g>

              <!-- Heat pump label -->
              <text x="60" y="85" text-anchor="middle" fill="${this.getHeatPumpColor(t)}" font-size="10" font-weight="bold">
                ${this.getDisplayMode(t,s)}
              </text>

              <!-- Error indicator -->
              ${t.error?I`
                <text x="60" y="100" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">
                  ⚠ ${t.error}
                </text>
              `:""}

              <!-- Critical metrics inside HP box (2-column: Input | Output) -->
              ${(()=>{const e=this.getContrastTextColor(this.getHeatPumpColor(t));return I`
                  <!-- Left column: INPUT parameters -->
                  <text x="8" y="105" fill="${e}" font-size="10" font-weight="bold">IN</text>
                  <text x="8" y="119" fill="${e}" font-size="10">${this.formatValue(t.power/1e3,1)} kW</text>
                  <text x="8" y="133" fill="${e}" font-size="10">${this.formatValue(t.flowRate,1)} L/m</text>

                  <!-- Right column: OUTPUT parameters -->
                  <text x="62" y="105" fill="${e}" font-size="10" font-weight="bold">OUT</text>
                  <text x="62" y="119" fill="${e}" font-size="10">${this.formatValue(t.thermal/1e3,1)} kW</text>
                  <text x="62" y="133" fill="${e}" font-size="10">COP ${this.formatValue(t.cop,2)}</text>
                `})()}
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
              <text x="0" y="124" fill="#9b59b6" font-size="12">${this.formatValue(t.flowRate,1)} L/min</text>

              <!-- Right column -->
              ${void 0!==t.energy?I`
                <text x="80" y="0" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels.energy}:</text>
                <text x="80" y="16" fill="#16a085" font-size="12">${this.formatValue(t.energy,2)} kWh</text>
              `:""}

              ${void 0!==t.cost?I`
                <text x="80" y="36" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels.cost}:</text>
                <text x="80" y="52" fill="#27ae60" font-size="12">$${this.formatValue(t.cost,2)}</text>
              `:""}
            </g>

            <!-- G2 Diverter Valve (3-way valve between HP and tanks) -->
            <g id="g2-valve" transform="translate(280, 190) scale(2.0)">
              <!-- Valve body - cylindrical with flanges (matching valve idea graphic) -->
              <!-- Left inlet flange -->
              <rect x="-45" y="-8" width="10" height="16" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Main body cylinder -->
              <rect x="-35" y="-12" width="35" height="24" fill="#bdc3c7" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Right outlet flange (to buffer/heating) -->
              <rect x="0" y="-8" width="10" height="16" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Bottom outlet flange (to DHW) -->
              <rect x="-25" y="12" width="16" height="10" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>

              <!-- Internal flow path visualization -->
              ${s.isActive?I`
                <!-- DHW Mode: Flow DOWN (from left inlet to bottom outlet) -->
                <!-- Active path in red -->
                <path d="M -35 0 L -17 0 L -17 12"
                      stroke="${this.config.heat_pump_visual?.dhw_color||"#e74c3c"}"
                      stroke-width="6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
                <!-- Inactive path (to right) shown as X -->
                <path d="M -17 -8 L 0 8 M -17 8 L 0 -8"
                      stroke="#7f8c8d"
                      stroke-width="2"
                      opacity="0.4"/>
              `:I`
                <!-- Heating Mode: Flow ACROSS (from left inlet to right outlet) -->
                <!-- Active path in green -->
                <path d="M -35 0 L 0 0"
                      stroke="#16a085"
                      stroke-width="6"
                      fill="none"
                      stroke-linecap="round"/>
                <!-- Inactive path (to bottom) shown as X -->
                <path d="M -25 4 L -9 20 M -9 4 L -25 20"
                      stroke="#7f8c8d"
                      stroke-width="2"
                      opacity="0.4"/>
              `}

              <!-- Valve label -->
              <text x="-17" y="-20" text-anchor="middle" fill="#2c3e50" font-size="10" font-weight="bold">
                G2
              </text>
              <text x="-17" y="35" text-anchor="middle" fill="${s.isActive?this.config.heat_pump_visual?.dhw_color||"#e74c3c":"#16a085"}" font-size="9" font-weight="bold">
                ${s.isActive?"DHW":"HEAT"}
              </text>
            </g>

            <!-- Improved Buffer Tank (center) -->
            <g id="buffer-tank" transform="translate(350, 100)">
              <!-- Tank cylinder body -->
              <rect x="10" y="20" width="80" height="160" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap -->
              <ellipse cx="50" cy="20" rx="40" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="50" cy="180" rx="40" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              <!-- Thermal stratification (tank is 100% full, hot rises to top) -->
              <!-- Top section (hottest - supply temp) -->
              <rect x="15" y="25" width="70" height="35" fill="${p}" opacity="0.9"/>

              <!-- Upper-middle section (warm) -->
              <rect x="15" y="60" width="70" height="40" fill="${p}" opacity="0.7"/>

              <!-- Lower-middle section (cooling) -->
              <rect x="15" y="100" width="70" height="40" fill="${c}" opacity="0.7"/>

              <!-- Bottom section (coldest - return temp) -->
              <rect x="15" y="140" width="70" height="35" fill="${c}" opacity="0.9"/>

              <!-- Structural bands -->
              <line x1="10" y1="60" x2="90" y2="60" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="100" x2="90" y2="100" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="140" x2="90" y2="140" stroke="#2c3e50" stroke-width="2"/>

              <!-- Tank label inside top section -->
              <text x="50" y="45" text-anchor="middle" fill="white" font-size="13" font-weight="bold">
                ${this.config.labels.buffer_tank}
              </text>
            </g>

            <!-- DHW (Domestic Hot Water) Tank with Coil (center-bottom) -->
            <g id="dhw-tank" transform="translate(350, 370)">
              <!-- Tank cylinder body -->
              <rect x="10" y="20" width="80" height="160" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap -->
              <ellipse cx="50" cy="20" rx="40" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="50" cy="180" rx="40" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              <!-- Inner cylinder (DHW water - always blue/cold) -->
              <rect x="15" y="25" width="70" height="150" fill="#3498db" opacity="0.3"/>

              <!-- Heating coil inside tank (spiral) -->
              <path d="M 30 50 Q 50 55, 70 50 Q 50 58, 30 65 Q 50 70, 70 65 Q 50 78, 30 85 Q 50 90, 70 85 Q 50 98, 30 105 Q 50 110, 70 105 Q 50 118, 30 125 Q 50 130, 70 125 Q 50 138, 30 145 Q 50 150, 70 145 Q 50 158, 30 165"
                    stroke="${d}"
                    stroke-width="4"
                    fill="none"
                    opacity="0.9"/>

              <!-- Coil inlet/outlet markers -->
              <circle cx="30" cy="50" r="3" fill="${d}"/>
              <circle cx="30" cy="165" r="3" fill="${d}"/>

              <!-- Structural bands -->
              <line x1="10" y1="60" x2="90" y2="60" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="100" x2="90" y2="100" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="140" x2="90" y2="140" stroke="#2c3e50" stroke-width="2"/>

              <!-- Tank label inside top section -->
              <text x="50" y="45" text-anchor="middle" fill="white" font-size="13" font-weight="bold">
                ${this.config.labels.dhw_tank}
              </text>

              <!-- Tank temperature if available -->
              ${i.tankTemp?I`
                <text x="50" y="200" text-anchor="middle" fill="#3498db" font-size="11" font-weight="bold">
                  Tank: ${this.formatValue(i.tankTemp,1)}°${this.config.temperature?.unit||"C"}
                </text>
              `:""}
            </g>

            <!-- HVAC Load (right side) -->
            <g id="hvac-load" transform="translate(630, 150)">
              <rect width="120" height="100" rx="10" fill="#2c3e50" stroke="#34495e" stroke-width="2"/>
              <text x="60" y="30" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                HVAC LOAD
              </text>
              <text x="60" y="55" text-anchor="middle" fill="#e74c3c" font-size="20" font-weight="bold">
                ${this.formatValue(o.thermal,0)} W
              </text>
              <text x="60" y="75" text-anchor="middle" fill="#95a5a6" font-size="12">
                Flow: ${this.formatValue(o.flowRate,1)} L/min
              </text>
            </g>

            <!-- Version display (upper right corner) -->
            <text x="790" y="15" text-anchor="end" fill="#95a5a6" font-size="10" opacity="0.7">
              v${dt}
            </text>

            <!-- Flow dots created programmatically in firstUpdated() -->
          </svg>
        </div>
      </ha-card>
    `}static get styles(){return ft}getCardSize(){return 5}},e([pt({attribute:!1})],t.HeatPumpFlowCard.prototype,"hass",void 0),e([function(t){return pt({...t,state:!0,attribute:!1})}()],t.HeatPumpFlowCard.prototype,"config",void 0),e([ct("#hp-to-buffer-flow")],t.HeatPumpFlowCard.prototype,"hpToBufferFlow",void 0),e([ct("#buffer-to-hp-flow")],t.HeatPumpFlowCard.prototype,"bufferToHpFlow",void 0),e([ct("#buffer-to-hvac-flow")],t.HeatPumpFlowCard.prototype,"bufferToHvacFlow",void 0),e([ct("#hvac-to-buffer-flow")],t.HeatPumpFlowCard.prototype,"hvacToBufferFlow",void 0),t.HeatPumpFlowCard=e([(t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("heat-pump-flow-card")],t.HeatPumpFlowCard),window.customCards=window.customCards||[],window.customCards.push({type:"heat-pump-flow-card",name:"Heat Pump Flow Card",description:"Animated heat pump flow visualization card",preview:!0,documentationURL:"https://github.com/YOUR_USERNAME/heat-pump-flow-card"}),t}({});
//# sourceMappingURL=heat-pump-flow-card.js.map
