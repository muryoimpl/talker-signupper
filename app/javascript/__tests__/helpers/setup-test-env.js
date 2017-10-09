require('babel-register')

const { JSDOM } = require('jsdom');

const dom = new JSDOM('</body></body>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = {
  userAgent: 'node.js',
};
