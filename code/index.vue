<template>
  <div class="mod">
    <div class="hd">
      <div class="group">
        <img
          class="icon"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/f046c530c58a11ea86965145e7f2488d.png"
        />
        <img
          class="icon_2"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/f0253370c58a11eaa8413b05d998f962.png"
        />
      </div>
      <span class="txt" :lines="1">4:21 PM</span>
      <div class="block">
        <div class="container"><div class="color" /></div>
        <img
          class="dot"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/f00639c0c58a11ea95181f41815840e7.png"
        />
      </div>
    </div>
    <div class="bd">
      <div class="group_2">
        <img
          class="img"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/f08ad310c58a11eab3b791a81edee67a.png"
        />
      </div>
      <span class="word" :lines="1">爱豆主页</span>
      <img
        class="icon_3"
        src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/f0aa41f0c58a11eaa6b8011937c9209d.png"
      />
    </div>
    <div class="main">
      <img
        class="layer"
        src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/f1181ef0c58a11eab658359a71a43959.png"
      />
      <div class="block_3">
        <img
          class="largeIcon"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/f144fb50c58a11eab3830b3dfa22e520.png"
        />
        <div class="block_2">
          <img
            class="avator"
            src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/f18f4ac0c58a11ea93945704b9b489f5.png"
          />
          <div class="outer">
            <span class="info" :lines="1">莫尼卡·贝鲁奇</span>
            <span class="word_2" :lines="1">粉丝：98767868709</span>
            <nut-button><span class="tag" :lines="1">已加入</span> </nut-button>
          </div>
        </div>
      </div>
    </div>
    <nut-tab
      ><nut-tab-panel
        :lines="Number(1)"
        :tab-title="String('排行')"/><nut-tab-panel
        :lines="Number(1)"
        :tab-title="String('商品')"/><nut-tab-panel
        :lines="Number(1)"
        :tab-title="String('活动')"
    /></nut-tab>
    <div class="row">
      <div class="group_3">
        <img
          class="icon_4"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/ef959da0c58a11ea9f9267368406f110.png"
        />
        <img
          class="icon_5"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/ef69f9c0c58a11ea99170b396c1cb586.png"
        />
        <span class="brianRodriguez" :lines="1">Brian Rodriguez</span>
      </div>
      <span class="price" :lines="1">¥1678,89</span>
    </div>
    <div class="ft">
      <div class="block_4">
        <img
          class="icon_6"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/efe0b060c58a11ea9f8e379283e3d7d8.png"
        />
        <img
          class="icon_7"
          src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/efbf45b0c58a11ea9133c3946b5b81aa.png"
        />
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

import { fetch } from 'whatwg-fetch';
export default {
  data() {
    return {
      stateData: 'test',
      constants: {}
    };
  },
  methods: {
    isReadCountShow(readCount) {
      return readCount > 300;
    },
    fetch_example() {
      fetch('https://jsonplaceholder.typicode.com/todos/1', {
        method: 'GET',
        body: {}
      })
        .then(response => response.json())
        .then((data, error) => {
          console.log(dataHandler);
          return data;
        })
        .catch(e => {
          console.log('error', e);
        });
    },
    dataHandler(dataMap) {
      console.log('dataHandler 11');
      return dataMap;
    }
  },
  created() {
    console.log('constructor');
    this.fetch_example();
    this.dataHandler();
  },
  beforeUpdate() {
    console.log('getDerivedStateFromProps');
  }
};
</script>
<style src="./index.response.css" />
