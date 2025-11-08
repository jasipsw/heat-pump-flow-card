var HeatPumpFlowCard=function(t){"use strict";function e(t,e,i,o){var a,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(s=(r<3?a(s):r>3?a(e,i,s):a(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,o=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),r=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,a))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:p,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:f}=Object,u=globalThis,m=u.trustedTypes,g=m?m.emptyScript:"",y=u.reactiveElementPolyfillSupport,w=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&h(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:a}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(o)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of e){const e=document.createElement("style"),a=i.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=o.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=o;const r=a.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const o=this.constructor,a=this[t];if(i??=o.getPropertyOptions(t),!((i.hasChanged??x)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[w("elementProperties")]=new Map,b[w("finalized")]=new Map,y?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.1");const v=globalThis,A=v.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,C=`<${P}>`,E=document,H=()=>E.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,O="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,V=/>/g,F=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,N=/"/g,L=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),Q=new WeakMap,G=E.createTreeWalker(E,129);function j(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const q=(t,e)=>{const i=t.length-1,o=[];let a,r=2===e?"<svg>":3===e?"<math>":"",s=D;for(let e=0;e<i;e++){const i=t[e];let n,l,h=-1,p=0;for(;p<i.length&&(s.lastIndex=p,l=s.exec(i),null!==l);)p=s.lastIndex,s===D?"!--"===l[1]?s=z:void 0!==l[1]?s=V:void 0!==l[2]?(L.test(l[2])&&(a=RegExp("</"+l[2],"g")),s=F):void 0!==l[3]&&(s=F):s===F?">"===l[0]?(s=a??D,h=-1):void 0===l[1]?h=-2:(h=s.lastIndex-l[2].length,n=l[1],s=void 0===l[3]?F:'"'===l[3]?N:U):s===N||s===U?s=F:s===z||s===V?s=D:(s=F,a=void 0);const c=s===F&&t[e+1].startsWith("/>")?" ":"";r+=s===D?i+C:h>=0?(o.push(n),i.slice(0,h)+T+i.slice(h)+k+c):i+k+(-2===h?e:c)}return[j(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Z{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let a=0,r=0;const s=t.length-1,n=this.parts,[l,h]=q(t,e);if(this.el=Z.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=G.nextNode())&&n.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(T)){const e=h[r++],i=o.getAttribute(t).split(k),s=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:s[2],strings:i,ctor:"."===s[1]?tt:"?"===s[1]?et:"@"===s[1]?it:Y}),o.removeAttribute(t)}else t.startsWith(k)&&(n.push({type:6,index:a}),o.removeAttribute(t));if(L.test(o.tagName)){const t=o.textContent.split(k),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],H()),G.nextNode(),n.push({type:2,index:++a});o.append(t[e],H())}}}else if(8===o.nodeType)if(o.data===P)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=o.data.indexOf(k,t+1));)n.push({type:7,index:a}),t+=k.length-1}a++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,o){if(e===B)return e;let a=void 0!==o?i._$Co?.[o]:i._$Cl;const r=R(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,o)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??E).importNode(e,!0);G.currentNode=o;let a=G.nextNode(),r=0,s=0,n=i[0];for(;void 0!==n;){if(r===n.index){let e;2===n.type?e=new K(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new ot(a,this,t)),this._$AV.push(e),n=i[++s]}r!==n?.index&&(a=G.nextNode(),r++)}return G.currentNode=E,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),R(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==I&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(j(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new J(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new Z(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const a of t)o===e.length?e.push(i=new K(this.O(H()),this.O(H()),this,this.options)):i=e[o],i._$AI(a),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,a){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}_$AI(t,e=this,i,o){const a=this.strings;let r=!1;if(void 0===a)t=X(this,t,e,0),r=!R(t)||t!==this._$AH&&t!==B,r&&(this._$AH=t);else{const o=t;let s,n;for(t=a[0],s=0;s<a.length-1;s++)n=X(this,o[i+s],e,s),n===B&&(n=this._$AH[s]),r||=!R(n)||n!==this._$AH[s],n===I?t=I:t!==I&&(t+=(n??"")+a[s+1]),this._$AH[s]=n}r&&!o&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==I)}}class it extends Y{constructor(t,e,i,o,a){super(t,e,i,o,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??I)===B)return;const i=this._$AH,o=t===I&&i!==I||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==I&&(i===I||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const at=v.litHtmlPolyfillSupport;at?.(Z,K),(v.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;class st extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let a=o._$litPart$;if(void 0===a){const t=i?.renderBefore??null;o._$litPart$=a=new K(e.insertBefore(H(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}st._$litElement$=!0,st.finalized=!0,rt.litElementHydrateSupport?.({LitElement:st});const nt=rt.litElementPolyfillSupport;nt?.({LitElement:st}),(rt.litElementVersions??=[]).push("4.2.1");const lt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:x},ht=(t=lt,e,i)=>{const{kind:o,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,a,t)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const a=this[o];e.call(this,i),this.requestUpdate(o,a,t)}}throw Error("Unsupported decorator location: "+o)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ct(t,e){return(e,i,o)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const dt="0.21.31",ft=(new Date).toISOString(),ut=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(i,t,a)})`
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
  /* Tiny particles for realistic water flow stream effect */
  .flow-dot {
    offset-path: var(--dot-path);
    offset-rotate: 0deg;
    animation: flow-along-path linear infinite;
    animation-duration: var(--dot-duration, 5s);
    animation-delay: var(--dot-delay, 0s);
    opacity: var(--dot-opacity, 1);
    /* No filter for tiny particles - cleaner, more performant */
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
`;return console.info(`%c  HEAT-PUMP-FLOW-CARD  \n%c  Version ${dt}  \n%c  Built: ${ft}  `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray","color: #95a5a6; font-weight: normal; background: dimgray"),t.HeatPumpFlowCard=class extends st{constructor(){super(...arguments),this.lastRenderTime=0,this.lastHassState={}}static getConfigElement(){}static getStubConfig(){return{type:"custom:heat-pump-flow-card",title:"Heat Pump Flow"}}setConfig(t){if(!t)throw new Error("Invalid configuration");const{animation:e,temperature:i,display:o,heat_pump_visual:a,labels:r,...s}=t;this.config={...s,animation:{enabled:!0,min_flow_rate:5,max_flow_rate:1,max_flow_rate_value:50,dot_size:1,dot_spacing:30,use_temp_color:!0,dot_color:"#3498db",dot_opacity:.9,...e},temperature:{delta_threshold:10,hot_color:"#e74c3c",cold_color:"#3498db",neutral_color:"#95a5a6",unit:"C",...i},display:{show_values:!0,show_labels:!0,show_icons:!0,compact:!1,decimal_places:1,...o},heat_pump_visual:{off_color:"#95a5a6",heating_color:"#e74c3c",cooling_color:"#3498db",dhw_color:"#e67e22",defrost_color:"#f1c40f",show_metrics:!0,animate_fan:!0,...a},labels:{hp_supply:"HP Supply",hp_return:"HP Return",hvac_supply:"HVAC Supply",hvac_return:"HVAC Return",buffer_tank:"BUFFER",dhw_tank:"DHW",power_in:"Power In",thermal_out:"Thermal Out",cop:"COP",flow:"Flow",energy:"Energy",cost:"Cost",...r}}}shouldUpdate(t){if(t.has("config"))return!0;if(t.has("hass")){const t=Date.now();if(t-this.lastRenderTime<1e3)return this.updateAnimationVariables(),!1;this.lastRenderTime=t}return super.shouldUpdate(t)}updated(t){super.updated(t),t.has("hass")&&this.hass&&this.updateAnimationVariables()}firstUpdated(){this.config.animation.enabled&&(this.createFlowDots(),setTimeout(()=>{this.updateAnimationVariables()},100))}createFlowDots(){const t=this.shadowRoot?.querySelector("svg");if(!t)return;const e=this.getHeatPumpState(),i=this.getBufferTankState(),o=this.getHVACState(),a=this.getDHWTankState();[{id:"hp-to-aux-heating-path",flowRate:e.flowRate,supplyTemp:e.outletTemp,returnTemp:e.inletTemp,mode:"both"},{id:"aux-to-g2-heating-path",flowRate:e.flowRate,supplyTemp:e.outletTemp,returnTemp:e.inletTemp,mode:"both"},{id:"g2-to-buffer-path",flowRate:e.flowRate,supplyTemp:e.outletTemp,returnTemp:e.inletTemp,mode:"heating"},{id:"buffer-to-hp-path",flowRate:e.flowRate,supplyTemp:e.outletTemp,returnTemp:e.inletTemp,mode:"heating"},{id:"buffer-to-hvac-path",flowRate:o.flowRate,supplyTemp:i.supplyTemp,returnTemp:o.returnTemp,mode:"both"},{id:"hvac-to-buffer-path",flowRate:o.flowRate,supplyTemp:i.supplyTemp,returnTemp:o.returnTemp,mode:"both"},{id:"g2-to-dhw-path",flowRate:e.flowRate,supplyTemp:a.inletTemp,returnTemp:a.outletTemp,mode:"dhw"},{id:"dhw-coil-path",flowRate:e.flowRate,supplyTemp:a.inletTemp,returnTemp:a.outletTemp,mode:"dhw"},{id:"dhw-to-hp-return-path",flowRate:e.flowRate,supplyTemp:e.outletTemp,returnTemp:e.inletTemp,mode:"dhw"}].forEach((e,i)=>{const o=this.shadowRoot?.querySelector(`#${e.id}`);if(!o)return;const a=o.getAttribute("d");if(!a)return;const r=this.getPipeColors(e.supplyTemp,e.returnTemp,e.flowRate),s=e.id.includes("-to-hp-")||e.id.includes("hvac-to-buffer")||e.id.includes("dhw-to-hp"),n=this.config.animation.use_temp_color?s?r.coldPipe:r.hotPipe:this.config.animation.dot_color,l=this.getAnimationDuration(e.flowRate),h=e.flowRate>0;for(let i=0;i<40;i++){const o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.classList.add("flow-dot"),o.setAttribute("data-path-id",e.id);const r=6*(Math.random()-.5);o.setAttribute("data-perpendicular-offset",r.toString()),o.setAttribute("cx","0"),o.setAttribute("cy","0"),o.setAttribute("r",this.config.animation.dot_size.toString()),o.setAttribute("fill",n),o.style.transform=`translate(0, ${r}px)`;const s=i/40*l;o.style.setProperty("--dot-path",`path('${a}')`),o.style.setProperty("--dot-duration",`${l}s`),o.style.setProperty("--dot-delay",`${s}s`),o.style.setProperty("--dot-opacity",h?this.config.animation.dot_opacity.toString():"0"),t.appendChild(o)}})}updateAnimationVariables(){if(!this.config.animation.enabled)return;const t=this.getHeatPumpState(),e=this.getBufferTankState(),i=this.getHVACState(),o=this.getDHWTankState(),a=this.getG2ValveState();[{id:"hp-to-aux-heating-path",flowRate:t.flowRate,supplyTemp:t.outletTemp,returnTemp:t.inletTemp,mode:"both",visible:!0},{id:"aux-to-g2-heating-path",flowRate:t.flowRate,supplyTemp:t.outletTemp,returnTemp:t.inletTemp,mode:"both",visible:!0},{id:"g2-to-buffer-path",flowRate:t.flowRate,supplyTemp:t.outletTemp,returnTemp:t.inletTemp,mode:"heating",visible:!a.isActive},{id:"buffer-to-hp-path",flowRate:t.flowRate,supplyTemp:t.outletTemp,returnTemp:t.inletTemp,mode:"heating",visible:!a.isActive},{id:"buffer-to-hvac-path",flowRate:i.flowRate,supplyTemp:e.supplyTemp,returnTemp:i.returnTemp,mode:"both",visible:!0},{id:"hvac-to-buffer-path",flowRate:i.flowRate,supplyTemp:e.supplyTemp,returnTemp:i.returnTemp,mode:"both",visible:!0},{id:"g2-to-dhw-path",flowRate:t.flowRate,supplyTemp:o.inletTemp,returnTemp:o.outletTemp,mode:"dhw",visible:a.isActive},{id:"dhw-coil-path",flowRate:t.flowRate,supplyTemp:o.inletTemp,returnTemp:o.outletTemp,mode:"dhw",visible:a.isActive},{id:"dhw-to-hp-return-path",flowRate:t.flowRate,supplyTemp:t.outletTemp,returnTemp:t.inletTemp,mode:"dhw",visible:a.isActive}].forEach((t,e)=>{const i=this.shadowRoot?.querySelectorAll(`.flow-dot[data-path-id="${t.id}"]`);if(!i)return;const o=this.getPipeColors(t.supplyTemp,t.returnTemp,t.flowRate),a=t.id.includes("-to-hp-")||t.id.includes("hvac-to-buffer")||t.id.includes("dhw-to-hp"),r=this.config.animation.use_temp_color?a?o.coldPipe:o.hotPipe:this.config.animation.dot_color,s=this.getAnimationDuration(t.flowRate),n=t.flowRate>0,l=t.visible&&n,h=i.length;i.forEach((t,e)=>{const i=e/h*s;t.setAttribute("fill",r),t.style.setProperty("--dot-duration",`${s}s`),t.style.setProperty("--dot-delay",`${i}s`),t.style.setProperty("--dot-opacity",l?this.config.animation.dot_opacity.toString():"0")})}),this.updateFanAnimation()}updateFanAnimation(){const t=this.shadowRoot?.querySelector("#fan-blades");if(!t||!this.config.heat_pump_visual?.animate_fan)return;const e=this.getHeatPumpState().fanSpeed||0;if(e>0){t.classList.add("fan-rotating");const i=e>0?100/e:999;t.style.setProperty("--fan-duration",`${i}s`)}else t.classList.remove("fan-rotating")}getHeatPumpState(){const t=this.config.heat_pump||{};return{power:this.getStateValue(t.power_entity)||0,thermal:this.getStateValue(t.thermal_entity)||0,cop:this.getStateValue(t.cop_entity)||0,outletTemp:this.getStateValue(t.outlet_temp_entity)||0,inletTemp:this.getStateValue(t.inlet_temp_entity)||0,flowRate:this.getStateValue(t.flow_rate_entity)||0,fanSpeed:this.getStateValue(t.fan_speed_entity),mode:this.getStateString(t.mode_entity),modeDisplay:this.getStateString(t.mode_display_entity),defrost:"on"===this.getStateString(t.defrost_entity),error:this.getStateString(t.error_entity),energy:this.getStateValue(t.energy_entity),cost:this.getStateValue(t.cost_entity),runtime:this.getStateValue(t.runtime_entity)}}getStateString(t){if(!t||!this.hass)return;const e=this.hass.states[t];return e?.state}getBufferTankState(){const t=this.config.buffer_tank||{};return{supplyTemp:this.getStateValue(t.supply_temp_entity)||0,returnTemp:this.getStateValue(t.return_temp_entity)||0,level:this.getStateValue(t.level_entity)}}getHVACState(){const t=this.config.hvac||{};return{thermal:this.getStateValue(t.thermal_entity)||0,flowRate:this.getStateValue(t.flow_rate_entity)||0,supplyTemp:this.getStateValue(t.supply_temp_entity)||0,returnTemp:this.getStateValue(t.return_temp_entity)||0}}getDHWTankState(){const t=this.config.dhw_tank||{};return{inletTemp:this.getStateValue(t.inlet_temp_entity)||0,outletTemp:this.getStateValue(t.outlet_temp_entity)||0,tankTemp:this.getStateValue(t.tank_temp_entity)}}getG2ValveState(){const t=this.config.g2_valve||{},e=this.getStateString(t.state_entity);return{isActive:"on"===e||"true"===e||"1"===e}}getAuxHeaterState(){const t=this.config.aux_heater||{},e=t.enabled||!1,i=this.getStateValue(t.power_entity)||0,o=t.max_power||18e3;return{enabled:e,power:i,maxPower:o,intensity:Math.min(i/o,1),displayName:t.display_name||t.name||"AUX"}}getStateValue(t){if(!t||!this.hass)return;const e=this.hass.states[t];if(!e)return;const i=parseFloat(e.state);return isNaN(i)?void 0:i}getStateUnit(t){if(!t||!this.hass)return"";const e=this.hass.states[t];return e?.attributes?.unit_of_measurement||""}formatValue(t,e=1){return void 0===t?"N/A":t.toFixed(e)}getPipeColors(t,e,i){const o=this.config.temperature,a=Math.abs(t-e);return i<=0||a<o.delta_threshold?{hotPipe:o.neutral_color,coldPipe:o.neutral_color}:t>e?{hotPipe:o.hot_color,coldPipe:o.cold_color}:{hotPipe:o.cold_color,coldPipe:o.hot_color}}hexToRgb(t){const e={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#008000",blue:"#0000FF",yellow:"#FFFF00",cyan:"#00FFFF",magenta:"#FF00FF",orange:"#FFA500",purple:"#800080",pink:"#FFC0CB",brown:"#A52A2A",gray:"#808080",grey:"#808080"}[t.toLowerCase()]||t,i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return i?{r:parseInt(i[1],16),g:parseInt(i[2],16),b:parseInt(i[3],16)}:{r:0,g:0,b:0}}getHeatPumpColor(t){const e=this.config.heat_pump_visual;if(t.defrost)return e.defrost_color;if(t.power<=0)return e.off_color;const i=(t.mode||t.modeDisplay)?.toLowerCase();return i?.includes("heat")?e.heating_color:i?.includes("cool")?e.cooling_color:i?.includes("dhw")||i?.includes("hot water")?e.dhw_color:e.off_color}getDisplayMode(t,e){return t.mode?t.mode.toUpperCase():t.modeDisplay?t.modeDisplay.toUpperCase():t.defrost?"DEFROST":t.power<=0&&t.thermal<=0?"OFF":t.power>0?e.isActive?"DHW":"HEATING":"OFF"}getContrastTextColor(t){const e=t.replace("#","");return(.299*parseInt(e.substr(0,2),16)+.587*parseInt(e.substr(2,2),16)+.114*parseInt(e.substr(4,2),16))/255>.35?"#2c3e50":"#ffffff"}getAnimationDuration(t){const e=this.config.animation;if(t<=0)return e.min_flow_rate;const i=Math.min(t/e.max_flow_rate_value,1);return e.min_flow_rate-i*(e.min_flow_rate-e.max_flow_rate)}render(){if(!this.config||!this.hass)return W``;const t=this.getHeatPumpState(),e=this.getBufferTankState(),i=this.getHVACState(),o=this.getDHWTankState(),a=this.getG2ValveState(),r=this.getAuxHeaterState(),s=this.getPipeColors(t.outletTemp,t.inletTemp,t.flowRate),n=this.getPipeColors(e.supplyTemp,i.returnTemp,i.flowRate),l=this.getPipeColors(o.inletTemp,o.outletTemp,t.flowRate),h=s.hotPipe,p=s.coldPipe,c=n.hotPipe,d=n.coldPipe,f=l.hotPipe,u=this.getHeatPumpColor(t),m=this.getContrastTextColor(u),g=t.error?126:111,y=r.intensity;let w="#4a5568";if(y>0){const t=74,e=85,i=104,o=255,a=68,r=34;w=`rgb(${Math.round(t+(o-t)*y)}, ${Math.round(e+(a-e)*y)}, ${Math.round(i+(r-i)*y)})`}const _=this.config.aux_heater?.glow_size??8,x=224,$=172,b=x-_,v=$-_,A=60+2*_,S=16+2*_,T=_,k=_,P=x-.75*_,C=$-.75*_,E=60+2*_*.75,H=16+2*_*.75,R=.75*_,M=.75*_,O=x-.5*_,D=$-.5*_,z=60+2*_*.5,V=16+2*_*.5,F=.5*_,U=.5*_,N=y>0?2-1.4*y:2,L=this.config.aux_heater?.shadow_blur??1,B=y>0?"aux-glow-outer":"aux-heater-layer",I=y>0?"aux-glow-middle":"aux-heater-layer",Q=y>0?"aux-glow-inner":"aux-heater-layer",G=y>0?"aux-cylinder-pulse":"";return W`
      <ha-card>
        ${this.config.title?W`<h1 class="card-header">${this.config.title}</h1>`:""}

        <div class="card-content">
          <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG Filter Definitions -->
            <defs>
              <!-- Drop shadow filter for aux heater -->
              <filter id="aux-heater-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000000" flood-opacity="0.5"/>
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
            </defs>

            <!-- Flow Pipes (rendered first so they appear behind entities) -->

            <!-- Pipes with 10px gaps from entities for clean appearance -->
            <!-- CONVENTIONAL: Supply on top (hot), Return on bottom (cold) -->

            <!-- HEATING MODE PIPES (shown when G2 valve is OFF - heating mode) -->
            <!-- Z-ORDER: Return pipes first (behind), then supply pipes (on top) -->

            <!-- Pipe: Buffer to HP (cold return) - BOTTOM - 10px gap from HP - BEHIND -->
            <path id="buffer-to-hp-path"
                  d="M 390 220 L 180 220"
                  stroke="${a.isActive?this.config.temperature?.neutral_color||"#95a5a6":p}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${a.isActive?"0.3":"1"}"/>

            <!-- Pipe: HP to aux heater (first segment) -->
            <!-- Shows water at HP outlet temperature before aux heater boost -->
            <path id="hp-to-aux-heating-path"
                  d="M 180 180 L 254 180"
                  stroke="${h}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${y>0?"0.5":"1"}"/>

            <!-- Pipe: Aux heater to G2 valve (second segment) -->
            <!-- Shows boosted temperature after aux heater adds energy -->
            <path id="aux-to-g2-heating-path"
                  d="M 254 180 L 328 180"
                  stroke="${y>0?this.config.temperature?.hot_color||"#e74c3c":h}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="1"/>

            <!-- Pipe: G2 to Buffer (continuation) - only active in heating mode -->
            <path id="g2-to-buffer-path"
                  d="M 367 180 L 390 180"
                  stroke="${a.isActive?this.config.temperature?.neutral_color||"#95a5a6":h}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${a.isActive?"0.3":"1"}"/>

            <!-- DHW MODE PIPES (shown when G2 valve is ON - DHW mode) -->
            <!-- Z-ORDER: Return pipes first (behind), then supply pipes (on top) -->

            <!-- Pipe: DHW outlet to HP return (BOTTOM) - Separated horizontally at x=370 - BEHIND -->
            <path id="dhw-to-hp-return-path"
                  d="M 418 470 L 370 470 L 370 220 L 180 220"
                  stroke="${a.isActive?p:this.config.temperature?.neutral_color||"#95a5a6"}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${a.isActive?"1":"0.3"}"/>

            <!-- Pipe: G2 valve down to DHW tank inlet (supply to coil) - At x=348, horizontally separated from return -->
            <path id="g2-to-dhw-path"
                  d="M 348 195 L 348 370 L 418 370"
                  stroke="${a.isActive?f:this.config.temperature?.neutral_color||"#95a5a6"}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${a.isActive?"1":"0.3"}"/>

            <!-- DHW coil spiral path (for flow animation) - Matches actual tank coil position -->
            <path id="dhw-coil-path"
                  d="M 418 370 Q 438 378, 458 370 Q 438 390, 418 390 Q 438 406, 458 390 Q 438 422, 418 422 Q 438 438, 458 422 Q 438 454, 418 454 Q 438 470, 458 454 Q 438 478, 418 470"
                  stroke="none"
                  stroke-width="0"
                  fill="none"
                  opacity="0"/>

            <!-- Z-ORDER: Return first (behind), supply on top -->
            <!-- Pipe: HVAC to Buffer (cold return) - 10px gap from buffer - BEHIND -->
            <path id="hvac-to-buffer-path"
                  d="M 620 220 L 480 220"
                  stroke="${d}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Pipe: Buffer to HVAC (hot supply) - 10px gap from buffer - ON TOP -->
            <path id="buffer-to-hvac-path"
                  d="M 480 180 L 620 180"
                  stroke="${c}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Temperature and flow rate labels (configurable styling) -->
            <!-- Top row: supply temperatures and flow rate -->
            <text x="260" y="170" text-anchor="middle" fill="${h}"
                  font-size="${this.config.text_style?.font_size||11}"
                  font-family="${this.config.text_style?.font_family||"Courier New, monospace"}"
                  font-weight="${this.config.text_style?.font_weight||"bold"}">
              ${this.config.text_style?.show_labels?`${this.config.labels.hp_supply}: `:""}${this.formatValue(t.outletTemp,1)}°${this.config.temperature?.unit||"C"}
            </text>

            <!-- Flow rate between pipes (HP to G2/Buffer) -->
            <text x="277" y="205" text-anchor="middle" fill="#95a5a6"
                  font-size="${(this.config.text_style?.font_size||11)-1}"
                  font-family="${this.config.text_style?.font_family||"Courier New, monospace"}"
                  font-weight="normal">
              ${this.formatValue(t.flowRate,1)} L/m
            </text>

            <text x="260" y="240" text-anchor="middle" fill="${p}"
                  font-size="${this.config.text_style?.font_size||11}"
                  font-family="${this.config.text_style?.font_family||"Courier New, monospace"}"
                  font-weight="${this.config.text_style?.font_weight||"bold"}">
              ${this.config.text_style?.show_labels?`${this.config.labels.hp_return}: `:""}${this.formatValue(t.inletTemp,1)}°${this.config.temperature?.unit||"C"}
            </text>

            <!-- Supply temp (top) - above supply pipe, centered horizontally -->
            <text x="550" y="170" text-anchor="middle" fill="${c}"
                  font-size="${this.config.text_style?.font_size||11}"
                  font-family="${this.config.text_style?.font_family||"Courier New, monospace"}"
                  font-weight="${this.config.text_style?.font_weight||"bold"}">
              ${this.config.text_style?.show_labels?`${this.config.labels.hvac_supply}: `:""}${this.formatValue(e.supplyTemp,1)}°${this.config.temperature?.unit||"C"}
            </text>

            <!-- Flow rate - centered vertically between pipes, centered horizontally -->
            <text x="550" y="205" text-anchor="middle" fill="#95a5a6"
                  font-size="${(this.config.text_style?.font_size||11)-1}"
                  font-family="${this.config.text_style?.font_family||"Courier New, monospace"}"
                  font-weight="normal">
              ${this.formatValue(i.flowRate,1)} L/m
            </text>

            <!-- Return temp (bottom) - below return pipe, centered horizontally -->
            <text x="550" y="240" text-anchor="middle" fill="${d}"
                  font-size="${this.config.text_style?.font_size||11}"
                  font-family="${this.config.text_style?.font_family||"Courier New, monospace"}"
                  font-weight="${this.config.text_style?.font_weight||"bold"}">
              ${this.config.text_style?.show_labels?`${this.config.labels.hvac_return}: `:""}${this.formatValue(i.returnTemp,1)}°${this.config.temperature?.unit||"C"}
            </text>

            <!-- Heat Pump (left side) -->
            <g id="heat-pump" transform="translate(50, 100)">
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
                ${this.getDisplayMode(t,a)}
              </text>

              <!-- Error indicator -->
              ${t.error?W`
                <text x="60" y="111" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">
                  ⚠ ${t.error}
                </text>
              `:""}

              <!-- Critical metrics inside HP box (2-column: Input | Output) -->
              <!-- Left column: INPUT parameters -->
              <text x="8" y="${g}" fill="${m}" font-size="10" font-weight="bold">IN</text>
              <text x="8" y="${g+14}" fill="${m}" font-size="10">${this.formatValue(t.power/1e3,1)} kW</text>

              <!-- Right column: OUTPUT parameters -->
              <text x="62" y="${g}" fill="${m}" font-size="10" font-weight="bold">OUT</text>
              <text x="62" y="${g+14}" fill="${m}" font-size="10">${this.formatValue(t.thermal/1e3,1)} kW</text>
              <text x="62" y="${g+28}" fill="${m}" font-size="9">COP ${this.formatValue(t.cop,2)}</text>
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
              ${void 0!==t.energy?W`
                <text x="80" y="0" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels.energy}:</text>
                <text x="80" y="16" fill="#16a085" font-size="12">${this.formatValue(t.energy,2)} kWh</text>
              `:""}

              ${void 0!==t.cost?W`
                <text x="80" y="36" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels.cost}:</text>
                <text x="80" y="52" fill="#27ae60" font-size="12">$${this.formatValue(t.cost,2)}</text>
              `:""}
            </g>

            <!-- G2 Diverter Valve (3-way valve between HP and tanks) -->
            <g id="g2-valve" transform="translate(360, 180) scale(0.7)">
              <!-- Valve body - cylindrical with flanges (matching valve idea graphic) -->
              <!-- Left inlet flange -->
              <rect x="-45" y="-8" width="10" height="16" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Main body cylinder -->
              <rect x="-35" y="-12" width="35" height="24" fill="#bdc3c7" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Right outlet flange (to buffer/heating) -->
              <rect x="0" y="-8" width="10" height="16" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Bottom outlet flange (to DHW) - adjusted for better alignment -->
              <rect x="-25" y="12" width="16" height="10" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>

              <!-- Internal flow path visualization with animations -->
              ${a.isActive?W`
                <!-- DHW Mode: Flow DOWN (from left inlet to bottom outlet) -->
                <!-- Active path in red with pulsing animation -->
                <path class="g2-valve-path g2-valve-active-path"
                      d="M -35 0 L -17 0 L -17 12"
                      stroke="${this.config.heat_pump_visual?.dhw_color||"#e74c3c"}"
                      stroke-width="6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
                <!-- Inactive path (to right) shown as X with transition -->
                <path class="g2-valve-path"
                      d="M -17 -8 L 0 8 M -17 8 L 0 -8"
                      stroke="#7f8c8d"
                      stroke-width="2"
                      opacity="0.4"/>
              `:W`
                <!-- Heating Mode: Flow ACROSS (from left inlet to right outlet) -->
                <!-- Active path in green with pulsing animation -->
                <path class="g2-valve-path g2-valve-active-path"
                      d="M -35 0 L 0 0"
                      stroke="#16a085"
                      stroke-width="6"
                      fill="none"
                      stroke-linecap="round"/>
                <!-- Inactive path (to bottom) shown as X with transition -->
                <path class="g2-valve-path"
                      d="M -25 4 L -9 20 M -9 4 L -25 20"
                      stroke="#7f8c8d"
                      stroke-width="2"
                      opacity="0.4"/>
              `}

              <!-- Valve label -->
              <text x="-17" y="-20" text-anchor="middle" fill="#2c3e50" font-size="10" font-weight="bold">
                G2
              </text>
            </g>

            <!-- Improved Buffer Tank (center) -->
            <g id="buffer-tank" transform="translate(390, 100)">
              <!-- Tank cylinder body - reduced from 160 to 140 height -->
              <rect x="10" y="20" width="70" height="140" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap - reduced from rx=40 to rx=35 -->
              <ellipse cx="45" cy="20" rx="35" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="45" cy="160" rx="35" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              <!-- Thermal stratification (tank is 100% full, hot rises to top) -->
              <!-- Top section (hottest - supply temp) -->
              <rect x="15" y="25" width="60" height="30" fill="${c}" opacity="0.9"/>

              <!-- Upper-middle section (warm) -->
              <rect x="15" y="55" width="60" height="35" fill="${c}" opacity="0.7"/>

              <!-- Lower-middle section (cooling) -->
              <rect x="15" y="90" width="60" height="35" fill="${d}" opacity="0.7"/>

              <!-- Bottom section (coldest - return temp) -->
              <rect x="15" y="125" width="60" height="30" fill="${d}" opacity="0.9"/>

              <!-- Structural bands -->
              <line x1="10" y1="55" x2="80" y2="55" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="90" x2="80" y2="90" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="125" x2="80" y2="125" stroke="#2c3e50" stroke-width="2"/>

              <!-- Tank label inside top section -->
              <text x="45" y="42" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                ${this.config.labels.buffer_tank}
              </text>
            </g>

            <!-- DHW (Domestic Hot Water) Tank with Coil (center-bottom) -->
            <g id="dhw-tank" transform="translate(390, 330)">
              <!-- Tank cylinder body - reduced from 160 to 140 height -->
              <rect x="10" y="20" width="70" height="140" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap - reduced from rx=40 to rx=35 -->
              <ellipse cx="45" cy="20" rx="35" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="45" cy="160" rx="35" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              <!-- Inner cylinder (DHW water - always blue/cold) -->
              <rect x="15" y="25" width="60" height="130" fill="#3498db" opacity="0.3"/>

              <!-- Heating coil inside tank (spiral) - complete path from inlet to outlet -->
              <!-- Outer glow layer - pulsing when active -->
              <path d="M 28 40 Q 45 48, 62 40 Q 45 60, 28 60 Q 45 76, 62 60 Q 45 92, 28 92 Q 45 108, 62 92 Q 45 124, 28 124 Q 45 132, 62 124 Q 45 140, 28 140"
                    stroke="${f}"
                    stroke-width="10"
                    fill="none"
                    class="${a.isActive?"dhw-coil-glow-outer":"dhw-coil-glow-layer"}"
                    pointer-events="none"/>
              <!-- Inner glow layer - pulsing when active -->
              <path d="M 28 40 Q 45 48, 62 40 Q 45 60, 28 60 Q 45 76, 62 60 Q 45 92, 28 92 Q 45 108, 62 92 Q 45 124, 28 124 Q 45 132, 62 124 Q 45 140, 28 140"
                    stroke="${f}"
                    stroke-width="7"
                    fill="none"
                    class="${a.isActive?"dhw-coil-glow-inner":"dhw-coil-glow-layer"}"
                    pointer-events="none"/>
              <!-- Main coil path -->
              <path d="M 28 40 Q 45 48, 62 40 Q 45 60, 28 60 Q 45 76, 62 60 Q 45 92, 28 92 Q 45 108, 62 92 Q 45 124, 28 124 Q 45 132, 62 124 Q 45 140, 28 140"
                    stroke="${a.isActive?f:this.config.temperature?.neutral_color||"#95a5a6"}"
                    stroke-width="4"
                    fill="none"
                    opacity="${a.isActive?"0.9":"0.3"}"/>

              <!-- Coil inlet/outlet markers - 100px vertical span -->
              <circle cx="28" cy="40" r="3" fill="${a.isActive?f:this.config.temperature?.neutral_color||"#95a5a6"}"/>
              <circle cx="28" cy="140" r="3" fill="${a.isActive?f:this.config.temperature?.neutral_color||"#95a5a6"}"/>

              <!-- Structural bands -->
              <line x1="10" y1="55" x2="80" y2="55" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="90" x2="80" y2="90" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="125" x2="80" y2="125" stroke="#2c3e50" stroke-width="2"/>

              <!-- Tank label inside top section -->
              <text x="45" y="42" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                ${this.config.labels.dhw_tank}
              </text>

              <!-- Tank temperature if available -->
              ${o.tankTemp?W`
                <text x="45" y="180" text-anchor="middle" fill="#3498db" font-size="11" font-weight="bold">
                  Tank: ${this.formatValue(o.tankTemp,1)}°${this.config.temperature?.unit||"C"}
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
                ${this.formatValue(i.thermal,0)} W
              </text>
            </g>

            <!-- Auxiliary Heater - Glowing cylinder with animated pulsing glow -->
            <!-- Centered between HP outlet (180) and G2 inlet (328) = 254 -->
            <!-- Glow size configurable via aux_heater.glow_size (default: 8px) -->
            <!-- Animation speed increases with power level for visual feedback -->
            <!-- Shadow blur configurable via aux_heater.shadow_blur (default: 1.0) -->
            <g id="aux-heater"
               opacity="${r.enabled?"1":"0"}"
               style="--aux-anim-speed: ${N}s; --aux-shadow-blur: ${L};">
              <!-- Glow layers - simple solid colors with CSS pulsing animation -->
              <!-- Outermost glow layer - size based on config -->
              <rect x="${b}" y="${v}"
                    width="${A}" height="${S}"
                    rx="${T}" ry="${k}"
                    class="${B}"
                    fill="#ff4422"
                    pointer-events="none"/>

              <!-- Middle glow layer - size based on config -->
              <rect x="${P}" y="${C}"
                    width="${E}" height="${H}"
                    rx="${R}" ry="${M}"
                    class="${I}"
                    fill="#ff6644"
                    pointer-events="none"/>

              <!-- Inner glow layer - size based on config -->
              <rect x="${O}" y="${D}"
                    width="${z}" height="${V}"
                    rx="${F}" ry="${U}"
                    class="${Q}"
                    fill="#ff8855"
                    pointer-events="none"/>

              <!-- Main heated cylinder (centered at x=254) -->
              <rect x="${x}" y="${$}" width="${60}" height="${16}" rx="2" ry="2"
                    class="${G}"
                    fill="${w}"
                    stroke="#2d3748"
                    stroke-width="1.5"/>
            </g>

            <!-- Version display (upper right corner) -->
            <text x="790" y="15" text-anchor="end" fill="#95a5a6" font-size="10" opacity="0.7">
              v${dt}
            </text>

            <!-- Flow dots created programmatically in firstUpdated() -->
          </svg>
        </div>
      </ha-card>
    `}static get styles(){return ut}getCardSize(){return 5}},e([pt({attribute:!1})],t.HeatPumpFlowCard.prototype,"hass",void 0),e([function(t){return pt({...t,state:!0,attribute:!1})}()],t.HeatPumpFlowCard.prototype,"config",void 0),e([ct("#hp-to-buffer-flow")],t.HeatPumpFlowCard.prototype,"hpToBufferFlow",void 0),e([ct("#buffer-to-hp-flow")],t.HeatPumpFlowCard.prototype,"bufferToHpFlow",void 0),e([ct("#buffer-to-hvac-flow")],t.HeatPumpFlowCard.prototype,"bufferToHvacFlow",void 0),e([ct("#hvac-to-buffer-flow")],t.HeatPumpFlowCard.prototype,"hvacToBufferFlow",void 0),t.HeatPumpFlowCard=e([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("heat-pump-flow-card")],t.HeatPumpFlowCard),window.customCards=window.customCards||[],window.customCards.push({type:"heat-pump-flow-card",name:"Heat Pump Flow Card",description:"Animated heat pump flow visualization card",preview:!0,documentationURL:"https://github.com/YOUR_USERNAME/heat-pump-flow-card"}),window.findHeatPumpCard=function(t=document){const e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);let i;for(;i=e.nextNode();){if("HEAT-PUMP-FLOW-CARD"===i.tagName)return i;if(i.shadowRoot){const t=window.findHeatPumpCard(i.shadowRoot);if(t)return t}}return null},t}({});
//# sourceMappingURL=heat-pump-flow-card.js.map
