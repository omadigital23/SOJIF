require('@testing-library/jest-dom');

const React = require('react');
const { TextDecoder, TextEncoder } = require('util');
const { ReadableStream, TransformStream, WritableStream } = require('stream/web');

class TestMessagePort {
    constructor() {
        this.onmessage = null;
    }

    postMessage(message) {
        setTimeout(() => {
            this.onmessage?.({ data: message });
        }, 0);
    }

    start() {}

    close() {
        this.onmessage = null;
    }

    addEventListener(type, listener) {
        if (type === 'message') {
            this.onmessage = listener;
        }
    }

    removeEventListener(type, listener) {
        if (type === 'message' && this.onmessage === listener) {
            this.onmessage = null;
        }
    }
}

class TestMessageChannel {
    constructor() {
        this.port1 = new TestMessagePort();
        this.port2 = new TestMessagePort();
        this.port1.postMessage = (message) => {
            setTimeout(() => {
                this.port2.onmessage?.({ data: message });
            }, 0);
        };
        this.port2.postMessage = (message) => {
            setTimeout(() => {
                this.port1.onmessage?.({ data: message });
            }, 0);
        };
    }
}

Object.assign(globalThis, {
    MessageChannel: TestMessageChannel,
    MessagePort: TestMessagePort,
    ReadableStream,
    TextDecoder,
    TextEncoder,
    TransformStream,
    WritableStream,
});

const {
    Blob,
    File,
    FormData,
    Headers,
    Request,
    Response,
    fetch,
} = require('undici');

Object.assign(globalThis, {
    Blob,
    File,
    FormData,
    Headers,
    Request,
    Response,
    fetch,
});

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:3000';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';

// Mock Next.js Image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        return React.createElement('img', props);
    },
}));

// Mock Next.js Link
jest.mock('next/link', () => {
    return ({ children, href }) => {
        return React.createElement('a', { href }, children);
    };
});

jest.mock('next-intl', () => ({
    useLocale: () => 'fr',
    useTranslations: () => (key) => key,
}));

jest.mock('@/i18n/navigation', () => ({
    Link: ({ children, href, ...props }) => React.createElement('a', { href, ...props }, children),
    getPathname: jest.fn(),
    redirect: jest.fn(),
    usePathname: () => '/',
    useRouter: () => ({
        back: jest.fn(),
        forward: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
    }),
}));

// Suppress console errors in tests
const originalError = console.error;
beforeAll(() => {
    console.error = (...args) => {
        if (
            typeof args[0] === 'string' &&
            args[0].includes('Warning: ReactDOM.render')
        ) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});
