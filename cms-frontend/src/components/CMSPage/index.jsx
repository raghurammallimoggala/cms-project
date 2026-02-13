import {useState} from "react";

function CMSPage (){
    const [title, setTitle]= useState("");
    const [image, setImage]= useState(null);
    const [msg, setMsg]=useState("");
    const [error, setError]=useState("");

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if (!title || !image){
            setError("Please provide both title and image.");
            return;
        }
       try{
        const formData=new FormData();
        formData.append("title", title);
        formData.append("image", image);
        const res= await fetch("http://localhost:3000/api/contents",{
            method:"POST",
            body:formData
        });

        if(!res.ok){
            throw new Error("Failed to submit the form.");
        }
        const data= await res.json();
        setMsg(data.message);
        setError("");
        setTitle("");
        setImage(null);
    }catch(err){
        console.error(err);
        setError("Error submitting the form.");
        setMsg("");
    }
    };

    return (
        <div className="text-center mt-5">
            <h1 className="text-2xl font-bold text-gray-800">CMS</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
                    onChange={(e)=>setTitle(e.target.value)}/>
                <input
                type="file"
                className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
                onChange={(e)=>setImage(e.target.files[0])}/>

                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-1">Save</button>
                {msg && <p className="text-green-500">{msg}</p>}
                {error && <p className="text-red-500">{error}</p>}

            </form>
        </div>
    )
}
export default CMSPage;
