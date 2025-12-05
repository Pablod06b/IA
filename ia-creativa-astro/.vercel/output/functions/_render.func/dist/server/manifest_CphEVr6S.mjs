import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_CL3fKNsP.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BdILfGlJ.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/","cacheDir":"file:///Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/node_modules/.astro/","outDir":"file:///Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/dist/","srcDir":"file:///Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/","publicDir":"file:///Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/public/","buildClientDir":"file:///Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/dist/client/","buildServerDir":"file:///Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"aviso-legal/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/aviso-legal","isIndex":false,"type":"page","pattern":"^\\/aviso-legal\\/?$","segments":[[{"content":"aviso-legal","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/aviso-legal.astro","pathname":"/aviso-legal","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"politica-de-privacidad/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/politica-de-privacidad","isIndex":false,"type":"page","pattern":"^\\/politica-de-privacidad\\/?$","segments":[[{"content":"politica-de-privacidad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politica-de-privacidad.astro","pathname":"/politica-de-privacidad","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/subscribe","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/subscribe\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"subscribe","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/subscribe.ts","pathname":"/api/subscribe","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://ia-creativa-astro.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/pages/admin.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/pages/aviso-legal.astro",{"propagation":"none","containsHead":true}],["/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/pages/politica-de-privacidad.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/subscribe@_@ts":"pages/api/subscribe.astro.mjs","\u0000@astro-page:src/pages/aviso-legal@_@astro":"pages/aviso-legal.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/politica-de-privacidad@_@astro":"pages/politica-de-privacidad.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CphEVr6S.mjs","/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Bis6mPeA.mjs","/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_vtTo4LNj.mjs","/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/pages/admin.astro?astro&type=script&index=0&lang.ts":"_astro/admin.astro_astro_type_script_index_0_lang.ClYIQhV0.js","/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/pages/admin.astro?astro&type=script&index=1&lang.ts":"_astro/admin.astro_astro_type_script_index_1_lang.DDCNxuYb.js","/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.f_HHG0AV.js","/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/components/NewsletterForm.astro?astro&type=script&index=0&lang.ts":"_astro/NewsletterForm.astro_astro_type_script_index_0_lang.CQCg7x_X.js","/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.DCq6E4Ld.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts","const l=document.getElementById(\"blog-search\"),a=document.querySelectorAll(\".article-item\"),n=document.getElementById(\"no-results\");l&&l.addEventListener(\"input\",o=>{const t=o.target.value.toLowerCase();let s=!1;a.forEach(e=>{const c=e.getAttribute(\"data-title\")||\"\",d=e.getAttribute(\"data-desc\")||\"\";c.includes(t)||d.includes(t)?(e.style.display=\"block\",s=!0):e.style.display=\"none\"}),n&&n.classList.toggle(\"hidden\",s)});"],["/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/components/NewsletterForm.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"newsletter-form\"),t=document.getElementById(\"form-message\");s&&s.addEventListener(\"submit\",async r=>{r.preventDefault();const n=new FormData(s),e=s.querySelector(\"button\");e&&(e.disabled=!0,e.textContent=\"Enviando...\");try{const o=await fetch(\"/api/subscribe\",{method:\"POST\",body:n}),a=await o.json();if(o.ok)t.textContent=\"¡Gracias por suscribirte! Revisa tu correo.\",t.classList.remove(\"hidden\",\"text-red-400\"),t.classList.add(\"text-green-400\"),s.reset();else throw new Error(a.message||\"Error desconocido\")}catch(o){t.textContent=o.message||\"Hubo un error. Inténtalo de nuevo.\",t.classList.remove(\"hidden\",\"text-green-400\"),t.classList.add(\"text-red-400\")}finally{e&&(e.disabled=!1,e.textContent=\"Suscribirme\")}});"],["/Users/administrador/Desktop/Trabajo/IA_2/ia-creativa-astro/src/components/Header.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"menu-button\"),n=document.getElementById(\"main-nav\"),t=document.getElementById(\"icon-menu\"),o=document.getElementById(\"icon-close\");e&&n&&t&&o&&e.addEventListener(\"click\",()=>{n.classList.toggle(\"hidden\"),t.classList.toggle(\"hidden\"),o.classList.toggle(\"hidden\")});"]],"assets":["/_astro/about.DpQ6_lkK.css","/robots.txt","/_astro/admin.astro_astro_type_script_index_0_lang.ClYIQhV0.js","/_astro/admin.astro_astro_type_script_index_1_lang.DDCNxuYb.js","/admin/config.yml","/imagenes/Gemini_Generated_Image_u1rdj9u1rdj9u1rd.png","/imagenes/chatgpt-vs-gemini-vs-claude.png","/imagenes/ganar-dinero-ia.png","/imagenes/marketing-sin-rostro.png","/about/index.html","/admin/index.html","/aviso-legal/index.html","/blog/index.html","/contact/index.html","/politica-de-privacidad/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"v3rWVjkK/jjM60E5JLp6DZRv/o8Aqabnxt0FwEohpg0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
