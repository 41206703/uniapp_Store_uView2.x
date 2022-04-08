<template>
	<view>
		<u-skeleton :loading="loading" :animate="true"  rows='7' rowsHeight="31rpx">
		<navigator url="" >
			<u-image width="100%" height="300rpx" :src="item.cover_url"> </u-image>
			<view class="title u-line-1">{{item.title}}</view>
			<view class="des">
				<view class="price">{{item.price}}</view>
				<view class="">
					销量：{{item.sales}}
				</view>
			</view>
		</navigator>
		</u-skeleton>
										
	</view>
</template>

<script>
	export default {
		name:"goods-carts",
		props:{
			item : {
				type:Object,
				default() {
					return {}
				}
			},
			loading : {
				type:Boolean,
				default() {
					return false
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
u-skeleton {
			z-index: 1000;
			width: 100%;
		}
		
		.title {
			margin: 20rpx 0;
			font-weight: 500;
			font-size: 37rpx;
			text-align: center;
		}
		.des {
			display: flex;
			justify-content: space-between;
		}
</style>
