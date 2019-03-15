# Atomic Package - tween

## 使用方法

### 読み込み方法

HTMLで読み込む場合（非推奨）

```html
<script src="js/atomic-package.tween.js"></script>
```

npm install して利用する場合（推奨）

```
npm install @atomic-package/tween
```

### JavaScriptで利用する

JavaScriptで利用する方法となります。


こちらのJavaScriptを読み込むと、global objectに 自動で紐付きます。

cocone.common.tweenが対象となります。

```
AP: {
  common: {
    tween: Tween
  }
}
```

npmで管理している場合は、

```
const Tween = require('@atomic-package/tween');

....

let tween = Tween.fromData({
        start: {
            opacity: 0,
            scale: 0.4
        },
        end: {
            opacity: 1,
            scale: 1
        },
        option: {
            duration: 200,
            easing: 'easeInOutCubic',
            step: (val: any) => {
                elem.style.opacity = val.opacity;
                elem.style[this.transform] = 'scale(' + val.scale + ')';
            },
            complete: () => {
                tween = null;
                ....
            }
        }
    });
```

などで利用すると良いでしょう。

### Tweenオブジェクト

Tweenオブジェクトの利用方法です。

ファクトリー関数 fromData関数を用いて利用します。

```
Tween.fromData({
  ...
});
```

**startオブジェクト**

```
Tween.fromData({
  start: {
    opacity: 0
  }
});
```

startオブジェクトには、Tweenアニメーションを開始時の、プロパティと数値を任意で設定できます。


**endオブジェクト**

```
Tween.fromData({
  end: {
    opacity: 1
  }
});
```

endオブジェクトには、Tweenアニメーションを終了時の、プロパティと数値を任意で設定できます。


**optionオブジェクト**

optionオブジェクトは、以下の通りとなります。


```
Tween.fromData({
  option: {
    duration: アニメーションさせる時間,
    easing: Tweenアニメーションの種類,
    step: (val) => {
      Tweenアニメーション中に都度呼び出される関数となります。
      valは、startオブジェクトに設定した keyと値が返却されます。
    },
    complete: () => {
      Tweenアニメーション終了時に呼び出される関数となります。
    }
  }
});
```

## Easing

デフォルト値は `linear` となります。

| TweenName | Detail                | 
| --------------- | -------------------- |
| linear | デフォルト値 （Tween無し） |
| easeInQuad |  |
| easeOutQuad |  |
| easeInOutQuad |  |
| easeInCubic |  |
| easeInOutCubic |   |
| easeInQuart |   |
| easeOutQuart |   |
| easeInOutQuart |   |
| easeInQuint |   |
| easeOutQuint |   |
| easeInOutQuint |   |
| easeInSine |   |
| easeOutSine |   |
| easeInOutSine |   |
| easeInExpo |   |
| easeOutExpo |   |
| easeInOutExpo |   |
| easeInCirc |   |
| easeOutCirc |   |
| easeInOutCirc |   |
| easeInElastic |   |
| easeOutElastic |   |
| easeInOutElastic |   |
| easeInBack |   |
| easeOutBack |   |
| easeInOutBack |   |
| easeInBounce |   |
| easeOutBounce |   |
| easeInOutBounce |   |


Tween Easingを視覚的に確認したい場合は、こちらを参照

[イージング一覧](http://easings.net/ja#)



## 開発手順


gitでcloneしましょう。

```
git clone git@github.com:atomic-package/tween.git
```

npmパッケージをインストールします。

```
npm install
```

npm runコマンドで表示。

```
npm run start
```

`http://localhost:8080/` で、ブラウザが自動で開きます。 

ビルド
```
npm run build
```

