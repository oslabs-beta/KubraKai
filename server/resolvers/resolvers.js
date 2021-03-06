const { PrismaClient, Prisma } = require('@prisma/client');
const path = require('path')
const Metrics  = require('../schemas/metricsModel.js');
const mongoose = require('mongoose');

const prisma = new PrismaClient();

module.exports = {
	Query: {
		allUsers: (parent, args) => {
			console.log('here')
 		  return prisma.users.findMany();
	}, 
		getMetrics: (parent, args) => {
			return Metrics.findMany();
		}
},
	Mutation: {
		createUser: (parent,args) => {
		const { firstname, lastname, email, pwd } = args
		console.log(firstname); 
 			return prisma.users.create({ 
			data: {
  	 		firstname: firstname,
  	 		lastname: lastname,
  	 		email: email,
  	 		pwd: pwd
				}
			})
		},
		login: () => {
			prisma.users.create()
		},
    createMetric: (parent, arg) => {
      const { UserID, CPU_Usage, Memory_Usage, Memory_Allocation } = args

    }
	}
};