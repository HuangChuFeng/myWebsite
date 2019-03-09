
const UserModel = require("../models/user");
const index = async (ctx) => {
	ctx.session.flag = "1";
	await ctx.render('build/index', {
	});
}

const testOnlineStatus = async (ctx) => {
	ctx.response.body = {
		resCode: 500,
		message: 'hello world'
	};
}

console.log('index文件:')

module.exports = {
	'GET /': index,
	'GET /api/test': testOnlineStatus,
	"POST /api/login": async ctx => {
		let resCode = 200,
			message = '登录成功',
			{ name, password } = ctx.request.body,
			user;
		try {
			user = await UserModel.getUserByName(name);
			console.log('user====', user);
			if (user && password == user.password) {
				delete user.password;
				ctx.session.user = user;
				console.log('设置过session了*******', ctx.session);
			} else {
				resCode = 500;
				message = '用户名或密码错误';
			}
		} catch (e) {
			resCode = 500;
			message = "服务器出错了";
		}
		ctx.response.body = {
			resCode,
			message,
			user
		};
	},
}