var C="espace-cache-v13";
self.addEventListener("install",function(e){self.skipWaiting();});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim());});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(
    caches.open(C).then(function(c){
      return c.match(e.request).then(function(r){
        var f=fetch(e.request).then(function(resp){
          if(resp&&resp.ok&&new URL(e.request.url).protocol.indexOf("http")===0)c.put(e.request,resp.clone());
          return resp;
        }).catch(function(){return r||Response.error();});
        return r||f;
      });
    })
  );
});
