import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import '../styles/albums.css';

function Albums() {

    const user_id = JSON.parse(localStorage.getItem('user')).id;
    const [user_albums, setUserAlbums] = useState([]);

    async function importAlbums() {
        const albums_list = await fetch(`http://localhost:3000/api/albums?userId=${user_id}`);
        const albums_json = await albums_list.json();
        setUserAlbums(albums_json);
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
                            to={`/application/${user_id}/albums/${album.id}/photos`}
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

