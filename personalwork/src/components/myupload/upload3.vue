<template>
  <div class="upload">
    <h1 class="uploadTitle">欢迎上传你的作品</h1>
    <div style="margin: 0 auto;width: 800px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
      <el-form-item label="作品名称" prop="name">
        <el-input v-model="ruleForm.name" style="width:450px"></el-input>
      </el-form-item>
      <el-form-item label="作品地址" prop="adds">
        <el-input v-model="ruleForm.adds" style="width:450px"></el-input>
      </el-form-item>
      <el-form-item label="作品类型" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择类型">
          <el-option label="TMS-淘宝" value="tms_taobao"></el-option>
          <el-option label="阿里妈妈" value="mothor"></el-option>
          <el-option label="VUE" value="vue"></el-option>
          <el-option label="REACT" value="react"></el-option>
          <el-option label="MT-淘宝" value="mt_taobao"></el-option>
          <el-option label="飞猪" value="pick"></el-option>
          <el-option label="菜鸟" value="bird"></el-option>
          <el-option label="游戏" value="game"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="作品图片" prop="pic">
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUploadimg">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" style="background: #fff;"></i>
        </el-upload>
      </el-form-item> -->
      <el-form-item label="作品文件">
        <el-upload class="upload-demo" style="width:450px;" action="https://jsonplaceholder.typicode.com/posts/" :beforeUpload="beforeAvatarUpload">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      </el-form-item>
      <el-form-item label="作品文件2" prop="papers2">
        <el-upload class="upload-demo" style="width:450px;" ref="upload2" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview2" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload2">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip" style="width:450px;">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      </el-form-item>
      <el-form-item label="作品描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" style="width:450px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        ruleForm: {
          name: '',
          adds:'',
          pic:'',
          region: '',
          desc: '',
          papers2:''
        },
        rules: {
          name: [
            { required: true, message: '请输入作品名称', trigger: 'blur' }
          ],
          adds: [
            { required: true, message: '请输入作品地址', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 5 到 16 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择作品类型', trigger: 'change' }
          ],
          pic: [
            { required: true, message: '请选择作品图片', trigger: 'change' }
          ],
          papers2: [
            { required: true, message: '请上传作品文件', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写作品介绍', trigger: 'blur' }
          ]
        },
        uploadurl:'http://192.168.92.207/upload',
        // imageUrl: '',
        fileList:[]
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      beforeAvatarUpload (file) {
        console.log(file,"file");
        const extension = file.name.split('.')[1] == 'jpg';
        const isLt2M = file.size/1024/1024 <=3;
        if (!extension) {
          this.$message.error('上传文件只能是xlsx格式 ！');
        }
        if (!isLt2M) {
          this.$message.error('上传文件不能超过3M ！');
        }
        return extension && isLt2M;
      },
      // handleAvatarSuccess(res, file) {
      //   this.imageUrl = URL.createObjectURL(file.raw);
      // },
      // beforeAvatarUploadimg(file) {
      //   const isJPG = file.type === 'image/jpeg';
      //   const isLT2M = file.size / 1024 / 1024 < 2;

      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG 格式!');
      //   }
      //   if (!isLT2M) {
      //     this.$message.error('上传头像图片大小不能超过 2MB!');
      //   }
      //   return isJPG && isLT2M;
      // },
      // 
      // papers2
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
       handlePreview2(file) {
        console.log(file);
      },
      submitUpload2() {
        this.$refs.upload2.submit();
      },
    }
  }
</script>
<style lang="less" scoped>
  .upload {
    margin-left: 200px;
    float:none;
    height: auto;
    padding-bottom: 320px;
    background: #e1e5e6;
    overflow: hidden;
  }
  .uploadTitle {
    text-align: center;
    font-size: 42px;
    font-weight: bold;
    color:#688df4;
    text-shadow: 2px 2px 5px #2086ea;
    padding-top: 60px;
    text-align: center;
    width: 100%;
    margin-bottom: 80px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 450px;
    height: 400px;
    line-height: 400px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>