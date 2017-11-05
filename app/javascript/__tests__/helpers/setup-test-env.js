/* eslint-disable import/first */
require('babel-register');

import 'babel-polyfill';
import 'raf/polyfill';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const { JSDOM } = require('jsdom');

const dom = new JSDOM('</body></body>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = {
  userAgent: 'node.js',
};
