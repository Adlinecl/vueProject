<template>
	<div>
    	<div class="head">
			<div class="left" v-if="isshow">
				<span>
				民族:
				</span>
				<el-select v-model="searchconditions.nation" placeholder="请选择" @change="changenation">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.value"
						:value="item.value">
					</el-option>
				</el-select>
				<span class="tip">
				学历:
				</span>
				<el-select v-model="searchconditions.education" placeholder="请选择" @change="changeeducation">
					<el-option
					v-for="item in study"
					:key="item.value"
					:label="item.value"
					:value="item.value">
					</el-option>
				</el-select>
				<span class="tip">
				职称:
				</span>
				<el-select v-model="searchconditions.title" placeholder="请选择">
					<el-option
					v-for="item in study"
					:key="item.value"
					:label="item.value"
					:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="right" v-if="isshow">
				<el-button size="medium" type="primary" icon="el-icon-plus" round @click="addstudent()">新增</el-button>
				<el-button size="medium" type="primary" icon="el-icon-search" round @click="random()">
					随机
				</el-button>
			</div>
			<div class="left" @click="back" v-if="!isshow">
				<el-button icon="el-icon-arrow-left" circle>
				</el-button>
				返回
			</div>
			<div class="right" v-if="!isshow">
				<el-button class="addbutton" type="primary" icon="el-icon-edit-outline" @click="importtable">导出</el-button>
			</div>
    	</div>
		<el-table :header-cell-style="{background:'rgba(57,71,91,1)',color: '#fff'}"
			@row-click="editstudent"
			:data="tableData"
			stripe
			style="width: 100%">
			<el-table-column 
			prop="name"
			label="姓名"
			width="180"
			@click="editstudent()">
			</el-table-column>
			<el-table-column
			prop="gender"
			label="性别"
			width="180">
			</el-table-column>
			<el-table-column
			prop="nation"
			label="民族">
			</el-table-column>
			<el-table-column 
			prop="education"
			label="学历"
			width="180"
			>
			</el-table-column>
			<el-table-column
			prop="graduation"
			label="毕业院校"
			width="180">
			</el-table-column>
			<el-table-column
			prop="company"
			label="所在单位">
			</el-table-column>
			<el-table-column 
			prop="post"
			label="职务"
			width="180"
			>
			</el-table-column>
			<el-table-column
			prop="title"
			label="职称"
			width="180">
			</el-table-column>
			<el-table-column
			label="操作">
			<el-button icon="el-icon-delete" circle></el-button>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage"
				layout="prev, pager, next"
				:total="tableData.total"
				:size= "10">
			</el-pagination>
		</div>
		<div>
			<el-dialog :title="title" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="姓名" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="所在单位" :label-width="formLabelWidth">
					<el-input v-model="form.company" autocomplete="off"></el-input>
					</el-form-item>
					<div class="common">
						<span class="el-form-item__label generate">性别</span>
						<el-radio v-model="form.gender" label="boy" @change="changeselect">男</el-radio>
						<el-radio v-model="form.gender" label="girl" @change="changeselect">女</el-radio>
					</div>
					<el-form-item label="职务" :label-width="formLabelWidth">
					<el-input v-model="form.post" autocomplete="off"></el-input>
					</el-form-item>
					<div class="common">
						<span class="el-form-item__label generate">民族</span>
						<el-select v-model="form.nation" placeholder="请选择" class="selsectnational">
							<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</div>
					<el-form-item label="职称" :label-width="formLabelWidth">
					<el-input v-model="form.title" autocomplete="off"></el-input>
					</el-form-item>
					<div class="common">
						<span class="el-form-item__label generate">出生年月</span>
						<el-date-picker
							v-model="form.birthday"
							type="date"
							placeholder="选择日期">
							</el-date-picker>
					</div>
					<el-form-item label="手机" :label-width="formLabelWidth">
					<el-input v-model="form.phone" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="毕业院校" :label-width="formLabelWidth">
					<el-input v-model="form.graduation" autocomplete="off"></el-input>
					</el-form-item>
					<div class="common changefloat">
						<span class="el-form-item__label generate">通讯地址</span>
						<el-input
							type="textarea"
							:rows="6"
							placeholder="请输入内容"
							v-model="form.address">
							</el-input>
					</div>
					<div class="common changebottom">
						<span class="el-form-item__label generate">学历</span>
						<el-select v-model="form.education" placeholder="请选择" class="selsectnational">
							<el-option
							v-for="item in study"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</div>
					<el-form-item label="申报类型" :label-width="formLabelWidth">
					<el-input v-model="form.declarationCatgory" autocomplete="off"></el-input>
					</el-form-item>
					<div class="result">
						<div>
							<span>主要业绩成果和获奖情况:</span>
						</div>
						<el-input
							type="textarea"
							:rows="6"
							placeholder="请输入内容"
							v-model="form.desc">
							</el-input>
					</div>
				</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="addbutton cancel" @click="dialogFormVisible = false">取 消</el-button>
				<el-button class="addbutton" type="primary" @click="confirm">确 定</el-button>
			</div>
			</el-dialog>
		</div>
		<div>
			<el-dialog class="numstyle"
				title="设置随机数量"
				:visible.sync="centerDialogVisible"
				width="30%"
				center>
				<el-input-number v-model="num"  size="medium" controls-position="right" @change="handleChange" :min="1" :max="totalCount"></el-input-number>
				<div class="warn">数量不得大于当前最大人数</div>
				<span slot="footer" class="dialog-footer">
					<el-button class="addbutton cancel" @click="centerDialogVisible = false">取 消</el-button>
					<el-button class="addbutton" type="primary" @click="confirmnum">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import {getList, addItem, editItem, deleteItem, importDate, randomTable} from "../api/api.js"
