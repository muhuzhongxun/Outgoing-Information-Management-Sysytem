<template>
  <el-main>
    <!-- 搜索框
         :model 表单绑定的数据域
         ref 相当于div的id，在当前页面是唯一的
         :inline为true时，排列在一行
     -->
    <el-form ref="searchForm" :model="parms" label-width="90px" :inline="true" size="small">
      <el-form-item label="姓名">
        <!-- 此处userName就是对应realName，为了复用后端分页代码，所以不需要变动 -->
        <el-input v-model="parms.userName" @keyup.enter.native="getIdentityList" />
      </el-form-item>
      <el-form-item label="后4位证件号">
        <el-input v-model="parms.phone" @keyup.enter.native="getIdentityList" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" @click="getIdentityList">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addIdentity">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 用户列表 -->
    <el-table :data="tableList" :height="tableHeight" size="small" border stripe>
      <el-table-column width="100" align="center" prop="realId" label="认证编号" />
      <el-table-column width="100" align="center" prop="userId" label="用户编号" />
      <el-table-column align="center" prop="realName" label="真实姓名" />
      <el-table-column width="150" align="center" prop="cardId" label="身份证证件号" />
      <el-table-column align="center" prop="cardStart" label="有效身份证起始日期" />
      <el-table-column align="center" prop="cardEnd" label="有效身份证截至日期" />
      <el-table-column align="center" prop="realDate" label="认证日期" />
      <el-table-column align="center" prop="realStatus" label="认证状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex == '0'" size="normal">未通过</el-tag>
          <el-tag v-if="scope.row.sex == '1'" type="success" size="normal">通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="picture1" label="身份证正面照" />
      <el-table-column align="center" prop="picture2" label="身份证背面照" />
      <el-table-column align="center" prop="picture3" label="预留" />
      <el-table-column align="center" width="200px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-more" size="small" @click="seeIdentity(scope.row)">详情</el-button>
          <el-button disabled type="danger" icon="el-icon-delete" size="small" @click="deleteIdentity(scope.row)">删除</el-button>
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
          <el-form-item prop="userId" label="用户编号">
            <el-input v-model="addModel.userId" />
          </el-form-item>
          <el-form-item prop="realName" label="真实姓名">
            <el-input v-model="addModel.realName" type="realName" />
          </el-form-item>
          <el-form-item prop="cardId" label="身份证证件号">
            <el-input v-model="addModel.cardId" />
          </el-form-item>
          <el-form-item label="认证状态">
            <el-switch
              v-model="addModel.realStatus"
              active-text="通过"
              inactive-text="未通过"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
          <el-form-item label="起始日期">
            <el-col>
              <el-date-picker v-model="addModel.cardStart" type="date" placeholder="选择日期" style="width: 90%;" />
            </el-col>
          </el-form-item>
          <el-form-item label="截至日期">
            <el-col>
              <el-date-picker v-model="addModel.cardEnd" type="date" placeholder="选择日期" style="width: 90%;" />
            </el-col>
          </el-form-item>
          <el-form-item label="认证日期">
            <el-col>
              <el-date-picker v-model="addModel.realDateEnd" type="date" placeholder="选择日期" style="width: 90%;" />
            </el-col>
          </el-form-item>
        </el-form>

      </div>
    </SysDialog>
  </el-main>
</template>

<script >
// eslint-disable-next-line no-unused-vars
import { getIdentityListApi, addIdentityListApi, deleteIdentityListApi } from '@/api/userReal'
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
        userId: [
          {
            required: true,
            trigger: 'change',
            message: '请填写用户编号'
          }
        ],
        realName: [
          {
            required: true,
            trigger: 'change',
            message: '请填写真实姓名'
          }
        ],
        cardId: [
          {
            required: true,
            trigger: 'change',
            message: '请填写正确身份证证件号'
          },
          {
            validator: function(rule, value, callback) {
              if (/(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/.test(value) === false) {
                callback(new Error('身份证证件号格式错误'))
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
        realId: null,
        type: '', // 0 为新增，1为编辑
        userId: '',
        realName: '',
        cardId: '',
        realStatus: '1',
        cardStart: '',
        cardEnd: '',
        realDateStart: new Date(),
        realDateEnd: ''
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
    this.getIdentityList()
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 180
    })
  },
  methods: {
    // 新增按钮事件,对话框打开
    addIdentity() {
      // 清空表单数据
      this.$resetForm('addForm', this.addModel)
      this.addModel.type = '0'
      this.dialog.title = '新增认证信息'
      this.dialog.visible = true
    },
    // 查看详情用户认证信息操作
    seeIdentity(row) {
      // // 清空表单数据
      // this.$resetForm('addForm', this.addModel)
      // // 设置 type 判断时编辑还是新增时间
      // this.addModel.type = '1'
      // this.dialog.title = '编辑认证信息'
      // // 把当前编辑的数据回显到表单
      // this.$objCopy(row, this.addModel)
      // this.dialog.visible = true
      // console.log(row)
    },
    // 删除认证信息操作
    async deleteIdentity(row) {
      console.log(row)
      const confirm = await this.$myconfirm('确定删除该认证信息嘛？')
      // console.log(confirm)
      // console.log({ realId: row.realId })
      if (confirm) {
        const res = await deleteIdentityListApi({ realId: row.realId })
        // 删除成功，刷新列表
        // eslint-disable-next-line eqeqeq
        if (res && res.code == 200) {
          this.getIdentityList()
          // 弹出通知框
          this.$message.success(res.msg)
        }
      }
    },
    // // 表格用户状态 按钮点击事件
    // async changeStatus(row) {
    //   console.log(row)
    //   const parm = {
    //     realId: row.realId,
    //     isUsed: row.isUsed
    //   }
    //   const res = await editIdentityListApi(parm)
    //   // eslint-disable-next-line eqeqeq
    //   if (res && res.code == 200) {
    //     this.getIdentityList()
    //     // 弹出通知框
    //     this.$message.success(res.msg)
    //   }
    // },
    // 对话框确认事件
    onConfirm() {
      this.$refs.addForm.validate(async(valid) => {
        if (valid) {
          let res = null
          // eslint-disable-next-line eqeqeq
          if (this.addModel.type == '0') {
            // 新增
            res = await addIdentityListApi(this.addModel)
          }
          // 请求成功，刷新用户列表
          // eslint-disable-next-line eqeqeq
          if (res && res.code == 200) {
            this.getIdentityList()
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
    async getIdentityList() {
      const res = await getIdentityListApi(this.parms)
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
      const res = await getIdentityListApi(this.parms)
      if (res.code === 200) {
        this.tableList = res.data.records
      }
    },

    // 页数改变时触发
    async curentChange(val) {
      // 清空表格列表
      this.tableList = []
      const res = await getIdentityListApi(this.parms)
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
