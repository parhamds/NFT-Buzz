const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");


const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(express.json());


app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET","POST"], 
    credentials :true
}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    key:"userId",
    secret:"LKjlJLKJfw@$%L#K4645y$M%>>$&:$5i#",
    resave:false,
    saveUninitialized : false,
    cookie:{
        expires: 60*60*24,
    },
}))

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: "YtSZaJ?%TVs2@RR",
    database: 'myapp',
    multipleStatements: true
});

app.post("/register", (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const refid = req.body.refid
    const email = req.body.email
    const pass = req.body.pass

    if (refid=='00000'){
        bcrypt.hash(pass,saltRounds, (err,hash)=>{
            if (err) {
                console.log(err)
            }
            db.query("SELECT * FROM `myapp`.`basic` WHERE `email`=?;",
        [email], 
        (err, result) => {
            if (err){
                console.log(err)
            } else if (result.length > 0){
                res.send({message:"This Email has been already registered"});
            }
            else{
            db.query("INSERT INTO basic (name, surname, email, pass) VALUES (?,?,?,?);INSERT INTO income (basicid) VALUES ((SELECT id FROM basic WHERE email =?));",
            [name, surname, email, hash,email], 
            (err, result) => {
                if (err){
                    console.log(err)
                } else {
                    res.send(result)
                }
            }
        );
    }})

        })
    } else {
        bcrypt.hash(pass,saltRounds, (err,hash)=>{

            if (err) {
                console.log(err)
            }
            db.query("SELECT * FROM `myapp`.`basic` WHERE `email`=?;",
            [email], 
            (err, result) => {
                if (err){
                    console.log(err)
                } else if (result.length > 0){
                    res.send({message:"This Email has been already registered"});
                }
                else{
                    db.query("SELECT * FROM `myapp`.`basic` WHERE `id`=?;",
                    [refid], 
                    (err, result2) => {
                        if (err){
                            console.log(err)
                        } else if (result2.length == 0){
                            
                            res.send({message:"This Referal ID Does not exist"});
                        }
                        else{
                            db.query("INSERT INTO basic (name, surname, email, pass) VALUES (?,?,?,?);INSERT INTO income (basicid) VALUES ((SELECT id FROM basic WHERE email =?));",
                                [name, surname, email, hash, email], function(err, rows, fields){
                                if (err) {
                                    console.log(err)
                                }
                                db.query("INSERT INTO myapp.refid (basicid, refid) VALUES ((SELECT id FROM myapp.basic where email=?), ?);",[email, refid], function(err, rows, filds){
                                    if (err){
                                        console.log(err)
                                    } else {
                                        res.send(result)
                                    }
                                    });
                                });

                    }})

        }})
    })
}});

