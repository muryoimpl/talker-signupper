/* eslint-disable import/first, import/no-extraneous-dependencies */
require('babel-register');

import 'babel-polyfill';
import 'raf/polyfill';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
