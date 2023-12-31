<template>
    <div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content admin-modal-add">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add {{ name }}</h5>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3 input__container">
                            <label for="exampleInputEmail1" class="form-label input__label login__label">{{ name }} name</label>
                            <input type="email" id="exampleInputEmail1">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
                        <router-link :to="link" type="button" class="btn btn-dark">Next</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data: () => ({
        link: '',
        name: '',
        houseName: ''
    }),

    methods: {
        getCreateStatus () {
            switch (this.$route.meta.adminType) {
                case 'APPARTAMENT': 
                    this.name = 'house';
                    this.link = `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-create`;
                    break;
                case 'POST': 
                    this.name = 'post';
                    this.link = `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-create`;
                    break;
                case 'USER': 
                    this.name = 'user';
                    this.link = `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/user-create`;
                    break;
            }
        }
    },
    mounted () {
        this.getCreateStatus();
    }
}

</script>