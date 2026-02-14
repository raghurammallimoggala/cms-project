import { useEffect, useState } from "react";

function HomePage(){
  const [contents, setContents]= useState([]);
  const [editId, setEditId]= useState(null);
  const [editedTitle, setEditedTitle]= useState("");
  const [editedImage, setEditedImage]= useState(null);

  const fetchContents= async()=>{
  try{
    const res= await fetch("https://cms-backend-lr46.onrender.com/api/contents");
    const data= await res.json();
    setContents(data);
    }catch(error){
      console.log("fetch error:", error);
    }
  };

   useEffect(()=>{
    fetchContents();
  }, []); 

  const handleDelete= async(id)=>{
    try{
      const res=await fetch(`https://cms-backend-lr46.onrender.com/api/contents/${id}`,
        {
          method:"Delete",
        }
      );
      const data= await res.json();
      alert(data.message);
      fetchContents();
    }catch(error){
      console.log("delete error:",error)
    }
  };

  const handleEdit=(item)=>{
    console.log("edit clicked for item:", item);
    setEditId(item.id)
    setEditedTitle(item.title)
    setEditedImage(null);
  }
  
  const handleUpdate=async (e)=>{
    e.preventDefault();
    try{
    const formData= new FormData();
    formData.append("title", editedTitle);

    if(editedImage){
      formData.append("image", editedImage);
    }

    const res= await fetch(`https://cms-backend-lr46.onrender.com/api/contents/${editId}`,
      {
        method:"PUT",
        body:formData,
      }
    );
    const data= await res.json();
    alert(data.message);

    setEditId(null);
    setEditedTitle("");
    setEditedImage(null);

    fetchContents();

  }catch(error){
    console.log("Update error:", error);
  }
};

  return(
    <div className="text-center">
      <h1 className="text-2xl font-bold">All Uploaded Data</h1>
      {editId && (
        <form className="border p-4 rounded-lg shadow-md  mt-6 mx-auto w-full max-w-md" onSubmit={handleUpdate}>
          <h1 className="text-xl font-bold text-blue-600">Update Content</h1>
          <input
          type="text"
          value={editedTitle}
          className="border w-full p-2 mt-3 rounded"
          onChange={(e)=>setEditedTitle(e.target.value)}/>
          <input
          type="file"
          className="border w-full p-2 mt-3 rounded"
          onChange={(e)=>setEditedImage(e.target.files[0])}/>
          <button  type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-3">
            Update Content
          </button>
        </form>
      )}
     
      <div className= "grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-10">
        {contents.map((item)=>(
      <div key={item.id} className="border p-4 rounded-lg shadow">
        <h1 className="text-xl font-bold">{item.title}</h1>
      <img src={`https://cms-backend-lr46.onrender.com/uploads/${item.image}`} alt={item.title} className="w-full h-70 object-cover rounded-lg mt-3"/>
      <div className="flex justify-center gap-4 mt-4">
        <button type= "button" className="bg-yellow-500 text-white px-2 py-2 rounded" onClick={()=>handleEdit(item)}>Edit</button>
        <button type="button" className="bg-red-500 text-white px-2 py-2 rounded" onClick={()=>handleDelete(item.id)}>Delete</button>
      </div>
      </div>
      ))}
    </div>
    </div>
  )
}
export default HomePage;