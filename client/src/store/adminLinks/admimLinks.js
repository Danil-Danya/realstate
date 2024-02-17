export default {
    state: {
        appartamentLinks: [
            { name: 'All', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-all/1` },
            { name: 'Active', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-active/1` },
            { name: 'Inactive', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-disactive/1` },
            { name: 'Draft', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-draft/1` },
        ],
        postLinks: [
            { name: 'All', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-all/1` },
            { name: 'Active', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-active/1` },
            { name: 'Inactive', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-disactive/1` },
            { name: 'Draft', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-draft/1` },
        ],
        requetsLinks: [
            { name: 'All', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/email-all/1` },
            { name: 'New', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/email-new/1` },
        ],
        userLinks: [
            { name: 'All users', link: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/users-all` },
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
