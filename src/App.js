import './App.css';
import axios from 'axios'
import {useState} from 'react'
function App() {
  const [file,setFile] = useState()

  const handleSubmit = async (event)=>{
    event.preventDefault();
    const formData = new FormData()
   
    Array.from(file).map((item,index)=> {
      formData.append('file',item)
      
    });
    try {
      await axios.post('http://localhost:5001/upload',formData)
    } catch (error) {
      console.log(error)
    }

  }

  const downloadData = async(event)=>{
    try {
      await axios({
        url: `http://localhost:5001/download`,
        method: 'GET',
        responseType: 'blob',
        
    })
        .then((res)=>{
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "download.zip");
            document.body.appendChild(link);
            link.click();
        })
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div> 
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <input type='file' name='file' multiple onChange={(event)=>setFile(event.target.files)}></input>
          <button type="submit">Upload</button>
        </form>

        <button type='butotn' onClick={downloadData}>Download</button>
    </div>
  );
}

export default App;
