const express = require('express')  
const expressGraphQL = require('express-graphql').graphqlHTTP
//const employees = require('./data/employees')

const { 
        GraphQLObjectType,
        GraphQLString,
        GraphQLNonNull,
        GraphQLList,
        GraphQLInt,
        GraphQLSchema,
} = require('graphql')
const app = express() 

const EmployeeData = [
    {
        id:1,
        emp_name:'John Varghese',
        emp_designation:'IT Manager',
        emp_address:'Pune'
    },
    {
        id:2,
        emp_name:'Adam Smith',
        emp_designation:'Developer',
        emp_address:'Germany'

    }
]

// Create GraphQL Todo Schema 
const EmployeeType = new GraphQLObjectType({
    name:'employees',
    description:'A employees schema',
    fields: ()=>({
        id:{
            type: new GraphQLNonNull(GraphQLInt) ,
        },
        emp_name:{
            type: new GraphQLNonNull(GraphQLString),
        },
        emp_designation:{
            type: new GraphQLNonNull(GraphQLString),
        },
        emp_address:{
            type: new GraphQLNonNull(GraphQLString),
        },
        
    })
})

const RootQueryType = new GraphQLObjectType({
    name:'Query',
    description:'RootQuery',
    fields:()=>({
        employee:{
            type: EmployeeType,
            description:'A single employee',
            args:{
                id:{ type: GraphQLInt }
            }, 
            resolve: (parent, args) => data.find(item => item.id === args.id)
        },
        employees:{
            type: new GraphQLList(EmployeeType),
            description: 'List of all Employees',
            resolve: ()=> EmployeeData
        }

    })
})

const schema = new GraphQLSchema({
    query:RootQueryType,
    //mutation: RootMutationType,
})

app.use('/',expressGraphQL({
    schema:schema,
    graphiql: true,

}))

const PORT = 8080 || process.env.PORT
app.listen(PORT,()=> console.log('Server Running'))


