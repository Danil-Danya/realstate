import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Index.vue'),
    meta: {
      layout: 'index'
    }
  },
  {
    path: '/:pathName(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      layout: 'index'
    }
  },
  {
    path: '/apartament/:name',
    name: 'apartament',
    component: () => import('../views/Apartament.vue'),
    meta: {
      layout: 'index'
    }
  },
  {
    path: '/catalog/:index',
    name: 'catalog',
    component: () => import('../views/Catalog.vue'),
    meta: {
      layout: 'index'
    }
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/Map.vue'),
    meta: {
      layout: 'index'
    }
  },
  {
    path: '/post/:title',
    name: 'post',
    component: () => import('../views/Post.vue'),
    meta: {
      layout: 'index'
    }
  },
  {
    path: '/blog/:index',
    name: 'blog',
    title: 'Blog',
    component: () => import('../views/Blog.vue'),
    meta: {
      layout: 'index'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      layout: 'login'
    }
  },
  {
    path: '/login/resend',
    name: 'Resend',
    component: () => import('../views/ResendEmail.vue'),
    meta: {
      layout: 'login'
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-active/:index`,
    name: 'Appartament-active',
    component: () => import('../views/admin_pages/appartament/AdminAppartamentActive.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'APPARTAMENT'
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-all/:index`,
    name: 'Appartament-all',
    component: () => import('../views/admin_pages/appartament/AdminAppartamentAll.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'APPARTAMENT'
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-disactive/:index`,
    name: 'Appartament-disactive',
    component: () => import('../views/admin_pages/appartament/AdminAppartamentDisActive.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'APPARTAMENT'
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-edit/:name/:id`,
    name: 'Appartament-edit',
    component: () => import('../views/admin_pages/appartament/AdminAppartamentEdit.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'APPARTAMENT'
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-draft/:index`,
    name: 'Appartament-draft',
    component: () => import('../views/admin_pages/appartament/AdminAppartamentDraft.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'APPARTAMENT'
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-create`,
    name: 'Appartament-create',
    component: () => import('../views/admin_pages/appartament/AdminAppartamentCreate.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'APPARTAMENT',
      create: true
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-create`,
    name: 'Post-create',
    component: () => import('../views/admin_pages/posts/AdminPostCreate.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'POST',
      create: true
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-edit/:name/:id`,
    name: 'Post-Edit',
    component: () => import('../views/admin_pages/posts/AdminPostEdit.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'POST',
      create: true
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-all/:index`,
    name: 'Post-All',
    component: () => import('../views/admin_pages/posts/AdminPostAll.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'POST',
      create: true
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-active/:index`,
    name: 'Post-Active',
    component: () => import('../views/admin_pages/posts/AdminPostActive.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'POST',
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-draft/:index`,
    name: 'Post-draft',
    component: () => import('../views/admin_pages/posts/AdminPostDraft.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'POST',
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-disactive/:index`,
    name: 'Post-disactive',
    component: () => import('../views/admin_pages/posts/AdminPostDisActive.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'POST',
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/email-all/:index`,
    name: 'Email-all',
    component: () => import('../views/admin_pages/request/AdminRequestsAll.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'EMAIL',
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/email-new/:index`,
    name: 'Email-new',
    component: () => import('../views/admin_pages/request/AdminRequestsNew.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'EMAIL',
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/email-body/:name:?/:id?`,
    name: 'Email-body',
    component: () => import('../views/admin_pages/request/AdminRequestsMail.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'EMAIL',
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/users-all`,
    name: ' Users-all',
    component: () => import('../views/admin_pages/users/AdminUsersAll.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'USER',
    }
  },
  {
    path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/users-create`,
    name: 'Users-create',
    component: () => import('../views/admin_pages/users/AdminUsersCreate.vue'),
    meta: {
      layout: 'admin',
      auth: false,
      adminType: 'USER',
    }
  },
  {
    path: `/admin/no-access`,
    name: 'NoAccess',
    component: () => import('../views/NoAccess.vue'),
    meta: {
      layout: 'admin',
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    else {
      return { top: 0 };
    }
  },
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
//   const requireAuth = to.matched.some(record => record.meta.auth);

// console.log(requireAuth);

//   if (!token) {
//     next('/admin/no-access');
//   }
//   else next();
// });
export default router;