app.post("/withraw", (req, res) => {
    const basicid = req.body.basicid
    const wallet = req.body.wallet
    const amount = req.body.amount

    db.query("SELECT * FROM myapp.withraw where basicid = ? and done='0' and rejected = '0';",[basicid],function(err, result, fields){
        if (err) {
            console.log(err)
        } else if(result.length==0){
            console.log(result)
            db.query("insert into myapp.withraw (basicid,amount, wallet) values (?,?,?);",[basicid,amount,wallet], function(err, result){
                if (err){
                    console.log(err)
                } else {
                    res.send(result)
                }
            });
        } else {
                res.send({message:"You still have 1 unprocessed request"})
                }
            });
    
        }
    )



    app.post("/createRegularNFT", (req, res) => {
        const basicid = req.body.basicid
        const wallet = req.body.wallet
        const phrase = req.body.phrase
        const kind = req.body.kind
        const balance = req.body.balance

        var regularnft = 0
        var premiumnft = 0
        var unprocessedAmount = 0

        db.query("SELECT * FROM myapp.nft where basicid='?' and kind='regular' and done='0' and rejected='0';",[basicid],function(err, firstresult, fields){
            if (err) {
                console.log(err)
            } else {
                regularnft = firstresult.length
                db.query("SELECT * FROM myapp.nft where basicid='?' and kind='premium' and done='0' and rejected='0';",[basicid],function(err, secondresult, fields){
                    if (err) {
                        console.log(err)
                    } else {
                        premiumnft = secondresult.length
                        unprocessedAmount = regularnft*30 + premiumnft*50
                        if(unprocessedAmount> balance){
                            res.send({message:"You have multiple unprocesses requests. Please try again later"})
                        } else {
                            db.query("INSERT INTO myapp.nft (basicid, kind, phrase, wallet) VALUES ('?',?,?,?);",[basicid,kind,phrase,wallet],function(err, result, fields){
                                if (err) {
                                    console.log(err)
                                } else {
                                    res.send(result)
                                }
                            });
                        }
                    }});
            }})
    })



    app.post("/createPremiumNFT", (req, res) => {
        const basicid = req.body.basicid
        const wallet = req.body.wallet
        const phrase = req.body.phrase
        const kind = req.body.kind
        const balance = req.body.balance

        var regularnft = 0
        var premiumnft = 0
        var unprocessedAmount = 0

        db.query("SELECT * FROM myapp.nft where basicid='?' and kind='regular' and done='0' and rejected='0';",[basicid],function(err, firstresult, fields){
            if (err) {
                console.log(err)
            } else {
                regularnft = firstresult.length
                db.query("SELECT * FROM myapp.nft where basicid='?' and kind='premium' and done='0' and rejected='0';",[basicid],function(err, secondresult, fields){
                    if (err) {
                        console.log(err)
                    } else {
                        premiumnft = secondresult.length
                        unprocessedAmount = regularnft*30 + premiumnft*50
                        if(unprocessedAmount> balance){
                            res.send({message:"You have multiple unprocesses requests. Please try again later"})
                        } else {
                            db.query("INSERT INTO myapp.nft (basicid, kind, phrase, wallet) VALUES ('?',?,?,?);",[basicid,kind,phrase,wallet],function(err, result, fields){
                                if (err) {
                                    console.log(err)
                                } else {
                                    res.send(result)
                                }
                            });
                        }
                    }});
            }})
    })






app.post("/totalwithraw", (req, res) => {
    const basicid = req.body.basicid

    db.query("SELECT * FROM myapp.withraw where basicid = ? and rejected='0'",[basicid],function(err, result, fields){
        if (err) {
            console.log(err)
        } else if(result.length==0){
            db.query("SELECT * FROM myapp.withraw where basicid = '1' and done='1';", function(err, result){
                if (err){
                    console.log(err)
                } else {
                    res.send(result)
                }
            });
        } else {
                res.send(result)
                }
            });
    
        }
    )


    
app.post("/totalregularnft", (req, res) => {
    const basicid = req.body.basicid

    db.query("SELECT * FROM myapp.nft where basicid = ? and kind='regular' and rejected='0' and done = '1'",[basicid],function(err, result, fields){
        if (err) {
            console.log(err)
        } else {
                res.send(result)
                }
            });
    
        }
    )


    app.post("/totalpremiumnft", (req, res) => {
        const basicid = req.body.basicid
    
        db.query("SELECT * FROM myapp.nft where basicid = ? and kind='premium' and rejected='0' and done = '1'",[basicid],function(err, result, fields){
            if (err) {
                console.log(err)
            } else {
                    res.send(result)
                    }
                });
        
            }
        )


app.get("/login",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true,user:req.session.user});
        console.log(req.session.user)
    } else {
        res.send({loggedIn: false});
    }
})

app.get("/M3N4g9login",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true,user:req.session.user});
        console.log(req.session.user)
    } else {
        res.send({loggedIn: false});
    }
})



app.post("/incomeold", (req, res) => {
    const basicid = req.body.basicid


    db.query("SELECT income.id,income.basicid,income.first,income.second,income.third,invest.investamount,invest.investdate FROM myapp.income INNER JOIN myapp.invest ON income.basicid=invest.basicid where income.basicid = ? and invest.approved=True",[basicid],function(err, result, fields){
    if (err) {
        console.log(err)
    } else if(result.length==0){
        db.query("SELECT income.id,income.basicid,income.first,income.second,income.third,invest.investamount,invest.investdate FROM myapp.income INNER JOIN myapp.invest ON income.basicid=invest.basicid where income.basicid = 1 and invest.approved=True", function(err, result){
            if (err){
                console.log(err)
            } else {
                console.log(result)
                res.send(result)
            }
        });
    } else {
            console.log(result)
            res.send(result)
            }
        });

    }
)

