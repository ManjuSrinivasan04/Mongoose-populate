let mongoose=require('mongoose');
const {model,Schema}=require('mongoose');
let express=require('express');
let app=express();

const port=4000;


mongoose.connect("mongodb://localhost:27017/mydbmongo-mongoose",{useNewUrlParser:true},(err)=>{
    if(!err)
        console.log("Server Connected to Mongodb!!!!!!!!");
    
});

app.use('/',(req,res)=>{
    res.send("And now you are in Home Page!!!!!!");
});

const DepartmentSchema = new Schema({
    name:String,
    location:String
});

let Department=model("department",DepartmentSchema);

let EmployeeSchema=new Schema({
    firstName:String,
    mobile:String,
    department:{
        type:Schema.Types.ObjectId,
        ref:'department'
    }
})

let Employee=model('employee',EmployeeSchema);

let CompanySchema=new Schema({
    name:String,
    address:String,
    employees:[{
        type:Schema.Types.ObjectId,
        ref:'employee'
    }]
})

let Company=model("company",CompanySchema);

app.use('/',async(req,res)=>{
    await Department.remove({})
      await Department.create({
          name:'IT',
          location:"floor 1"
      })
      await Department.create({
          name:"Marketing",
          location:"floor 2"
      })
      await Employee.remove({})
      await Employee.create({
          firstName:'Manju',
          mobile:'1234567890',
          department:await Department.findOne({name:'IT'})
      })
      await Employee.create({
        firstName:'Kitty',
        mobile:'12345832590',
        department:await Department.findOne({name:'Marketing'})
    })
    await Company.remove({})
    await Company.create({
        name:"Big Company",
        address:"address1",
        employees:await Employee.find()
    })

      res.json({
          departments: await Department.find(),
          employee: await Employee.find(),
          employeeWithDep: await Employee.find().populate("department","name"),
          company:await Company.find(),
          companyWithEmployee: await Company.find().populate('employees'),
          companyWithEmpandDep: await Company.find()
          .populate({
              path:'employees',
              model:'employee',
              populate:{
                  path:'department',
                  model:'department'
                }
          })
      })
})

app.listen(port,()=>{
    console.log("App is running on port ",port);
});