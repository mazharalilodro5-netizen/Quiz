self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
self.addEventListener('push', e => {
  let p = {}; try { p = e.data.json(); } catch (x) {}
  const d = p.data || {}, n = p.notification || {};
  const title = d.title || n.title || 'Plexo 5', body = d.body || n.body || 'New message', tag = d.tag || 'quizhub';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    if (cs.some(c => c.visibilityState === 'visible')) return;
    return self.registration.showNotification(title, { body, tag, renotify: true, icon: 'icon-192.png', badge: 'icon-192.png' });
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow('./');
  }));
});
