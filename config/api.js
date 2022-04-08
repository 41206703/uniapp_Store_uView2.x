const http = uni.$u.http


	// 首页
	export const getIndex = (params) => http.get('/api/index', params);//获取首页数据
	
	// 商品
	export const getGoodsList = (params = {}) => http.get(`/api/goods`,params);//商品列表
	export const getGoodsDetail = id => http.get(`/api/goods/${id}`);//商品详情
	export const getCollect = (page=1) => http.get('/api/collects',{page}) //获取收藏商品
	export const isCollect = id => http.post(`/api/collects/goods/${id}`);//商品收藏或取消
	
	// 购物车相关
	export const addCart = params => http.post(`/api/carts`,params);//添加购物车
	export const cartGoods = () => http.get(`/api/carts?include=goods`);//购物车列表
	export const numChange = (cart,num) => http.put(`/api/carts/${cart}`,{num});//购物车商品数量改变
	export const delCartGoods = cart => http.delete(`/api/carts/${cart}`);//将商品移出购物车
	export const isCheck = cart_ids => http.patch(`/api/carts/checked`,{cart_ids});//将商品选中与否
	
	// 个人中心
	export const getUserInfo = () => http.get('/api/user') //获取用户信息
	export const setUserInfo = params => http.put('/api/user',params) //更新用户信息
	
	// 认证相关的
	export const authLogin = params => http.post('/api/auth/login', params)//登录
	export const authLoginOut = () => http.post('/api/auth/logout')//退出登录
	export const authRegister = params => http.post('/api/auth/register', params)//注册
	export const authOss = () => http.get('/api/auth/oss/token')//获取oss
	export const authAvatar = params => http.patch('/api/user/avatar',params)//用户更改头像
	// 订单相关的
	
	
	// 后端
	
	export const addGoods1 = (id,params) => http.put(`/api/admin/goods/${id}`,params)//xiugai商品
	export const addGoods2 = () => http.get(`/api/admin/goods`)//商品列表
	export const addGoods3 = id => http.patch(`/api/admin/goods`,id)//上架列表
	
	export const getBanner = () => http.get(`/api/admin/slides`)//获取轮播
	export const setBanner = (slide,params) => http.put(`/api/admin/slides/${slide}`,params)//修改轮播
	export const sortBanner = (slide,seq) => http.patch(`/api/admin/slides/${slide}/seq`,{seq})//修改轮播


