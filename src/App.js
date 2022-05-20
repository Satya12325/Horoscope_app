import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import React, { useState,useEffect } from "react";
import validator from 'validator'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {axios} from "axios";
import Output from "./Components/Output";
import Looading from "./Components/Looading";
import {loadData,saveData} from "./Utils/localStorage"




function App() {
  const [emailError, setEmailError] = useState('')
  const [mail, setMail] = useState('');
  const [name, setName] = useState('');
  const [sign, setSign] = useState('leo');
  const [day, setDay] = useState('');
  const [data,setData] = useState();
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [local,setLocal] = useState(null);
  const [token,setToken]=useState(false);

  const validateEmail = (e) => {
    var email = e.target.value

    if (validator.isEmail(email)) {
      setEmailError('Valid Email');
      setMail(email)
    } else {
      setEmailError('Enter valid Email!')
      setMail("")
    }
  }

  useEffect(() => {
    // setData(JSON.parse(window.localStorage.getItem('datas')))
   
  
  
   

  }, []);

  // const Showdetails = async()=>{
  //   if(token === false) {
  //         setShowCard(false);
  //        }
  //        else{
  //          const allData = await loadData("token")
  //      console.log("alldata",allData)
  //      setData(allData)
  //      setShowCard(true);
  //        }
  // }

  useEffect(() => {
   

      const allData =  loadData("token")
      console.log("alldata",allData)
      setData(allData)
    
  
  }, [local]);



  const handleChange = (event) => {
    setSign(event.target.value);
  };




  const handleClick = () =>{
    // if(name === "" || mail === "" ||sign === "" || day ===""){
    //   alert("Please enter all the details");
    //   return false;
    // }
    setLoading(true)
    setShowCard(true);
    const URL = `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`;
 fetch(URL, {
    method: 'POST'
})
.then(response => response.json())
.then(json => {
    const date = json;
    console.log("postdata",date);
    
    setLocal({
      name:name,
      email:mail,
      date:date.date_range,
      day:day,
      current_date: date.current_date,
      description: date.description,
      compatibility: date.compatibility,
      mood: date.mood,
      color:date.color,
      lucky_number:date.lucky_number,
      lucky_time: date.lucky_time,

    })
    // window.localStorage.setItem('horos', {
    //   name:name,
    //   email:mail,
    //   date:date.date_range,
    //   day:day,
    //   current_date: date.current_date,
    //   description: date.description,
    //   compatibility: date.compatibility,
    //   mood: date.mood,
    //   color:date.color,
    //   lucky_number:date.lucky_number,
    //   lucky_time: date.lucky_time,

    // });
    // setData(JSON.parse(window.localStorage.getItem('datas')))
   
    // setData(date)
    console.log("local",local)
    saveData("token",local)
    setToken(true);
    // Showdetails();
   
    setShowCard(true);
    setLoading(false)
});
// setName("");
// setMail("");
// setDay("");
// setEmailError("")

  }

const handleBack = () =>{
  setShowCard(false)
  localStorage.clear();
  setToken(false)

}



const [items, setItems] = useState([]);



// function loadData(key){
//   try{
//   let data = localStorage.getItem(key)
//   data = JSON.parse(data)
//   console.log(data,"local data")
//   return data

//   }
//   catch(err){
//   return undefined
//   }
//   }
  



console.log("data",data)
  return (
    <div className="App">
      <div className="InputDiv">
        <div>
          <TextField id="outlined-basic" label="Enter Email:" variant="outlined"
            onChange={(e) => validateEmail(e)}
          />
          <br />
          <span style={{
            fontWeight: 'bold',
            color: 'red',
          }}>{emailError}</span>

        </div>
        <div>
          <TextField id="outlined-basic" label="Enter Name:" variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}

          />

        </div>
        <div className="form-group">

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Horoscope Date</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={day}
              label="Select Horoscope"
              onChange={(e) => setDay(e.target.value)}
            >
              <MenuItem value="" disabled selected>Select day</MenuItem>
              <MenuItem value={"today"}>Today</MenuItem>
              <MenuItem value={"tomorrow"}>Tomorrow</MenuItem>
              <MenuItem value={"yesterday"}>Yesterday</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="form-group">

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Horoscope</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sign}
              label="Select Horoscope"
              onChange={handleChange}
            >
              <MenuItem value="" disabled selected>Select sign</MenuItem>
              <MenuItem value='aquarius'>Aquarius</MenuItem>
              <MenuItem value='pisces'>Pisces</MenuItem>
              <MenuItem value='taurus'>Taurus</MenuItem>
              <MenuItem value='gemini'>Gemini</MenuItem>
              <MenuItem value='cancer'>Cancer</MenuItem>
              <MenuItem value='leo'>Leo</MenuItem>
              <MenuItem value='virgo'>Virgo</MenuItem>
              <MenuItem value='libra'>Libra</MenuItem>
              <MenuItem value='scorpio'>Scorpio</MenuItem>
              <MenuItem value='sagittarius'>Sagittarius</MenuItem>
              <MenuItem value='capricorn'>Capricorn</MenuItem>

            </Select>
          </FormControl>
        </div>
      </div>
      <div className="ButtonDiv">
      <Button variant="contained" color="success"
      style={{width:"80%"}}
      onClick={handleClick}
      >
        Search
      </Button>
      </div>
      <div>
        
           {loading ? < Looading/> : (showCard ? <Output 
           name={name}
           email={mail}
          //  date_range={data.date_range}
           day={day}
          //  current_date={data.current_date}
          //  description={data.description}
          {...data}
          handleBack={handleBack}
           sign={sign} /> : null)}
        
      </div>
    </div>
  );
}

export default App;
