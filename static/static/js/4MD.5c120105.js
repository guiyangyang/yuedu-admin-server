(window.webpackJsonp=window.webpackJsonp||[]).push([["/4MD"],{"/4MD":function(t,a,e){"use strict";e.r(a);var l=e("t3Un");var r={data:function(){return{tableData:[],params:{userId:"",pageSize:10,pageNum:1},total:1}},created:function(){for(var t={username:"bool",phone:"123",email:"qq.com",title:"123",price:"000",buyTime:"3213"},a=[],e=0;e<10;e++)a.push(t);this.getOrderLists()},methods:{getOrderLists:function(){var t=this;(function(t){return Object(l.a)({url:"/orders",method:"post",data:t})})(this.params).then(function(a){t.tableData=a.data,t.total=a.count})},handleCurrentChange:function(t){this.params.pageNum=t}}},n=e("KHd+"),o=Object(n.a)(r,function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"main-box"},[e("div",{staticClass:"table-box"},[e("el-table",{attrs:{data:t.tableData,border:""}},[e("el-table-column",{attrs:{prop:"userId",center:"",label:"用户名Id"}}),t._v(" "),e("el-table-column",{attrs:{prop:"title",label:"资源名称"}}),t._v(" "),e("el-table-column",{attrs:{prop:"price",label:"售 价"}}),t._v(" "),e("el-table-column",{attrs:{prop:"buyTime",label:"购买时间"}}),t._v(" "),e("el-table-column",{attrs:{prop:"linkBuy",label:"购买链接"}}),t._v(" "),e("el-table-column",{attrs:{prop:"pwdBuy",label:"密 码"}}),t._v(" "),e("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",{staticClass:"table-text-blue mr-16"},[t._v("查看")])]}}])})],1)],1),t._v(" "),e("div",{staticClass:"pagination-box"},[e("el-pagination",{attrs:{"current-page":t.params.pageNum,"page-size":t.params.pageSize,layout:"prev, pager, next",background:"",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)])},[],!1,null,null,null);o.options.__file="orderManage.vue";a.default=o.exports}}]);