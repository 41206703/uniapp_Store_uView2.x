// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
    // 初始化请求配置
    uni.$u.http.setConfig((config) => {
        /* config 为默认全局配置*/
        config.baseURL = 'https://api.shop.eduwork.cn'; /* 根域名 */
        return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
	    config.data = config.data || {}
		console.log("请求拦截器被调用了")
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if(config?.custom?.auth) {
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header.token = vm.$store.state.userInfo.token
		}
	    return config 
	}, config => { // 可使用async await 做异步操作
	    return Promise.reject(config)
	})
	
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
		console.log("响应拦截器被调用了")
		// 自定义参数
		const data = response.data;
		console.log(data)
		const custom = response.config?.custom
			if (response.statusCode !== 200) { 
				
				// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
				if (custom.toast !== false) {
					uni.$u.toast(data.message)
				}

				// 如果需要catch返回，则进行reject
				if (custom?.catch) {
					return Promise.reject(data)
				} else {
					console.log("进入了 new promise")
					// 否则返回一个pending中的promise，请求不会进入catch中
					return new Promise(() => { })
				}
			}
		return data.data === undefined ? data : data.data
	}, (response) => { 
		console.log("响应错误了，响应拦截被调用了")
		const {
				statusCode,
				data
				} = response
		// 对响应错误做点什么 （statusCode !== 200
		return Promise.reject(response)
	})
	// 增加patch请求
	vm.$u.patch = (url, params = {}, header = {}) => {
		// 模拟patch请求
		const _params = {
			...params,
			_method: 'PATCH'
		}
		return vm.$u.post(url, _params, header)
	}
}