var HeatPumpFlowCard=function(t){"use strict";function e(t,e,i,o){var s,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,i,n):s(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,o=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,m=f.trustedTypes,g=m?m.emptyScript:"",_=f.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&h(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(o)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of e){const e=document.createElement("style"),s=i.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=o.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=o;const r=s.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const o=this.constructor,s=this[t];if(i??=o.getPropertyOptions(t),!((i.hasChanged??w)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[y("elementProperties")]=new Map,A[y("finalized")]=new Map,_?.({ReactiveElement:A}),(f.reactiveElementVersions??=[]).push("2.1.1");const v=globalThis,S=v.trustedTypes,x=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,F=`<${E}>`,H=document,T=()=>H.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,k=Array.isArray,V="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,M=/>/g,z=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),q=new WeakMap,W=H.createTreeWalker(H,129);function Q(t,e){if(!k(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,o=[];let s,r=2===e?"<svg>":3===e?"<math>":"",n=U;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===U?"!--"===l[1]?n=O:void 0!==l[1]?n=M:void 0!==l[2]?(L.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=z):void 0!==l[3]&&(n=z):n===z?">"===l[0]?(n=s??U,h=-1):void 0===l[1]?h=-2:(h=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?z:'"'===l[3]?D:N):n===D||n===N?n=z:n===O||n===M?n=U:(n=z,s=void 0);const d=n===z&&t[e+1].startsWith("/>")?" ":"";r+=n===U?i+F:h>=0?(o.push(a),i.slice(0,h)+P+i.slice(h)+C+d):i+C+(-2===h?e:d)}return[Q(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class J{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[l,h]=G(t,e);if(this.el=J.createElement(l,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=W.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(P)){const e=h[r++],i=o.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:X}),o.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(L.test(o.tagName)){const t=o.textContent.split(C),e=t.length-1;if(e>0){o.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],T()),W.nextNode(),a.push({type:2,index:++s});o.append(t[e],T())}}}else if(8===o.nodeType)if(o.data===E)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(C,t+1));)a.push({type:7,index:s}),t+=C.length-1}s++}}static createElement(t,e){const i=H.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,o){if(e===I)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const r=R(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=K(t,s._$AS(t,e.values),s,o)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??H).importNode(e,!0);W.currentNode=o;let s=W.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Y(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new ot(s,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(s=W.nextNode(),r++)}return W.currentNode=H,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),R(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>k(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==j&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new Z(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}k(t){k(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new Y(this.O(T()),this.O(T()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}_$AI(t,e=this,i,o){const s=this.strings;let r=!1;if(void 0===s)t=K(this,t,e,0),r=!R(t)||t!==this._$AH&&t!==I,r&&(this._$AH=t);else{const o=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=K(this,o[i+n],e,n),a===I&&(a=this._$AH[n]),r||=!R(a)||a!==this._$AH[n],a===j?t=j:t!==j&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!o&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==j)}}class it extends X{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??j)===I)return;const i=this._$AH,o=t===j&&i!==j||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==j&&(i===j||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const st=v.litHtmlPolyfillSupport;st?.(J,Y),(v.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;class nt extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new Y(e.insertBefore(T(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.1");const lt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:w},ht=(t=lt,e,i)=>{const{kind:o,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t)}}throw Error("Unsupported decorator location: "+o)};function ct(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function dt(t,e){return(e,i,o)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const pt=(new Date).toISOString(),ut=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(i,t,s)})`
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

  /* Animation for dots */
  circle {
    filter: drop-shadow(0 0 4px currentColor);
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
`;return console.info(`%c  HEAT-PUMP-FLOW-CARD  \n%c  Version 0.12.0  \n%c  Built: ${pt}  `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray","color: #95a5a6; font-weight: normal; background: dimgray"),t.HeatPumpFlowCard=class extends nt{constructor(){super(...arguments),this.fanRotation=0,this.cachedFanSpeed=0,this.cachedFlowConfig={},this.frameCount=0}static getConfigElement(){}static getStubConfig(){return{type:"custom:heat-pump-flow-card",title:"Heat Pump Flow"}}setConfig(t){if(!t)throw new Error("Invalid configuration");const{animation:e,temperature:i,display:o,heat_pump_visual:s,labels:r,...n}=t;this.config={...n,animation:{min_flow_rate:5,max_flow_rate:1,max_flow_rate_value:50,dot_size:8,dot_spacing:30,use_temp_color:!0,dot_color:"#3498db",dot_stroke_color:"white",dot_stroke_width:1.5,dot_opacity:1,dot_shadow:!0,...e},temperature:{delta_threshold:10,hot_color:"#e74c3c",cold_color:"#3498db",neutral_color:"#95a5a6",unit:"C",...i},display:{show_values:!0,show_labels:!0,show_icons:!0,compact:!1,decimal_places:1,...o},heat_pump_visual:{off_color:"#95a5a6",heating_color:"#e74c3c",cooling_color:"#3498db",dhw_color:"#e67e22",defrost_color:"#f1c40f",show_metrics:!0,animate_fan:!0,...s},labels:{hp_supply:"HP Supply",hp_return:"HP Return",hvac_supply:"HVAC Supply",hvac_return:"HVAC Return",buffer_tank:"BUFFER",dhw_tank:"DHW",power_in:"Power In",thermal_out:"Thermal Out",cop:"COP",flow:"Flow",energy:"Energy",cost:"Cost",...r}}}updated(t){if(super.updated(t),t.has("hass")&&this.hass){this.updateAnimations();const t=this.getHeatPumpState(),e=this.getHVACState(),i=this.getBufferTankState();this.cachedFanSpeed=t.fanSpeed||0;const o=this.config.animation.use_temp_color,s=this.config.animation.dot_color,r=this.getPipeColors(t.outletTemp,t.inletTemp,t.flowRate),n=this.getPipeColors(i.supplyTemp,e.returnTemp,e.flowRate);this.cachedFlowConfig={"hp-to-buffer-path":{flowRate:t.flowRate,temp:t.outletTemp,duration:this.getAnimationDuration(t.flowRate),color:o?r.hotPipe:s},"buffer-to-hp-path":{flowRate:t.flowRate,temp:t.inletTemp,duration:this.getAnimationDuration(t.flowRate),color:o?r.coldPipe:s},"buffer-to-hvac-path":{flowRate:e.flowRate,temp:i.supplyTemp,duration:this.getAnimationDuration(e.flowRate),color:o?n.hotPipe:s},"hvac-to-buffer-path":{flowRate:e.flowRate,temp:e.returnTemp,duration:this.getAnimationDuration(e.flowRate),color:o?n.coldPipe:s}}}}firstUpdated(){this.createFlowDots(),setTimeout(()=>{this.startAnimationLoop(),this.config.heat_pump_visual?.animate_fan&&this.startFanAnimation()},100)}startFanAnimation(){const t=()=>{const e=this.shadowRoot?.querySelector("#fan-blades");if(e){if(this.cachedFanSpeed>0){const t=this.cachedFanSpeed/100*6;this.fanRotation=(this.fanRotation+t)%360,e.setAttribute("transform",`rotate(${this.fanRotation} 60 40)`)}requestAnimationFrame(t)}else requestAnimationFrame(t)};t()}createFlowDots(){const t=this.shadowRoot?.querySelector("svg");if(!t)return;const e=this.getHeatPumpState(),i=this.getBufferTankState(),o=this.getHVACState(),s=this.config.animation.use_temp_color,r=this.config.animation.dot_color,n=this.getPipeColors(e.outletTemp,e.inletTemp,e.flowRate),a=this.getPipeColors(i.supplyTemp,o.returnTemp,o.flowRate);[{id:"hp-to-buffer-path",color:s?n.hotPipe:r},{id:"buffer-to-hp-path",color:s?n.coldPipe:r},{id:"buffer-to-hvac-path",color:s?a.hotPipe:r},{id:"hvac-to-buffer-path",color:s?a.coldPipe:r}].forEach(e=>{for(let i=0;i<5;i++){const o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("data-path-id",e.id),o.setAttribute("data-index",i.toString()),o.setAttribute("cx","0"),o.setAttribute("cy","0"),o.setAttribute("r",this.config.animation.dot_size.toString()),o.setAttribute("fill",e.color),o.setAttribute("stroke",this.config.animation.dot_stroke_color),o.setAttribute("stroke-width",this.config.animation.dot_stroke_width.toString()),o.setAttribute("opacity",this.config.animation.dot_opacity.toString()),this.config.animation.dot_shadow&&o.setAttribute("filter","drop-shadow(0px 0px 2px rgba(0,0,0,0.3))"),t.appendChild(o)}})}startAnimationLoop(){const t=()=>{const e=this.shadowRoot?.querySelectorAll("circle[data-path-id]");if(!e||0===e.length)return void(this.animationFrameId=requestAnimationFrame(t));const i=Date.now()/1e3;e.forEach(t=>{const e=t.dataset.pathId,o=parseInt(t.dataset.index||"0");if(!e)return;const s=this.cachedFlowConfig[e];if(!s)return;const r=this.shadowRoot?.querySelector(`#${e}`);if(!r)return;const n=r.getTotalLength();t.getAttribute("fill")!==s.color&&t.setAttribute("fill",s.color);const a=t.getAttribute("opacity"),l=s.flowRate<=0?"0":this.config.animation.dot_opacity.toString();a!==l&&t.setAttribute("opacity",l);const h=.2*o*s.duration,c=(i+h)%s.duration/s.duration*n,d=r.getPointAtLength(c);t.setAttribute("cx",d.x.toString()),t.setAttribute("cy",d.y.toString())}),this.animationFrameId=requestAnimationFrame(t)};t()}disconnectedCallback(){super.disconnectedCallback(),this.animationFrameId&&cancelAnimationFrame(this.animationFrameId)}getHeatPumpState(){const t=this.config.heat_pump||{};return{power:this.getStateValue(t.power_entity)||0,thermal:this.getStateValue(t.thermal_entity)||0,cop:this.getStateValue(t.cop_entity)||0,outletTemp:this.getStateValue(t.outlet_temp_entity)||0,inletTemp:this.getStateValue(t.inlet_temp_entity)||0,flowRate:this.getStateValue(t.flow_rate_entity)||0,fanSpeed:this.getStateValue(t.fan_speed_entity),mode:this.getStateString(t.mode_entity),modeDisplay:this.getStateString(t.mode_display_entity),defrost:"on"===this.getStateString(t.defrost_entity),error:this.getStateString(t.error_entity),energy:this.getStateValue(t.energy_entity),cost:this.getStateValue(t.cost_entity),runtime:this.getStateValue(t.runtime_entity)}}getStateString(t){if(!t||!this.hass)return;const e=this.hass.states[t];return e?.state}getBufferTankState(){const t=this.config.buffer_tank||{};return{supplyTemp:this.getStateValue(t.supply_temp_entity)||0,returnTemp:this.getStateValue(t.return_temp_entity)||0,level:this.getStateValue(t.level_entity)}}getHVACState(){const t=this.config.hvac||{};return{thermal:this.getStateValue(t.thermal_entity)||0,flowRate:this.getStateValue(t.flow_rate_entity)||0,supplyTemp:this.getStateValue(t.supply_temp_entity)||0,returnTemp:this.getStateValue(t.return_temp_entity)||0}}getDHWTankState(){const t=this.config.dhw_tank||{};return{inletTemp:this.getStateValue(t.inlet_temp_entity)||0,outletTemp:this.getStateValue(t.outlet_temp_entity)||0,tankTemp:this.getStateValue(t.tank_temp_entity)}}getG2ValveState(){const t=this.config.g2_valve||{},e=this.getStateString(t.state_entity);return{isActive:"on"===e||"true"===e||"1"===e}}getStateValue(t){if(!t||!this.hass)return;const e=this.hass.states[t];if(!e)return;const i=parseFloat(e.state);return isNaN(i)?void 0:i}getStateUnit(t){if(!t||!this.hass)return"";const e=this.hass.states[t];return e?.attributes?.unit_of_measurement||""}formatValue(t,e=1){return void 0===t?"N/A":t.toFixed(e)}getPipeColors(t,e,i){const o=this.config.temperature,s=Math.abs(t-e);return i<=0||s<o.delta_threshold?{hotPipe:o.neutral_color,coldPipe:o.neutral_color}:t>e?{hotPipe:o.hot_color,coldPipe:o.cold_color}:{hotPipe:o.cold_color,coldPipe:o.hot_color}}hexToRgb(t){const e={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#008000",blue:"#0000FF",yellow:"#FFFF00",cyan:"#00FFFF",magenta:"#FF00FF",orange:"#FFA500",purple:"#800080",pink:"#FFC0CB",brown:"#A52A2A",gray:"#808080",grey:"#808080"}[t.toLowerCase()]||t,i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return i?{r:parseInt(i[1],16),g:parseInt(i[2],16),b:parseInt(i[3],16)}:{r:0,g:0,b:0}}getHeatPumpColor(t){const e=this.config.heat_pump_visual;if(t.defrost)return e.defrost_color;if(t.power<=0)return e.off_color;const i=t.mode?.toLowerCase();return i?.includes("heat")?e.heating_color:i?.includes("cool")?e.cooling_color:i?.includes("dhw")||i?.includes("hot water")?e.dhw_color:e.off_color}getAnimationDuration(t){const e=this.config.animation;if(t<=0)return e.min_flow_rate;const i=Math.min(t/e.max_flow_rate_value,1);return e.min_flow_rate-i*(e.min_flow_rate-e.max_flow_rate)}updateAnimations(){const t=this.getHeatPumpState(),e=this.getHVACState();this.updateFlowSpeed(this.hpToBufferFlow,t.flowRate),this.updateFlowSpeed(this.bufferToHpFlow,t.flowRate),this.updateFlowSpeed(this.bufferToHvacFlow,e.flowRate),this.updateFlowSpeed(this.hvacToBufferFlow,e.flowRate)}updateFlowSpeed(t,e){if(!t)return;this.getAnimationDuration(e);t.querySelectorAll("circle").forEach((t,i)=>{t.style.opacity=e<=0?"0":"0.9"})}render(){if(!this.config||!this.hass)return B``;const t=this.getHeatPumpState(),e=this.getBufferTankState(),i=this.getHVACState(),o=this.getPipeColors(t.outletTemp,t.inletTemp,t.flowRate),s=this.getPipeColors(e.supplyTemp,i.returnTemp,i.flowRate),r=o.hotPipe,n=o.coldPipe,a=s.hotPipe,l=s.coldPipe;return B`
      <ha-card>
        ${this.config.title?B`<h1 class="card-header">${this.config.title}</h1>`:""}

        <div class="card-content">
          <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            <!-- Flow Pipes (rendered first so they appear behind entities) -->

            <!-- Simplified: Always show heating mode pipes (DHW functionality to be added later if needed) -->
            <!-- Pipe: HP to Buffer (hot) -->
            <path id="hp-to-buffer-path"
                  d="M 170 180 L 350 180"
                  stroke="${r}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Pipe: Buffer to HP (cold return) -->
            <path id="buffer-to-hp-path"
                  d="M 350 220 L 170 220"
                  stroke="${n}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Pipe: Buffer to HVAC (hot) -->
            <path id="buffer-to-hvac-path"
                  d="M 450 180 L 630 180"
                  stroke="${a}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Pipe: HVAC to Buffer (cold return) -->
            <path id="hvac-to-buffer-path"
                  d="M 630 220 L 450 220"
                  stroke="${l}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Temperature labels -->
            <text x="260" y="170" text-anchor="middle" fill="${r}" font-size="11" font-weight="bold">
              ${this.config.labels.hp_supply}: ${this.formatValue(t.outletTemp,1)}°${this.config.temperature?.unit||"C"}
            </text>

            <text x="260" y="240" text-anchor="middle" fill="${n}" font-size="11" font-weight="bold">
              ${this.config.labels.hp_return}: ${this.formatValue(t.inletTemp,1)}°${this.config.temperature?.unit||"C"}
            </text>

            <text x="540" y="170" text-anchor="middle" fill="${a}" font-size="11" font-weight="bold">
              ${this.config.labels.hvac_supply}: ${this.formatValue(e.supplyTemp,1)}°${this.config.temperature?.unit||"C"}
            </text>

            <text x="540" y="240" text-anchor="middle" fill="${l}" font-size="11" font-weight="bold">
              ${this.config.labels.hvac_return}: ${this.formatValue(i.returnTemp,1)}°${this.config.temperature?.unit||"C"}
            </text>

            <!-- Heat Pump (left side) -->
            <g id="heat-pump" transform="translate(50, 100)">
              <!-- Heat pump body with state-based color -->
              <rect width="120" height="150" rx="10" fill="${this.getHeatPumpColor(t)}" fill-opacity="0.2" stroke="${this.getHeatPumpColor(t)}" stroke-width="3"/>

              <!-- Fan housing -->
              <circle cx="60" cy="40" r="30" fill="#34495e" stroke="${this.getHeatPumpColor(t)}" stroke-width="2"/>

              <!-- Fan blades (will be animated) -->
              <g id="fan-blades" transform-origin="60 40">
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
                ${t.mode?.toUpperCase()||"OFF"}
              </text>

              <!-- Error indicator -->
              ${t.error?B`
                <text x="60" y="100" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">
                  ⚠ ${t.error}
                </text>
              `:""}
            </g>

            <!-- Heat Pump Metrics (always visible - Lit conditional rendering doesn't work for SVG text) -->
            <g id="hp-metrics" transform="translate(50, 265)">
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
              ${void 0!==t.energy?B`
                <text x="80" y="0" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels.energy}:</text>
                <text x="80" y="16" fill="#16a085" font-size="12">${this.formatValue(t.energy,2)} kWh</text>
              `:""}

              ${void 0!==t.cost?B`
                <text x="80" y="36" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels.cost}:</text>
                <text x="80" y="52" fill="#27ae60" font-size="12">$${this.formatValue(t.cost,2)}</text>
              `:""}
            </g>

            <!-- Buffer Tank (center) -->
            <g id="buffer-tank" transform="translate(350, 100)">
              <ellipse cx="50" cy="100" rx="60" ry="100" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>
              <ellipse cx="50" cy="100" rx="55" ry="95" fill="#95a5a6"/>
              <!-- Water level indicator -->
              <rect x="5" y="110" width="90" height="80" fill="${a}" opacity="0.7"/>
              <text x="50" y="70" text-anchor="middle" fill="white" font-size="14" font-weight="bold">
                ${this.config.labels.buffer_tank}
              </text>
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
              <text x="60" y="75" text-anchor="middle" fill="#95a5a6" font-size="12">
                Flow: ${this.formatValue(i.flowRate,1)} L/min
              </text>
            </g>

            <!-- Flow dots created programmatically in firstUpdated() -->
          </svg>
        </div>
      </ha-card>
    `}static get styles(){return ut}getCardSize(){return 5}},e([ct({attribute:!1})],t.HeatPumpFlowCard.prototype,"hass",void 0),e([function(t){return ct({...t,state:!0,attribute:!1})}()],t.HeatPumpFlowCard.prototype,"config",void 0),e([dt("#hp-to-buffer-flow")],t.HeatPumpFlowCard.prototype,"hpToBufferFlow",void 0),e([dt("#buffer-to-hp-flow")],t.HeatPumpFlowCard.prototype,"bufferToHpFlow",void 0),e([dt("#buffer-to-hvac-flow")],t.HeatPumpFlowCard.prototype,"bufferToHvacFlow",void 0),e([dt("#hvac-to-buffer-flow")],t.HeatPumpFlowCard.prototype,"hvacToBufferFlow",void 0),t.HeatPumpFlowCard=e([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("heat-pump-flow-card")],t.HeatPumpFlowCard),window.customCards=window.customCards||[],window.customCards.push({type:"heat-pump-flow-card",name:"Heat Pump Flow Card",description:"Animated heat pump flow visualization card",preview:!0,documentationURL:"https://github.com/YOUR_USERNAME/heat-pump-flow-card"}),t}({});
//# sourceMappingURL=heat-pump-flow-card.js.map
