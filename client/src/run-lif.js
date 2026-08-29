process.env.API_URL='https://blockstream.info/api';

import snabbdom_pragma from 'snabbdom-pragma';
// init rxjs
globalThis.React = snabbdom_pragma;

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

