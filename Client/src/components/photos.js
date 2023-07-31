import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

//import '../styles/photos.css';


export default function Photos() {

    const params = useParams();
    const [userPhotos, setUserPhotos] = useState([]);
    const [photoCount, setPhotoCount] = useState(0);

    function importPhotos() {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${params["id"]}&_limit=10&_start=${photoCount}`)
          .then(response => {
            return response.json();
          })
          .then(data => {
            if(data.length === 0){
              throw new Error('Error fetching photos')
            }
            console.log(data)
            setUserPhotos(prevPhotos => [...prevPhotos, ...data]);
          })
          .catch(error => {
            alert('Error fetching photos:', error);
            var button = document.getElementById('load-more-button');
            button.disabled = true;
          });
      }

    const fetchMorePhotos = () => {
        setPhotoCount(prevCount => prevCount + 10);
    };

    useEffect(() => {
            importPhotos();
        },[photoCount]
    )

    return (
        <>
      <h1 className="title">Print Images for album {params["id"]}</h1>
      <div className="main_div">
        <div className="photos_div">
          {userPhotos.map((photo) => (
            <img className="photo"
              src={photo.thumbnailUrl}
              alt={photo.title}
              key={photo.id}
            />
          ))}
        </div>
      </div>

      <div className="button_div">
        <button onClick={fetchMorePhotos} className="more_img_btn">
          Load 10 More
        </button>
      </div>
    </>
    );
}
