import { JSDOM } from 'jsdom';
import ignore from 'ignore-styles';
ignore.default(['.scss', '.css']);

const jsdom = new JSDOM('<body></body>');

global.window = jsdom.window;
global.document = jsdom.window.document;
global.MouseEvent = jsdom.window.MouseEvent;
global.Node = jsdom.window.Node;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
