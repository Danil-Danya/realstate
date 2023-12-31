export default {
    state: {
        appartamentLinks: [
            { name: 'All', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-all/0` },
            { name: 'Active', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-active/0` },
            { name: 'Inactive', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-disactive/0` },
            { name: 'Draft', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-draft/0` },
        ],
        postLinks: [
            { name: 'All', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-all` },
            { name: 'Active', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-active` },
            { name: 'Inactive', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-disactive` },
            { name: 'Draft', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-draft` },
        ],
        requetsLinks: [
            { name: 'All', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/email-all` },
            { name: 'New', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/email-new` },
        ],
        userLinks: [
            { name: 'All', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/all-users` },
        ],
        noAccessLinks: [
            { name: 'Home', link: `/` },
            { name: 'Categories', link: `/categories` },
            { name: 'Posts', link: `/posts` },
        ],
    },
    getters: {
        getAdminNavLinks (store) {
            return {
                appartamentLinks: store.appartamentLinks,
                postLinks: store.postLinks,
                requetsLinks: store.requetsLinks,
                userLinks: store.userLinks,
                noAccessLinks: store.noAccessLinks
            }
        }
    }
};
