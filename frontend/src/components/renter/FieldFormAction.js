import Form from 'react-bootstrap/Form';
import React, {useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {SERVER_URL} from "../../auth/Consts";

function FieldFormAction(props, { user, isAuthenticated } ) {

    var objekat;
    const [sport,setSport] = useState("");
    const [name,setName] = useState("");
    const [location,setLocation] = useState("");
    const [price,setPrice] = useState("");
    const [img,setImg] = useState("");
    const [description,setDescription] = useState("");
    const [hasSports, setHasSports] = useState([]);
    const [gotData, setGotData] = useState(false);
    const [start,setStart] = useState("");
    const [end,setEnd] = useState("");

    if(!gotData)
        axios.get( `${SERVER_URL}/daj_sportove`).then((res) => {
            setHasSports(res.data)
            setGotData(true)
        })

    console.log(img)

    if(props.user != null){
        objekat ={
            user:props.user.id,
            sport:sport,
            name:name,
            price:price,
            location:location,
            img:img,
            description:description,
            start:start,
            end:end
        }
    }

    function getBase64(file, cb) {

        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
            cb(reader.result)
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    function posalji() {

        console.log(objekat);

        if (img) {
            getBase64(img, (result)=>{
                axios.post('http://127.0.0.1:8000/renter/spremi', {...objekat, img:result})
                    .then(response => {
                        console.log(response.data);
                        // Handle the successful response
                    })
                    .catch(error => {
                        console.error(error);
                        // Handle the error
                    });
            })
        } else {
            axios.post('http://127.0.0.1:8000/renter/spremi', objekat )
                .then(response => {
                    console.log(response.data);
                    // Handle the successful response
                })
                .catch(error => {
                    console.error(error);
                    // Handle the error
                });
        }
    }

    function callFuns(){
        posalji()
        props.closeModal()
        setTimeout(props.getF, 330)
    }

    return (
        <form encType="multipart/form-data">
            <div className="mb-1">
                <select className="custom-input" id="formBasicSport" aria-label="Default select example" onChange={(e) => { setSport(e.target.value) }}>
                    <option>Select sport</option>
                    {hasSports.map((sport) => (
                        <option value={sport.pk}>{sport.fields.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-1">
                <input className="custom-input" type="text" id="formBasicName" placeholder="Enter name" onChange={(e) => { setName(e.target.value) }} />
            </div>

            <div className="mb-1">
                <input className="custom-input" type="text" id="formBasicLocation" placeholder="Enter location" onChange={(e) => { setLocation(e.target.value) }} />
            </div>

            <div className="mb-1">
                <input className="custom-input" type="number" id="formBasicPrice" placeholder="Enter price" onChange={(e) => { setPrice(e.target.value) }} />
            </div>

            <div className="mb-1">
                <input className="custom-input" type="file" id="formBasicImg" placeholder="Enter Image" onChange={(e) => { setImg(e.target.files[0]) }} />
            </div>
            <div className="mb-1" style={{display:"flex"}}>
                <p>Free appointments (every working day:FROM-TO)</p>
                <input className="custom-input" type="time" id="formBasicTime1" placeholder="From" onChange={(e) => { setStart(e.target.value) }} />
                <input className="custom-input" type="time" id="formBasicTime2" placeholder="To" onChange={(e) => { setEnd(e.target.value) }} />

            </div>

            <div className="mb-3">
                <textarea className="custom-input" id="ControlTextarea1" rows={3} onChange={(e) => { setDescription(e.target.value) }}></textarea>
            </div>

            <div style={{ textAlign: "center" }}>
                <button className="custom-register-button" onClick={callFuns}>
                    {props.action}
                </button>
            </div>
        </form>
    );
}
const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});

export default connect(mapStateToProps,null)(FieldFormAction);