app.post("/income0", (req, res) => {
    const basicid = req.body.basicid


    db.query("SELECT * FROM myapp.invest where basicid=? and approved ='1';",[basicid],function(err, result, fields){
    if (err) {
        console.log(err)
    } else if(result.length==0){
        db.query("SELECT * FROM myapp.invest where basicid='1';", function(err, result){
            if (err){
                console.log(err)
            } else {
                res.send(result)
            }
        });
    } else {
            res.send(result)
            }
        });

    }
)

app.post("/income1", (req, res) => {
    const basicid = req.body.basicid


    db.query("SELECT * FROM myapp.childl1 where parentid= ?;",[basicid],function(err, result, fields){
    if (err) {
        console.log(err)
    } else if(result.length==0){
        db.query("SELECT * FROM myapp.childl1 where parentid= '1';", function(err, result){
            if (err){
                console.log(err)
            } else {
                res.send(result)
            }
        });
    } else {
            res.send(result)
            }
        });

    }
)




app.post("/income2", (req, res) => {
    const basicid = req.body.basicid


    db.query("SELECT * FROM myapp.childl2 where parentid= ?;",[basicid],function(err, result, fields){
    if (err) {
        console.log(err)
    } else if(result.length==0){
        db.query("SELECT * FROM myapp.childl2 where parentid= '1';", function(err, result){
            if (err){
                console.log(err)
            } else {
                res.send(result)
            }
        });
    } else {
            res.send(result)
            }
        });

    }
)



app.post("/income3", (req, res) => {
    const basicid = req.body.basicid


    db.query("SELECT * FROM myapp.childl3 where parentid= ?;",[basicid],function(err, result, fields){
    if (err) {
        console.log(err)
    } else if(result.length==0){
        db.query("SELECT * FROM myapp.childl3 where parentid= '1';", function(err, result){
            if (err){
                console.log(err)
            } else {
                res.send(result)
            }
        });
    } else {
            res.send(result)
            }
        });

    }
)



app.post("/investadmin", (req, res) => {
    db.query("SELECT * FROM myapp.invest  where invest.approved='false' and invest.rejected='false'",

        (err, result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result);
        }
    })
});


app.post("/collectnft", (req, res) => {
    const basicid = req.body.basicid

    db.query("SELECT phrase,link,kind FROM myapp.nft where basicid = ? and done = '1'",[basicid],
        (err, result) => {
        if (err){
            console.log(err)
        } else if (result.length == 0){
            res.send({message:"you currently do not have any NFT yet."})
        }else {
            res.send(result);
        }
    })
});


app.post("/withrawadmin", (req, res) => {

    db.query("SELECT * FROM myapp.withraw  where withraw.done='0' and withraw.rejected='0'",

        (err, result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result);
        }
    })
});


app.post("/nftadmin", (req, res) => {

    db.query("SELECT * FROM myapp.nft  where done='0' and rejected='0'",

        (err, result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result);
        }
    })
});

app.post("/approveinvest", (req, res) => {
    const id = req.body.id
    console.log(id)
        db.query("UPDATE myapp.invest SET approved='1' WHERE (id=?);INSERT INTO myapp.childl1 (parentid, childid, investamount) VALUES ((SELECT refid FROM myapp.refid WHERE basicid =(SELECT basicid FROM myapp.invest WHERE id =?)),(SELECT basicid FROM myapp.invest WHERE id =?),(SELECT investamount FROM myapp.invest WHERE id =?));INSERT INTO myapp.childl2 (parentid, childid, investamount) VALUES ((SELECT refid FROM myapp.refid WHERE basicid =(SELECT refid FROM myapp.refid WHERE basicid =(SELECT basicid FROM myapp.invest WHERE id =?))),(SELECT basicid FROM myapp.invest WHERE id =?),(SELECT investamount FROM myapp.invest WHERE id =?));INSERT INTO myapp.childl3 (parentid, childid, investamount) VALUES ((SELECT refid FROM myapp.refid where basicid=(SELECT refid FROM myapp.refid WHERE basicid =(SELECT refid FROM myapp.refid WHERE basicid =(SELECT basicid FROM myapp.invest WHERE id =?)))),(SELECT basicid FROM myapp.invest WHERE id =?),(SELECT investamount FROM myapp.invest WHERE id =?));",
        [id,id,id,id,id,id,id,id,id,id], 
        (err, result) => {
            if (err){
                console.log(err)
            }
            else{
                res.send(result)
            }
        })
});

