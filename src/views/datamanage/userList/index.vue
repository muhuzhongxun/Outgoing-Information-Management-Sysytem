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
      <el-table-column align="center" prop="userId" label="用户编号" />
      <el-table-column align="center" prop="userName" label="用户名" />
      <el-table-column align="center" prop="loginName" label="登录账号" />
      <!-- <el-table-column align="center" prop="password" label="用户密码" /> -->
      <el-table-column align="center" prop="realId" label="认证编号" />
      <el-table-column align="center" prop="phone" label="手机号" />
      <el-table-column align="center" prop="sex" label="性别">
        <template slot-scope="scope">
          <!-- {{ scope.row.sex == '0' ? '男': '女' }} -->
          <el-tag v-if="scope.row.sex == '0'" size="normal">男 </el-tag>
          <el-tag v-if="scope.row.sex == '1'" type="success" size="normal">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isUsed" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isUsed" active-text="启用" :active-value="'0'" :inactive-value="'1'" @change="changeStatus(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="userType" label="身份">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex == '0'" type="info" size="normal">用户</el-tag>
          <el-tag v-if="scope.row.sex == '1'" size="normal">认证用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="credit" label="信誉" />
      <el-table-column align="center" prop="rating" label="评级" />
      <el-table-column align="center" prop="userCreateDate" label="注册日期" />
      <el-table-column align="center" width="200px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="editUser(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
      :page-sizes="[3,10, 20, 40, 80, 100]"
      :page-size="parms.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="parms.total"
      :pager-count="7"
      background
      @size-change="sizeChange"
      @current-change="curentChange"
    />
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
          :inline="true"
          size="medium"
        >
          <el-form-item prop="loginName" label="登陆账号">
            <el-input v-model="addModel.loginName" />
          </el-form-item>
          <el-form-item prop="password" label="登陆密码">
            <el-input v-model="addModel.password" type="password" />
          </el-form-item>
          <el-form-item prop="userName" label="用户名">
            <el-input v-model="addModel.userName" />
          </el-form-item>
          <el-form-item prop="phone" label="手机号">
            <el-input v-model="addModel.phone" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="addModel.sex" style="width:200px">
              <el-radio :label="'0'">男</el-radio>
              <el-radio :label="'1'">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="addModel.isUsed"
              active-text="激活"
              inactive-text="禁用"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
          <el-form-item label="身份">
            <el-select v-model="addModel.userType" placeholder="身份">
              <el-option label="用户" value="0" />
              <el-option label="认证用户" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="信誉">
            <el-input v-model="addModel.credit" placeholder="初始为5.0" />
          </el-form-item>
          <el-form-item label="注册日期">
            <el-col>
              <el-date-picker v-model="addModel.userCreateDate" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-col>
          </el-form-item>
        </el-form>

      </div>
    </SysDialog>
  </el-main>
</template>

<script >
// eslint-disable-next-line no-unused-vars
import { getUserListApi, addUserApi, editUserApi, deleteUserApi } from '@/api/user'
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
        loginName: [
          {
            required: true,
            trigger: 'change',
            message: '请填写账号'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'change',
            message: '请填写密码'
          }
        ],
        userName: [
          {
            required: true,
            trigger: 'change',
            message: '请填写用户名'
          }
        ],
        phone: [
          {
            required: true,
            trigger: 'change',
            message: '请填写正确的手机号'
          },
          {
            validator: function(rule, value, callback) {
              // eslint-disable-next-line eqeqeq
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error('手机号格式错误'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      // 表单绑定的数据
      addModel: {
        userId: null,
        type: '', // 0 为新增，1为编辑
        loginName: '',
        password: '',
        userName: '',
        phone: '',
        sex: '0',
        isUsed: '1',
        userType: '',
        credit: '',
        userCreateDate: new Date()

      },
      // 弹窗属性
      dialog: {
        title: '',
        visible: false,
        height: 300,
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
    // 新增按钮事件,对话框打开
    addUser() {
      // 清空表单数据
      this.$resetForm('addForm', this.addModel)
      this.addModel.type = '0'
      this.dialog.title = '新增用户'
      this.dialog.visible = true
    },
    // 编辑用户操作
    editUser(row) {
      // 清空表单数据
      this.$resetForm('addForm', this.addModel)
      // 设置 type 判断时编辑还是新增时间
      this.addModel.type = '1'
      this.dialog.title = '编辑用户'
      // 把当前编辑的数据回显到表单
      this.$objCopy(row, this.addModel)
      this.dialog.visible = true
      console.log(row)
    },
    // 删除用户操作
    async deleteUser(row) {
      console.log(row)
      const confirm = await this.$myconfirm('确定删除该用户嘛？')
      // console.log(confirm)
      // console.log({ userId: row.userId })
      if (confirm) {
        const res = await deleteUserApi({ userId: row.userId })
        // 删除成功，刷新列表
        // eslint-disable-next-line eqeqeq
        if (res && res.code == 200) {
          this.getUserList()
          // 弹出通知框
          this.$message.success(res.msg)
        }
      }
    },
    // 表格用户状态 按钮点击事件
    async changeStatus(row) {
      console.log(row)
      const parm = {
        userId: row.userId,
        isUsed: row.isUsed
      }
      const res = await editUserApi(parm)
      // eslint-disable-next-line eqeqeq
      if (res && res.code == 200) {
        this.getUserList()
        // 弹出通知框
        this.$message.success(res.msg)
      }
    },
    // 对话框确认事件
    onConfirm() {
      this.$refs.addForm.validate(async(valid) => {
        if (valid) {
          let res = null
          // eslint-disable-next-line eqeqeq
          if (this.addModel.type == '0') {
            // 新增
            res = await addUserApi(this.addModel)
          } else {
            res = await editUserApi(this.addModel)
          }
          // 请求成功，刷新用户列表
          // eslint-disable-next-line eqeqeq
          if (res && res.code == 200) {
            this.getUserList()
            this.dialog.visible = false
            // 弹出通知框
            this.$message.success(res.msg)
          }
          // this.dialog.visible = false
        }
      })
    },
    // 对话框关闭
    onClose() {
      this.dialog.visible = false
    },
    // 获取用户列表
    async getUserList() {
      const res = await getUserListApi(this.parms)
      if (res.code === 200) {
        // console.log(res)
        this.tableList = res.data.records
        // parms列表总条数
        this.parms.total = res.data.total
      }
    },
    // 页容量改变时触发
    async sizeChange(val) {
      // 清空表格列表
      this.tableList = []
      this.parms.pageSize = val
      const res = await getUserListApi(this.parms)
      if (res.code === 200) {
        this.tableList = res.data.records
      }
    },

    // 页数改变时触发
    async curentChange(val) {
      // 清空表格列表
      this.tableList = []
      const res = await getUserListApi(this.parms)
      if (res.code === 200) {
        this.tableList = res.data.records
      }
    }
  }

}
</script>

<style >
.el-input--medium .el-input__inner{
  width:200px
}
 </style>
