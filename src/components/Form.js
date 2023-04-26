import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Form.css";

function Form(){
    const json=useSelector(state=>state.json);
    const[moreSub,setMoreSub]=useState(false);
    const[more,setMore]=useState(false);
    const[checked,setChecked]=useState(true);
    const[submit,setSubmit]=useState(false); 
    
    const arr=json?.filter(item=>{
        return Object.entries(item)!=null;
    })

    function handleClick(){
        setSubmit(true);
    }
    if(submit){
        return (
            <div id="sent-data">
            <h2 style={{textAlign:"center"}}>The following data will be sent to the backend server</h2>
            {arr.map(item=>{
                return JSON.stringify(item,null,1)
            })}
            </div>
        )
    }
    return json.length>0?(
        <div id="form">
        <h2>Here's your generated form:</h2>
            <form>
            <h3 style={{alignSelf:"flex-start",margin:"0"}}>New {json[0].label.split(" ")[0]}</h3>
            <hr />
            {json.map((item)=>{
                if(item.uiType==="Input"){
                    return (
                        <div key={item.jsonKey} className="form-item">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <label className="item-label" htmlFor={item.jsonKey}>{item.label}</label>
                            <input className="input" type="text" id={item.jsonKey} placeholder={item.placeholder} required={item.validate.required?true:false} readOnly={item.validate.immutable?true:false} /> 
                        </div>
                        <hr />

                        </div>
                    )
                }
                if(item.uiType==="Group"){
                   return (<div id={item.jsonKey} className="form-item">
                    <label htmlFor={item.jsonKey} className="item-label" >{item.label}</label>
                    <hr />

                    {item.subParameters.map((subParameter)=>{
                        if(subParameter.uiType==="Radio"){
                            return <div key={subParameter.jsonKey} id="category">
                            {subParameter.validate.options.map((option)=>{
                                return(
                                    <div className="type">
                                        <input type="radio" id={option.value} style={{display:"none"}} value={option.value} name={subParameter.jsonKey} onClick={()=>setChecked(!checked)} defaultChecked={checked}/> 
                                        <label  className="radio-label" htmlFor={option.value}>{option.label}</label>
                                    </div>
                                )
                            })}
                            </div>
                        }
                      
                        if(subParameter.uiType==="Ignore"){
                                return subParameter.subParameters.map((optionalSubParameter)=>{
                                        if(!checked&&optionalSubParameter.uiType==="Select"){
                                            return (
                                                <div key={optionalSubParameter.jsonKey} className="select-item">
                                                    <label htmlFor={optionalSubParameter.jsonKey}>{optionalSubParameter.label}</label>
                                                    <select className="input" id={optionalSubParameter.jsonKey} >
                                                        {optionalSubParameter.validate.options.map((option)=>(
                                                            <option >{option.value}</option>
                                                        ))}
                                                    </select>
                                                    </div>
                                            )
                                        }
                        
                                        if(checked&&optionalSubParameter.uiType==="Switch"){
                                            return(
                                                <div className="select-item" >
                                                <div>
                                                <input type="checkbox" id={optionalSubParameter.jsonKey} style={{verticalAlign:"middle"}} required={optionalSubParameter.validate.required?true:false}/> 
                                                <label  htmlFor={optionalSubParameter.jsonKey} style={{verticalAlign:"middle"}} >{optionalSubParameter.label}</label>
                                                </div>
                                                </div>
                                            )
                                        }
                                    })
                            
                        }
                        if(subParameter.uiType==="Select"){ 
                            if(subParameter.validate.required){
                                return <div className="select-item">
                                            <label htmlFor={subParameter.jsonKey}>{subParameter.label}</label>
                                            <select className="input" id={subParameter.jsonKey}>
                                            {subParameter.validate.options.map((option)=>(
                                            <option >{option.label}</option>
                                            ))}
                                            </select>
                                        </div>  
                            } 
                            else if(moreSub) {
                                return (
                                        <div className="select-item">
                                            <label htmlFor={subParameter.jsonKey}>{subParameter.label}</label>
                                            <select className="input" id={subParameter.jsonKey}>
                                            {subParameter.validate.options.map((option)=>(
                                            <option >{option.label}</option>
                                            ))}
                                            </select>
                                        </div>                                                
                                        )
                            }
                        }
                        if(subParameter.uiType==="Switch"){
                            if(subParameter.validate.required){
                                return <div className="item-label" style={{verticalAlign:"middle"}}>
                                            <input type="checkbox" id={subParameter.jsonKey} /> 
                                            <label htmlFor={subParameter.jsonKey}>{subParameter.label}</label>
                                        </div>
                            } 
                        }
                    })}
                    
                    </div>)
                    
                }

                if(item.uiType==="Select"){
                    return (
                        <div className="form-item">
                        <div className="toggle">
                        <p>{moreSub?"Hide":"Show"} advanced fields</p>
                        <label className="toggle-switch">
                        <input type="checkbox" style={{display:"none"}} onClick={()=>setMoreSub(!moreSub)}></input>
                        <span className="slider"></span>
                        </label>
                        </div>
                        <div style={{alignSelf:"flex-start"}}>
                        </div>
                        {more&&<div className="select-item">
                            <label htmlFor={item.jsonKey}>{item.label}</label>
                            <select className="input" id={item.jsonKey}>
                            {item.validate.options.map((option)=>(
                            <option >{option.label}</option>
                            ))}
                            </select>
                            </div>}
                            <hr/>
                        </div>  
                    
                    )
                }
            })}
            <div id="submit-btns">
            <div className="toggle">
            <p>{more?"Hide":"Show"} advanced fields</p>
            <label className="toggle-switch">
            <input type="checkbox" style={{display:"none"}} onClick={()=>setMore(!more)}></input>
            <span className="slider"></span>
            </label>
            </div>
            <button id="submit" className="btn" type="submit" onClick={handleClick}>Submit</button>
            </div>
            </form>
        </div>
    ):<div id="welcome-txt">
    <h1>JSON Form Editor</h1>
        <h3>Welcome to our JSON form editor! Create custom forms using JSON data and generate dynamic forms quickly and easily. </h3>
        <ul id="home-list">
            <li>You can locate the designated text box for JSON input on the left side of the page. </li>
            <li>Ensure that your JSON follows the correct syntax and structure to avoid errors in processing. </li>
            <li>You can check if your JSON data is valid by using a <a href="https://jsonlint.com/" target="_blank" style={{color:"inherit"}}>JSON validator tool</a>.</li>
            <li>Make sure that your JSON data is complete and contains all the required information for the form at hand. Missing or incomplete data can cause issues downstream.</li>
            <li>The text editor is resizable, allowing you to adjust the size of the text box to your preferred size for better viewing and editing.</li>
        </ul>
    </div>
}
export default Form;