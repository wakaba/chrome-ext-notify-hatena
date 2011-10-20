﻿/*
Built using Kango - Cross Browser Extensions framework.
http://kangoextensions.com/
*/
function KangoExtensionInfo(){this.version=this.description=this.name="";this.background_scripts=[];this.content_scripts=[];this.browser_button={}}function KangoNotImplementedException(b){this.prototype=Error.prototype;this.name="KangoNotImplementedException";this.message="Method "+(b?b+" ":"")+"is not implemented";this.toString=function(){return this.name+": "+this.message}}
var kango={_eventListener:new KangoEventListener,_configFileName:"extension_info.json",_extensionInfo:null,_loadExtensionInfo:function(){this._extensionInfo=JSON.parse(kango.io.getExtensionFileContents(this._configFileName))},_init:function(){this._loadExtensionInfo();return this._eventListener.fireEvent(this.event.Ready)},event:{Ready:"Ready",Uninstall:"Uninstall"},addEventListener:function(b,c){return this._eventListener.addEventListener(b,c)},removeEventListener:function(b,c){return this._eventListener.removeEventListener(b,
c)},getExtensionInfo:function(){return this._extensionInfo},SCHEME:"kango-extension://",string:{format:function(b){for(var c=1;c<arguments.length;c++)b=b.replace("{"+(c-1)+"}",arguments[c].toString());return b}},array:{filter:function(b,c){for(var a=b.length,d=[],e=0;e<a;e++)if(e in b){var f=b[e];c.test(f)&&d.push(f)}return d}},oop:{extend:function(b,c){var a=function(){};a.prototype=b.prototype;a=new a;a.superclass=b;for(var d in c)a[d]=c[d];return a},mixin:function(b,c){for(var a in c)b[a]=c[a]}}};
kango.addEventListener(kango.event.Ready,function(){function b(c,a){var a=Array.prototype.slice.call(a,0),b=a[a.length-1],e={onSuccess:function(){},onError:function(a){kango.console.log("Error during async call method "+methodName+". Details: "+a)},isCallbackInvoke:c};typeof b.call!="undefined"&&typeof b.apply!="undefined"?(e.onSuccess=function(a){b(a)},a[a.length-1]=e):a.push(e);kango.invokeAsyncEx.apply(kango,a)}kango.invokeAsyncEx=function(c){var a=arguments[arguments.length-1],b=a.isCallbackInvoke?
"invokeCallback":"invoke",e=Array.prototype.slice.call(arguments,1,arguments.length-1);kango.messaging.client.postMessage(b,{method:c,params:e},function(b){if(b!=null&&typeof a=="object")if(b.error==null){if(typeof a.onSuccess.call!="undefined"&&typeof a.onSuccess.apply!="undefined")a.onSuccess(b.result)}else if(typeof a.onError.call!="undefined"&&typeof a.onError.apply!="undefined")a.onError(b.error)})};kango.invokeAsync=function(){b(!1,arguments)};kango.messaging.server.addListener("invoke",function(b){var a=
b.data,d={result:null,error:null};try{d.result=kango.lang.invoke(a.method,a.params)}catch(e){d.error=e.toString()}b.sendResponse(d)});kango.invokeAsyncCallback=function(){b(!0,arguments)};kango.messaging.server.addListener("invokeCallback",function(b){var a=b.data,d={result:null,error:null};try{a.params.push(function(a){d.result=a;b.sendResponse(d)}),kango.lang.invoke(a.method,a.params)}catch(e){d.error=e.toString(),b.sendResponse(d)}})});