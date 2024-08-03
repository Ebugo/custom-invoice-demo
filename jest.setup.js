// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import fetch from 'cross-fetch';
import fetchMock from 'jest-fetch-mock';

global.fetch = fetch;

global.URL.createObjectURL = jest.fn(() => '/png/logo-placeholder.png');

fetchMock.enableMocks();