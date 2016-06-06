import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
export const INITIAL_STATE = Map();

function getModifier(state = INITIAL_STATE, abilityValue) {
  if (!abilityValue) return false;
  switch (abilityValue) {
  case '8':
  case '9':
    return modifer = -1;
    break;
  case '10':
  case '11':
    return modifer = 0;
    break;
  case '12':
  case '13':
    return modifer = 1;
    break;
  case '14':
  case '15':
    return modifer = 2;
    break;
  case '16':
  case '17':
    return modifer = 3;
    break;
  case '18':
  case '19':
    return modifer = 4;
    break;
  case '20':
  case '21':
    return modifer = 5;
    break;
  }
  return state;
}

ReactDOM.render(
  document.getElementById('app')
);
