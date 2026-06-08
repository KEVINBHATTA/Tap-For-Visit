import "./App.css";
import Avatar from "./components/Avatar";
import Post from "./components/Post";
import Location from "./components/Location";
import Feature from "./components/Feature";
import About from "./components/About";
import Contact from "./components/Contact";
import SaveContact from "./components/SaveContact";
import Edit from "./components/Edit";

function App() {
  return (
    //  for background image
    <div className="body">
{/* edit section  */}
   <Edit/>
       
      {/* for Avatar */}
      <Avatar />
      {/* // for post section */}
      <center>
        <Post />

        {/* // for Profile Name */}
        <div className="Profile-Name">KEVIN BHATTA</div>
        {/* // for Working Company */}
        <div className="Company-Name"> Tap For Visit · NFC Solutions </div>

        {/* for location */}
        <Location />

        {/* for feature part */}
        <Feature />
        <hr className="horizonal-line" />

        {/* for about section */}
        <p className="Hint-text"> About</p>
        <About />

        {/* for contact section  */}
        <hr className="horizonal-line" />
        <p className="Hint-text"> Contact</p>
        <Contact/>

          {/* for Save Contact  */}
          <SaveContact/>


          {/* for promotion  */}
        <p id='promotion'>
          Book Your Card Right Now
         
         <br/>
         Powered by <a href='https://tapforvist.com' className="link">Tap For Visit</a> 
          <a href='https://tapforvist.com' className="text">·  tapforvisit.com</a>
         
        </p>

        
      </center>
    </div>
  );
}

export default App;
