const express = require("express");
const router = express.Router();
const dbPromise=require("../db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname ,"../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/contents", upload.single("image"), async (req, res)=>{
  const {title}=req.body;

  if(!title || !req.file){
    return res.status(400).json({error:"Title and image are required"});
  }
  const image=req.file.filename;

  try{
    const db = await dbPromise;
    await db.run(
    "INSERT INTO contents (title, image) VALUES (?,?)",
    [title, image]

  );
  res.json({message:"Contents Save Successfully"});
}catch(error){
  console.error("Error:",error)
  res.status(500).json({error:"Internal Server Error"});
}
});

router.get("/contents", async(req, res) => {
  const db = await dbPromise;
  const data=await db.all("SELECT * FROM contents ORDER BY id DESC");
    
    res.json(data);
  });

router.put("/contents/:id", upload.single("image"), async(req,res)=>{
  const {id}= req.params;
  const {title}=req.body;
  
  try{
    const db = await dbPromise;
    const oldData= await db.get("SELECT * FROM contents WHERE id= ?",[id]);
    if (!oldData){
      return res.status(404).json({error:"Content not Found"});
    }
    const newImage= req.file ? req.file.filename : oldData.image;

    await db.run(
      "UPDATE contents SET title =?, image=? WHERE id=?",
      [title, newImage, id] 

    );
    res.json({message:"Content Update Successfully"});
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Internal Server Error"});

  }
});

router.delete("/contents/:id", async(req, res)=>{
  const {id} = req.params;
  try{
    const db = await dbPromise;
    const data=await db.get("SELECT * FROM contents WHERE id=?", [id]);

    if(!data){
      return res.status(404).json({error:"Content not Found"});
    }

    await db.run("DELETE FROM contents WHERE id=?", [id]);

    res.json({message:"Content Delete Successfully"});

  }catch(error){
    console.log(error);
    res.status(500).json({error:"Internal Server Error"});

  }
});

module.exports = router;
