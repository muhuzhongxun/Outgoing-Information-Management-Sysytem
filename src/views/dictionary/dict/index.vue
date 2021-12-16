<template>
  <el-main>
    <el-form
      ref="searchForm"
      :model="parms"
      label-width="80px"
      :inline="true"
      size="small"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="getChildrens"
    >
      <el-form-item label="字节名称">
        <el-input v-model="parms.name" />
      </el-form-item>
      <el-form-item label="字节编码">
        <el-input v-model="parms.dictCode" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addUser">新增</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true" size="small">
      <el-form-item>
        <el-button icon="el-icon-upload2" @click="importData">导入</el-button>
        <a href="http://localhost:8089/api/dict/exportData" target="_blank">
          <el-button icon="el-icon-download">导出</el-button>
        </a>
      </el-form-item>
    </el-form>

    <!-- 导入的弹窗界面 -->
    <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8089/api/dict/importData'"
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
    <!-- 数据字典列表展示 -->
    <div class="app-container">
      <el-table
        :data="tableList"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="getChildrens"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="名称" width="230" align="left" />
        <el-table-column prop="dictCode" label="编码" width="220" />
        <el-table-column prop="value" label="值" width="230" align="left" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <!-- <el-table-column label="名称" width="230" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="编码" width="220">
          <template slot-scope="{row}">
            {{ row.dictCode }}
          </template>
        </el-table-column>
        <el-table-column sortable label="值" width="230" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </el-main>
</template>

<script>
import { getDictListApi } from '@/api/dict'
export default {
  data() {
    return {
      // 搜索框的数据绑定
      parms: {
        id: '',
        name: '',
        dictCode: ''
        // curentPage: 1,
        // pageSize: 10,
        // total: 0
      },
      // 默认导入的弹窗关闭
      dialogImportVisible: false,
      tableList: []
    }
  },
  created() {
    // 初始化加载所有数据字典信息
    this.getDictList(1)
  },
  methods: {
    // 打开导入弹窗
    importData() {
      this.dialogImportVisible = true
    },
    onUploadSuccess(response, file) {
      this.$message.info('上传成功')
      this.dialogImportVisible = false
      this.fetchData()
    },
    // 根据id对应的子数据列表
    async getDictList(row) {
      const res = await getDictListApi({ id: row })
      if (res.code === 200) {
        this.tableList = res.data
      }
    },
    async getChildrens(tree, treeNode, resolve) {
      const res = await getDictListApi({ id: tree.id })
      if (res.code === 200) {
        resolve(res.data)
      }
    }

  }
}
</script>
