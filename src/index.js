var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

var AGENT_LINK_HEADERS = [
  '<https://theiamproject.net/.well-known/api-catalog>; rel="api-catalog"',
  '<https://theiamproject.net/.well-known/oauth-authorization-server>; rel="oauth-authorization-server"',
  '<https://theiamproject.net/.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
  '<https://theiamproject.net/.well-known/openid-configuration>; rel="openid-configuration"',
  '<https://theiamproject.net/.well-known/mcp/server-card.json>; rel="mcp-server-card"',
  '<https://theiamproject.net/.well-known/agent-skills/index.json>; rel="agent-skills"',
  '<https://theiamproject.net/auth.md>; rel="auth-md"',
  '<https://theiamproject.net/sitemap.xml>; rel="sitemap"',
  '<https://theiamproject.net/robots.txt>; rel="robots"'
].join(", ");

var BASE_URL = "https://theiamproject.net";

var ROBOTS_TXT = "# robots.txt for theiamproject.net\nContent-Signal: ai-train=no, search=yes, ai-input=no\nUser-agent: *\nAllow: /\nDisallow: /admin/\nUser-agent: GPTBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: Googlebot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: Bytespider\nDisallow: /\nUser-agent: CCBot\nDisallow: /\nSitemap: " + BASE_URL + "/sitemap.xml\n";

var SITEMAP_XML = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>' + BASE_URL + '/</loc><lastmod>2026-08-04</lastmod><priority>1.0</priority></url>\n  <url><loc>' + BASE_URL + '/auth.md</loc><lastmod>2026-08-04</lastmod><priority>0.8</priority></url>\n</urlset>\n';

var API_CATALOG = JSON.stringify({ linkset: [{ anchor: BASE_URL + "/api", "service-desc": [{ href: BASE_URL + "/api/openapi.json" }], status: [{ href: BASE_URL + "/api/health" }] }] }, null, 2);
var OAUTH_AUTH_SERVER = JSON.stringify({ issuer: BASE_URL, authorization_endpoint: BASE_URL + "/oauth/authorize", token_endpoint: BASE_URL + "/oauth/token", jwks_uri: BASE_URL + "/.well-known/jwks.json", registration_endpoint: BASE_URL + "/oauth/register", grant_types_supported: ["authorization_code", "refresh_token", "client_credentials"], scopes_supported: ["read", "write", "admin"] }, null, 2);
var OAUTH_PROTECTED_RESOURCE = JSON.stringify({ resource: BASE_URL, authorization_servers: [BASE_URL], scopes_supported: ["read", "write", "admin"] }, null, 2);
var OPENID_CONFIG = JSON.stringify({ issuer: BASE_URL, authorization_endpoint: BASE_URL + "/oauth/authorize", token_endpoint: BASE_URL + "/oauth/token", userinfo_endpoint: BASE_URL + "/oauth/userinfo", jwks_uri: BASE_URL + "/.well-known/jwks.json", grant_types_supported: ["authorization_code", "refresh_token"], response_types_supported: ["code"], subject_types_supported: ["public"], id_token_signing_alg_values_supported: ["RS256"], scopes_supported: ["openid", "read", "write", "admin"] }, null, 2);
var AUTH_MD = "# Agent Authentication\n\nRegister at: " + BASE_URL + "/oauth/register\n\n## Supported Identity Types\n- api_key\n- oauth_token\n- did\n\n## Authentication Flow\n1. Discover OAuth metadata at /.well-known/oauth-authorization-server\n2. Register at /oauth/register\n3. Request token from /oauth/token\n4. Include Bearer token in Authorization header\n";
var MCP_SERVER_CARD = JSON.stringify({ serverInfo: { name: "theiamproject", version: "1.0.0" }, transport: { type: "http", endpoint: BASE_URL + "/mcp" }, capabilities: { tools: true, resources: true }, authentication: { type: "oauth", authorizationServer: BASE_URL } }, null, 2);
var AGENT_SKILLS_INDEX = JSON.stringify({ version: "0.2.0", updated: "2026-08-04", skills: [{ name: "robots-txt", type: "well-known", description: "Publish /robots.txt" },{ name: "sitemap", type: "well-known", description: "Publish a sitemap" },{ name: "link-headers", type: "well-known", description: "Include Link headers (RFC 8288)" },{ name: "markdown-negotiation", type: "well-known", description: "Return markdown to agents" },{ name: "content-signals", type: "well-known", description: "Declare AI content usage preferences" },{ name: "api-catalog", type: "well-known", description: "Publish API catalog (RFC 9727)" },{ name: "oauth-discovery", type: "well-known", description: "Publish OAuth/OIDC discovery" },{ name: "auth-md", type: "well-known", description: "Publish auth.md" },{ name: "mcp-server-card", type: "well-known", description: "Publish MCP Server Card" },{ name: "agent-skills", type: "well-known", description: "Publish agent skills index" },{ name: "webmcp", type: "well-known", description: "Support WebMCP" }] }, null, 2);
var JWKS = JSON.stringify({ keys: [] }, null, 2);
var API_HEALTH = JSON.stringify({ status: "ok", timestamp: (new Date()).toISOString() });
var OPENAPI_SPEC = JSON.stringify({ openapi: "3.0.3", info: { title: "The IAM Project API", version: "1.0.0" }, servers: [{ url: BASE_URL + "/api" }], paths: { "/health": { get: { summary: "Health check", responses: { "200": { description: "OK" } } } } } }, null, 2);