export default {
  name: "layout",
  data() {
    return {
		tableData: [],
		searchconditions: {
			nation: '',
			education: '',
			title: '',
		},
		isshow: true,
		currentPage: 1,
		num: 1, ///suiji 数量
        pageNo: 1,
		pageSize: 10,
		totalCount: 0,
		totalPages: 0,
		title: '',
		options: [{
          value: '蒙'
        }, {
          value: '满'
        }, {
          value: '汉'
		}, ],
		study: [{
          value: '大专'
        }, {
          value: '本科'
        }, {
          value: '硕士'
		},  {
          value: '博士'
		}],
		// value: '',
		centerDialogVisible: false,
		dialogFormVisible: false,
        form: {
			name: '',
			company: '',
			gender: 'boy',
			post: '',
			nation: '',
			title: '',
			birthday: '',
			phone: '',
          	graduation: '',
          	address: '',
			education: '',
			declarationCatgory: '',
			desc: '',
        },
        formLabelWidth: '120px'
    };
  },
    methods:{
        getStudentList(){
            getList(
				{
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					// conditionJson:JSON.stringify(this.searchconditions),
					conditionJson:'{}',
				}).then(res=>{
					this.tableData = res.data;
					this.totalCount = res.totalCount;
					this.totalPages = res.totalPages;
					console.log('初始化列表', res);
            })
        },
        handleSizeChange(val) {
          	console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
			this.pageNo = val;
			this.getStudentList();
        },
        editstudent(row) {
			this.title = "编辑人员";
			this.dialogFormVisible = true;
			this.form.name = row.address;
			this.form.company = row.company;
			this.form.gender = row.gender;
			this.form.post = row.post;
			this.form.nation = row.nation;
			this.form.title = row.title;
			this.form.birthday = row.birthday;
			this.form.phone = row.phone;
			this.form.graduation = row.graduation;
			this.form.address = row.address;
			this.form.education = row.education;
			this.form.declarationCatgory = row.declarationCatgory;
			this.form.desc = row.desc;
		},
		addstudent() {
			this.title = "新增人员";
			this.dialogFormVisible = true;
			this.form = {
				name: '',
				company: '',
				gender: 'boy',
				post: '',
				nation: '',
				title: '',
				birthday: '',
				phone: '',
				graduation: '',
				address: '',
				education: '',
				declarationCatgory: '',
				desc: '',
			};
		},
    	confirm() {
			if (this.title === "编辑人员") {
				editItem(
					{
						// pageNo: this.pageNo,
						// pageSize: this.pageSize,
						// // conditionJson:JSON.stringify(this.searchconditions),
						// conditionJson:'{}',
					}).then(res=>{
						this.getStudentList();
						console.log('编辑', res);
				    })
			} else {
				addItem(
					{
						// pageNo: this.pageNo,
						// pageSize: this.pageSize,
						// // conditionJson:JSON.stringify(this.searchconditions),
						// conditionJson:'{}',
					}).then(res=>{
						this.getStudentList();
						console.log('新增', res);
				   })
			}
		},
		changeselect(radio) {
			this.radio = radio;
		},
		random() {
			this.centerDialogVisible = true;
		},
		confirmnum() {
			randomTable(
			{
				// pageNo: this.pageNo,
				// pageSize: this.pageSize,
				// // conditionJson:JSON.stringify(this.searchconditions),
				// conditionJson:'{}',
			}).then(res=>{
				this.isshow = false;
				this.centerDialogVisible = false;
				this.tableData = res.data;
				this.totalCount = res.totalCount;
				this.totalPages = res.totalPages;
				console.log('随机列表', res);
			})
			
		},
		back() {
			this.isshow = true;
			this.getStudentList();
		},
		handleChange(value) {
        	console.log('判断数量', value);
      	},
		importtable() {

		},
		changenation(nation) {
			this.searchconditions.nation = nation;
			this.getStudentList();
		},
		changeeducation(education) {
			this.searchconditions.education = education;
			this.getStudentList();
		}

    },
    mounted(){
        this.getStudentList()
    }
};
</script>
<style scoped>
	.tip {
		margin-left: 64px;
	}
	.head {
		margin: 32px 40px;
		overflow: hidden;
	}
	.head .left {
		float: left;
	}
	.head .right {
		float: right;
	}
	.head .el-select{
		width: 124px;
		background: rgba(255,255,255,1);
		border-radius: 3px;
	}
	/deep/ .el-input__inner {
		height: 32px !important;
		line-height: 32px !important;
	}
	/deep/ .el-input__icon {
		line-height: 32px !important;
	}
	.block{
		text-align: center;
	}
	.changeName  {
		cursor: pointer;
		color: red;
	}
	.dialog-footer {
		text-align: center;
	}
	.addbutton.el-button {
		width:87px;
		height:32px;
		line-height: 32px;
		box-shadow:0px 5px 20px 0px rgba(174,185,202,0.2);
		border-radius:16px;
		padding: 0;
	}
	.cancel {
		border:1px solid rgba(59,124,255,1);
	}
	/deep/ .el-dialog__header {
		border-bottom: 1px solid rgba(240,243,247,1);
	}
	.el-dialog__title {
		font-size: 16px !important;
		line-height: 22px !important;
	}
	.generate {
		width: 120px;
    	line-height: 30px;
	}
	/deep/ .el-form {
		/* display: flex; */
		width: 100%;
		padding: 30px 32px 35px 0;

	}
	.el-form span{
		font-size:14px;
		font-weight:400;
		color:rgba(59,72,89,1);
	}
	/deep/ .el-form-item, .common {
		display: inline-block;
		width: 44%;
		/* margin-left: -60px; */
	}	
	/deep/ .el-dialog__body {
		background:rgba(240,243,247,0.3);
		/* opacity:0.3; */
		padding: 0;
		margin: 0 24px;
	}
	.selsectnational /deep/ .el-input__inner{
		width: 155px;
	}
	/deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner{
		width: 155px;
	}
	/deep/ .el-radio{
		line-height: 30px;
	}
	.common /deep/ .el-textarea {
		width: 155px;
	}
	.changefloat{
		float: right;
		margin-right: 70px;
	}
	.changebottom {
		margin-bottom: 25px;
	}
	.result{
		padding: 0 32px
	}
	.result /deep/ .el-textarea {
		width: 100%;
		margin-top: 8px;
	}
	a {
		text-decoration: none;
    	color: #fff;
	}
	.warn {
		font-size:12px;
		font-weight:400;
		color:rgba(179,185,193,1);
		line-height:17px;
		margin-top: 10px;
	}
	.numstyle  /deep/ .el-dialog__body{
		background: none;
		padding: 17px 32px;
		margin: 0 80px;
	}
</style>
