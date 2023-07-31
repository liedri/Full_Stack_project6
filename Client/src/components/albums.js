import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//import '../styles/albums.css';

function Albums() {

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const [user_albums, setUserAlbums] = useState([]);

    async function importAlbums() {
        const albums_list = await fetch('https://jsonplaceholder.typicode.com/albums');
        const albums_json = await albums_list.json();
        const temp = albums_json.filter(album => album.userId === loggedInUser.id);
        setUserAlbums(temp);
    }

    useEffect(
        () => {
            importAlbums()
        }, []
    )

    return (
        <>
            <h1 className="title">Albums</h1>
            <div className="albums_div">
                <ol className="album-list">
                    {user_albums.map((album) => (
                        <Link
                            to={`/application/${loggedInUser.id}/albums/${album.id}/photos`}
                            state={album.id}
                            key={album.id}
                            className="album-item-link">

                            <div className="album-item">
                                <span className="album-title">{album.title}</span>
                            </div>
                        </Link>
                    ))}
                </ol>
            </div>
        </>
    )
}

export default Albums;

