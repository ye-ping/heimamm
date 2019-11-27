<template>
  <div>
    <!-- 头部卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.creater"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" class="medium" icon="el-icon-plus" @click="isShow=!isShow">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="main">
      <!-- main卡片表格 -->
      <el-card class="box-card">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="rid" label="学科编号"></el-table-column>
          <el-table-column prop="name" label="学科名称"></el-table-column>
          <el-table-column prop="short_name" label="简称"></el-table-column>
          <el-table-column prop="creater" label="创建者"></el-table-column>
          <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope">
             {{scope.row.create_time | Time}}
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status===1">启用</span>
              <span class="red" v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" @click="status(scope.row)">
                {{scope.row.status===1 ? '禁用' :'启用'}}
                </el-button>
              <el-button type="text" @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="page"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="sizes"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-card>
    </div>

    <!-- 对话框 -->
    <el-dialog title="新增学科" :visible.sync="isShow">
      <el-form :model="subjectForm" :rules="rules" ref="subjectForm">
        <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
          <el-input v-model="subjectForm.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="subjectForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="subjectForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科间接" :label-width="formLabelWidth">
          <el-input v-model="subjectForm.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="subjectForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="addClick">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑学科" :visible.sync="editShow">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
          <el-input v-model="editForm.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科间接" :label-width="formLabelWidth">
          <el-input v-model="editForm.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary" @click="editClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入api
import { subject } from "../../api/api.js";
// 导入事件处理插件moment
import moment from 'moment'
export default {
  data() {
    return {
      // 行内表单
      formInline: {},
      // 表格
      tableData: [],
      // 对话框显示隐藏
      isShow: false,
      // 学科表单
      subjectForm: {},
      // 学科验证规则
      rules: {
        rid: [{ required: true, message: "请输入学科编号" }],
        name: [{ required: true, message: "请输入学科名称" }]
      },
      // 列表list
      page: 1, //页码
      limit: 5, //页尺寸
      sizes: [5, 10], //选择一页几条
      total: 36, //总页数
      // 编辑对话框
      editForm: {},
      editShow: false,
      formLabelWidth: "80px"
    };
  },
  methods: {
    // 确定时再次验证表单
    addClick() {
      this.$refs.subjectForm.validate(valid => {
        if (valid) {
          // 成功
          this.isShow = false;
          subject.add(this.subjectForm).then(res => {
            // window.console.log(res);
           
            this.$message.success(res.data.message);
            this.page = 1;
            this.list(); //刷新
          });
        } else {
          // 失败
          return false;
        }
      });
    },
    list() {
      subject
        .list({ page: this.page, limit: this.limit, ...this.formInline })
        .then(res => {
          window.console.log(res);
          //  赋值给表格,渲染页面
          this.tableData = res.data.data.items;
          this.total = res.data.data.pagination.total;
        });
    },
    //点击搜索,再次获取数据
    search() {
      this.page = 1;
      this.list();
    },
    //分页函数
    handleSizeChange(val) {
      this.page = 1;
      this.limit = val;
      this.list();
    },
    // 当前页
    handleCurrentChange(val) {
      this.page = val;
      this.list();
    },
    // 删除
    remove(data) {
      this.$confirm("此操作将永久删除该文件", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          subject
            .remove({
              id: data.id
            })
            .then(res => {
              window.console.log(res.data.message);
              this.list(); //刷新
              this.$message.success("删除成功");
            });
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "已取消删除"
          });
        });
    },
    // 禁用与启用
    status(data) {
      window.console.log(data);
      subject
        .status({
          id: data.id,
          status: data.status === 1 ? 0 : 1
        })
        .then(res => {
          window.console.log(res.data.message);
          window.console.log(data.status);
          this.list();
        });
    },
  
    //编辑
    edit(data) {
      // 弹框
      this.editShow = true;
      this.editForm = JSON.parse(JSON.stringify(data));
    },
    // 保存按钮
    editClick() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 成功
          this.editShow = false;
          subject.edit(this.editForm).then(res => {
            window.console.log(res);
            this.$message.success("新增成功");
            // this.page = 1;
            this.list(); //刷新
          });
        } else {
          // 失败
          return false;
        }
      });
    }
  },
  // 局部过滤器
  filters:{
    Time(value){
      return moment(value).format('YYYY-MM-DD');
    }
  },
  // 生命周期钩子
  created() {
    subject
      .list({
        page: this.page,
        limit: this.limit
      })
      .then(res => {
        window.console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
  }
};
</script>

<style lang="less">
// 对话框样式
.el-dialog__wrapper .el-dialog {
  width: 602px;
  height: 455px;
  .el-dialog__body {
    padding-bottom: 0px;
  }
  .el-dialog__close {
    color: white;
  }
}
.dialog-footer {
  text-align: center;
}
.el-dialog__header {
  text-align: center;
  background: linear-gradient(to right, #02c4fa, #1395fa);
  .el-dialog__title {
    color: white;
  }
}

.el-form-item__content {
  margin-right: 11px;
}
.medium {
  width: 117px;
}
.main {
  margin-top: 20px;
}
.page {
  text-align: center;
  margin: 30px 0 0 0;
}
.red {
  color: red;
}
</style>