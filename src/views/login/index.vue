<template>
  <div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center;margin-top:150px">
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>后台管理系统</span>
        </div>
        <table>
          <tr>
            <td>用户名</td>
            <td>
              <el-input v-model="user.loginName" placeholder="请输入用户名" />
            </td>
          </tr>
          <tr>
            <td>密码</td>
            <td>
              <el-input
                v-model="user.password"
                type="password"
                placeholder="请输入密码"
                @keydown.enter.native="handleLogin"
              />
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <td>
              <div class="s-canvas" @click="createdCode">
                <canvas id="s-canvas" :width="contentWidth" :height="contentHeight" />
              </div>
            </td>
            <td>
              <el-input v-model="user.identifyCode" placeholder="请输入验证码" />
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2" align="center">
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
              <el-button style="width: 150px" type="primary" @click="handleLogin">登录</el-button>
              <el-link type="danger" style="margin-left: 25px">忘记密码？</el-link>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    fontSizeMin: {
      type: Number,
      default: 25
    },
    fontSizeMax: {
      type: Number,
      default: 30
    },
    backgroundColorMin: {
      type: Number,
      default: 255
    },
    backgroundColorMax: {
      type: Number,
      default: 255
    },
    colorMin: {
      type: Number,
      default: 0
    },
    colorMax: {
      type: Number,
      default: 160
    },
    lineColorMin: {
      type: Number,
      default: 100
    },
    lineColorMax: {
      type: Number,
      default: 255
    },
    dotColorMin: {
      type: Number,
      default: 0
    },
    dotColorMax: {
      type: Number,
      default: 255
    },
    contentWidth: {
      type: Number,
      default: 120
    },
    contentHeight: {
      type: Number,
      default: 34
    }
  },
  data() {
    return {
      /* 点击登录返回用户姓名密码以及用户类型*/
      user: {
        loginName: 'muhuzhongxun',
        password: '123456'
      },
      identifyCode: ''
    }
  },
  mounted() {
    this.createdCode()
  },
  methods: {
    handleLogin() {
      // 原验证码：this.identifyCode； 输入的验证码：this.user.identifyCode；  touppercase()将字符串换成大写。
      if (this.identifyCode.toUpperCase() !== this.user.identifyCode.toUpperCase()) {
        alert('请重新输入验证码！')
      } else {
        this.$store.dispatch('user/login', this.user).then(() => {
          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },

    // 生成4个随机数
    createdCode() {
      const len = 4
      const codeList = []
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
      const charsLen = chars.length
      for (let i = 0; i < len; i++) {
        codeList.push(chars.charAt(Math.floor(Math.random() * charsLen)))
      }
      this.identifyCode = codeList.join('')
      this.$emit('getIdentifyCode', this.identifyCode.toLowerCase())
      this.drawPic()
    },

    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      const r = this.randomNum(min, max)
      const g = this.randomNum(min, max)
      const b = this.randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },

    drawPic() {
      const canvas = document.getElementById('s-canvas')
      const ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      // 绘制背景
      ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i)
      }
      this.drawLine(ctx)// 添加干扰线
      // this.drawDot(ctx)//添加干扰点
    },

    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
      ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
      const x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
      const y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
      var deg = this.randomNum(-45, 45)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    },

    // 绘制干扰线
    drawLine(ctx) {
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
        ctx.beginPath()
        ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
        ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
        ctx.stroke()
      }
    },

    // 绘制干扰点
    drawDot(ctx) {
      for (let i = 0; i < 80; i++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    }

  }

}

</script>

<style scoped>
@import '//unpkg.com/element-ui@2.15.2/lib/theme-chalk/index.css';

.el-select {
  /*补加让选择器填充tr空间，与上面的两个文本框保持大小一致*/
  width: 100%;
}

.s-canvas {
  height: 38px;
  cursor: pointer;
}

.s-canvas canvas {
  margin-top: 1px;
  margin-left: 8px;
}
</style>
