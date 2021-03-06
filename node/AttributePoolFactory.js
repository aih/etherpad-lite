/**
 * Copyright 2009 Google Inc., 2011 Peter 'Pita' Martischka
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

exports.createAttributePool = function () {
  var p = {};
  p.numToAttrib = {}; // e.g. {0: ['foo','bar']}
  p.attribToNum = {}; // e.g. {'foo,bar': 0}
  p.nextNum = 0;

  p.putAttrib = function (attrib, dontAddIfAbsent) {
    var str = String(attrib);
    if (str in p.attribToNum) {
      return p.attribToNum[str];
    }
    if (dontAddIfAbsent) {
      return -1;
    }
    var num = p.nextNum++;
    p.attribToNum[str] = num;
    p.numToAttrib[num] = [String(attrib[0] || ''), String(attrib[1] || '')];
    return num;
  };

  p.getAttrib = function (num) {
    var pair = p.numToAttrib[num];
    if (!pair) {
      return pair;
    }
    return [pair[0], pair[1]]; // return a mutable copy
  };

  p.getAttribKey = function (num) {
    var pair = p.numToAttrib[num];
    if (!pair) return '';
    return pair[0];
  };

  p.getAttribValue = function (num) {
    var pair = p.numToAttrib[num];
    if (!pair) return '';
    return pair[1];
  };

  p.eachAttrib = function (func) {
    for (var n in p.numToAttrib) {
      var pair = p.numToAttrib[n];
      func(pair[0], pair[1]);
    }
  };

  p.toJsonable = function () {
    return {
      numToAttrib: p.numToAttrib,
      nextNum: p.nextNum
    };
  };

  p.fromJsonable = function (obj) {
    p.numToAttrib = obj.numToAttrib;
    p.nextNum = obj.nextNum;
    p.attribToNum = {};
    for (var n in p.numToAttrib) {
      p.attribToNum[String(p.numToAttrib[n])] = Number(n);
    }
    return p;
  };

  return p;
}
