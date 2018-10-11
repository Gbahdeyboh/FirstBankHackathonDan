self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('DanBot')
        .then(cache => { 
            cache.addAll(['/', 'index.html', 
            'public/css/style.css', 
            'public/css/font-awesome.min.css', 
            'public/css/materialize.min.css', 
            'public/css/Lato/latofonts.css', 
            'public/css/icons/icon_set_1.css', 
            'public/css/icons/icon_set_2.css', 
            'public/images/bot.png', 
            'public/images/bot1.png', 
            'public/images/pattern.png', 
            'public/js/chatBot.js', 
            'public/js/fontawesome-all.js', 
            'public/js/jquery.min.js', 
            'public/js/main.js', 
            'public/js/materialize.min.js', 
            'public/js/particles.js', 
            'public/js/particles.min.js'
        ])
            console.log("did not open cache");
        })
        .catch(err => {
            console.error("Error is : ", err);
        })
    );
});
// Fired when the Service Worker starts up
self.addEventListener('activate', function(event) {

    console.log('Service Worker: Activating....');

    event.waitUntil(
        caches.keys().then(function(DanBot) {
            return Promise.all(cacheNames.map(function(key) {
                if( key !== 'DanBot') {
                    console.log('Service Worker: Removing Old Cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});
self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request).then(val => {
			return val || fetch(event.request);
		})
	);
});