importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');

class UVServiceWorker extends EventEmitter {     
    constructor(config = __uv$config) {
        super();
        if (!config.bare) config.bare = '/bare/';
        this.addresses = typeof config.bare === 'string' ? [ new URL(config.bare, location) ] : config.bare.map(str => new URL(str, location));
        this.headers = {
            csp: [
                'cross-origin-embedder-policy',
                'cross-origin-opener-policy',
                'cross-origin-resource-policy',
                'content-security-policy',
                'content-security-policy-report-only',
                'expect-ct',
                'feature-policy',
                'origin-isolation',
                'strict-transport-security',
                'upgrade-insecure-requests',
                'x-content-type-options',
                'x-download-options',
                'x-frame-options',
                'x-permitted-cross-domain-policies',
                'x-powered-by',
                'x-xss-protection',
            ],
            forward: [
                'accept-encoding', 
                'connection',
                'content-length',
            ],
        };
        this.method = {
            empty: [
                'GET',
                'HEAD'
            ]
        };
        this.statusCode = {
            empty: [ 
                204,
                304,
            ],
        };  
        this.config = config;
