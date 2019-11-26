<template>
  <div>
    <!-- 头部卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.creater"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.tag" placeholder="请选择状态">
            <el-option label="金融" value="金融"></el-option>
            <el-option label="互联网" value="互联网"></el-option>
            <el-option label="电商" value="电商"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" class="medium" icon="el-icon-plus" @click="isShow=true">新增企</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="main">
      <!-- main卡片 表格 -->
      <el-card class="box-card">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="eid" label="企业编号"></el-table-column>
          <el-table-column prop="name" label="企业名称"></el-table-column>
          <el-table-column prop="tag" label="所属领域"></el-table-column>
          <el-table-column prop="creater" label="创建者"></el-table-column>
          <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope">
              {{scope.row.create_time | qiye-Time}}
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
              <el-button type="text" @click="status(scope.row)">{{scope.row.status==1?'启用':'禁用'}}</el-button>
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

    <!-- 新增对话框 -->
    <el-dialog title="企业新增" :visible.sync="isShow">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
          <el-input v-model="addForm.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属领域">
          <el-select v-model="addForm.tag" placeholder="请选择状态">
            <el-option label="金融" value="金融"></el-option>
            <el-option label="互联网" value="互联网"></el-option>
            <el-option label="电商" value="电商"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业简称" :label-width="formLabelWidth">
          <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" :label-width="formLabelWidth">
          <el-input v-model="addForm.intro" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="企业备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="addClick">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="企业新增" :visible.sync="editShow">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
          <el-input v-model="editForm.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属领域" :label-width="formLabelWidth">
          <el-select v-model="editForm.tag" placeholder="请选择状态">
            <el-option label="金融" value="金融"></el-option>
            <el-option label="互联网" value="互联网"></el-option>
            <el-option label="电商" value="电商"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建者" :label-width="formLabelWidth">
          <el-input v-model="editForm.creater" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input v-model="editForm.create_time" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="editForm.status" placeholder="请选择状态">
            <el-option label="启用" value="启用"></el-option>
            <el-option label="禁用" value="禁用"></el-option>
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
// 导入api接口
import { qiye } from "../../api/api.js";
export default {
  data() {
    return {
      // 行内表单
      formInline: {},
      // 表格
      tableData: [],
      isShow: false, //对话框显示隐藏
      //新增对话框
      addForm: {},
      editShow: false, //编辑
      //编辑对黄狂
      editForm: {},
      rules: {
        eid: [{ required: true, message: "请输入企业编号" }],
        name: [{ required: true, message: "请输入企业名称" }]
      },
      // 分页
      page: 1, //第一页
      sizes: [5, 10], //一页几条
      limit: 5,
      total: 36, //一共几条
      formLabelWidth: "80px" //文字宽度
    };
  },
  methods: {
    // list抽取
    list() {
      qiye
        .list({ page: this.page, limit: this.limit, ...this.formInline })
        .then(res => {
          this.tableData = res.data.data.items;
          this.total = res.data.data.pagination.total;
        });
    },
    //搜索事件
    search() {
      this.list();
      window.console.log("哈哈哈");
    },
    //分页事件
    handleSizeChange(val) {
      // window.console.log(`每页 ${val} 条`);
      this.limit = val;
      this.page = 1;
      this.list(); //刷新
    },
    handleCurrentChange(val) {
      this.page = val;
      // window.console.log(`当前页: ${val}`);
      this.list();
    },
    // 新增
    // 确定时再次验证表单
    addClick() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 成功
          this.isShow = false;
          qiye.add(this.addForm).then(res => {
            window.console.log(res);
            this.$message.success("新增成功");
            this.page = 1;
            this.list(); //刷新
          });
        } else {
          // 失败
          return false;
        }
      });
    },
    // 启用禁用
    status(data) {
      qiye.status({ id: data.id }).then(res => {
        window.console.log(res, data.id);
        this.list(); //刷新
      });
    },
    //删除
    remove(data) {
      qiye.remove({ id: data.id }).then(res => {
        this.$message.success(res.data.message);
        this.list(); //刷新数据
      });
    },
    // 编辑
    edit(data) {
      window.console.log(data);
      this.editForm = JSON.parse(JSON.stringify(data));
      this.editShow = true;
    },
    //确定编辑
    editClick() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 成功
          this.editShow = false;
          qiye.edit(this.editForm).then(res => {
            window.console.log(res);
            this.$message.success("编辑成功");
            this.page = 1;
            this.list(); //刷新
          });
        } else {
          // 失败
          return false;
        }
      });
    }
  },
  // 生命周期钩子
  created() {
    qiye
      .list({
        page: 1,
        limit: 5
      })
      .then(res => {
        window.console.log(res);
        //渲染表格
        this.tableData = res.data.data.items;
        //获取总页数
        this.total = res.data.data.pagination.total;
      });
  }
};
</script>

<style lang="less">
.el-dialog__wrapper {
  .el-dialog {
    height: 550px;
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