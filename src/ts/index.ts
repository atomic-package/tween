/*
 * Author: Daisuke Takayama
 */

'use strict';
var e = eval, global: NodeJS.Global = e('this');

import Tween from './Tween';

declare namespace NodeJS {
  interface Global {
    document: Document;
    window: Window;
    navigator: Navigator;
    AP: {
      common: {
        tween: Tween
      }
    };
  }
}

// npm & node
if (typeof module !== 'undefined') {
  module.exports = Tween;
}

// browser
if (typeof (global) !== 'undefined') {
  if (typeof global.AP === 'undefined') {
    Object.assign(global, { AP: {} });
  }
  if (typeof global.AP.common === 'undefined') {
    Object.assign(global.AP, { common: {} });
  }
  if (typeof global.AP.common.tween === 'undefined') {
    Object.assign(global.AP.common, { tween: Tween });
  }
}
