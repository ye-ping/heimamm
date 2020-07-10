<template>
  <div class="question">
    <!-- header卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <!-- 第一行 -->
        <div class="one">
          <el-form-item label="学科">
            <el-select v-model="formInline.subject" placeholder="请选择学科">
              <el-option
                v-for="(item,index) in subjectList"
                :key="index"
                :label="item.name"
                value="shanghai"
              ></el-option>
              <!-- <el-option label="区域二" value="beijing"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="阶段">
            <el-select v-model="formInline.step" placeholder="请选择阶段">
              <el-option label="初级" value="shanghai"></el-option>
              <el-option label="中级" value="beijing"></el-option>
              <el-option label="高级" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业">
            <el-select v-model="formInline.enterprise" placeholder="请选择企业">
              <!-- <el-option label="区域一" value="shanghai"></el-option> -->
              <el-option
                v-for="(item,index) in qiyeList"
                :label="item.name"
                :key="index"
                value="beijing"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型">
            <el-select v-model="formInline.type" placeholder="请选择题型">
              <el-option label="单选" value="单选"></el-option>
              <el-option label="多选" value="多选"></el-option>
              <el-option label="简答" value="简答"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 第二行 -->
        <div class="block">
          <el-form-item label="难度">
            <el-select v-model="formInline.diffculty" placeholder="请选择难度">
              <el-option label="简单" value="简单"></el-option>
              <el-option label="一般" value="一般"></el-option>
              <el-option label="困难" value="困难"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者" class="avatar">
            <el-input v-model="formInline.creater" placeholder="作者"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.status" placeholder="请选择状态">
              <el-option label="禁用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <span class></span>
            <el-date-picker v-model="formInline.create_date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="标题" class="title">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" @click="addQues" icon="el-icon-plus">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- main卡片 -->
    <el-card class="box-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="题目" width="180">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="step" label="学科.阶段" width="180">
          <template slot-scope="scope">{{scope.row.subject_name}}--{{scope.row.step}}</template>
        </el-table-column>
        <el-table-column prop="type" label="题型" width="180"></el-table-column>
        <el-table-column prop="enterprise_id" label="企业" width="180"></el-table-column>
        <el-table-column prop="creater" label="创建者" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="访问量" width="180"></el-table-column>
        <el-table-column prop="name" label="操作 " width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" @click="status(scope.row)">{{scope.row.status==1? "禁用":"启用"}}</el-button>
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
    <el-dialog title="收货地址" :visible.sync="addShow" class="important" @opened="Wang">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
          <el-select v-model="addForm.subject" placeholder="请选择学科">
            <el-option
              v-for="(item ,index) in subjectList"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
            <!-- <el-option label="java" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
          <el-select v-model="addForm.step" placeholder="请选择阶段">
            <el-option label="初级" value="初级"></el-option>
            <el-option label="中级" value="中级"></el-option>
            <el-option label="高级" value="高级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
          <el-select v-model="addForm.enterprise" placeholder="请选择企业">
            <el-option
              v-for="(item ,index) in qiyeList"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
          <el-select v-model="addForm.city[0]" placeholder="请选择城市">
            <el-option label="深圳" value="深圳"></el-option>
            <el-option label="广州" value="广州"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
          <el-radio-group v-model="addForm.type">
            <el-radio label="单选">单选</el-radio>
            <el-radio label="3">多选</el-radio>
            <el-radio label="6">简答</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
          <el-radio-group v-model="addForm.difficulty">
            <el-radio label="简单">简单</el-radio>
            <el-radio label="4">一般</el-radio>
            <el-radio label="5">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="line"></div>
        <!-- 富文本编辑器1 -->
        <el-form-item label="试题标题" prop="title" :label-width="formLabelWidth">
          <div ref="editor" class="text"></div>
        </el-form-item>
        <!-- 单选 -->
        <el-form-item label="单选" prop="select_options" :label-width="formLabelWidth">
          <el-radio-group v-model="addForm.danxuan">
            <div class="radio-input">
              <el-radio :label="3">A</el-radio>
              <el-input></el-input>
              <el-upload
                name="image"
                class="avatar-uploader"
                action="http://183.237.67.218:3002/question/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-button type="primary">上传缩略图</el-button>
                <el-button type="info">还未上传</el-button>
              </el-upload>
            </div>
            <div class="radio-input">
              <el-radio :label="6">B</el-radio>
              <el-input></el-input>
              <el-upload
                name="image"
                class="avatar-uploader"
                action="http://183.237.67.218:3002/question/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-button type="primary">上传缩略图</el-button>
                <el-button type="info">还未上传</el-button>
              </el-upload>
            </div>
            <div class="radio-input">
              <el-radio :label="9">C</el-radio>
              <el-input></el-input>
              <el-upload
                name="image"
                class="avatar-uploader"
                action="http://183.237.67.218:3002/question/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-button type="primary">上传缩略图</el-button>
                <el-button type="info">还未上传</el-button>
              </el-upload>
            </div>
            <div class="radio-input">
              <el-radio :label="8">D</el-radio>
              <el-input></el-input>
              <el-upload
                name="image"
                class="avatar-uploader"
                action="http://183.237.67.218:3002/question/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-button type="primary">上传缩略图</el-button>
                <el-button type="info">还未上传</el-button>
              </el-upload>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="解析视频" prop="video" :label-width="formLabelWidth">
          <el-upload
            name="image"
            class="avatar-uploader"
            action="http://183.237.67.218:3002/question/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button type="primary">点击上传</el-button>
            <div>只能上传视频格式文件</div>
          </el-upload>
        </el-form-item>
        <!-- 线 -->
        <div class="line"></div>
        <!-- 富文本编辑器2 -->
        <el-form-item label="答案解析" prop="answer_analyze" :label-width="formLabelWidth">
          <div ref="editors" class="text"></div>
        </el-form-item>
        <div class="line"></div>
        <el-form-item label="试题备注" prop="remark" :label-width="formLabelWidth">
          <el-input class="input-last" v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="primary" @click="addBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入题库api接口
