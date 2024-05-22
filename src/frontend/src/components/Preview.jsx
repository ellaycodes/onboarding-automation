import '../css/body.css'
import { useEffect, useState } from 'react'
import { getTemplate } from '../services/api';
import { createMappingData } from '../services/api';

const Preview = ({type, company}) => {

  const [preview, setPreview] = useState('...loading')

  useEffect(() => {
    getTemplate(type).then((res) => {
      setPreview(res.data)
    })
  }, [])

  const createMapping = () => {
    createMappingData(type, company);
    location.reload()
  }

  return (
    <div id='preview'>
      <button onClick={(e) => createMapping(e)}>Start</button>
      <iframe
        srcDoc={preview}
        frameborder="0"
        style={{ width: '100%', height: '100%' }}
      >
        HTML PREVIEW
      </iframe>
    </div>
  );
};

export default Preview;