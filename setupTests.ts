import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill Web API globals for Node.js environment (Jest)

// Use `any` type assertion to bypass strict type checking for the global assignment
global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;


if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    url: string;
    method: string;
    headers: Headers;
    // Add missing properties with default values or as undefined
    cache: RequestCache = 'default';
    credentials?: RequestCredentials;
    destination?: RequestDestination;
    integrity?: string;
    keepalive?: boolean;
    mode?: RequestMode;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    signal?: AbortSignal;
    body?: ReadableStream<Uint8Array> | null;
    bodyUsed: boolean = false;

    constructor(input: RequestInfo | URL, init?: RequestInit) {
      this.url = typeof input === 'string' ? input : (input instanceof URL ? input.toString() : (input as globalThis.Request).url);
      this.method = init?.method?.toUpperCase() || (typeof input !== 'string' && !(input instanceof URL) ? (input as globalThis.Request).method : 'GET');
      this.headers = new Headers(init?.headers || (typeof input !== 'string' && !(input instanceof URL) ? (input as globalThis.Request).headers : undefined));
      this.body = init?.body as ReadableStream<Uint8Array> | null || null; // Simplified body handling
     
      // Assign other properties from init if provided
      if (init) {
        this.cache = init.cache || 'default';
        this.credentials = init.credentials;
        this.integrity = init.integrity;

        this.keepalive = init.keepalive;
        this.mode = init.mode;
        this.redirect = init.redirect;
        this.referrer = init.referrer;
        this.referrerPolicy = init.referrerPolicy;
        this.signal = init.signal || undefined;
      }
    }

    async arrayBuffer(): Promise<ArrayBuffer> { throw new Error('Request.arrayBuffer() not implemented in mock'); }
    async blob(): Promise<Blob> { throw new Error('Request.blob() not implemented in mock'); }
    async formData(): Promise<FormData> { throw new Error('Request.formData() not implemented in mock'); }
    async json(): Promise<any> { throw new Error('Request.json() not implemented in mock'); }
    async text(): Promise<string> { throw new Error('Request.text() not implemented in mock'); }

    clone(): globalThis.Request {
      // Basic clone implementation
      if (this.bodyUsed) {
        throw new TypeError("Failed to execute 'clone' on 'Request': Request body is already used");
      }
      const clonedInit = {
        method: this.method,
        headers: new Headers(this.headers),
        body: this.body, // Note: actual cloning of body stream is complex
        cache: this.cache,
        credentials: this.credentials,
        destination: this.destination,
        integrity: this.integrity,
        keepalive: this.keepalive,
        mode: this.mode,
        redirect: this.redirect,
        referrer: this.referrer,
        referrerPolicy: this.referrerPolicy,
        signal: this.signal,
      };
      return new Request(this.url, clonedInit) as globalThis.Request;
    }
  } as any; // Use 'as any' to avoid complex type matching issues with the global Request type
}

if (typeof global.Response === 'undefined') {
   global.Response = class Response {
     body: ReadableStream<Uint8Array> | null;
     headers: Headers;
     ok: boolean;
     redirected: boolean = false; // Add missing property
     status: number;
     statusText: string;
     type: ResponseType = 'basic'; // Add missing property
     url: string = ''; // Add missing property
     bodyUsed: boolean = false;

     constructor(body?: BodyInit | null, init?: ResponseInit) {
        this.body = body as ReadableStream<Uint8Array> | null || null; // Simplified
        this.status = init?.status || 200;
        this.statusText = init?.statusText || 'OK';
        this.headers = new Headers(init?.headers);
        this.ok = this.status >= 200 && this.status < 300;
     }

     async arrayBuffer(): Promise<ArrayBuffer> { throw new Error('Response.arrayBuffer() not implemented in mock'); }
     async blob(): Promise<Blob> { throw new Error('Response.blob() not implemented in mock'); }
     async formData(): Promise<FormData> { throw new Error('Response.formData() not implemented in mock'); }
     async json(): Promise<any> { 
         const text = await this.text();
         return JSON.parse(text);
     }
     async text(): Promise<string> {
         // Basic implementation, assumes body is string or string-like
         if (this.body === null) return '';
         // Note: Real implementation needs stream handling
         return String(this.body);
      }

     clone(): globalThis.Response {
       if (this.bodyUsed) {
         throw new TypeError("Failed to execute 'clone' on 'Response': Response body is already used");
       }
        const clonedInit = {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url,
            redirected: this.redirected,
        };
        // Note: Body cloning is complex
        return new Response(this.body, clonedInit) as globalThis.Response;
     }

     // Add missing static methods
     static error(): globalThis.Response {
        const res = new Response(null, { status: 0, statusText: '' }) as globalThis.Response;
        return res;
     }

     static redirect(url: string | URL, status: number = 302): globalThis.Response {
        const headers = new Headers({ Location: typeof url === 'string' ? url : url.toString() });
        return new Response(null, { status, headers }) as globalThis.Response;
     }

     static json(data: any, init?: ResponseInit): globalThis.Response {
       const body = JSON.stringify(data);
       const headers = new Headers(init?.headers);
       if (!headers.has('content-type')) {
         headers.set('content-type', 'application/json');
       }
       return new Response(body, { ...init, headers }) as globalThis.Response;
    }

   } as any; // Use 'as any' for simpler assignment
}

if (typeof global.Headers === 'undefined') {
  global.Headers = class Headers implements globalThis.Headers {
     private _headers: Map<string, string> = new Map(); // Use Map for easier compliance

     constructor(init?: HeadersInit) {
        if (init) {
            if (init instanceof Headers) {
                init.forEach((value, key) => this.append(key, value));
            } else if (Array.isArray(init)) {
                init.forEach(([key, value]) => this.append(key, value));
            } else {
                Object.entries(init).forEach(([key, value]) => this.append(key, value));
            }
        }
     }

     append(name: string, value: string): void {
       const lowerCaseName = name.toLowerCase();
       const existingValue = this._headers.get(lowerCaseName);
       this._headers.set(lowerCaseName, existingValue ? `${existingValue}, ${value}` : value);
     }

     delete(name: string): void {
         this._headers.delete(name.toLowerCase());
     }

     get(name: string): string | null {
       return this._headers.get(name.toLowerCase()) || null;
     }

     getSetCookie(): string[] {
        // Basic mock, real implementation is complex
        const cookies = this._headers.get('set-cookie');
        return cookies ? cookies.split(', ') : []; // Simplistic split
     }

     has(name: string): boolean {
        return this._headers.has(name.toLowerCase());
     }

     set(name: string, value: string): void {
         this._headers.set(name.toLowerCase(), value);
     }

     forEach(callback: (value: string, key: string, parent: globalThis.Headers) => void, thisArg?: any): void {
        this._headers.forEach((value, key) => {
            callback.call(thisArg, value, key, this as any);
        });
     }

     // Add iterator methods
     *entries(): any {
        yield* this._headers.entries();
     }

     *keys(): any {
        yield* this._headers.keys();
     }

     *values(): any {
         yield* this._headers.values();
     }

     [Symbol.iterator](): any {
         return this.entries();
     }
  } as any;
}
