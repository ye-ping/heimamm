<template>
  <div>
    <!-- 头部 -->
    <el-card class="box-card">
      <!-- 行内表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.role" placeholder="请选择状态">
            <el-option label="老师" value="老师"></el-option>
            <el-option label="学生" value="学生"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addShow=true">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="date" label="序号" type="index"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span class="red" v-if="scope.row.status==0">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" @click="status(scope.row)">{{scope.row.status==1? '启用':'禁用' }}</el-button>
            <el-button type="text" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="sizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 新增框 -->
    <el-dialog title="新增用户" :visible.sync="addShow">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="addForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="addForm.role" placeholder="请选角色">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="学生" value="学生"></el-option>
            <el-option label="老师" value="老师"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="addForm.status" placeholder="请选择状态">
            <el-option label="禁用" :value="addForm.status==0?'禁用':'启用'"></el-option>
            <el-option label="启用" value="启用"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="primary" @click="addClick">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑框 -->
    <el-dialog title="编辑用户" :visible.sync="editShow">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="editForm.role" placeholder="请选择活动区域">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="老师" value="老师"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="editForm.status" placeholder="请选择活动区域">
            <el-option label="启用" :value="addForm.status==0?'禁用':'启用'"></el-option>
            <el-option label="禁用" value=""></el-option>
          </el-select>
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
// 导入用户api
import { user } from "../../api/api.js";
export default {
  name: "user",
  data() {
    return {
      //行内表单
      formInline: {},
      // 表格
      tableData: [],
      //分页
      total: 36, //总页数
      page: 1, //当前页
      sizes: [5, 10],
      limit: 5, //默认一页5条
      //新增对话框
      addForm: {},
      //是否显示
      addShow: false,
      //编辑框
      editForm: {},
      editShow: false,
      value:'启用',
      //规则
      rules: {
        name: [{ required: true, message: "用户名不能为空" }],
        email: [{ required: true, message: "用邮箱不能为空" }],
        phone: [{ required: true, message: "用电话不能为空" }]
      },
      //宽度
      formLabelWidth: "70px"
    };
  },
  //事件
  methods: {
    //公用部分
    list() {
      user
        .list({ page: this.page, limit: this.limit, ...this.formInline })
        .then(res => {
          window.console.log(res);
          (this.total = res.data.data.pagination.total),
            (this.tableData = res.data.data.items);
        });
    },
    // 搜索
    search() {
      this.page = 1;
      this.list();
    },
    // 分页插件
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
      this.limit = val;
      this.page = 1;
      this.list();
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
      this.page = val;
      this.list();
    },

    // 新增
    addClick() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          user.add(this.addForm).then(res => {
            this.addShow = false;
            this.$message.success(res.data.message);
            this.page = 1;
            this.list();
            window.console.log(res);
          });
        } else {
          return false;
        }
      });
    },
    // 状态
    status(data) {
      window.console.log(data.id);
      user.status({ id: data.id }).then(res => {
        this.$message.success(res.data.message);
        this.list(); //刷新页面
      });
    },
    //删除
    remove(data) {
      user.remove({ id: data.id }).then(res => {
        this.$message.success(res.data.message);
        this.list();
      });
    },
    // 编辑
    edit(data) {
      //使用深拷贝
      this.editForm = JSON.parse(JSON.stringify(data));
      this.editShow = true;
    },
    //确定编辑按钮
    editClick(){
       this.$refs.editForm.validate((valid) => {
          if (valid) {
            // 验证成功,发送axios
            this.editShow=false;
            user.edit(this.editForm).then(res=>{
              this.$message.success(res.data.message);
              this.list();//刷新页面
            })
            // alert('submit!');
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
    }
  },
  // 生命周期钩子
  created() {
    user
      .list({
        page: this.page,
        limit: this.limit
      })
      .then(res => {
        window.console.log(res);
        (this.total = res.data.data.pagination.total),
          (this.tableData = res.data.data.items);
      });
  }
};
</script>

<style lang="less">
.el-card__body .el-form--inline .el-form-item {
  margin-right: 20px;
}
.el-card__body .el-button {
  margin-right: 20px;
}
.box-card {
  margin-top: 20px;
}
.red {
  color: red;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>