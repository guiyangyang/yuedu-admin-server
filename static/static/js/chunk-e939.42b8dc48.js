(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e939"],{"r/s8":function(t,e,i){"use strict";i.r(e);i("wcVp");var a=i("x0N3"),o={data:function(){return{dialogVideoTitle:"",showLogReg:!1,dialogVideoSee:!1,seeLinkText:"",seePwdText:"",datas:[],total:1,params:{type:"JavaScript",pageSize:12,pageNum:1}}},created:function(){this.getVideoLists()},methods:{getVideoLists:function(){var t=this;Object(a.b)(this.params).then(function(e){t.datas=e.data,t.total=e.count})},handleCurrentChange:function(t){this.params.pageNum=t,this.getVideoLists()},handleSeeVideo:function(t){this.dialogVideoTitle="视频试看",this.seeLinkText=t.linkSee,this.seePwdText=t.pwdSee,this.dialogVideoSee=!0},handleBuyVideo:function(t){var e=this;localStorage.getItem("token")?Object(a.a)({id:t.id}).then(function(t){e.dialogVideoTitle="视频获取",e.seeLinkText=t.data.linkBuy,e.seePwdText=t.data.pwdBuy,e.dialogVideoSee=!0}):this.$confirm("您尚未登录或已登录过期, 是否立即登录?","温馨提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.showLogReg=!0}).catch(function(){})},closelogregback:function(t){this.showLogReg=!1}}},n=i("KHd+"),s=Object(n.a)(o,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"main-box"},[i("div",[i("el-row",t._l(t.datas,function(e,a){return i("el-col",{key:a,staticClass:"col-box",attrs:{xs:12,sm:8,md:6,lg:6,xl:4}},[i("div",{staticClass:"plate-box"},[i("div",{staticClass:"cover-box"},[i("img",{attrs:{src:e.imgSrc,alt:""}}),t._v(" "),i("div",{staticClass:"label-box"},t._l(e.labels,function(e,a){return i("span",{key:a},[t._v(" "+t._s(e)+"\n              ")])})),t._v(" "),i("div",{staticClass:"menu-btns"},[i("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary",round:""},on:{click:function(i){t.handleSeeVideo(e)}}},[t._v("试 看")]),t._v(" "),i("el-button",{attrs:{type:"success",round:""},on:{click:function(i){t.handleBuyVideo(e)}}},[t._v("获 取")])],1),t._v(" "),a<4?i("div",{staticClass:"new-logo-box"},[t._v("NEW")]):t._e()]),t._v(" "),i("div",{staticClass:"plate-title"},[t._v("\n            "+t._s(e.title)+"\n          ")])])])}))],1),t._v(" "),i("div",{staticClass:"pagination-box"},[i("el-pagination",{attrs:{"current-page":t.params.pageNum,"page-size":t.params.pageSize,layout:"prev, pager, next",background:"",total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{staticClass:"dialog-see-video",attrs:{title:t.dialogVideoTitle,top:"40vh",visible:t.dialogVideoSee},on:{"update:visible":function(e){t.dialogVideoSee=e}}},[i("div",{staticClass:"link-box"},[t._v("地址："),i("a",{attrs:{href:"http://www.baidu.com",target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.seeLinkText))])]),t._v(" "),i("div",{staticClass:"pwd-box"},[t._v("密码："+t._s(t.seePwdText))])]),t._v(" "),t.showLogReg?i("div",{staticClass:"log-reg-box "},[i("log-reg",{on:{closelogregback:t.closelogregback}})],1):t._e()],1)},[],!1,null,null,null);s.options.__file="javaScript.vue";e.default=s.exports},wcVp:function(t,e,i){t.exports=i.p+"static/img/1.e42cd8c.png"},x0N3:function(t,e,i){"use strict";i.d(e,"b",function(){return o}),i.d(e,"a",function(){return n});var a=i("t3Un");function o(t){return Object(a.a)({url:"/yuedu/videos",method:"post",data:t})}function n(t){return Object(a.a)({url:"/yuedu/videoInfos",method:"post",data:t})}}}]);