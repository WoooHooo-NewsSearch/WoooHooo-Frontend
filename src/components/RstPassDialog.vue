<template>
<el-dialog style="text-align: center" title="重设密码" :visible="dialogVisible" :show-close="false" width="40%">
    <el-form ref="rstForm" :model="userpass" :rules="rules" label-width="80px">
        <el-form-item label="旧密码" prop="old">
            <el-input v-model="userpass.old" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new">
            <el-input v-model="userpass.new" type="password"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="canclebtn">取 消</el-button>
        <el-button @click="yesbtn">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
import md5 from 'js-md5';
export default {
    name: "RstPassDialog",
    props: {
        dialogVisible: {
            type: Boolean,
            default: () => true
        },
    },
    // 请在下方设计自己的数据结构以及事件函数
    data() {
        return {
            userpass: {
                old: "",
                new: "",
            },
            rules: {
                old: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'change'
                    },
                    {
                        min: 8,
                        message: '密码不能少于8个字符',
                        trigger: 'change'
                    }
                ],
                new: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'change'
                    },
                    {
                        min: 8,
                        message: '密码不能少于8个字符',
                        trigger: 'change'
                    }
                ],
            },
        }
    },
    methods: {
        canclebtn() {
            console.log("点击取消放弃修改")
            this.$emit("canclebtn")
        },
        yesbtn() {
            console.log("点击确认修改密码")
            this.$emit("rstpass", md5(this.userpass.old), this.userpass.new)
        },
    },

}
</script>
