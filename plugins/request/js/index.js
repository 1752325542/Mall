import request from './request';

var SESSIONID="";

// 设置全局配置
request.prototype.setConfig({
    // url: 'https://www.taohuatannj.com/mallApi/',  // 基地址
    // contentType: 'json',
	url:'https://shop.wanchnet.com/mallApi/',
	// url:'http://192.168.0.110:9090/mallApi/',
    header: {
          
    },

});

// 全局拦截器
request.prototype.addGlobalInterce({
    // 请求拦截器 (例如配置token)
    // return false或者不return值, 都不会发送请求
    request (config) {
        //console.log('📖 is global request interceptors', config)
        //config.data.text += ', addGlobalInterce request';

        return config;
        // return false;
    },

    // 响应拦截器 (例如根据状态码拦截数据)
    // return false或者不return值 则都不会返回值
    // return Promise.reject('xxxxx')，主动抛出错误
    response (res) {
		// if(res.errMsg && res.errMsg === 'request:fail'){
		// 	var url = '/pages/public/login';
		// 	uni.navigateTo({
		// 		url
		// 	})  
		// }
        let firstCodeNum = String(res.statusCode).substr(0, 1);
        //console.log('📫 is global response interceptors', res)
        // 2xx
        if (firstCodeNum === '2') {
            // do something
            // res.data.data.text = 'addGlobalInterce response'

            return res;
        }

        // 3xx
        if (firstCodeNum === '3') {
            // do something
            return res;
        }

        // 4xx or 5xx
        if (firstCodeNum === '4' || firstCodeNum === '5') {
            // do something
			return res;
            console.log('is 4xx or 5xx')
            return Promise.reject('nooooo')
        }

        // 停止发送请求 request.stop()
        if (JSON.stringify(res) === '{"errMsg":"request:fail abort"}') {
            // do something
            // return Promise.reject('xxxxxxxxx');
            return false;
        }

        // return Promise.reject(res)
        return res;
    }
});

export default request
