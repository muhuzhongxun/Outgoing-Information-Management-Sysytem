<template>
  <el-main>
    <!-- 搜索框
         :model 表单绑定的数据域
         ref 相当于div的id，在当前页面是唯一的
         :inline为true时，排列在一行
     -->
    <el-form ref="searchForm" :model="parms" label-width="80px" :inline="true" size="small">
      <el-form-item label="姓名">
        <el-input v-model="parms.userName" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="parms.phone" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addUser">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 用户列表 -->
    <el-table :data="tableList" :height="tableHeight" size="small" border stripe>
      <el-table-column prop="userId" label="用户编号" />
      <el-table-column prop="loginName" label="登录账号" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="realId" label="认证编号" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="isUsed" label="状态" />
      <el-table-column prop="userType" label="身份" />
      <el-table-column prop="credit" label="信誉" />
      <el-table-column prop="rating" label="评级" />
      <el-table-column prop="userCreateDate" label="注册日期" />
    </el-table>
    <!-- 分页
      current-page 当前页数
      page-sizes
      page-size 每页几条数据
      total 总条数
      size-change 页容量改变时触发事件
      curent-change 页数改变时触发
    -->
    <el-pagination
      :current-page.sync="parms.curentPage"
      :page-sizes="[10, 20, 40, 80, 100]"
      :page-size="parms.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="parms.total"
      background
      @size-change="sizeChange"
      @current-change="curentChange"
    >
      :pager-count="7">
    </el-pagination>
    <!-- 新增或编辑弹窗 -->
    <SysDialog
      :title="dialog.title"
      :visible="dialog.visible"
      :height="dialog.height"
      :width="dialog.width"
      @onClose="onClose"
      @onConfirm="onConfirm"
    >
      <div slot="content">
        <el-form
          ref="addForm"
          :model="addModel"
          :rules="rules"
          label-width="80px"
          :inline="false"
          size="small"
        >
          <el-form-item prop="loginName" label="登陆账号">
            <el-input v-model="addModel.loginName" />
          </el-form-item>
          <el-form-item prop="userName" label="用户名">
            <el-input v-model="addModel.userName" />
          </el-form-item>
        </el-form>

      </div>
    </SysDialog>
  </el-main>
</template>

<script >
import { getUserListApi } from '@/api/user'
import SysDialog from '@/components/System/SysDialog/index'
export default {
  // 组件在使用时需要注册
  components: {
    SysDialog
  },
  data() {
    return {
      // 表单验证的规则
      rules: {
        userName: [
          {
            required: true,
            trigger: 'change',
            message: '请填写姓名'
          }
        ]
      },
      // 表单绑定的数据
      addModel: {
        loginName: '',
        userName: ''
      },
      // 弹窗属性
      dialog: {
        title: '',
        visible: false,
        height: 400,
        width: 600
      },
      // 表格的高度
      tableHeight: 0,
      // 搜索框的数据绑定
      parms: {
        userName: '',
        phone: '',
        curentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableList: []
    }
  },
  created() {
    this.getUserList()
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 180
    })
  },
  methods: {
    // 对话框确认事件
    onConfirm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.dialog.visible = false
        }
      })
    },
    // 对话框关闭
    onClose() {
      this.dialog.visible = false
    },
    // 新增按钮事件,对话框打开
    addUser() {
      this.dialog.title = '新增用户'
      this.dialog.visible = true
    },
    // 获取用户列表
    async getUserList() {
      const res = await getUserListApi(this.parms)
      if (res.code === 200) {
        console.log(res)
        this.tableList = res.data.records
      }
    },
    // 页容量改变时触发
    sizeChange(val) {

    },

    // 页数改变时触发
    curentChange() {

    }
  }

}
</script>

<style >
 </style>
