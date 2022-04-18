const mysql=require("./mysql/async_blog_pool");



exports.test=async(req,res)=>{
        let results =await mysql.query(
            'select * from test',''
        ).then(results=>{
            console.log("res",results)
            return results
        })
        let results1 = await mysql.query(
            'select * from test',''
        ).then(results1=>{
            console.log("res1",results1);
            return results1
        })
        console.log("re1",results,results1);
        return res.json({"results":results,"results1":results1});
    };
