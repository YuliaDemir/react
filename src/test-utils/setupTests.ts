import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import fetchMock from 'jest-fetch-mock';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;
}

fetchMock.enableMocks();
