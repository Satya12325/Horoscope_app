import './Component.css';
import Button from '@mui/material/Button';




export default function Output({ name, email,sign,date_range,day,current_date,description,compatibility,mood,
color,lucky_number,lucky_time,handleBack
}) {
  return (
    <>
      <div className="Card-header">
        <div>
          <h2>Name : {name}</h2>
          <h2>Email : {email}</h2>
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <h2 style={{textTransform: "capitalize"}}>{sign}</h2>
          <h2>{date_range}</h2>
        </div>
        <div>
          <h4>
            <span style={{textTransform: "capitalize"}}>
                {day} </span>: {current_date}
          </h4>
        </div>
        <div className="card-c">
          <p>{description}</p>
        </div>
        <div className='card-d'>
        <span>Compatibility : <div>{compatibility}</div></span>
        <span>Mood : <div> {mood}</div></span>
        <span>Color : <div> {color}</div></span>
        <span>Lucky number : <div> {lucky_number}</div></span>
        <span>Lucky time : <div> {lucky_time}</div></span>
      </div>
      <div style={{display: 'flex', justifyContent: 'center',marginTop:"20px"}}>

      <Button  style={{width:"80%"}} variant="contained" onClick={handleBack}>Back</Button>
      </div>
      </div>
    </>
  );
}
