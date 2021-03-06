/**
 * Tween Interface
 **/
interface setting {
  duration?: number;
  easing?: string;
  step?: Function;
  complete?: Function;
}

/**
 * Tween Class
 * @public
 * @param option
 **/
export class Tween {
  private timer: number      = null;
  private isPlaying: boolean = false;
  private _startTime: number = Date.now();
  public _loopHandler: any; //Function

  private setting: setting = {
    duration: 200,
    easing: 'linear',
    step: function() {},
    complete: function() {}
  };

  constructor(
    public start: any,
    public end: any,
    public option: any
  ) {
    this._loopHandler = (): void => {
      this.update();
    };

    this.setting = this._extend(this.setting, option);

    this.init();
  }

  /**
   * Static Function
   **/
  static fromData(data: any): Tween {
    return new Tween(
      data.start ? data.start : null,
      data.end ? data.end : null,
      data.option ? data.option : null
    );
  }

  /**
   * private Function
   **/
  private init(): void {
    this.play();
  }

  private _extend(arg: any, options?: any): setting {
    if (arguments.length < 2) {
      return arg;
    }

    if (!arg) {
      arg = {};
    }

    for (let i: number = 1; i < arguments.length; i++) {
      for (let key in arguments[i]) {
        if (arguments[i][key] !== null && typeof(arguments[i][key]) === "object") {
          arg[key] = this._extend(arg[key], arguments[i][key]);
        } else {
          arg[key] = arguments[i][key];
        }
      }
    }

    return arg;
  }

  private checkSteps(elapsedTime: any): void {
    if(this.setting.duration <= elapsedTime) {
      this.stop();
      this.setting.complete.apply(this, []);
    } else {
      this.timer = window.requestAnimationFrame(this._loopHandler);
    }
  }

  /**
   * public Function
   **/
  public play(): void {
    this.isPlaying = true;
    this.timer = window.requestAnimationFrame(this._loopHandler);
  }

  public stop(): Tween {
    this.isPlaying = false;

    if (this.timer) {
      this.timer = null;
      window.cancelAnimationFrame(this._loopHandler);
    }

    return this;
  }

  public update(): void {
    let now: number         = Date.now(),
        elapsedTime: number = now - this._startTime,
        val: any            = {};

    for(let key in this.end) {
      let start     = this.start[key],
          variation = this.end[key] - start,
          eased     = Tween.Easing[this.setting.easing](elapsedTime, start, variation, this.setting.duration);

      val[key] = eased;
    }

    this.setting.step.apply(this, [val]);

    this.checkSteps(elapsedTime);
  }

  /**
   * Easing
   **/
  public static Easing = {
    linear: (t: number, b: number, c: number, d: number): number => {
      return c * t / d + b;
    },
    easeInQuad: (t: number, b: number, c: number, d: number): number => {
      return c * (t /= d) * t + b;
    },
    easeOutQuad: (t: number, b: number, c: number, d: number): number => {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: (t: number, b: number, c: number, d: number): number => {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: (t: number, b: number, c: number, d: number): number => {
      return c * (t /= d) * t * t + b;
    },
    easeOutCubic: (t: number, b: number, c: number, d: number): number => {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: (t: number, b: number, c: number, d: number): number => {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: (t: number, b: number, c: number, d: number): number => {
      return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: (t: number, b: number, c: number, d: number): number => {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: (t: number, b: number, c: number, d: number): number => {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: (t: number, b: number, c: number, d: number): number => {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: (t: number, b: number, c: number, d: number): number => {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: (t: number, b: number, c: number, d: number): number => {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: (t: number, b: number, c: number, d: number): number => {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: (t: number, b: number, c: number, d: number): number => {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: (t: number, b: number, c: number, d: number): number => {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: (t: number, b: number, c: number, d: number): number => {
      return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: (t: number, b: number, c: number, d: number): number => {
      return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: (t: number, b: number, c: number, d: number): number => {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: (t: number, b: number, c: number, d: number): number => {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: (t: number, b: number, c: number, d: number): number => {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: (t: number, b: number, c: number, d: number): number => {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: (t: number, b: number, c: number, d: number): number => {
      let s: number = 1.70158,
        p: number = 0,
        a: number = c;

      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * .3;
      if (a < Math.abs(c)) {
        a = c;
        let s: number = p / 4;
      } else {
        let s: number = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: (t: number, b: number, c: number, d: number): number => {
      let s: number = 1.70158,
        p: number = 0,
        a: number = c;

      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * .3;
      if (a < Math.abs(c)) {
        a = c;
        let s: number = p / 4;
      } else {
        let s: number = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: (t: number, b: number, c: number, d: number): number => {
      let s: number = 1.70158,
        p: number = 0,
        a: number = c;

      if (t == 0) return b;
      if ((t /= d / 2) == 2) return b + c;
      if (!p) p = d * (.3 * 1.5);
      if (a < Math.abs(c)) {
        a = c;
        let s: number = p / 4;
      } else {
        let s: number = p / (2 * Math.PI) * Math.asin(c / a);
      }
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: (t: number, b: number, c: number, d: number, s: number): number => {
      if (s == undefined) s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: (t: number, b: number, c: number, d: number, s: number): number => {
      if (s == undefined) s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: (t: number, b: number, c: number, d: number, s: number): number => {
      if (s == undefined) s = 1.70158;
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: (t: number, b: number, c: number, d: number): number => {
      return c - Tween.Easing.easeOutBounce(d - t, 0, c, d) + b;
    },
    easeOutBounce: (t: number, b: number, c: number, d: number): number => {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
      }
    },
    easeInOutBounce: (t: number, b: number, c: number, d: number): number => {
      if (t < d / 2) return Tween.Easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
      return Tween.Easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
  };
}

export default Tween;
