<script setup lang="ts">
import { onLaunch, onShow, onHide, onThemeChange } from '@dcloudio/uni-app'
import useSystemStore from '@/store/module/system'
import { useProxy } from '@/utils/proxy'
const systemStore = useSystemStore()
const { proxy } = useProxy()
onLaunch(() => {
  update()

  // 获取系统主题
  uni.getSystemInfo({
    success(res) {
      if (res.theme) {
        systemStore.updateTheme(res.theme as 'light' | 'dark')
      }
    }
  })
})
onShow(() => {})
onHide(() => {})

/**
 * 监听主题切换
 */
onThemeChange((data) => {
  systemStore.updateTheme(data.theme)
})

/**
 * 小程序更新
 */
const update = () => {
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    if (!res.hasUpdate) return
    updateManager.onUpdateReady(function (res) {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
  })
}
</script>
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-plus/index.scss';
@import 'uview-plus/theme.scss';
@import '../public/font/iconfont.css';
@import './common/style/index.scss';

@media (prefers-color-scheme: dark) {
  page {
    background: $system-bg-dark;
    color: $system-text-dark;
  }
}

@media (prefers-color-scheme: light) {
  page {
    background: $system-bg-light;
    color: $system-text-light;
  }
}

.df {
  display: flex;
}
.fdr {
  flex-direction: row;
}
.fdc {
  flex-direction: column;
}
.fww {
  flex-wrap: wrap;
}
.jcc {
  justify-content: center;
}
.jcsb {
  justify-content: space-between;
}
.ais {
  align-items: flex-start;
}
.aic {
  align-items: center;
}
html,
body,
#app {
  height: 100%;
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  vertical-align: baseline;
  text-decoration: none;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
ol,
ul {
  list-style: none;
}
a {
  outline: none;
  text-decoration: none;
  -webkit-backface-visibility: hidden;
}
a:focus {
  outline: none;
}
</style>
