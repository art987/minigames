/*
* File Name / firefly.js
* Created Date / Aug 13, 2020
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

(function () {
  'use strict';
  window.addEventListener('load', function () {
    var canvas = document.getElementById('canvas');

    if (!canvas || !canvas.getContext) {
      return false;
    }

    /********************
      Random Number
    ********************/

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    /********************
      Var
    ********************/

    var ctx = canvas.getContext('2d');
    var X = canvas.width = window.innerWidth;
    var Y = canvas.height = window.innerHeight;
    var shapeNum = 500;
    var shapes = [];
    var style = {
      black: 'black',
      white: 'white',
      lineWidth: 4,
    };
    
    if (X <768) {
      shapeNum = 250;
    }

    /********************
      Animation
    ********************/

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(cb) {
        setTimeout(cb, 17);
      };

    /********************
      Bamboo
    ********************/
    
    var bamboos = [];

    function Bamboo(ctx, x, y, w, h, n) {
      this.ctx = ctx;
      this.init(x, y, w, h, n);
    }
    
    Bamboo.prototype.init = function(x, y, w, h, n) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.n = n;
      this.d = 3;
      this.a = rand(-5, 5) * Math.random();
      this.rad = this.a * Math.PI / 180;
      this.random = Math.random() * 2;
    };

    Bamboo.prototype.draw = function() {
      var ctx  = this.ctx;
      ctx.save();
      ctx.fillStyle = style.black;
      ctx.globalAlpha = this.random;
      ctx.translate(this.x, this.y);
      //ctx.rotate(0.01 * Math.sin(this.rad));
      ctx.rotate(this.rad);
      ctx.translate(-this.x, -this.y);
      for (var i = 0; i < this.n; i++) {
        ctx.beginPath();
        ctx.moveTo(this.x - this.w / 2, this.y - this.h * i - this.d * i);
        ctx.quadraticCurveTo(this.x - this.w / 5, this.y - this.h * i - this.d * i - this.h / 2, this.x - this.w / 2, this.y - this.h * i - this.d * i - this.h);
        ctx.lineTo(this.x + this.w / 2, this.y - this.h * i - this.d * i- this.h);
        ctx.quadraticCurveTo(this.x + this.w / 5, this.y - this.h * i - this.d * i - this.h / 2, this.x + this.w / 2, this.y - this.h * i - this.d * i);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    Bamboo.prototype.render = function() {
      this.draw();
    };

    for (var xPos = 0; xPos < X;) {
      var dist = rand(5, 20);
      var width = rand(10, 50);
      var height = rand(100, 300);
      var maxNum = Y / height;
      xPos += dist + width;
      var b = new Bamboo(ctx, xPos, Y, width, height, maxNum);
      bamboos.push(b);
    }

    /********************
      Shape
    ********************/
     
    function Shape(ctx, x, y) {
      this.ctx = ctx;
      this.init(x, y);
    }
    
    Shape.prototype.init = function(x, y) {
      this.x = x;
      this.y = y;
      Math.random() < 0.90 ? this.r = rand(2, 10) : this.r = rand(60, 100);
      this.r < 50 ? this.ga = Math.random() * Math.random() : this.ga = Math.random() / 30;
      this.v = {
        x: rand(-1, 1) * Math.random(),
        y: rand(-1, 1) * Math.random()
      };
      this.l = rand(0, 200);
      this.sl = this.l;
      this.c = {
        r: rand(110, 130),
        g: rand(230, 255),
        b: rand(90, 110)
      };
    };

    Shape.prototype.updateParams = function() {
      var ratio = this.l / this.sl;
      this.ga = this.ga * (ratio * 1.1);
      this.l -= 1;
      if (this.l < 0) {
        this.init(rand(0, X), rand(0, Y));
      }
    };

    Shape.prototype.updatePosition = function() {
      this.x += this.v.x;
      this.y += this.v.y;
    };
    
    Shape.prototype.draw = function() {
      var ctx  = this.ctx;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = this.ga;
      ctx.fillStyle = 'rgb(' + this.c.r + ', ' + this.c.g + ', ' + this.c.b + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };

    Shape.prototype.render = function(i) {
      this.updatePosition();
      this.updateParams();
      this.draw();
    };


    for (var i = 0; i < shapeNum; i++) {
      var s = new Shape(ctx, rand(0, X), rand(0, Y));
      shapes.push(s);
    }

    /********************
      Render
    ********************/
    
    function render() {
      ctx.clearRect(0, 0, X, Y);
      for (var i = 0; i < bamboos.length; i++) {
        bamboos[i].render();
      }
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].render(i);
      }
      requestAnimationFrame(render);
    }

    render();

    /********************
      Event
    ********************/
    
    function onResize() {
      X = canvas.width = window.innerWidth;
      Y = canvas.height = window.innerHeight;
      bamboos = [];
      shapes = [];
      if (X <768) {
        shapeNum = 250;
      } else {
        shapeNum = 500;
      }
      for (var xPos = 0; xPos < X;) {
        var dist = rand(5, 20);
        var width = rand(10, 50);
        var height = rand(100, 300);
        var maxNum = Y / height;
        xPos += dist + width;
        var b = new Bamboo(ctx, xPos, Y, width, height, maxNum);
        bamboos.push(b);
      }
      for (var i = 0; i < shapeNum; i++) {
        var s = new Shape(ctx, rand(0, X), rand(0, Y));
        shapes.push(s);
      }
    }

    window.addEventListener('resize', function() {
      onResize();
    });

  });
})();