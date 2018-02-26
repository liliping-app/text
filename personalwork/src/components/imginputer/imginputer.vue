<template>
  <div class="imgInputer">
    <input @change="handleFileChange" ref="inputer">
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        default: undefined
      }
    },
    methods: {
      handleFileChange (e) {
        let inputDOM = this.$refs.inputer;
        this.file    = inputDOM.files[0];
        this.errText = '';
        let size = Math.floor(this.file.size / 1024);
            if (size > 5000) {
              console.log(54)
                // 这里可以加个文件大小控制
                return false
            }
    
            // 触发这个组件对象的input事件
            this.$emit('input', this.file);
            
            // 这里就可以获取到文件的名字了
            this.fileName = this.file.name;
            
            // 这里加个回调也是可以的
            this.onChange && this.onChange(this.file, inputDOM.value)
      }
    }
  }
</script>