(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.utils = {}));
}(this, function (exports) { 'use strict';

  var Tracker = /** @class */ (function () {
      function Tracker() {
          this.status = {};
          this.events = {};
      }
      Tracker.prototype.on = function (name, resolve, reject) {
          var events = this.events[name];
          if (!(events instanceof Array)) {
              events = [];
          }
          events.push({ resolve: resolve, reject: reject });
          this.events[name] = events;
      };
      Tracker.prototype.trigger = function (name) {
          var callbacks = this.events[name];
          if (callbacks instanceof Array) {
              callbacks.forEach(function (_a) {
                  var resolve = _a.resolve;
                  if (typeof resolve !== 'function')
                      return;
                  resolve();
              });
              delete this.events[name];
          }
      };
      Tracker.prototype.reject = function (name) {
          var callbacks = this.events[name];
          if (callbacks instanceof Array) {
              callbacks.forEach(function (_a) {
                  var reject = _a.reject;
                  if (typeof reject !== 'function')
                      return;
                  reject();
              });
              delete this.events[name];
          }
      };
      Tracker.prototype.rejectAll = function () {
          var _this = this;
          Object.keys(this.events).forEach(function (name) { return _this.reject(name); });
      };
      Tracker.prototype.get = function (name) {
          return !!this.status[name];
      };
      Tracker.prototype.set = function (name) {
          this.status[name] = true;
          this.trigger(name);
      };
      Tracker.prototype.unset = function (name) {
          if (typeof name === 'string') {
              delete this.status[name];
              this.reject(name);
              return;
          }
          this.status = {};
          this.rejectAll();
      };
      Tracker.prototype.wait = function (name) {
          var _this = this;
          if (this.get(name))
              ;
          return new Promise(function (resolve, reject) {
              _this.on(name, resolve, reject);
          });
      };
      return Tracker;
  }());

  exports.Tracker = Tracker;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
