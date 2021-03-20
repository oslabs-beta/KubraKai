// const { PrismaClient, Prisma } = require('@prisma/client');
// const path = require('path')
// const bcrypt = require('bcrypt')

// const prisma = new PrismaClient();

// module.exports = {
// 	Query: {
// 		allUsers: async (parent, args) => {
//  		  return await prisma.users.findMany();
// 	}, 
// 		currentUser: async (parent, args, context) => context.user
// },
// 	Mutation: {
// 		signup: async (parent, args, context) => {
// 			const { firstname, lastname, email, pwd} = args;
// 			console.log('firstname', firstname)
// 			console.log('signing up')
// 			const saltRounds = 10 
// 			const hashedPwd = await bcrypt.hash(pwd, saltRounds);
// 			const oldUser = await prisma.users.findUnique({
// 			  where: {email}
// 		  });       
// 		  if (oldUser) { throw new Error('User with email already exists'); }
// 			const user = await prisma.users.create({
// 			  data: {
// 				firstname,
// 				lastname,
// 				email,
// 				pwd: hashedPwd,
// 			  }
// 			})
// 			console.log('user', user);
// 			// await context.login(user);
// 			return user;
// 		  },
// 		  login: async (parent, args, context) => {
// 			console.log("logging in");
// 			const {email, pwd } = args;
// 			const user  = await prisma.users.findUnique({
// 				where: {
// 					email
// 				}
// 			})
			
// 			const ifTrue =  await bcrypt.compare(pwd, user.pwd)
// 			console.log(ifTrue); 
// 			if (ifTrue === true) return user;
// 		  },
// 		  userInfo: async (parent, args) => {
// 			const { email, ip, dpname } = args; 
// 			const userInfo = await prisma.usersinfo.create({ 
// 			  data: {
// 				email,
// 				ip,
// 				dpname
// 			  }
// 				  })
// 			return userInfo; 
// 		  },
// 		  logout: (parent, args, context) => {
// 			context.logout();
// 		  }
// 	}
// };