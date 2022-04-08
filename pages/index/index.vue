<template>
	<view>
		 <u-swiper
		            :list="slides" 
					keyName="img_url" 
					circular
					indicator
					indicatorMode="line"
					height="180"
		    ></u-swiper>
			    <u-tabs
			        :list="listSort"
			        lineWidth="20"
					LineHeight = "30"
					:scrollable = "false"
			        lineColor="#f56c6c"
			        :activeStyle="{
			            color: '#303133',
			            fontWeight: 'bold',
			            transform: 'scale(1.2)'
			        }"
					@click="click"
					@change="change"
			        :inactiveStyle="{
			            color: '#606266',
			            transform: 'scale(1)'
			        }"
			        itemStyle="padding-left: 15px; padding-right: 15px; height: 40px; margin-top: 8px"
			    >
			    </u-tabs>
				
					<u-grid col="2" :border="false">
					                   <u-grid-item  class="goods-item" v-for="item in goods.length !== 0 ? goods : [{},{},{},{}]" >
										<goods-carts :item="item" :loading="loading"></goods-carts>
					                   </u-grid-item>
					               </u-grid>
	
	</view>
</template>

<script>
	import {getIndex} from "../../config/api.js"
	export default {
		data() {
			return {
				title: 'Hello',
				                list1: [
				                    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				                    'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				                    'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				                ],
				listSort: [
					{name: '默认'},
					{name: "销量"},
					{name: "推荐"},
					{name: "最新"},
				],
				currentSort : '',
				slides: [],
				goods : '',
				loading : true,
				page :1,
				src : "https://oss.shop.eduwork.cn/product/2020-0820-5f3e17d6ed7e8.png"
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			change(index){
				// console.log(index)
				this.goods = []
				this.page = 1
				this.currentSort = index.index
				this.getData()
			},
			
			click(){},
			async getData() {
				this.loading = true
				const params = {
					page:this.page
				}
				if(this.currentSort==1) params.sales=1
				if(this.currentSort==2) params.recommend=1
				if(this.currentSort==3) params.new=1
				const send = {params}
				// console.log(send) 注意uView2.0需要再嵌套一层{}(get)
				const res = await getIndex(send)
				this.loading = false //隐藏骨架屏
					this.slides = res.slides
					this.goods = [...this.goods, ...res.goods.data]
			}
		},
		onReachBottom() {
			//处理用户拉取菜单触底事件
			this.page = this.page+1
			this.getData(this.page)
		}
	}
</script>

<style lang="scss" scoped>
	u-grid-item {
		height: 300px;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	.u-grid-item {
		align-items: initial;
	}
	.goods-item {
		width: 100%;
		padding: 60rpx 85rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 12rpx 12rpx 0 rgba($color: #3e4b53, $alpha: 0.25);
		
	}
</style>