function j(body, status) { return new Response(JSON.stringify(body, null, 2), { status: status || 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }); }
__name(j, "j");
function t(body, ct, status) { return new Response(body, { status: status || 200, headers: { "Content-Type": ct, "Access-Control-Allow-Origin": "*" } }); }
__name(t, "t");

async function handleAgentReady(request, env, path, accept, host) {
  if (path === "/.well-known/api-catalog") return j(API_CATALOG);
  if (path === "/.well-known/oauth-authorization-server") return j(OAUTH_AUTH_SERVER);
  if (path === "/.well-known/oauth-protected-resource") return j(OAUTH_PROTECTED_RESOURCE);
  if (path === "/.well-known/openid-configuration") return j(OPENID_CONFIG);
  if (path === "/.well-known/jwks.json") return j(JWKS);
  if (path === "/.well-known/mcp/server-card.json") return j(MCP_SERVER_CARD);
  if (path === "/.well-known/agent-skills/index.json") return j(AGENT_SKILLS_INDEX);
  if (path === "/robots.txt") return t(ROBOTS_TXT, "text/plain; charset=utf-8");
  if (path === "/sitemap.xml") return t(SITEMAP_XML, "application/xml; charset=utf-8");
  if (path === "/auth.md") return t(AUTH_MD, "text/markdown; charset=utf-8");
  if (path === "/api/health") return j(API_HEALTH);
  if (path === "/api/openapi.json") return j(OPENAPI_SPEC);
  return null;
}
__name(handleAgentReady, "handleAgentReady");

var SITES = { "miraclesun.icu": "main", "www.miraclesun.icu": "main", "theiamproject.net": "theiamproject", "www.theiamproject.net": "theiamproject" };
var CRM_BASE = "https://services.leadconnectorhq.com";
var CRM_LOCATION_ID = "xIMotGFTTevHkqMW7hCP";
var GHL_TRACKING = '<script src="https://link.myitfriendtech.com/js/external-tracking.js" data-tracking-id="tk_9a40afb4ce574c818804f1fca9e762a9"></script>';

function injectTracking(html) {
  if (!html || html.indexOf("<html") === -1) return html;
  if (html.indexOf("external-tracking.js") === -1) {
    if (html.indexOf("</head>") !== -1) { html = html.replace("</head>", GHL_TRACKING + "</head>"); }
    else if (html.indexOf("<body") !== -1) { html = html.replace("<body", GHL_TRACKING + "<body"); }
    else { html = GHL_TRACKING + html; }
  }
  return html;
}
__name(injectTracking, "injectTracking");

