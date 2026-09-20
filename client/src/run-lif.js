//process.env.API_URL='https://blockstream.info/api';
process.env.API_URL=location.origin+'/.lif.net/blockstream';

// init rxjs
import {createElement} from 'snabbdom-pragma';
function _createElement(tag, data, ...children){                                                                                                     
  // snabbdom needs empty elements filtered out
  let filtered = children.filter(c => c!=='');
  return createElement(tag, data, ...filtered);
}
globalThis.React = {
  createElement: _createElement,
  Fragment: 'fragment',
};

function index_html(){
  // add stylesheet
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'style.css';
  document.head.appendChild(link);
  // add explorer div
  let div = document.createElement('div');
  div.id = 'explorer';
  document.body.appendChild(div);
}
index_html();

await import('./run-browser.js');

