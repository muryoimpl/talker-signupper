const { JSDOM } = require('jsdom');

const dom = new JSDOM('</body></body>');
global.document = dom;
global.window = dom.defaultView;
