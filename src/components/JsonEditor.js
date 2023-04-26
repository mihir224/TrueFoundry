import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateJson } from "../redux/jsonSlice";
import "../styles/JsonEditor.css"

function JsonEditor(){
    const dispatch=useDispatch();
    const [json,setJson]=useState(""); 
    const state = useSelector((state)=>state);
    React.useEffect(()=>{
        console.log(state);
    })
    useEffect(()=>{
        console.log("re-render");
    })
    
   async function handleChange(e){
        setJson(e.target.value);
        if(json){
                try{
                const data =await JSON.parse(json);
                dispatch(updateJson(data));
            }catch(err){
                alert("Invalid JSON")
                    console.log(err)
            }
        }
    }
    
    return (
        <div id="input">
            <textarea id="ta" onChange={handleChange} value={json} placeholder="Type/Paste JSON & Press ENTER"></textarea>
        </div>
    );
}

export default JsonEditor;