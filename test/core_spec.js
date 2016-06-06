import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import {expect} from 'chai';
import {getModifier} from '../source/scripts/app';

describe('application logic', () => {

  describe('getModifier', () => {

    it('returns a value', () => {
      const state = Map();
      const abilityValue = 16;
      const nextState = getModifier(state, abilityValue);
      expect(nextState).to.equal(Map({
        modifier: 3
      }));
    });

  });
});
