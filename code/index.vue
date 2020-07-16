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
            <nut-button
              class="tagWrap"
              :shape="String('circle')"
              :color="String('#d2977f')"
              ><span class="tag" :lines="1">已加入</span>
            </nut-button>
          </div>
        </div>
      </div>
    </div>
    <nut-tab
      class="submain"
      :position-nav="String('top')"
      :is-show-line="Boolean(true)"
      ><nut-tab-panel
        class="empty"
        :lines="Number(1)"
        :tab-title="String('排行')"/><nut-tab-panel
        class="div"
        :lines="Number(1)"
        :tab-title="String('商品')"/><nut-tab-panel
        class="empty_2"
        :lines="Number(1)"
        :tab-title="String('活动')"
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
      constants: {}
    };
  },
  methods: {}
};
</script>
<style src="./index.response.css" />