import { question, subject, qiye } from "../../api/api.js";
//导入wang编辑器
import WangEditor from "wangeditor";
export default {
  data() {
    return {
      //行内表单
      formInline: {},
      //日期
      value1: "",
      //表格
      tableData: [],
      //分页
      page: 1,
      sizes: [5, 10],
      limit: 5,
      total: 36,
      //新增框
      addForm: {
        type: "单选",
        city: ["天津市", "市辖区"],
        title: "",
        answer_analyze: "",
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ],
        subject: 11,
        step: "初级",
        enterprise: 15,
        difficulty: "简单",
        single_select_answer: "A",
        video: "upload/20191129/bd666ff11c11cc01f494d6ba49757a64.png",
        remark: "好好吃东西哦"
      },
      addShow: false,
      formLabelWidth: "80px",
      imageUrl: "",

      //验证规则
      rules: {
        subject: [{ required: true, message: "学科不能为空" }],
        step: [{ required: true, message: "阶段不能为空" }],
        enterprise: [{ required: true, message: "企业不能为空" }],
        city: [{ required: true, message: "城市不能为空" }],
        type: [{ required: true, message: "题型不能不选" }],
        difficulty: [{ required: true, message: "难度不能不选" }],
        // title: [{ required: true, message: "试题不能不选" }],
        // answer_analyze: [{ required: true, message: "答案解析不能不选" }],
        select_options: [{ required: true, message: "至少选择一个" }],
        remark: [{ required: true, message: "备注不能为空" }],
        // video: [{ required: true, message: "视频解析不能为空" }]
      },
      // 富文本框
      editor2: "",
      editor: "",
      //学科列表
      subjectList: [],
      qiyeList: []
    };
  },
  //函数方法
  methods: {
    //open方法
    Wang() {
      if (!this.editor2) {
        this.editor2 = new WangEditor(this.$refs.editor);
        this.editor2.create();
      }
      if (!this.editor) {
        this.editor = new WangEditor(this.$refs.editors);
        this.editor.create();
      }
    },
    //公用部分
    list() {
      question
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

    //分页事件函数
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
    //状态
    status(data) {
      window.console.log(data.id);
      question.status({ id: data.id }).then(res => {
        this.$message.success(res.data.message);
        this.list(); //刷新页面
      });
    },
    //新增
    addQues() {
      this.addShow = true;
    },
    //确定新增按钮
    addBtn() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // alert('submit!');
          this.addShow = false;
          //发送axios
          question.add(this.addForm).then(res => {
            window.console.log(res);
            this.$message.success(res.data.data.message);
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },

    //删除
    remove(data) {
      question.remove({ id: data.id }).then(res => {
        this.$message.success(res.data.message);
        this.list(); //刷新页面
      });
    },
    //编辑
    edit(data) {
      question.quseOne({ id: data.id }).then(res => {
        window.console.log(res);
      });
    },
    //上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  //生命周期钩子
  created() {
    //获取初始数据
    question
      .list({
        page: this.page,
        limit: this.limit
      })
      .then(res => {
        window.console.log(res);
        (this.total = res.data.data.pagination.total),
          (this.tableData = res.data.data.items);
      });
    //获取学科列表
    subject.list().then(res => {
      window.console.log(res);
      this.subjectList = res.data.data.items;
    });
    //获取企业列表
    qiye.list().then(res => {
      window.console.log(res);
      this.qiyeList = res.data.data.items;
    });
  }
};
</script>

<style lang='less'>
.question {
  //header表单样式
  .title {
    width: 550px;
    display: flex;
    align-items: center;
    .el-form-item__content {
      // width: 90%;
      width: 490px;
    }
  }
  .avatar {
    width: 270px;
    .el-form-item__content {
      width: 215px;
    }
  }
  .demo-form-inline {
    margin-left: 20px;
  }
  .el-card__body .el-button {
    margin-right: 10px;
  }
  .red {
    color: red;
  }
  .el-dialog__wrapper.important .el-dialog {
    height: 1300px;
    width: 100%;
    margin-bottom: 0;
    margin-top: 0 !important;
    .el-form {
      margin-left: 400px;
    }
    .el-select {
      width: 400px;
    }
  }
  .radio-input {
    display: flex;
    align-items: center;
  }
  //富文本
  .text {
    height: 100px;
    width: 700px;
    .w-e-text-container {
      height: 50% !important;
    }
  }
  .radio-input {
    // display: block;
    width: 600px;
    margin-top: 20px;
  }
  .avatar-uploader {
    width: 500px;
  }
  .line {
    width: 900px;
    height: 1px;
    background-color: #ccc;
    display: inline-block;
    margin-bottom: 20px;
  }
  .input-last.el-input {
    width: 500px;
  }
}
</style>