app.post("/rejectinvest", (req, res) => {
    const id = req.body.id
    console.log(id)
        db.query("UPDATE myapp.invest SET rejected = '1' WHERE (id = ?);",
        [id], 
        (err, result) => {
            if (err){
                console.log(err)
            }
            else{
                res.send(result)
            }
        })
});


app.post("/approvewithraw", (req, res) => {
    const id = req.body.id
    console.log(id)
        db.query("UPDATE `myapp`.`withraw` SET `done` = '1' WHERE (`id` = ?);",
        [id], 
        (err, result) => {
            if (err){
                console.log(err)
            }
            else{
                res.send(result)
            }
        })
});

app.post("/rejectwithraw", (req, res) => {
    const id = req.body.id
    console.log(id)
        db.query("UPDATE `myapp`.`withraw` SET `rejected` = '1' WHERE (`id` = ?);",
        [id], 
        (err, result) => {
            if (err){
                console.log(err)
            }
            else{
                res.send(result)
            }
        })
});


app.post("/approvenft", (req, res) => {
    const id = req.body.id
    const link = req.body.link
    console.log(id)
    console.log(link)
    db.query("UPDATE `myapp`.`nft` SET `done` = '1', `link` = ?  WHERE (`id` = ?);",[link, id], 
        (err, result) => {
            if (err){
                console.log(err)
            }
            else{
                res.send(result)
            }
        })
      
});

app.post("/rejectnft", (req, res) => {
    const id = req.body.id
    console.log(id)
        db.query("UPDATE `myapp`.`nft` SET `rejected` = '1'  WHERE (`id` = ?);",[id], 
        (err, result) => {
            if (err){
                console.log(err)
            }
            else{
                res.send(result)
            }
        })
});




app.post("/login", (req, res) => {
    const email = req.body.email
    const pass = req.body.pass

    db.query("SELECT * FROM basic WHERE email = ?;",
        email, 
        (err, result) => {
            if (err){
                res.send({err: err});
            } 
            if (result.length > 0){
                bcrypt.compare(pass,result[0].pass, (error,response)=>{
                    if(response){
                        req.session.user=result;
                        res.send(result);
                    } else {
                        res.send({message:"Incorrect Email or Password !"});
                    }
                });
            } else {
                res.send({ message: "Incorrect Email or Password !"});
            }
        }
    );
});



app.post("/M3N4g9login", (req, res) => {
    const email = req.body.email
    const pass = req.body.pass

    db.query("SELECT * FROM management WHERE email = ?;",
        email, 
        (err, result) => {
            if (err){
                res.send({err: err});
            } 
            if (result.length > 0){
                bcrypt.compare(pass,result[0].pass, (error,response)=>{
                    if(response){
                        req.session.user=result;
                        res.send(result);
                    } else {
                        res.send({message:"Incorrect Email or Password !"});
                    }
                });
            } else {
                res.send({ message: "Incorrect Email or Password !"});
            }
        }
    );
});


app.post("/invest", (req, res) => {
    const investamount = req.body.investamount
    const hash = req.body.hash
    const basicid = req.body.basicid
    db.query("SELECT * FROM `myapp`.`invest` WHERE `hash`=?;",
    [hash], 
    (err, result) => {
        if (err){
            console.log(err)
        } else if (result.length > 0){
            res.send({message:"This Tx Hash has been already registered"});
        }
        else{
            db.query("INSERT INTO invest (basicid, investamount, hash) VALUES (?,?,?);",
            [basicid, investamount, hash], 
            (err, result) => {
            if (err){
                console.log(err)
            } else{res.send({message:"Successful. your request will be processed ASAP"});}

        })
    }})
});



app.listen(3001, () =>{
    console.log("admin : current port is 3001");
});