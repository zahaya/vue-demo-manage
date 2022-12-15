<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    //点击tag 跳转
    changeMenu(item) {
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      ) {
        this.$router.push({ name: item.name });
      }
    },
    //点击tag 删除
    handleClose(item, index) {
      //删除面包屑数据
      this.$store.commit("closeTag", item);
      //如果删除的刚好是自己
      if (item.name === this.$route.name) {
        const length = this.tags.length;
        //如果删除的是最后一个 调到前一个
        if (length === index) {
          this.$router.push({ name: this.tags[index - 1].name });
        } else {
          //不是最后一个 向后一个
          this.$router.push({ name: this.tags[index].name });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>