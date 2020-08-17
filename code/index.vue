<template>
  <div class="mod">
    <div class="hd">
      <div class="group">
        <img
          class="icon"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/20b692f0c73d11eab0fa7be3cecb4e40.png"
        />
        <img
          class="icon_1"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/20977230c73d11ea8391bde74808fc27.png"
        />
      </div>
      <span class="txt" :lines="1">4:21 PM</span>
      <div class="block">
        <div class="container"><div class="color" /></div>
        <img
          class="dot"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/2076f1e0c73d11ea94c1ff74bf9c8644.png"
        />
      </div>
    </div>
    <div class="bd">
      <div class="group_1">
        <img
          class="picture"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/21188910c73d11eaa01dc33968a74e70.png"
        />
      </div>
      <span class="word" :lines="1">爱豆主页</span>
      <img
        class="icon_2"
        src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/21420a10c73d11ea8af54f0827e436d9.png"
      />
    </div>
    <div class="main">
      <img
        class="layer"
        src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/219c5f10c73d11eab3749f165dbfc598.png"
      />
      <div class="block_1">
        <img
          class="largeIcon"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/21d34d90c73d11eabe6935e41d985655.png"
        />
        <div class="block_2">
          <img
            class="pic"
            src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/2205a830c73d11ea8dc81bf7482ba5b8.png"
          />
          <div class="outer">
            <span class="info" :lines="1">莫尼卡·贝鲁奇</span>
            <span class="txt_1" :lines="1">粉丝：98767868709</span>
            <nut-button class="normal_component"
              ><span class="tag" :lines="1">已加入</span>
            </nut-button>
          </div>
        </div>
      </div>
    </div>
    <nut-tab class="normal_component_1"
      ><nut-tab-panel
        class="normal_component_2"
        :lines="nut_tab_panel_1.lines"
        :tab-title="nut_tab_panel_1.tab_title"/><nut-tab-panel
        class="normal_component_3"
        :lines="nut_tab_panel_2.lines"
        :tab-title="nut_tab_panel_2.tab_title"/><nut-tab-panel
        class="normal_component_4"
        :lines="nut_tab_panel_3.lines"
        :tab-title="nut_tab_panel_3.tab_title"
    /></nut-tab>
    <div class="submain">
      <div class="group_2">
        <img
          class="icon_3"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/1ffa95f0c73d11eaa1c58762607b5b2a.png"
        />
        <img
          class="icon_4"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/1fd13c00c73d11ea8151c5ab82b912af.png"
        />
        <span class="brianRodriguez" :lines="1">Brian Rodriguez</span>
      </div>
      <span class="price" :lines="1">¥1678,89</span>
    </div>
    <div class="ft">
      <div class="block_3">
        <img
          class="icon_5"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/2047f2a0c73d11eaa11ae3ab3bdbc6a1.png"
        />
        <img
          class="icon_6"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/202a3170c73d11eaa35975d6777d27bb.png"
        />
        <span class="brianRodriguez_1" :lines="1">Brian Rodriguez</span>
      </div>
      <span class="money" :lines="1">¥1678,89</span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Button } from '@nutui/nutui';
Button.install(Vue);
import { TabPanel } from '@nutui/nutui';
TabPanel.install(Vue);
import { Tab } from '@nutui/nutui';
Tab.install(Vue);

export default {
  data() {
    return {
      nut_tab_panel_1: {
        lines: 1,
        tab_title: '排行'
      },
      nut_tab_panel_2: {
        lines: 1,
        tab_title: '商品'
      },
      nut_tab_panel_3: {
        lines: 1,
        tab_title: '活动'
      },
      constants: {}
    };
  },
  methods: {}
};
</script>
<style scoped>
@import './index.response.css';
/* 如下给出两个覆盖样式的示例，实际根据自己需求来*/
/deep/.nut-tab {
  border: 0 !important;
  padding: 0 !important;
  background: #ff000000 !important;
}
/deep/.nut-button {
  background: linear-gradient(315deg, #d2977f, #d2977f) !important;
}
</style>
