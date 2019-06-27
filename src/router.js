import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Preview from './views/preview'

Vue.use(Router)

console.log(process.env.NODE_ENV)
export default new Router({
  // base: process.env.NODE_ENV === 'production' ? '/DBC_GPU' : '/',
  base: process.env.NODE_ENV === 'production' ? '/' : '/',

  mode: 'history',
  routes: [
    {
      path: '/preview',
      name: ' preview',
      component: Preview
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/network',
      name: 'network',
      component: () => import('./views/network')
    },
    {
      path: '/gpu',
      name: 'gpu',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/gpu'),
      redirect: '/gpu/myWallet',
      children: [
        {
          meta: {
            menuIndex: 0
          },
          path: 'myWallet',
          component: () => import('./views/gpu/myWallet')
        },
        {
          meta: {
            menuIndex: 0
          },
          path: 'myWalletUnlock',
          component: () => import('./views/gpu/myWallet_unlock')
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'list',
          component: () => import('./views/gpu/list')
        },
        {
          meta: {
            menuIndex: 1
          },
          path: 'myMachine',
          component: () => import('./views/gpu/myMachine')
        },
        {
          meta: {
            menuIndex: 1
          },
          path: 'myMachineUnlock',
          component: () => import('./views/gpu/myMachine_unlock')
        }
      ]
    },
    {
      name: 'createWallet',
      path: '/createWallet',
      component: () => import('./views/createWallet/index.vue')
    },
    {
      name: 'openWallet',
      path: '/openWallet',
      component: () => import('./views/openWallet/index.vue')
    },
    {
      name: 'trade',
      path: '/trade',
      component: () => import('./views/trade_io'),
      redirect: '/trade/home',
      children: [
        {
          path: 'home',
          component: () => import('./views/trade_io/trade')
        },
        {
          path: 'buy_1',
          component: () => import('./views/trade_io/buy_1')
        },
        {
          path: 'buy_2',
          component: () => import('./views/trade_io/buy_2')
        },
        {
          path: 'buy_3',
          component: () => import('./views/trade_io/buy_3')
        }
      ]
    },
    {
      name: 'howBuy',
      path: '/howBuy',
      component: () => import('./views/help/howBuy'),
    },
    {
      name: 'minerHome',
      path: '/minerHome',
      component: () => import('./views/minerHome')
    }
  ]
})