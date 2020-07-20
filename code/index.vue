<template>
  <div class="mod">
    <div class="hd">
      <div class="group">
        <img class="icon" src="./images/img_42490_0_6.png" />
        <img class="icon_2" src="./images/img_42490_0_5.png" />
      </div>
      <span class="txt" :lines="1">4:21 PM</span>
      <div class="block">
        <div class="container"><div class="color" /></div>
        <img class="dot" src="./images/img_42490_0_4.png" />
      </div>
    </div>
    <div class="bd">
      <div class="group_2">
        <img class="img" src="./images/img_42490_0_7.png" />
      </div>
      <span class="word" :lines="1">爱豆主页</span>
      <img class="icon_3" src="./images/img_42490_0_8.png" />
    </div>
    <div class="main">
      <img class="layer" src="./images/img_42490_0_9.png" />
      <div class="block_3">
        <img class="largeIcon" src="./images/img_42490_0_10.png" />
        <div class="block_2">
          <img class="avator" src="./images/img_42490_0_11.png" />
          <div class="outer">
            <span class="info" :lines="1">莫尼卡·贝鲁奇</span>
            <span class="word_2" :lines="1">粉丝：98767868709</span>
            <nut-button class="tagWrap"
              ><span class="tag" :lines="1">已加入</span>
            </nut-button>
          </div>
        </div>
      </div>
    </div>
    <nut-tab
      class="submain"
      :position-nav="nut_tab_1.position_nav"
      :is-show-line="nut_tab_1.is_show_line"
      ><nut-tab-panel
        class="empty"
        :lines="nut_tab_panel_2.lines"
        :tab-title="nut_tab_panel_2.tab_title"/><nut-tab-panel
        class="div"
        :lines="nut_tab_panel_3.lines"
        :tab-title="nut_tab_panel_3.tab_title"/><nut-tab-panel
        class="empty_2"
        :lines="nut_tab_panel_4.lines"
        :tab-title="nut_tab_panel_4.tab_title"
    /></nut-tab>
    <div class="row">
      <div class="group_3">
        <img class="icon_4" src="./images/img_42490_0_1.png" />
        <img class="icon_5" src="./images/img_42490_0_0.png" />
        <span class="brianRodriguez" :lines="1">Brian Rodriguez</span>
      </div>
      <span class="price" :lines="1">¥1678,89</span>
    </div>
    <div class="ft">
      <div class="block_4">
        <img class="icon_6" src="./images/img_42490_0_3.png" />
        <img class="icon_7" src="./images/img_42490_0_2.png" />
        <span class="brianRodriguez_2" :lines="1">Brian Rodriguez</span>
      </div>
      <span class="money" :lines="1">¥1678,89</span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { TabPanel, Tab, Button } from '@nutui/nutui';
TabPanel.install(Vue);
Tab.install(Vue);
Button.install(Vue);

export default {
  data() {
    return {
      nut_tab_1: {
        position_nav: 'top',
        is_show_line: true
      },
      nut_tab_panel_2: {
        lines: 1,
        tab_title: '排行'
      },
      nut_tab_panel_3: {
        lines: 1,
        tab_title: '商品'
      },
      nut_tab_panel_4: {
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
