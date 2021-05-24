//混入 
export let InfoManage = {
    data() {
        return {
            info: {
                isshow: false,
                isAdd: true
            },
        }
    },
    methods: {
        willAdd() {
            this.info.isshow = true;
            this.info.isAdd = true
        },
        willEdit(id) {
            //弹框出现
            this.info.isshow = true;
            this.info.isAdd = false
            //通知form取数据
            this.$refs.form.getOne(id)
        }
    },
    
}