function jsonResponse(body, status) { return new Response(JSON.stringify(body, null, 2), { status: status || 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }); }
__name(jsonResponse, "jsonResponse");

async function logEvent(env, event) { if (!env.DB) return; try { await env.DB.prepare("INSERT INTO events (type, host, path, referrer, user_agent, ip, metadata, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))").bind(event.type || "page_view", event.host || "", event.path || "", event.referrer || "", event.userAgent || "", event.ip || "", JSON.stringify(event.metadata || {})).run(); } catch (e) { console.error("D1 error:", e.message); } }
__name(logEvent, "logEvent");

async function sendToCRM(env, data) {
  const token = env.GHL_API_KEY;
  if (!token) return { success: false, error: "API key not set" };
  const contact = { locationId: CRM_LOCATION_ID, firstName: data.firstName || "", lastName: data.lastName || "", email: data.email || "", phone: data.phone || "" };
  try {
    const res = await fetch(CRM_BASE + "/contacts/", { method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json", Version: "2021-07-28" }, body: JSON.stringify(contact) });
    if (res.ok) { const result = await res.json(); return { success: true, contactId: result.contact?.id || result.id }; }
    if (res.status === 409 && data.email) {
      const searchRes = await fetch(CRM_BASE + "/contacts/search?email=" + encodeURIComponent(data.email), { headers: { Authorization: "Bearer " + token, Version: "2021-07-28" } });
      if (searchRes.ok) { const sr = await searchRes.json(); const existingId = sr.contacts?.[0]?.id; if (existingId) { const updateRes = await fetch(CRM_BASE + "/contacts/" + existingId, { method: "PUT", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json", Version: "2021-07-28" }, body: JSON.stringify(contact) }); if (updateRes.ok) return { success: true, contactId: existingId, updated: true }; } }
    }
    const errorBody = (await res.text()).slice(0, 1500);
    console.error("GHL contact creation failed", JSON.stringify({ status: res.status, body: errorBody }));
    return { success: false, error: "CRM returned " + res.status };
  } catch (e) { console.error("GHL contact request failed", e?.message || String(e)); return { success: false, error: e?.message || "CRM request failed" }; }
}
__name(sendToCRM, "sendToCRM");

async function addNoteToCRM(env, contactId, note) { const token = env.GHL_API_KEY; if (!token || !contactId) return; try { await fetch(CRM_BASE + "/contacts/" + contactId + "/notes", { method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json", Version: "2021-07-28" }, body: JSON.stringify({ body: note }) }); } catch (e) {} }
__name(addNoteToCRM, "addNoteToCRM");

var index_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;
    const method = request.method;
    const accept = request.headers.get("Accept") || "";
    if (method === "OPTIONS") { return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization" } }); }
    if (path === "/api/track" && method === "POST") { const body = await request.json(); ctx.waitUntil(logEvent(env, { type: body.type || "page_view", host, path: body.path || path, referrer: body.referrer || request.headers.get("Referer") || "", userAgent: request.headers.get("User-Agent") || "", ip: request.headers.get("CF-Connecting-IP") || "", metadata: body.metadata || {} })); return jsonResponse({ success: true }); }
    if (path === "/api/submit" && method === "POST") {
      const formData = await request.json();
      const source = SITES[host] || host;
      await logEvent(env, { type: "form_submission", host, path, userAgent: request.headers.get("User-Agent") || "", ip: request.headers.get("CF-Connecting-IP") || "", metadata: { ...formData, source } });
      const crmResult = await sendToCRM(env, { ...formData, source });
      if (crmResult.success && crmResult.contactId) { ctx.waitUntil(addNoteToCRM(env, crmResult.contactId, "Form submitted on " + host + path + " at " + (new Date()).toISOString())); return jsonResponse({ success: true, message: "Thank you!" }); }
      return jsonResponse({ success: false, error: crmResult.error || "CRM submission failed" }, 500);
    }
    if (path === "/api/admin/stats" && method === "GET") { if ((request.headers.get("Authorization") || "") !== "Bearer " + env.ADMIN_PASSWORD) return jsonResponse({ error: "Unauthorized" }, 401); const [pv, fs, cl] = await Promise.all([env.DB.prepare("SELECT COUNT(*) as c FROM events WHERE type='page_view'").first(), env.DB.prepare("SELECT COUNT(*) as c FROM events WHERE type='form_submission'").first(), env.DB.prepare("SELECT COUNT(*) as c FROM events WHERE type='click'").first()]); const top = await env.DB.prepare("SELECT path, COUNT(*) as c FROM events WHERE type='page_view' GROUP BY path ORDER BY c DESC LIMIT 10").all(); return jsonResponse({ pageViews: pv?.c || 0, formSubmissions: fs?.c || 0, clicks: cl?.c || 0, topPages: top.results }); }
    if (path === "/api/admin/events" && method === "GET") { if ((request.headers.get("Authorization") || "") !== "Bearer " + env.ADMIN_PASSWORD) return jsonResponse({ error: "Unauthorized" }, 401); const limit = Math.min(parseInt(url.searchParams.get("limit") || "100"), 500); const offset = parseInt(url.searchParams.get("offset") || "0"); const results = await env.DB.prepare("SELECT * FROM events ORDER BY created_at DESC LIMIT ? OFFSET ?").bind(limit, offset).all(); return jsonResponse({ events: results.results }); }
    const siteFolder = SITES[host];
    if (siteFolder === "theiamproject") { const agentResponse = await handleAgentReady(request, env, path, accept, host); if (agentResponse) return agentResponse; }
    if (path === "/admin" || path === "/admin/") { return env.ASSETS.fetch(new Request(new URL("/admin/index.html", request.url), request)); }
    if (method === "GET" && !path.startsWith("/api/") && !path.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|map)$/)) { ctx.waitUntil(logEvent(env, { type: "page_view", host, path, referrer: request.headers.get("Referer") || "", userAgent: request.headers.get("User-Agent") || "", ip: request.headers.get("CF-Connecting-IP") || "" })); }
    if (siteFolder) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = path === "/" ? "/" + siteFolder + "/index.html" : "/" + siteFolder + path;
      let response = await env.ASSETS.fetch(new Request(assetUrl, request));
      if (response.status === 308 || response.status === 301) { assetUrl.pathname = "/" + siteFolder + "/index.html"; response = await env.ASSETS.fetch(new Request(assetUrl, request)); }
      if (response.status === 404 && path !== "/") { const rootUrl = new URL(request.url); rootUrl.pathname = path; const rootResponse = await env.ASSETS.fetch(new Request(rootUrl, request)); if (rootResponse.ok) { response = rootResponse; } }
      if (siteFolder === "theiamproject" && path === "/") { const h = new Headers(response.headers); h.set("Link", AGENT_LINK_HEADERS); h.set("Vary", "Accept"); var ct0 = response.headers.get("Content-Type") || ""; if (ct0.indexOf("text/html") !== -1 && response.ok) { var html0 = await response.text(); html0 = injectTracking(html0); h.set("Content-Type", "text/html; charset=utf-8"); return new Response(html0, { status: response.status, headers: h }); } return new Response(response.body, { status: response.status, headers: h }); }
      var ct = response.headers.get("Content-Type") || "";
      if (ct.indexOf("text/html") !== -1 && response.ok) { var html = await response.text(); html = injectTracking(html); var newHeaders = new Headers(response.headers); newHeaders.set("Content-Type", "text/html; charset=utf-8"); return new Response(html, { status: response.status, headers: newHeaders }); }
      return response;
    }
    return new Response("Site not found. Add this hostname to SITES in src/index.js", { status: 404, headers: { "Content-Type": "text/plain" } });
  }
};
export { index_default as default };
